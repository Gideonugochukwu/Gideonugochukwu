import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 hero-glow" />
      <div aria-hidden className="absolute inset-0 hero-grid-dark" />
      <div className="container-wide relative py-28 md:py-36 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 border border-brand-200">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="page-h1 mt-6 text-ink-900">{t("title")}</h1>
        <p className="mt-4 text-lg text-ink-600 max-w-lg mx-auto">{t("body")}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" /> {t("back")}
          </Link>
          <Link href="/services" className="btn-secondary">
            {t("explore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
