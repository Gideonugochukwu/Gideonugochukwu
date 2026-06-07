"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 hero-glow" />
      <div aria-hidden className="absolute inset-0 hero-grid" />

      <div className="container-wide relative pt-20 md:pt-28 pb-20 md:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.div variants={item}>
            <span className="badge">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by global teams in 30+ countries
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            <span className="text-gradient">Precision</span> across languages.
            <br className="hidden sm:block" />
            <span className="text-gradient">Intelligence</span> across data.
            <br className="hidden sm:block" />
            <span className="text-gradient">Growth</span> across markets.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 text-lg md:text-xl text-ink-600 leading-relaxed max-w-2xl"
          >
            GlobalAnnotate helps ambitious companies translate into 100+
            languages, train smarter AI with high-precision annotation, and
            scale growth with performance marketing — all from one trusted
            partner.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link href="/contact" className="btn-primary">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              ISO-grade quality processes
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              24/7 global delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Human-in-the-loop QA
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
