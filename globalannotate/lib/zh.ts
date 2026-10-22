import type { Metadata } from "next";
import { localePath, ogImages, OG_IMAGE_URL } from "./i18n-meta";
import { site } from "./site";

// Helpers for the Simplified Chinese (/zh) locale. Every /zh page is fully
// translated; these keep its <head> consistent for Baidu: a keyword-first
// "… | GlobalAnnotate" title, a 60–100 character description, a
// <meta name="keywords"> list (Baidu still reads it), zh_CN Open Graph, and
// hreflang alternates that include both zh-Hans and zh-CN.

export const ZH_LANG = "zh-CN";

export function isZh(locale: string | undefined): boolean {
  return locale === "zh";
}

// Alternates for a /zh page: canonical on the Chinese URL, plus every locale.
// `zhOnly` is for content that exists only in Chinese (new zh blog posts).
export function zhAlternates(
  path = "",
  { zhOnly = false }: { zhOnly?: boolean } = {}
): NonNullable<Metadata["alternates"]> {
  const zh = localePath("zh", path);
  return {
    canonical: zh,
    languages: zhOnly
      ? { "zh-Hans": zh, "zh-CN": zh }
      : {
          en: localePath("en", path),
          de: localePath("de", path),
          "zh-Hans": zh,
          "zh-CN": zh,
          "x-default": localePath("en", path),
        },
  };
}

// Full Metadata block for a /zh page. `title` is used verbatim (no layout
// template) so it can follow the "关键词 | GlobalAnnotate" pattern.
export function zhMetadata({
  path,
  title,
  description,
  keywords,
  type = "website",
  image,
  imageAlt,
  publishedTime,
  zhOnly,
}: {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  zhOnly?: boolean;
}): Metadata {
  const url = localePath("zh", path);
  const images = image
    ? [{ url: image, alt: imageAlt ?? title }]
    : ogImages(OG_IMAGE_URL, "GlobalAnnotate——非洲语言翻译、本地化与 AI 数据标注");
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: zhAlternates(path, { zhOnly }),
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "zh_CN",
      alternateLocale: zhOnly ? [] : ["en_US", "de_DE"],
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? OG_IMAGE_URL],
    },
  };
}

// Adds inLanguage "zh-CN" to each JSON-LD block (schema types and URLs are
// left untouched; names/descriptions are passed in already translated).
export function zhLd(data: object | object[]): object[] {
  const items = Array.isArray(data) ? data : [data];
  return items.map((item) => ({ ...item, inLanguage: ZH_LANG }));
}

// Chinese breadcrumb label for the home crumb, reused across pages.
export const ZH_HOME = "首页";
