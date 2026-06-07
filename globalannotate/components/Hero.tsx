"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";
import MultilingualGreeting from "./MultilingualGreeting";
import AnimatedHeadline from "./AnimatedHeadline";
import { img, unsplash } from "@/lib/images";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <Image
        src={unsplash(img.hero.id, 2400)}
        alt={img.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.65) 35%, rgba(2,6,23,0.85) 100%), radial-gradient(60% 55% at 50% 0%, rgba(16,185,129,0.30), transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 hero-grid opacity-50" />

      <div className="container-wide relative pt-20 md:pt-28 pb-24 md:pb-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="badge-light">
            <Globe2 className="h-3.5 w-3.5" />
            Global team. Native specialists in 100+ languages.
          </span>
        </motion.div>

        <div className="mt-7 max-w-5xl">
          <div className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white/85">
            <MultilingualGreeting />
            <span className="text-white/40">.</span>
          </div>

          <h1 className="display-hero mt-5 text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white">
            <AnimatedHeadline text="Precision across languages." delay={0.2} />
            <br className="hidden sm:block" />
            <span className="text-gradient-light">
              <AnimatedHeadline text="Intelligence across data." delay={0.55} />
            </span>
            <br className="hidden sm:block" />
            <AnimatedHeadline text="Growth across markets." delay={0.9} />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed"
          >
            One partner for localization, AI training data, and growth marketing — in 100+ languages.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.45 }}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-900 px-5 py-3.5 font-semibold hover:bg-brand-50 transition"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-ghost-light">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/65"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              ISO-grade quality
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              24-hour response time
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Human-in-the-loop QA
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Native specialists, 30+ countries
            </span>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.6) 70%, #ffffff 100%)",
        }}
      />
    </section>
  );
}
