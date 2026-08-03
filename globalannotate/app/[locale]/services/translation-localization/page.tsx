import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { ogImages, OG_IMAGE_URL } from "@/lib/i18n-meta";
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
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
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

// FAQPage JSON-LD content — the canonical, GEO-optimized Q&A surfaced to
// search engines and AI systems. Kept distinct from the visible `FAQ` above
// (which drives the on-page accordion) so the page content stays unchanged.
const SCHEMA_FAQ = [
  {
    q: "What languages does GlobalAnnotate translate?",
    a: "We translate in 100+ languages including specialist African languages like Hausa, Yoruba, Igbo, Wolof, Amharic, Swahili, Somali, and Zulu, plus all major European and Asian language pairs.",
  },
  {
    q: "What is the difference between translation and localization?",
    a: "Translation converts text from one language to another. Localization adapts the content for a specific market — adjusting cultural references, formats, currencies, and tone so it feels native to the target audience.",
  },
  {
    q: "How long does a translation project take?",
    a: "Timelines depend on volume, language pair, and complexity. Standard projects (up to 5,000 words) typically take 3-5 business days. Large projects are scoped individually.",
  },
  {
    q: "What quality assurance process do you use?",
    a: "Every project includes native-speaker translation, independent native review, terminology management, automated QA (Xbench), and a documented QA report. Projects also include MarketReady™ cultural validation.",
  },
  {
    q: "Do you offer certified translation?",
    a: "Yes. We provide certified translations for legal, immigration, academic, and official documents.",
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
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "Translation & Localization", url },
          ]),
        ]}
      />
      <ServicePage
        serviceSlug="translation-localization"
        eyebrow="Translation & Localization"
        title="Speak to every market — like you live there."
        intro="Native linguists translate and localize your content so it reads as if it were written for each audience from day one."
        heroSlideId={img.services.translation.id}
        heroSlideAlt={img.services.translation.alt}
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
