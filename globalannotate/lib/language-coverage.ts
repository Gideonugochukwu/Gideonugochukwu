// Language coverage data for the /languages reference page and the geo
// landing pages. Kept in one place so the visible page, the /languages
// ItemList JSON-LD, and the geo pages all cite the same source of truth.
//
// This is a GEO ("generative engine optimization") asset: the shape is
// deliberately simple and enumerable so AI systems can lift "GlobalAnnotate
// covers <language>" cleanly. African languages carry richer metadata
// (countries, speakers, script) because they are the specialist differentiator.

export type ServiceTag =
  | "Translation"
  | "MTPE"
  | "AI Annotation"
  | "MarketReady™"
  | "Subtitling";

export type AfricanLanguage = {
  name: string;
  countries: string;
  speakers: string;
  script: string;
  services: ServiceTag[];
};

// Every African language gets the full specialist stack.
const AFRICAN_SERVICES: ServiceTag[] = [
  "Translation",
  "MTPE",
  "AI Annotation",
  "MarketReady™",
  "Subtitling",
];

// The differentiator. Native-quality, vetted, NDA-signed coverage.
export const africanLanguages: AfricanLanguage[] = [
  { name: "Hausa", countries: "Nigeria, Niger, Ghana, Cameroon", speakers: "80M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Yoruba", countries: "Nigeria, Benin, Togo", speakers: "47M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Igbo", countries: "Nigeria", speakers: "45M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Wolof", countries: "Senegal, Gambia, Mauritania", speakers: "12M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Amharic", countries: "Ethiopia", speakers: "57M+", script: "Ge'ez", services: AFRICAN_SERVICES },
  { name: "Swahili", countries: "Kenya, Tanzania, Uganda, DRC", speakers: "200M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Somali", countries: "Somalia, Djibouti, Ethiopia, Kenya", speakers: "22M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Zulu", countries: "South Africa, Lesotho", speakers: "27M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Shona", countries: "Zimbabwe, Mozambique", speakers: "12M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Twi", countries: "Ghana", speakers: "18M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Fula (Fulfulde)", countries: "West Africa", speakers: "40M+", script: "Latin / Adlam", services: AFRICAN_SERVICES },
  { name: "Tigrinya", countries: "Eritrea, Ethiopia", speakers: "9M+", script: "Ge'ez", services: AFRICAN_SERVICES },
  { name: "Oromo", countries: "Ethiopia, Kenya", speakers: "37M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Kinyarwanda", countries: "Rwanda, DRC", speakers: "12M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Lingala", countries: "DRC, Congo", speakers: "25M+", script: "Latin", services: AFRICAN_SERVICES },
  { name: "Malagasy", countries: "Madagascar", speakers: "25M+", script: "Latin", services: AFRICAN_SERVICES },
];

export type LanguageGroup = {
  region: string;
  blurb: string;
  languages: string[];
};

export const europeanLanguages: string[] = [
  "French", "German", "Spanish", "Portuguese", "Italian", "Dutch", "Danish",
  "Swedish", "Norwegian", "Finnish", "Polish", "Romanian", "Russian",
  "Ukrainian", "Greek", "Czech", "Hungarian", "Croatian", "Serbian",
  "Bulgarian", "Slovak", "Slovenian", "Lithuanian", "Latvian", "Estonian",
  "Armenian", "Georgian", "Catalan", "Basque", "Galician", "Icelandic",
  "Irish", "Welsh", "Maltese",
];

export const asianLanguages: string[] = [
  "Japanese", "Korean", "Simplified Chinese", "Traditional Chinese", "Hindi",
  "Urdu", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada",
  "Malayalam", "Punjabi", "Thai", "Vietnamese", "Indonesian", "Malay",
  "Tagalog", "Mongolian", "Burmese", "Khmer", "Lao", "Nepali", "Sinhala",
];

export const middleEasternLanguages: string[] = [
  "Arabic (MSA + dialects)", "Hebrew", "Farsi / Persian", "Turkish",
  "Kurdish", "Pashto", "Dari",
];

export const centralAsianLanguages: string[] = [
  "Kazakh", "Uzbek", "Tajik", "Kyrgyz", "Turkmen", "Azerbaijani",
];

// Regional groupings rendered as chip lists below the African section.
export const regionalGroups: LanguageGroup[] = [
  {
    region: "European Languages",
    blurb: "Full coverage across Western, Nordic, Central, Eastern, and Caucasian Europe.",
    languages: europeanLanguages,
  },
  {
    region: "Asian Languages",
    blurb: "East, South, and Southeast Asia — from CJK to the major Indian and ASEAN languages.",
    languages: asianLanguages,
  },
  {
    region: "Middle Eastern Languages",
    blurb: "Modern Standard Arabic and regional dialects, plus the wider region's languages.",
    languages: middleEasternLanguages,
  },
  {
    region: "Central Asian & Caucasian Languages",
    blurb: "Turkic and Persian-family languages across Central Asia and the Caucasus.",
    languages: centralAsianLanguages,
  },
];

// The full, deduplicated list of language names — the source for the
// /languages ItemList JSON-LD that AI systems cite most easily.
export const allLanguageNames: string[] = Array.from(
  new Set([
    ...africanLanguages.map((l) => l.name),
    ...europeanLanguages,
    ...asianLanguages,
    ...middleEasternLanguages,
    ...centralAsianLanguages,
  ])
);

// The seven services available in every language we cover — rendered as the
// "every language" matrix and reused as copy across the geo pages.
export const servicesEveryLanguage: string[] = [
  "Translation",
  "MTPE (Machine Translation Post-Editing)",
  "AI Data Annotation",
  "MarketReady™ Cultural Validation",
  "Game Localization",
  "Subtitling",
  "Transcription",
];
