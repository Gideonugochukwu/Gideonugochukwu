import type { Metadata } from "next";
import Section from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import { Mail, Globe2, Clock4 } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project and we'll respond within one business day with a tailored proposal.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 hero-glow" />
        <div aria-hidden className="absolute inset-0 hero-grid" />
        <div className="container-wide relative pt-20 pb-12">
          <span className="badge">Get in touch</span>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Tell us about your project.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-600 leading-relaxed">
            Fill in a few details and you&apos;ll hear back from a senior team
            member within one business day — with a tailored proposal and a
            clear next step.
          </p>
        </div>
      </section>

      <Section className="pt-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div className="space-y-6">
            <div className="card p-6">
              <Mail className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Email us directly</h3>
              <p className="mt-1 text-sm text-ink-600">
                For general questions, partnerships, or careers.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block font-medium text-ink-900 hover:text-brand-700 transition"
              >
                {site.email}
              </a>
            </div>

            <div className="card p-6">
              <Clock4 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Response time</h3>
              <p className="mt-1 text-sm text-ink-600">
                Within one business day, every time. Most replies are same-day.
              </p>
            </div>

            <div className="card p-6">
              <Globe2 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Where we work</h3>
              <p className="mt-1 text-sm text-ink-600">
                Native specialists across 30+ countries. Project leads aligned
                to your time zone.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Get a quote or order a service
            </h2>
            <p className="mt-2 text-ink-600">
              The more context you share, the sharper our proposal will be.
            </p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
