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
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { ArrowRight, HeartPulse, Factory, Scale, Landmark, Cpu } from "lucide-react";

const TITLE =
  "Industries — GlobalAnnotate | Medical, Manufacturing, Legal, Public Sector & AI";
const DESCRIPTION =
  "Specialist language and AI data services for regulated and enterprise sectors: medical & life sciences, manufacturing & technical, legal & corporate, public sector & NGOs, and AI & tech — in 100+ languages.";

const URL = `${site.url}/industries`;

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

const INDUSTRIES = [
  {
    id: "medical",
    icon: HeartPulse,
    name: "Medical & Life Sciences",
    body: "Precise, compliant language for clinical and regulated medical content, handled by specialist linguists under confidentiality.",
    points: [
      "Clinical trial documents (protocols, ICFs, CRFs)",
      "Instructions for use (IFUs) and device labeling",
      "Patient-facing materials and questionnaires",
      "EU MDR/IVDR language requirements across member-state languages",
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    name: "Manufacturing & Technical",
    body: "Technical accuracy for complex products, machinery, and the documentation that keeps workers safe and compliant.",
    points: [
      "User and maintenance manuals",
      "Safety documentation and HSE materials",
      "Machinery, industrial, and engineering content",
      "Product localization for international markets",
    ],
  },
  {
    id: "legal",
    icon: Scale,
    name: "Legal & Corporate",
    body: "Confidential, accurate translation for legal and corporate teams, with certified translation available on request.",
    points: [
      "Contracts, agreements, and corporate documents",
      "Compliance, regulatory, and policy material",
      "E-discovery and litigation support",
      "Certified translation on request",
    ],
  },
  {
    id: "public-sector",
    icon: Landmark,
    name: "Public Sector & NGOs",
    body: "Multilingual communications for institutions and development organizations, with real depth in African languages.",
    points: [
      "UN and development-bank programs and tenders",
      "Policy, public communications, and reports",
      "Health, humanitarian, and citizen-facing campaigns",
      "Registered vendor — see Working with us",
    ],
  },
  {
    id: "ai-tech",
    icon: Cpu,
    name: "AI & Tech",
    body: "High-quality multilingual data for teams building and evaluating AI, including in languages others can't staff.",
    points: [
      "AI data annotation and labeling",
      "RLHF preference data and model evaluation",
      "Multilingual datasets across 100+ languages",
      "Software, app, and game localization",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: `Industries — ${site.name}`, description: DESCRIPTION, url: URL }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Industries", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Industries"
        title="Built for regulated and enterprise work."
        subtitle="Specialist language and AI data services for the sectors where accuracy, confidentiality, and process matter most — in 100+ languages."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
        ]}
        ctas={[
          { label: "Request a quote", href: "/contact" },
          { label: "Working with us", href: "/procurement", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      <Section className="pt-20 md:pt-28">
        <div className="space-y-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <Reveal key={ind.id} delay={0}>
                <article
                  id={ind.id}
                  className="scroll-mt-24 rounded-2xl border border-ink-200 bg-white p-7 md:p-9"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1.4fr] lg:items-start">
                    <div>
                      <span
                        aria-hidden
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <h2 className="section-h3 mt-5 text-ink-900">{ind.name}</h2>
                      <p className="mt-3 text-ink-600 leading-relaxed">
                        {ind.body}
                      </p>
                      <Link
                        href="/contact"
                        className="btn-primary mt-6 inline-flex text-sm"
                      >
                        Request a quote <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-1 lg:pt-2">
                      {ind.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 border-l-2 border-brand-200 pl-4 py-0.5 text-ink-700 leading-relaxed"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
