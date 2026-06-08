import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Bots that aggressively crawl without business benefit. Disallow by default;
// remove entries if you ever want one of these to crawl the site.
const ABUSIVE_BOTS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
  "BLEXBot",
  "DataForSeoBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ABUSIVE_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
