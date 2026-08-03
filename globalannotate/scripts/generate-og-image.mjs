// Generates the default social share image at public/og-image.png (1200×630).
// Brand navy background, the GlobalAnnotate dark-mode logo mark, the wordmark,
// the company tagline, an emerald→teal accent bar, and the domain.
//
// Run once (committed output): `node scripts/generate-og-image.mjs`.
// Re-run whenever the logo or tagline changes.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const WIDTH = 1200;
const HEIGHT = 630;
const NAVY = "#0F172A";
const EMERALD = "#10B981";
const TEAL = "#14B8A6";

// Logo mark (white-lettering variant, for dark backgrounds), resized.
const LOGO = 168;
const logoBuffer = await sharp(join(publicDir, "globalannotate-logo-dark.png"))
  .resize(LOGO, LOGO, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

// Text + accents overlay. Uses a generic sans-serif so it renders regardless
// of which fonts fontconfig resolves in the build environment.
const overlay = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${EMERALD}"/>
      <stop offset="1" stop-color="${TEAL}"/>
    </linearGradient>
  </defs>

  <!-- soft emerald glow, bottom-right -->
  <circle cx="1120" cy="560" r="240" fill="${EMERALD}" opacity="0.10"/>

  <!-- wordmark, right of the logo mark -->
  <text x="356" y="292" font-family="Poppins, 'Plus Jakarta Sans', Arial, sans-serif"
        font-size="76" font-weight="700" fill="#ffffff" letter-spacing="-1.5">GlobalAnnotate</text>

  <!-- emerald→teal accent bar -->
  <rect x="94" y="372" width="132" height="8" rx="4" fill="url(#accent)"/>

  <!-- tagline -->
  <text x="94" y="436" font-family="'Plus Jakarta Sans', Arial, sans-serif"
        font-size="38" font-weight="600" fill="#e2e8f0" letter-spacing="-0.5">Precision Across Languages. Intelligence Across Data.</text>
  <text x="94" y="486" font-family="'Plus Jakarta Sans', Arial, sans-serif"
        font-size="38" font-weight="600" fill="#e2e8f0" letter-spacing="-0.5">Growth Across Markets.</text>

  <!-- supporting line + domain -->
  <text x="94" y="552" font-family="'Plus Jakarta Sans', Arial, sans-serif"
        font-size="26" font-weight="500" fill="#94a3b8">Translation, localization &amp; AI data in 100+ languages</text>
  <text x="94" y="592" font-family="'Plus Jakarta Sans', Arial, sans-serif"
        font-size="26" font-weight="700" fill="${EMERALD}">globalannotate.com</text>
</svg>
`);

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: NAVY },
})
  .composite([
    { input: logoBuffer, top: 150, left: 94 },
    { input: overlay, top: 0, left: 0 },
  ])
  .png()
  .toFile(join(publicDir, "og-image.png"));

console.log("Wrote public/og-image.png (1200×630)");
