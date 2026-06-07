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
        <span className="badge">How it works</span>
        <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
          From first message to final delivery.
        </h2>
        <p className="mt-5 text-ink-600 leading-relaxed">
          A simple, transparent process built for global teams that need quality, speed, and accountability.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="relative card p-6 h-full">
              <div className="absolute -top-3 left-6 inline-flex h-7 px-2.5 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-semibold">
                Step {i + 1}
              </div>
              <s.icon className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
