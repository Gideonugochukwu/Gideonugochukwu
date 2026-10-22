const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

// Formats an ISO yyyy-mm-dd date as "15. August 2026" (no locale-data
// dependency, so server and client always agree).
export function formatDeDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${d}. ${MONTHS[m - 1]} ${y}`;
}
