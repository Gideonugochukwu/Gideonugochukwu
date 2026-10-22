import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";
import { img, imageBg, unsplash, aboutHeroSlides } from "@/lib/images";
import { zhAlt, zhSlides } from "@/lib/images.zh";
import { site, founder } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { personSchemaZh, ZH_FOUNDER_ROLE } from "@/lib/schema.zh";
import { zhLd, ZH_HOME } from "@/lib/zh";

const values = [
  { icon: HeartHandshake, title: "坦诚为本", body: "我们对客户说实话，包括坦白告知某个项目并不适合我们。" },
  { icon: Sparkles, title: "质量不容妥协", body: "每一份交付成果在发出前都经过审核。" },
  { icon: Globe2, title: "真正的全球化", body: "我们的母语专家就生活在我们服务的市场中。" },
  { icon: Compass, title: "资深专家全程负责", body: "您直接与资深项目负责人合作，没有层层转手。" },
];

const linkCls =
  "font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline";

// /zh/about — Chinese About page, including the founder section.
export default function AboutZh() {
  return (
    <>
      <JsonLd
        data={zhLd([
          personSchemaZh(),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "关于我们", url: `${site.url}/zh/about` },
          ]),
        ])}
      />
      <PageHero
        eyebrow="关于 GlobalAnnotate"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "关于我们", href: "/about" },
        ]}
        title="来自尼日利亚的翻译公司，连接每一次国际增长。"
        subtitle="翻译、AI 训练数据、多语言 SEO 与营销由一个团队完成，并以产品公司的严谨标准执行。"
        slides={zhSlides(aboutHeroSlides)}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="section-h2 text-ink-900">我们的使命</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              帮助有抱负的团队触达他们关心的每一个市场：内容能引起共鸣，数据经得起检验，增长持续累积。欢迎了解我们在同一套质量体系下交付的
              <Link href="/services" className={linkCls}>
                五大服务
              </Link>
              。
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              出色的
              <Link href="/services/translation-localization" className={linkCls}>
                本地化
              </Link>
              与可靠的
              <Link href="/services/ai-annotation" className={linkCls}>
                AI 训练数据
              </Link>
              不应只属于万亿美元级的大公司。任何在打造值得发布之产品的团队，都应该能以公道的价格、在任何规模上获得这些能力。看看我们为医疗科技、电商、教育科技和 AI 实验室等领域团队
              <Link href="/portfolio" className={linkCls}>
                交付的成果
              </Link>
              。
            </p>
          </div>
          <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${imageBg}`}>
            <Image
              src={unsplash(img.about.office.id, 1600)}
              alt={zhAlt(img.about.office.id)}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover photo-treat"
            />
          </div>
        </div>
      </Section>

      <Section id="founder" className="bg-card border-y border-ink-200/70">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <figure
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden lg:order-1 ${imageBg}`}
          >
            <Image
              src="/gideon.jpeg"
              alt="Gideon Ugochukwu，GlobalAnnotate 创始人兼首席语言专家"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0) 45%, rgba(15,23,42,0.75) 100%)",
              }}
            />
            <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
              <div className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                {founder.name}
              </div>
              <div className="mt-1 text-sm text-white/75">
                GlobalAnnotate {ZH_FOUNDER_ROLE}
              </div>
            </figcaption>
          </figure>
          <div className="lg:order-0">
            <p className="text-sm font-medium uppercase tracking-[0.20em] text-brand-700">
              创始人
            </p>
            <h2 className="section-h2 mt-3 text-ink-900">{founder.name}</h2>
            <p className="mt-2 text-base sm:text-lg font-medium text-ink-700">
              GlobalAnnotate {ZH_FOUNDER_ROLE}
            </p>
            <p className="mt-6 text-ink-700 leading-relaxed">
              Gideon Ugochukwu 是 GlobalAnnotate 的创始人兼首席语言专家。他本身是一名自由语言专家和译员，创办这家机构，是为了让任何规模的团队都能获得高质量的本地化服务和可靠的训练数据。他带领着一支分布在 30+ 个国家和地区的母语专家团队。
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              他的工作涵盖 100+ 种语言的
              <Link href="/services/translation-localization" className={linkCls}>
                翻译与本地化
              </Link>
              、
              <Link href="/services/ai-annotation" className={linkCls}>
                AI 数据标注
              </Link>
              、
              <Link href="/services/digital-marketing" className={linkCls}>
                数字营销
              </Link>
              和
              <Link href="/services/seo" className={linkCls}>
                多语言 SEO
              </Link>
              ，以及
              <Link href="/services/game-localization" className={linkCls}>
                游戏本地化
              </Link>
              ，这就是 GlobalAnnotate 在同一套质量体系下交付的五大服务。在创办公司之前，Gideon 是一名独立译员和语言专家，他一次又一次遇到同一个问题：每个跨境项目都需要三家供应商、三份需求简报和三种质量标准。GlobalAnnotate 的存在，就是为了消除这种摩擦。
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              如今，他和团队与企业服务 SaaS 公司、电商品牌、数字医疗平台、教育科技公司和 AI 实验室合作，帮助它们在每一个关心的市场发布产品和内容。原则很简单：从第一天起由资深项目负责人对接，每种语言都由母语专家完成，每一项交付背后都有成文的质量保证流程。欢迎阅读
              <Link href="/reviews" className={linkCls}>
                客户评价
              </Link>
              ，或
              <Link href="/contact" className={linkCls}>
                启动一个项目
              </Link>
              。
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <span className="badge">我们的价值观</span>
          <h2 className="section-h2 mt-4 text-ink-900">我们如何对待客户，也如何对待彼此。</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <v.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
