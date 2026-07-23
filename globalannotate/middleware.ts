import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl handles locale detection (Accept-Language + NEXT_LOCALE cookie),
// the /fr and /es prefixes, and "never redirect if already prefixed".
const intlMiddleware = createMiddleware(routing);

// Permanent (301) redirect from any *.vercel.app host to the canonical
// origin, preserving path + query. Runs before the i18n middleware.
const CANONICAL_ORIGIN = "https://globalannotate.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.includes("vercel.app")) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(
      new URL(pathname + search, CANONICAL_ORIGIN),
      301
    );
  }
  return intlMiddleware(request);
}

// Run on everything except Next internals, the image optimizer, and any path
// with a file extension (sitemap.xml, robots.txt, *.png, the Google
// verification .html file, favicon, etc.), plus API/health routes.
export const config = {
  matcher: ["/((?!api|_next|_vercel|healthz|.*\\..*).*)"],
};
