import { Compass, FileCheck2, Rocket, Workflow } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: Compass,
    title: "Discovery call",
    body: "We learn your goals, audience, formats and constraints — then map the right service mix.",
  },
  {
    icon: Workflow,
    title: "Tailored proposal",
    body: "You receive a clear scope, timeline, and transparent pricing within 24–48 hours.",
  },
  {
    icon: FileCheck2,
    title: "Production & QA",
    body: "Specialists execute while our quality team reviews every deliverable for accuracy.",
  },
  {
    icon: Rocket,
    title: "Delivery & growth",
    body: "We hand off polished output and iterate with you as your needs evolve.",
  },
];

export default function HowItWorks() {
  return (
    <div className="container-wide">
      <div className="max-w-2xl">
        <span className="badge">How it works</span>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          A simple, transparent process — from first message to final delivery.
        </h2>
        <p className="mt-4 text-ink-600 leading-relaxed">
          We&apos;ve refined a workflow built for global teams who need
          quality, speed, and accountability — without the agency overhead.
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
