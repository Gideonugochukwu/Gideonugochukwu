"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "backdrop-blur-md bg-white/80 dark:bg-night-900/80 border-b border-ink-200/70"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between">
        <Logo />

        {/* Seven items: tighter gap/padding at md so they hold one line, a
            touch roomier from lg up. */}
        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap px-2.5 py-2 text-sm font-medium rounded-lg transition lg:px-3",
                  active
                    ? "text-ink-900"
                    : "text-ink-600 hover:text-ink-900"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand-500 lg:left-3 lg:right-3" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          {/* CTA appears from lg up, where there's room beside seven items. */}
          <Link href="/contact" className="btn-primary text-sm hidden lg:inline-flex">
            Talk to an expert <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-ink-200 text-ink-700"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-200 bg-white">
          <div className="container-wide py-3 flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm font-medium",
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-700 hover:bg-ink-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary mt-2 text-sm">
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
