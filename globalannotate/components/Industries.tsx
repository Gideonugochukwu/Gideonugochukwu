import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { img, unsplash } from "@/lib/images";

const INDUSTRIES = [
  {
    key: "ecommerce",
    name: "E-Commerce",
    line: "Localized product, ad, and checkout journeys that convert.",
    image: img.industries.ecommerce,
    href: "/services/translation-localization",
  },
  {
    key: "technology",
    name: "Technology & SaaS",
    line: "Ship products and docs in every market — without slowing engineering.",
    image: img.industries.technology,
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
    key: "gaming",
    name: "Gaming",
    line: "In-game text, voice-over, and culturally tuned launches.",
    image: img.industries.gaming,
    href: "/services/translation-localization",
  },
  {
    key: "finance",
    name: "Finance & Fintech",
    line: "Regulated content localized with compliance built in.",
    image: img.industries.finance,
    href: "/services/translation-localization",
  },
  {
    key: "travel",
    name: "Travel & Hospitality",
    line: "Brand voice that resonates with every traveller, in every market.",
    image: img.industries.travel,
    href: "/services/digital-marketing",
  },
  {
    key: "media",
    name: "Media & Entertainment",
    line: "Subtitling, dubbing, and metadata at streaming scale.",
    image: img.industries.media,
    href: "/services/translation-localization",
  },
  {
    key: "ai",
    name: "AI & Machine Learning",
    line: "Production-grade training data your models can trust.",
    image: img.services.aiAnnotation,
    href: "/services/ai-annotation",
  },
];

export default function Industries() {
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div className="max-w-xl">
          <span className="badge">Industries we serve</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Built for global teams in every industry.
          </h2>
        </div>
        <Link
          href="/contact"
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          Don&apos;t see yours? Talk to us →
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INDUSTRIES.map((item, i) => (
          <Reveal key={item.key} delay={(i % 4) * 0.05}>
            <Link
              href={item.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-900 isolate"
            >
              <Image
                src={unsplash(item.image.id, 800)}
                alt={item.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.55) 40%, rgba(15,23,42,0.92) 80%, rgba(2,6,23,0.98) 100%)",
                }}
              />
              <div
                className="absolute inset-0 p-5 flex flex-col justify-end text-white"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
              >
                <h3 className="font-display text-xl font-semibold tracking-tight leading-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm text-white/90 leading-snug">
                  {item.line}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300 group-hover:gap-2.5 transition-all">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
