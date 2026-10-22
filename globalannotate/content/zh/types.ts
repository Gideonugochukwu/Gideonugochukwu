import type { Tier } from "@/components/ServicePage";

export type ZhMeta = { title: string; description: string; keywords: string[] };
export type QA = { q: string; a: string };

// Shape of a translated /services/[slug] page — mirrors the props the
// English page passes to <ServicePage>, plus the zh <head> and JSON-LD copy.
export type ZhServiceContent = {
  meta: ZhMeta;
  schemaName: string;
  schemaDescription: string;
  schemaFaq: QA[];
  eyebrow: string;
  title: string;
  intro: string;
  included: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  tiers: Tier[];
  faq: QA[];
};
