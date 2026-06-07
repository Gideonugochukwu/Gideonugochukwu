import Reveal from "./Reveal";

const stats = [
  { value: "100+", label: "Languages supported" },
  { value: "2M+", label: "Data points annotated" },
  { value: "30+", label: "Countries served" },
  { value: "98%", label: "Client satisfaction" },
];

export default function StatStrip() {
  return (
    <div className="container-wide">
      <div className="rounded-2xl border border-ink-200 bg-white grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink-100 overflow-hidden">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="p-7 text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink-900">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-ink-500">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
