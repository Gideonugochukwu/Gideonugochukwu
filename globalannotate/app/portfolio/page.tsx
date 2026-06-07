import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { img, unsplash } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected case studies across translation, AI annotation, and digital marketing — real outcomes for real teams.",
};

type Case = {
  title: string;
  client: string;
  industry: string;
  service: string;
  summary: string;
  outcomes: { label: string; value: string }[];
  image: { id: string; alt: string };
};

const cases: Case[] = [
  {
    title: "Localized a patient app into 14 languages",
    client: "A leading digital health platform",
    industry: "Healthcare",
    service: "Translation & Localization",
    summary:
      "Migrated 60k product strings and patient education materials into 14 languages with culturally adapted UX. Shipped on the engineering release cycle.",
    outcomes: [
      { label: "Languages launched", value: "14" },
      { label: "Time to first locale", value: "18 days" },
      { label: "Linguist QA pass rate", value: "99.4%" },
    ],
    image: img.portfolio.healthApp,
  },
  {
    title: "Annotated 1.2M images for a perception model",
    client: "An autonomous robotics startup",
    industry: "Robotics",
    service: "AI Annotation",
    summary:
      "Continuous semantic segmentation pipeline at 1.2M-image scale, with weekly delivery, gold-set calibration, and inter-annotator agreement tracking.",
    outcomes: [
      { label: "Images labeled", value: "1.2M" },
      { label: "Throughput", value: "+62%" },
      { label: "IAA score", value: "0.93" },
    ],
    image: img.portfolio.robotics,
  },
  {
    title: "Quadrupled ROAS for a sustainable beauty brand",
    client: "A Paris-based DTC cosmetics company",
    industry: "E-commerce",
    service: "Digital Marketing",
    summary:
      "Rebuilt the Meta funnel from creative to landing pages. 40+ creative variants, restructured audiences, and post-purchase retention flows.",
    outcomes: [
      { label: "ROAS", value: "4.1x" },
      { label: "CAC reduction", value: "−38%" },
      { label: "Quarterly revenue", value: "+212%" },
    ],
    image: img.portfolio.beautyBrand,
  },
  {
    title: "Multilingual RLHF dataset for an enterprise LLM",
    client: "A Series-B foundation model company",
    industry: "AI / LLM",
    service: "AI Annotation",
    summary:
      "80k-prompt preference dataset across 8 languages, including red-team adversarial prompts and instruction-following evals.",
    outcomes: [
      { label: "Prompts", value: "80k" },
      { label: "Languages", value: "8" },
      { label: "Eval lift", value: "+11.6%" },
    ],
    image: img.portfolio.llmDataset,
  },
  {
    title: "Arabic-first launch for a UAE beauty brand",
    client: "A regional cosmetics challenger",
    industry: "Beauty",
    service: "Marketing + Localization",
    summary:
      "Arabic transcreation, influencer-led UGC creative, and a Meta growth program. A region-specific brand voice for Gen-Z buyers.",
    outcomes: [
      { label: "ROAS", value: "5.8x" },
      { label: "Followers", value: "+96k" },
      { label: "Break-even", value: "2 months" },
    ],
    image: img.portfolio.uaeLaunch,
  },
  {
    title: "NLP intent dataset across 8 Indian languages",
    client: "An ed-tech company serving rural India",
    industry: "Education",
    service: "AI Annotation",
    summary:
      "Balanced intent and entity dataset across 8 Indian languages with native annotators, including code-mixed utterances common in real users.",
    outcomes: [
      { label: "Utterances", value: "240k" },
      { label: "Languages", value: "8" },
      { label: "Model F1 lift", value: "+9.2%" },
    ],
    image: img.portfolio.indiaNlp,
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <span className="badge">Portfolio</span>
          <h1 className="display-hero mt-5 text-4xl md:text-6xl lg:text-7xl">
            Real teams. Real outcomes.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 leading-relaxed">
            A selection of recent engagements. Names redacted under NDA. Results verified.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <article className="card overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                  <Image
                    src={unsplash(c.image.id, 1400)}
                    alt={c.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(15,23,42,0) 50%, rgba(15,23,42,0.6) 100%)",
                    }}
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium">
                    <span className="bg-white/95 text-ink-700 rounded-full px-2.5 py-1">
                      {c.industry}
                    </span>
                    <span className="bg-white/95 text-brand-700 rounded-full px-2.5 py-1">
                      {c.service}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{c.title}</h2>
                  <p className="mt-1 text-sm text-ink-500">{c.client}</p>
                  <p className="mt-3 text-ink-600 leading-relaxed">{c.summary}</p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {c.outcomes.map((o) => (
                      <div
                        key={o.label}
                        className="rounded-lg border border-ink-200 bg-ink-50/40 p-3"
                      >
                        <div className="font-display text-lg font-semibold">{o.value}</div>
                        <div className="text-xs text-ink-500 mt-0.5">{o.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all"
                  >
                    Discuss a similar project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
