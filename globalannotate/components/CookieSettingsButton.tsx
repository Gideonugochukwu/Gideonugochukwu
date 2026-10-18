"use client";

import { OPEN_EVENT } from "./CookieConsent";

// Footer control that re-opens the cookie consent banner so visitors can
// change their choice at any time.
export default function CookieSettingsButton({
  className,
  label = "Cookie settings",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
