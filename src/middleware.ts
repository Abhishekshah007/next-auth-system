import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("Requested path:", path);

  const isPublicPath = path === "/frontend/login" || path === "/frontend/signup" ||path === "/frontend/verify-email";
  console.log("Is public path:", isPublicPath);

  const token = request.cookies.get("token")?.value || "";
  console.log("Token:", token);

  if (isPublicPath&& token ) {
    console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/frontend/dashboard", request.url));
  }

  if (!token && !isPublicPath) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/frontend/login", request.url));
  }

}

export const config = {
  matcher: ["/frontend/login", "/frontend/signup", "/frontend/dashboard", "/frontend/verify-email", "/"],
};
