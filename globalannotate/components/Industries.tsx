import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

// Industries as a typographic two-column list — no photography. Each industry
// is a name in Fraunces with a one-line descriptor, separated by hairline
// rules. Restraint over imagery: the type and whitespace carry it.
const INDUSTRIES = [
  { key: "technology", href: "/services/translation-localization" },
  { key: "ecommerce", href: "/services/translation-localization" },
  { key: "healthcare", href: "/services/translation-localization" },
  { key: "ai", href: "/services/ai-annotation" },
  { key: "gaming", href: "/services/game-localization" },
  { key: "media", href: "/services/translation-localization" },
];

export default function Industries() {
  const t = useTranslations("industries");
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            {t("eyebrow")}
          </p>
          <h2 className="statement mt-5 text-ink-900">{t("heading")}</h2>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          {t("cta")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-14 sm:mt-20 grid sm:grid-cols-2 sm:gap-x-16 border-t border-ink-200">
        {INDUSTRIES.map((item, i) => (
          <Reveal key={item.key} delay={(i % 3) * 0.06}>
            <li>
              <Link
                href={item.href}
                className="group flex items-baseline justify-between gap-6 border-b border-ink-200 py-6 sm:py-7"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink-900 transition-colors group-hover:text-brand-700">
                    {t(`items.${item.key}.name`)}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-ink-600 leading-relaxed">
                    {t(`items.${item.key}.line`)}
                  </p>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 translate-y-1 text-ink-300 transition-all group-hover:text-brand-600 group-hover:translate-x-0.5"
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
