"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

// Localized error boundary for every [locale] route. Mirrors the 404 page.
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("errorPage");
  return (
    <section className="relative overflow-hidden">
      <div className="container-wide relative py-28 md:py-36 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 border border-brand-200">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="page-h1 mt-6 text-ink-900">{t("title")}</h1>
        <p className="mt-4 text-lg text-ink-600 max-w-lg mx-auto">{t("body")}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            <RotateCcw className="h-4 w-4" /> {t("retry")}
          </button>
          <Link href="/" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" /> {t("back")}
          </Link>
        </div>
      </div>
    </section>
  );
}
