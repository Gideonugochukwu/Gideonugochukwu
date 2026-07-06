"use client";

import { Moon, Sun } from "lucide-react";

// Light/dark toggle for the navbar. The current theme lives as a `dark`
// class on <html>, applied before first paint by the inline THEME_INIT
// script in the root layout and persisted to localStorage here. The icon
// swap is pure CSS (dark:hidden / dark:block), so the button renders
// identically on server and client — no hydration mismatch, no flash.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage unavailable (private mode etc.) — the toggle still works
      // for the current visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:text-accent-600 hover:border-accent-400 transition " +
        className
      }
    >
      <Sun className="hidden h-[1.1rem] w-[1.1rem] dark:block" />
      <Moon className="h-[1.1rem] w-[1.1rem] dark:hidden" />
    </button>
  );
}
