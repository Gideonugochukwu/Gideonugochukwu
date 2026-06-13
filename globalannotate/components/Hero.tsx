"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MultilingualGreeting from "./MultilingualGreeting";
import AnimatedBackground from "./AnimatedBackground";
import { img, unsplash } from "@/lib/images";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Hero image — LCP element. priority + sized to viewport for fast paint. */}
      <Image
        src={unsplash(img.hero.id, 2400)}
        alt={img.hero.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover photo-treat-dark opacity-25"
      />
      {/* A single, calm darken layer so the headline can breathe. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.45) 40%, rgba(2,6,23,0.92) 100%)",
        }}
      />
      <AnimatedBackground variant="dark" className="opacity-90" />
      <div aria-hidden className="absolute inset-0 hero-grid opacity-20" />

      <div className="container-wide relative pt-24 sm:pt-28 md:pt-36 pb-28 sm:pb-32 md:pb-44">
        <div className="max-w-5xl">
          {/* Multilingual greeting — elegant, deliberate, no chip. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white/80"
          >
            <MultilingualGreeting />
            <span className="text-white/35">.</span>
          </motion.div>

          {/* The single hero statement — no per-line stagger, no flourishes. */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero mt-6 sm:mt-8 text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white max-w-4xl"
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
            className="mt-8 text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            One partner for localization, AI training data, multilingual SEO, and growth marketing.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-900 px-5 py-3.5 font-semibold hover:bg-brand-50 transition shadow-sm"
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
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.55) 70%, #ffffff 100%)",
        }}
      />
    </section>
  );
}
