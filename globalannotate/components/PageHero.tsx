"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Slide = { id: string; alt: string };

export type PageHeroCta = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

// One reusable hero used on every main page: Home, Services, Portfolio,
// About. Always renders the same look — dark gradient over a rotating
// background slideshow, optional eyebrow, a normal-sized headline
// (page-h1 clamp), an optional pre-slot (used for the multilingual
// greeting on Home), an optional subtitle, and up to two CTAs.
export default function PageHero({
  eyebrow,
  pre,
  title,
  subtitle,
  ctas,
  size = "default",
  backgroundExtra,
  post,
  solidBackground = false,
}: {
  eyebrow?: string;
  pre?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  ctas?: PageHeroCta[];
  // Kept for API compatibility with existing call sites; inner-page heroes no
  // longer render a background slideshow, so this is now unused.
  slides?: Slide[];
  // "default" = standard hero used by main pages; "compact" = shallower
  // hero used by section pages like Reviews / Blog / Contact / Legal.
  size?: "default" | "compact";
  // Optional decorative layer rendered above the gradient but behind the hero
  // text — used by the homepage for the interactive world-map globe.
  backgroundExtra?: React.ReactNode;
  // Optional content slot rendered after the CTAs.
  post?: React.ReactNode;
  // Drop the photo slideshow for a clean solid-navy hero (homepage globe).
  solidBackground?: boolean;
}) {
  const reduce = useReducedMotion();

  const paddingY =
    size === "compact"
      ? "pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
      : "pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28";

  // Oversized display type for real headlines; sentence-length titles
  // (some service pages pass a full value proposition) drop to the
  // moderate clamp so the hero doesn't wrap five-plus lines.
  const titleClass =
    typeof title === "string" && title.length > 70 ? "page-h1-long" : "page-h1";

  // When there's a draggable globe behind the text, let pointer events fall
  // through the content column to the canvas; interactive children (the CTAs)
  // opt back in with pointer-events-auto so they stay clickable.
  const passThrough = Boolean(backgroundExtra);

  return (
    <section
      className={`relative isolate overflow-hidden text-white ${
        solidBackground
          ? "bg-night-950 flex items-center min-h-[38rem] md:min-h-[44rem]"
          : ""
      }`}
      // Inner-page heroes are a clean, solid deep navy — no image, no grid, no
      // overlay. The homepage (solidBackground) keeps its own navy field for
      // the globe and is styled via the class above.
      style={solidBackground ? undefined : { backgroundColor: "#0F172A" }}
    >
      {/* Homepage only: a dimming gradient sits over the globe for legibility.
          Inner pages need nothing over the flat navy. */}
      {solidBackground && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.35) 45%, rgba(2,6,23,0.85) 100%)",
          }}
        />
      )}

      {backgroundExtra}

      <div
        className={`container-wide relative ${paddingY} ${
          passThrough ? "pointer-events-none" : ""
        }`}
      >
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-xs font-medium uppercase tracking-[0.20em] text-brand-300"
            >
              {eyebrow}
            </motion.p>
          )}

          {pre && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-2"
            >
              {pre}
            </motion.div>
          )}

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`${titleClass} mt-4 sm:mt-5 text-white max-w-3xl`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {ctas && ctas.length > 0 && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pointer-events-auto mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              {ctas.map((c) =>
                c.variant === "ghost" ? (
                  <Link key={c.href + c.label} href={c.href} className="btn-ghost-light">
                    {c.label}
                  </Link>
                ) : (
                  <Link
                    key={c.href + c.label}
                    href={c.href}
                    className="btn-on-dark px-5 py-3 rounded-xl shadow-sm"
                  >
                    {c.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                )
              )}
            </motion.div>
          )}

          {post && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {post}
            </motion.div>
          )}
        </div>
      </div>

      {/* Soft fade into the next section — follows the page background in
          both light and dark mode. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-paper) 55%, transparent) 70%, var(--color-paper) 100%)",
        }}
      />
    </section>
  );
}
