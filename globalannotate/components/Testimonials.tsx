import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            What clients say
          </p>
          <h2 className="mt-4 display-hero text-4xl md:text-5xl lg:text-6xl text-ink-900">
            Loved by teams shipping
            <br />
            <span className="text-gradient">across borders.</span>
          </h2>
        </div>
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          Read all reviews <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-3">
        {featured.map((t, i) => (
          <Reveal key={`${t.name}-${i}`} delay={i * 0.06}>
            <figure className="flex flex-col h-full">
              <span
                aria-hidden
                className="font-display text-7xl md:text-8xl leading-none text-brand-200/80 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-6 font-display text-xl md:text-2xl leading-snug tracking-tight text-ink-900">
                {t.quote}
              </blockquote>
              <div className="mt-6 flex-1" />
              <Stars value={t.rating} />
              <figcaption className="mt-4">
                <ReviewAuthor review={t} />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
