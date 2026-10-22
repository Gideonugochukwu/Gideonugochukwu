import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { breadcrumbSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";
import { ArrowRight, Check } from "lucide-react";

export const ZH_META = {
  title: "尼日利亚翻译公司：豪萨语、约鲁巴语、伊博语翻译 | GlobalAnnotate",
  description:
    "尼日利亚专业翻译公司，总部位于伊巴丹：提供豪萨语、约鲁巴语、伊博语等尼日利亚语言及 100+ 种语言的翻译、本地化、MTPE、AI 数据标注与 MarketReady™ 文化验证。",
  keywords: ["尼日利亚翻译公司", "豪萨语翻译", "约鲁巴语翻译", "伊博语翻译", "尼日利亚皮钦语", "非洲语言翻译"],
};

const WHY = [
  { title: "总部位于尼日利亚伊巴丹", body: "深耕当地市场，而不是远在另一个大洲、靠猜测理解语境的外包供应商。" },
  { title: "每一种主要尼日利亚语言都有母语者", body: "豪萨语、约鲁巴语、伊博语等语言均有经过审核、签署保密协议的语言专家随时待命，而不是临时寻找。" },
  { title: "我们了解尼日利亚市场", body: "当地的商业文化、监管环境和市场动态，体现在我们交付的每一个项目中。" },
  { title: "已在尼日利亚 SMEDAN 注册", body: "一家正式注册的尼日利亚企业（注册号：SUID-2318-4705-9712-3682），您可以放心签约合作。" },
];

const MAJOR_LANGUAGES = [
  { name: "豪萨语", detail: "尼日利亚北部 · 8,000 万+ 使用者" },
  { name: "约鲁巴语", detail: "尼日利亚西南部 · 4,700 万+ 使用者" },
  { name: "伊博语", detail: "尼日利亚东南部 · 4,500 万+ 使用者" },
  { name: "尼日利亚皮钦语", detail: "非正式与商业交流" },
];

const OTHER_LANGUAGES = ["富尔富尔德语", "卡努里语", "蒂夫语", "埃菲克语", "伊比比奥语", "埃多语", "努佩语", "伊乔语"];

const SERVICES = [
  "为走向全球的尼日利亚企业提供翻译",
  "为进入尼日利亚的国际企业提供本地化",
  "移民、法律和学历文件的认证翻译",
  "尼日利亚语言的 AI 数据标注",
  "针对尼日利亚受众内容的 MarketReady™ 文化验证",
  "面向尼日利亚市场的多语言 SEO",
];

const INDUSTRIES = [
  { title: "金融科技", body: "应用界面本地化、开户流程、条款与条件，以及普惠金融产品的客服内容。" },
  { title: "电商", body: "商品信息翻译、结账流程本地化，以及面向当地消费者、经过 SEO 优化的商品描述。" },
  { title: "银行与金融", body: "合规翻译、监管文件与内部沟通资料。" },
  { title: "石油与天然气", body: "技术翻译、安全文件、健康安全环境手册与现场报告。" },
  { title: "政府与非政府组织", body: "公共宣传、政策文件、健康宣传活动与多语言公共服务。" },
  { title: "科技初创企业", body: "应用本地化、营销内容与投资人资料。" },
  { title: "医疗健康", body: "临床文件、患者信息、医药内容与公共卫生宣传活动。" },
];

// /zh/translation-services-nigeria — Chinese Nigeria geo page.
export default function NigeriaZh() {
  const url = `${site.url}/zh/translation-services-nigeria`;
  return (
    <>
      <JsonLd
        data={zhLd([
          localBusinessSchema({
            description: ZH_META.description,
            url,
            addressLocality: "伊巴丹",
            addressRegion: "奥约州",
            addressCountry: "NG",
            areaServed: "尼日利亚",
            serviceType: ["翻译", "本地化", "AI 数据标注"],
          }),
          serviceSchema({
            name: "尼日利亚翻译服务",
            description: ZH_META.description,
            url,
            areaServed: "尼日利亚",
            serviceType: "翻译与本地化",
          }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "尼日利亚翻译服务", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="翻译服务 · 尼日利亚"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "尼日利亚翻译服务", href: "/translation-services-nigeria" },
        ]}
        title="尼日利亚翻译公司：您的尼日利亚翻译与本地化合作伙伴"
        subtitle="立足伊巴丹，服务全球。为每一种尼日利亚语言提供母语级翻译，并覆盖 100+ 种国际语言对。"
        ctas={[
          { label: "免费获取报价", href: "/contact" },
          { label: "查看全部语言", href: "/languages", variant: "ghost" },
        ]}
        slides={zhSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">为什么选择 GlobalAnnotate</p>
            <h2 className="section-h2 mt-4 text-ink-900">
              一家尼日利亚公司，
              <br />
              专为尼日利亚业务而生。
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">我们覆盖的尼日利亚语言</p>
          <h2 className="section-h2 mt-4 text-ink-900">每一种主要尼日利亚语言，均由母语者完成。</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MAJOR_LANGUAGES.map((lang, i) => (
            <Reveal key={lang.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{lang.name}</h3>
                <p className="mt-2 text-sm text-ink-600">{lang.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium text-ink-700">另有以下语言的母语覆盖：</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OTHER_LANGUAGES.map((l) => (
              <li
                key={l}
                className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">面向尼日利亚企业的服务</p>
          <h2 className="section-h2 mt-4 text-ink-900">无论您朝哪个方向发展。</h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s} delay={(i % 2) * 0.04}>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-700 leading-relaxed">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">我们在尼日利亚服务的行业</p>
          <h2 className="section-h2 mt-4 text-ink-900">行业专长，而非泛泛的翻译。</h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {INDUSTRIES.map((u, i) => (
            <Reveal key={u.title} delay={(i % 2) * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{u.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{u.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">为您的尼日利亚翻译项目免费获取报价</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            告诉我们您的语言对、内容类型和工作量，我们会为您提供一份明确范围的方案。
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            免费获取报价 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
