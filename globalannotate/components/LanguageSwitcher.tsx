"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// The three locales, in switcher order. `code` is the compact label shown in
// the trigger (EN / DE / 中文); `name` is the native full name in the menu.
const LOCALES: {
  locale: (typeof routing.locales)[number];
  flag: string;
  code: string;
  name: string;
}[] = [
  { locale: "en", flag: "🇬🇧", code: "EN", name: "English" },
  { locale: "de", flag: "🇩🇪", code: "DE", name: "Deutsch" },
  { locale: "zh", flag: "🇨🇳", code: "中文", name: "简体中文" },
];

// Language picker for the navbar. Navigates to the same page in the chosen
// locale (next-intl keeps the path, swaps the prefix) and persists the choice
// in the NEXT_LOCALE cookie so the preference survives future visits.
export default function LanguageSwitcher({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (locale: (typeof routing.locales)[number]) => {
    setOpen(false);
    if (locale === activeLocale) return;
    // next-intl persists the choice in the NEXT_LOCALE cookie (configured via
    // routing.localeCookie) as part of this locale-switching navigation, so
    // middleware honours it on return visits — no manual cookie write needed.
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace(pathname as any, { locale });
    });
  };

  // Mobile: a simple row of the three options inside the hamburger menu.
  if (variant === "mobile") {
    return (
      <div
        className="mt-2 flex items-center gap-2 border-t border-ink-200 pt-3"
        role="group"
        aria-label="Language"
      >
        {LOCALES.map((l) => {
          const active = l.locale === activeLocale;
          return (
            <button
              key={l.locale}
              type="button"
              onClick={() => select(l.locale)}
              disabled={isPending}
              aria-current={active ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                  : "text-ink-700 hover:bg-ink-50"
              )}
            >
              <span aria-hidden>{l.flag}</span>
              {l.name}
            </button>
          );
        })}
      </div>
    );
  }

  const current = LOCALES.find((l) => l.locale === activeLocale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-2.5 py-2 text-sm font-medium text-ink-700 transition hover:text-ink-900 hover:border-ink-300",
          open && "border-ink-300 text-ink-900"
        )}
      >
        <Globe className="h-4 w-4 text-ink-500" aria-hidden />
        <span aria-hidden>{current.code}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-ink-400 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink-200 bg-white p-1 shadow-lg dark:bg-night-900"
        >
          {LOCALES.map((l) => {
            const active = l.locale === activeLocale;
            return (
              <button
                key={l.locale}
                type="button"
                role="menuitem"
                onClick={() => select(l.locale)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-ink-700 hover:bg-ink-50"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden>{l.flag}</span>
                  {l.name}
                </span>
                {active && <Check className="h-4 w-4 text-brand-600" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
