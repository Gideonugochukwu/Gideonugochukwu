import { BadgeCheck, Database, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "../Reveal";

// A restrained proof strip: three quality safeguards the site already commits
// to elsewhere (native-speaker review, calibrated AI data, one-business-day
// reply). No client logos or certification badges are asserted here — every
// line restates a promise made in the site's own FAQ, so nothing is implied
// that isn't already true. Styled to match HomeMethod's promise rows: a small
// emerald icon disc, a tight title, and a calm supporting line — no cards.
const ITEMS = [
  { icon: BadgeCheck, titleKey: "nativeTitle", bodyKey: "nativeBody" },
  { icon: Database, titleKey: "aiTitle", bodyKey: "aiBody" },
  { icon: Clock, titleKey: "replyTitle", bodyKey: "replyBody" },
] as const;

export default function HomeTrust() {
  const t = useTranslations("trust");
  return (
    <div className="container-wide">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
        {t("eyebrow")}
      </p>
      <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.titleKey} delay={i * 0.05}>
            <li className="border-t border-ink-200 pt-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <item.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-ink-900">
                {t(item.titleKey)}
              </h3>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                {t(item.bodyKey)}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
