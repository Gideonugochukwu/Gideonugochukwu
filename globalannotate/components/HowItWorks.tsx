import { Compass, FileCheck2, Rocket, Workflow } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: Compass,
    title: "Discovery call",
    body: "We learn your goals, audience, and constraints.",
  },
  {
    icon: Workflow,
    title: "Tailored proposal",
    body: "Clear scope, timeline, and pricing within 24–48 hours.",
  },
  {
    icon: FileCheck2,
    title: "Production & QA",
    body: "Specialists execute. Our quality team reviews every deliverable.",
  },
  {
    icon: Rocket,
    title: "Delivery & growth",
    body: "Polished output, with iteration as you scale.",
  },
];

export default function HowItWorks() {
  return (
    <div className="container-wide">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          How it works
        </p>
        <h2 className="section-h2 mt-4 text-ink-900">
          From first message
          <br />
          to final delivery.
        </h2>
        <p className="mt-5 text-lg text-ink-600 leading-relaxed">
          A simple, transparent process built for global teams that need quality, speed, and accountability.
        </p>
      </div>

      <div className="relative mt-16">
        <div
          aria-hidden
          className="hidden lg:block absolute left-0 right-0 top-7 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.10) 12%, rgba(15,23,42,0.10) 88%, transparent 100%)",
          }}
        />
        <div className="relative grid gap-12 md:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="display-num text-4xl" aria-hidden>
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-ink-200" aria-hidden />
                  <s.icon className="h-5 w-5 text-brand-600" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
