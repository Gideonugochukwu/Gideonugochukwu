import type { Metadata } from "next";
import { localePath, ogImages, OG_IMAGE_URL } from "./i18n-meta";
import { site } from "./site";

// Helpers for the German (/de) locale. Every /de page is fully translated;
// these keep its <head> consistent for Google.de / .at / .ch: a keyword-first
// "… | GlobalAnnotate" title under 60 characters, a 140–155 character
// description, de_DE Open Graph, and hreflang de / de-AT / de-CH (Germany,
// Austria, and Switzerland share one German version for now).

export const DE_LANG = "de";

// Alternates for a /de page. `deOnly` is for content that exists only in
// German (DACH landing pages, Impressum, German-only articles).
export function deAlternates(
  path = "",
  { deOnly = false }: { deOnly?: boolean } = {}
): NonNullable<Metadata["alternates"]> {
  const de = localePath("de", path);
  return {
    canonical: de,
    languages: deOnly
      ? { de, "de-AT": de, "de-CH": de }
      : {
          en: localePath("en", path),
          de,
          "de-AT": de,
          "de-CH": de,
          "zh-Hans": localePath("zh", path),
          "zh-CN": localePath("zh", path),
          "x-default": localePath("en", path),
        },
  };
}

// Full Metadata block for a /de page. `title` is used verbatim (no layout
// template) so it can follow the "Keyword | GlobalAnnotate" pattern.
export function deMetadata({
  path,
  title,
  description,
  type = "website",
  image,
  imageAlt,
  publishedTime,
  deOnly,
  robots,
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  deOnly?: boolean;
  robots?: Metadata["robots"];
}): Metadata {
  const url = localePath("de", path);
  const images = image
    ? [{ url: image, alt: imageAlt ?? title }]
    : ogImages(
        OG_IMAGE_URL,
        "GlobalAnnotate – Übersetzung afrikanischer Sprachen, Lokalisierung und KI-Datenannotation"
      );
  return {
    title: { absolute: title },
    description,
    alternates: deAlternates(path, { deOnly }),
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "de_DE",
      alternateLocale: deOnly ? ["de_AT", "de_CH"] : ["de_AT", "de_CH", "en_US", "zh_CN"],
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

// Adds inLanguage "de" to each JSON-LD block (schema types and URLs are left
// untouched; names and descriptions are passed in already translated).
export function deLd(data: object | object[]): object[] {
  const items = Array.isArray(data) ? data : [data];
  return items.map((item) => ({ ...item, inLanguage: DE_LANG }));
}

// German breadcrumb label for the home crumb, reused across pages.
export const DE_HOME = "Startseite";

const BRAND_SUFFIX = " | GlobalAnnotate";

// "<keyword title> | GlobalAnnotate" under 60 characters: long titles are
// cut at a word boundary.
export function deTitle(text: string, max = 59): string {
  const room = max - BRAND_SUFFIX.length;
  if (text.length <= room) return text + BRAND_SUFFIX;
  const cut = text.slice(0, room - 1);
  const at = cut.lastIndexOf(" ");
  return cut.slice(0, at > 20 ? at : cut.length).replace(/[\s,:;–-]+$/, "") + "…" + BRAND_SUFFIX;
}

// Fits generated descriptions (case studies) into 140–155 characters: long
// text is cut at a word boundary, short text gets `pad` appended.
export function deDescription(text: string, pad: string, min = 140, max = 155): string {
  let out = text.trim();
  if (out.length < min) out = `${out} ${pad}`;
  if (out.length <= max) return out;
  const cut = out.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return cut.slice(0, at > min - 20 ? at : cut.length).replace(/[\s,:;–-]+$/, "") + "…";
}
