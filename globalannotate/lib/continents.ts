// Continent overlays for the homepage hero globe.
//
// This module is the page's "CMS" for the feature: a static site has no CMS
// backend, so this typed config is the single editable source of truth, and
// both <HeroGlobe /> and <ContinentLogoRow /> accept the values as props so
// a real CMS can hydrate them later without touching the components.
//
// Two overlay layers, each with its own master toggle (enable one at a time):
//   - Maps  (CONTINENT_MAPS_ENABLED) — geographic outlines. mapPath is the
//     swappable coastline as an SVG path in a 0 0 100 100 viewBox, stroked
//     hollow (3px non-scaling white), with the continent name labelled below.
//   - Logos (CONTINENT_LOGOS_ENABLED) — animal marks (PR #38). symbolPath is
//     a swappable SVG path in a 0 0 64 64 viewBox over the GlobalAnnotate "A".
//   - lat/lon — where each overlay anchors on the globe (continent centroids).
//
// Path drawing rules for swaps: symbolPath uses nonzero fill (solid shapes
// clockwise, cutouts counter-clockwise); mapPath is a single stroked outline,
// so wind direction doesn't matter. Keep both flat; they render at ~24–64px.

export type ContinentLogo = {
  key: string;
  name: string;
  /** Iconic continental symbol. */
  symbol: string;
  /** Landmass-centroid anchor, degrees. */
  lat: number;
  lon: number;
  /** Swappable symbol artwork — SVG path data in a 0 0 64 64 viewBox. */
  symbolPath: string;
  /** Swappable geographic outline — SVG path data in a 0 0 100 100 viewBox,
   *  stroked (hollow) with a non-scaling 3px white stroke. */
  mapPath: string;
};

/** Master toggles for the two hero-globe overlay layers. Each renders at the
 *  same continent centroids, so enable ONE at a time — turning both on stacks
 *  a map outline and an animal mark on the same anchor. Maps is the active
 *  layer; the animal-logo layer (PR #38) stays in the codebase, off by default. */
export const CONTINENT_MAPS_ENABLED = true;
export const CONTINENT_LOGOS_ENABLED = false;

/** viewBox for the geographic map outlines (mapPath). */
export const CONTINENT_MAP_VIEWBOX = "0 0 100 100";

/** The GlobalAnnotate "A" mark rendered under every symbol (evenodd —
 *  the triangular counter is a same-direction subpath). */
export const GA_A_MARK_PATH =
  "M32 41L44.5 62H38.6L36.2 57.6H27.8L25.4 62H19.5ZM32 47.8L34.5 53.2H29.5Z";

