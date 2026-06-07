import type { Metadata } from "next";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "GlobalAnnotate is a global team of linguists, annotators, and marketers building the connective tissue for international growth.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Honest by default",
    body: "We tell clients the truth — including when a project isn't a fit. Long relationships beat short wins.",
  },
  {
    icon: Sparkles,
    title: "Quality is non-negotiable",
    body: "Speed without quality is just expensive noise. Every output gets reviewed before it leaves us.",
  },
  {
    icon: Globe2,
    title: "Global, in practice",
    body: "Native specialists in dozens of countries. We hire people who actually live in the markets we serve.",
  },
  {
    icon: Compass,
    title: "Senior from day one",
    body: "You work directly with a senior project lead. No handoffs, no surprises.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 hero-glow" />
        <div aria-hidden className="absolute inset-0 hero-grid" />
        <div className="container-wide relative pt-20 pb-16">
          <span className="badge">About GlobalAnnotate</span>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            The connective tissue for international growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-600 leading-relaxed">
            We started GlobalAnnotate because growing globally was harder than
            it had to be. Translation vendors didn&apos;t understand product.
            Annotation vendors didn&apos;t understand quality. And marketing
            agencies didn&apos;t understand new markets. So we built one team
            that does all three — with the rigor of a product company.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Our mission
            </h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              To help ambitious teams reach every market they care about —
              with content that resonates, data that performs, and growth that
              compounds.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              We believe excellent localization and reliable training data
              shouldn&apos;t be reserved for trillion-dollar companies. They
              should be available — at fair prices and at any scale — to anyone
              building something worth shipping.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              How we started
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              GlobalAnnotate was founded by a team of linguists, ML engineers,
              and growth marketers who kept running into the same problem:
              every cross-border project required three different vendors,
              three different briefs, and three different quality bars.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              We brought all three under one roof, with a shared QA culture and
              a single project lead per client. The result is faster delivery,
              better quality, and far less overhead for our partners.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-ink-50/40 border-y border-ink-200/60">
        <div className="max-w-2xl">
          <span className="badge">Our values</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            How we show up — for clients and for each other.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <v.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why teams choose us
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "One partner, three services",
                body: "Localize your product, train your model, and grow your audience — without juggling three vendors and three contracts.",
              },
              {
                title: "Quality, observable",
                body: "Every project ships with a QA report and revision window. You see what we measured, not just what we promised.",
              },
              {
                title: "Senior accountability",
                body: "Every client gets a senior project lead from day one. No SDR handoffs. No junior account managers.",
              },
              {
                title: "Built for scale",
                body: "We can ramp from a 3-person pilot to a 100-person delivery team in two weeks — without compromising quality.",
              },
            ].map((w) => (
              <div key={w.title}>
                <h3 className="text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
