import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set("alb_build_admin", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.ADMIN_COOKIE_SECURE === "true",
    path: "/",
    maxAge: 0
  });
  return response;
}
