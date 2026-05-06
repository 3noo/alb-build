import { NextResponse } from "next/server";
import { addProject, getProjects, normalizeProjectInput } from "@/lib/portfolio-store";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const input = normalizeProjectInput(await request.json());
    const project = await addProject(input);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
