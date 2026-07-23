"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

// Maps each nav href to its translation key under the `nav` namespace, so the
// labels come from messages/*.json while the routes stay in lib/site.
const NAV_KEY: Record<string, string> = {
  "/": "home",
  "/services": "services",
  "/services/marketready": "marketready",
  "/portfolio": "portfolio",
  "/blog": "blog",
  "/about": "about",
  "/freelancers": "network",
  "/contact": "contact",
};

export default function Navbar() {
  const t = useTranslations();
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

  const label = (href: string) =>
    NAV_KEY[href] ? t(`nav.${NAV_KEY[href]}`) : href;

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

        {/* Eight items now (incl. MarketReady™): the horizontal bar renders
            from lg where there's room; below lg the hamburger takes over. */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1"
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
                  "relative whitespace-nowrap px-2.5 py-2 text-sm font-medium rounded-lg transition xl:px-3",
                  active
                    ? "text-ink-900"
                    : "text-ink-600 hover:text-ink-900"
                )}
              >
                {label(item.href)}
                {item.badge && (
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-top"
                  />
                )}
                {active && (
                  <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand-500 xl:left-3 xl:right-3" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeToggle />
          <LanguageSwitcher />
          {/* CTA appears from xl up, where there's room beside eight items. */}
          <Link href="/contact" className="btn-primary text-sm hidden xl:inline-flex">
            {t("common.talkToExpert")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
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
        <div className="lg:hidden border-t border-ink-200 bg-white">
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
                    "inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium",
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-700 hover:bg-ink-50"
                  )}
                >
                  {label(item.href)}
                  {item.badge && (
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500"
                    />
                  )}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary mt-2 text-sm">
              {t("common.talkToExpert")} <ArrowRight className="h-4 w-4" />
            </Link>
            {/* Language options as a row at the bottom of the mobile menu. */}
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
}
