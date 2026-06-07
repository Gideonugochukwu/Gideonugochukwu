// Curated Unsplash photo IDs. All royalty-free under the Unsplash License
// (free for commercial and non-commercial use, no attribution required).
// Swap any entry by replacing its `id` with another Unsplash photo ID.

type ImageRef = { id: string; alt: string };

const base = "https://images.unsplash.com/photo-";

export function unsplash(id: string, width: number, quality = 80) {
  return `${base}${id}?w=${width}&q=${quality}&auto=format&fit=crop`;
}

export const img = {
  hero: {
    id: "1521737711867-e3b97375f902",
    alt: "Diverse team collaborating around a laptop in a bright modern workspace",
  },
  services: {
    translation: {
      id: "1521791136064-7986c2920216",
      alt: "People joining hands, symbolising global communication and collaboration",
    },
    aiAnnotation: {
      id: "1551288049-bebda4e38f71",
      alt: "Analyst reviewing data on multiple monitors representing AI training data",
    },
    digitalMarketing: {
      id: "1460925895917-afdab827c52f",
      alt: "Analytics dashboard with growth charts on a laptop screen",
    },
  },
  industries: {
    ecommerce: { id: "1607082348824-0a96f2a4b9da", alt: "Smartphone with shopping bags representing e-commerce" },
    technology: { id: "1518770660439-4636190af475", alt: "Macro photograph of a circuit board representing technology" },
    healthcare: { id: "1576091160399-112ba8d25d1d", alt: "Modern hospital interior representing healthcare" },
    gaming: { id: "1542751371-adc38448a05e", alt: "Person gaming with controller representing the gaming industry" },
    finance: { id: "1611974789855-9c2a0a7236a3", alt: "Stock market charts representing finance" },
    travel: { id: "1488646953014-85cb44e25828", alt: "World map and travel planning representing travel and hospitality" },
    media: { id: "1493863641943-9b68992a8d07", alt: "Film clapperboard representing media and entertainment" },
    education: { id: "1523580494863-6f3031224c94", alt: "Students collaborating representing education" },
  },
  portfolio: {
    healthApp: { id: "1576091160550-2173dba999ef", alt: "Doctor using a smartphone health app" },
    robotics: { id: "1485827404703-89b55fcc595e", alt: "Humanoid robot representing robotics and autonomy" },
    beautyBrand: { id: "1522335789203-aaa2f6d2a4cc", alt: "Premium cosmetics product photography" },
    llmDataset: { id: "1620712943543-bcc4688e7485", alt: "Abstract data visualisation representing language model training data" },
    uaeLaunch: { id: "1512453979798-5ea266f8880c", alt: "Modern Dubai skyline at dusk" },
    indiaNlp: { id: "1524492412937-b28074a5d7da", alt: "Students learning on tablets representing multilingual NLP" },
  },
  about: {
    team: { id: "1522071820081-009f0129c71c", alt: "Diverse team meeting in a modern office" },
    office: { id: "1497366216548-37526070297c", alt: "Bright modern office with collaborative desks" },
    collaboration: { id: "1573497019940-1c28c88b4f3e", alt: "Two colleagues collaborating on a laptop" },
  },
} satisfies Record<string, ImageRef | Record<string, ImageRef>>;
