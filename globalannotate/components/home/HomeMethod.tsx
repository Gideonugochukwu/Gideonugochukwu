import {
  ShieldCheck,
  Globe2,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  Rocket,
  Workflow,
} from "lucide-react";
import Reveal from "../Reveal";

// One unified "how we work" section. Replaces the previous separate
// "Why choose us" and "How it works" components — both repeated the same
// promise (quality + speed + global + senior) at different volumes.
//
// Layout: an editorial left column with the headline and four short
// promises (icon + title + body), and a right column with the four-step
// process running down a thin vertical rail. No card boxes anywhere.

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "Quality you can audit",
    body: "Every project ships with a QA report and revision window.",
  },
  {
    icon: Globe2,
    title: "Truly global coverage",
    body: "Native specialists across 100+ languages and 30+ markets.",
  },
  {
    icon: Sparkles,
    title: "AI-aware, human-led",
    body: "Smart automation, expert oversight. Speed without sacrifice.",
  },
  {
    icon: Users,
    title: "Senior, not just sales",
    body: "A senior project lead from day one. No handoffs.",
  },
];

const STEPS = [
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

export default function HomeMethod() {
  return (
    <div className="container-wide grid lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-start">
      {/* Left — the why */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          The GlobalAnnotate method
        </p>
        <h2 className="section-h2 mt-4 text-ink-900">
          Quality you can audit.
          <br />
          Speed you can plan around.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-ink-600 leading-relaxed max-w-md">
          Native linguists, specialist annotators, SEO strategists, and growth marketers — under one quality system, one senior lead.
        </p>

        <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <li>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <p.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                  {p.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Right — the how */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          How it works
        </p>
        <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink-900 leading-tight">
          From first message to final delivery.
        </h3>

        <ol className="mt-8 relative">
          {/* Thin vertical connector behind the steps */}
          <span
            aria-hidden
            className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-ink-200/40 via-ink-200 to-ink-200/40"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <li className="relative pl-12 pb-8 last:pb-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-ink-200 text-brand-700"
                >
                  <s.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="display-num text-sm" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-lg font-semibold tracking-tight text-ink-900">
                    {s.title}
                  </h4>
                </div>
                <p className="mt-1.5 text-ink-600 leading-relaxed">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
