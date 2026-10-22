import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Stars from "@/components/Stars";
import ReviewForm from "@/components/ReviewForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import ReviewAuthor from "@/components/ReviewAuthor";
import { reviews } from "@/data/reviews";
import { site } from "@/lib/site";
import { ogImages, OG_IMAGE_URL, withHreflang } from "@/lib/i18n-meta";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import { portfolioHeroSlides } from "@/lib/images";
import { setRequestLocale } from "next-intl/server";
import ReviewsZh, { ZH_META } from "@/components/zh/ReviewsZh";
import ReviewsDe, { DE_META } from "@/components/de/ReviewsDe";
import { deMetadata } from "@/lib/de";
import { zhMetadata } from "@/lib/zh";

const TITLE = "Client Reviews";
const DESCRIPTION =
  "Hear from teams who partner with GlobalAnnotate for translation, AI annotation, multilingual SEO, and digital marketing.";

const EN_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/reviews` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/reviews`,
    type: "website",
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") return zhMetadata({ path: "/reviews", ...ZH_META });
  if (locale === "de") return deMetadata({ path: "/reviews", ...DE_META });
  return withHreflang(EN_METADATA, "/reviews");
}

function average(arr: { rating: number }[]) {
  if (!arr.length) return 0;
  return arr.reduce((sum, r) => sum + r.rating, 0) / arr.length;
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "zh") return <ReviewsZh />;
  if (locale === "de") return <ReviewsDe />;
  const avg = average(reviews);

  return (
    <>
      {/* Review/AggregateRating structured data was intentionally removed:
          Google doesn't surface self-serving reviews of an organization on
          its own site, and the previous markup nested an illegal
          `itemReviewed` field. The reviews remain visible on the page below. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Reviews", url: `${site.url}/reviews` },
        ])}
      />
      <PageHero
        eyebrow="Client Reviews"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Reviews", href: "/reviews" },
        ]}
        title="Trusted by global teams."
        subtitle="What clients say after working with us."
        slides={portfolioHeroSlides}
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
              Based on{" "}
              <span className="font-semibold text-ink-900">{reviews.length}</span>{" "}
              client reviews.
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.04}>
              <article className="card p-6 h-full flex flex-col">
                <Stars value={r.rating} />
                <p className="mt-4 text-ink-800 leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
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
            <span className="badge">Leave a review</span>
            <h2 className="section-h2 mt-4 text-ink-900">
              Worked with us? We&apos;d love to hear from you.
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Honest feedback helps future clients. Every submission is moderated before it appears here. New here? Browse our{" "}
              <Link
                href="/services"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                services
              </Link>
              ,{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                case studies
              </Link>
              , or{" "}
              <Link
                href="/about"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                meet the team
              </Link>
              .
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                Honest feedback is genuinely welcome — good or bad.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                We never edit reviews. We may decline ones that violate guidelines.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                You choose how your name appears — full name, initial, role only, or fully anonymous.
              </li>
            </ul>
          </div>

          <ReviewForm />
        </div>
      </Section>
    </>
  );
}
