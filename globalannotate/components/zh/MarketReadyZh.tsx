import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { zhAlt, zhSlides } from "@/lib/images.zh";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import {
  AlertTriangle,
  Users,
  Wrench,
  FileCheck2,
  ShieldCheck,
  Globe2,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const DESCRIPTION =
  "唯一在发布前由真实母语用户验证内容的翻译服务。避免代价高昂的文化失误，获得经认证、可在市场发布的内容。";

const STATS = [
  { value: "39%", body: "的营销人员表示，他们最严重的本地化失误造成了超过 1 万美元的损失。" },
  { value: "29%", body: "的人表示，一次糟糕的翻译损害了品牌声誉。" },
  { value: "55%", body: "的用户表示，机器翻译在非正式语境中无法满足他们的需要。" },
];

const MISTAKES = [
  { brand: "汇丰银行", line: "“不做任何假设”的全球广告语，被译成了“什么都不做”。" },
  { brand: "肯德基", line: "“吮指回味”进入中国时，一度被译成“把你的手指吃掉”。" },
];

const STEPS = [
  {
    icon: Layers,
    tag: "第一步",
    title: "翻译与语言质量保证",
    body: "由母语语言专家翻译，再由第二位审校检查准确性、术语和一致性。这是每一家专业机构都会做的一步。",
  },
  {
    icon: Users,
    tag: "第二步",
    title: "文化验证小组",
    body: "由目标市场的 3–5 名真实母语用户（而非译员）对内容进行盲审，评估自然度、文化契合度、语气、清晰度和敏感性。这是其他人都不做的一步。",
  },
  {
    icon: Wrench,
    tag: "第三步",
    title: "问题处理",
    body: "验证小组标记的严重和重大问题由我们的语言专家修复并重新验证，确保问题在发布前被发现并关闭，而不是在发布后才暴露。",
  },
  {
    icon: FileCheck2,
    tag: "第四步",
    title: "市场就绪报告",
    body: "您将收到一份签署的认证：一份实实在在的文件，证明真实用户已审阅内容，并判断其已可在您的市场发布。",
  },
];

const WHY = [
  {
    icon: FileCheck2,
    title: "看得见的证明",
    body: "把 MarketReady 报告交给您的首席营销官、法务团队或董事会：“这些内容在发布前经过了真实用户测试。”让信心落到纸面上。",
  },
  {
    icon: ShieldCheck,
    title: "比危机便宜得多",
    body: "一个 5 人验证小组的费用，只是一次发布后品牌危机、产品召回或紧急品牌重塑成本的零头。",
  },
  {
    icon: Globe2,
    title: "难做的市场尤其关键",
    body: "在非洲、亚洲和中东市场尤为重要：这些市场的文化差异最大，合格的验证者也最难找到。",
  },
];

const EDGE = [
  {
    title: "别人触达不到的验证小组",
    body: "我们能在其他机构覆盖不到的市场组建母语验证小组，包括豪萨语、约鲁巴语、沃洛夫语、伊博语、阿姆哈拉语、斯瓦希里语、索马里语和祖鲁语，同时覆盖主要的欧洲、亚洲和中东市场。",
  },
  {
    title: "真实消费者，而非语言专家",
    body: "验证者不只是译员，而是生活在当地市场、能代表您真实受众的普通人，他们的反应就是您客户的反应。",
  },
  {
    title: "一个团队，一份报告",
    body: "从翻译到验证，由同一个团队、同一套流程完成，最终交付一份签署的市场就绪报告。",
  },
];

const FAQ_ITEMS = [
  {
    q: "什么是 MarketReady？它和校对有什么区别？",
    a: "MarketReady 是一项发布前文化验证服务。校对检查文字在语言层面是否正确；MarketReady 检查内容是否真正有效。在您发布之前，由目标市场的 3–5 名真实母语用户进行盲审，评估自然度、文化契合度、语气、清晰度和敏感性。",
  },
  {
    q: "验证小组成员是谁？如何挑选？",
    a: "他们是生活在目标市场、与您的受众相匹配的真实消费者，而不是译员或语言专家。我们会针对每个项目，按市场、人口特征和语体进行招募和审核，确保他们的反应与您的真实客户一致。",
  },
  {
    q: "它会让项目周期延长多久？",
    a: "招募验证小组、盲审和出具报告通常需要 3–5 个工作日，并且往往与最终质量检查并行进行，因此很少影响发布日期。大型多市场项目会提前排期。",
  },
  {
    q: "其他机构翻译的内容也能使用 MarketReady 吗？",
    a: "可以。MarketReady 可以作为独立的验证环节，用于任何内容，包括您已有的译文。我们会由母语用户进行验证，并出具同样的签署版市场就绪报告。",
  },
  {
    q: "你们可以验证哪些市场？",
    a: "100+ 种语言，并能在大多数机构无法触达的市场组建验证小组，包括豪萨语、约鲁巴语、沃洛夫语、伊博语、阿姆哈拉语、斯瓦希里语、索马里语和祖鲁语，同时覆盖主要的欧洲、亚洲和中东市场。",
  },
];

const SCHEMA_FAQ = [
  {
    q: "什么是 MarketReady™ 文化验证？",
    a: "MarketReady 是 GlobalAnnotate 独有的发布前文化验证流程。在交付之前，由目标市场的 3–5 名真实母语用户审阅译文，确认内容真正有效。",
  },
  {
    q: "MarketReady 和校对有什么区别？",
    a: "校对检查语言准确性；MarketReady 测试内容对真实用户是否有效，评估自然度、文化适宜性、语气、清晰度和敏感性。",
  },
  {
    q: "MarketReady 会让项目周期延长多久？",
    a: "验证小组通常需要 24–48 小时，具体取决于语言和内容类型。",
  },
  {
    q: "其他机构翻译的内容也能使用 MarketReady 吗？",
    a: "可以。无论由谁翻译，MarketReady 都可以验证任何译文内容。",
  },
  {
    q: "GlobalAnnotate 可以验证哪些语言？",
    a: "我们覆盖的全部 100+ 种语言，尤其在非洲语言方面具备深厚实力：这些市场的文化差异最大，合格的验证者也最难找到。",
  },
];

// /zh/services/marketready — Chinese MarketReady™ page.
export default function MarketReadyZh() {
  const url = `${site.url}/zh/services/marketready`;
  const heroId = "1522071820081-009f0129c71c";
  const heroSlides = [{ id: heroId, alt: zhAlt(heroId) }, ...zhSlides(servicesHeroSlides)];

  return (
    <>
      <JsonLd
        data={zhLd([
          serviceSchema({
            name: "MarketReady™ 文化验证",
            description: DESCRIPTION,
            url,
            areaServed: "全球",
            serviceType: "发布前文化验证",
          }),
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "服务", url: `${site.url}/zh/services` },
            { name: "MarketReady™ 文化验证", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="MarketReady™ · 文化验证"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "服务", href: "/services" },
          { name: "MarketReady™ 文化验证", href: "/services/marketready" },
        ]}
        title="MarketReady™ 文化验证：唯一保证您的内容在目标市场真正有效的翻译服务。"
        subtitle="其他机构交付的是译文，我们交付的是可以直接发布的内容：在您发布之前，由真实母语用户完成验证。"
        ctas={[
          { label: "咨询专家", href: "/contact" },
          { label: "全部服务", href: "/services", variant: "ghost" },
        ]}
        slides={heroSlides}
      />

      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            <AlertTriangle className="h-4 w-4" /> 问题所在
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">“正确”的翻译，照样可能毁掉您的品牌。</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            每一家翻译机构都会检查文字是否正确，却几乎没有人检查内容对真实的人是否有效。而昂贵、公开的失误，恰恰就发生在这个缺口里。
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.05}>
              <div className="card h-full p-7">
                <div className="display-num text-4xl md:text-5xl">{s.value}</div>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {MISTAKES.map((m) => (
            <div key={m.brand} className="rounded-2xl border border-ink-200/80 bg-white p-6">
              <p className="text-sm font-semibold text-ink-900">{m.brand}</p>
              <p className="mt-1.5 text-ink-600 leading-relaxed">{m.line}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-ink-600 leading-relaxed">
          这些译文在语言上都是“正确”的，却依然损害了品牌形象。根本原因不是语法不好，而是没有人用目标人群测试过这些内容。
        </p>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            解决方案 · MarketReady™
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">从翻译到认证可发布，只需四步。</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            MarketReady 补上了其他机构都跳过的那一步：真实的母语用户。最终交付一份可以据此行动的签署认证。
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {STEPS.map((s, i) => {
            const highlight = i === 1;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <li
                  className={
                    "h-full rounded-2xl p-7 " +
                    (highlight
                      ? "border-2 border-brand-500 bg-white shadow-[0_20px_60px_-25px_rgba(16,185,129,0.45)]"
                      : "border border-ink-200 bg-white")
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl " +
                        (highlight ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700")
                      }
                    >
                      <s.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700">
                      {s.tag}
                      {highlight && (
                        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand-700">
                          我们的独特之处
                        </span>
                      )}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">为什么重要</p>
          <h2 className="section-h2 mt-4 text-ink-900">一份可以直接呈给董事会的证明。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <w.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">{w.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              GlobalAnnotate 的优势
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">别人找不到的验证者，我们找得到。</h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              尤其是在文化差异最大、合格验证者最难找到的市场。
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-1">
            {EDGE.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">
                      {e.title}
                    </h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">{e.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">价格</p>
              <h2 className="section-h2 mt-4 text-ink-900">简单透明，而且往往已经包含在内。</h2>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} />
                  <span>
                    所有 5,000 美元以上的项目均
                    <strong className="font-semibold text-ink-900">标准包含</strong>
                    此项服务。
                  </span>
                </li>
                <li className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} />
                  <span>
                    也可以按每种语言固定费用，作为
                    <strong className="font-semibold text-ink-900">任何翻译项目的附加服务</strong>
                    购买。
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:text-right">
              <Link href="/contact" className="btn-primary text-sm">
                咨询专家 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">常见问题</p>
          <h2 className="section-h2 mt-4 text-ink-900">问题解答。</h2>
        </div>
        <div className="mt-12 max-w-3xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
