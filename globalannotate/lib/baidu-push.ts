// Baidu active URL submission (百度搜索资源平台 · 普通收录 API 提交).
// Shared by app/api/baidu-push. The token comes from BAIDU_PUSH_TOKEN and is
// never hard-coded or returned to callers.

export const BAIDU_PUSH_SITE = "https://globalannotate.com";
export const BAIDU_PUSH_ENDPOINT = "http://data.zz.baidu.com/urls";

// Only canonical /zh URLs are submitted to Baidu.
export function isZhUrl(candidate: string): boolean {
  try {
    const u = new URL(candidate);
    return (
      u.origin === BAIDU_PUSH_SITE && (u.pathname === "/zh" || u.pathname.startsWith("/zh/"))
    );
  } catch {
    return false;
  }
}

export type BaiduPushResult = {
  ok: boolean;
  status: number;
  // Baidu's JSON reply, e.g. { success: 3, remain: 97 } or { error, message }.
  body: unknown;
};

export async function submitToBaidu(urls: string[], token: string): Promise<BaiduPushResult> {
  const endpoint = `${BAIDU_PUSH_ENDPOINT}?site=${encodeURIComponent(
    BAIDU_PUSH_SITE
  )}&token=${encodeURIComponent(token)}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: urls.join("\n"),
  });
  const body = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, body };
}
