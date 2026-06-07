import Link from "next/link";
import { ArrowUpRight, Brain, Languages, Megaphone } from "lucide-react";

const ICONS = { Brain, Languages, Megaphone } as const;

export default function ServiceCard({
  slug,
  title,
  summary,
  icon,
}: {
  slug: string;
  title: string;
  summary: string;
  icon: keyof typeof ICONS;
}) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={`/services/${slug}`}
      className="card group p-7 flex flex-col h-full"
    >
      <div
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-brand-700"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.10), rgba(16,185,129,0.04))",
          border: "1px solid rgba(16,185,129,0.18)",
        }}
        aria-hidden
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-ink-600 leading-relaxed flex-1">{summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 group-hover:gap-2.5 transition-all">
        Learn more <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
