import { useTranslations } from "next-intl";
import MultilingualGreeting from "./MultilingualGreeting";
import PageHero from "./PageHero";
import HeroGlobe from "./HeroGlobe";
import { homeHeroSlides } from "@/lib/images";

// Home hero — a full world-map globe on a clean solid-navy field, with a
// single clear call to action. The three statements stack on their own
// lines, with "Growth across markets." as the close.
export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  return (
    <PageHero
      slides={homeHeroSlides}
      solidBackground
      eyebrow={t("credential")}
      backgroundExtra={<HeroGlobe />}
      pre={
        <div className="text-base sm:text-lg font-display font-medium text-white/60">
          <MultilingualGreeting />
          <span className="text-white/25">.</span>
        </div>
      }
      title={
        <span className="block">
          <span className="block">{t("line1")}</span>
          <span className="block text-gradient-light">{t("line2")}</span>
          <span className="block">{t("line3")}</span>
        </span>
      }
      subtitle={t("subhead")}
      ctas={[{ label: tc("talkToExpert"), href: "/contact" }]}
    />
  );
}
