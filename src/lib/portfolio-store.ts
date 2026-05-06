import { createServerClient } from "@/utils/supabase/server";
import type { PortfolioProject, ProjectInput } from "./types";

export async function getProjects(): Promise<PortfolioProject[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PortfolioProject[];
}

export async function addProject(input: ProjectInput): Promise<PortfolioProject> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as PortfolioProject;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
