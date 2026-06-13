import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import Testimonials from "@/components/Testimonials";
import ServiceCTAGrid from "@/components/ServiceCTAGrid";
import Industries from "@/components/Industries";
import JsonLd from "@/components/JsonLd";
import AnimatedBackground from "@/components/AnimatedBackground";
import HomeServices from "@/components/home/HomeServices";
import HomeMethod from "@/components/home/HomeMethod";
import HomeFAQ from "@/components/home/HomeFAQ";
import { faqSchema } from "@/lib/schema";

const HOME_FAQ = [
  {
    q: "What services does GlobalAnnotate offer?",
    a: "Four integrated services: translation & localization in 100+ languages, AI annotation & data labeling, multilingual SEO & search visibility, and performance digital marketing.",
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

      {/* Services — editorial 2x2 with offset rows */}
      <section className="relative isolate overflow-hidden py-20 sm:py-24 md:py-32">
        <AnimatedBackground variant="tint" className="opacity-70" />
        <HomeServices />
      </section>

      {/* Stats — borderless horizontal band, sits in the rhythm break */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <StatStrip />
      </section>

      {/* Industries — trimmed to 5, asymmetric lead-tile grid */}
      <section className="relative py-16 sm:py-20 md:py-28">
        <Industries />
      </section>

      {/* The GlobalAnnotate method — merged Why + How, one section */}
      <section className="relative isolate overflow-hidden py-20 sm:py-24 md:py-32 bg-ink-50/40">
        <AnimatedBackground variant="tint" className="opacity-60" />
        <HomeMethod />
      </section>

      {/* Testimonials — large editorial quotes */}
      <section className="relative py-20 sm:py-24 md:py-32">
        <Testimonials />
      </section>

      {/* FAQ — divided rows, no outer card */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-ink-50/40">
        <div className="container-wide grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div className="max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
              FAQ
            </p>
            <h2 className="mt-4 display-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-900">
              Common questions.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-600 leading-relaxed">
              The things teams ask us before getting started.
            </p>
          </div>
          <HomeFAQ items={HOME_FAQ} />
        </div>
      </section>

      {/* One strong closing CTA. */}
      <section className="relative py-16 sm:py-20 md:py-28">
        <ServiceCTAGrid />
      </section>
    </>
  );
}
