import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import AirtableEmbed from "@/components/AirtableEmbed";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { aboutHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { Briefcase, BadgeDollarSign, Globe2, HeartHandshake } from "lucide-react";

const WHY = [
  {
    icon: Briefcase,
    title: "真实项目，真实客户",
    body: "参与企业服务 SaaS、电商、医疗健康、教育科技、AI 实验室和游戏工作室的真实项目，而不是测试稿件。",
  },
  {
    icon: BadgeDollarSign,
    title: "公平透明的报酬",
    body: "事先约定清晰的费率，没有不透明的扣款，并按约定条款按时付款。",
  },
  {
    icon: Globe2,
    title: "稀缺语言对需求旺盛",
    body: "我们积极寻找服务不足的非洲和亚洲语言的母语者，在这里，您的语言对就是您的优势。",
  },
  {
    icon: HeartHandshake,
    title: "尊重语言专家的团队",
    body: "一位负责到底的项目负责人、合理的截止日期、完整的背景信息，以及您做好工作所需的术语表和参考资料。",
  },
];

const linkCls =
  "font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline";

// /zh/freelancers — Chinese intro, benefits, and CTA. The Airtable
// application form itself is embedded unchanged.
export default function FreelancersZh() {
  return (
    <>
      <link rel="preconnect" href="https://airtable.com" />
      <JsonLd
        data={zhLd(
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "加入译者网络", url: `${site.url}/zh/freelancers` },
          ])
        )}
      />
      <PageHero
        eyebrow="加入译者网络"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "加入译者网络", href: "/freelancers" },
        ]}
        title="加入 GlobalAnnotate 非洲语言译者网络"
        subtitle="我们正在组建一个由专业译员、本地化专家、AI 数据标注员和配音人才组成的网络，尤其欢迎服务不足的非洲和亚洲语言的母语者。请在下方提交申请，当项目与您的技能匹配时，我们会与您联系。"
        slides={zhSlides(aboutHeroSlides)}
        size="compact"
      />

      <Section className="pt-12 md:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            为什么与我们合作
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">由语言专家打造，为语言专家服务。</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <w.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="section-h2 text-ink-900">申请加入网络</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              请告诉我们您的语言、服务和经验，带星号的为必填项。我们会妥善保存您的资料，并在有匹配项目时与您联系。
            </p>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">
              想先了解我们？欢迎浏览我们的
              <Link href="/services" className={linkCls}>
                服务
              </Link>
              ，或了解
              <Link href="/about" className={linkCls}>
                团队与创始人
              </Link>
              。
            </p>
          </div>
          <Reveal>
            <AirtableEmbed />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
