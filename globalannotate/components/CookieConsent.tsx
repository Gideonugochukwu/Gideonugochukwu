"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Cookie, X } from "lucide-react";

// Lightweight, dependency-free cookie consent. Strictly necessary cookies
// (theme + this consent choice) are always on; non-essential cookies such as
// analytics are only enabled after the visitor accepts. The stored choice is
// read by any future analytics loader via `hasAnalyticsConsent()`.
//
// The footer's "Cookie settings" control re-opens this banner by dispatching
// the OPEN_EVENT below.

const STORAGE_KEY = "ga-cookie-consent"; // "accepted" | "rejected"
export const OPEN_EVENT = "ga:open-cookie-settings";

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Decide initial visibility after mount (localStorage isn't available
    // during SSR). Defer the state update out of the effect body so we don't
    // set state synchronously while committing the effect.
    let show = false;
    try {
      show = !localStorage.getItem(STORAGE_KEY);
    } catch {
      // If storage is unavailable, show the banner but don't crash.
      show = true;
    }
    const raf = requestAnimationFrame(() => setVisible(show));
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures (private mode, blocked cookies).
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="container-wide">
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_20px_60px_-25px_rgba(2,6,23,0.45)] sm:p-6">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
            >
              <Cookie className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-900">
                We value your privacy
              </p>
              <p className="mt-1 text-sm text-ink-600 leading-relaxed">
                We use strictly necessary cookies to run this site. With your
                consent, we may also use analytics cookies to understand how the
                site is used. See our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => choose("accepted")}
                  className="btn-primary text-sm"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => choose("rejected")}
                  className="btn-secondary text-sm"
                >
                  Reject non-essential
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => choose("rejected")}
              aria-label="Dismiss (reject non-essential cookies)"
              className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 hover:text-ink-900 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
