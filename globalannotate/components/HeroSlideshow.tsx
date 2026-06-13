"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { heroSlides as SLIDES, imageBg, unsplash } from "@/lib/images";
const INTERVAL_MS = 5000;
// Keep secondary slides off the network for the first beat so the LCP image
// gets the whole pipe. Shortly after mount we render the rest, and they pick
// up with native lazy loading.
const PRELOAD_DELAY_MS = 1500;

// Full-bleed crossfade slideshow used behind the homepage hero. All slides
// share the same position + sizing and toggle via opacity, so the transition
// is GPU-only. Auto-rotates every 5s and pauses for prefers-reduced-motion.
export default function HeroSlideshow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [extrasMounted, setExtrasMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setExtrasMounted(true), PRELOAD_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${imageBg}`}
    >
      {SLIDES.map((slide, i) => {
        const isFirst = i === 0;
        // Don't render past slides until after the LCP painted; the first
        // slide is always there.
        if (!isFirst && !extrasMounted) return null;
        return (
          <Image
            key={slide.id}
            src={unsplash(slide.id, 2400)}
            alt={slide.alt}
            fill
            priority={isFirst}
            fetchPriority={isFirst ? "high" : "low"}
            loading={isFirst ? "eager" : "lazy"}
            sizes="100vw"
            className="object-cover transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        );
      })}
    </div>
  );
}
