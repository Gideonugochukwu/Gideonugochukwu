import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { organizationSchemaZh } from "@/lib/schema.zh";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export const ZH_META = {
  title: "非洲语言翻译服务：非洲语言本地化专家 | GlobalAnnotate",
  description:
    "专注非洲语言翻译与本地化：豪萨语、约鲁巴语、伊博语、沃洛夫语、阿姆哈拉语、斯瓦希里语、索马里语、祖鲁语等 15+ 种非洲语言，含 MarketReady™ 文化验证。",
  keywords: [
    "非洲语言翻译",
    "非洲语言本地化",
    "斯瓦希里语翻译",
    "阿姆哈拉语翻译",
    "沃洛夫语翻译",
    "索马里语翻译",
    "祖鲁语翻译",
    "游戏本地化 非洲市场",
  ],
};

const GAP = [
  {
    stat: "2,000+",
    label: "种非洲语言",
    body: "5 亿以上的人口以英语或法语以外的语言作为第一语言，这是大多数内容从未触达的市场。",
  },
  {
    stat: "大多数机构",
    label: "无法覆盖非洲语言",
    body: "它们要么完全不提供，要么临时外包给未经审核的自由译者，出了问题无人负责。",
  },
  {
    stat: "GlobalAnnotate",
    label: "正是为填补这一空白而生",
    body: "遍布非洲大陆、经过审核并签署保密协议的母语语言专家，正是非洲语言一直缺少的专业服务商。",
  },
];

const REGIONS = [
  { region: "西非", languages: ["豪萨语", "约鲁巴语", "伊博语", "沃洛夫语", "契维语", "富拉语", "埃维语", "莫西语"] },
  { region: "东非", languages: ["斯瓦希里语", "阿姆哈拉语", "索马里语", "提格利尼亚语", "奥罗莫语", "基尼亚卢旺达语"] },
  { region: "南部非洲", languages: ["祖鲁语", "绍纳语", "科萨语", "索托语", "茨瓦纳语", "恩德贝莱语"] },
  { region: "中部非洲", languages: ["林加拉语", "桑戈语", "基隆迪语"] },
  { region: "北非", languages: ["阿拉伯语（埃及）", "阿拉伯语（摩洛哥）", "阿拉伯语（突尼斯）"] },
];

const USE_CASES = [
  "金融科技企业拓展非洲市场",
  "面向非洲民众的非政府组织与人道主义内容",
  "面向非洲消费者的电商商品信息",
  "政府与公共卫生宣传",
  "面向非洲手游玩家的游戏本地化",
  "非洲语言 AI 训练数据",
  "面向非洲流媒体观众的字幕制作与配音",
];

const MARKETREADY = [
  {
    title: "在这里，文化验证更加重要",
    body: "非洲市场文化差异最大，内容“不接地气”的风险也最高，因此验证不是可选项，而是必需品。",
  },
  {
    title: "由真实母语用户确认效果",
    body: "卡诺、拉各斯、达喀尔、内罗毕和亚的斯亚贝巴的验证小组会审阅您的内容，在发布前确认它真正有效。",
  },
  {
    title: "一份签署的 MarketReady™ 报告",
    body: "每个项目最终都交付一份成文、签署的报告，证明内容已可在目标市场发布。",
  },
];

// /zh/translation-services-africa — Chinese Africa geo page.
export default function AfricaZh() {
  const url = `${site.url}/zh/translation-services-africa`;
  return (
    <>
      <JsonLd
        data={zhLd([
          organizationSchemaZh(),
          serviceSchema({
            name: "非洲语言翻译服务",
            description: ZH_META.description,
            url,
            areaServed: "非洲",
            serviceType: "翻译与本地化",
          }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "非洲语言翻译服务", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="翻译服务 · 非洲"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "非洲语言翻译服务", href: "/translation-services-africa" },
        ]}
        title="非洲语言翻译：母语专家，可直接发布的内容。"
        subtitle="专为非洲语言打造的翻译公司，从沃洛夫语到祖鲁语，从豪萨语到阿姆哈拉语。每个项目都包含 MarketReady™ 文化验证。"
        ctas={[
          { label: "进军非洲市场", href: "/contact" },
          { label: "查看全部语言", href: "/languages", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">非洲语言缺口</p>
          <h2 className="section-h2 mt-4 text-ink-900">被翻译行业遗忘的大陆。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {GAP.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="font-display text-3xl font-semibold tracking-tight text-brand-700">{g.stat}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ink-500">{g.label}</p>
                <p className="mt-4 text-ink-600 leading-relaxed">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">我们覆盖的非洲语言</p>
          <h2 className="section-h2 mt-4 text-ink-900">覆盖非洲大陆的每一个区域。</h2>
        </div>
        <div className="mt-12 space-y-10">
          {REGIONS.map((r) => (
            <Reveal key={r.region}>
              <div className="grid gap-4 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{r.region}</h3>
                <ul className="flex flex-wrap gap-2 content-start">
                  {r.languages.map((l) => (
                    <li
                      key={l}
                      className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">应用场景</p>
          <h2 className="section-h2 mt-4 text-ink-900">各团队与我们在非洲开展的项目。</h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <Reveal key={u} delay={(i % 2) * 0.04}>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-700 leading-relaxed">{u}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
            <ShieldCheck className="h-3.5 w-3.5" /> MarketReady™
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">面向非洲市场的 MarketReady™ 文化验证。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {MARKETREADY.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{m.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services/marketready"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
          >
            了解 MarketReady™ 如何运作 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">满怀信心地进入非洲市场</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            母语级翻译、文化验证与 AI 数据，覆盖您业务增长所依赖的每一种非洲语言。阅读
            <Link href="/blog/african-language-translation-guide" className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline">
              非洲语言翻译完全指南
            </Link>
            了解更多。
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            咨询专家 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
