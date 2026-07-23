"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { FAQItem } from "../FAQ";

// Homepage-only FAQ. The shared FAQ component used on service pages renders
// inside a bordered card; on the homepage we drop the outer box, lean on
// row dividers, and give each row generous vertical breathing room. Items are
// read from the translated `faq.items` array so the whole list localizes.
export default function HomeFAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FAQItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-200/70">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 text-left py-6"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-ink-500 transition-transform shrink-0",
                  isOpen && "rotate-180 text-brand-600"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 -mt-1 text-ink-600 leading-relaxed text-base md:text-lg max-w-3xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
