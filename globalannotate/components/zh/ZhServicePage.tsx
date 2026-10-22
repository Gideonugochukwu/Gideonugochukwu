import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { zhAlt } from "@/lib/images.zh";
import { zhLd, ZH_HOME } from "@/lib/zh";
import type { ZhServiceContent } from "@/content/zh/types";

// Chinese rendering of a /services/[slug] page: the shared ServicePage
// layout fed with translated content, plus zh JSON-LD (inLanguage zh-CN).
export default function ZhServicePage({
  slug,
  heroSlideId,
  content: c,
}: {
  slug: string;
  heroSlideId: string;
  content: ZhServiceContent;
}) {
  const url = `${site.url}/zh/services/${slug}`;
  return (
    <>
      <JsonLd
        data={zhLd([
          serviceSchema({
            name: c.schemaName,
            description: c.schemaDescription,
            url,
            areaServed: "全球",
          }),
          faqSchema(c.schemaFaq),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "服务", url: `${site.url}/zh/services` },
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
        heroSlideAlt={zhAlt(heroSlideId)}
        included={c.included}
        useCases={c.useCases}
        tiers={c.tiers}
        faq={c.faq}
      />
    </>
  );
}
