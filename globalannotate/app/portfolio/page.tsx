import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { img, imageBg, unsplash } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowUpRight } from "lucide-react";

const TITLE = "Portfolio — Case Studies & Results";
const DESCRIPTION =
  "Selected case studies across translation & localization, AI annotation, SEO, and digital marketing — real outcomes for real teams in real markets.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/portfolio` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/portfolio`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

type Case = {
  title: string;
  client: string;
  industry: string;
  service: string;
  summary: string;
  // Optional richer detail blocks. When present they render below the
  // summary. Older compact entries (3 outcomes, single-paragraph summary)
  // omit these and stay tidy.
  challenge?: string;
  approach?: string[];
  duration?: string;
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
  {
    title: "Telehealth app localized into 14 languages in under three weeks",
    client: "A Series-A digital-health platform expanding across Africa, the Middle East and Europe",
    industry: "HealthTech",
    service: "Translation & Localization",
    duration: "19-day launch + ongoing",
    summary:
      "We took a patient telehealth app from one English locale to fourteen in nineteen days — with strict medical accuracy, full right-to-left layout support for Arabic, localized app-store listings in every market, and a continuous-localization pipeline tied to their weekly release so every future build ships in every language.",
    challenge:
      "The team needed to launch fourteen markets in three weeks to meet a regional investor commitment. Medical content can't be approximated — every dose, symptom, and consent line had to be clinically accurate. Arabic added right-to-left layout work the iOS team had never shipped. The App Store and Play Store needed localized titles, descriptions, and screenshots per market, and engineering was committing to a release every Friday, so localization had to land on that cadence without slipping the launch date.",
    approach: [
      "Stood up a team of native medical linguists in every target language, each paired with a second medical reviewer for a strict two-step QA pass on every string",
      "Built a clinical glossary and termbase — drug names, dosage units, anatomy, consent phrasing — seeded by the client's medical advisory board and locked into the TMS so every translator and reviewer worked from the same source of truth",
      "Localized 22k product strings and 60k words of patient-education content in parallel via a connector wired into their GitHub release branches",
      "Ran in-context UI review in the live iOS and Android builds — including a dedicated RTL pass for Arabic with native Arabic engineers and linguists, catching truncation, mirrored icons, and Eastern-Arabic numeral formatting",
      "Localized App Store and Play Store metadata, screenshots and preview videos in all 14 languages, with market-specific imagery and ASO copy for MENA",
      "Shipped a continuous-localization pipeline tied to their Friday release: new strings flow to linguists on merge, return reviewed within 48 hours, and never block a deploy",
    ],
    outcomes: [
      { label: "Languages shipped", value: "14" },
      { label: "Delivery time", value: "19 days" },
      { label: "Non-English signups", value: "+38%" },
      { label: "App-store conversion", value: "+27%" },
      { label: "Localized support tickets", value: "−22%" },
      { label: "Medical-accuracy escalations", value: "0" },
    ],
    image: img.portfolio.telehealthApp,
  },
  {
    title: "8-market e-commerce localization for a DTC brand",
    client: "A European direct-to-consumer fashion and lifestyle brand scaling across the EU",
    industry: "E-commerce",
    service: "Translation & Localization",
    duration: "10-week launch + ongoing",
    summary:
      "We localized 20k SKUs, the brand's editorial voice, the checkout, and every legal page across eight European markets — wiring transcreated campaign copy and a managed termbase into the same release that international SEO and paid marketing launched on. Non-domestic revenue more than tripled in the first year.",
    challenge:
      "The brand had outgrown its single-language store. Eight EU markets needed to launch in time for the autumn campaign, with consistent brand voice, market-correct sizing, market-specific payment methods, and legal content that satisfied each local consumer-protection regime. The product catalogue alone — 20k SKUs across seasonal drops — was changing weekly, and earlier machine-translation attempts had produced flat, off-brand copy that the founders refused to ship.",
    approach: [
      "Transcreated brand voice, campaign copy and editorial content with senior copywriters in each market — same message, locally written, never literal",
      "Localized the 20k-SKU catalogue at scale via a CMS connector and a managed termbase for fabric, fit and material terms, so every product card read consistently in every language",
      "Ran native-language multilingual SEO keyword research per market and fed it directly into the team's category, collection, and landing-page strategy",
      "Localized the full purchase journey — cart, checkout, returns, customer service, and market-specific payment methods, shipping rules and tax content",
      "Localized every legal page (T&Cs, privacy, cookies, withdrawal rights) to the regulatory standard of each market, reviewed by in-country counsel",
      "End-to-end locale QA on live staging — pricing, currency, sizing, imagery, seasonal campaign timing, and RTL handling per market",
    ],
    outcomes: [
      { label: "Markets launched", value: "8" },
      { label: "Non-domestic revenue", value: "+212%" },
      { label: "Conversion rate", value: "+1.9 pts" },
      { label: "New-locale organic traffic", value: "+160%" },
      { label: "Cart abandonment", value: "−14%" },
      { label: "Time-to-market", value: "−50%" },
    ],
    image: img.portfolio.dtcEcommerce,
  },
  {
    title: "E-learning platform localized (video + UI) into 12 languages",
    client: "A global EdTech company serving learners in 60+ countries",
    industry: "EdTech",
    service: "Translation & Localization",
    duration: "16-week programme",
    summary:
      "We subtitled and dubbed hundreds of hours of course video, localized the full product UI, and built a terminology pipeline so technical accuracy held up across twelve languages — all to a strict course-launch schedule. Localized markets out-performed the English baseline on both course completion and learner satisfaction.",
    challenge:
      "The company had built its catalogue in English and was ready to open up twelve new languages, but the work was much larger than a string export. Hundreds of hours of course video needed accurate subtitles and natural-sounding voice-over, technical terms had to stay consistent between video, transcript and UI, accessibility (closed captions, transcripts, descriptive audio) was non-negotiable for the markets they were entering, and the academic team had already announced launch dates for the first wave of localized courses.",
    approach: [
      "Subtitled the full video catalogue in 12 languages with timing QA and on-screen-text localization, plus professional voice-over by native talent on flagship courses",
      "Built subject-specific termbases — engineering, data, design, business — seeded from the course curriculum and used by every linguist, voice actor and reviewer on the programme",
      "Localized the product UI: onboarding, learner dashboards, assessments, notifications and lifecycle emails, all reviewed in context inside the actual product",
      "Shipped full accessibility: closed captions and downloadable transcripts in every language, alt text on every illustration, and descriptive audio where the visual carried the lesson",
      "Cross-device QA across web, iOS, Android and TV apps for every locale — checking subtitle timing, font fallbacks, line-break behaviour and RTL handling",
      "Ran a continuous-localization cadence so new courses ship in all 12 languages on the same release as English, not weeks behind",
    ],
    outcomes: [
      { label: "Languages launched", value: "12" },
      { label: "Catalogue localized", value: "100%" },
      { label: "Course completion", value: "+31%" },
      { label: "Learner satisfaction", value: "+24%" },
      { label: "Per-language launch time", value: "−62%" },
      { label: "New regions opened", value: "3" },
    ],
    image: img.portfolio.eLearning,
  },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Portfolio", url: `${site.url}/portfolio` },
        ])}
      />
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
                <div className={`relative aspect-[16/9] overflow-hidden ${imageBg}`}>
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
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
                    <span>{c.client}</span>
                    {c.duration && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{c.duration}</span>
                      </>
                    )}
                  </div>
                  <p className="mt-3 text-ink-600 leading-relaxed">{c.summary}</p>

                  {c.challenge && (
                    <div className="mt-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Challenge
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-700 leading-relaxed">
                        {c.challenge}
                      </p>
                    </div>
                  )}

                  {c.approach && c.approach.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                        What we did
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {c.approach.map((step) => (
                          <li
                            key={step}
                            className="flex items-start gap-2 text-sm text-ink-700 leading-relaxed"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    className={
                      "mt-6 grid gap-3 " +
                      (c.outcomes.length > 3
                        ? "grid-cols-2 sm:grid-cols-3"
                        : "grid-cols-3")
                    }
                  >
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
