import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/dashboard/games",
  "/dashboard/games/:path(.*)",
];
const unProtectedRoutes = ["/", "/login", "/register"];

export function middleware(request) {
  const authToken = request.cookies.get("auth-token")?.value;
  const dynamicRouteRegex = /^\/dashboard\/games\/(.*)$/;

  const check = protectedRoutes.some(
    (route) =>
      route === request.nextUrl.pathname ||
      dynamicRouteRegex.test(request.nextUrl.pathname)
  );

  if (!authToken && check) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (authToken && unProtectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/dashboard", request.url);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/games/:path*",
  ],
};
