import { ShieldCheck, Globe2, Sparkles, Users } from "lucide-react";
import Reveal from "../Reveal";

// Homepage-only "Why us" presentation. Drops the 2x2 bordered card grid in
// favor of a left-headline / right-feature-list editorial layout where each
// feature is a typography-led block separated by thin dividers, not boxes.

const FEATURES = [
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

export default function HomeWhyUs() {
  return (
    <div className="container-wide grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          Why choose us
        </p>
        <h2 className="mt-4 display-hero text-4xl md:text-5xl lg:text-6xl text-ink-900">
          Quality you can audit.
          <br />
          <span className="text-gradient">Speed you can plan around.</span>
        </h2>
        <p className="mt-6 text-lg text-ink-600 leading-relaxed max-w-md">
          Native linguists, specialist annotators, SEO strategists, and growth marketers — under one quality system.
        </p>
      </div>

      <ul className="divide-y divide-ink-200/70">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <li className="py-6 first:pt-0 last:pb-0 grid grid-cols-[auto_1fr] gap-x-5 items-start">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-ink-600 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
