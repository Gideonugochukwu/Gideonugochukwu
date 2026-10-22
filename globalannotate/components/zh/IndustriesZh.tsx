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
import { ArrowRight, HeartPulse, Factory, Scale, Landmark, Cpu } from "lucide-react";

export const ZH_META = {
  title: "行业翻译服务：医疗、法律、公共部门与 AI | GlobalAnnotate",
  description:
    "面向受监管行业和企业的专业语言与 AI 数据服务：医疗与生命科学、制造与技术、法律与企业、公共部门与非政府组织、AI 与科技，覆盖 100+ 种语言。",
  keywords: ["行业翻译", "医疗翻译", "法律翻译", "技术翻译", "多语言 AI 数据标注", "非洲语言翻译"],
};

const INDUSTRIES = [
  {
    id: "medical",
    icon: HeartPulse,
    name: "医疗与生命科学",
    body: "由专业语言专家在保密条件下处理临床和受监管的医疗内容，确保语言精准且合规。",
    points: [
      "临床试验文件（试验方案、知情同意书、病例报告表）",
      "使用说明书与医疗器械标签",
      "面向患者的资料与问卷",
      "欧盟医疗器械法规与体外诊断法规在各成员国语言上的要求",
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    name: "制造与技术",
    body: "为复杂产品、机械设备，以及保障工人安全与合规的文档提供技术上准确的翻译。",
    points: [
      "用户手册与维护手册",
      "安全文件与健康、安全、环境资料",
      "机械、工业与工程内容",
      "面向国际市场的产品本地化",
    ],
  },
  {
    id: "legal",
    icon: Scale,
    name: "法律与企业",
    body: "为法务和企业团队提供保密、准确的翻译，可应要求提供认证翻译。",
    points: [
      "合同、协议与公司文件",
      "合规、监管与政策资料",
      "电子取证与诉讼支持",
      "可应要求提供认证翻译",
    ],
  },
  {
    id: "public-sector",
    icon: Landmark,
    name: "公共部门与非政府组织",
    body: "为各类机构和国际发展组织提供多语言沟通服务，在非洲语言方面实力深厚。",
    points: [
      "联合国与开发银行项目及招标",
      "政策、公共宣传与报告",
      "健康、人道主义与面向公众的宣传活动",
      "已注册供应商，详见“合作与采购”",
    ],
  },
  {
    id: "ai-tech",
    icon: Cpu,
    name: "AI 与科技",
    body: "为构建和评估 AI 的团队提供高质量的多语言数据，包括其他供应商无法覆盖的语言。",
    points: [
      "AI 数据标注",
      "人类反馈强化学习（RLHF）偏好数据与模型评估",
      "覆盖 100+ 种语言的多语言数据集",
      "软件、应用与游戏本地化",
    ],
  },
];

// /zh/industries — Chinese Industries page.
export default function IndustriesZh() {
  const url = `${site.url}/zh/industries`;
  return (
    <>
      <JsonLd
        data={zhLd([
          webPageSchema({ name: "服务行业 — GlobalAnnotate", description: ZH_META.description, url }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "服务行业", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="服务行业"
        title="行业翻译服务：专为受监管行业与企业级工作打造。"
        subtitle="面向最看重准确性、保密性和流程规范的行业，提供专业的语言与 AI 数据服务，覆盖 100+ 种语言。"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "服务行业", href: "/industries" },
        ]}
        ctas={[
          { label: "获取报价", href: "/contact" },
          { label: "合作与采购", href: "/procurement", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="space-y-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <Reveal key={ind.id} delay={0}>
                <article
                  id={ind.id}
                  className="scroll-mt-24 rounded-2xl border border-ink-200 bg-white p-7 md:p-9"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1.4fr] lg:items-start">
                    <div>
                      <span
                        aria-hidden
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <h2 className="section-h3 mt-5 text-ink-900">{ind.name}</h2>
                      <p className="mt-3 text-ink-600 leading-relaxed">{ind.body}</p>
                      <Link href="/contact" className="btn-primary mt-6 inline-flex text-sm">
                        获取报价 <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-1 lg:pt-2">
                      {ind.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 border-l-2 border-brand-200 pl-4 py-0.5 text-ink-700 leading-relaxed"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
