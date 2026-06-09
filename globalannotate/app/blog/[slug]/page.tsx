import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { posts, getPost, allSlugs } from "@/data/blog";
import { imageBg, unsplash } from "@/lib/images";
import { site } from "@/lib/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  const url = `${site.url}/blog/${post.slug}`;
  const image = unsplash(post.heroImage.id, 1600);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const heroSrc = unsplash(post.heroImage.id, 2000);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            url,
            datePublished: post.date,
            authorName: post.author,
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
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="ml-1 inline-flex items-center rounded-full border border-ink-200 bg-white px-2 py-0.5 text-[11px] text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="display-hero mt-5 text-4xl md:text-6xl">{post.title}</h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            {post.description}
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
            className="object-cover"
          />
        </figure>

        <article className="prose-section max-w-3xl">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="bg-ink-50/60 border-y border-ink-200/60">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card group p-6 flex flex-col"
              >
                <div className="text-xs text-ink-500">
                  <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readMinutes} min read
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                  Read article <ArrowUpRight className="h-4 w-4" />
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
