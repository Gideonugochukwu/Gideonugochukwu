import Hero from "@/components/Hero";
import Section, { SectionHeading } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import StatStrip from "@/components/StatStrip";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";
import { ShieldCheck, Globe2, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="services" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="What we do"
          title="One partner. Three high-impact services."
          description="Translation that respects culture, annotation that fuels smarter AI, and marketing that actually moves the needle — backed by a single accountable team."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <ServiceCard
                slug={s.slug}
                title={s.title}
                summary={s.summary}
                icon={s.icon as "Brain" | "Languages" | "Megaphone"}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0" bleed>
        <StatStrip />
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-xl">
            <span className="badge">Why choose us</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Built for teams that can&apos;t afford to be lost in translation.
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              We combine native linguists, specialist annotators, and growth
              marketers under one quality system — so every output is on-brand,
              on-spec, and on-time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Quality you can audit",
                body: "Every project ships with a QA report and revision window. No black boxes.",
              },
              {
                icon: Globe2,
                title: "Truly global coverage",
                body: "Native specialists in 100+ languages and 30+ markets, vetted and managed.",
              },
              {
                icon: Sparkles,
                title: "AI-aware, human-led",
                body: "We blend smart automation with expert oversight — speed without sacrifice.",
              },
              {
                icon: Users,
                title: "Senior, not just sales",
                body: "You work directly with a senior project lead from day one — no handoffs.",
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

      <Section className="bg-ink-50/40 border-y border-ink-200/60">
        <HowItWorks />
      </Section>

      <Section>
        <Testimonials />
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
