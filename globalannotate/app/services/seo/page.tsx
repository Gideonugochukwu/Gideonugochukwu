import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "SEO & Search Visibility — Multilingual & International SEO";
const DESCRIPTION =
  "Rank everywhere you sell — in every language. Multilingual & international SEO, technical audits, content, on-page optimization, link building, and local SEO that compound.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/services/seo` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/services/seo`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQ = [
  {
    q: "What makes your SEO different from a typical agency?",
    a: "Multilingual and international SEO is our core strength. Because we already run translation and localization across 100+ languages, we plan hreflang, localized keyword research, and country-specific content as one connected program — not as a bolted-on translation step.",
  },
  {
    q: "Can you actually help us rank in multiple countries and languages?",
    a: "Yes. We map your target markets, run native-language keyword research, structure hreflang and URLs correctly (ccTLD, subdirectory, or subdomain), localize on-page content with intent in mind, and build market-relevant links and digital PR in each country.",
  },
  {
    q: "How long until I see results?",
    a: "Technical fixes and on-page wins typically move rankings within 4–8 weeks. Content and link-building compound over 3–6 months. We share a 90-day forecast and report progress every two weeks.",
  },
  {
    q: "Do you handle local SEO and Google Business Profile?",
    a: "Yes — multi-location Google Business Profile setup and optimization, local citations, review strategy, and location-page content for service-area and storefront businesses.",
  },
  {
    q: "What does reporting look like?",
    a: "A live dashboard with rankings, organic traffic, conversions, and backlink growth, plus a short written summary every two weeks tying changes to outcomes. Everything is owned by you.",
  },
  {
    q: "Can you work alongside our existing dev or marketing team?",
    a: "Yes. We can ship fixes directly via GitHub/Webflow/WordPress, or hand off a prioritized technical roadmap with diffs and tickets for your engineers.",
  },
];

const INCLUDED = [
  {
    title: "Multilingual & international SEO",
    body: "Hreflang, ccTLD/subfolder strategy, localized keyword research, and country-specific content so you rank in every market you sell in.",
  },
  {
    title: "Technical SEO audits & fixes",
    body: "Crawlability, Core Web Vitals, indexation, schema, internal linking — diagnosed, prioritized, and shipped.",
  },
  {
    title: "Keyword research & strategy",
    body: "Cluster-based keyword maps tied to revenue intent and content gaps, in every target language.",
  },
  {
    title: "On-page optimization",
    body: "Titles, metadata, headings, structured data, and on-page content that match search intent and convert.",
  },
  {
    title: "SEO content writing",
    body: "Native-quality articles, landing pages, and pillar content written by specialists, briefed against ranking gaps.",
  },
  {
    title: "Link building & digital PR",
    body: "White-hat outreach, digital PR campaigns, and authority partnerships in your target countries — not throwaway directories.",
  },
  {
    title: "Local SEO & Google Business Profile",
    body: "Multi-location GBP, citations, reviews, and location landing pages for service-area and storefront brands.",
  },
  {
    title: "Analytics & reporting",
    body: "GA4, Search Console, Looker Studio dashboards, and bi-weekly written reports that tie SEO work to revenue.",
  },
];

const USE_CASES = [
  {
    title: "Going international",
    body: "Launch in new countries with the right URL structure, hreflang, and localized content from day one — no SEO debt to clean up later.",
  },
  {
    title: "Multilingual marketplaces & SaaS",
    body: "Coordinate translation, localization, and SEO as one program so every locale ranks, not just the English one.",
  },
  {
    title: "E-commerce growth",
    body: "Category, product, and content SEO that drives qualified organic revenue across every market you ship to.",
  },
  {
    title: "Local & multi-location services",
    body: "Rank the right location pages, Google Business Profiles, and review assets for every city you serve.",
  },
];

const TIERS = [
  {
    name: "Audit",
    price: "From $1,500",
    cadence: "/ one-off",
    description: "A complete technical, on-page, and content audit with a prioritized roadmap.",
    features: [
      "Technical & on-page audit",
      "Keyword & content gap analysis",
      "Competitor & backlink review",
      "90-day prioritized roadmap",
    ],
  },
  {
    name: "Growth",
    price: "From $2,800",
    cadence: "/ month",
    description: "Our most popular plan — continuous SEO for one core market and language.",
    features: [
      "Monthly technical fixes",
      "4 SEO articles or page rewrites",
      "Link building & digital PR",
      "Bi-weekly reporting & strategy call",
      "Search Console + GA4 dashboards",
    ],
    highlighted: true,
  },
  {
    name: "International",
    price: "Custom",
    description: "Multi-country, multi-language SEO programs at scale.",
    features: [
      "Hreflang & ccTLD strategy",
      "Localized keyword research per market",
      "Native-language content & links",
      "Dedicated international SEO lead",
      "Quarterly business reviews",
    ],
  },
];

export default function Page() {
  const url = `${site.url}/services/seo`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "SEO & Search Visibility",
            description: DESCRIPTION,
            url,
            areaServed: "Worldwide",
          }),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "SEO & Search Visibility", url },
          ]),
        ]}
      />
      <ServicePage
        serviceSlug="seo"
        eyebrow="SEO & Search Visibility"
        title="Rank everywhere you sell — in every language."
        intro="Multilingual and international SEO is our edge. We pair native-language keyword research, hreflang and technical fixes, on-page content, and digital PR to grow organic revenue in every market you care about."
        heroSlideId={img.services.seo.id}
        heroSlideAlt={img.services.seo.alt}
        included={INCLUDED}
        useCases={USE_CASES}
        tiers={TIERS}
        faq={FAQ}
      />
    </>
  );
}
