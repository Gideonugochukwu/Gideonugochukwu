import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Translation & Localization",
  description:
    "Human-quality translation and culturally accurate localization across 100+ languages — websites, apps, documents, and multimedia.",
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="Translation & Localization"
      title="Speak to every market — like you live there."
      intro="From product UI to legal contracts, marketing campaigns to subtitles, our native linguists translate and localize your content so it reads as if it were written for each audience from day one."
      included={[
        {
          title: "Website & app localization",
          body: "Strings, content, layouts, RTL support, and on-device QA across iOS, Android, and the web.",
        },
        {
          title: "Document translation",
          body: "Legal, medical, technical, financial — certified translation with formatting preserved.",
        },
        {
          title: "Multimedia & subtitles",
          body: "Subtitling, transcription, voice-over scripting, and dubbing coordination.",
        },
        {
          title: "Transcreation",
          body: "Marketing copy adapted — not just translated — so the message lands in every market.",
        },
        {
          title: "Glossaries & TM",
          body: "We build and maintain translation memories and terminology bases that compound value over time.",
        },
        {
          title: "Linguistic QA",
          body: "Second linguist review, automated checks, and in-context proofing before delivery.",
        },
      ]}
      useCases={[
        {
          title: "SaaS going multi-region",
          body: "Localize your product, marketing site, and support content into priority markets without slowing down your engineering team.",
        },
        {
          title: "Health & legal documents",
          body: "Certified, audit-ready translation of patient materials, contracts, and compliance documents.",
        },
        {
          title: "Media & entertainment",
          body: "Subtitle and dub video at scale with consistent voice across episodes, courses, and campaigns.",
        },
        {
          title: "E-commerce expansion",
          body: "Localize product catalogs, ad creative, and customer journeys for higher conversion in each market.",
        },
      ]}
      tiers={[
        {
          name: "Starter",
          price: "From $0.09",
          cadence: "/ word",
          description: "Small documents, single-language pairs, fast turnaround.",
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
          description: "Most teams pick this. Multi-language, ongoing projects.",
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
      faq={[
        {
          q: "How many languages do you support?",
          a: "100+ languages including all major European, Asian, African, and Middle Eastern languages, with native specialists vetted for each.",
        },
        {
          q: "How fast can you deliver?",
          a: "Short documents in 24–72 hours. For larger or ongoing programs we agree on SLAs up front and report delivery weekly.",
        },
        {
          q: "Can you work inside our tools?",
          a: "Yes — we plug into Figma, GitHub, Webflow, Contentful, Lokalise, Crowdin, Phrase, and most modern CMS/TMS stacks.",
        },
        {
          q: "Do you offer certified translations?",
          a: "Yes, for legal, medical, immigration, and academic documents in most jurisdictions. Ask us about your specific use case.",
        },
        {
          q: "What about confidentiality?",
          a: "We sign NDAs, use access-controlled workflows, and route sensitive work only to vetted in-house specialists.",
        },
      ]}
    />
  );
}
