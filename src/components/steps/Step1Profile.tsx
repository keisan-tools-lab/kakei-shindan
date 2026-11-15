"use client";

import { User } from "lucide-react";
import { CATEGORIES, familyType } from "@/config/budget";
import { idealBudget } from "@/lib/calc";
import { useStore } from "@/lib/store";
import type { AgeGroup, Family } from "@/lib/types";
import { fmt, yen } from "@/lib/format";
import { Card, NumberInput, Pills, Slider } from "../ui";

const FAMILY_LABEL = { single: "独身", couple: "夫婦（子どもなし）", kids: "子どもがいる家庭" };

export function Step1Profile() {
  const { state, update } = useStore();
  const p = state.profile;
  const { ratio, amount } = idealBudget(p.takeHome, p.family);

  return (
    <div className="flex flex-col gap-5">
      <Card title="あなたのことを教えてください" icon={<User size={20} />}>
        <div className="flex flex-col gap-5">
          <Pills<AgeGroup>
            label="年齢"
            value={p.ageGroup}
            onChange={(v) => update((d) => { d.profile.ageGroup = v; })}
            options={[
              { value: "20s", label: "20代" },
              { value: "30s", label: "30代" },
              { value: "40s", label: "40代" },
              { value: "50s", label: "50代" },
              { value: "60s", label: "60代以上" },
            ]}
          />
          <Slider
            label="手取りの月収"
            hint="（家族の合計でもOK）"
            value={p.takeHome}
            min={100000}
            max={1000000}
            step={10000}
            onChange={(v) => update((d) => { d.profile.takeHome = v; })}
          />
          <NumberInput
            label="手取りの月収（数字で入れる場合）"
            value={p.takeHome}
            min={10000}
            max={5000000}
            onChange={(v) => update((d) => { d.profile.takeHome = v; })}
          />
          <NumberInput
            label="額面の年収（税金などを引く前）"
            value={p.annualGross}
            min={0}
            max={100000000}
            hint="ふるさと納税・iDeCoの計算に使います。源泉徴収票の「支払金額」が目安です。"
            onChange={(v) => update((d) => { d.profile.annualGross = v; })}
          />
          <Pills<Family>
            label="家族構成"
            value={p.family}
            onChange={(v) => update((d) => { d.profile.family = v; })}
            options={[
              { value: "single", label: "独身" },
              { value: "couple", label: "夫婦（共働き）" },
              { value: "coupleDep", label: "夫婦（配偶者は扶養内）" },
              { value: "kids", label: "子あり（共働き）" },
              { value: "kidsDep", label: "子あり（配偶者は扶養内）" },
            ]}
          />
        </div>
      </Card>

      <Card title={`あなたの理想の家計黄金比（${FAMILY_LABEL[familyType(p.family)]}）`}>
        <p className="mb-4 text-sm text-ink-2">
          手取り <b className="num">{yen(p.takeHome)}</b> の場合の、費目ごとの目安です。
        </p>
        <ul className="flex flex-col gap-3">
          {CATEGORIES.filter((c) => ratio[c.key] > 0).map((c) => (
            <li key={c.key}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-bold text-ink">{c.label}</span>
                <span className="num font-bold text-ink">
                  {yen(amount[c.key])} <span className="text-xs font-normal text-muted">（{ratio[c.key]}%）</span>
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-bar" style={{ width: `${ratio[c.key] * 2.5}%` }} />
              </div>
            </li>
          ))}
          <li>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-bold text-accent">貯蓄・投資</span>
              <span className="num font-bold text-accent">
                {yen(amount.saving)} <span className="text-xs font-normal">（{ratio.saving}%）</span>
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-accent-soft">
              <div className="h-full rounded-full bg-emerald-600" style={{ width: `${ratio.saving * 2.5}%` }} />
            </div>
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted">
          黄金比は当サイトが一般的な家計の目安としてまとめたものです。住んでいる地域や暮らし方で変わるので、参考としてご覧ください。
          1年で貯蓄・投資にまわせる目安は <b className="num">{fmt(amount.saving * 12)}円</b> です。
        </p>
      </Card>
    </div>
  );
}
