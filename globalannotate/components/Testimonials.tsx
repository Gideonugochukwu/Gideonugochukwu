import { Quote } from "lucide-react";
import Stars from "./Stars";
import Reveal from "./Reveal";
import ReviewAuthor from "./ReviewAuthor";
import { reviews } from "@/data/reviews";

// Picks three reviews for the homepage: highest-rated first, then verified
// reviews. Keeps the homepage and /reviews page driven by the same source
// so they can never drift apart.
function featuredReviews() {
  return [...reviews]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (Number(b.verified) !== Number(a.verified)) {
        return Number(b.verified) - Number(a.verified);
      }
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 3);
}

export default function Testimonials() {
  const featured = featuredReviews();
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div className="max-w-xl">
          <span className="badge">What clients say</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Loved by teams shipping across borders.
          </h2>
        </div>
        <a
          href="/reviews"
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          Read all reviews →
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featured.map((t, i) => (
          <Reveal key={`${t.name}-${i}`} delay={i * 0.06}>
            <article className="card p-7 h-full flex flex-col bg-white">
              <Quote className="h-7 w-7 text-brand-300" aria-hidden />
              <p className="mt-4 text-ink-800 leading-relaxed text-lg flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6">
                <Stars value={t.rating} />
                <div className="mt-3">
                  <ReviewAuthor review={t} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
