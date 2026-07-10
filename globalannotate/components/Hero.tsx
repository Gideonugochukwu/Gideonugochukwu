import MultilingualGreeting from "./MultilingualGreeting";
import PageHero from "./PageHero";
import HeroGlobe from "./HeroGlobe";
import { homeHeroSlides } from "@/lib/images";

// Home hero — a full world-map globe on a clean solid-navy field, with a
// single clear call to action. The three statements stack on their own
// lines, with "Growth across markets." as the close.
export default function Hero() {
  return (
    <PageHero
      slides={homeHeroSlides}
      solidBackground
      backgroundExtra={<HeroGlobe />}
      pre={
        <div className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white/80">
          <MultilingualGreeting />
          <span className="text-white/35">.</span>
        </div>
      }
      title={
        <span className="block">
          <span className="block">Precision across languages.</span>
          <span className="block text-gradient-light">
            Intelligence across data.
          </span>
          <span className="mt-2 sm:mt-3 block">Growth across markets.</span>
        </span>
      }
      subtitle="One partner for localization, AI training data, multilingual SEO, and growth marketing."
      ctas={[{ label: "Talk to an expert", href: "/contact" }]}
    />
  );
}
