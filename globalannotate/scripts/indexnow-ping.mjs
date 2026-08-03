// Post-build IndexNow ping. After a production deployment, fetches the live
// sitemap, extracts every canonical URL, and submits the batch to IndexNow so
// Bing/Yandex re-crawl what changed.
//
// Gated so it only runs for real deployments — it is a no-op on local and CI
// builds unless INDEXNOW_PING=true. It is always non-fatal: any error is
// logged and the process exits 0 so it can never break a build or deploy.
//
// Keep INDEXNOW_KEY in sync with lib/indexnow.ts and the public/<key>.txt file.

const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "c54a9d8532554167aac47485345f7434";
const HOST = "globalannotate.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const KEY_LOCATION = `${ORIGIN}/${INDEXNOW_KEY}.txt`;

const enabled =
  process.env.INDEXNOW_PING === "true" ||
  process.env.VERCEL_ENV === "production";

async function main() {
  if (!enabled) {
    console.log(
      "[indexnow] Skipped (set INDEXNOW_PING=true or deploy to production to enable)."
    );
    return;
  }

  const sitemapUrl = `${ORIGIN}/sitemap.xml`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  let urlList = [];
  try {
    const res = await fetch(sitemapUrl, { signal: controller.signal });
    if (!res.ok) throw new Error(`sitemap fetch ${res.status} ${res.statusText}`);
    const xml = await res.text();
    urlList = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
      .map((m) => m[1].trim())
      .filter((u) => u.startsWith(ORIGIN));
    // Include the sitemap itself so engines pick up the fresh index.
    urlList.push(sitemapUrl);
    urlList = Array.from(new Set(urlList));
  } catch (err) {
    clearTimeout(timeout);
    console.warn(`[indexnow] Could not read sitemap: ${err.message}. Skipping.`);
    return;
  }

  if (urlList.length === 0) {
    console.warn("[indexnow] No URLs found in sitemap. Skipping.");
    clearTimeout(timeout);
    return;
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
      signal: controller.signal,
    });
    console.log(
      `[indexnow] Submitted ${urlList.length} URLs → ${res.status} ${res.statusText}`
    );
  } catch (err) {
    console.warn(`[indexnow] Submit failed: ${err.message}.`);
  } finally {
    clearTimeout(timeout);
  }
}

main().catch((err) => {
  console.warn(`[indexnow] Unexpected error: ${err.message}.`);
});
