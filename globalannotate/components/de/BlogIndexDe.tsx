import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { localizedPosts } from "@/data/blog";
import { imageBg, unsplash, servicesHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import { formatDeDate } from "@/lib/de-date";
import { ArrowUpRight } from "lucide-react";

// /de/blog — German article index (translated posts + zh-only guides).
export default function BlogIndexDe() {
  const sorted = [...localizedPosts("de")].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <JsonLd
        data={deLd([
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Fachbeiträge", url: `${site.url}/de/blog` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Fachbeiträge zu Übersetzung und Lokalisierung von GlobalAnnotate",
            url: `${site.url}/de/blog`,
            blogPost: sorted.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `${site.url}/de/blog/${p.slug}`,
              datePublished: p.date,
            })),
          },
        ])}
      />
      <PageHero
        eyebrow="Fachwissen"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Fachbeiträge", href: "/blog" },
        ]}
        title="Fachbeiträge zur Übersetzung afrikanischer Sprachen und Lokalisierung."
        subtitle="Praxisleitfäden zur Übersetzung afrikanischer Sprachen, zu Übersetzungskosten, KI-Daten, Lokalisierung und internationaler Suchmaschinenoptimierung – geschrieben von den Menschen, die diese Arbeit täglich leisten."
        slides={deSlides(servicesHeroSlides)}
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
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
                    <time dateTime={p.date}>{formatDeDate(p.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{p.readMinutes} Min. Lesezeit</span>
                    {p.displayTags[0] && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{p.displayTags[0]}</span>
                      </>
                    )}
                  </div>
                  <h2 className="section-h3 mt-3 text-ink-900">{p.title}</h2>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                    Beitrag lesen <ArrowUpRight className="h-4 w-4" />
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
