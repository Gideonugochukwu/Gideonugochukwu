import { defineRouting } from "next-intl/routing";

// Three locales. English is the default and is served WITHOUT a prefix
// (localePrefix: "as-needed"); German and Chinese (Simplified) live under
// /de and /zh. The user's language choice persists in the NEXT_LOCALE cookie.
export const routing = defineRouting({
  locales: ["en", "de", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: {
    name: "NEXT_LOCALE",
  },
});

export type Locale = (typeof routing.locales)[number];
