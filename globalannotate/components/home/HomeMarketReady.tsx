import { ShieldCheck, ArrowUpRight, Users, FileCheck2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "../Reveal";

// Homepage differentiator section for MarketReady™. Clean and minimal, with a
// subtle emerald frame so it reads as something special without shouting.
export default function HomeMarketReady() {
  const t = useTranslations("marketready");
  return (
    <div className="container-wide">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-14">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
                <ShieldCheck className="h-3.5 w-3.5" /> {t("badge")}
              </p>
              <h2 className="section-h2 mt-5 text-ink-900">
                {t("heading")}
              </h2>
              <p className="mt-5 text-base sm:text-lg text-ink-600 leading-relaxed">
                {t("description")}
              </p>
              <Link
                href="/services/marketready"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition group"
              >
                {t("learnMore")}
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <li className="flex items-start gap-3 rounded-2xl bg-white p-4">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.75} />
                <span className="text-sm text-ink-700 leading-relaxed">
                  <strong className="font-semibold text-ink-900">{t("bullet1Strong")}</strong>{t("bullet1")}
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white p-4">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.75} />
                <span className="text-sm text-ink-700 leading-relaxed">
                  <strong className="font-semibold text-ink-900">{t("bullet2Strong")}</strong>{t("bullet2")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
