import type { Metadata } from "next";
import { buildMetadata } from "@/lib/i18n-meta";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { imageBg, unsplash, portfolioHeroSlides } from "@/lib/images";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { cases } from "@/data/portfolio";
import { ArrowUpRight, ArrowRight } from "lucide-react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/portfolio", metaKey: "portfolio" });
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Portfolio", url: `${site.url}/portfolio` },
        ])}
      />

      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Real teams.{" "}
            <span className="text-gradient-light">Real outcomes.</span>
          </>
        }
        subtitle="A selection of recent engagements. Names redacted under NDA. Results verified."
        ctas={[
          { label: "Talk to an expert", href: "/contact" },
          { label: "All services", href: "/services", variant: "ghost" },
        ]}
        slides={portfolioHeroSlides}
      />

      <Section className="pt-12 md:pt-16">
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
                      className="object-cover photo-treat transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
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
