import type { BlogPost } from "../blog";
import { img } from "@/lib/images";
import { deAlt } from "@/lib/images.de";
import type { BlogPostZh as BlogPostDe } from "../blog.zh/types";
import { marketreadyDe } from "./marketready";
import { aiAnnotationPostDe } from "./ai-annotation";
import { localizeAppDe } from "./localize-app";
import { internationalSeoDe } from "./international-seo";
import { gameLocalizationPostDe } from "./game-localization";
import { africanLanguageGuideDe } from "./african-language-guide";
import { translationCostGuideDe } from "./translation-cost-guide";

// Full German translations of every English post, keyed by slug.
export const postsDe: Record<string, BlogPostDe> = {
  "marketready-cultural-validation": marketreadyDe,
  "what-is-ai-data-annotation": aiAnnotationPostDe,
  "localize-your-app-for-100-markets": localizeAppDe,
  "international-seo-rank-in-every-language": internationalSeoDe,
  "game-localization-guide": gameLocalizationPostDe,
};

// Posts published only on /de (Google.de/.at/.ch ranking content). Same
// BlogPost shape; `tags` hold the English routing tags used for the
// related-service block.
function deOnly(
  slug: string,
  date: string,
  tags: string[],
  heroImage: { id: string; alt: string },
  de: BlogPostDe
): BlogPost & { deTags: string[]; metaTitle?: string } {
  return {
    slug,
    title: de.title,
    metaTitle: de.metaTitle,
    description: de.description,
    date,
    author: "Gideon Ugochukwu",
    readMinutes: de.readMinutes ?? 10,
    tags,
    heroImage: { ...heroImage, alt: deAlt(heroImage.id) },
    body: de.body,
    faq: de.faq,
    deTags: de.tags,
  };
}

export const deOnlyPosts = [
  deOnly(
    "uebersetzung-afrikanischer-sprachen-leitfaden",
    "2026-10-20",
    ["Localization"],
    img.services.translation,
    africanLanguageGuideDe
  ),
  deOnly(
    "was-kostet-eine-uebersetzung-2026",
    "2026-10-21",
    ["Localization"],
    img.portfolio.seoGrowth,
    translationCostGuideDe
  ),
];

export const DE_ONLY_SLUGS = new Set(deOnlyPosts.map((p) => p.slug));
