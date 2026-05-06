import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { PortfolioProject, ProjectInput } from "./types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "portfolio.json");

export async function getProjects(): Promise<PortfolioProject[]> {
  if (hasSupabaseConfig()) {
    return getSupabaseProjects();
  }

  try {
    const raw = await readFile(dataFile, "utf8");
    return JSON.parse(raw) as PortfolioProject[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function addProject(input: ProjectInput): Promise<PortfolioProject> {
  const project: PortfolioProject = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString()
  };

  if (hasSupabaseConfig()) {
    return createSupabaseProject(project);
  }

  const projects = await getProjects();
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify([project, ...projects], null, 2));
  return project;
}

export function normalizeProjectInput(body: unknown): ProjectInput {
  const value = body as Record<string, unknown>;
  const scope = Array.isArray(value.scope)
    ? value.scope.map(String)
    : String(value.scope ?? "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

  return {
    title: requireString(value.title, "title"),
    category: requireString(value.category, "category"),
    location: requireString(value.location, "location"),
    year: requireString(value.year, "year"),
    client: requireString(value.client, "client"),
    area: requireString(value.area, "area"),
    status: value.status === "in-progress" ? "in-progress" : "completed",
    coverImage: requireString(value.coverImage, "coverImage"),
    summary: requireString(value.summary, "summary"),
    scope,
    featured: Boolean(value.featured)
  };
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getSupabaseProjects(): Promise<PortfolioProject[]> {
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/portfolio_projects?select=*&order=createdAt.desc`, {
    headers: supabaseHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Supabase read failed: ${response.status}`);
  }

  return response.json() as Promise<PortfolioProject[]>;
}

async function createSupabaseProject(project: PortfolioProject): Promise<PortfolioProject> {
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/portfolio_projects`, {
    method: "POST",
    headers: {
      ...supabaseHeaders(),
      Prefer: "return=representation"
    },
    body: JSON.stringify(project)
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status}`);
  }

  const [created] = (await response.json()) as PortfolioProject[];
  return created;
}

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };
}
