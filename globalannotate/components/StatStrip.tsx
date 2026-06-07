import Reveal from "./Reveal";
import CountUp from "./CountUp";

const stats = [
  { value: 100, suffix: "+", label: "Languages supported" },
  { value: 2, suffix: "M+", label: "Data points annotated" },
  { value: 30, suffix: "+", label: "Countries served" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

export default function StatStrip() {
  return (
    <div className="container-wide">
      <div className="rounded-3xl border border-ink-200 bg-white grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink-100 overflow-hidden shadow-[0_8px_40px_-20px_rgba(15,23,42,0.18)]">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="p-8 text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink-900">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-ink-500">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
