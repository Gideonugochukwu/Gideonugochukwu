import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
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
  accent: string;
};

const cases: Case[] = [
  {
    title: "Localizing a patient app into 14 languages",
    client: "A leading digital health platform",
    industry: "Healthcare",
    service: "Translation & Localization",
    summary:
      "Migrated 60k product strings, marketing copy, and patient education materials into 14 languages with culturally adapted UX flows. Shipped on time alongside the engineering release cycle.",
    outcomes: [
      { label: "Languages launched", value: "14" },
      { label: "Time to first locale", value: "18 days" },
      { label: "Linguist QA pass rate", value: "99.4%" },
    ],
    accent:
      "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(15,23,42,0.05))",
  },
  {
    title: "Annotating 1.2M images for a perception model",
    client: "An autonomous robotics startup",
    industry: "Robotics",
    service: "AI Annotation",
    summary:
      "Built a continuous labeling pipeline for semantic segmentation across a 1.2M-image dataset, with weekly delivery, gold-set calibration, and inter-annotator agreement tracking.",
    outcomes: [
      { label: "Images labeled", value: "1.2M" },
      { label: "Throughput", value: "+62%" },
      { label: "IAA score", value: "0.93" },
    ],
    accent:
      "linear-gradient(135deg, rgba(15,23,42,0.10), rgba(16,185,129,0.12))",
  },
  {
    title: "Quadrupling ROAS for a sustainable beauty brand",
    client: "A Paris-based DTC cosmetics company",
    industry: "E-commerce",
    service: "Digital Marketing",
    summary:
      "Rebuilt the Meta funnel from creative to landing pages. Tested 40+ creative variants, restructured audiences by intent, and introduced post-purchase retention flows.",
    outcomes: [
      { label: "ROAS", value: "4.1x" },
      { label: "CAC reduction", value: "−38%" },
      { label: "Quarterly revenue", value: "+212%" },
    ],
    accent:
      "linear-gradient(135deg, rgba(16,185,129,0.22), rgba(15,23,42,0.08))",
  },
  {
    title: "Multilingual RLHF dataset for an enterprise LLM",
    client: "A Series-B foundation model company",
    industry: "AI / LLM",
    service: "AI Annotation",
    summary:
      "Designed and delivered a 80k-prompt preference dataset across 8 languages, including red-team adversarial prompts and instruction-following evals.",
    outcomes: [
      { label: "Prompts", value: "80k" },
      { label: "Languages", value: "8" },
      { label: "Eval lift", value: "+11.6%" },
    ],
    accent:
      "linear-gradient(135deg, rgba(15,23,42,0.06), rgba(16,185,129,0.18))",
  },
  {
    title: "Arabic-first launch for a UAE beauty brand",
    client: "A regional cosmetics challenger",
    industry: "Beauty",
    service: "Digital Marketing + Localization",
    summary:
      "Combined Arabic transcreation, influencer-led UGC creative, and a Meta growth program to launch in the GCC. Built a region-specific brand voice that resonated with Gen-Z buyers.",
    outcomes: [
      { label: "ROAS", value: "5.8x" },
      { label: "Followers", value: "+96k" },
      { label: "Months to break-even", value: "2" },
    ],
    accent:
      "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(15,23,42,0.08))",
  },
  {
    title: "NLP intent dataset across 8 Indian languages",
    client: "An ed-tech company serving rural India",
    industry: "Education",
    service: "AI Annotation",
    summary:
      "Built a balanced intent and entity dataset across 8 Indian languages with native annotators, including code-mixed (Hinglish-style) utterances common in real users.",
    outcomes: [
      { label: "Utterances", value: "240k" },
      { label: "Languages", value: "8" },
      { label: "Model F1 lift", value: "+9.2%" },
    ],
    accent:
      "linear-gradient(135deg, rgba(15,23,42,0.08), rgba(16,185,129,0.16))",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <span className="badge">Portfolio</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Real teams. Real outcomes.
          </h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            A selection of recent engagements across translation, annotation,
            and digital marketing. Names redacted under NDA, results verified.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <article className="card overflow-hidden h-full flex flex-col">
                <div className="h-32 relative" style={{ background: c.accent }}>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                      maskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 100%, #000 30%, transparent 80%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 100%, #000 30%, transparent 80%)",
                    }}
                  />
                  <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-xs font-medium">
                    <span className="bg-white/90 text-ink-700 rounded-full px-2.5 py-1">
                      {c.industry}
                    </span>
                    <span className="bg-white/90 text-brand-700 rounded-full px-2.5 py-1">
                      {c.service}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold tracking-tight">{c.title}</h2>
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
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:gap-2.5 transition-all"
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
