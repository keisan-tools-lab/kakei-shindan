"use client";

import { Gift, Landmark } from "lucide-react";
import { useStore } from "@/lib/store";
import { fmt, yen } from "@/lib/format";
import { Big, Card, Note, OutButton } from "../ui";

const PICKS = [
  {
    title: "食費を削る鉄板",
    items: ["お米の定期便（毎月・数か月ごとに届く）", "小分け冷凍の豚肉・鶏肉", "冷凍の魚・ハンバーグなどのおかず"],
    note: "毎日食べるものほど、そのまま食費が浮きます。",
  },
  {
    title: "日用品を削る鉄板",
    items: ["トイレットペーパー・ティッシュの大容量", "洗濯洗剤・食器用洗剤のまとめ買いパック", "ゴミ袋・キッチンペーパー"],
    note: "置き場所を確認してから申し込むと安心です。",
  },
];

export function Step4Tax() {
  const { state, derived } = useStore();
  const t = derived.tax;
  const giftValue = t.furusatoLimit * 0.3; // 返礼品は寄付額の3割以下が決まり
  const saved = Math.max(0, giftValue - 2000);

  return (
    <div className="flex flex-col gap-5">
      <Big
        label="ふるさと納税の年間上限額（目安）"
        value={yen(t.furusatoLimit)}
        sub={
          <span>
            額面の年収 <b className="num">{fmt(state.profile.annualGross / 10000)}万円</b>
            {t.spouse ? "・配偶者控除あり" : ""} の会社員として計算。
            自己負担2,000円で、およそ <b className="num">{yen(giftValue)}</b> 分の返礼品を受け取れます。
          </span>
        }
      />

      <Card title="失敗しない「コスパ最強」返礼品の選び方" icon={<Gift size={20} />}>
        <p className="mb-4 text-sm text-ink-2">
          返礼品の価値は寄付額の3割までと決まっています。上限いっぱい使うと、実質 <b className="num">2,000円</b> の負担で、家計がおよそ{" "}
          <b className="num text-accent">{yen(saved)}</b> 浮く計算です（1か月あたり約 <b className="num">{yen(saved / 12)}</b>）。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PICKS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface-2 p-4">
              <p className="font-bold text-ink">{p.title}</p>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
                {p.items.map((x) => <li key={x} className="flex gap-2"><span className="text-accent">●</span>{x}</li>)}
              </ul>
              <p className="mt-2 text-xs text-muted">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <OutButton link="rakutenFurusato">楽天ふるさと納税で返礼品を探す</OutButton>
          <OutButton link="satofull" variant="outline">さとふるで探す</OutButton>
          <OutButton link="furunavi" variant="outline">ふるなびで探す</OutButton>
        </div>
        <div className="mt-4">
          <Note>
            上限額は、独身または配偶者控除のみの会社員で、ほかの控除（住宅ローン控除・医療費控除・iDeCoなど）がない場合の目安です。
            高校生・大学生の子どもを扶養している場合などは上限が下がります。正確な金額は、各ふるさと納税サイトの詳しいシミュレーターで確認してください。
            会社員でふるさと納税をする自治体が5つ以内なら、「ワンストップ特例」を使うと確定申告が不要です。
          </Note>
        </div>
      </Card>

      <Card title="新NISAとiDeCo、どう違う？" icon={<Landmark size={20} />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 text-ink">
                <th className="p-3 text-left"></th>
                <th className="p-3 text-left">新NISA</th>
                <th className="p-3 text-left">iDeCo（個人型確定拠出年金）</th>
              </tr>
            </thead>
            <tbody className="text-ink">
              {[
                ["向いている人", "まずはここから。すべての人", "老後のお金を、税金を減らしながら貯めたい人"],
                ["使える金額", "年360万円まで（つみたて枠120万円＋成長枠240万円）、生涯1,800万円", "会社員（企業年金なし）は月2.3万円まで など働き方で変わる"],
                ["運用で増えた分", "税金がかからない", "税金がかからない"],
                ["払った金額", "税金は減らない", "全額が所得控除になり、所得税・住民税が減る"],
                ["引き出し", "いつでもできる", "原則60歳まで引き出せない"],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-line">
                  <th className="p-3 text-left font-bold text-ink-2">{k}</th>
                  <td className="p-3">{a}</td>
                  <td className="p-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 rounded-xl bg-accent-soft p-4 text-sm text-ink">
          あなたが会社員（企業年金なし）で iDeCo に月 <b className="num">{yen(t.idecoMonthly)}</b> 積み立てると、税金が1年で約{" "}
          <b className="num text-accent">{yen(t.idecoSaving)}</b> 減る計算です（所得税率 {Math.round(t.itRate * 100)}% ＋ 住民税10%）。
        </p>
        <div className="mt-3">
          <Note>
            iDeCoは原則60歳まで引き出せないので、生活費や近いうちに使うお金はNISAや預金で持つのが基本です。iDeCoの掛金の上限は、制度改正で今後引き上げられる予定です。最新の内容は国民年金基金連合会の「iDeCo公式サイト」で確認してください。
          </Note>
        </div>
      </Card>
    </div>
  );
}
