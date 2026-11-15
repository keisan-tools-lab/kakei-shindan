"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";
import { simulate } from "@/lib/calc";
import { fmt, man, yen } from "@/lib/format";
import { affiliateLinks, type AffiliateKey } from "@/config/affiliateLinks";
import { AdBanner } from "../AdBanner";
import { GrowthChart } from "../GrowthChart";
import { ShareButtons } from "../ShareButtons";
import { Big, Card, Note, OutButton, Slider } from "../ui";

export function Step5Future() {
  const { state, update, derived } = useStore();
  const auto = derived.autoMonthly;
  const monthly = state.sim.monthly ?? auto;
  const sim = simulate(monthly, state.sim.rate, state.sim.years);
  const best = derived.ranking[0].eco;
  const age = state.profile.ageGroup;
  const senior = age === "40s" || age === "50s" || age === "60s";

  const picks = [
    {
      title: "新NISA・つみたて投資枠",
      body: "全世界の株式にまとめて投資できるインデックスファンド（例：eMAXIS Slim 全世界株式（オール・カントリー））を毎月コツコツ。迷ったらまずここから。",
    },
    senior
      ? {
          title: "新NISA・成長投資枠（配当も重視したい人）",
          body: "配当（株主への分配金）を受け取りながら持てる高配当の日本株や、PBR1倍割れからの改善に取り組む企業への投資を、一部だけ組み合わせる方法もあります。",
        }
      : {
          title: "iDeCo（老後のお金）",
          body: "掛金が所得控除になるので、会社員なら税金も減らせます。60歳まで引き出せないので、無理のない金額で。",
        },
  ];

  const roadmap: { n: string; title: string; body: string; link?: AffiliateKey }[] = [
    { n: "①", title: "クレジットカード・銀行アプリを入れる", body: `ステップ3の1位「${best.route}」のカードと、その会社のアプリをスマホに入れます。`, link: best.card },
    { n: "②", title: "証券口座をスマホで開く", body: `${affiliateLinks[best.securities].label}などの証券口座を、マイナンバーカードと本人確認書類でスマホから申し込みます（NISA口座も同時に開けます）。`, link: best.securities },
    { n: "③", title: "ポイントを連携する", body: "カード・証券・ポイントのアカウントをつなげて、たまったポイントでも投資できるようにします。" },
    { n: "④", title: "毎月の自動積立を設定する", body: `つみたて投資枠で、毎月 ${yen(monthly)} のクレカ積立（上限 月10万円）を設定すれば、あとはほったらかしでOKです。` },
  ];

  const shareText = `私の家計改善ポテンシャルは月${man(auto)}、${state.sim.years}年後の資産予測は${man(sim.final)}でした！`;

  return (
    <div className="flex flex-col gap-5">
      <Card title="毎月の積立と、運用の条件" icon={<TrendingUp size={20} />}>
        <div className="flex flex-col gap-6">
          <Slider
            label="毎月の積立額"
            hint={state.sim.monthly === null ? "（ステップ2・3の結果）" : "（手動で変更中）"}
            value={monthly}
            min={0}
            max={Math.max(200000, Math.ceil(auto / 10000) * 10000)}
            step={1000}
            onChange={(v) => update((d) => { d.sim.monthly = v; })}
          />
          {state.sim.monthly !== null && (
            <button type="button" onClick={() => update((d) => { d.sim.monthly = null; })} className="-mt-3 self-start text-sm font-bold text-accent underline">
              ステップ2・3の結果（{yen(auto)}）にもどす
            </button>
          )}
          <Slider label="想定利回り（年）" value={state.sim.rate} min={1} max={10} step={0.5} unit="%" onChange={(v) => update((d) => { d.sim.rate = v; })} />
          <Slider label="運用期間" value={state.sim.years} min={5} max={35} step={1} unit="年" onChange={(v) => update((d) => { d.sim.years = v; })} />
        </div>
      </Card>

      <Big
        label={`${state.sim.years}年後の資産予測`}
        value={man(sim.final)}
        sub={
          <span>
            積み立てた元本 <b className="num">{man(sim.principal)}</b> ＋{" "}
            <b className="num rounded bg-emerald-600 px-1.5 text-white">運用益 {man(sim.gain)}</b>
          </span>
        }
      />

      <Card>
        <GrowthChart labels={sim.labels} principals={sim.principals} totals={sim.totals} />
        <div className="mt-3">
          <Note>毎年同じ利回りが続いた場合の計算です（月ごとの複利・税金や手数料は考えていません）。実際の運用では利回りは毎年変わり、元本を下回ることもあります。</Note>
        </div>
      </Card>

      <AdBanner slotName="afterResult" />

      <Card title="あなたにおすすめの投資先の例" icon={<Sparkles size={20} />}>
        <div className="grid gap-3 sm:grid-cols-2">
          {picks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface-2 p-4">
              <p className="font-bold text-ink">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Note>ここで紹介しているのは考え方の例で、特定の商品をすすめるものではありません。商品の内容やリスクは、目論見書などで確認してください。</Note>
        </div>
      </Card>

      <Card title="今日から始める4ステップ">
        <ol className="flex flex-col gap-4">
          {roadmap.map((r) => (
            <li key={r.n} className="flex gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-btn text-sm font-bold text-white">{r.n}</span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="font-bold text-ink">{r.title}</p>
                <p className="text-sm text-ink-2">{r.body}</p>
                {r.link && (
                  <div>
                    <OutButton link={r.link} variant={r.n === "②" ? "solid" : "outline"}>
                      {affiliateLinks[r.link].label}
                      {r.n === "②" ? "の無料口座開設はこちら" : "の公式サイトを見る"}
                    </OutButton>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <OutButton link="sbi" variant="outline">SBI証券の無料口座開設</OutButton>
          <OutButton link="rakutenSec" variant="outline">楽天証券の無料口座開設</OutButton>
        </div>
      </Card>

      <Card>
        <p className="mb-3 rounded-xl bg-accent-soft p-4 text-sm font-bold text-ink">{shareText}</p>
        <ShareButtons text={shareText} />
        <p className="mt-3 text-xs text-muted">月 {fmt(monthly)} 円 × 年利 {state.sim.rate}% × {state.sim.years}年 で計算しています。</p>
      </Card>
    </div>
  );
}
