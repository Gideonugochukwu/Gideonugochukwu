import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import DeLandingPage from "@/components/de/DeLandingPage";
import { lokalisierungSpieleDe } from "@/content/de/landing/lokalisierung-spiele";
import { portfolioHeroSlides } from "@/lib/images";
import { deMetadata } from "@/lib/de";

// German-only landing page for Google.de / .at / .ch; other locales 404.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  return deMetadata({ path: "/lokalisierung-spiele", ...lokalisierungSpieleDe.meta, deOnly: true });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  setRequestLocale(locale);
  return <DeLandingPage path="/lokalisierung-spiele" content={lokalisierungSpieleDe} slides={portfolioHeroSlides} />;
}
