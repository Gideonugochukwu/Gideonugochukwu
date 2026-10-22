import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { img, imageBg, unsplash, servicesHeroSlides } from "@/lib/images";
import { zhAlt, zhSlides } from "@/lib/images.zh";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { ArrowRight, Brain, Gamepad2, Languages, Megaphone, Search, ShieldCheck } from "lucide-react";

const ICONS = { Brain, Gamepad2, Languages, Megaphone, Search, ShieldCheck } as const;

// Same six services, order, images, and icons as the English /services page.
const SERVICES: {
  slug: string;
  title: string;
  short: string;
  summary: string;
  icon: keyof typeof ICONS;
  imageId: string;
}[] = [
  {
    slug: "translation-localization",
    title: "非洲语言翻译与本地化",
    short: "翻译与本地化",
    summary:
      "由母语者完成的高质量翻译与贴合文化的本地化，覆盖豪萨语、约鲁巴语、斯瓦希里语等 100+ 种语言，适用于网站、应用、文档与多媒体内容。",
    icon: "Languages",
    imageId: img.services.translation.id,
  },
  {
    slug: "ai-annotation",
    title: "多语言 AI 数据标注",
    short: "AI 数据标注",
    summary:
      "为计算机视觉、自然语言处理和大语言模型团队提供高精度训练数据：边界框、语义分割、音频与文本标注，覆盖大多数供应商无法支持的非洲语言，全部经过质量保证。",
    icon: "Brain",
    imageId: img.services.aiAnnotation.id,
  },
  {
    slug: "seo",
    title: "多语言 SEO 与搜索可见度",
    short: "SEO 与搜索可见度",
    summary:
      "在您销售的每个市场、每种语言中获得排名。多语言 SEO、国际 SEO、技术审计、内容建设与外链建设，效果持续累积。",
    icon: "Search",
    imageId: img.services.seo.id,
  },
  {
    slug: "digital-marketing",
    title: "数字营销",
    short: "数字营销",
    summary:
      "以效果为导向的 Facebook 与 Instagram 广告、社交媒体运营和内容策略，把受众转化为客户。",
    icon: "Megaphone",
    imageId: img.services.digitalMarketing.id,
  },
  {
    slug: "game-localization",
    title: "游戏本地化与翻译",
    short: "游戏本地化",
    summary:
      "让您的游戏走向全球玩家与非洲市场：界面、对白、字幕、配音脚本、商店页面与语言质量保证（LQA）测试，支持 100+ 种语言。",
    icon: "Gamepad2",
    imageId: img.services.gameLocalization.id,
  },
  {
    slug: "marketready",
    title: "MarketReady™ 文化验证",
    short: "MarketReady™",
    summary:
      "发布前由真实母语用户进行测试。唯一一项保证您的内容在目标市场真正有效的翻译服务。",
    icon: "ShieldCheck",
    imageId: img.services.marketReady.id,
  },
];

// /zh/services — Chinese services overview.
export default function ServicesZh() {
  return (
    <>
      <JsonLd
        data={zhLd([
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "服务", url: `${site.url}/zh/services` },
          ]),
          itemListSchema({
            name: "GlobalAnnotate 服务",
            url: `${site.url}/zh/services`,
            items: SERVICES.map((s) => s.title),
          }),
        ])}
      />

      <PageHero
        eyebrow="服务"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "服务", href: "/services" },
        ]}
        title={
          <>
            非洲语言翻译与出海服务：
            <span className="text-gradient-light">一套工具，通达每个市场。</span>
          </>
        }
        subtitle="核心服务既能协同运作，也能单独使用，帮助您的团队更快进入各个市场；再加上 MarketReady™ 文化验证，在发布前证明您的内容真正有效。"
        ctas={[
          { label: "咨询专家", href: "/contact" },
          { label: "查看客户案例", href: "/portfolio", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-12 md:pt-16">
        <ul className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className={
                  "group flex items-center justify-between rounded-xl border bg-white px-4 py-3 transition " +
                  (s.slug === "marketready"
                    ? "border-brand-300 hover:border-brand-400"
                    : "border-ink-200/80 hover:border-brand-300")
                }
              >
                <span className="font-medium text-ink-900">{s.short}</span>
                <ArrowRight className="h-4 w-4 text-ink-400 group-hover:text-brand-700 transition" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-8 md:pt-12">
        <div className="space-y-24 md:space-y-32">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            const reverse = i % 2 === 1;
            const isMarketReady = s.slug === "marketready";
            return (
              <Reveal key={s.slug} delay={0}>
                <article
                  id={s.slug}
                  className="grid items-center gap-10 lg:gap-16 md:grid-cols-2 scroll-mt-24"
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <div className={`relative aspect-[5/4] overflow-hidden rounded-2xl ${imageBg}`}>
                      <Image
                        src={unsplash(s.imageId, 1400)}
                        alt={zhAlt(s.imageId)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover photo-treat"
                      />
                    </div>
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <span
                      aria-hidden
                      className={
                        "inline-flex h-10 w-10 items-center justify-center rounded-lg " +
                        (isMarketReady
                          ? "bg-brand-500 text-white"
                          : "border border-ink-200 text-brand-700")
                      }
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
                      0{i + 1} · {isMarketReady ? "独家服务" : "服务"}
                    </p>
                    <h2 className="section-h2 mt-3 text-ink-900">{s.title}</h2>
                    <p className="mt-5 text-lg text-ink-600 leading-relaxed">{s.summary}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link href={`/services/${s.slug}`} className="btn-primary text-sm">
                        了解详情 <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
                      >
                        咨询专家 <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pb-28">
        <CTABand />
      </Section>
    </>
  );
}
