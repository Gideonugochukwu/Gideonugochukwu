import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";
import {
  africanLanguages,
  regionalGroups,
  allLanguageNames,
  servicesEveryLanguage,
} from "@/lib/language-coverage";
import { ArrowRight, Check, Globe, MapPin, Users, Type } from "lucide-react";

const TITLE =
  "Languages We Cover — 100+ Languages for Translation, Localization & AI Data";
const DESCRIPTION =
  "GlobalAnnotate provides translation, localization, MTPE, AI data annotation, and MarketReady™ cultural validation in 100+ languages. Specialist depth in African languages including Hausa, Yoruba, Igbo, Wolof, Amharic, Swahili, Somali, and Zulu.";

const URL = `${site.url}/languages`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQ = [
  {
    q: "How many languages does GlobalAnnotate cover?",
    a: "GlobalAnnotate covers 100+ languages for translation, localization, MTPE, AI data annotation, and MarketReady™ cultural validation — spanning African, European, Asian, Middle Eastern, and Central Asian language families.",
  },
  {
    q: "What African languages does GlobalAnnotate translate?",
    a: "We provide native-quality coverage in Hausa, Yoruba, Igbo, Wolof, Amharic, Swahili, Somali, Zulu, Shona, Twi, Fula (Fulfulde), Tigrinya, Oromo, Kinyarwanda, Lingala, Malagasy, and more — with vetted, NDA-signed linguists rather than last-minute freelancers.",
  },
  {
    q: "Can GlobalAnnotate provide AI annotation in African languages?",
    a: "Yes. We deliver AI data annotation — text classification, sentiment, NER, RLHF preference pairs, audio transcription, and speech evaluation — in African languages like Hausa, Yoruba, Amharic, and Swahili that most annotation vendors cannot staff.",
  },
  {
    q: "What is MarketReady™ cultural validation?",
    a: "MarketReady™ is GlobalAnnotate's proprietary pre-launch process where 3–5 real native users in the target market review translated content and confirm it works — evaluating naturalness, cultural appropriateness, tone, clarity, and sensitivity before you ship.",
  },
  {
    q: "How do I request a quote for translation in a specific language?",
    a: "Contact us through the quote form with your language pair, content type, and volume. We respond with a scoped proposal — and if a language is spoken, we can almost certainly cover it, so ask even if you don't see it listed.",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800">
      {children}
    </span>
  );
}

export default function LanguagesPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListSchema({
            name: "Languages GlobalAnnotate covers",
            description:
              "The 100+ languages GlobalAnnotate covers for translation, localization, MTPE, AI data annotation, and MarketReady™ cultural validation.",
            url: URL,
            items: allLanguageNames,
          }),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Languages", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Languages"
        title="100+ Languages. One Team."
        subtitle="Translation, localization, AI data annotation, and MarketReady™ cultural validation — in every language your business needs."
        ctas={[
          { label: "Request a quote", href: "/contact" },
          { label: "All services", href: "/services", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* African languages — the differentiator, featured first and richest. */}
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            African Languages — Our Specialist Edge
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            The African languages most agencies cannot staff.
          </h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            We provide native-quality coverage in African languages most
            agencies cannot staff. These are not &ldquo;we can try to find
            someone&rdquo; languages — these are languages where we have vetted,
            NDA-signed, experienced linguists ready to work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {africanLanguages.map((lang, i) => (
            <Reveal key={lang.name} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6 transition hover:border-brand-300">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                    {lang.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    <Type className="h-3 w-3" /> {lang.script}
                  </span>
                </div>
                <dl className="mt-4 space-y-2 text-sm text-ink-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <dd>{lang.countries}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0 text-brand-600" />
                    <dd>{lang.speakers} speakers</dd>
                  </div>
                </dl>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {lang.services.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1 text-xs font-medium text-ink-700"
                    >
                      <Check className="h-3 w-3 text-brand-600" strokeWidth={2.4} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services available in every language — the 7-service matrix. */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Services available per language
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Every service, in every language we cover.
          </h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            Each language below is available across our full service stack. If
            you need a combination you don&apos;t see, ask — we scope custom
            programs constantly.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {servicesEveryLanguage.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 0.04}>
              <li className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3.5">
                <span
                  aria-hidden
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="font-medium text-ink-900">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Regional language lists — European, Asian, Middle Eastern, Central Asian. */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Global coverage
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            European, Asian, Middle Eastern &amp; Central Asian languages.
          </h2>
        </div>
        <div className="mt-12 space-y-12">
          {regionalGroups.map((group) => (
            <Reveal key={group.region}>
              <div className="grid gap-6 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink-900">
                    <Globe className="h-5 w-5 text-brand-600" strokeWidth={1.6} />
                    {group.region}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                    {group.blurb}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 content-start">
                  {group.languages.map((l) => (
                    <li key={l}>
                      <Chip>{l}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Bottom CTA — "don't see your language?" */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">
            Don&apos;t see your language?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Contact us — if it&apos;s spoken, we can probably cover it. We add
            languages to active programs every month.
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
