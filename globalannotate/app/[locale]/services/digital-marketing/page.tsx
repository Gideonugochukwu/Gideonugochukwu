import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Digital Marketing — Meta Ads, Social & Content";
const DESCRIPTION =
  "Performance-driven Facebook and Instagram ads, social media management, and content strategy that turn audiences into customers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/services/digital-marketing` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/services/digital-marketing`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQ = [
  {
    q: "Do I need to give you my ad account?",
    a: "No. We run everything inside your Business Manager so you own the data, pixels, and history forever.",
  },
  {
    q: "What's the minimum ad spend?",
    a: "We recommend at least $1,500/month in media. Less and Meta doesn't have enough signal to learn quickly.",
  },
  {
    q: "How long until I see results?",
    a: "First creative and audience signal in week 2–3. Stable, scalable performance typically by week 6–8.",
  },
  {
    q: "Do you create the ad creative?",
    a: "Yes — static, motion, and UGC-style assets are included. We script, shoot/source, and edit.",
  },
  {
    q: "Can I pause or cancel?",
    a: "Plans are month-to-month after a 60-day setup period.",
  },
];

// FAQPage JSON-LD content — the canonical, GEO-optimized Q&A surfaced to
// search engines and AI systems. Kept distinct from the visible `FAQ` above
// (which drives the on-page accordion) so the page content stays unchanged.
const SCHEMA_FAQ = [
  {
    q: "What digital marketing services do you offer?",
    a: "Meta Ads (Facebook/Instagram), Google Ads, LinkedIn Ads, social media management, content marketing, and multilingual campaign management across 100+ languages.",
  },
  {
    q: "Can you run ad campaigns in languages other than English?",
    a: "Yes. We create native-language ad campaigns — not translated English campaigns — with culturally adapted creative, copy, and targeting for each market.",
  },
  {
    q: "What platforms do you manage ads on?",
    a: "Facebook, Instagram, LinkedIn, Google (Search, Display, YouTube, Shopping, Performance Max), TikTok, and Telegram.",
  },
  {
    q: "What results have you achieved?",
    a: "4x blended ROAS for DTC brands, +540% LinkedIn follower growth, +180% inbound leads, and +212% non-domestic revenue through localized marketing.",
  },
  {
    q: "Do you offer social media management?",
    a: "Yes. Full social media management including strategy, content creation, scheduling, community management, and monthly reporting across Instagram, Facebook, LinkedIn, TikTok, and X.",
  },
];

export default function Page() {
  const url = `${site.url}/services/digital-marketing`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Digital Marketing",
            description: DESCRIPTION,
            url,
          }),
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "Digital Marketing", url },
          ]),
        ]}
      />
      <ServicePage
        serviceSlug="digital-marketing"
        eyebrow="Digital Marketing"
        title="Audiences into customers. Customers into growth."
        intro="Lean, data-led growth across Meta, content, and organic social — built to drive revenue, not vanity metrics."
        heroSlideId={img.services.digitalMarketing.id}
        heroSlideAlt={img.services.digitalMarketing.alt}
        included={[
          {
            title: "Facebook & Instagram ads",
            body: "Full-funnel paid social — strategy, creative, media buying, weekly optimization.",
          },
          {
            title: "Creative production",
            body: "Static, motion, and UGC-style creative built for the platform.",
          },
          {
            title: "Social media management",
            body: "Editorial planning, publishing, community management, brand voice.",
          },
          {
            title: "Content strategy",
            body: "Pillar themes, calendars, and SEO-aware briefs that compound over time.",
          },
          {
            title: "Landing pages & CRO",
            body: "Conversion-tuned pages and experiments to lift ROAS without raising spend.",
          },
          {
            title: "Reporting & insights",
            body: "Clear weekly dashboards. A senior strategist who reads them with you.",
          },
        ]}
        useCases={[
          {
            title: "DTC & e-commerce",
            body: "Scale paid social profitably with creative testing and full-funnel measurement.",
          },
          {
            title: "B2B & SaaS",
            body: "Demand-gen content programs and LinkedIn / Meta paid that fill the pipeline.",
          },
          {
            title: "Local & service businesses",
            body: "Lead-gen funnels, geo-targeted ads, and reputation-first social.",
          },
          {
            title: "Launches & campaigns",
            body: "End-to-end campaign sprints — concept to creative to media plan.",
          },
        ]}
        tiers={[
          {
            name: "Spark",
            price: "$900",
            cadence: "/ month",
            description: "For early-stage brands testing paid social and content.",
            features: [
              "1 paid platform (Meta)",
              "4 creative variants / month",
              "12 organic posts / month",
              "Bi-weekly reporting",
            ],
          },
          {
            name: "Scale",
            price: "$2,400",
            cadence: "/ month",
            description: "Our most popular plan for brands ready to grow.",
            features: [
              "Meta + 1 additional channel",
              "12 creative variants / month",
              "24 organic posts / month",
              "Landing-page tests",
              "Weekly strategy call",
            ],
            highlighted: true,
          },
          {
            name: "Performance",
            price: "Custom",
            description: "For brands spending $30k+/month on paid media.",
            features: [
              "Dedicated growth team",
              "Full-funnel creative system",
              "Custom dashboards",
              "CRO + email retention",
              "Quarterly planning sprints",
            ],
          },
        ]}
        faq={FAQ}
      />
    </>
  );
}
