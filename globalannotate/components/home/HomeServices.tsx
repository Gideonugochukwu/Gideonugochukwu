import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Brain, Gamepad2, Languages, Megaphone, Search } from "lucide-react";
import Reveal from "../Reveal";
import { services } from "@/lib/site";
import { img, imageBg, unsplash } from "@/lib/images";

// Homepage-only editorial presentation of the services. Large feature
// blocks with strong type, a tall image, and just enough whitespace to
// feel like a magazine spread. The original card-style ServiceCard is
// still used on /services.

const ICONS = { Brain, Gamepad2, Languages, Megaphone, Search } as const;

const SERVICE_IMAGES = {
  "translation-localization": img.services.translation,
  "ai-annotation": img.services.aiAnnotation,
  "digital-marketing": img.services.digitalMarketing,
  seo: img.services.seo,
  "game-localization": img.services.gameLocalization,
} as const;

export default function HomeServices() {
  return (
    <div className="container-wide">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            What we do
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Five services.
            <br />
            <span className="text-gradient">One accountable team.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            Translation, AI training data, multilingual SEO, marketing, and game localization — in 100+ languages.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
        >
          See all services <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Uniform 2x2 grid — no vertical offset, moderate card height,
          consistent title size that matches the industries cards. */}
      <div className="mt-12 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2">
        {services.map((s, i) => {
          const image = SERVICE_IMAGES[s.slug as keyof typeof SERVICE_IMAGES];
          const Icon = ICONS[s.icon as keyof typeof ICONS];
          return (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link href={`/services/${s.slug}`} className="group block">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${imageBg}`}>
                  <Image
                    src={unsplash(image.id, 1000)}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                    className="object-cover photo-treat transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(2,6,23,0.10) 0%, rgba(2,6,23,0.35) 55%, rgba(2,6,23,0.88) 100%)",
                    }}
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 text-xs font-medium text-white/85">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25">
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="uppercase tracking-[0.16em]">
                      0{i + 1} / Service
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                    <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                      {s.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-200 group-hover:gap-2.5 transition-all">
                      Explore service <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
