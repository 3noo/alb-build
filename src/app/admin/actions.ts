"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProject, deleteProject } from "@/lib/portfolio-store";
import type { ProjectInput } from "@/lib/types";

export async function createProjectAction(formData: FormData) {
  const input: ProjectInput = {
    title: requireString(formData.get("title"), "title"),
    city: requireString(formData.get("city"), "city"),
    category: requireString(formData.get("category"), "category"),
    year: requireString(formData.get("year"), "year"),
    cover_image: requireString(formData.get("cover_image"), "cover_image"),
    featured: formData.get("featured") === "on",
  };

  await addProject(input);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/portfolio");
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  const id = requireString(formData.get("id"), "id");
  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/portfolio");
}

function requireString(value: FormDataEntryValue | null, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}
