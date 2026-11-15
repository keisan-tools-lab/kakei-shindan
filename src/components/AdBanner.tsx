"use client";

// =============================================
// 広告の枠
// ・AdSense の広告ユニットID（src/config/site.ts の AD_SLOTS）が入っていれば広告を表示します。
// ・入っていなければ、開発中（npm run dev）だけ点線の「広告スペース」を表示し、
//   公開したサイトでは何も表示しません（自動広告はそのまま表示されます）。
// ・あらかじめ高さを確保して、広告が出たときにページがずれる（CLS）のを防ぎます。
// =============================================
import { useEffect, useRef } from "react";
import { AD_SLOTS, SITE, type AdSlotName } from "@/config/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdBanner({ slotName, minHeight = 250 }: { slotName: AdSlotName; minHeight?: number }) {
  const slot = AD_SLOTS[slotName];
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* 広告ブロッカーなどで読み込めないときは何もしない */
    }
  }, [slot]);

  if (!slot) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div
        className="my-6 grid place-items-center rounded-xl border-2 border-dashed border-line-strong bg-surface-2 text-xs text-muted"
        style={{ minHeight }}
      >
        広告スペース（{slotName}）※開発中だけ表示
      </div>
    );
  }

  return (
    <div className="my-6" style={{ minHeight }}>
      <p className="mb-1 text-center text-[10px] text-muted">スポンサーリンク</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: minHeight - 16 }}
        data-ad-client={SITE.adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
