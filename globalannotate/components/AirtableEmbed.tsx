"use client";

import { useState } from "react";

// Embedded Airtable freelancer application form.
//
// - The container is a fixed height with `overflow-hidden`; the iframe is 60px
//   taller so Airtable's branding footer is clipped off the bottom. The
//   container is taller on mobile, where the form stacks vertically.
// - A branded emerald shimmer skeleton (fake form fields) shows immediately and
//   fades out once the iframe's onLoad fires, so there's no blank gap while the
//   form loads. `loading="eager"` asks the browser to prioritise it.
// - Rounded corners + emerald glow shadow styling are kept on the container.
export default function AirtableEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)] ring-1 ring-brand-100 h-[1660px] sm:h-[1500px] md:h-[1200px]">
      {!loaded && <FormSkeleton />}
      <iframe
        title="GlobalAnnotate freelancer application form"
        src="https://airtable.com/embed/apph9BiJQVio8ZIrJ/pagLATGP3cXeCVrts/form"
        loading="eager"
        onLoad={() => setLoaded(true)}
        className="block w-full h-[1720px] sm:h-[1560px] md:h-[1260px] transition-opacity duration-700 ease-out"
        style={{ background: "transparent", border: 0, opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

// Skeleton placeholder that mirrors the real form's shape: a heading, stacked
// input boxes (some side-by-side), a dropdown, a textarea, and a submit button.
// Each shape animates with the shared `.ga-shimmer` emerald sweep.
function FormSkeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-10 overflow-hidden bg-white px-6 py-8 sm:px-8 sm:py-10"
    >
      {/* Title */}
      <div className="ga-shimmer h-7 w-2/3 rounded-lg" />
      <div className="ga-shimmer mt-3 h-4 w-1/2 rounded" />

      {/* Field group */}
      <div className="mt-10 space-y-7">
        <SkeletonField />
        <SkeletonField />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SkeletonField />
          <SkeletonField />
        </div>
        {/* Dropdown */}
        <div>
          <div className="ga-shimmer h-3.5 w-28 rounded" />
          <div className="ga-shimmer mt-2.5 h-11 w-full rounded-lg" />
        </div>
        <SkeletonField />
        {/* Textarea */}
        <div>
          <div className="ga-shimmer h-3.5 w-40 rounded" />
          <div className="ga-shimmer mt-2.5 h-28 w-full rounded-lg" />
        </div>
      </div>

      {/* Submit button */}
      <div className="ga-shimmer mt-9 h-12 w-44 rounded-xl" />
    </div>
  );
}

function SkeletonField() {
  return (
    <div>
      <div className="ga-shimmer h-3.5 w-32 rounded" />
      <div className="ga-shimmer mt-2.5 h-11 w-full rounded-lg" />
    </div>
  );
}
