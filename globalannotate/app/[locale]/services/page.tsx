import type { Metadata } from "next";
import { buildMetadata } from "@/lib/i18n-meta";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import { services, marketReady, site } from "@/lib/site";
import { img, imageBg, unsplash, servicesHeroSlides } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Brain, Gamepad2, Languages, Megaphone, Search, ShieldCheck } from "lucide-react";


// MarketReady is a distinct, proprietary service — surfaced here as a sixth
// card without living in the shared `services` array (which drives the
// homepage grid and footer).
const allServices = [...services, marketReady];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/services", metaKey: "services" });
}

const SERVICE_IMAGES = {
  "translation-localization": img.services.translation,
  "ai-annotation": img.services.aiAnnotation,
  "digital-marketing": img.services.digitalMarketing,
  seo: img.services.seo,
  "game-localization": img.services.gameLocalization,
  marketready: img.services.marketReady,
} as const;

const ICONS = { Brain, Gamepad2, Languages, Megaphone, Search, ShieldCheck } as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/services` },
        ])}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            One toolkit. <span className="text-gradient-light">Every market.</span>
          </>
        }
        subtitle="Core services that work together — or independently — to help your team move faster across markets, plus MarketReady™ to prove your content lands before you launch."
        ctas={[
          { label: "Talk to an expert", href: "/contact" },
          { label: "See case studies", href: "/portfolio", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* Quick-jump service list below the hero */}
      <Section className="pt-12 md:pt-16">
        <ul className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-6">
          {allServices.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className={
                  "group flex items-center justify-between rounded-xl border bg-white px-4 py-3 transition " +
                  (s.slug === "marketready"
                    ? "border-brand-300 hover:border-brand-400"
                    : "border-ink-200/80 hover:border-brand-300")
                }
              >
                <span className="font-medium text-ink-900">{s.short}</span>
                <ArrowRight className="h-4 w-4 text-ink-400 group-hover:text-brand-700 transition" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Service detail rows — alternating editorial image + copy. No card walls. */}
      <Section className="pt-8 md:pt-12">
        <div className="space-y-24 md:space-y-32">
          {allServices.map((s, i) => {
            const image = SERVICE_IMAGES[s.slug as keyof typeof SERVICE_IMAGES];
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            const reverse = i % 2 === 1;
            const isMarketReady = s.slug === "marketready";
            return (
              <Reveal key={s.slug} delay={0}>
                <article
                  id={s.slug}
                  className="grid items-center gap-10 lg:gap-16 md:grid-cols-2 scroll-mt-24"
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <div
                      className={`relative aspect-[5/4] overflow-hidden rounded-2xl ${imageBg}`}
                    >
                      <Image
                        src={unsplash(image.id, 1400)}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover photo-treat"
                      />
                    </div>
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <span
                      aria-hidden
                      className={
                        "inline-flex h-10 w-10 items-center justify-center rounded-lg " +
                        (isMarketReady
                          ? "bg-brand-500 text-white"
                          : "border border-ink-200 text-brand-700")
                      }
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
                      0{i + 1} · {isMarketReady ? "Proprietary service" : "Service"}
                    </p>
                    <h2 className="section-h2 mt-3 text-ink-900">{s.title}</h2>
                    <p className="mt-5 text-lg text-ink-600 leading-relaxed">
                      {s.summary}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href={`/services/${s.slug}`}
                        className="btn-primary text-sm"
                      >
                        Explore service <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
                      >
                        Talk to an expert <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pb-28">
        <CTABand />
      </Section>
    </>
  );
}
