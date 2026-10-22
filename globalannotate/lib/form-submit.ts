// Submits a quote/review form. English and German post straight to the
// Formspree endpoint as before; the Chinese locale posts to our own
// /api/form-relay route, which forwards server-side, so the browser on /zh
// never has to reach a third-party host (formspree.io can be slow or
// unreachable from mainland China).
export type FormKind = "quote" | "review";

export async function submitForm(
  kind: FormKind,
  endpoint: string,
  payload: Record<string, unknown>,
  locale: string
): Promise<Response> {
  if (locale === "zh") {
    return fetch("/api/form-relay", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ form: kind, payload }),
    });
  }
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
}
