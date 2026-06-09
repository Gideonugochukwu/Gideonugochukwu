import Hero from "@/components/Hero";
import Section, { SectionHeading } from "@/components/Section";
import ServiceCard, { ServiceIcon } from "@/components/ServiceCard";
import StatStrip from "@/components/StatStrip";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Industries from "@/components/Industries";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/site";
import { img, unsplash } from "@/lib/images";
import { faqSchema } from "@/lib/schema";
import { ShieldCheck, Globe2, Sparkles, Users } from "lucide-react";

const SERVICE_IMAGES = {
  "translation-localization": img.services.translation,
  "ai-annotation": img.services.aiAnnotation,
  "digital-marketing": img.services.digitalMarketing,
  seo: img.services.seo,
} as const;

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

      <Section id="services">
        <SectionHeading
          eyebrow="What we do"
          title="Four services. One accountable team."
          description="Translation, AI training data, multilingual SEO, and marketing — in 100+ languages."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const image = SERVICE_IMAGES[s.slug as keyof typeof SERVICE_IMAGES];
            return (
              <Reveal key={s.slug} delay={i * 0.06}>
                <ServiceCard
                  slug={s.slug}
                  title={s.title}
                  summary={s.summary}
                  icon={s.icon as ServiceIcon}
                  image={unsplash(image.id, 1200)}
                  alt={image.alt}
                />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0" bleed>
        <StatStrip />
      </Section>

      <Section>
        <Industries />
      </Section>

      <Section className="bg-ink-50/60 border-y border-ink-200/60">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-xl">
            <span className="badge">Why choose us</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
              Quality you can audit. Speed you can plan around.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Native linguists, specialist annotators, SEO strategists, and growth marketers — under one quality system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Quality you can audit",
                body: "Every project ships with a QA report and revision window.",
              },
              {
                icon: Globe2,
                title: "Truly global coverage",
                body: "Native specialists across 100+ languages and 30+ markets.",
              },
              {
                icon: Sparkles,
                title: "AI-aware, human-led",
                body: "Smart automation, expert oversight. Speed without sacrifice.",
              },
              {
                icon: Users,
                title: "Senior, not just sales",
                body: "A senior project lead from day one. No handoffs.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="card p-6 h-full">
                  <f.icon className="h-6 w-6 text-brand-600" />
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <HowItWorks />
      </Section>

      <Section className="bg-ink-50/60 border-y border-ink-200/60">
        <Testimonials />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="The things teams ask us before getting started."
        />
        <div className="mt-10 max-w-3xl">
          <FAQ items={HOME_FAQ} />
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
