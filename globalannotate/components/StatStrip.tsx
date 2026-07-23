import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

// Stat values are locale-formatted per convention (Part 7): English uses the
// compact "2M+"; German writes "2 Mio.+" and puts a space before the percent
// sign ("98 %"); Chinese uses the native myriad "200万+". Only value/suffix
// differ — the labels come from the `stats` message namespace.
type Stat = { value: number; suffix: string; key: string };

const STATS: Record<string, Stat[]> = {
  en: [
    { value: 100, suffix: "+", key: "languages" },
    { value: 2, suffix: "M+", key: "dataPoints" },
    { value: 30, suffix: "+", key: "countries" },
    { value: 98, suffix: "%", key: "satisfaction" },
  ],
  de: [
    { value: 100, suffix: "+", key: "languages" },
    { value: 2, suffix: " Mio.+", key: "dataPoints" },
    { value: 30, suffix: "+", key: "countries" },
    { value: 98, suffix: " %", key: "satisfaction" },
  ],
  zh: [
    { value: 100, suffix: "+", key: "languages" },
    { value: 200, suffix: "万+", key: "dataPoints" },
    { value: 30, suffix: "+", key: "countries" },
    { value: 98, suffix: "%", key: "satisfaction" },
  ],
};

export default function StatStrip() {
  const t = useTranslations("stats");
  const locale = useLocale();
  const stats = STATS[locale] ?? STATS.en;
  return (
    <div className="container-wide">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
        {stats.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.05}>
            <div className="flex flex-col">
              <div className="display-num text-3xl sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-ink-500 tracking-wide">
                {t(s.key)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
