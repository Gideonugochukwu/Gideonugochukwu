import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("a11y");
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={t("stars", { value: String(value) })}
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
                ? "fill-brand-500 text-brand-500"
                : "fill-transparent text-ink-300"
            }
          />
        );
      })}
    </div>
  );
}
