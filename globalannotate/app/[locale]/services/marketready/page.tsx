import type { Metadata } from "next";
import { buildMetadata } from "@/lib/i18n-meta";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import {
  AlertTriangle,
  Users,
  Wrench,
  FileCheck2,
  ShieldCheck,
  Globe2,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/services/marketready", metaKey: "marketready" });
}

// Kept in English on purpose: feeds the Service JSON-LD, which stays English
// across all locales (canonical schema).
const DESCRIPTION =
  "The only translation service that validates your content with real native users before launch. Avoid costly cultural misfires. Get certified market-ready content.";

const STATS = [
  {
    value: "39%",
    body: "of marketers say their worst localization mistake cost over $10,000.",
  },
  {
    value: "29%",
    body: "say a poor translation damaged their brand's reputation.",
  },
  {
    value: "55%",
    body: "of users say machine translation fails them in informal contexts.",
  },
];

const MISTAKES = [
  {
    brand: "HSBC",
    line: "“Assume Nothing” launched worldwide as “Do Nothing.”",
  },
  {
    brand: "KFC",
    line: "“Finger-lickin' good” arrived in China as “Eat Your Fingers Off.”",
  },
];

const STEPS = [
  {
    icon: Layers,
    tag: "Step 1",
    title: "Translation & Linguistic QA",
    body: "Native linguists translate and a second reviewer checks accuracy, terminology, and consistency — the step every serious agency does.",
  },
  {
    icon: Users,
    tag: "Step 2",
    title: "Cultural Validation Panel",
    body: "3–5 real native users in your target market — not translators — review the content blind and evaluate naturalness, cultural fit, tone, clarity, and sensitivity. This is the step nobody else does.",
  },
  {
    icon: Wrench,
    tag: "Step 3",
    title: "Issue Resolution",
    body: "Critical and major issues the panel flags are fixed by our linguists and re-validated — so problems are caught and closed before launch, not after.",
  },
  {
    icon: FileCheck2,
    tag: "Step 4",
    title: "Market-Ready Report",
    body: "You receive a signed certification: a tangible artifact confirming that real users reviewed the content and judged it ready for your market.",
  },
];

const WHY = [
  {
    icon: FileCheck2,
    title: "A tangible artifact",
    body: "Show your CMO, legal team, or board the MarketReady Report: “This content was tested with real users before launch.” Confidence you can put on paper.",
  },
  {
    icon: ShieldCheck,
    title: "Cheaper than a crisis",
    body: "A 5-person validation panel costs a fraction of a single post-launch brand crisis, recall, or emergency rebrand.",
  },
  {
    icon: Globe2,
    title: "Critical for hard markets",
    body: "Most important in African, Asian, and Middle Eastern markets — where cultural nuance is highest and qualified validators are hardest to find.",
  },
];

const EDGE = [
  {
    title: "Panels others can't reach",
    body: "Native-speaker validation panels in markets nobody else covers — Hausa, Yoruba, Wolof, Igbo, Amharic, Swahili, Somali, and Zulu — alongside major European, Asian, and Middle Eastern markets.",
  },
  {
    title: "Real consumers, not linguists",
    body: "Not just translators — real people living in-market who represent your actual audience and react the way your customers will.",
  },
  {
    title: "One team, one report",
    body: "From translation through validation, it's one team and one process — ending in a single signed Market-Ready Report.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is MarketReady, and how is it different from proofreading?",
    a: "MarketReady is a pre-launch cultural validation service. Proofreading checks whether the words are linguistically correct; MarketReady checks whether the content actually works. Three to five real native users in your target market review it blind and rate naturalness, cultural fit, tone, clarity, and sensitivity — before you launch.",
  },
  {
    q: "Who are the panelists, and how are they selected?",
    a: "They're real consumers living in the target market who match your audience — not translators or linguists. We recruit and vet them per project for the right market, demographic, and register, so their reaction mirrors your actual customers'.",
  },
  {
    q: "How long does it add to my project timeline?",
    a: "Typically 3–5 business days for panel recruitment, blind review, and the report — often run in parallel with final QA, so it rarely moves your launch date. Larger multi-market programs are scheduled up front.",
  },
  {
    q: "Can I use MarketReady on content translated by another agency?",
    a: "Yes. MarketReady works as a standalone validation layer on any content, including translations you already have. We validate it with native users and deliver the same signed Market-Ready Report.",
  },
  {
    q: "What markets can you validate for?",
    a: "100+ languages, with panels in markets most agencies can't reach — including Hausa, Yoruba, Wolof, Igbo, Amharic, Swahili, Somali, and Zulu — alongside major European, Asian, and Middle Eastern markets.",
  },
];

