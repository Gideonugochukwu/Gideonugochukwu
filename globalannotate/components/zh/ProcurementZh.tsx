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
import { ArrowRight, Download, FileText } from "lucide-react";

export const ZH_META = {
  title: "供应商合作与采购：尼日利亚翻译公司资质 | GlobalAnnotate",
  description:
    "如何与 GlobalAnnotate 建立供应商合作：入驻流程、UNGM 与欧盟参与者识别码等注册信息、已在尼日利亚 SMEDAN 注册，以及如何索取能力说明和供应商资料包。",
  keywords: ["尼日利亚翻译公司", "翻译供应商", "翻译采购", "UNGM 供应商", "非洲语言翻译", "GlobalAnnotate 翻译"],
};

const REGISTRATIONS = [
  { label: "UNGM 供应商", value: "1254285", note: "联合国全球采购市场注册供应商。" },
  { label: "欧盟参与者识别码", value: "862808308", note: "用于欧盟项目和招标的参与者识别码。" },
  {
    label: "已在尼日利亚 SMEDAN 注册",
    value: "SUID-2318-4705-9712-3682",
    note: "已在尼日利亚中小企业发展署注册。",
  },
];

const STEPS = [
  {
    step: "01",
    title: "初步沟通与保密协议",
    body: "告诉我们您的项目范围和要求。我们签署您的保密协议（或提供我们的版本），并提供您的采购团队所需的文件。",
  },
  {
    step: "02",
    title: "供应商注册",
    body: "我们完成您的供应商注册以及安全和质量问卷，并可应要求提供注册信息、客户推荐和保险详情。",
  },
  {
    step: "03",
    title: "试点或框架协议",
    body: "我们共同确定试点项目或框架协议（主服务协议加工作说明书），明确费率、服务等级和单一联系人。",
  },
  {
    step: "04",
    title: "交付与复盘",
    body: "我们依据工作说明书交付并提供成文的质量保证，然后定期复盘质量、交付周期和费用。",
  },
];

// /zh/procurement — Chinese "Working with us" page.
export default function ProcurementZh() {
  const url = `${site.url}/zh/procurement`;
  return (
    <>
      <JsonLd
        data={zhLd([
          webPageSchema({ name: "与我们合作 — GlobalAnnotate", description: ZH_META.description, url }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "合作与采购", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="采购 · 合作方式"
        title="与尼日利亚翻译公司合作：入驻流程简单高效。"
        subtitle="为企业、机构和国际发展领域的采购方提供完备的注册信息、文件资料和清晰的入驻路径。"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "合作与采购", href: "/procurement" },
        ]}
        ctas={[
          { label: "索取供应商资料包", href: "/contact" },
          { label: "查看服务行业", href: "/industries", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">注册信息与编号</p>
          <h2 className="section-h2 mt-4 text-ink-900">资质齐全，随时可进入采购流程。</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REGISTRATIONS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700">{r.label}</p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-900 break-words">
                  {r.value}
                </p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">入驻流程</p>
          <h2 className="section-h2 mt-4 text-ink-900">从首次接洽到签订框架协议。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={(i % 4) * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <p className="font-display text-2xl font-semibold text-brand-700">{s.step}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">{s.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
                <FileText className="h-3.5 w-3.5" /> 能力说明
              </p>
              <h2 className="section-h2 mt-4 text-ink-900">提供您的采购团队需要的一切。</h2>
              <p className="mt-3 text-lg text-ink-600 leading-relaxed">
                我们的能力说明涵盖服务、语言、注册信息、质量与安全实践以及客户推荐。供应商资料包还可应要求附上保密协议、数据处理协议和保险详情。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <Link href="/contact" className="btn-primary text-sm">
                <Download className="h-4 w-4" /> 索取能力说明
              </Link>
              <Link href="/contact" className="btn-secondary text-sm">
                索取供应商资料包 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