export const CONTINENT_LOGOS: ContinentLogo[] = [
  {
    key: "africa",
    name: "Africa",
    symbol: "Lion",
    lat: 4,
    lon: 21,
    // Sunburst mane ring around a solid face.
    symbolPath:
      "M32 4L35.1 9.6L40.5 6.3L40.3 12.7L46.7 12.5L43.4 17.9L49 21L43.4 24.1L46.7 29.5L40.3 29.3L40.5 35.7L35.1 32.4L32 38L28.9 32.4L23.5 35.7L23.7 29.3L17.3 29.5L20.6 24.1L15 21L20.6 17.9L17.3 12.5L23.7 12.7L23.5 6.3L28.9 9.6ZM32 10.4A10.6 10.6 0 1 0 32 31.6A10.6 10.6 0 1 0 32 10.4ZM32 12.8A8.2 8.2 0 1 1 32 29.2A8.2 8.2 0 1 1 32 12.8Z",
    // Simplified geographic outline (see map-gen provenance in PR).
    mapPath:
      "M33 9L45 8L52 12L60 11L62 17L60 22L66 27L70 34L80 37L83 43L76 47L70 55L64 63L58 74L51 86L46 88L42 80L40 68L35 60L30 54L23 44L16 35L20 27L27 21L29 15Z",
  },
  {
    key: "asia",
    name: "Asia",
    symbol: "Tiger",
    lat: 34,
    lon: 95,
    // Eared head with stripe and eye cutouts.
    symbolPath:
      "M32 9.5A12 12 0 1 1 32 33.5A12 12 0 1 1 32 9.5ZM21.5 14L24 4.5L28.5 10.8ZM35.5 10.8L40 4.5L42.5 14ZM28.7 10.2L25.7 10.2L27.2 18.5ZM33.5 10.2L30.5 10.2L32 21ZM38.3 10.2L35.3 10.2L36.8 18.5ZM26.8 21.9A1.9 1.9 0 1 0 26.8 25.7A1.9 1.9 0 1 0 26.8 21.9ZM37.2 21.9A1.9 1.9 0 1 0 37.2 25.7A1.9 1.9 0 1 0 37.2 21.9Z",
    // Simplified geographic outline (see map-gen provenance in PR).
    mapPath:
      "M9 32L21 22L37 16L53 11L69 11L83 15L91 24L83 29L88 35L78 36L71 32L70 43L66 51L62 43L57 42L53 45L49 59L45 45L39 46L34 51L38 42L29 43L21 42L13 38Z",
  },
  {
    key: "europe",
    name: "Europe",
    symbol: "Bull",
    lat: 50,
    lon: 15,
    // Crescent horns over a tapering head with nostril cutouts.
    symbolPath:
      "M25 13.5C16 13.5 10.5 9 10.5 3C14.2 7.6 19.8 9.2 27 9.4L27.8 13.2ZM39 13.5C48 13.5 53.5 9 53.5 3C49.8 7.6 44.2 9.2 37 9.4L36.2 13.2ZM23 13C23 22.5 26.5 30.5 32 34C37.5 30.5 41 22.5 41 13C37.5 16.2 26.5 16.2 23 13ZM29 24.6A1.7 1.7 0 1 0 29 28A1.7 1.7 0 1 0 29 24.6ZM35 24.6A1.7 1.7 0 1 0 35 28A1.7 1.7 0 1 0 35 24.6Z",
    // Simplified geographic outline (see map-gen provenance in PR).
    mapPath:
      "M28 24L34 14L40 20L45 12L50 20L57 17L66 17L72 25L64 30L71 37L60 41L53 38L48 43L42 39L36 43L30 40L25 42L24 32Z",
  },
  {
    key: "north-america",
    name: "North America",
    symbol: "Eagle",
    lat: 45,
    lon: -100,
    // Right-facing head profile with a hooked beak and eye cutout.
    symbolPath:
      "M20 30C13 26.5 12 15 20 10.5C26.5 6.8 35.5 7.6 40.5 12.2C44 12.4 47.6 14 50 16.8C48.2 17 46.8 17.4 45.6 18.2C46.6 19.2 47 20.4 46.6 21.8C44.6 20.8 42.6 20.6 40.6 21.2C38.8 27 30.5 32.6 20 30ZM32.5 13A2 2 0 1 0 32.5 17A2 2 0 1 0 32.5 13Z",
    // Simplified geographic outline (see map-gen provenance in PR).
    mapPath:
      "M12 24L27 14L43 14L58 12L70 17L63 23L70 28L60 32L66 39L57 41L60 49L53 45L48 51L42 61L38 59L40 48L35 43L27 43L18 39L11 31Z",
  },
  {
    key: "south-america",
    name: "South America",
    symbol: "Condor",
    lat: -14,
    lon: -60,
    // Soaring silhouette — long arched wings, small head, fanned tail.
    symbolPath:
      "M32 14C32.8 12.6 34 12.2 35.2 12.8L59 19C53.5 22 45 24.6 38.6 23.4C38.2 25.4 37.4 27.2 36 28.6C35.2 26 34 24.2 32 23.4C30 24.2 28.8 26 28 28.6C26.6 27.2 25.8 25.4 25.4 23.4C19 24.6 10.5 22 5 19L28.8 12.8C30 12.2 31.2 12.6 32 14ZM30 26.5L34 26.5L35.6 32.5L28.4 32.5Z",
    // Simplified geographic outline (see map-gen provenance in PR).
    mapPath:
      "M36 8L48 6L56 12L54 20L62 26L58 34L54 42L50 52L46 64L42 76L38 88L34 86L33 74L37 62L33 52L28 42L24 30L22 20L28 12Z",
  },
  {
    key: "australia",
    name: "Australia",
    symbol: "Kangaroo",
    lat: -25,
    lon: 134,
    // Road-sign style side silhouette, facing right.
    symbolPath:
      "M6 33.2C13.5 33 19.8 30.8 23.2 26.6C25.2 22.2 28.3 18.8 32.8 16.3C35.8 14.6 38.3 13.4 40 12C40.4 9.2 42.6 7 45.4 7C46.2 7 47 7.2 47.6 7.6L51.8 5.8L50.2 9.4C51.4 10.4 52 12 51.8 13.6C49.8 15.4 46.2 15.6 43.8 14.8C42.4 16.4 41.4 18.4 41 20.4C40.6 22.6 41.2 24.4 42.6 25.8C40.6 26.2 38.8 25.6 37.6 24.2C36.8 26.4 37.2 28.6 38.8 30.2C36.6 30.6 34.6 29.6 33.6 27.8C31.8 30.2 31.4 32.8 32.4 35.4H39.8V37.8H29.3C27.6 34.6 27.6 31.2 29 28.2C26.2 31.4 21.6 34.2 15.3 35.2C12.4 35.7 9 36 6 35.9Z",
    // Simplified geographic outline (see map-gen provenance in PR).
    mapPath:
      "M22 41L31 35L37 37L41 27L45 27L47 36L51 33L61 31L72 33L80 41L78 51L68 57L56 59L46 57L38 59L28 55L20 47L20 43Z",
  },
];
