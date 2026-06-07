import Hero from "@/components/Hero";
import Section, { SectionHeading } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import StatStrip from "@/components/StatStrip";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Industries from "@/components/Industries";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";
import { img, unsplash } from "@/lib/images";
import { ShieldCheck, Globe2, Sparkles, Users } from "lucide-react";

const SERVICE_IMAGES = {
  "translation-localization": img.services.translation,
  "ai-annotation": img.services.aiAnnotation,
  "digital-marketing": img.services.digitalMarketing,
} as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="services">
        <SectionHeading
          eyebrow="What we do"
          title="Three services. One accountable team."
          description="Translation, AI training data, and marketing — in 100+ languages."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const image = SERVICE_IMAGES[s.slug as keyof typeof SERVICE_IMAGES];
            return (
              <Reveal key={s.slug} delay={i * 0.06}>
                <ServiceCard
                  slug={s.slug}
                  title={s.title}
                  summary={s.summary}
                  icon={s.icon as "Brain" | "Languages" | "Megaphone"}
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
              Native linguists, specialist annotators, and growth marketers — under one quality system.
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

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
