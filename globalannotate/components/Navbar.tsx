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
  "/languages": "languages",
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

  // The header CTA was removed, so the desktop bar is nine nav items (incl.
  // Languages + MarketReady™) + theme toggle + language switcher. The
  // container caps at 1240px, so all nine items only clear the controls from
  // `xl` up — below that the hamburger takes over for every locale (including
  // the wider German labels like "Netzwerk beitreten").
  const barShow = "hidden xl:flex";
  const barHide = "xl:hidden";

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

        {/* Eight items (incl. MarketReady™): the horizontal bar renders where
            there's room (lg for en/zh, xl for the wider de labels); below that
            the hamburger takes over. */}
        <nav
          className={cn("items-center gap-0.5 xl:gap-1", barShow)}
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

        {/* Desktop controls: theme toggle + language switcher only. The
            "Talk to an expert" CTA was removed from the header to stop the
            nav from overflowing; it lives in the mobile drawer and in the CTA
            band / hero on the pages themselves. */}
        <div className={cn("items-center gap-2.5 shrink-0", barShow)}>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className={cn("flex items-center gap-2", barHide)}>
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
        <div className={cn("border-t border-ink-200 bg-white", barHide)}>
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
