"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

// Chinese names for the greeting languages, used in the zh aria-label.
const ZH_LANG_NAMES: Record<string, string> = {
  English: "英语",
  French: "法语",
  Spanish: "西班牙语",
  Portuguese: "葡萄牙语",
  Italian: "意大利语",
  German: "德语",
  Mandarin: "普通话",
  Japanese: "日语",
  Korean: "韩语",
  Arabic: "阿拉伯语",
  Hindi: "印地语",
  Russian: "俄语",
  Turkish: "土耳其语",
  Swahili: "斯瓦希里语",
  Hausa: "豪萨语",
  Zulu: "祖鲁语",
};

// German names for the greeting languages, used in the de aria-label.
const DE_LANG_NAMES: Record<string, string> = {
  English: "Englisch",
  French: "Französisch",
  Spanish: "Spanisch",
  Portuguese: "Portugiesisch",
  Italian: "Italienisch",
  German: "Deutsch",
  Mandarin: "Mandarin",
  Japanese: "Japanisch",
  Korean: "Koreanisch",
  Arabic: "Arabisch",
  Hindi: "Hindi",
  Russian: "Russisch",
  Turkish: "Türkisch",
  Swahili: "Swahili",
  Hausa: "Hausa",
  Zulu: "Zulu",
};

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

// Renders exactly one greeting word in the server-side HTML (no sr-only twin
// and no duplicate text) and then cycles through languages once mounted.
// aria-label on the wrapper carries the language context for screen readers,
// so the inner span can stay aria-hidden without losing accessibility.
export default function MultilingualGreeting() {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const t = useTranslations("a11y");
  // The Chinese and German locales open on 你好 / Hallo so the
  // server-rendered greeting matches the page language; the cycle then
  // continues through every language.
  const [i, setI] = useState(() =>
    locale === "zh"
      ? GREETINGS.findIndex((g) => g.lang === "Mandarin")
      : locale === "de"
        ? GREETINGS.findIndex((g) => g.lang === "German")
        : 0
  );

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
      className="inline-block relative align-baseline"
      aria-live="polite"
      aria-atomic="true"
      aria-label={t("greeting", {
        lang:
          locale === "zh"
            ? ZH_LANG_NAMES[current.lang] ?? current.lang
            : locale === "de"
              ? DE_LANG_NAMES[current.lang] ?? current.lang
              : current.lang,
        word: current.word,
      })}
    >
      <span aria-hidden className="relative inline-block min-w-[6ch]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.word + i}
            initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-brand-200"
          >
            {current.word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
