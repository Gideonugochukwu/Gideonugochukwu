import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Stars from "@/components/Stars";
import ReviewForm from "@/components/ReviewForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import ReviewAuthor from "@/components/ReviewAuthor";
import PageHero from "@/components/PageHero";
import { reviews } from "@/data/reviews";
import { localizeReview } from "@/data/reviews.zh";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { portfolioHeroSlides } from "@/lib/images";
import { zhSlides } from "@/lib/images.zh";
import { zhLd, ZH_HOME } from "@/lib/zh";

const linkCls =
  "font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline";

// /zh/reviews — Chinese client reviews page.
export default function ReviewsZh() {
  const list = reviews.map((r) => localizeReview(r, "zh"));
  const avg = list.length ? list.reduce((sum, r) => sum + r.rating, 0) / list.length : 0;

  return (
    <>
      <JsonLd
        data={zhLd(
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "客户评价", url: `${site.url}/zh/reviews` },
          ])
        )}
      />
      <PageHero
        eyebrow="客户评价"
        breadcrumbs={[
          { name: ZH_HOME, href: "/" },
          { name: "客户评价", href: "/reviews" },
        ]}
        title="翻译与本地化客户评价：深受全球团队信赖。"
        subtitle="听听客户在与我们合作之后怎么说。"
        slides={zhSlides(portfolioHeroSlides)}
        size="compact"
      />

      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-4 rounded-xl border border-ink-200 bg-white px-5 py-3">
            <div>
              <div className="font-display text-2xl font-semibold leading-none">
                {avg.toFixed(1)}
                <span className="text-ink-400 text-base font-normal"> / 5</span>
              </div>
              <div className="mt-1.5">
                <Stars value={avg} />
              </div>
            </div>
            <div className="h-10 w-px bg-ink-200" />
            <div className="text-sm text-ink-600">
              基于 <span className="font-semibold text-ink-900">{list.length}</span> 条客户评价。
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.04}>
              <article className="card p-6 h-full flex flex-col">
                <Stars value={r.rating} />
                <p className="mt-4 text-ink-800 leading-relaxed flex-1">“{r.quote}”</p>
                <div className="mt-5 pt-4 border-t border-ink-100">
                  <ReviewAuthor review={r} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card border-y border-ink-200/70 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="badge">发表评价</span>
            <h2 className="section-h2 mt-4 text-ink-900">和我们合作过？期待听到您的声音。</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              真实的反馈能帮助未来的客户做出判断。每一条评价在展示前都经过审核。第一次来？欢迎浏览我们的
              <Link href="/services" className={linkCls}>
                服务
              </Link>
              、
              <Link href="/portfolio" className={linkCls}>
                客户案例
              </Link>
              ，或
              <Link href="/about" className={linkCls}>
                认识我们的团队
              </Link>
              。
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                真诚欢迎任何真实反馈，无论好坏。
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                我们从不修改评价，但可能拒绝违反准则的内容。
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                署名方式由您决定：全名、名字缩写、仅显示职位或完全匿名。
              </li>
            </ul>
          </div>

          <ReviewForm />
        </div>
      </Section>
    </>
  );
}

export const ZH_META = {
  title: "客户评价：翻译与本地化服务口碑 | GlobalAnnotate",
  description:
    "看看与 GlobalAnnotate 合作的团队如何评价我们的非洲语言翻译、本地化、多语言 AI 数据标注、多语言 SEO 与数字营销服务。",
  keywords: ["客户评价", "翻译公司评价", "非洲语言翻译", "本地化服务", "GlobalAnnotate 翻译"],
};
