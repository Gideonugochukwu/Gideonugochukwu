import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { localizedPosts, type LocalizedPost } from "@/data/blog";
import { relatedCasesForService, localizeCase } from "@/data/portfolio";
import { imageBg, unsplash } from "@/lib/images";
import { site } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { DE_FOUNDER_ROLE } from "@/lib/schema.de";
import { deLd, DE_HOME } from "@/lib/de";
import { formatDeDate } from "@/lib/de-date";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// English routing tag → the /services page the article belongs to, with the
// German service name. Order matters (first match wins), as on the EN page.
const TAG_TO_SERVICE: Record<string, { slug: string; label: string }> = {
  MarketReady: { slug: "marketready", label: "MarketReady™ kulturelle Validierung" },
  Games: { slug: "game-localization", label: "Spielelokalisierung und Übersetzung" },
  Annotation: { slug: "ai-annotation", label: "KI-Datenannotation" },
  AI: { slug: "ai-annotation", label: "KI-Datenannotation" },
  Localization: { slug: "translation-localization", label: "Übersetzung und Lokalisierung" },
  i18n: { slug: "translation-localization", label: "Übersetzung und Lokalisierung" },
  SEO: { slug: "seo", label: "Suchmaschinenoptimierung und Sichtbarkeit" },
  International: { slug: "seo", label: "Suchmaschinenoptimierung und Sichtbarkeit" },
};

// /de/blog/[slug] — the full German article.
export default function BlogPostDe({ post }: { post: LocalizedPost }) {
  const url = `${site.url}/de/blog/${post.slug}`;
  const heroSrc = unsplash(post.heroImage.id, 2000);
  const related = localizedPosts("de")
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  const primaryService = post.tags
    .map((t) => TAG_TO_SERVICE[t])
    .find((s): s is { slug: string; label: string } => Boolean(s));
  const relatedCases = primaryService
    ? relatedCasesForService(primaryService.slug, 2).map((c) => localizeCase(c, "de"))
    : [];
  const article = articleSchema({
    title: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    image: heroSrc,
  });

  return (
    <>
      <JsonLd
        data={deLd([
          { ...article, author: { ...article.author, jobTitle: DE_FOUNDER_ROLE } },
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Fachbeiträge", url: `${site.url}/de/blog` },
            { name: post.title, url },
          ]),
          ...(post.faq && post.faq.length > 0 ? [faqSchema(post.faq)] : []),
        ])}
      />

      <Section className="pt-12">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: DE_HOME, href: "/" },
              { name: "Fachbeiträge", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
            tone="light"
            className="mb-6"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            <ArrowLeft className="h-4 w-4" /> Alle Beiträge
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <time dateTime={post.date}>{formatDeDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} Min. Lesezeit</span>
            {post.displayTags.map((tag) => (
              <span
                key={tag}
                className="ml-1 inline-flex items-center rounded-full border border-ink-200 bg-white px-2 py-0.5 text-[11px] text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="page-h1-long mt-5 text-ink-900">{post.title}</h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">{post.description}</p>

          <p className="mt-6 text-sm text-ink-600">
            Von{" "}
            <Link
              href="/about#founder"
              className="font-semibold text-ink-900 hover:text-brand-700 transition"
              rel="author"
            >
              Gideon Ugochukwu
            </Link>
            , {DE_FOUNDER_ROLE} bei GlobalAnnotate
          </p>
        </div>

        <figure className={`relative mt-10 aspect-[16/9] rounded-2xl overflow-hidden ${imageBg}`}>
          <Image
            src={heroSrc}
            alt={post.heroImage.alt}
            fill
            priority
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-cover photo-treat"
          />
        </figure>

        <article className="prose-section max-w-3xl">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>

        {post.faq && post.faq.length > 0 && (
          <section className="prose-section max-w-3xl">
            <h2>Häufige Fragen</h2>
            {post.faq.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>
        )}

        {post.slug !== "marketready-cultural-validation" && (
          <div className="max-w-3xl mt-12 rounded-lg border-l-4 border-brand-500 bg-brand-50/40 p-6">
            <h2 className="section-h3 text-ink-900">Stellen Sie vor der Markteinführung sicher, dass Ihre Inhalte wirken</h2>
            <p className="mt-2 text-ink-700 leading-relaxed">
              Jedes GlobalAnnotate-Projekt umfasst die MarketReady™ kulturelle Validierung: Prüfung vor der Markteinführung durch echte Muttersprachler in Ihrem Zielmarkt. Sie erhalten einen unterzeichneten Bericht, der bestätigt, dass Ihre Inhalte nicht nur sprachlich korrekt, sondern marktreif sind.
            </p>
            <Link
              href="/services/marketready"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
            >
              Mehr über MarketReady™ erfahren <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {primaryService && (
          <aside className="max-w-3xl mt-12 pt-8 border-t border-ink-200/70">
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Passende Leistungen und Referenzen
            </p>
            <h2 className="section-h3 mt-3 text-ink-900">Sie möchten das umsetzen lassen? Hier geht es weiter.</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Dieser Beitrag gehört zu unserer Leistung{" "}
              <Link
                href={`/services/${primaryService.slug}`}
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                {primaryService.label}
              </Link>
              . Ergebnisse aus der Praxis finden Sie in unseren{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                Referenzen
              </Link>
              {" "}– oder Sie{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                sprechen mit einer Expertin oder einem Experten
              </Link>
              {" "}über Ihr Projekt.
            </p>

            {relatedCases.length > 0 && (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedCases.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/portfolio/${c.slug}`}
                      className="group flex items-start justify-between gap-3 rounded-xl border border-ink-200/70 bg-white p-4 hover:border-brand-300 transition"
                    >
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wide text-brand-700">
                          Referenz
                        </span>
                        <span className="mt-1.5 block text-sm font-semibold text-ink-900 group-hover:text-brand-700 transition">
                          {c.title}
                        </span>
                      </span>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-400 group-hover:text-brand-700 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-6 text-sm text-ink-600">
              Mehr aus unseren Fachbeiträgen:{" "}
              <Link
                href="/blog"
                className="font-semibold text-ink-900 hover:text-brand-700 inline-flex items-center gap-1"
              >
                alle Beiträge ansehen <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </aside>
        )}
      </Section>

      {related.length > 0 && (
        <Section className="bg-card border-y border-ink-200/70">
          <h2 className="section-h2 text-ink-900">Weiterlesen</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card group p-6 flex flex-col">
                <div className="text-xs text-ink-500">
                  <time dateTime={p.date}>{formatDeDate(p.date)}</time> · {p.readMinutes} Min. Lesezeit
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                  Beitrag lesen <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
