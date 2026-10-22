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
import { ArrowRight, Check, Lock, FileCheck, ShieldCheck, Trash2 } from "lucide-react";

const SECURITY_EMAIL = "security@globalannotate.com";

export const ZH_META = {
  title: "翻译保密与数据安全：保密协议与访问控制 | GlobalAnnotate",
  description:
    "GlobalAnnotate 如何保护客户机密资料：每位语言专家签署保密协议、最小权限访问、加密传输、明确的保留与删除策略，并审慎处理医疗、法律与个人数据。",
  keywords: ["翻译保密", "数据安全", "保密协议", "医疗翻译", "法律翻译", "GlobalAnnotate 翻译"],
};

const DESCRIPTION = ZH_META.description;

const CONTROLS = [
  {
    icon: FileCheck,
    title: "所有人签署保密协议",
    body: "每一位内部团队成员和网络语言专家，在接触任何客户资料之前都必须签署保密协议，没有例外。",
  },
  {
    icon: Lock,
    title: "最小权限访问",
    body: "只有项目负责人和被指派到该项目的语言专家才能访问项目文件。权限按项目授予，项目结束后即刻收回。",
  },
  {
    icon: ShieldCheck,
    title: "加密传输",
    body: "文件通过加密连接（TLS）传输和存储。敏感项目使用安全、有访问控制的传输方式，而不是普通的邮件附件。",
  },
  {
    icon: Trash2,
    title: "保留与删除",
    body: "项目文件仅在交付和后续支持所需的期限内保留。除非合同另有要求，项目结束后文件将被删除或匿名化。",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "保密协议与项目范围",
    body: "我们签署您的保密协议（或提供我们的版本），确定工作范围，并事先确认数据敏感度、访问需求和监管限制。",
  },
  {
    step: "02",
    title: "安全接收",
    body: "文件通过加密、有访问控制的渠道接收，并放入只有指派团队可见的项目空间。",
  },
  {
    step: "03",
    title: "按需知悉的交付",
    body: "经过审核、签署保密协议的语言专家和审校在最小权限下处理项目，敏感资料交由相应领域的专家处理。",
  },
  {
    step: "04",
    title: "交付与删除",
    body: "我们通过约定的安全渠道交付，然后根据合同和保留政策删除或匿名化项目文件。",
  },
];

const SENSITIVE = [
  {
    title: "医疗与受保护健康信息",
    body: "临床与患者资料由专业人员依据项目的保密和数据保护条款处理，并执行更严格的访问和保留控制。我们支持客户的数据处理协议。",
  },
  {
    title: "个人身份信息",
    body: "作为数据处理者，我们按客户指示处理个人身份信息，并以保密协议、最小权限访问和明确的保留期限加以保护，详见我们的隐私政策。",
  },
  {
    title: "法律与受监管文件",
    body: "合同、诉讼文书和受监管文件交由具备专业背景的语言专家处理并严格保密，可应要求提供认证翻译。",
  },
];

// /zh/security — Chinese Security & Confidentiality page.
export default function SecurityZh() {
  const url = `${site.url}/zh/security`;
  return (
    <>
      <JsonLd
        data={zhLd([
          webPageSchema({ name: "安全与保密 — GlobalAnnotate", description: DESCRIPTION, url }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "安全与保密", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="安全与保密"
        title="翻译保密与数据安全：您的机密工作，以机密方式处理。"
        subtitle="每位语言专家都签署保密协议，实行最小权限访问、加密传输和明确的保留与删除策略，并审慎处理医疗、法律和个人数据。"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "安全与保密", href: "/security" },
        ]}
        ctas={[
          { label: "咨询安全事宜", href: "/contact" },
          { label: "阅读隐私政策", href: "/privacy", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">我们如何保护您的工作</p>
          <h2 className="section-h2 mt-4 text-ink-900">把保密融入每一个工作环节。</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONTROLS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-lg md:text-xl font-semibold tracking-tight text-ink-900">{c.title}</h3>
                  <p className="mt-2 text-ink-600 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">保密工作流程</p>
          <h2 className="section-h2 mt-4 text-ink-900">从签署保密协议到删除文件。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w, i) => (
            <Reveal key={w.step} delay={(i % 4) * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <p className="font-display text-2xl font-semibold text-brand-700">{w.step}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">{w.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">敏感数据</p>
          <h2 className="section-h2 mt-4 text-ink-900">医疗、法律与个人数据。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SENSITIVE.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{s.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">标准与认证</p>
            <h2 className="section-h2 mt-4 text-ink-900">如实说明我们的现状。</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              我们运行符合 ISO 17100 标准的质量管理体系，并采用公认的安全实践。哪些已经落实、哪些还在计划中，我们都公开透明地说明。
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 self-start">
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <Check className="h-3 w-3" strokeWidth={2.4} /> 已落实
              </span>
              <p className="mt-3 font-semibold text-ink-900">符合 ISO 17100 的质量管理体系</p>
              <p className="mt-1 text-sm text-ink-600">我们的质量流程遵循 ISO 17100 标准的工作流程，但这并非认证。</p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <Check className="h-3 w-3" strokeWidth={2.4} /> 已落实
              </span>
              <p className="mt-3 font-semibold text-ink-900">保密协议与访问控制</p>
              <p className="mt-1 text-sm text-ink-600">每个项目都签署保密协议，实行最小权限访问和加密传输。</p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                进行中
              </span>
              <p className="mt-3 font-semibold text-ink-900">服务组织控制审计（SOC 2 第一类）</p>
              <p className="mt-1 text-sm text-ink-600">已列入计划。我们正在推进该审计，目前尚未获得鉴证。</p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                计划中
              </span>
              <p className="mt-3 font-semibold text-ink-900">ISO 27001 / ISO 13485</p>
              <p className="mt-1 text-sm text-ink-600">尚未获得认证。随着企业级和生命科学业务的增长，已列入我们的路线图。</p>
            </li>
          </ul>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="section-h2 text-ink-900">安全问卷与尽职调查</h2>
              <p className="mt-3 text-lg text-ink-600 leading-relaxed">
                正在完成供应商安全评估，或需要我们的数据处理说明、保密协议或数据处理协议？请发送邮件至
                <a
                  href={`mailto:${SECURITY_EMAIL}`}
                  className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                >
                  {SECURITY_EMAIL}
                </a>
                ，我们会尽快回复。
              </p>
            </div>
            <Link href="/contact" className="btn-primary text-sm shrink-0">
              联系我们 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
