import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Stars from "@/components/Stars";
import ReviewForm from "@/components/ReviewForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import ReviewAuthor from "@/components/ReviewAuthor";
import { reviews, authorDisplay } from "@/data/reviews";
import { site } from "@/lib/site";
import { breadcrumbSchema, reviewListingSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import { portfolioHeroSlides } from "@/lib/images";

const TITLE = "Client Reviews";
const DESCRIPTION =
  "Hear from teams who partner with GlobalAnnotate for translation, AI annotation, multilingual SEO, and digital marketing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/reviews` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/reviews`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

function average(arr: { rating: number }[]) {
  if (!arr.length) return 0;
  return arr.reduce((sum, r) => sum + r.rating, 0) / arr.length;
}

export default function ReviewsPage() {
  const avg = average(reviews);
  const schemaReviews = reviews.map((r) => ({
    schemaAuthor: authorDisplay(r).schemaAuthor,
    rating: r.rating,
    quote: r.quote,
    date: r.date,
  }));

  return (
    <>
      <JsonLd
        data={[
          reviewListingSchema({ itemName: site.name, reviews: schemaReviews }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Reviews", url: `${site.url}/reviews` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Client Reviews"
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
