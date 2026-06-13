import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { img, imageBg, unsplash } from "@/lib/images";

// Trimmed to the five strongest industries — the ones that show up most in
// real briefs. Less noise, more confidence. Cleaner asymmetric layout: one
// tall lead tile + four square companions.
const INDUSTRIES = [
  {
    key: "technology",
    name: "Technology & SaaS",
    line: "Ship products and docs in every market — without slowing engineering.",
    image: img.industries.technology,
    href: "/services/translation-localization",
  },
  {
    key: "ecommerce",
    name: "E-Commerce",
    line: "Localized product, ad, and checkout journeys that convert.",
    image: img.industries.ecommerce,
    href: "/services/translation-localization",
  },
  {
    key: "healthcare",
    name: "Healthcare & Life Sciences",
    line: "Certified, audit-ready translation and patient-safe content.",
    image: img.industries.healthcare,
    href: "/services/translation-localization",
  },
  {
    key: "ai",
    name: "AI & Machine Learning",
    line: "Production-grade training data your models can trust.",
    image: img.services.aiAnnotation,
    href: "/services/ai-annotation",
  },
  {
    key: "media",
    name: "Media & Entertainment",
    line: "Subtitling, dubbing, and metadata at streaming scale.",
    image: img.industries.media,
    href: "/services/translation-localization",
  },
];

export default function Industries() {
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            Industries we serve
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Built for global teams in every industry.
          </h2>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          Don&apos;t see yours? Talk to us <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Asymmetric grid: lead tile is 2x tall on desktop, the other four
          stack as a 2x2 alongside it. On mobile everything is one column. */}
      <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:[grid-auto-flow:dense]">
        {INDUSTRIES.map((item, i) => {
          const isLead = i === 0;
          return (
            <Reveal key={item.key} delay={(i % 5) * 0.05}>
              <Link
                href={item.href}
                className={`group relative block overflow-hidden rounded-2xl isolate ${imageBg} ${
                  isLead
                    ? "lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto lg:h-full"
                    : "aspect-[4/5] sm:aspect-square lg:aspect-square"
                }`}
              >
                <Image
                  src={unsplash(item.image.id, isLead ? 1400 : 900)}
                  alt={item.image.alt}
                  fill
                  sizes={
                    isLead
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  }
                  className="object-cover photo-treat transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.40) 45%, rgba(15,23,42,0.92) 88%, rgba(2,6,23,0.98) 100%)",
                  }}
                />
                <div
                  className={`absolute inset-0 ${isLead ? "p-7 md:p-9" : "p-5"} flex flex-col justify-end text-white`}
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
                >
                  <h3
                    className={`font-display font-semibold tracking-tight leading-tight text-white ${
                      isLead ? "text-3xl md:text-4xl lg:text-5xl" : "text-lg md:text-xl"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`mt-2 text-white/85 leading-snug ${isLead ? "text-base md:text-lg max-w-md" : "text-sm"}`}
                  >
                    {item.line}
                  </p>
                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 font-semibold text-brand-300 group-hover:gap-2.5 transition-all ${
                      isLead ? "text-sm" : "text-xs"
                    }`}
                  >
                    Explore <ArrowUpRight className={isLead ? "h-4 w-4" : "h-3.5 w-3.5"} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
