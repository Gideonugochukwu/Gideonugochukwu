import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ImpressumDe, { DE_META } from "@/components/de/ImpressumDe";
import { deMetadata } from "@/lib/de";

// German-only page: the Impressum exists on /de; other locales 404.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  return deMetadata({ path: "/impressum", ...DE_META, deOnly: true });
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  setRequestLocale(locale);
  return <ImpressumDe />;
}
