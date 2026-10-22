import { notFound } from "next/navigation";

// Catch-all for unknown paths under a locale (e.g. /zh/does-not-exist), so
// they render the localized [locale]/not-found page with the site chrome
// instead of Next's bare root 404.
export default function CatchAll() {
  notFound();
}
