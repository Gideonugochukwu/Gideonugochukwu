import { Quote } from "lucide-react";
import Stars from "./Stars";
import Reveal from "./Reveal";

const featured = [
  {
    name: "Amara Okafor",
    role: "Head of Localization, Beam Health",
    country: "Nigeria → Global",
    rating: 5,
    body: "Localized our patient app into 14 languages in under three weeks. Cultural nuance was spot on.",
  },
  {
    name: "Daniel Park",
    role: "ML Lead, Northwind AI",
    country: "South Korea",
    rating: 5,
    body: "Cleanest data, fastest turnaround. Their QA reports are best-in-class.",
  },
  {
    name: "Sophie Martin",
    role: "Founder, Maison Verte",
    country: "France",
    rating: 5,
    body: "Quadrupled our ROAS in the first quarter. Transparent reporting. Real growth.",
  },
];

export default function Testimonials() {
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
          <Reveal key={t.name} delay={i * 0.06}>
            <div className="card p-7 h-full flex flex-col bg-white">
              <Quote className="h-7 w-7 text-brand-300" aria-hidden />
              <p className="mt-4 text-ink-800 leading-relaxed text-lg">
                &ldquo;{t.body}&rdquo;
              </p>
              <div className="mt-6">
                <Stars value={t.rating} />
                <div className="mt-3">
                  <div className="font-semibold text-ink-900">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.role}</div>
                  <div className="text-xs text-ink-400 mt-0.5">{t.country}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
