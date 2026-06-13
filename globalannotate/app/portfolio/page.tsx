import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { imageBg, unsplash } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { cases } from "@/data/portfolio";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const TITLE = "Portfolio — Case Studies & Results";
const DESCRIPTION =
  "Selected case studies across translation & localization, AI annotation, SEO, social media management, and digital marketing — real outcomes for real teams.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/portfolio` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/portfolio`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Portfolio", url: `${site.url}/portfolio` },
        ])}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Portfolio
          </p>
          <h1 className="display-hero mt-5 text-4xl md:text-6xl lg:text-7xl text-ink-900">
            Real teams.
            <br />
            <span className="text-gradient">Real outcomes.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 leading-relaxed">
            A selection of recent engagements. Names redacted under NDA. Results verified.
          </p>
        </div>
      </Section>

      <Section className="pt-4 md:pt-8">
        <div className="grid gap-x-8 gap-y-14 md:gap-y-20 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.05}>
              <article className="group flex h-full flex-col">
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="block"
                  aria-label={`Read the full case study: ${c.title}`}
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-2xl ${imageBg}`}
                  >
                    <Image
                      src={unsplash(c.image.id, 1400)}
                      alt={c.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(15,23,42,0) 50%, rgba(15,23,42,0.35) 100%)",
                      }}
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-brand-700">
                      {c.service}
                    </span>
                  </div>
                </Link>

                <div className="mt-6 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500">
                    <span className="font-medium text-ink-700">{c.industry}</span>
                    <span aria-hidden>·</span>
                    <span>{c.duration}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight text-ink-900">
                    <Link
                      href={`/portfolio/${c.slug}`}
                      className="hover:text-brand-700 transition"
                    >
                      {c.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-ink-500">{c.client}</p>
                  <p className="mt-3 text-ink-600 leading-relaxed">{c.summary}</p>

                  <dl className="mt-5 grid grid-cols-3 gap-x-4">
                    {c.headlineOutcomes.map((o) => (
                      <div key={o.label}>
                        <dt className="text-xs text-ink-500">{o.label}</dt>
                        <dd className="mt-1 font-display text-xl md:text-2xl font-semibold text-ink-900 tracking-tight">
                          {o.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 pt-5 border-t border-ink-200/70">
                    <Link
                      href={`/portfolio/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
                    >
                      Discuss a similar project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
