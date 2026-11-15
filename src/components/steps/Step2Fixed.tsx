"use client";

import { ListChecks, Scissors } from "lucide-react";
import { CATEGORIES, SUBS } from "@/config/budget";
import { useStore } from "@/lib/store";
import { yen } from "@/lib/format";
import { Big, Card, Slider } from "../ui";

export function Step2Fixed() {
  const { state, update, derived } = useStore();
  const r = derived.surplus;
  const max = Math.max(200000, Math.round(state.profile.takeHome * 0.6 / 10000) * 10000);

  return (
    <div className="flex flex-col gap-5">
      <Big
        label="毎月生み出せる余剰資金"
        value={yen(r.surplus)}
        sub={
          <span>
            固定費の見直し <b className="num">{yen(r.subsSaving)}</b> ＋ 黄金比とのちがい <b className="num">{yen(r.gapSaving)}</b>
            <br />1年にすると <b className="num">{yen(r.surplus * 12)}</b>
          </span>
        }
      />

      <Card title="よくある固定費・サブスクの見直しチェック" icon={<ListChecks size={20} />}>
        <p className="mb-3 text-sm text-ink-2">解約・見直しできそうなものにチェックを入れてください（金額は一般的な月額の目安です）。</p>
        <ul className="flex flex-col gap-2">
          {SUBS.map((s) => {
            const on = !!state.subs[s.key];
            return (
              <li key={s.key}>
                <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 ${on ? "border-emerald-500 bg-accent-soft" : "border-line hover:border-emerald-300"}`}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => update((d) => { d.subs[s.key] = e.target.checked; })}
                    className="h-5 w-5 accent-emerald-600"
                  />
                  <span className="flex-1 text-sm font-medium text-ink">{s.label}</span>
                  <span className="num text-sm font-bold text-accent">−{yen(s.amount)}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card title="いまの毎月の支出を入れてください" icon={<Scissors size={20} />}>
        <div className="flex flex-col gap-6">
          {r.rows.map((row) => {
            const c = CATEGORIES.find((x) => x.key === row.key)!;
            if (row.ideal === 0 && row.now === 0 && row.key === "education") return null;
            return (
              <div key={row.key} className="flex flex-col gap-1">
                <Slider
                  label={c.label}
                  hint={c.hint}
                  value={state.spending[row.key]}
                  min={0}
                  max={max}
                  step={1000}
                  onChange={(v) => update((d) => { d.spending[row.key] = v; })}
                />
                <p className="flex justify-between text-xs">
                  <span className="text-muted">理想 {yen(row.ideal)}</span>
                  {row.over > 0 ? (
                    <span className="font-bold text-red-400">
                      {row.key === "housing" ? "理想より " : "見直せる額 "}
                      {yen(row.over)}
                    </span>
                  ) : (
                    <span className="font-bold text-accent">理想の範囲内です</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        {r.housingGap > 0 && (
          <p className="mt-5 rounded-xl bg-surface-2 p-3 text-xs text-ink-2">
            住居費は理想より <b className="num">{yen(r.housingGap)}</b> 多めです。家賃はすぐに変えにくいため、上の「余剰資金」にはふくめていません。更新や引っ越しのときに見直すと効果が大きい費目です。
          </p>
        )}
      </Card>
    </div>
  );
}
