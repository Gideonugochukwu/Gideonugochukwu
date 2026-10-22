import { organizationSchema, websiteSchema } from "./schema";
import { founder } from "./site";
import { zhLd } from "./zh";

// Chinese copies of the site-wide Organization + WebSite JSON-LD rendered by
// the layout on /zh. Types, URLs, logo, and sameAs are unchanged; only the
// human-readable fields are translated, and each block carries inLanguage.
export const ZH_ORG_DESCRIPTION =
  "GlobalAnnotate 是一家专注非洲语言的翻译与本地化公司，提供 100+ 种语言的翻译、本地化、AI 数据标注、多语言 SEO 与数字营销服务，并以 MarketReady™ 文化验证确保内容在目标市场真正有效。";

export const ZH_FOUNDER_ROLE = "创始人兼首席语言专家";

export function organizationSchemaZh() {
  const org = organizationSchema();
  return {
    ...org,
    description: ZH_ORG_DESCRIPTION,
    founder: { ...org.founder, jobTitle: ZH_FOUNDER_ROLE },
    contactPoint: {
      ...org.contactPoint,
      contactType: "客户支持",
      areaServed: "全球",
      availableLanguage: ["英语", "德语", "中文"],
    },
  };
}

export function personSchemaZh() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: ZH_FOUNDER_ROLE,
    worksFor: { "@type": "Organization", name: "GlobalAnnotate", url: "https://globalannotate.com" },
    url: "https://globalannotate.com/zh/about",
    image: founder.image,
    sameAs: founder.sameAs,
    description:
      "Gideon Ugochukwu 是 GlobalAnnotate 的创始人兼首席语言专家，带领团队提供覆盖 100+ 种语言的翻译、AI 数据标注、数字营销与 SEO 服务。",
  };
}

export function siteSchemasZh() {
  return zhLd([
    organizationSchemaZh(),
    { ...websiteSchema(), alternateName: "GlobalAnnotate 翻译" },
  ]);
}
