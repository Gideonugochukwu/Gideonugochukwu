import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { posts } from "@/data/blog";
import { imageBg, unsplash, servicesHeroSlides } from "@/lib/images";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowUpRight } from "lucide-react";

const TITLE = "Insights & Guides on Localization, AI Data, and Multilingual SEO";
const DESCRIPTION =
  "Practical guides from the GlobalAnnotate team on AI data annotation, translation & localization, and international SEO.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/blog`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
        ])}
      />
      <PageHero
        eyebrow="Insights"
        title="Field notes from the global team."
        subtitle="Practical guides on AI data, localization, and international SEO — written by the people doing the work."
        slides={servicesHeroSlides}
        size="compact"
      />

      <Section className="pt-12 md:pt-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                href={`/blog/${p.slug}`}
                className="card group overflow-hidden flex flex-col h-full"
              >
                <div className={`relative aspect-[16/10] overflow-hidden ${imageBg}`}>
                  <Image
                    src={unsplash(p.heroImage.id, 1200)}
                    alt={p.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover photo-treat transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(15,23,42,0) 50%, rgba(15,23,42,0.55) 100%)",
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-ink-500">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{p.readMinutes} min read</span>
                  </div>
                  <h2 className="section-h3 mt-3 text-ink-900">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                    Read article <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
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
