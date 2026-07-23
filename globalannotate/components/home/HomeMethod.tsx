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
import { useTranslations } from "next-intl";
import Reveal from "../Reveal";

// One unified "how we work" section. Replaces the previous separate
// "Why choose us" and "How it works" components — both repeated the same
// promise (quality + speed + global + senior) at different volumes.
//
// Layout: an editorial left column with the headline and four short
// promises (icon + title + body), and a right column with the four-step
// process running down a thin vertical rail. No card boxes anywhere.

// Icons + message keys; the copy lives under `method.promises` / `method.steps`.
const PROMISES = [
  { icon: ShieldCheck, key: "quality" },
  { icon: Globe2, key: "global" },
  { icon: Sparkles, key: "ailed" },
  { icon: Users, key: "senior" },
];

const STEPS = [
  { icon: Compass, key: "discovery" },
  { icon: Workflow, key: "proposal" },
  { icon: FileCheck2, key: "production" },
  { icon: Rocket, key: "delivery" },
];

export default function HomeMethod() {
  const t = useTranslations("method");
  return (
    <div className="container-wide grid lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-start">
      {/* Left — the why */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          {t("eyebrow")}
        </p>
        <h2 className="section-h2 mt-4 text-ink-900">
          {t("heading1")}
          <br />
          {t("heading2")}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-ink-600 leading-relaxed max-w-md">
          {t("intro")}
        </p>

        <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {PROMISES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.04}>
              <li>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <p.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-ink-900">
                  {t(`promises.${p.key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                  {t(`promises.${p.key}.body`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Right — the how */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          {t("howEyebrow")}
        </p>
        <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink-900 leading-tight">
          {t("howHeading")}
        </h3>

        <ol className="mt-8 relative">
          {/* Thin vertical connector behind the steps */}
          <span
            aria-hidden
            className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-ink-200/40 via-ink-200 to-ink-200/40"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.05}>
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
                    {t(`steps.${s.key}.title`)}
                  </h4>
                </div>
                <p className="mt-1.5 text-ink-600 leading-relaxed">
                  {t(`steps.${s.key}.body`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
