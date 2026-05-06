import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");
  const isLogin = request.nextUrl.pathname === "/admin/login";
  const hasSession = request.cookies.get("alb_build_admin")?.value === "1";

  if (isAdmin && !isLogin && !hasSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLogin && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
