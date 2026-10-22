import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import DeLandingPage from "@/components/de/DeLandingPage";
import { uebersetzungAfrikaDe } from "@/content/de/landing/uebersetzung-afrika";
import { servicesHeroSlides } from "@/lib/images";
import { deMetadata } from "@/lib/de";

// German-only landing page for Google.de / .at / .ch; other locales 404.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  return deMetadata({ path: "/uebersetzung-afrika", ...uebersetzungAfrikaDe.meta, deOnly: true });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  setRequestLocale(locale);
  return <DeLandingPage path="/uebersetzung-afrika" content={uebersetzungAfrikaDe} slides={servicesHeroSlides} />;
}
