import { site, activeSocialLinks, founder } from "./site";

type Crumb = { name: string; url: string };

// Person schema for the founder. Used standalone on /about and inlined
// (via personSchemaShort) as the Organization's "founder" and every blog
// post's "author".
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    url: founder.profileUrl,
    image: founder.image,
    sameAs: founder.sameAs,
    description: founder.description,
  };
}

function personSchemaShort() {
  return {
    "@type": "Person",
    name: founder.name,
    url: founder.profileUrl,
    jobTitle: founder.role,
    image: founder.image,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: site.logo,
    email: site.email,
    description: site.description,
    founder: personSchemaShort(),
    // Company socials plus the founder's profiles (personal LinkedIn, ProZ)
    // so the org and person graphs corroborate each other. Deduplicated —
    // the two lists overlap on the company pages.
    sameAs: Array.from(
      new Set([...activeSocialLinks().map((s) => s.href), ...founder.sameAs])
    ),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function serviceSchema({
  name,
  description,
  url,
  areaServed = "Worldwide",
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: serviceType ?? name,
    areaServed,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

// ItemList — the schema structure AI systems parse and cite most easily.
// Used by /languages to enumerate every language we cover as ordered
// ListItems. `url` (optional) anchors the list to the page it lives on.
export function itemListSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description?: string;
  url?: string;
  items: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    ...(description ? { description } : {}),
    ...(url ? { url } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item,
    })),
  };
}

// LocalBusiness — used by the geo landing pages (/translation-services-nigeria)
// so local search and AI systems associate GlobalAnnotate with a physical
// place and service area. Telephone is intentionally omitted until a real,
// published number exists; email carries the contact signal instead.
export function localBusinessSchema({
  name = site.name,
  description,
  url = site.url,
  email = site.email,
  addressLocality,
  addressRegion,
  addressCountry,
  areaServed,
  serviceType,
}: {
  name?: string;
  description: string;
  url?: string;
  email?: string;
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
  areaServed: string | string[];
  serviceType: string | string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    email,
    logo: site.logo,
    image: site.logo,
    address: {
      "@type": "PostalAddress",
      addressLocality,
      ...(addressRegion ? { addressRegion } : {}),
      addressCountry,
    },
    areaServed,
    serviceType,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: url,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: founder.name,
      url: founder.profileUrl,
      jobTitle: founder.role,
      image: founder.image,
      sameAs: founder.sameAs,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: site.logo },
    },
    image: image ? [image] : undefined,
  };
}

// Generic review shape accepted by reviewListingSchema. Mirrors the public
// display: schemaAuthor follows the review's displayMode so JSON-LD never
// leaks a name the visible page is hiding.
type SchemaReview = {
  schemaAuthor: string;
  rating: number;
  quote: string;
  date: string;
};

export function reviewListingSchema({
  itemName,
  reviews,
}: {
  itemName: string;
  reviews: SchemaReview[];
}) {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(2),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.schemaAuthor },
      datePublished: r.date,
      reviewBody: r.quote,
      itemReviewed: { "@type": "Organization", name: itemName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };
}
