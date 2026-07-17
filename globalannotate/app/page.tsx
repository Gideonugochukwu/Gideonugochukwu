import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Industries from "@/components/Industries";
import JsonLd from "@/components/JsonLd";
import HomeServices from "@/components/home/HomeServices";
import HomeMarketReady from "@/components/home/HomeMarketReady";
import HomeMethod from "@/components/home/HomeMethod";
import HomeFAQ from "@/components/home/HomeFAQ";
import { faqSchema } from "@/lib/schema";

const HOME_FAQ = [
  {
    q: "What services does GlobalAnnotate offer?",
    a: "Five integrated services: translation & localization in 100+ languages, AI annotation & data labeling, multilingual SEO & search visibility, performance digital marketing, and game localization & translation for studios going global.",
  },
  {
    q: "How many languages do you support?",
    a: "100+ languages with native specialists across 30+ countries — including all major European, Asian, African, and Middle Eastern languages.",
  },
  {
    q: "Can I combine services?",
    a: "Yes — most of our clients combine two or more. Localization plus international SEO, or AI annotation plus multilingual datasets, are common pairings handled by one senior project lead.",
  },
  {
    q: "What's your typical turnaround?",
    a: "We reply to every enquiry within one business day, share a scoped proposal within 24–48 hours, and most projects ship a first deliverable within two weeks.",
  },
  {
    q: "How do you guarantee quality?",
    a: "Every program runs through a documented QA process: native-speaker review for language work, gold-set calibration and inter-annotator agreement for AI data, and clear reporting for SEO and marketing.",
  },
  {
    q: "Where are you based and what time zones do you cover?",
    a: "We operate as a distributed team across 30+ countries, with native specialists aligned to your business hours.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQ)} />
      <Hero />

      {/* Services — flat, calm surface with generous breathing room */}
      <section className="py-28 sm:py-32 md:py-44">
        <HomeServices />
      </section>

      {/* MarketReady™ — the key differentiator, between services and stats */}
      <section className="pb-4 md:pb-8">
        <HomeMarketReady />
      </section>

      {/* Stats — borderless horizontal band, sits in the rhythm break */}
      <section className="py-16 sm:py-20 md:py-24">
        <StatStrip />
      </section>

      {/* Industries — 6 uniform cards including Gaming */}
      <section className="py-28 sm:py-32 md:py-44">
        <Industries />
      </section>

      {/* The GlobalAnnotate method — merged Why + How, one section */}
      <section className="py-28 sm:py-32 md:py-44 bg-ink-50">
        <HomeMethod />
      </section>

      {/* Testimonials — large editorial quotes */}
      <section className="py-28 sm:py-32 md:py-44">
        <Testimonials />
      </section>

      {/* FAQ — divided rows, no outer card */}
      <section className="py-28 sm:py-32 md:py-44 bg-ink-50">
        <div className="container-wide grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-24 items-start">
          <div className="max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
              FAQ
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              Common questions.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-ink-600 leading-relaxed">
              The things teams ask us before getting started.
            </p>
          </div>
          <HomeFAQ items={HOME_FAQ} />
        </div>
      </section>

      {/* One clear closing action. */}
      <section className="py-20 sm:py-24 md:py-32">
        <CTABand />
      </section>
    </>
  );
}
