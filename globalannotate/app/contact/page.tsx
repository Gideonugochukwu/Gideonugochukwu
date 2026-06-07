import type { Metadata } from "next";
import Section from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import { Mail, Globe2, Clock4 } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. We'll reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 hero-glow" />
        <div className="container-wide relative pt-20 pb-12">
          <span className="badge">Get in touch</span>
          <h1 className="display-hero mt-5 max-w-3xl text-4xl md:text-6xl lg:text-7xl">
            Tell us about your project.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-ink-600 leading-relaxed">
            We&apos;ll reply within one business day with a tailored proposal.
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
                General questions, partnerships, or careers.
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
                Within one business day. Most replies are same-day.
              </p>
            </div>

            <div className="card p-6">
              <Globe2 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Where we work</h3>
              <p className="mt-1 text-sm text-ink-600">
                Native specialists across 30+ countries. Aligned to your time zone.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Get a quote or order a service
            </h2>
            <p className="mt-3 text-ink-600">
              The more context you share, the sharper our proposal.
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
