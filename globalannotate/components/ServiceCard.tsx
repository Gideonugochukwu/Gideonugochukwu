import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Brain, Languages, Megaphone, Search } from "lucide-react";
import { imageBg } from "@/lib/images";

const ICONS = { Brain, Languages, Megaphone, Search } as const;

export type ServiceIcon = keyof typeof ICONS;

export default function ServiceCard({
  slug,
  title,
  summary,
  icon,
  image,
  alt,
}: {
  slug: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  image: string;
  alt: string;
}) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={`/services/${slug}`}
      className="card group overflow-hidden flex flex-col h-full"
    >
      <div className={`relative aspect-[16/10] overflow-hidden ${imageBg}`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="object-cover photo-treat transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,0) 50%, rgba(15,23,42,0.65) 100%)",
          }}
        />
        <div
          className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white border border-white/20 backdrop-blur-md"
          style={{ background: "rgba(15, 23, 42, 0.35)" }}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-ink-600 leading-relaxed flex-1">{summary}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
          Learn more <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
