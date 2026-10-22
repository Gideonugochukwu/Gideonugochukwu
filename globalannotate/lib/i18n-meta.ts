import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { zhMetadata } from "./zh";

// Canonical + hreflang helpers so every page can emit correct alternate
// links across en / de / zh. English lives at the root; de/zh are prefixed.
const BASE = "https://globalannotate.com";

// Default Open Graph / Twitter share image (1200×630). Lives in /public and
// shows the GlobalAnnotate wordmark on the brand navy. Used as the fallback
// share image site-wide; blog posts and case studies override it with their
// own featured image.
export const OG_IMAGE_URL = `${BASE}/og-image.png`;
export const OG_IMAGE_ALT =
  "GlobalAnnotate — Precision Across Languages. Intelligence Across Data. Growth Across Markets.";

// The Open Graph `images` array. Pass a custom URL (e.g. a blog hero) to
// override the default; `alt` describes it for accessibility + link previews.
export function ogImages(url: string = OG_IMAGE_URL, alt: string = OG_IMAGE_ALT) {
  return [{ url, width: 1200, height: 630, alt }];
}

export function localePath(locale: string, path = ""): string {
  const p = path && !path.startsWith("/") ? `/${path}` : path;
  return locale === "en" ? `${BASE}${p}` : `${BASE}/${locale}${p}`;
}

// alternates block for a page at `path` (no leading slash needed), viewed in
// `locale`. canonical points at the current locale; languages + x-default
// cover all three locales. Chinese is listed under both the BCP-47 script
// subtag zh-Hans and the region tag zh-CN (Baidu and Google both read it).
export function hreflangAlternates(
  locale: string,
  path = ""
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(locale, path),
    languages: {
      en: localePath("en", path),
      de: localePath("de", path),
      "zh-Hans": localePath("zh", path),
      "zh-CN": localePath("zh", path),
      "x-default": localePath("en", path),
    },
  };
}

// Open Graph locale codes. Chinese is zh_CN (Simplified, Mainland China).
export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  de: "de_DE",
  zh: "zh_CN",
};

export function ogAlternateLocales(locale: string): string[] {
  return Object.entries(OG_LOCALE)
    .filter(([l]) => l !== locale)
    .map(([, v]) => v);
}

// <html lang="…"> value per locale. Chinese resolves to zh-CN.
export const HTML_LANG: Record<string, string> = {
  en: "en",
  de: "de",
  zh: "zh-CN",
};

// Builds a full localized Metadata block for a page: translated title +
// description (from the `meta.<metaKey>` namespace), hreflang alternates, and
// Open Graph with the correct og:locale + alternates. The parent layout's
// title template (`%s · GlobalAnnotate`) is applied to the returned title.
export async function buildMetadata({
  locale,
  path,
  metaKey,
}: {
  locale: string;
  path: string;
  metaKey: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${metaKey}.title`);
  const description = t(`${metaKey}.description`);

  // Chinese pages carry a full "关键词 | GlobalAnnotate" title plus a Baidu
  // keyword list, so they skip the layout's "· GlobalAnnotate" template.
  if (locale === "zh") {
    return zhMetadata({
      path,
      title,
      description,
      keywords: t.raw(`${metaKey}.keywords`) as string[],
    });
  }

  return {
    title,
    description,
    alternates: hreflangAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localePath(locale, path),
      siteName: "GlobalAnnotate",
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: ogAlternateLocales(locale),
      type: "website",
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
    },
  };
}

// Adds the en/de/zh-Hans/zh-CN/x-default hreflang set to a page's existing
// Metadata while keeping its canonical exactly as it was. Used by pages that
// define static English metadata, so their /zh twins are linked reciprocally.
export function withHreflang(meta: Metadata, path: string): Metadata {
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      languages: hreflangAlternates("en", path).languages,
    },
  };
}
