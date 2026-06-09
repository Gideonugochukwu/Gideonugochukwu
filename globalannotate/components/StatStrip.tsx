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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="flex flex-col">
              <div className="display-num text-5xl md:text-6xl lg:text-7xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm md:text-base text-ink-500 tracking-wide">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
