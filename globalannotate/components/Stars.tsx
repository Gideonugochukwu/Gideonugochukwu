import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stars({
  value,
  size = 16,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={
              filled
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-ink-300"
            }
          />
        );
      })}
    </div>
  );
}
