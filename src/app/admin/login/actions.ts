"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";

  if (password !== expected) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set("alb_build_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.ADMIN_COOKIE_SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  redirect("/admin");
}
