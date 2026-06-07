import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 hero-glow" />
      <div aria-hidden className="absolute inset-0 hero-grid-dark" />
      <div className="container-wide relative py-28 md:py-36 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 border border-brand-200">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight">
          Lost in translation.
        </h1>
        <p className="mt-4 text-lg text-ink-600 max-w-lg mx-auto">
          That page doesn&apos;t exist — or has been moved. Let&apos;s get you
          back to somewhere useful.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <Link href="/services" className="btn-secondary">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
