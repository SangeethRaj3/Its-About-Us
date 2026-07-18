import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Until the full archive is ready, only `/` is public.
 * Enable full site with NEXT_PUBLIC_SITE_FULL_RELEASE=true
 * Admin + APIs stay reachable for setup/uploads.
 */
export function middleware(request: NextRequest) {
  const full =
    process.env.NEXT_PUBLIC_SITE_FULL_RELEASE === "true" ||
    process.env.SITE_FULL_RELEASE === "true";

  if (full) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Landing page
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Static / Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // APIs + admin upload (for founders while content is WIP)
  if (pathname.startsWith("/api") || pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Everything else → Trial Ends landing
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
