import Link from "next/link";
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
  const src =
    variant === "dark"
      ? "/globalannotate-logo-dark.png"
      : "/globalannotate-logo.png";

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 group"
      aria-label="GlobalAnnotate home"
    >
      <Image
        src={src}
        alt="GlobalAnnotate logo"
        width={40}
        height={40}
        priority
        className="h-9 w-9 object-contain transition-transform group-hover:scale-[1.03]"
      />
      {withWordmark && (
        <span className="brand-wordmark text-ink-900">
          GlobalAnnotate
        </span>
      )}
    </Link>
  );
}
