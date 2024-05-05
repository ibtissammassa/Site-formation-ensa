import { NextResponse } from "next/server";
import { getDataFromToken } from "./app/actions";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/Login" || path === "/Inscription" || path === "/";
  const token = request.cookies.get("token")?.value || "";
  const user = getDataFromToken();
  console.log("middleware user : " + user);
  const isVerified = user.isVerified;
  if (isPublicPath && token)
    return NextResponse.redirect(new URL("/my/dashboard", request.nextUrl));
  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/Login", request.nextUrl));
  // if (token && user && !isVerified && !isPublicPath)
  //   return NextResponse.redirect(
  //     new URL(`/verify-email?email=${user.email}`, request.nextUrl)
  //   );
  // if (isVerified && path === "/verify-email")
  //   return NextResponse.redirect(new URL(`/my/dashboard`, request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Login", "/Inscription", "/my/:path*", "/verify-email"],
};
