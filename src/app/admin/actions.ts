"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProject, normalizeProjectInput } from "@/lib/portfolio-store";

export async function createProjectAction(formData: FormData) {
  const input = normalizeProjectInput({
    title: formData.get("title"),
    category: formData.get("category"),
    location: formData.get("location"),
    year: formData.get("year"),
    client: formData.get("client"),
    area: formData.get("area"),
    status: formData.get("status"),
    coverImage: formData.get("coverImage"),
    summary: formData.get("summary"),
    scope: formData.get("scope"),
    featured: formData.get("featured") === "on"
  });

  await addProject(input);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
