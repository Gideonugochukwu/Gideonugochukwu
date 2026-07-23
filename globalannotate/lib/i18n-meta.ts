import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Canonical + hreflang helpers so every page can emit correct alternate
// links across en / de / zh. English lives at the root; de/zh are prefixed.
const BASE = "https://globalannotate.com";

export function localePath(locale: string, path = ""): string {
  const p = path && !path.startsWith("/") ? `/${path}` : path;
  return locale === "en" ? `${BASE}${p}` : `${BASE}/${locale}${p}`;
}

// alternates block for a page at `path` (no leading slash needed), viewed in
// `locale`. canonical points at the current locale; languages + x-default
// cover all three locales. Chinese uses the BCP-47 script subtag zh-Hans.
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
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
