import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import { img, imageBg, unsplash } from "@/lib/images";

// Six industries, uniform cards. No "lead tile" — every card shares the
// same aspect ratio, padding, and title size so nothing reads larger or
// gets clipped. Name + line come from the `industries.items` namespace.
const INDUSTRIES = [
  {
    key: "technology",
    image: img.industries.technology,
    href: "/services/translation-localization",
  },
  {
    key: "ecommerce",
    image: img.industries.ecommerce,
    href: "/services/translation-localization",
  },
  {
    key: "healthcare",
    image: img.industries.healthcare,
    href: "/services/translation-localization",
  },
  {
    key: "ai",
    image: img.services.aiAnnotation,
    href: "/services/ai-annotation",
  },
  {
    key: "gaming",
    image: img.industries.gaming,
    href: "/services/game-localization",
  },
  {
    key: "media",
    image: img.industries.media,
    href: "/services/translation-localization",
  },
];

export default function Industries() {
  const t = useTranslations("industries");
  const tc = useTranslations("common");
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            {t("eyebrow")}
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            {t("heading")}
          </h2>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          {t("cta")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Uniform grid: every card shares the same aspect ratio, padding, and
          title size. No lead tile — nothing reads larger than its neighbour. */}
      <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((item, i) => (
          <Reveal key={item.key} delay={(i % 5) * 0.05}>
            <Link
              href={item.href}
              className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl isolate ${imageBg}`}
            >
              <Image
                src={unsplash(item.image.id, 900)}
                alt={t(`items.${item.key}.name`)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
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
                className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
              >
                <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight leading-snug text-white text-balance">
                  {t(`items.${item.key}.name`)}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/85 leading-snug">
                  {t(`items.${item.key}.line`)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300 group-hover:gap-2.5 transition-all">
                  {tc("exploreService")} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
