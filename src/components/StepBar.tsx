"use client";

import { Check, CreditCard, Gift, Scissors, TrendingUp, User } from "lucide-react";

export const STEPS = [
  { n: 1, short: "プロフィール", icon: User },
  { n: 2, short: "固定費", icon: Scissors },
  { n: 3, short: "ポイ活", icon: CreditCard },
  { n: 4, short: "節税", icon: Gift },
  { n: 5, short: "未来", icon: TrendingUp },
];

export function StepBar({ step, onSelect }: { step: number; onSelect: (n: number) => void }) {
  return (
    <nav aria-label="診断のステップ" className="sticky top-0 z-20 -mx-4 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur">
      <ol className="flex items-start justify-between gap-1">
        {STEPS.map(({ n, short, icon: Icon }, i) => {
          const done = n < step;
          const now = n === step;
          return (
            <li key={n} className="relative flex flex-1 flex-col items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className={`absolute right-1/2 top-5 h-0.5 w-full -translate-y-1/2 ${n <= step ? "bg-emerald-500" : "bg-line"}`}
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(n)}
                aria-current={now ? "step" : undefined}
                aria-label={`ステップ${n}：${short}`}
                className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 transition-colors ${
                  now
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : done
                      ? "border-emerald-500 bg-accent-soft text-accent"
                      : "border-line-strong bg-surface text-muted"
                }`}
              >
                {done ? <Check size={18} aria-hidden /> : <Icon size={18} aria-hidden />}
              </button>
              <span className={`mt-1 text-[11px] font-bold sm:text-xs ${now ? "text-accent" : "text-muted"}`}>
                {short}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
