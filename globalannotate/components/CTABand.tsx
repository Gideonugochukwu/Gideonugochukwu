import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function CTABand() {
  return (
    <div className="container-wide">
      <div
        className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-white"
        style={{
          background:
            "linear-gradient(120deg, #0f172a 0%, #064e3b 60%, #10b981 130%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 80% at 80% 0%, rgba(255,255,255,0.18), transparent 60%)",
          }}
        />
        <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 items-end">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Ready to scale globally — without the chaos?
            </h3>
            <p className="mt-4 text-white/80 max-w-xl leading-relaxed">
              Tell us about your project. You&apos;ll hear back within one
              business day with a tailored proposal and a clear next step.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-900 px-5 py-3 font-semibold hover:bg-brand-50 transition"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              <Mail className="h-4 w-4" /> {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
