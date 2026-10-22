import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { imageBg, unsplash, portfolioHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { cases, localizeCase } from "@/data/portfolio";
import { ArrowUpRight, ArrowRight } from "lucide-react";

// /zh/portfolio — Chinese version of the case-study index.
export default function PortfolioZh() {
  const list = cases.map((c) => localizeCase(c, "zh"));
  return (
    <>
      <JsonLd
        data={zhLd(
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "客户案例", url: `${site.url}/zh/portfolio` },
          ])
        )}
      />

      <PageHero
        eyebrow="客户案例"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "客户案例", href: "/portfolio" },
        ]}
        title={
          <>
            翻译与本地化客户案例：
            <span className="text-gradient-light">真实团队，真实成果。</span>
          </>
        }
        subtitle="精选近期合作项目。根据保密协议隐去客户名称，所有成果均经核实。"
        ctas={[
          { label: "咨询专家", href: "/contact" },
          { label: "全部服务", href: "/services", variant: "ghost" },
        ]}
        slides={zhSlides(portfolioHeroSlides)}
      />

      <Section className="pt-12 md:pt-16">
        <div className="grid gap-x-8 gap-y-14 md:gap-y-20 md:grid-cols-2">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.05}>
              <article className="group flex h-full flex-col">
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="block"
                  aria-label={`阅读完整案例：${c.title}`}
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
                      了解详情 <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
                    >
                      咨询类似项目 <ArrowUpRight className="h-4 w-4" />
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
