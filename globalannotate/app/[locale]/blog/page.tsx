import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/i18n-meta";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/blog", metaKey: "blog" });
}

// Locale → BCP-47 tag for date formatting (English July 15, 2026 · German
// 15. Juli 2026 · Chinese 2026年7月15日).
const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  zh: "zh-CN",
};

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[locale] ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
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
                    <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                    <span aria-hidden>·</span>
                    <span>{p.readMinutes} {t("minRead")}</span>
                  </div>
                  <h2 className="section-h3 mt-3 text-ink-900">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                    {t("readArticle")} <ArrowUpRight className="h-4 w-4" />
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
