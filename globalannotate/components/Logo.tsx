import Link from "next/link";

export default function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 group"
      aria-label="GlobalAnnotate home"
    >
      <span
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-white font-bold text-sm tracking-tight shadow-[0_8px_20px_-6px_rgba(16,185,129,0.55)] transition-transform group-hover:scale-[1.03]"
        style={{
          background:
            "linear-gradient(135deg, #10b981 0%, #059669 60%, #047857 100%)",
        }}
        aria-hidden
      >
        GA
        <span
          className="absolute inset-0 rounded-xl ring-1 ring-white/20"
          aria-hidden
        />
      </span>
      {withWordmark && (
        <span className="brand-wordmark text-ink-900">
          GlobalAnnotate
        </span>
      )}
    </Link>
  );
}
