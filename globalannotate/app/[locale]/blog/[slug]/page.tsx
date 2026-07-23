import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { posts, getPost, allSlugs } from "@/data/blog";
import { relatedCasesForService } from "@/data/portfolio";
import { imageBg, unsplash } from "@/lib/images";
import { site } from "@/lib/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { hreflangAlternates } from "@/lib/i18n-meta";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// Maps a blog post's tag set to the primary /services/[slug] it talks about.
// Used to add a "Related services and case studies" block at the bottom of
// each article that links into the rest of the site.
const TAG_TO_SERVICE: Record<string, { slug: string; label: string }> = {
  // "Games" comes first because the primary-service lookup walks the post's
  // tag array in order — a game-localization post tagged ["Games",
  // "Localization", ...] should resolve to the game service, not the
  // general translation one.
  Games: {
    slug: "game-localization",
    label: "Game Localization & Translation",
  },
  Annotation: { slug: "ai-annotation", label: "AI Annotation & Data Labeling" },
  AI: { slug: "ai-annotation", label: "AI Annotation & Data Labeling" },
  Localization: {
    slug: "translation-localization",
    label: "Translation & Localization",
  },
  i18n: {
    slug: "translation-localization",
    label: "Translation & Localization",
  },
  SEO: { slug: "seo", label: "SEO & Search Visibility" },
  International: { slug: "seo", label: "SEO & Search Visibility" },
};

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  const url = `${site.url}/blog/${post.slug}`;
  const image = unsplash(post.heroImage.id, 1600);
  return {
    title: post.title,
    description: post.description,
    alternates: hreflangAlternates(locale, `/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: image, alt: post.heroImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

const DATE_LOCALE: Record<string, string> = { en: "en-US", de: "de-DE", zh: "zh-CN" };

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[locale] ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const heroSrc = unsplash(post.heroImage.id, 2000);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Pick the primary service this post discusses by walking its tags.
  const primaryService = post.tags
    .map((t) => TAG_TO_SERVICE[t])
    .find((s): s is { slug: string; label: string } => Boolean(s));
  const relatedCases = primaryService
    ? relatedCasesForService(primaryService.slug, 2)
    : [];

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            url,
            datePublished: post.date,
            image: heroSrc,
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Blog", url: `${site.url}/blog` },
            { name: post.title, url },
          ]),
        ]}
      />

      <Section className="pt-12">
        <div className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            <ArrowLeft className="h-4 w-4" /> {t("allArticles")}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} {t("minRead")}</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="ml-1 inline-flex items-center rounded-full border border-ink-200 bg-white px-2 py-0.5 text-[11px] text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="page-h1-long mt-5 text-ink-900">{post.title}</h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            {post.description}
          </p>

          {/* Author byline — links to the founder section on /about so the
              attribution flows into the Person SEO graph for Gideon. */}
          <p className="mt-6 text-sm text-ink-600">
            {t("by")}{" "}
            <Link
              href="/about#founder"
              className="font-semibold text-ink-900 hover:text-brand-700 transition"
              rel="author"
            >
              Gideon Ugochukwu
            </Link>
            , {t("authorRole")}
          </p>
        </div>

        <figure
          className={`relative mt-10 aspect-[16/9] rounded-2xl overflow-hidden ${imageBg}`}
        >
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

        {primaryService && (
          <aside className="max-w-3xl mt-12 pt-8 border-t border-ink-200/70">
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Related services and work
            </p>
            <h2 className="section-h3 mt-3 text-ink-900">
              Need this done? Here&apos;s where to look next.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              This article connects to our{" "}
              <Link
                href={`/services/${primaryService.slug}`}
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                {primaryService.label}
              </Link>{" "}
              service. See live results in our{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                portfolio
              </Link>
              , or{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                talk to an expert
              </Link>{" "}
              about your project.
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
                          Case study
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
              More from the blog —{" "}
              <Link
                href="/blog"
                className="font-semibold text-ink-900 hover:text-brand-700 inline-flex items-center gap-1"
              >
                see all articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </aside>
        )}
      </Section>

      {related.length > 0 && (
        <Section className="bg-card border-y border-ink-200/70">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {t("keepReading")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card group p-6 flex flex-col"
              >
                <div className="text-xs text-ink-500">
                  <time dateTime={p.date}>{formatDate(p.date, locale)}</time> · {p.readMinutes} {t("minRead")}
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                  {t("readArticle")} <ArrowUpRight className="h-4 w-4" />
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
