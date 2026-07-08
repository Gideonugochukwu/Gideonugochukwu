import {
  CONTINENT_LOGOS,
  CONTINENT_LOGOS_ENABLED,
  GA_A_MARK_PATH,
  type ContinentLogo,
} from "@/lib/continents";

// Renders one continent mark: the swappable continental symbol stacked over
// the shared GlobalAnnotate "A". Single-color via currentColor so callers
// control the fill (white on the hero) with a text-* class.
export function ContinentLogoSvg({
  logo,
  className = "",
}: {
  logo: ContinentLogo;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`GlobalAnnotate — ${logo.name} (${logo.symbol})`}
    >
      <path d={logo.symbolPath} fill="currentColor" />
      <path d={GA_A_MARK_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

// Mobile fallback for the hero: the 3D globe is desktop-only, so below md
// the marks line up in a horizontal row under the headline/CTAs. Breathing
// uses the same CSS animation as the globe overlay, staggered per mark.
export function ContinentLogoRow({
  logos = CONTINENT_LOGOS,
  enabled = CONTINENT_LOGOS_ENABLED,
  className = "",
}: {
  logos?: ContinentLogo[];
  enabled?: boolean;
  className?: string;
}) {
  if (!enabled || logos.length === 0) return null;
  return (
    <div className={`flex items-end gap-4 sm:gap-5 ${className}`}>
      {logos.map((l, i) => (
        <span
          key={l.key}
          className="ga-cl-breathe inline-block"
          style={{
            animationDuration: `${3.4 + i * 0.45}s`,
            animationDelay: `${-(i * 1.1)}s`,
          }}
        >
          <ContinentLogoSvg logo={l} className="h-9 w-auto sm:h-10" />
        </span>
      ))}
    </div>
  );
}
