import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
import { posts } from "@/data/blog";
import { cases } from "@/data/portfolio";
import { localePath } from "@/lib/i18n-meta";

// hreflang alternates for a path, emitted as <xhtml:link> entries by Next.
// English is canonical (root); de/zh are prefixed. zh uses the zh-Hans subtag.
function localeAlternates(path: string) {
  return {
    languages: {
      en: localePath("en", path),
      de: localePath("de", path),
      "zh-Hans": localePath("zh", path),
    },
  };
}

// Stable site-wide "last meaningfully updated" date. Used as a sensible
// fallback for static pages and service detail pages where there isn't a
// per-record date in the data. Bump this when copy/structure changes site
// wide rather than letting the sitemap thrash on every deploy.
const SITE_LAST_UPDATED = "2026-07-13";

export default function sitemap(): MetadataRoute.Sitemap {
  const fallback = new Date(SITE_LAST_UPDATED);

  // Static / landing routes. Every public page is listed; legal pages
  // change rarely and carry a yearly changeFrequency hint.
  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified: Date;
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: fallback },
    { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: fallback },
    { path: "/languages", priority: 0.9, changeFrequency: "monthly", lastModified: fallback },
    { path: "/translation-services-nigeria", priority: 0.9, changeFrequency: "monthly", lastModified: fallback },
    { path: "/translation-services-africa", priority: 0.9, changeFrequency: "monthly", lastModified: fallback },
    { path: "/services/marketready", priority: 0.9, changeFrequency: "monthly", lastModified: fallback },
    { path: "/portfolio", priority: 0.85, changeFrequency: "monthly", lastModified: fallback },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly", lastModified: fallback },
    { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: fallback },
    { path: "/freelancers", priority: 0.6, changeFrequency: "monthly", lastModified: fallback },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly", lastModified: fallback },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastModified: fallback },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: fallback },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: fallback },
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
    lastModified: fallback,
  }));

  const blogRoutes = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
    lastModified: new Date(p.date),
  }));

  const portfolioRoutes = cases.map((c) => ({
    path: `/portfolio/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: new Date(c.lastUpdated),
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...portfolioRoutes,
  ].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: localeAlternates(r.path),
  }));
}
