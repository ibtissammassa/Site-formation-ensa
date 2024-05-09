import { NextResponse } from "next/server";
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/Login" || path === "/Inscription" || path === "/";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token)
    return NextResponse.redirect(new URL("/my/dashboard", request.nextUrl));
  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/Login", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Login", "/Inscription", "/my/:path*", "/verify-email"],
};
