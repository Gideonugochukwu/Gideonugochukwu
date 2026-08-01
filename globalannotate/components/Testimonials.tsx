import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  const t = useTranslations("testimonials");
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            {t("eyebrow")}
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            {t("heading1")}
            <br />
            {t("heading2")}
          </h2>
        </div>
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          {t("readAll")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Featured pull-quote — the strongest review, set large and editorial. */}
      {featured[0] && (
        <Reveal>
          <figure className="mt-16 sm:mt-20 border-t border-ink-200 pt-10 sm:pt-14">
            <blockquote className="statement max-w-4xl text-ink-900">
              <span className="text-brand-500">“</span>
              {featured[0].quote}
              <span className="text-brand-500">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Stars value={featured[0].rating} />
              <ReviewAuthor review={featured[0]} />
            </figcaption>
          </figure>
        </Reveal>
      )}

      {/* Two supporting quotes. */}
      <div className="mt-16 grid gap-x-16 gap-y-14 border-t border-ink-200 pt-12 md:grid-cols-2">
        {featured.slice(1, 3).map((t, i) => (
          <Reveal key={`${t.name}-${i}`} delay={i * 0.06}>
            <figure className="flex flex-col h-full">
              <blockquote className="font-display text-xl md:text-2xl leading-snug tracking-tight text-ink-900">
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
