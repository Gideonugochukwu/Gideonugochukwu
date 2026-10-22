import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { deAlt } from "@/lib/images.de";
import { deLd, DE_HOME } from "@/lib/de";
import type { DeServiceContent } from "@/content/de/types";

// German rendering of a /services/[slug] page: the shared ServicePage layout
// fed with translated content, plus German JSON-LD (inLanguage "de").
export default function DeServicePage({
  slug,
  heroSlideId,
  content: c,
}: {
  slug: string;
  heroSlideId: string;
  content: DeServiceContent;
}) {
  const url = `${site.url}/de/services/${slug}`;
  return (
    <>
      <JsonLd
        data={deLd([
          serviceSchema({
            name: c.schemaName,
            description: c.schemaDescription,
            url,
            areaServed: "Weltweit",
          }),
          faqSchema(c.schemaFaq),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Leistungen", url: `${site.url}/de/services` },
            { name: c.schemaName, url },
          ]),
        ])}
      />
      <ServicePage
        serviceSlug={slug}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        heroSlideId={heroSlideId}
        heroSlideAlt={deAlt(heroSlideId)}
        included={c.included}
        useCases={c.useCases}
        tiers={c.tiers}
        faq={c.faq}
      />
    </>
  );
}
