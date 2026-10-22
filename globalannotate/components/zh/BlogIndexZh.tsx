import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { localizedPosts } from "@/data/blog";
import { imageBg, unsplash, servicesHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { formatZhDate } from "@/lib/zh-date";
import { ArrowUpRight } from "lucide-react";

// /zh/blog — Chinese article index (translated posts + zh-only guides).
export default function BlogIndexZh() {
  const sorted = [...localizedPosts("zh")].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <JsonLd
        data={zhLd([
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "博客", url: `${site.url}/zh/blog` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "GlobalAnnotate 翻译与本地化博客",
            url: `${site.url}/zh/blog`,
            blogPost: sorted.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `${site.url}/zh/blog/${p.slug}`,
              datePublished: p.date,
            })),
          },
        ])}
      />
      <PageHero
        eyebrow="行业洞察"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "博客", href: "/blog" },
        ]}
        title="非洲语言翻译与本地化博客：一线团队的实战笔记。"
        subtitle="关于非洲语言翻译、翻译费用、AI 数据、本地化与国际 SEO 的实用指南，由一线从业者亲自撰写。"
        slides={zhSlides(servicesHeroSlides)}
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
                    <time dateTime={p.date}>{formatZhDate(p.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{p.readMinutes} 分钟阅读</span>
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
                    阅读全文 <ArrowUpRight className="h-4 w-4" />
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
