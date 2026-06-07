export const site = {
  name: "GlobalAnnotate",
  shortName: "GlobalAnnotate",
  domain: "globalannotate.com",
  url: "https://globalannotate.com",
  tagline:
    "Precision Across Languages. Intelligence Across Data. Growth Across Markets.",
  description:
    "GlobalAnnotate delivers AI annotation & data labeling, translation & localization in 100+ languages, and performance digital marketing to help global teams ship faster and grow farther.",
  email: "info@globalannotate.com",
  social: {
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
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
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Digital Marketing",
    summary:
      "Performance-driven Facebook and Instagram ads, social media management, and content strategy that turn audiences into customers.",
    icon: "Megaphone",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
