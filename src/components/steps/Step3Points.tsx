"use client";

import { CreditCard, Trophy } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Carrier, ConvBrand, NetBrand } from "@/lib/types";
import { fmt, yen } from "@/lib/format";
import { affiliateLinks } from "@/config/affiliateLinks";
import { Big, Card, MultiPills, Note, OutButton, Slider } from "../ui";

const MEDAL = ["bg-amber-400 text-white", "bg-slate-300 text-slate-900", "bg-amber-700 text-white"];

export function Step3Points() {
  const { state, update, derived } = useStore();
  const top3 = derived.ranking.slice(0, 3);
  const best = top3[0];

  return (
    <div className="flex flex-col gap-5">
      <Card title="よく使うお店と支払いを教えてください" icon={<CreditCard size={20} />}>
        <div className="flex flex-col gap-5">
          <MultiPills<ConvBrand>
            label="よく行くコンビニ"
            value={state.shops.conv}
            exclusive="other"
            onChange={(v) => update((d) => { d.shops.conv = v; })}
            options={[
              { value: "seven", label: "セブン-イレブン" },
              { value: "lawson", label: "ローソン" },
              { value: "famima", label: "ファミリーマート" },
              { value: "other", label: "あまり行かない" },
            ]}
          />
          <MultiPills<NetBrand>
            label="よく使うネット通販"
            value={state.shops.net}
            exclusive="none"
            onChange={(v) => update((d) => { d.shops.net = v; })}
            options={[
              { value: "amazon", label: "Amazon" },
              { value: "rakuten", label: "楽天市場" },
              { value: "yahoo", label: "Yahoo!ショッピング" },
              { value: "none", label: "あまり使わない" },
            ]}
          />
          <MultiPills<Carrier>
            label="携帯電話の会社（家族の分もふくめて）"
            value={state.shops.carrier}
            onChange={(v) => update((d) => { d.shops.carrier = v; })}
            options={[
              { value: "docomo", label: "ドコモ・ahamo" },
              { value: "au", label: "au・UQモバイル・povo" },
              { value: "softbank", label: "ソフトバンク・ワイモバイル・LINEMO" },
              { value: "rakuten", label: "楽天モバイル" },
              { value: "other", label: "その他の格安SIM" },
            ]}
          />
          <Slider label="コンビニ・外食（月）" value={state.shopSpend.conv} min={0} max={100000} step={1000} onChange={(v) => update((d) => { d.shopSpend.conv = v; })} />
          <Slider label="スーパー・ドラッグストア（月）" value={state.shopSpend.super} min={0} max={200000} step={1000} onChange={(v) => update((d) => { d.shopSpend.super = v; })} />
          <Slider label="ネット通販（月）" value={state.shopSpend.net} min={0} max={100000} step={1000} onChange={(v) => update((d) => { d.shopSpend.net = v; })} />
          <Slider label="そのほかのカード払い（光熱費・通信費など）" value={state.shopSpend.other} min={0} max={200000} step={1000} onChange={(v) => update((d) => { d.shopSpend.other = v; })} />
        </div>
      </Card>

      <Big
        label="決済をまとめたときの、月間の想定獲得ポイント"
        value={fmt(best.points)}
        unit="pt"
        sub={
          <span>
            1位の「{best.eco.route}」の場合。ステップ2の余剰資金と合わせると、毎月 <b className="num">{yen(derived.autoMonthly)}</b> を積立にまわせます。
          </span>
        }
      />

      <Card title="あなたにおすすめの経済圏ランキング" icon={<Trophy size={20} />}>
        <ol className="flex flex-col gap-4">
          {top3.map((r, i) => (
            <li key={r.eco.key} className={`rounded-2xl border-2 p-4 ${i === 0 ? "border-emerald-500 bg-accent-soft" : "border-line"}`}>
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${MEDAL[i]}`}>{i + 1}位</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink">{r.eco.route}</p>
                  <p className="text-xs text-muted">たまるポイント：{r.eco.point}</p>
                </div>
                <p className="num shrink-0 text-right text-lg font-bold text-accent">
                  月 {fmt(r.points)}<span className="text-xs">pt</span>
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-1 text-sm text-ink-2">
                {[...r.reasons, ...r.eco.features.slice(0, 2)].map((t) => (
                  <li key={t} className="flex gap-2"><span className="text-accent">✓</span>{t}</li>
                ))}
              </ul>
              <div className="mt-4">
                <OutButton link={r.eco.card} variant={i === 0 ? "solid" : "outline"}>
                  {affiliateLinks[r.eco.card].label}の公式サイトで詳細・キャンペーンを見る
                </OutButton>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4">
          <Note>
            コンビニやネット通販を複数選んだときは、それぞれで同じくらい使うとして計算しています。
            還元率は、当サイトがランキングの計算に使っている目安です（{"src/config/economies.ts"} で管理）。実際の還元率は、カードの種類・キャンペーン・利用条件・時期によって変わります。申し込みの前に、必ず公式サイトで最新の条件を確認してください。
          </Note>
        </div>
      </Card>
    </div>
  );
}
