import Link from "next/link";
import { ArrowRight, FileText, Folder } from "lucide-react";

// Three-column CTA block modeled on languagewire.com/services. Column 1 is
// the lead (dark filled button); columns 2 and 3 are quiet secondary
// actions (line icon + heading + line link). Used at the bottom of /services,
// the homepage, and individual service detail pages.
export default function ServiceCTAGrid() {
  return (
    <div className="container-wide">
      <div className="rounded-3xl border border-ink-200/80 bg-white p-8 md:p-12">
        <div className="grid gap-10 md:gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:items-start">
          {/* Lead column */}
          <div className="md:pr-6 md:border-r md:border-ink-200/80">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-ink-900 leading-tight">
              Need a smarter localization setup?
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Get personalised guidance on the right approach for your content, data, and growth.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Secondary column: Start a project */}
          <div className="md:pr-6 md:border-r md:border-ink-200/80">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
            >
              <FileText className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">
              Start a project
            </h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              Have a file or brief ready? Tell us your languages and timeline.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Secondary column: Case studies */}
          <div>
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
            >
              <Folder className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">
              Work we&apos;ve delivered
            </h3>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">
              See how teams use GlobalAnnotate to go global.
            </p>
            <Link
              href="/portfolio"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
            >
              See case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
