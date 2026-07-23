import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "../Reveal";
import { services } from "@/lib/site";
import { img, imageBg, unsplash } from "@/lib/images";

// Homepage-only editorial presentation of the services. Large feature
// blocks with strong type, a tall image, and generous whitespace. The
// original card-style ServiceCard is still used on /services.

const SERVICE_IMAGES = {
  "translation-localization": img.services.translation,
  "ai-annotation": img.services.aiAnnotation,
  "digital-marketing": img.services.digitalMarketing,
  seo: img.services.seo,
  "game-localization": img.services.gameLocalization,
} as const;

export default function HomeServices() {
  const t = useTranslations("homeServices");
  const ts = useTranslations("services");
  const tc = useTranslations("common");
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            {t("eyebrow")}
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            {t("heading1")}
            <br />
            {t("heading2")}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-ink-600 leading-relaxed">
            {t("subhead")}
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          {tc("seeAllServices")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Uniform 2x2 grid — no vertical offset, moderate card height,
          consistent title size that matches the industries cards. */}
      <div className="mt-16 sm:mt-20 grid gap-6 sm:gap-8 sm:grid-cols-2">
        {services.map((s, i) => {
          const image = SERVICE_IMAGES[s.slug as keyof typeof SERVICE_IMAGES];
          return (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link href={`/services/${s.slug}`} className="group block">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${imageBg}`}>
                  <Image
                    src={unsplash(image.id, 1000)}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                    className="object-cover photo-treat transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(2,6,23,0.05) 0%, rgba(2,6,23,0.30) 55%, rgba(2,6,23,0.85) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                      {ts(`${s.slug}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-md">
                      {ts(`${s.slug}.summary`)}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
