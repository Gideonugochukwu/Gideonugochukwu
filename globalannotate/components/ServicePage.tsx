import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import FAQ, { FAQItem } from "./FAQ";
import ServiceCTAGrid from "./ServiceCTAGrid";
import Reveal from "./Reveal";
import { ArrowRight, Check } from "lucide-react";

export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export default function ServicePage({
  eyebrow,
  title,
  intro,
  heroImage,
  heroImageAlt,
  included,
  useCases,
  tiers,
  faq,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  included: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  tiers: Tier[];
  faq: FAQItem[];
}) {
  return (
    <>
      {/* Hero — quieter dark band with soft photo + emerald accent eyebrow */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-brand-900 text-white">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.55) 50%, rgba(2,6,23,0.92) 100%), radial-gradient(50% 50% at 50% 0%, rgba(16,185,129,0.20), transparent 65%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 hero-grid opacity-25" />

        <div className="container-wide relative pt-24 pb-28">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-300">
            {eyebrow}
          </p>
          <h1 className="display-hero mt-5 max-w-4xl text-4xl md:text-6xl lg:text-7xl text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
            {intro}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-900 px-5 py-3.5 font-semibold hover:bg-brand-50 transition"
            >
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-ghost-light">
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* What's included — editorial 3-column with inline check icons; no boxes */}
      <Section className="pt-24 md:pt-32">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              What&apos;s included
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-900 leading-tight">
              Everything you need,
              <br />
              end to end.
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Use cases — light surface, soft outlined panels (not cards) */}
      <Section className="bg-ink-50/40">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Use cases
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-900 leading-tight">
            Built for the work you actually do.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {useCases.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {u.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{u.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pricing — kept, but with much lighter borders and refined type */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-900 leading-tight">
            Simple tiers. Tailored proposals.
          </h2>
          <p className="mt-4 text-ink-600 text-lg leading-relaxed">
            Pricing depends on scope, volume, and language pairs.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <div
                className={
                  "rounded-2xl p-7 h-full flex flex-col bg-white " +
                  (tier.highlighted
                    ? "border-2 border-brand-500 shadow-[0_20px_60px_-25px_rgba(16,185,129,0.45)]"
                    : "border border-ink-200")
                }
              >
                {tier.highlighted && (
                  <span className="self-start inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 mb-4">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold tracking-tight text-ink-900">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-ink-900">
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span className="text-sm text-ink-500">{tier.cadence}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  {tier.description}
                </p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check
                        className="h-4 w-4 text-brand-600 mt-0.5 shrink-0"
                        strokeWidth={2.2}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={
                    "mt-6 " + (tier.highlighted ? "btn-primary" : "btn-secondary")
                  }
                >
                  Talk to an expert <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ — light surface, the shared FAQ component stays */}
      <Section className="bg-ink-50/40">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-900 leading-tight">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-12 max-w-3xl">
          <FAQ items={faq} />
        </div>
      </Section>

      {/* Tri-column CTA — modelled on languagewire.com/services */}
      <Section className="pb-24">
        <ServiceCTAGrid />
      </Section>
    </>
  );
}
