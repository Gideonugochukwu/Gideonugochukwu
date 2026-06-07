import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import FAQ, { FAQItem } from "./FAQ";
import CTABand from "./CTABand";
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
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.80) 0%, rgba(2,6,23,0.65) 50%, rgba(2,6,23,0.92) 100%), radial-gradient(50% 50% at 50% 0%, rgba(16,185,129,0.25), transparent 65%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 hero-grid opacity-40" />

        <div className="container-wide relative pt-20 pb-24">
          <span className="badge-light">{eyebrow}</span>
          <h1 className="display-hero mt-5 max-w-4xl text-4xl md:text-6xl lg:text-7xl text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
            {intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-900 px-5 py-3.5 font-semibold hover:bg-brand-50 transition"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-ghost-light">
              All services
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-2xl">
          <span className="badge">What&apos;s included</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Everything you need, end to end.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {included.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="card p-6 h-full">
                <Check className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50/60 border-y border-ink-200/60">
        <div className="max-w-2xl">
          <span className="badge">Use cases</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Built for the work you actually do.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {useCases.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.04}>
              <div className="card p-6 h-full bg-white">
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{u.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <span className="badge">Pricing</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Simple tiers. Custom quotes always available.
          </h2>
          <p className="mt-3 text-ink-600">
            Pricing depends on scope, volume, and language pairs.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <div
                className={
                  "rounded-2xl p-6 h-full flex flex-col border " +
                  (tier.highlighted
                    ? "border-brand-500 bg-white shadow-[0_20px_60px_-25px_rgba(16,185,129,0.45)]"
                    : "border-ink-200 bg-white")
                }
              >
                {tier.highlighted && (
                  <span className="self-start badge mb-3">Most popular</span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold">{tier.price}</span>
                  {tier.cadence && (
                    <span className="text-sm text-ink-500">{tier.cadence}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-ink-600">{tier.description}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
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
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50/60 border-y border-ink-200/60">
        <div className="max-w-2xl">
          <span className="badge">FAQ</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-10 max-w-3xl">
          <FAQ items={faq} />
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
