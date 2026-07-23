import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. `Link`/`useRouter`/`usePathname` keep the
// active locale prefix automatically, so links stay within /fr or /es.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