// FAQPage JSON-LD content — the canonical, GEO-optimized Q&A surfaced to
// search engines and AI systems. Kept distinct from the visible `FAQ_ITEMS`
// above (which drives the on-page accordion) so page content stays unchanged.
const SCHEMA_FAQ = [
  {
    q: "What is MarketReady™?",
    a: "MarketReady is GlobalAnnotate's proprietary pre-launch cultural validation process. Before delivery, 3-5 real native users in the target market review translated content and confirm it works.",
  },
  {
    q: "How is MarketReady different from proofreading?",
    a: "Proofreading checks linguistic accuracy. MarketReady tests whether the content works with real people — evaluating naturalness, cultural appropriateness, tone, clarity, and sensitivity.",
  },
  {
    q: "How long does MarketReady add to project timelines?",
    a: "Typically 24-48 hours for the validation panel, depending on language and content type.",
  },
  {
    q: "Can I use MarketReady on content translated by another agency?",
    a: "Yes. MarketReady can validate any translated content, regardless of who translated it.",
  },
  {
    q: "What languages can GlobalAnnotate validate?",
    a: "All 100+ languages we cover, with particular depth in African languages where cultural nuance is highest and qualified validators are hardest to find.",
  },
];

export default function MarketReadyPage() {
  const url = `${site.url}/services/marketready`;
  const heroSlides = [
    {
      id: "1522071820081-009f0129c71c",
      alt: "A panel of native users reviewing content before launch",
    },
    ...servicesHeroSlides,
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "MarketReady™ Cultural Validation",
            description: DESCRIPTION,
            url,
            areaServed: "Worldwide",
            serviceType: "Pre-launch cultural validation",
          }),
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "MarketReady™", url },
          ]),
        ]}
      />

      <PageHero
        eyebrow="MarketReady™ · Cultural Validation"
        title="MarketReady™ — the only translation service that guarantees your content works in the target market."
        subtitle="Every other agency delivers translations. We deliver market-ready content — validated by real native users before you launch."
        ctas={[
          { label: "Talk to an expert", href: "/contact" },
          { label: "All services", href: "/services", variant: "ghost" },
        ]}
        slides={heroSlides}
      />

      {/* A) THE PROBLEM */}
      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            <AlertTriangle className="h-4 w-4" /> The problem
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            A “correct” translation can still destroy your brand.
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            Every translation agency checks whether the words are correct. Almost
            nobody checks whether the content actually works with real people —
            and that gap is where expensive, public mistakes happen.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.05}>
              <div className="card h-full p-7">
                <div className="display-num text-4xl md:text-5xl">{s.value}</div>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {MISTAKES.map((m) => (
            <div
              key={m.brand}
              className="rounded-2xl border border-ink-200/80 bg-white p-6"
            >
              <p className="text-sm font-semibold text-ink-900">{m.brand}</p>
              <p className="mt-1.5 text-ink-600 leading-relaxed">{m.line}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-ink-600 leading-relaxed">
          Every one of these was linguistically “correct.” Each still damaged
          brand perception — because the root cause isn&apos;t bad grammar, it&apos;s that
          no one tested the content with the people it was meant for.
        </p>
      </Section>

      {/* B) THE SOLUTION */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            The solution · MarketReady™
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Four steps from translation to certified market-ready.
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            MarketReady adds the one step every other agency skips — real native
            users — and ends with a signed certification you can act on.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {STEPS.map((s, i) => {
            const highlight = i === 1;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <li
                  className={
                    "h-full rounded-2xl p-7 " +
                    (highlight
                      ? "border-2 border-brand-500 bg-white shadow-[0_20px_60px_-25px_rgba(16,185,129,0.45)]"
                      : "border border-ink-200 bg-white")
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl " +
                        (highlight
                          ? "bg-brand-500 text-white"
                          : "bg-brand-50 text-brand-700")
                      }
                    >
                      <s.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700">
                      {s.tag}
                      {highlight && (
                        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand-700">
                          Our difference
                        </span>
                      )}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      {/* C) WHY THIS MATTERS */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Why it matters
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Proof you can put in front of your board.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <w.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">
                  {w.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* D) OUR EDGE */}
      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              The GlobalAnnotate edge
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              Validators nobody else can reach.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Especially in the markets where cultural nuance is highest and
              qualified validators are hardest to find.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-1">
            {EDGE.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">
                      {e.title}
                    </h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">
                      {e.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* E) PRICING */}
      <Section>
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
                Pricing
              </p>
              <h2 className="section-h2 mt-4 text-ink-900">
                Simple. And often already included.
              </h2>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} />
                  <span>
                    <strong className="font-semibold text-ink-900">Included as standard</strong>{" "}
                    on all projects above $5,000.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} />
                  <span>
                    Available as an{" "}
                    <strong className="font-semibold text-ink-900">add-on for any translation project</strong>{" "}
                    at a flat per-language fee.
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:text-right">
              <Link
                href="/contact"
                className="btn-primary text-sm"
              >
                Talk to an expert <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* F) FAQ */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            FAQ
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">Questions, answered.</h2>
        </div>
        <div className="mt-12 max-w-3xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
