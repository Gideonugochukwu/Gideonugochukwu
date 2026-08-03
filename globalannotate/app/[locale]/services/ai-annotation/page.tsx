import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { ogImages, OG_IMAGE_URL } from "@/lib/i18n-meta";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const TITLE = "AI Annotation & Data Labeling for ML Teams";
const DESCRIPTION =
  "High-precision training data for computer vision, NLP, and LLM teams — bounding boxes, semantic segmentation, audio, and text annotation with rigorous QA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/services/ai-annotation` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/services/ai-annotation`,
    type: "website",
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

const FAQ = [
  {
    q: "What tooling do you use?",
    a: "We work in your tooling (Labelbox, CVAT, Scale, V7, Roboflow, Encord, Label Studio) or stand up our own pipelines.",
  },
  {
    q: "How do you guarantee quality?",
    a: "Every program runs gold-set calibration, multi-pass review, and inter-annotator agreement tracking with a QA report per batch.",
  },
  {
    q: "How quickly can you scale?",
    a: "We can ramp from a 5-person specialist team to 100+ annotators in two weeks, with no drop in quality.",
  },
  {
    q: "Can you handle sensitive data?",
    a: "Yes — NDAs, role-based access, audit logs, and regional data handling.",
  },
  {
    q: "Do you do RLHF / LLM preference data?",
    a: "Yes. Instruction following, harmlessness reviews, ranking, red-teaming, and domain evals are core specialties.",
  },
];

// FAQPage JSON-LD content — the canonical, GEO-optimized Q&A surfaced to
// search engines and AI systems. Kept distinct from the visible `FAQ` above
// (which drives the on-page accordion) so the page content stays unchanged.
const SCHEMA_FAQ = [
  {
    q: "What is AI data annotation?",
    a: "AI data annotation is the process of labeling data (text, images, audio, video) so machine learning models can learn from it. This includes tasks like sentiment labeling, named entity recognition, image classification, and speech transcription.",
  },
  {
    q: "What languages can you annotate in?",
    a: "We provide annotation in 100+ languages with native speakers, including African languages like Hausa, Yoruba, Amharic, and Swahili that most annotation vendors cannot cover.",
  },
  {
    q: "What quality standards do you use for annotation?",
    a: "We use gold-set calibration, inter-annotator agreement (IAA) measurement, and documented QA reporting on every project.",
  },
  {
    q: "What types of annotation do you support?",
    a: "Text classification, sentiment analysis, NER, intent detection, RLHF preference pairs, safety evaluation, image labeling, audio transcription, and speech evaluation.",
  },
  {
    q: "What is your minimum project size?",
    a: "We handle projects from 500 data points to 100,000+. Contact us with your specific requirements for a custom quote.",
  },
];

export default function Page() {
  const url = `${site.url}/services/ai-annotation`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "AI Annotation & Data Labeling",
            description: DESCRIPTION,
            url,
          }),
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "AI Annotation & Data Labeling", url },
          ]),
        ]}
      />
      <ServicePage
        serviceSlug="ai-annotation"
        eyebrow="AI Annotation & Data Labeling"
        title="Training data your models can trust."
        intro="Clean, consistent, well-documented labels for computer vision, NLP, and LLM teams — from pilot to production scale."
        heroSlideId={img.services.aiAnnotation.id}
        heroSlideAlt={img.services.aiAnnotation.alt}
        included={[
          {
            title: "Image annotation",
            body: "Bounding boxes, polygons, keypoints, 3D cuboids — any volume, with class-level QA.",
          },
          {
            title: "Semantic & instance segmentation",
            body: "Pixel-precise masks for autonomous driving, medical imaging, and retail.",
          },
          {
            title: "NLP & LLM data",
            body: "Intent labels, entity extraction, preference data, RLHF, and evals.",
          },
          {
            title: "Audio annotation",
            body: "Transcription, speaker diarization, emotion and event tagging in 50+ languages.",
          },
          {
            title: "Video annotation",
            body: "Frame-by-frame object tracking, action classification, temporal segmentation.",
          },
          {
            title: "QA & calibration",
            body: "Multi-pass review, gold-set calibration, inter-annotator agreement reports.",
          },
        ]}
        useCases={[
          {
            title: "Computer vision teams",
            body: "Production-grade datasets for detection, segmentation, OCR, and pose estimation.",
          },
          {
            title: "LLM & RAG teams",
            body: "Preference pairs, evals, red-team prompts, and domain-specific instructions.",
          },
          {
            title: "Voice & speech AI",
            body: "Multi-language transcription, accent-balanced datasets, and audio event labels.",
          },
          {
            title: "Robotics & autonomy",
            body: "3D cuboids, point cloud annotation, and sensor-fusion labels at scale.",
          },
        ]}
        tiers={[
          {
            name: "Pilot",
            price: "From $499",
            cadence: "/ batch",
            description: "Right-sized pilots to validate quality before scaling.",
            features: [
              "Up to 1,000 items",
              "Single task type",
              "Gold-set calibration",
              "QA report included",
            ],
          },
          {
            name: "Production",
            price: "From $0.05",
            cadence: "/ item",
            description: "Continuous labeling pipelines for active model development.",
            features: [
              "Dedicated annotation team",
              "Weekly delivery cadence",
              "Inter-annotator agreement reports",
              "Custom schemas & tooling",
              "Slack-based collaboration",
            ],
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "Regulated, sensitive, or massive-scale programs.",
            features: [
              "On-premise / VPC delivery",
              "SOC2-aligned controls",
              "Regional data residency",
              "24/7 program management",
              "Bespoke tooling integrations",
            ],
          },
        ]}
        faq={FAQ}
      />
    </>
  );
}
