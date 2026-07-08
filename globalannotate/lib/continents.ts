// Continent logo marks for the homepage hero globe.
//
// This module is the page's "CMS" for the feature: a static site has no CMS
// backend, so this typed config is the single editable source of truth, and
// both <HeroGlobe /> and <ContinentLogoRow /> accept the values as props so
// a real CMS can hydrate them later without touching the components.
//
//   - CONTINENT_LOGOS_ENABLED — master on/off toggle for the marks.
//   - ContinentLogo.symbolPath — the continental symbol as a swappable SVG
//     path (viewBox 0 0 64 64, single white fill, drawn in the upper ~40px;
//     the shared GlobalAnnotate "A" mark renders beneath it).
//   - lat/lon — where the mark anchors on the globe (continent centroids).
//
// Symbol drawing rules (for anyone swapping paths): default nonzero fill —
// draw solid shapes clockwise and cutouts (eyes, stripes) counter-clockwise
// as extra subpaths. Keep marks flat and minimalist; they render at ~28–60px.

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
};

/** Master toggle: set false to remove the marks from the globe and the
 *  mobile row without touching any component code. */
export const CONTINENT_LOGOS_ENABLED = true;

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
  },
];
