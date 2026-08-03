import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import CTABand from "@/components/CTABand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cases, getCase, allCaseSlugs } from "@/data/portfolio";
import { imageBg, unsplash, portfolioHeroSlides } from "@/lib/images";
import HeroSlideshow from "@/components/HeroSlideshow";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

export function generateStaticParams() {
  return allCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Case study not found" };
  const url = `${site.url}/portfolio/${c.slug}`;
  const image = unsplash(c.image.id, 1600);
  return {
    title: `${c.title} — Case Study`,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: {
      title: c.title,
      description: c.summary,
      url,
      type: "article",
      images: [{ url: image, alt: c.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.summary,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const url = `${site.url}/portfolio/${c.slug}`;
  const heroSlides = [
    { id: c.image.id, alt: c.image.alt },
    ...portfolioHeroSlides.filter((s) => s.id !== c.image.id),
  ];
  const related = cases.filter((other) => other.slug !== c.slug).slice(0, 3);

  // Map the case's service string to a /services/[slug] when the match is
  // clear. Powers the linkable service chip in the hero and the
  // "Learn about this service" line below the outcomes strip.
  const serviceLookup: { keywords: string[]; slug: string; label: string }[] = [
    // Order matters — first match wins. "Game Localization" must beat the
    // bare "Localization" keyword below.
    {
      keywords: ["Game Localization", "Game"],
      slug: "game-localization",
      label: "Game Localization & Translation",
    },
    {
      keywords: ["Translation", "Localization"],
      slug: "translation-localization",
      label: "Translation & Localization",
    },
    { keywords: ["AI Annotation"], slug: "ai-annotation", label: "AI Annotation" },
    { keywords: ["SEO"], slug: "seo", label: "SEO & Search Visibility" },
    { keywords: ["Digital Marketing"], slug: "digital-marketing", label: "Digital Marketing" },
    { keywords: ["Marketing"], slug: "digital-marketing", label: "Digital Marketing" },
  ];
  const serviceMatch = serviceLookup.find((s) =>
    s.keywords.some((k) => c.service.includes(k))
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Portfolio", url: `${site.url}/portfolio` },
          { name: c.title, url },
        ])}
      />

      {/* Hero — same rotating-slideshow treatment as the main pages, plus
          the service/industry/duration chips + client one-liner this page
          needs. Refined .page-h1 typography. */}
      <section className="relative isolate overflow-hidden bg-night-950 text-white">
        <HeroSlideshow slides={heroSlides} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.70) 0%, rgba(2,6,23,0.55) 40%, rgba(2,6,23,0.92) 100%)",
          }}
        />

        <div className="container-wide relative pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Portfolio", href: "/portfolio" },
              { name: c.title, href: `/portfolio/${c.slug}` },
            ]}
            tone="dark"
            className="mb-5"
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            {serviceMatch ? (
              <Link
                href={`/services/${serviceMatch.slug}`}
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-medium text-white ring-1 ring-white/25 hover:bg-white/25 hover:ring-white/40 transition"
              >
                {c.service}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 font-medium text-white/90 ring-1 ring-white/20">
                {c.service}
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 font-medium text-white/90 ring-1 ring-white/20">
              {c.industry}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 font-medium text-white/90 ring-1 ring-white/20">
              {c.duration}
            </span>
          </div>

          <h1 className="page-h1 mt-5 max-w-3xl text-white">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/70">
            {c.client}
          </p>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
            {c.summary}
          </p>
        </div>
      </section>

      {/* Outcomes strip — the full set, large editorial numbers, no boxes */}
      <Section className="pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 md:grid-cols-3 lg:grid-cols-6">
          {c.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.04}>
              <div>
                <div className="display-num text-3xl md:text-4xl lg:text-5xl">
                  {o.value}
                </div>
                <div className="mt-2 text-xs md:text-sm text-ink-500 tracking-wide">
                  {o.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {serviceMatch && (
          <p className="mt-10 text-sm md:text-base text-ink-600">
            This case study is part of our{" "}
            <Link
              href={`/services/${serviceMatch.slug}`}
              className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
            >
              {serviceMatch.label}
            </Link>{" "}
            work — see how the same approach scales for other teams in{" "}
            <Link
              href="/portfolio"
              className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
            >
              our portfolio
            </Link>
            .
          </p>
        )}
      </Section>

      {/* Challenge — large editorial paragraph */}
      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Challenge
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              What we walked into.
            </h2>
          </div>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed">
            {c.challenge}
          </p>
        </div>
      </Section>

      {/* Approach — full "What we did" list with check chips */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              What we did
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              The work, step by step.
            </h2>
          </div>
          <ol className="space-y-6">
            {c.approach.map((step, i) => (
              <Reveal key={step} delay={i * 0.04}>
                <li className="flex items-start gap-5">
                  <span
                    aria-hidden
                    className="display-num shrink-0 text-2xl md:text-3xl pt-1 w-10 md:w-12"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base md:text-lg text-ink-700 leading-relaxed border-l border-ink-200/80 pl-5">
                    {step}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Results — outcomes a second time, this time as a labelled grid */}
      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Results
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              What it shipped.
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Outcomes measured against the brief we agreed up front, not vanity metrics.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {c.outcomes.map((o) => (
              <li key={o.label} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div>
                  <div className="text-sm text-ink-500">{o.label}</div>
                  <div className="mt-0.5 font-display text-2xl font-semibold text-ink-900 tracking-tight">
                    {o.value}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Related case studies */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-h2 text-ink-900">
            More case studies
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/portfolio/${r.slug}`}
              className="group block"
            >
              <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl ${imageBg}`}>
                <Image
                  src={unsplash(r.image.id, 1000)}
                  alt={r.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover photo-treat transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-brand-700">
                  {r.service}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700 transition">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                {r.summary}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                Read case study <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
