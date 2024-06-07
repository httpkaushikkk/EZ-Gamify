import { NextResponse } from "next/server";
import { protectedRoutes } from "./path";

const unProtectedRoutes = ["/", "/login", "/register"];

const routePatterns = protectedRoutes.map((route) => {
  const pattern = route.replace(/:\w+\(.*?\)/g, ".*").replace(/\//g, "\\/");
  return new RegExp(`^${pattern}$`);
});

function isProtectedRoute(pathname) {
  return routePatterns.some((pattern) => pattern.test(pathname));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth-token")?.value;

  if (isProtectedRoute(pathname)) {
    if (!authToken) {
      const absoluteURL = new URL("/", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (unProtectedRoutes.includes(pathname)) {
    if (authToken) {
      const absoluteURL = new URL("/dashboard", request.url);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", ...protectedRoutes],
};
