"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const GREETINGS = [
  { word: "Hello", lang: "English" },
  { word: "Bonjour", lang: "French" },
  { word: "Hola", lang: "Spanish" },
  { word: "Olá", lang: "Portuguese" },
  { word: "Ciao", lang: "Italian" },
  { word: "Hallo", lang: "German" },
  { word: "你好", lang: "Mandarin" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "안녕하세요", lang: "Korean" },
  { word: "مرحبا", lang: "Arabic" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "Привет", lang: "Russian" },
  { word: "Merhaba", lang: "Turkish" },
  { word: "Habari", lang: "Swahili" },
  { word: "Sannu", lang: "Hausa" },
  { word: "Sawubona", lang: "Zulu" },
];

export default function MultilingualGreeting() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % GREETINGS.length);
    }, 1900);
    return () => clearInterval(t);
  }, [reduce]);

  const current = GREETINGS[i];

  return (
    <span
      className="inline-flex items-baseline relative"
      aria-live="polite"
      aria-label={`Hello in ${current.lang}: ${current.word}`}
    >
      <span className="sr-only">Hello in many languages, including {current.lang}: {current.word}</span>
      <span aria-hidden className="relative inline-block min-w-[6ch]">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.word + i}
            initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-gradient-light"
          >
            {current.word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
