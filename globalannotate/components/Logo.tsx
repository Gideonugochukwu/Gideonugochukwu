import { Link } from "@/i18n/navigation";
import Image from "next/image";

type LogoVariant = "light" | "dark";

export default function Logo({
  withWordmark = true,
  variant = "light",
}: {
  withWordmark?: boolean;
  // "light" → the full-colour mark for light backgrounds (default, navbar)
  // "dark"  → the white-lettering mark for dark backgrounds (e.g. a dark footer)
  variant?: LogoVariant;
}) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 group"
      aria-label="GlobalAnnotate home"
    >
      {variant === "dark" ? (
        <Image
          src="/globalannotate-logo-dark.png"
          alt="GlobalAnnotate logo"
          width={40}
          height={40}
          priority
          className="h-9 w-9 object-contain transition-transform group-hover:scale-[1.03]"
        />
      ) : (
        <>
          {/* Theme-aware pair: light-bg mark by default, white-lettering
              mark when the site is in dark mode. Swapped purely in CSS so
              SSR and client render identically. */}
          <Image
            src="/globalannotate-logo.png"
            alt="GlobalAnnotate logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain transition-transform group-hover:scale-[1.03] dark:hidden"
          />
          <Image
            src="/globalannotate-logo-dark.png"
            alt="GlobalAnnotate logo"
            width={40}
            height={40}
            className="hidden h-9 w-9 object-contain transition-transform group-hover:scale-[1.03] dark:block"
          />
        </>
      )}
      {withWordmark && (
        <span className="brand-wordmark text-ink-900">
          GlobalAnnotate
        </span>
      )}
    </Link>
  );
}
