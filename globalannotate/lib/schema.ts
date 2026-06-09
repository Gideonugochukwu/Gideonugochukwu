import { site, activeSocialLinks } from "./site";

type Crumb = { name: string; url: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: site.logo,
    email: site.email,
    description: site.description,
    sameAs: activeSocialLinks().map((s) => s.href),
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
  authorName,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
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
    author: { "@type": "Person", name: authorName },
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
