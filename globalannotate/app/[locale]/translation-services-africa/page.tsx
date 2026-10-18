import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { ogImages, OG_IMAGE_URL } from "@/lib/i18n-meta";
import { servicesHeroSlides } from "@/lib/images";
import {
  breadcrumbSchema,
  organizationSchema,
  serviceSchema,
} from "@/lib/schema";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

const TITLE =
  "African Language Translation Services — GlobalAnnotate | The Continent's Specialist";
const DESCRIPTION =
  "Africa's specialist translation company. Native-quality translation, localization, and AI data annotation in Hausa, Yoruba, Igbo, Wolof, Amharic, Swahili, Somali, Zulu, and 15+ more African languages. MarketReady™ cultural validation included.";

const URL = `${site.url}/translation-services-africa`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

const GAP = [
  {
    stat: "2,000+",
    label: "languages across Africa",
    body: "500M+ people whose first language isn't English or French — a market most content never reaches.",
  },
  {
    stat: "Most agencies",
    label: "can't cover African languages",
    body: "They cover none at all — or outsource to unvetted freelancers found last-minute, with no accountability.",
  },
  {
    stat: "GlobalAnnotate",
    label: "was built to fill this gap",
    body: "Vetted, NDA-signed, native linguists across the continent — the specialist that African languages were missing.",
  },
];

const REGIONS = [
  {
    region: "West Africa",
    languages: ["Hausa", "Yoruba", "Igbo", "Wolof", "Twi", "Fula", "Ewe", "Moore"],
  },
  {
    region: "East Africa",
    languages: ["Swahili", "Amharic", "Somali", "Tigrinya", "Oromo", "Kinyarwanda"],
  },
  {
    region: "Southern Africa",
    languages: ["Zulu", "Shona", "Xhosa", "Sotho", "Tswana", "Ndebele"],
  },
  {
    region: "Central Africa",
    languages: ["Lingala", "Sango", "Kirundi"],
  },
  {
    region: "North Africa",
    languages: ["Arabic (Egyptian)", "Arabic (Moroccan)", "Arabic (Tunisian)"],
  },
];

const USE_CASES = [
  "Fintech expansion into African markets",
  "NGO / humanitarian content for African populations",
  "E-commerce product listings for African shoppers",
  "Government and public health communications",
  "Game localization for African mobile gamers",
  "AI training data in African languages",
  "Subtitling and dubbing for African streaming audiences",
];

const MARKETREADY = [
  {
    title: "Cultural validation matters more here",
    body: "African markets carry the highest cultural nuance and the greatest risk of tone-deaf content — so validation isn't optional, it's essential.",
  },
  {
    title: "Real native users confirm it works",
    body: "Panels in Kano, Lagos, Dakar, Nairobi, and Addis Ababa review your content and confirm it lands before you launch.",
  },
  {
    title: "A signed MarketReady™ Report",
    body: "Every engagement ends with a documented, signed report certifying the content is ready for its market.",
  },
];

export default function AfricaPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema({
            name: "African Language Translation Services",
            description: DESCRIPTION,
            url: URL,
            areaServed: "Africa",
            serviceType: "Translation & Localization",
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "African Language Translation Services", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Translation Services · Africa"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "African Language Translation Services", href: "/translation-services-africa" },
        ]}
        title="African Languages. Native Speakers. Market-Ready Content."
        subtitle="The translation company built for Africa's languages — from Wolof to Zulu, Hausa to Amharic. Every project includes MarketReady™ cultural validation."
        ctas={[
          { label: "Enter the African market", href: "/contact" },
          { label: "See all languages", href: "/languages", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* Section 1 — The African language gap */}
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            The African language gap
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            The continent the translation industry forgot.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {GAP.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="font-display text-3xl font-semibold tracking-tight text-brand-700">
                  {g.stat}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ink-500">
                  {g.label}
                </p>
                <p className="mt-4 text-ink-600 leading-relaxed">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 2 — Languages we cover across Africa */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Languages we cover across Africa
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Coverage in every region of the continent.
          </h2>
        </div>
        <div className="mt-12 space-y-10">
          {REGIONS.map((r) => (
            <Reveal key={r.region}>
              <div className="grid gap-4 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                  {r.region}
                </h3>
                <ul className="flex flex-wrap gap-2 content-start">
                  {r.languages.map((l) => (
                    <li
                      key={l}
                      className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 3 — Use cases */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Use cases
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            What teams build with us across Africa.
          </h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <Reveal key={u} delay={(i % 2) * 0.04}>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-700 leading-relaxed">{u}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Section 4 — MarketReady™ for African markets */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
            <ShieldCheck className="h-3.5 w-3.5" /> MarketReady™
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            MarketReady™ for African markets.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {MARKETREADY.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {m.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services/marketready"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
          >
            Learn how MarketReady™ works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Section 5 — CTA */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">
            Enter the African market with confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Native-quality translation, cultural validation, and AI data — for
            every African language your growth depends on.
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Talk to an expert <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
