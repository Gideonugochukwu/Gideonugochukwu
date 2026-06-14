"use client";

import { useReducedMotion } from "framer-motion";

// A soft aurora mesh built entirely from CSS — four large, blurred radial
// blobs that drift very slowly across the section. GPU-friendly (uses
// transform, not layout), behind content via z-index, and pointer-events:none
// so it never interferes with clicks or selection.
//
// Variants:
//   "light"  — for white sections (emerald + sky over near-white)
//   "dark"   — for ink-navy backgrounds (emerald + teal over ink-950)
//   "tint"   — very subtle, for sections that should feel "alive" but quiet
//
// Honors prefers-reduced-motion: drops the drift animation entirely and
// renders a static, equally tasteful mesh.
export default function AnimatedBackground({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark" | "tint";
  className?: string;
}) {
  const reduce = useReducedMotion();

  // Palette pushed toward the brand colours (emerald + teal + a hint of
  // mint) — the previous mix leaned blue/indigo. This reads as the "white
  // and green" brand without becoming loud.
  const palette =
    variant === "dark"
      ? {
          base: "transparent",
          a: "rgba(16,185,129,0.45)", // emerald-500
          b: "rgba(52,211,153,0.32)", // emerald-400
          c: "rgba(20,184,166,0.34)", // teal-500
          d: "rgba(110,231,183,0.22)", // emerald-300 highlight
        }
      : variant === "tint"
        ? {
            base: "transparent",
            a: "rgba(16,185,129,0.28)",
            b: "rgba(52,211,153,0.20)",
            c: "rgba(20,184,166,0.22)",
            d: "rgba(110,231,183,0.16)",
          }
        : {
            base: "transparent",
            a: "rgba(16,185,129,0.38)",
            b: "rgba(52,211,153,0.28)",
            c: "rgba(20,184,166,0.30)",
            d: "rgba(110,231,183,0.20)",
          };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background: palette.base }}
    >
      <span
        className={reduce ? "" : "aurora-blob aurora-drift-1"}
        style={{
          background: `radial-gradient(closest-side, ${palette.a}, transparent 70%)`,
        }}
      />
      <span
        className={reduce ? "" : "aurora-blob aurora-drift-2"}
        style={{
          background: `radial-gradient(closest-side, ${palette.b}, transparent 70%)`,
        }}
      />
      <span
        className={reduce ? "" : "aurora-blob aurora-drift-3"}
        style={{
          background: `radial-gradient(closest-side, ${palette.c}, transparent 70%)`,
        }}
      />
      <span
        className={reduce ? "" : "aurora-blob aurora-drift-4"}
        style={{
          background: `radial-gradient(closest-side, ${palette.d}, transparent 70%)`,
        }}
      />
    </div>
  );
}
