import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI Annotation & Data Labeling",
  description:
    "High-precision training data for computer vision, NLP, and LLM teams — bounding boxes, semantic segmentation, audio, and text annotation with rigorous QA.",
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="AI Annotation & Data Labeling"
      title="Training data your models can actually trust."
      intro="From bounding boxes and polygons to LLM preference data and audio transcription, our specialist annotators produce the clean, consistent, well-documented data that turns good models into great ones."
      included={[
        {
          title: "Image annotation",
          body: "Bounding boxes, polygons, keypoints, 3D cuboids — at any volume, with class-level QA.",
        },
        {
          title: "Semantic & instance segmentation",
          body: "Pixel-precise masks for autonomous driving, medical imaging, agriculture, and retail.",
        },
        {
          title: "NLP & LLM data",
          body: "Intent labels, entity extraction, summarization references, preference and RLHF data.",
        },
        {
          title: "Audio annotation",
          body: "Transcription, speaker diarization, emotion and event tagging across 50+ languages.",
        },
        {
          title: "Video annotation",
          body: "Frame-by-frame object tracking, action classification, and temporal segmentation.",
        },
        {
          title: "QA & calibration",
          body: "Multi-pass review, gold-set calibration, inter-annotator agreement reports.",
        },
      ]}
      useCases={[
        {
          title: "Computer vision teams",
          body: "Production-grade datasets for detection, segmentation, OCR, and pose estimation — delivered in your schema.",
        },
        {
          title: "LLM & RAG teams",
          body: "Preference pairs, evals, red-team prompts, and domain-specific instruction datasets.",
        },
        {
          title: "Voice & speech AI",
          body: "Multi-language transcription, accent-balanced datasets, and audio event labeling at scale.",
        },
        {
          title: "Robotics & autonomy",
          body: "3D cuboids, point cloud annotation, and sensor-fusion labels with strict consistency.",
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
            "On-premise / VPC delivery available",
            "SOC2-aligned controls",
            "Regional data residency",
            "24/7 program management",
            "Bespoke tooling integrations",
          ],
        },
      ]}
      faq={[
        {
          q: "What tooling do you use?",
          a: "We work in your tooling (Labelbox, CVAT, Scale, V7, Roboflow, Encord, Label Studio) or stand up our own pipelines when needed.",
        },
        {
          q: "How do you guarantee quality?",
          a: "Every program runs gold-set calibration, multi-pass review, and inter-annotator agreement tracking. You get a QA report with every batch.",
        },
        {
          q: "How quickly can you scale?",
          a: "We can ramp from a 5-person specialist team to 100+ annotators in two weeks, with no drop in quality.",
        },
        {
          q: "Can you handle sensitive data?",
          a: "Yes — NDAs, role-based access, audit logs, and regional data handling. Talk to us about your compliance needs.",
        },
        {
          q: "Do you do RLHF / LLM preference data?",
          a: "Yes. Instruction following, harmlessness reviews, ranking, red-teaming, and domain-specific evaluation sets are core specialties.",
        },
      ]}
    />
  );
}
