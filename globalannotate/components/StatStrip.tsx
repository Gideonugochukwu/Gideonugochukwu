import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

// Values stay locale-neutral (100+, 2M+, 30+, 98%); only the labels are
// translated. `key` maps into the `stats` message namespace.
const stats = [
  { value: 100, suffix: "+", key: "languages" },
  { value: 2, suffix: "M+", key: "dataPoints" },
  { value: 30, suffix: "+", key: "countries" },
  { value: 98, suffix: "%", key: "satisfaction" },
];

export default function StatStrip() {
  const t = useTranslations("stats");
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
