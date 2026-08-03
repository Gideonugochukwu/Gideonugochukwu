// IndexNow — instantly notify participating search engines (Bing, Yandex,
// Seznam, Naver) when pages are published or updated. One shared submit
// helper is used by the API route (app/api/indexnow) and the post-build
// ping script (scripts/indexnow-ping.mjs).
//
// The key is public by design: it is also served as a verification file at
// https://globalannotate.com/<key>.txt so engines can confirm ownership.
// Keep this value, the .txt filename, and scripts/indexnow-ping.mjs in sync.

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "c54a9d8532554167aac47485345f7434";

export const INDEXNOW_HOST = "globalannotate.com";
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

// Submits a batch of absolute URLs to IndexNow. Returns the upstream status.
// Callers should treat failures as non-fatal — IndexNow is best-effort and
// must never block a request or a build.
export async function submitToIndexNow(urlList: string[]): Promise<{
  ok: boolean;
  status: number;
  statusText: string;
}> {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });
  return { ok: res.ok, status: res.status, statusText: res.statusText };
}
