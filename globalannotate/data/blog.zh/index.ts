import type { BlogPost } from "../blog";
import { img } from "@/lib/images";
import { zhAlt } from "@/lib/images.zh";
import type { BlogPostZh } from "./types";
import { marketreadyZh } from "./marketready";
import { aiAnnotationPostZh } from "./ai-annotation";
import { localizeAppZh } from "./localize-app";
import { internationalSeoZh } from "./international-seo";
import { gameLocalizationPostZh } from "./game-localization";
import { africanLanguageGuideZh } from "./african-language-guide";
import { translationCostGuideZh } from "./translation-cost-guide";

// Full Chinese translations of every English post, keyed by slug.
export const postsZh: Record<string, BlogPostZh> = {
  "marketready-cultural-validation": marketreadyZh,
  "what-is-ai-data-annotation": aiAnnotationPostZh,
  "localize-your-app-for-100-markets": localizeAppZh,
  "international-seo-rank-in-every-language": internationalSeoZh,
  "game-localization-guide": gameLocalizationPostZh,
};

// Posts published only on /zh (Baidu ranking content). Same BlogPost shape;
// `tags` hold the English routing tags used for the related-service block.
function zhOnly(
  slug: string,
  date: string,
  tags: string[],
  heroImage: { id: string; alt: string },
  zh: BlogPostZh
): BlogPost & { zhTags: string[] } {
  return {
    slug,
    title: zh.title,
    description: zh.description,
    date,
    author: "Gideon Ugochukwu",
    readMinutes: zh.readMinutes ?? 10,
    tags,
    heroImage: { ...heroImage, alt: zhAlt(heroImage.id) },
    body: zh.body,
    faq: zh.faq,
    zhTags: zh.tags,
  };
}

export const zhOnlyPosts = [
  zhOnly(
    "african-language-translation-guide",
    "2026-10-20",
    ["Localization"],
    img.services.translation,
    africanLanguageGuideZh
  ),
  zhOnly(
    "translation-cost-guide-2026",
    "2026-10-21",
    ["Localization"],
    img.portfolio.seoGrowth,
    translationCostGuideZh
  ),
];

export const ZH_ONLY_SLUGS = new Set(zhOnlyPosts.map((p) => p.slug));
