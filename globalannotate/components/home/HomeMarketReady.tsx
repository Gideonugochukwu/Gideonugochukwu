import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Users, FileCheck2 } from "lucide-react";
import Reveal from "../Reveal";

// Homepage differentiator section for MarketReady™. Clean and minimal, with a
// subtle emerald frame so it reads as something special without shouting.
export default function HomeMarketReady() {
  return (
    <div className="container-wide">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-14">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
                <ShieldCheck className="h-3.5 w-3.5" /> MarketReady™ · Proprietary
              </p>
              <h2 className="section-h2 mt-5 text-ink-900">
                The only translation agency that guarantees market-readiness.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-ink-600 leading-relaxed">
                Every other agency checks whether words are correct.
                MarketReady™ checks whether your content actually works —
                validated by real native users in your target market before
                launch.
              </p>
              <Link
                href="/services/marketready"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition group"
              >
                Learn more about MarketReady™
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.75} />
                <span className="text-sm text-ink-700 leading-relaxed">
                  <strong className="font-semibold text-ink-900">Real native users</strong> — not translators — review your content blind.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.75} />
                <span className="text-sm text-ink-700 leading-relaxed">
                  <strong className="font-semibold text-ink-900">A signed report</strong> certifying your content is ready to launch.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
