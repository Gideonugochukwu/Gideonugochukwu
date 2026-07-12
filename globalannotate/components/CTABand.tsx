import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function CTABand() {
  return (
    <div className="container-wide">
      <div
        className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-white"
        style={{
          // Two-tone brand band: navy holds the top-left (where the heading +
          // subtext sit, for strong white-on-navy contrast) and blends
          // smoothly into emerald toward the bottom-right (behind the
          // buttons). Diagonal so it reads well on desktop and when it stacks
          // on mobile. No pattern, no texture — just the two brand colours.
          background:
            "linear-gradient(120deg, #0F172A 0%, #0F172A 46%, #10B981 100%)",
        }}
      >
        <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 items-end">
          <div>
            <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-white">
              Ready to grow globally?
            </h3>
            <p className="mt-4 text-white/90 max-w-xl leading-relaxed text-lg">
              Tell us about your project and we&apos;ll get back to you within one business day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link
              href="/contact"
              className="btn-on-dark px-5 py-3 rounded-xl"
            >
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              <Mail className="h-4 w-4" /> {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
