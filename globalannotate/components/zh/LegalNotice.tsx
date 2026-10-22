// Visible notice at the top of the Chinese legal pages (privacy, terms).
export const ZH_LEGAL_NOTICE = "本页面内容仅供参考，如有法律效力问题，请以英文版本为准。";

export default function LegalNotice() {
  return (
    <div
      role="note"
      className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-sm font-medium text-ink-800"
    >
      {ZH_LEGAL_NOTICE}
    </div>
  );
}
