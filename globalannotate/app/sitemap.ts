import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
import { posts } from "@/data/blog";
import { cases } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const blogRoutes = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: new Date(p.date),
  }));

  const portfolioRoutes = cases.map((c) => ({
    path: `/portfolio/${c.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...portfolioRoutes,
  ].map((r) => {
    const lastModified =
      "lastModified" in r && r.lastModified instanceof Date ? r.lastModified : now;
    return {
      url: `${site.url}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    };
  });
}
