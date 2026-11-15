"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

/** 診断結果を X（旧Twitter）や LINE でシェアするボタン */
export function ShareButtons({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent("家計診断,新NISA")}`;
  const line = `https://line.me/R/share?text=${encodeURIComponent(`${text}\n${url}`)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm font-bold text-ink">
        <Share2 size={16} aria-hidden /> 診断結果をシェアする
      </p>
      <div className="flex flex-wrap gap-2">
        <a href={x} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-xl bg-black ring-1 ring-white/25 px-4 py-2 text-sm font-bold text-white hover:opacity-85">
          Xでポスト
        </a>
        <a href={line} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-xl bg-[#06C755] px-4 py-2 text-sm font-bold text-white hover:opacity-85">
          LINEで送る
        </a>
        <button type="button" onClick={copy} className="inline-flex min-h-11 items-center rounded-xl border-2 border-line-strong px-4 py-2 text-sm font-bold text-ink hover:bg-surface-2">
          {copied ? "コピーしました" : "文章をコピー"}
        </button>
      </div>
    </div>
  );
}
