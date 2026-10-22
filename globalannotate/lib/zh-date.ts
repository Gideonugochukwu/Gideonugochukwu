// Formats an ISO yyyy-mm-dd date as 2026年8月15日 (no locale-data dependency,
// so server and client always agree).
export function formatZhDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${y}年${m}月${d}日`;
}
