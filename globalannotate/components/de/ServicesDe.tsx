import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { img, imageBg, unsplash, servicesHeroSlides } from "@/lib/images";
import { deAlt, deSlides } from "@/lib/images.de";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import { ArrowRight, Brain, Gamepad2, Languages, Megaphone, Search, ShieldCheck } from "lucide-react";

const ICONS = { Brain, Gamepad2, Languages, Megaphone, Search, ShieldCheck } as const;

// Same six services, order, images, and icons as the English /services page.
const SERVICES: {
  slug: string;
  title: string;
  short: string;
  summary: string;
  icon: keyof typeof ICONS;
  imageId: string;
}[] = [
  {
    slug: "translation-localization",
    title: "Übersetzung afrikanischer Sprachen und Lokalisierung",
    short: "Übersetzung und Lokalisierung",
    summary:
      "Hochwertige Übersetzung durch Muttersprachler und kulturell stimmige Lokalisierung in über 100 Sprachen, darunter Hausa, Yoruba und Swahili – für Websites, Apps, Dokumente und Multimedia-Inhalte.",
    icon: "Languages",
    imageId: img.services.translation.id,
  },
  {
    slug: "ai-annotation",
    title: "KI-Datenannotation mehrsprachig",
    short: "KI-Datenannotation",
    summary:
      "Präzise Trainingsdaten für Teams in Bildverarbeitung, Sprachverarbeitung und großen Sprachmodellen: Begrenzungsrahmen, semantische Segmentierung, Audio- und Textannotation – auch in afrikanischen Sprachen, die die meisten Anbieter nicht abdecken, durchgehend qualitätsgesichert.",
    icon: "Brain",
    imageId: img.services.aiAnnotation.id,
  },
  {
    slug: "seo",
    title: "Mehrsprachige Suchmaschinenoptimierung",
    short: "Suchmaschinenoptimierung",
    summary:
      "Gute Platzierungen in jedem Markt und jeder Sprache: mehrsprachige und internationale Suchmaschinenoptimierung (SEO), technische Prüfungen, Inhalte und Linkaufbau mit nachhaltiger Wirkung.",
    icon: "Search",
    imageId: img.services.seo.id,
  },
  {
    slug: "digital-marketing",
    title: "Digitales Marketing",
    short: "Digitales Marketing",
    summary:
      "Erfolgsorientierte Werbung auf Facebook und Instagram, Betreuung sozialer Medien und Inhaltsstrategien, die aus Zielgruppen Kunden machen.",
    icon: "Megaphone",
    imageId: img.services.digitalMarketing.id,
  },
  {
    slug: "game-localization",
    title: "Spielelokalisierung und Übersetzung",
    short: "Spielelokalisierung",
    summary:
      "Bringen Sie Ihr Spiel zu Spielern weltweit und in Afrika: Benutzeroberfläche, Dialoge, Untertitel, Sprechertexte, Shop-Seiten und linguistische Qualitätssicherung (LQA) in über 100 Sprachen.",
    icon: "Gamepad2",
    imageId: img.services.gameLocalization.id,
  },
  {
    slug: "marketready",
    title: "MarketReady™ kulturelle Validierung",
    short: "MarketReady™",
    summary:
      "Tests mit echten muttersprachlichen Nutzern vor der Markteinführung. Der einzige Übersetzungsdienst, der garantiert, dass Ihre Inhalte im Zielmarkt wirken.",
    icon: "ShieldCheck",
    imageId: img.services.marketReady.id,
  },
];

// /de/services — German services overview.
export default function ServicesDe() {
  return (
    <>
      <JsonLd
        data={deLd([
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Leistungen", url: `${site.url}/de/services` },
          ]),
          itemListSchema({
            name: "Leistungen von GlobalAnnotate",
            url: `${site.url}/de/services`,
            items: SERVICES.map((s) => s.title),
          }),
        ])}
      />

      <PageHero
        eyebrow="Leistungen"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Leistungen", href: "/services" },
        ]}
        title={
          <>
            Übersetzungsagentur für Lokalisierung:{" "}
            <span className="text-gradient-light">ein Partner für jeden Markt.</span>
          </>
        }
        subtitle="Unsere Kernleistungen greifen ineinander oder funktionieren einzeln – damit Ihr Team schneller in neue Märkte kommt. Dazu die MarketReady™ kulturelle Validierung, die vor dem Start belegt, dass Ihre Inhalte wirken."
        ctas={[
          { label: "Beratung anfragen", href: "/contact" },
          { label: "Referenzen ansehen", href: "/portfolio", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-12 md:pt-16">
        <ul className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s) => (
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

      <Section className="pt-8 md:pt-12">
        <div className="space-y-24 md:space-y-32">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            const reverse = i % 2 === 1;
            const isMarketReady = s.slug === "marketready";
            return (
              <Reveal key={s.slug} delay={0}>
                <article
                  id={s.slug}
                  className="grid items-center gap-10 lg:gap-16 md:grid-cols-2 scroll-mt-24"
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <div className={`relative aspect-[5/4] overflow-hidden rounded-2xl ${imageBg}`}>
                      <Image
                        src={unsplash(s.imageId, 1400)}
                        alt={deAlt(s.imageId)}
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
                      0{i + 1} · {isMarketReady ? "Eigenes Verfahren" : "Leistung"}
                    </p>
                    <h2 className="section-h2 mt-3 text-ink-900">{s.title}</h2>
                    <p className="mt-5 text-lg text-ink-600 leading-relaxed">{s.summary}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link href={`/services/${s.slug}`} className="btn-primary text-sm">
                        Leistung ansehen <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
                      >
                        Beratung anfragen <ArrowRight className="h-4 w-4" />
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
