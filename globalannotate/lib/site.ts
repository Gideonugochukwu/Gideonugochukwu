export const site = {
  name: "GlobalAnnotate",
  shortName: "GlobalAnnotate",
  domain: "globalannotate.com",
  url: "https://globalannotate.com",
  logo: "https://globalannotate.com/favicon.svg",
  tagline:
    "Precision Across Languages. Intelligence Across Data. Growth Across Markets.",
  description:
    "GlobalAnnotate delivers AI annotation & data labeling, translation & localization in 100+ languages, multilingual SEO, and performance digital marketing to help global teams ship faster and grow farther.",
  email: "info@globalannotate.com",
  // Social and contact URLs. Replace any value containing REPLACE_ME with a
  // real URL/phone before going live. Empty strings and REPLACE_ME placeholders
  // are filtered out of the footer icon row, the Organization sameAs schema,
  // and the floating WhatsApp button automatically.
  social: {
    linkedin: "https://www.linkedin.com/company/REPLACE_ME",
    twitter: "https://x.com/REPLACE_ME",
    instagram: "https://instagram.com/REPLACE_ME",
    facebook: "https://facebook.com/REPLACE_ME",
    tiktok: "https://www.tiktok.com/@REPLACE_ME",
    youtube: "https://www.youtube.com/@REPLACE_ME",
  },
  // International phone number in E.164 format without the leading + (wa.me format).
  // e.g. "14155552671" for +1 415 555 2671.
  whatsappNumber: "REPLACE_PHONE_NUMBER",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "translation-localization",
    title: "Translation & Localization",
    short: "Translation & Localization",
    summary:
      "Human-quality translation and culturally accurate localization across 100+ languages for websites, apps, documents, and multimedia.",
    icon: "Languages",
  },
  {
    slug: "ai-annotation",
    title: "AI Annotation & Data Labeling",
    short: "AI Annotation",
    summary:
      "High-precision training data for computer vision, NLP, and LLM teams — bounding boxes, semantic segmentation, audio, and text, all QA-checked.",
    icon: "Brain",
  },
  {
    slug: "seo",
    title: "SEO & Search Visibility",
    short: "SEO & Search Visibility",
    summary:
      "Rank everywhere you sell — in every language. Multilingual & international SEO, technical audits, content, and link building that compound.",
    icon: "Search",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Digital Marketing",
    summary:
      "Performance-driven Facebook and Instagram ads, social media management, and content strategy that turn audiences into customers.",
    icon: "Megaphone",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

// Returns the URLs from site.social that are real (non-empty, no REPLACE_ME).
// Used for footer icons and Organization JSON-LD sameAs.
export function activeSocialLinks(): { key: keyof typeof site.social; href: string }[] {
  return (Object.entries(site.social) as [keyof typeof site.social, string][])
    .filter(([, href]) => href && !href.includes("REPLACE_ME"))
    .map(([key, href]) => ({ key, href }));
}

// Returns a wa.me click-to-chat URL, or null if the number is still a placeholder.
export function whatsappUrl(message?: string): string | null {
  const n = site.whatsappNumber;
  if (!n || n.includes("REPLACE")) return null;
  const base = `https://wa.me/${n.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
