import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasRefreshToken = request.cookies.get("refresh_token");
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  const response = NextResponse.next();

  // Keep hint cookie in sync with refresh token
  if (hasRefreshToken) {
    response.cookies.set("has_session", "true", {
      httpOnly: false, // readable by JS
      sameSite: "lax",
      path: "/",
    });
  } else {
    response.cookies.delete("has_session");
  }

  if (hasRefreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
