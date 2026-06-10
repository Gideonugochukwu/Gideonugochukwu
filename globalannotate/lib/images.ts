// Curated Unsplash photo IDs. All royalty-free under the Unsplash License
// (free for commercial and non-commercial use, no attribution required).
//
// Picks favour widely-downloaded "Editorial" Unsplash photos that have been
// live for years and are therefore very unlikely to disappear. If any URL
// ever does 404, every image container on the site has a dark→emerald
// gradient fallback (see lib/imageBg) so the layout still looks intentional.
//
// Swap any entry by replacing its `id` with another Unsplash photo ID.

type ImageRef = { id: string; alt: string };

const base = "https://images.unsplash.com/photo-";

export function unsplash(id: string, width: number, quality = 80) {
  return `${base}${id}?w=${width}&q=${quality}&auto=format&fit=crop`;
}

// Reusable CSS background applied to every image container. Renders a
// dark-to-emerald gradient so a slow or broken image never looks like a
// hollow box — it looks like an intentional brand panel with the overlay
// text on top.
export const imageBg =
  "bg-gradient-to-br from-ink-900 via-ink-800 to-brand-800";

export const img = {
  // Atmospheric hero — diverse team collaborating in a bright workspace.
  // Annie Spratt, one of the most-downloaded Unsplash editorial photos.
  hero: {
    id: "1521737711867-e3b97375f902",
    alt: "Diverse team collaborating around a laptop in a bright modern workspace",
  },
  services: {
    // Hannah Busing's hands-joining photo — symbolises global communication.
    translation: {
      id: "1521791136064-7986c2920216",
      alt: "Hands of people from many backgrounds joining together, symbolising global communication",
    },
    // Christina Morillo — woman programmer at a workstation; widely used,
    // professional, unambiguously about technical work.
    aiAnnotation: {
      id: "1573164713988-8665fc963095",
      alt: "Engineer reviewing code and data on a workstation",
    },
    // Carlos Muza analytics dashboard — historically Unsplash's most-downloaded
    // business photo, perfect for performance marketing.
    digitalMarketing: {
      id: "1460925895917-afdab827c52f",
      alt: "Analytics dashboard with growth charts on a laptop screen",
    },
    // Myriam Jessier — laptop showing search analytics / ranking data. Reads
    // unambiguously as "SEO / search visibility / growth".
    seo: {
      id: "1551288049-bebda4e38f71",
      alt: "Laptop showing search analytics and keyword ranking data",
    },
  },
  industries: {
    // freestocks shopping bags — instantly reads as e-commerce.
    ecommerce: {
      id: "1483985988355-763728e1935b",
      alt: "Shopping bags representing online retail and e-commerce",
    },
    // Alina Grubnyak circuit-board macro — flagship Unsplash tech photo.
    technology: {
      id: "1518770660439-4636190af475",
      alt: "Macro photograph of a green circuit board representing technology",
    },
    // National Cancer Institute clinical setting — clearly medical, professional.
    healthcare: {
      id: "1538108149393-fbbd81895907",
      alt: "Clinician working in a modern healthcare environment",
    },
    // Sean Do gaming setup with controller — clearly a real gaming context.
    gaming: {
      id: "1493711662062-fa541adb3fc8",
      alt: "Wireless gaming controller representing the gaming industry",
    },
    // Markus Spiske trading charts — clearly finance.
    finance: {
      id: "1611974789855-9c2a0a7236a3",
      alt: "Stock market charts representing finance and fintech",
    },
    // JESHOOTS travel flat-lay with map and camera — iconic travel image.
    travel: {
      id: "1488646953014-85cb44e25828",
      alt: "Travel planning flat-lay with map, camera and notebook",
    },
    // Jakob Owens cinema camera — clearly media/entertainment.
    media: {
      id: "1485846234645-a62644f84728",
      alt: "Professional cinema camera representing media and entertainment",
    },
    // Priscilla du Preez students collaborating — very popular education image.
    education: {
      id: "1523580494863-6f3031224c94",
      alt: "Students collaborating around a table representing education",
    },
  },
  portfolio: {
    // National Cancer Institute clinician with a tablet — health-app context.
    healthApp: {
      id: "1576091160550-2173dba999ef",
      alt: "Clinician using a tablet device for a patient health application",
    },
    // Taylor Vick data center — replaces the toy-robot image. Real
    // infrastructure / perception-pipeline context, not cartoonish.
    robotics: {
      id: "1591453089816-0fbb971b454c",
      alt: "Rows of servers in a data center representing perception model training infrastructure",
    },
    // Mathilde Langevin skincare bottles flat-lay — replaces the previously
    // blank beauty image. Premium cosmetics aesthetic.
    beautyBrand: {
      id: "1571781926291-c477ebfd024b",
      alt: "Premium skincare product flat-lay for a sustainable beauty brand",
    },
    // Christina Morillo woman writing code — replaces the toy / cartoonish
    // visual with a real, professional data / engineering scene appropriate
    // for an LLM RLHF dataset case study.
    llmDataset: {
      id: "1573497019418-b400bb3ab074",
      alt: "Engineer writing code at a workstation representing language model dataset work",
    },
    // David Rodrigo Dubai skyline — clearly the UAE.
    uaeLaunch: {
      id: "1512453979798-5ea266f8880c",
      alt: "Modern Dubai skyline at dusk representing a UAE market launch",
    },
    // Note Thanun classroom — clearly multilingual education in South Asia.
    indiaNlp: {
      id: "1509062522246-3755977927d7",
      alt: "Multilingual classroom representing Indian language NLP datasets",
    },
    // National Cancer Institute clinical setting — clinicians + tablet. Widely
    // used, definitively professional, perfect for a telehealth app case study.
    telehealthApp: {
      id: "1505751172876-fa1923c5c528",
      alt: "Clinical team reviewing patient data on a tablet for a telehealth application",
    },
    // Lauren Fleischmann clothing rack — one of Unsplash's best-known DTC /
    // boutique fashion images. Reads instantly as e-commerce / fashion brand.
    dtcEcommerce: {
      id: "1441986300917-64674bd600d8",
      alt: "Boutique clothing rack representing a direct-to-consumer fashion brand",
    },
    // Nick Morrison desktop with laptop, glasses and notebook — the classic
    // Unsplash "online learning / studying" still life. Clean, real, on-brief.
    eLearning: {
      id: "1456406644174-8ddd4cd52a06",
      alt: "Laptop, notebook and glasses on a desk representing an online learning platform",
    },
  },
  about: {
    // Brooke Cagle team meeting — diverse modern workplace.
    team: {
      id: "1522071820081-009f0129c71c",
      alt: "Diverse team meeting in a modern office",
    },
    // Annie Spratt modern office desks — flagship Unsplash workplace photo.
    office: {
      id: "1497366216548-37526070297c",
      alt: "Bright modern office with collaborative desks",
    },
    // Retained for reference; the About page now uses the local founder photo.
    collaboration: {
      id: "1573497019940-1c28c88b4f3e",
      alt: "Two colleagues collaborating on a laptop",
    },
  },
} satisfies Record<string, ImageRef | Record<string, ImageRef>>;
