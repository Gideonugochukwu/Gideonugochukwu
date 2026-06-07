import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Performance-driven Facebook and Instagram ads, social media management, and content strategy that turn audiences into customers.",
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="Digital Marketing"
      title="Audiences into customers. Customers into growth."
      intro="We run lean, data-led growth programs across Meta, content, and organic social — built to drive measurable revenue, not vanity metrics."
      included={[
        {
          title: "Facebook & Instagram ads",
          body: "Full-funnel paid social — strategy, creative, media buying, and weekly optimization.",
        },
        {
          title: "Creative production",
          body: "Static, motion, and UGC-style creative built for the platform, not retrofitted from TV.",
        },
        {
          title: "Social media management",
          body: "Editorial planning, publishing, community management, and brand voice care.",
        },
        {
          title: "Content strategy",
          body: "Pillar themes, content calendars, and SEO-aware briefs that compound over time.",
        },
        {
          title: "Landing pages & CRO",
          body: "Conversion-tuned landing pages and experiments to lift ROAS without raising spend.",
        },
        {
          title: "Reporting & insights",
          body: "Clear weekly dashboards in plain English — and a senior strategist who reads them with you.",
        },
      ]}
      useCases={[
        {
          title: "DTC & e-commerce",
          body: "Scale paid social profitably with creative testing systems and full-funnel measurement.",
        },
        {
          title: "B2B & SaaS",
          body: "Demand-gen content programs and LinkedIn / Meta paid that fill the pipeline.",
        },
        {
          title: "Local & service businesses",
          body: "Lead-gen funnels, geo-targeted ads, and reputation-first social presence.",
        },
        {
          title: "Launches & campaigns",
          body: "End-to-end campaign sprints — from concept to creative to media plan.",
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
      faq={[
        {
          q: "Do I need to give you my ad account?",
          a: "No. We run everything inside your Business Manager so you own the data, pixels, and history forever.",
        },
        {
          q: "What's the minimum ad spend?",
          a: "We recommend at least $1,500/month in media to learn quickly. Anything less and Meta's algorithms don't have enough signal.",
        },
        {
          q: "How long until I see results?",
          a: "First creative and audience signal in week 2–3. Stable, scalable performance typically by week 6–8.",
        },
        {
          q: "Do you create the ad creative?",
          a: "Yes — static, motion, and UGC-style assets are included in every plan. We script, shoot/source, and edit.",
        },
        {
          q: "Can I pause or cancel?",
          a: "Plans are month-to-month after a 60-day setup period. We earn the partnership every month.",
        },
      ]}
    />
  );
}
