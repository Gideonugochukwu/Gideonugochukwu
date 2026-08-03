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
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";
import { ArrowRight, Check } from "lucide-react";

const TITLE =
  "Translation Services in Nigeria — GlobalAnnotate | Professional Translation, Localization & AI Data";
const DESCRIPTION =
  "Nigeria's specialist translation company. Professional translation, localization, MTPE, AI data annotation, and MarketReady™ cultural validation in 100+ languages. Based in Ibadan, serving clients worldwide. Native coverage in Hausa, Yoruba, Igbo, and every Nigerian language.";

const URL = `${site.url}/translation-services-nigeria`;

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

const WHY = [
  {
    title: "Based in Ibadan, Nigeria",
    body: "Deep roots in the local market — not a remote vendor guessing at context from another continent.",
  },
  {
    title: "Native speakers of every major Nigerian language",
    body: "Vetted, NDA-signed linguists for Hausa, Yoruba, Igbo, and beyond — ready to work, not sourced last-minute.",
  },
  {
    title: "We understand the Nigerian market",
    body: "Business culture, the regulatory environment, and local market dynamics inform every project we deliver.",
  },
  {
    title: "SMEDAN registered",
    body: "A registered Nigerian business (No. SUID-2318-4705-9712-3682) you can contract with confidence.",
  },
];

const MAJOR_LANGUAGES = [
  { name: "Hausa", detail: "Northern Nigeria · 80M+ speakers" },
  { name: "Yoruba", detail: "Southwest Nigeria · 47M+ speakers" },
  { name: "Igbo", detail: "Southeast Nigeria · 45M+ speakers" },
  { name: "Nigerian Pidgin", detail: "Informal / commercial" },
];

const OTHER_LANGUAGES = [
  "Fulfulde",
  "Kanuri",
  "Tiv",
  "Efik",
  "Ibibio",
  "Edo",
  "Nupe",
  "Ijaw",
];

const SERVICES = [
  "Translation for Nigerian companies expanding globally",
  "Localization for international companies entering Nigeria",
  "Certified translation for immigration, legal, and academic documents",
  "AI data annotation in Nigerian languages",
  "MarketReady™ validation for content targeting Nigerian audiences",
  "Multilingual SEO for Nigerian markets",
];

const INDUSTRIES = [
  {
    title: "Fintech",
    body: "App UI localization, onboarding flows, T&Cs, and customer support content for financial inclusion products.",
  },
  {
    title: "E-commerce",
    body: "Product listing translation, checkout flow localization, and SEO-optimized descriptions for local shoppers.",
  },
  {
    title: "Banking & Finance",
    body: "Compliance translation, regulatory documents, and internal communications.",
  },
  {
    title: "Oil & Gas",
    body: "Technical translation, safety documentation, HSE manuals, and field reports.",
  },
  {
    title: "Government & NGOs",
    body: "Public communications, policy documents, health campaigns, and multilingual citizen services.",
  },
  {
    title: "Technology startups",
    body: "App localization, marketing content, and investor materials.",
  },
  {
    title: "Healthcare",
    body: "Clinical documents, patient information, pharmaceutical content, and public health campaigns.",
  },
];

export default function NigeriaPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({
            description: DESCRIPTION,
            url: URL,
            addressLocality: "Ibadan",
            addressRegion: "Oyo State",
            addressCountry: "Nigeria",
            areaServed: "Nigeria",
            serviceType: [
              "Translation",
              "Localization",
              "AI Data Annotation",
            ],
          }),
          serviceSchema({
            name: "Translation Services in Nigeria",
            description: DESCRIPTION,
            url: URL,
            areaServed: "Nigeria",
            serviceType: "Translation & Localization",
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Translation Services in Nigeria", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Translation Services · Nigeria"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Translation Services in Nigeria", href: "/translation-services-nigeria" },
        ]}
        title="Nigeria's Translation & Localization Partner"
        subtitle="Based in Ibadan. Serving the world. Native-quality translation in every Nigerian language — plus 100+ international language pairs."
        ctas={[
          { label: "Get a free quote", href: "/contact" },
          { label: "See all languages", href: "/languages", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* Section 1 — Why GlobalAnnotate for Nigeria */}
      <Section className="pt-20 md:pt-28">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Why GlobalAnnotate
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              A Nigerian company,
              <br />
              built for Nigerian work.
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Section 2 — Nigerian languages we cover */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Nigerian languages we cover
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Every major Nigerian language — natively.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MAJOR_LANGUAGES.map((lang, i) => (
            <Reveal key={lang.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                  {lang.name}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{lang.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium text-ink-700">
            Plus native coverage in:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OTHER_LANGUAGES.map((l) => (
              <li
                key={l}
                className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Section 3 — Services for Nigerian businesses */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Services for Nigerian businesses
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Whichever direction you&apos;re growing.
          </h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s} delay={(i % 2) * 0.04}>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-700 leading-relaxed">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Section 4 — Industries we serve in Nigeria */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Industries we serve in Nigeria
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Sector expertise, not generic translation.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {INDUSTRIES.map((u, i) => (
            <Reveal key={u.title} delay={(i % 2) * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {u.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{u.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 5 — CTA */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">
            Get a free quote for your Nigerian translation project
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Tell us your language pair, content type, and volume — we&apos;ll
            come back with a scoped proposal.
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Get a free quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
