import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { img, unsplash } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Translation & Localization in 100+ Languages";
const DESCRIPTION =
  "Human-quality translation and culturally accurate localization across 100+ languages — websites, apps, documents, and multimedia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/services/translation-localization` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/services/translation-localization`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQ = [
  {
    q: "How many languages do you support?",
    a: "100+ languages including all major European, Asian, African, and Middle Eastern languages, with native specialists vetted for each.",
  },
  {
    q: "How fast can you deliver?",
    a: "Short documents in 24–72 hours. For larger programs we agree SLAs up front and report delivery weekly.",
  },
  {
    q: "Can you work inside our tools?",
    a: "Yes — we plug into Figma, GitHub, Webflow, Contentful, Lokalise, Crowdin, Phrase, and most modern CMS/TMS stacks.",
  },
  {
    q: "Do you offer certified translations?",
    a: "Yes, for legal, medical, immigration, and academic documents in most jurisdictions.",
  },
  {
    q: "What about confidentiality?",
    a: "We sign NDAs, use access-controlled workflows, and route sensitive work to vetted in-house specialists.",
  },
];

export default function Page() {
  const url = `${site.url}/services/translation-localization`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Translation & Localization",
            description: DESCRIPTION,
            url,
          }),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "Translation & Localization", url },
          ]),
        ]}
      />
      <ServicePage
        eyebrow="Translation & Localization"
        title="Speak to every market — like you live there."
        intro="Native linguists translate and localize your content so it reads as if it were written for each audience from day one."
        heroImage={unsplash(img.services.translation.id, 2400)}
        heroImageAlt={img.services.translation.alt}
        included={[
          {
            title: "Website & app localization",
            body: "Strings, content, layouts, RTL support, and on-device QA across iOS, Android, and web.",
          },
          {
            title: "Document translation",
            body: "Legal, medical, technical, financial — certified, with formatting preserved.",
          },
          {
            title: "Multimedia & subtitles",
            body: "Subtitling, transcription, voice-over scripting, and dubbing coordination.",
          },
          {
            title: "Transcreation",
            body: "Marketing copy adapted, not just translated. Same message, new market.",
          },
          {
            title: "Glossaries & TM",
            body: "Translation memories and terminology bases that compound value over time.",
          },
          {
            title: "Linguistic QA",
            body: "Second linguist review, automated checks, and in-context proofing.",
          },
        ]}
        useCases={[
          {
            title: "SaaS going multi-region",
            body: "Localize product, marketing, and support content without slowing engineering.",
          },
          {
            title: "Health & legal documents",
            body: "Certified, audit-ready translation for patient materials and compliance.",
          },
          {
            title: "Media & entertainment",
            body: "Subtitle and dub at scale with a consistent voice across every episode.",
          },
          {
            title: "E-commerce expansion",
            body: "Localized catalogs, ads, and journeys for higher conversion in every market.",
          },
        ]}
        tiers={[
          {
            name: "Starter",
            price: "From $0.09",
            cadence: "/ word",
            description: "Small documents, single language pairs, fast turnaround.",
            features: [
              "Up to 5,000 words",
              "Single linguist translation",
              "Standard 3–5 day delivery",
              "Email support",
            ],
          },
          {
            name: "Growth",
            price: "From $0.12",
            cadence: "/ word",
            description: "Most teams pick this. Multi-language, ongoing programs.",
            features: [
              "Unlimited volume",
              "Linguist + reviewer (two-step QA)",
              "Translation memory & glossary",
              "Dedicated project lead",
              "Priority turnaround",
            ],
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "Complex, regulated, or high-volume programs.",
            features: [
              "SLA-backed delivery",
              "Certified translation available",
              "API / CMS integration",
              "Quarterly business reviews",
              "Security & NDA support",
            ],
          },
        ]}
        faq={FAQ}
      />
    </>
  );
}
