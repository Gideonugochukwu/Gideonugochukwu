import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { ArrowRight, Check } from "lucide-react";

export const ZH_META = {
  title: "翻译质量保证流程：翻译、审校与质检 | GlobalAnnotate",
  description:
    "GlobalAnnotate 符合 ISO 17100 标准的翻译质量保证流程：母语者翻译、独立审校与最终质检，并配合语言专家审核、术语管理、语言质量保证（LQA）与 MTPE。",
  keywords: ["翻译质量保证", "翻译审校", "语言质量保证", "机器翻译后编辑", "非洲语言翻译", "GlobalAnnotate 翻译"],
};

const TEP = [
  {
    step: "01",
    title: "翻译",
    body: "由与您所在领域相匹配、具备资质的母语语言专家，依据您认可的术语和参考资料完成翻译。",
  },
  {
    step: "02",
    title: "独立审校",
    body: "由第二位同样具备资质的语言专家对照原文审校译文的准确性、术语和风格，这正是 ISO 17100 标准核心的双语审校环节。",
  },
  {
    step: "03",
    title: "最终质检",
    body: "通过自动与人工检查核对数字、标签、一致性和格式，并在交付前出具成文的质量保证报告。",
  },
];

const PILLARS = [
  {
    title: "语言专家审核",
    body: "我们从资质、母语水平和领域经验等方面筛选译员，所有人在开展工作前都签署保密协议，并通过持续审核复查质量。",
  },
  {
    title: "领域匹配",
    body: "我们按领域指派语言专家，包括医疗、法律、技术、营销和游戏，确保翻译您内容的人真正理解它。",
  },
  {
    title: "术语与术语表",
    body: "我们为客户建立并维护术语表和翻译记忆库，让术语保持一致，并随每个项目不断完善。",
  },
  {
    title: "语言质量保证（LQA）",
    body: "针对软件、应用和游戏，我们在真实版本上进行 LQA，在发布前发现截断、重叠、语境和格式问题。",
  },
  {
    title: "机器翻译后编辑（MTPE）：符合 ISO 18587 标准",
    body: "在适合使用机器翻译的场景中，我们的译后编辑遵循 ISO 18587 标准的工作流程：由具备资质的人工译后编辑，把机器翻译结果提升到约定的质量水平。",
  },
  {
    title: "成文的质量报告",
    body: "每个项目都附带清晰的报告，让您看到质量是如何检查的，便于审计与采购评估。",
  },
];

// /zh/quality — Chinese Quality Process page.
export default function QualityZh() {
  const url = `${site.url}/zh/quality`;
  return (
    <>
      <JsonLd
        data={zhLd([
          webPageSchema({ name: "质量流程 — GlobalAnnotate", description: ZH_META.description, url }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "质量", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="质量"
        title="翻译质量保证：每个项目都执行符合 ISO 17100 标准的流程。"
        subtitle="母语者翻译、独立审校和最终质检，并以语言专家审核、领域匹配、术语管理和 LQA 作为支撑。"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "质量", href: "/quality" },
        ]}
        ctas={[
          { label: "咨询专家", href: "/contact" },
          { label: "查看我们的服务", href: "/services", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">翻译 · 审校 · 质检</p>
          <h2 className="section-h2 mt-4 text-ink-900">ISO 17100 的核心：始终有第二位语言专家把关。</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            每一份标准翻译都要经过三个阶段。独立审校环节，也就是由第二位具备资质的语言专家检查第一位的译文，正是专业流程与“一遍过”的区别所在。
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {TEP.map((t, i) => (
            <Reveal key={t.step} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="font-display text-3xl font-semibold text-brand-700">{t.step}</p>
                <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-ink-900">{t.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">流程背后的支撑</p>
          <h2 className="section-h2 mt-4 text-ink-900">质量是一个体系，而不是一个步骤。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{p.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
            >
              <Check className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <div className="max-w-3xl">
              <h2 className="section-h3 text-ink-900">“符合标准”，如实表述</h2>
              <p className="mt-2 text-ink-600 leading-relaxed">
                我们运行<strong>符合 ISO 17100 标准</strong>的质量管理体系，以及<strong>符合 ISO 18587 标准</strong>的机器翻译后编辑流程。这意味着我们的流程遵循这些标准。我们目前并未持有 ISO 17100 或 ISO 18587 认证，也从不自称已获认证。如果认证是您的采购要求，欢迎与我们沟通相关路线图。
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">需要书面版本的质量流程？</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            我们乐意提供质量保证方法说明、报告样本和客户推荐，供您评估。
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            获取报价 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
