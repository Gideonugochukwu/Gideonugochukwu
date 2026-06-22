export const site = {
  name: "GlobalAnnotate",
  shortName: "GlobalAnnotate",
  domain: "globalannotate.com",
  url: "https://globalannotate.com",
  logo: "https://globalannotate.com/globalannotate-logo.png",
  tagline:
    "Precision Across Languages. Intelligence Across Data. Growth Across Markets.",
  description:
    "GlobalAnnotate delivers AI annotation & data labeling, translation & localization in 100+ languages, multilingual SEO, and performance digital marketing to help global teams ship faster and grow farther.",
  email: "info@globalannotate.com",
  // The only social profiles we maintain. These render in the footer and
  // populate the Organization JSON-LD sameAs. Add more keys here only when
  // a real account exists — the footer and schema both iterate this object.
  social: {
    instagram: "https://www.instagram.com/global_annotate/",
    linkedin: "https://linkedin.com/company/globalannotate",
  },
};

// Founder of GlobalAnnotate. Used by:
//   - the About page founder section + Person JSON-LD
//   - the Organization JSON-LD's "founder" field
//   - every blog post's author byline + author Person schema
//   - the "Founded by Gideon Ugochukwu" footer line
export const founder = {
  name: "Gideon Ugochukwu",
  role: "Founder & Lead Linguist",
  company: "GlobalAnnotate",
  profileUrl: "https://globalannotate.com/about",
  image: "https://globalannotate.com/gideon.jpeg",
  location: "Nigeria",
  description:
    "Gideon Ugochukwu is the founder and lead linguist of GlobalAnnotate, offering translation, AI annotation, digital marketing, and SEO services across 100+ languages.",
  sameAs: [
    "https://linkedin.com/company/globalannotate",
    "https://www.instagram.com/global_annotate/",
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/freelancers", label: "Join Our Network" },
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
  {
    slug: "game-localization",
    title: "Game Localization & Translation",
    short: "Game Localization",
    summary:
      "Bring your game to players worldwide — UI, dialogue, subtitles, voiceover scripts, store listings, and LQA testing in 100+ languages.",
    icon: "Gamepad2",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

// Returns the real social profile URLs in a stable order. Used by the
// footer icon row and the Organization JSON-LD sameAs.
export function activeSocialLinks(): { key: keyof typeof site.social; href: string }[] {
  return (Object.entries(site.social) as [keyof typeof site.social, string][])
    .filter(([, href]) => Boolean(href))
    .map(([key, href]) => ({ key, href }));
}
