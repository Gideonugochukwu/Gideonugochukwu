"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, hasAnalyticsConsent } from "./CookieConsent";

// Optional Baidu Analytics (百度统计) for the /zh locale only. Rendered by the
// layout only when NEXT_PUBLIC_BAIDU_ANALYTICS_ID is set, and — in line with
// the cookie banner and privacy policy — the hm.js script is injected only
// after the visitor accepts analytics cookies.
export default function BaiduAnalytics({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    const load = () => {
      if (loaded || !hasAnalyticsConsent()) return;
      loaded = true;
      const w = window as unknown as { _hmt?: unknown[] };
      w._hmt = w._hmt || [];
      const hm = document.createElement("script");
      hm.src = `https://hm.baidu.com/hm.js?${encodeURIComponent(id)}`;
      hm.async = true;
      document.head.appendChild(hm);
    };
    load();
    window.addEventListener(CONSENT_EVENT, load);
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, [id]);
  return null;
}
