import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

// Visual breadcrumb trail. The BreadcrumbList JSON-LD is emitted separately
// by each page (see lib/schema.ts → breadcrumbSchema), so this component is
// presentation-only — no duplicate structured data.
//
// `tone="dark"` is used inside the navy hero (emerald links on navy);
// `tone="light"` is used on paper/white sections. The last item is the
// current page and is rendered as plain text (not a link).
export default function Breadcrumbs({
  items,
  tone = "light",
  className,
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const linkCls =
    tone === "dark"
      ? "text-brand-300 hover:text-brand-200"
      : "text-brand-600 hover:text-brand-700";
  const sepCls = tone === "dark" ? "text-white/40" : "text-ink-400";
  const currentCls = tone === "dark" ? "text-white/70" : "text-ink-500";

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-x-1.5">
              {isLast ? (
                <span
                  className={cn("font-medium", currentCls)}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn("font-medium transition", linkCls)}
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  className={cn("h-3.5 w-3.5 shrink-0", sepCls)}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
