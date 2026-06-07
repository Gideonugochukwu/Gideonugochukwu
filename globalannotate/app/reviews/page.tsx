import type { Metadata } from "next";
import Section from "@/components/Section";
import Stars from "@/components/Stars";
import ReviewForm from "@/components/ReviewForm";
import Reveal from "@/components/Reveal";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Hear from teams who partner with GlobalAnnotate for translation, AI annotation, and digital marketing.",
};

function average(arr: { rating: number }[]) {
  if (!arr.length) return 0;
  return arr.reduce((sum, r) => sum + r.rating, 0) / arr.length;
}

export default function ReviewsPage() {
  const avg = average(reviews);

  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <span className="badge">Client Reviews</span>
          <h1 className="display-hero mt-5 text-4xl md:text-6xl lg:text-7xl">
            Trusted by global teams.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 leading-relaxed">
            What clients say after working with us.
          </p>

          <div className="mt-7 inline-flex items-center gap-4 rounded-xl border border-ink-200 bg-white px-5 py-3">
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
              verified reviews.
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.04}>
              <div className="card p-6 h-full flex flex-col">
                <Stars value={r.rating} />
                <p className="mt-4 text-ink-800 leading-relaxed flex-1">
                  &ldquo;{r.comment}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-ink-100">
                  <div className="font-semibold text-ink-900">{r.name}</div>
                  <div className="text-sm text-ink-500">
                    {r.company} · {r.country}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50/60 border-y border-ink-200/60 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="badge">Leave a review</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
              Worked with us? We&apos;d love to hear from you.
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Honest feedback helps future clients. Every submission is moderated before it appears here.
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
                Your review reaches us by email for moderation first.
              </li>
            </ul>
          </div>

          <ReviewForm />
        </div>
      </Section>
    </>
  );
}
