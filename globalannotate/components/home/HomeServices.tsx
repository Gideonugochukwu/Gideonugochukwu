import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "../Reveal";
import { services } from "@/lib/site";

// Homepage services as a typographic editorial index (01–05) — no photography.
// Each service is a full-width row on a strict grid: a large faded index
// numeral, the service name in Fraunces, a one-line value proposition, and an
// arrow that steps out on hover. Hairline rules divide the rows. This replaces
// the previous photo-card grid; the card presentation still lives on /services.
export default function HomeServices() {
  const t = useTranslations("homeServices");
  const ts = useTranslations("services");
  const tc = useTranslations("common");
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            {t("eyebrow")}
          </p>
          <h2 className="statement mt-5 text-ink-900">
            {t("heading1")}
            <br />
            {t("heading2")}
          </h2>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          {tc("seeAllServices")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-14 sm:mt-20 border-t border-ink-200">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <li>
              <Link
                href={`/services/${s.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 sm:gap-x-10 border-b border-ink-200 py-7 sm:py-9 transition-colors"
              >
                <span className="index-num text-2xl sm:text-4xl text-ink-300 transition-colors group-hover:text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="section-h2 text-ink-900 transition-colors group-hover:text-brand-700">
                    {ts(`${s.slug}.title`)}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base sm:text-lg text-ink-600 leading-relaxed">
                    {ts(`${s.slug}.summary`)}
                  </p>
                </div>
                <ArrowUpRight
                  className="h-6 w-6 shrink-0 self-center text-ink-300 transition-all group-hover:text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
