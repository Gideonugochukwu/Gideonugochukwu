import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import {
  africanLanguagesZh,
  regionalGroupsZh,
  servicesEveryLanguageZh,
  ZH_SERVICE_TAGS,
} from "@/lib/language-coverage.zh";
import { ArrowRight, Check, Globe, MapPin, Users, Type } from "lucide-react";

export const ZH_META = {
  title: "非洲语言翻译语言列表：100+ 种语言 | GlobalAnnotate",
  description:
    "GlobalAnnotate 非洲语言翻译语言列表：豪萨语、约鲁巴语、伊博语、斯瓦希里语、阿姆哈拉语、沃洛夫语、索马里语、祖鲁语等 100+ 种语言的使用地区、人口与可提供服务。",
  keywords: [
    "非洲语言翻译",
    "豪萨语翻译",
    "约鲁巴语翻译",
    "伊博语翻译",
    "斯瓦希里语翻译",
    "阿姆哈拉语翻译",
    "沃洛夫语翻译",
    "索马里语翻译",
  ],
};

const FAQ = [
  {
    q: "GlobalAnnotate 覆盖多少种语言？",
    a: "GlobalAnnotate 覆盖 100+ 种语言，提供翻译、本地化、机器翻译后编辑（MTPE）、AI 数据标注和 MarketReady™ 文化验证，涵盖非洲、欧洲、亚洲、中东和中亚各语系。",
  },
  {
    q: "GlobalAnnotate 提供哪些非洲语言翻译？",
    a: "我们提供豪萨语、约鲁巴语、伊博语、沃洛夫语、阿姆哈拉语、斯瓦希里语、索马里语、祖鲁语、绍纳语、契维语、富拉语、提格利尼亚语、奥罗莫语、基尼亚卢旺达语、林加拉语、马达加斯加语等语言的母语级翻译，由经过审核、签署保密协议的语言专家完成，而不是临时找来的自由译者。",
  },
  {
    q: "GlobalAnnotate 能提供非洲语言的 AI 数据标注吗？",
    a: "能。我们提供豪萨语、约鲁巴语、阿姆哈拉语、斯瓦希里语等大多数标注供应商无法覆盖的非洲语言的 AI 数据标注，包括文本分类、情感分析、命名实体识别、人类反馈强化学习（RLHF）偏好对、音频转录和语音评估。",
  },
  {
    q: "什么是 MarketReady™ 文化验证？",
    a: "MarketReady™ 文化验证是 GlobalAnnotate 独有的发布前流程：由目标市场的 3–5 名真实母语用户审阅译文，在您发布之前评估自然度、文化适宜性、语气、清晰度和敏感性，确认内容真正有效。",
  },
  {
    q: "如何获取某种语言的翻译报价？",
    a: "请通过报价表单告诉我们语言对、内容类型和工作量，我们会回复一份明确范围的方案。只要是有人使用的语言，我们几乎都能覆盖，即使没有在列表中看到也欢迎询问。",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800">
      {children}
    </span>
  );
}

// /zh/languages — 非洲语言翻译语言列表.
export default function LanguagesZh() {
  const url = `${site.url}/zh/languages`;
  const items = [
    ...africanLanguagesZh.map((l) => `${l.name}（${l.countries}，${l.speakers} 使用者）`),
    ...regionalGroupsZh.flatMap((g) =>
      g.languages.map((l) => `${l.name}（${l.regions}，${l.speakers} 使用者）`)
    ),
  ];
  return (
    <>
      <JsonLd
        data={zhLd([
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "非洲语言翻译语言列表",
            description:
              "GlobalAnnotate 提供翻译、本地化、MTPE、AI 数据标注和 MarketReady™ 文化验证的 100+ 种语言。",
            url,
            numberOfItems: items.length,
            itemListElement: items.map((name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
            })),
          },
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "语言列表", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="语言"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "语言列表", href: "/languages" },
        ]}
        title="非洲语言翻译语言列表：100+ 种语言，一个团队。"
        subtitle="翻译、本地化、AI 数据标注与 MarketReady™ 文化验证，覆盖您业务所需的每一种语言。"
        ctas={[
          { label: "获取报价", href: "/contact" },
          { label: "全部服务", href: "/services", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            非洲语言：我们的专业优势
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">大多数机构无法覆盖的非洲语言翻译。</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            我们为大多数机构无力覆盖的非洲语言提供母语级服务。这些不是“我们可以试着找找人”的语言，而是已有经过审核、签署保密协议、经验丰富的语言专家随时待命的语言。
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {africanLanguagesZh.map((lang, i) => (
            <Reveal key={lang.name} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6 transition hover:border-brand-300">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                    {lang.keyword ?? lang.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    <Type className="h-3 w-3" /> {lang.script}
                  </span>
                </div>
                <dl className="mt-4 space-y-2 text-sm text-ink-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <dd>{lang.countries}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0 text-brand-600" />
                    <dd>{lang.speakers} 使用者</dd>
                  </div>
                </dl>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {ZH_SERVICE_TAGS.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1 text-xs font-medium text-ink-700"
                    >
                      <Check className="h-3 w-3 text-brand-600" strokeWidth={2.4} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">各语言可提供的服务</p>
          <h2 className="section-h2 mt-4 text-ink-900">我们覆盖的每一种语言，都提供全部服务。</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            以下每种语言都可使用我们的完整服务。如果您需要的组合没有列出，欢迎询问，我们经常为客户定制项目方案。
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {servicesEveryLanguageZh.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 0.04}>
              <li className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3.5">
                <span
                  aria-hidden
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="font-medium text-ink-900">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">全球覆盖</p>
          <h2 className="section-h2 mt-4 text-ink-900">欧洲、亚洲、中东及中亚语言。</h2>
        </div>
        <div className="mt-12 space-y-14">
          {regionalGroupsZh.map((group) => (
            <Reveal key={group.region}>
              <div className="grid gap-6 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink-900">
                    <Globe className="h-5 w-5 text-brand-600" strokeWidth={1.6} />
                    {group.region}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{group.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.languages.slice(0, 6).map((l) => (
                      <li key={l.name}>
                        <Chip>{l.name}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">{group.region}：语言、使用地区与使用人口</caption>
                    <thead className="bg-ink-50 text-ink-700">
                      <tr>
                        <th scope="col" className="px-4 py-2.5 font-semibold">语言</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold">主要使用地区</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold whitespace-nowrap">使用人口</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100 text-ink-700">
                      {group.languages.map((l) => (
                        <tr key={l.name}>
                          <td className="px-4 py-2 font-medium text-ink-900">{l.name}</td>
                          <td className="px-4 py-2">{l.regions}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{l.speakers}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-500">
          使用人口为第一语言与第二语言使用者的概数，仅供参考。
        </p>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">常见问题</p>
          <h2 className="section-h2 mt-4 text-ink-900">关于语言覆盖的问题解答。</h2>
        </div>
        <div className="mt-10 max-w-3xl divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white">
          {FAQ.map((f) => (
            <div key={f.q} className="p-5 md:p-6">
              <h3 className="font-semibold text-ink-900">{f.q}</h3>
              <p className="mt-2 text-ink-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-16">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">没有找到您需要的语言？</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            欢迎联系我们。只要有人使用，我们很可能就能覆盖。我们每个月都在为进行中的项目新增语言。了解非洲市场的更多信息，请阅读
            <Link href="/blog/african-language-translation-guide" className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline">
              非洲语言翻译完全指南
            </Link>
            。
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            联系我们 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
