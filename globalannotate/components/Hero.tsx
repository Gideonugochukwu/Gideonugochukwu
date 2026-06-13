"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MultilingualGreeting from "./MultilingualGreeting";
import AnimatedBackground from "./AnimatedBackground";
import HeroSlideshow from "./HeroSlideshow";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Rotating background slideshow — preloads slide 1 for LCP, defers
          slides 2–6, and crossfades every 5s. Pauses for reduced motion. */}
      <HeroSlideshow />

      {/* Dark gradient overlay — sits over every slide so the headline and
          CTAs stay fully readable regardless of which photo is active. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.70) 0%, rgba(2,6,23,0.55) 40%, rgba(2,6,23,0.92) 100%)",
        }}
      />
      <AnimatedBackground variant="dark" className="opacity-75" />
      <div aria-hidden className="absolute inset-0 hero-grid opacity-20" />

      {/* Refined, balanced hero proportions — no longer dominates the screen */}
      <div className="container-wide relative pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-3xl">
          {/* Multilingual greeting — elegant, deliberate, no chip. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white/80"
          >
            <MultilingualGreeting />
            <span className="text-white/35">.</span>
          </motion.div>

          {/* Headline — normal, professional agency size.
              clamp() fluidly scales from ~36px on mobile to ~56px on wide
              desktop, well below the previous oversized type. */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero mt-5 sm:mt-6 text-white max-w-3xl"
            style={{
              fontSize: "clamp(2.25rem, 3.2vw + 1rem, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Precision across languages.{" "}
            <span className="text-gradient-light">Intelligence across data.</span>{" "}
            Growth across markets.
          </motion.h1>

          {/* Short, confident subhead. */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed"
          >
            One partner for localization, AI training data, multilingual SEO, and growth marketing.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-900 px-5 py-3 font-semibold hover:bg-brand-50 transition shadow-sm"
            >
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-ghost-light">
              Explore services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Soft fade into the next white section. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.55) 70%, #ffffff 100%)",
        }}
      />
    </section>
  );
}
