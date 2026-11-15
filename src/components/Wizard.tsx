"use client";

// =============================================
// 5つのステップを順番に進む「ウィザード」
// =============================================
import { useRef } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { StoreProvider, useStore } from "@/lib/store";
import { STEPS, StepBar } from "./StepBar";
import { AdBanner } from "./AdBanner";
import { Step1Profile } from "./steps/Step1Profile";
import { Step2Fixed } from "./steps/Step2Fixed";
import { Step3Points } from "./steps/Step3Points";
import { Step4Tax } from "./steps/Step4Tax";
import { Step5Future } from "./steps/Step5Future";

const TITLES = [
  "ステップ1：基本プロフィール",
  "ステップ2：家計＆サブスク・固定費の断捨離チェック",
  "ステップ3：キャッシュレス決済＆ポイ活の最適化",
  "ステップ4：ふるさと納税＆節税ガイド",
  "ステップ5：未来の資産シミュレーション＆始め方",
];

function Inner() {
  const { state, update, reset, restored } = useStore();
  const top = useRef<HTMLDivElement>(null);
  const step = Math.min(5, Math.max(1, state.step));

  const go = (n: number) => {
    update((d) => { d.step = n; });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={top} className="scroll-mt-0">
      <StepBar step={step} onSelect={go} />

      {restored && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-2 px-4 py-3 text-sm text-ink-2">
          <span>前回の入力内容を読み込みました。続きから診断できます。</span>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 font-bold text-ink underline">
            <RotateCcw size={14} aria-hidden /> 最初からやり直す
          </button>
        </div>
      )}

      <h2 className="mt-6 mb-4 text-xl font-bold text-ink sm:text-2xl">{TITLES[step - 1]}</h2>

      {step === 1 && <Step1Profile />}
      {step === 2 && <Step2Fixed />}
      {step === 3 && <Step3Points />}
      {step === 4 && <Step4Tax />}
      {step === 5 && <Step5Future />}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button type="button" onClick={() => go(step - 1)} className="inline-flex min-h-12 items-center gap-1 rounded-xl border-2 border-line-strong px-4 font-bold text-ink hover:bg-surface-2">
            <ChevronLeft size={18} aria-hidden /> 戻る
          </button>
        ) : <span />}
        {step < 5 ? (
          <button type="button" onClick={() => go(step + 1)} className="inline-flex min-h-12 items-center gap-1 rounded-xl bg-navy-btn px-6 font-bold text-white hover:bg-navy-btn-hover">
            次へ：{STEPS[step].short} <ChevronRight size={18} aria-hidden />
          </button>
        ) : (
          <button type="button" onClick={() => go(1)} className="inline-flex min-h-12 items-center gap-1 rounded-xl border-2 border-line-strong px-4 font-bold text-ink hover:bg-surface-2">
            <RotateCcw size={16} aria-hidden /> ステップ1から見直す
          </button>
        )}
      </div>

      {step < 5 && <AdBanner slotName="afterStep" />}
    </div>
  );
}

export function Wizard() {
  return (
    <StoreProvider>
      <Inner />
    </StoreProvider>
  );
}
