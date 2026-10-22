// Visible notice at the top of the German legal pages (privacy, terms).
export const DE_LEGAL_NOTICE =
  "Dieses Dokument liegt nur in englischer Sprache vor. Für eine verbindliche Fassung ist die englische Version maßgeblich.";

export default function LegalNotice() {
  return (
    <div
      role="note"
      className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-sm font-medium text-ink-800"
    >
      {DE_LEGAL_NOTICE}
    </div>
  );
}
