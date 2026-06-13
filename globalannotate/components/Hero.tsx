import MultilingualGreeting from "./MultilingualGreeting";
import PageHero from "./PageHero";
import { homeHeroSlides } from "@/lib/images";

// Home hero uses the shared PageHero — same slideshow + dark overlay + type
// scale as every other page. The only extra is the animated multilingual
// greeting before the headline.
export default function Hero() {
  return (
    <PageHero
      slides={homeHeroSlides}
      pre={
        <div className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white/80">
          <MultilingualGreeting />
          <span className="text-white/35">.</span>
        </div>
      }
      title={
        <>
          Precision across languages.{" "}
          <span className="text-gradient-light">Intelligence across data.</span>{" "}
          Growth across markets.
        </>
      }
      subtitle="One partner for localization, AI training data, multilingual SEO, and growth marketing."
      ctas={[
        { label: "Talk to an expert", href: "/contact" },
        { label: "Explore services", href: "/services", variant: "ghost" },
      ]}
    />
  );
}
