import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("auth-token")?.value;
  const protectedRoutes = ["/dashboard", "/dashboard/:path, /dashboard/authenticator/admin/view"];

  if (!authToken && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path"],
};
