import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import FAQ, { FAQItem } from "./FAQ";
import CTABand from "./CTABand";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { servicesHeroSlides, imageBg, unsplash } from "@/lib/images";
import { relatedCasesForService } from "@/data/portfolio";

export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export default function ServicePage({
  serviceSlug,
  eyebrow,
  title,
  intro,
  heroSlideId,
  heroSlideAlt,
  included,
  useCases,
  tiers,
  faq,
}: {
  // The /services/[slug] this page belongs to. Used to surface related
  // case studies and to drive the internal-linking graph.
  serviceSlug: string;
  eyebrow: string;
  title: string;
  intro: string;
  // The service's own hero image — used as the FIRST slide of the rotation,
  // so the page lands on its on-brand photo. The remaining services slides
  // follow for variety.
  heroSlideId: string;
  heroSlideAlt: string;
  included: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  tiers: Tier[];
  faq: FAQItem[];
}) {
  const slides = [
    { id: heroSlideId, alt: heroSlideAlt },
    ...servicesHeroSlides.filter((s) => s.id !== heroSlideId),
  ];
  const relatedCases = relatedCasesForService(serviceSlug, 3);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={intro}
        ctas={[
          { label: "Talk to an expert", href: "/contact" },
          { label: "All services", href: "/services", variant: "ghost" },
        ]}
        slides={slides}
      />

      {/* What's included — editorial 3-column with inline check icons; no boxes */}
      <Section className="pt-24 md:pt-32">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              What&apos;s included
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
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
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Use cases
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
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
          <h2 className="section-h2 mt-4 text-ink-900">
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
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            FAQ
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-12 max-w-3xl">
          <FAQ items={faq} />
        </div>
      </Section>

      {/* Related case studies — surfaces real portfolio work for this
          service. Drives internal linking from /services/[slug] into the
          /portfolio/[slug] graph. */}
      {relatedCases.length > 0 && (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
                Related work
              </p>
              <h2 className="section-h2 mt-4 text-ink-900">
                Recent case studies in this service.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
            >
              See all case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {relatedCases.map((c) => (
              <Reveal key={c.slug}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="group block"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-2xl ${imageBg}`}
                  >
                    <Image
                      src={unsplash(c.image.id, 1000)}
                      alt={c.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover photo-treat transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-brand-700">
                      {c.service}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700 transition">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                    {c.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                    Read case study <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* MarketReady™ add-on callout — internal link into the proprietary
          pre-launch validation service from every service detail page. */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
                <ShieldCheck className="h-3.5 w-3.5" /> MarketReady™
              </p>
              <h2 className="section-h3 mt-4 text-ink-900">
                Add MarketReady™ to this project
              </h2>
              <p className="mt-2 text-ink-600 leading-relaxed">
                Validate your content with real native users in the target
                market before launch — and get a signed report that certifies
                it&apos;s ready.
              </p>
            </div>
            <Link
              href="/services/marketready"
              className="btn-primary text-sm"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Tri-column CTA — modelled on languagewire.com/services */}
      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
