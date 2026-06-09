import { ShieldCheck } from "lucide-react";
import type { Review } from "@/data/reviews";
import { authorDisplay } from "@/data/reviews";

// Small emerald trust mark. Used inline next to author lines. Subtle on
// purpose — it should read as a quiet verification stamp, not a sticker.
export function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[11px] font-medium leading-none text-brand-700 " +
        className
      }
      title="Verified client — engagement confirmed by GlobalAnnotate."
    >
      <ShieldCheck className="h-3 w-3" aria-hidden />
      Verified client
    </span>
  );
}

// Renders the author line according to the review's displayMode, and a
// VerifiedBadge if the review is marked verified. Used on both the homepage
// testimonials and the /reviews page so the two never drift apart.
export default function ReviewAuthor({
  review,
  size = "md",
}: {
  review: Review;
  size?: "sm" | "md";
}) {
  const a = authorDisplay(review);
  const primarySize = size === "sm" ? "text-sm" : "text-[15px]";
  const secondarySize = size === "sm" ? "text-xs" : "text-sm";
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`font-semibold text-ink-900 ${primarySize}`}>
          {a.primary}
        </span>
        {review.verified && <VerifiedBadge />}
      </div>
      <div className={`mt-0.5 text-ink-500 ${secondarySize}`}>{a.secondary}</div>
    </div>
  );
}
