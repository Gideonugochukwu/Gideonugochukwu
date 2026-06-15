import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Permanent (301) redirect from any *.vercel.app preview/production host to
// the canonical https://globalannotate.com origin, preserving the path and
// query string. Keeps SEO equity flowing to the real domain and prevents
// the old Vercel URL from being indexed.
//
// Skipped for /_next assets (Next.js internals) and a few common health/
// monitoring endpoints so platform probes still hit a 200, not a 301.
const CANONICAL_ORIGIN = "https://globalannotate.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (!host.includes("vercel.app")) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const url = new URL(pathname + search, CANONICAL_ORIGIN);
  return NextResponse.redirect(url, 301);
}

// Skip Next internals, the image optimizer, prerendered metadata, and a few
// common health-check paths.
export const config = {
  matcher: [
    "/((?!_next/|api/health|healthz|robots\\.txt|sitemap\\.xml|favicon\\.ico|apple-touch-icon\\.png|google6092810f1a80faed\\.html).*)",
  ],
};
