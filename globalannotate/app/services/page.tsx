import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Translation & localization, AI annotation & data labeling, and digital marketing — three integrated services to help you grow globally.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <span className="badge">Services</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            The full toolkit for going global, intelligently.
          </h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            Whether you need a single project or an end-to-end partner, our
            three core service lines work together — or independently — to
            help your team move faster across markets.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <ServiceCard
                slug={s.slug}
                title={s.title}
                summary={s.summary}
                icon={s.icon as "Brain" | "Languages" | "Megaphone"}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <Link
                href={`/services/${s.slug}`}
                id={s.slug}
                className="card p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-ink-600 leading-relaxed">{s.summary}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-medium text-brand-700 group-hover:gap-3 transition-all whitespace-nowrap">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
