import {
  CONTINENT_LOGOS,
  CONTINENT_LOGOS_ENABLED,
  CONTINENT_MAPS_ENABLED,
  CONTINENT_MAP_VIEWBOX,
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

// Renders one continent as a hollow geographic outline: transparent fill,
// white stroke via currentColor, kept at a true 3px with non-scaling-stroke
// so the stroke never thickens as the outline scales up/down.
export function ContinentMapSvg({
  logo,
  className = "",
}: {
  logo: ContinentLogo;
  className?: string;
}) {
  return (
    <svg
      viewBox={CONTINENT_MAP_VIEWBOX}
      className={className}
      role="img"
      aria-label={`${logo.name} — map outline`}
    >
      <path
        d={logo.mapPath}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Mobile fallback for the hero: the 3D globe is desktop-only, so below md the
// marks line up in a horizontal row under the headline/CTAs. Renders either
// the map outlines (+ Fraunces labels) or the animal logos depending on
// `variant`, matching whichever layer is active on the desktop globe.
// Breathing uses the same CSS animation as the globe overlay, staggered.
export function ContinentLogoRow({
  logos = CONTINENT_LOGOS,
  variant = CONTINENT_MAPS_ENABLED ? "maps" : "logos",
  enabled = variant === "maps" ? CONTINENT_MAPS_ENABLED : CONTINENT_LOGOS_ENABLED,
  className = "",
}: {
  logos?: ContinentLogo[];
  variant?: "maps" | "logos";
  enabled?: boolean;
  className?: string;
}) {
  if (!enabled || logos.length === 0) return null;
  const isMaps = variant === "maps";
  return (
    <div className={`flex flex-wrap items-start gap-x-4 gap-y-3 sm:gap-x-5 ${className}`}>
      {logos.map((l, i) => (
        <span
          key={l.key}
          className="ga-cl-breathe inline-flex flex-col items-center gap-1"
          style={{
            animationDuration: `${3.4 + i * 0.45}s`,
            animationDelay: `${-(i * 1.1)}s`,
          }}
        >
          {isMaps ? (
            <>
              <ContinentMapSvg logo={l} className="h-8 w-auto sm:h-9" />
              <span className="ga-cl-label">{l.name}</span>
            </>
          ) : (
            <ContinentLogoSvg logo={l} className="h-9 w-auto sm:h-10" />
          )}
        </span>
      ))}
    </div>
  );
}
