// =============================================
// 診断の計算をまとめたファイル
// 画面（components）からは、ここの関数だけを呼びます。
// =============================================
import { CATEGORIES, GOLDEN, SUBS, familyType } from "@/config/budget";
import { CARRIER_BONUS, ECONOMIES, TSUMITATE_LIMIT, type Economy } from "@/config/economies";
import type { AgeGroup, AppState, CategoryKey, ConvBrand, Family, NetBrand } from "./types";

export const CONV_NAME: Record<ConvBrand, string> = { seven: "セブン-イレブン", lawson: "ローソン", famima: "ファミリーマート", other: "その他" };
export const NET_NAME: Record<NetBrand, string> = { amazon: "Amazon", rakuten: "楽天市場", yahoo: "Yahoo!ショッピング", none: "なし" };

/* ---------- ステップ1：理想の家計 ---------- */

export function idealBudget(takeHome: number, family: Family) {
  const ratio = GOLDEN[familyType(family)];
  const out = {} as Record<CategoryKey | "saving", number>;
  (Object.keys(ratio) as (CategoryKey | "saving")[]).forEach((k) => {
    out[k] = Math.round((takeHome * ratio[k]) / 100);
  });
  return { ratio, amount: out };
}

/* ---------- ステップ2：余剰資金 ---------- */

export function surplusOf(s: AppState) {
  const { amount: ideal } = idealBudget(s.profile.takeHome, s.profile.family);

  // チェックした見直しの金額を、カテゴリごとに引く
  const subsByCat: Partial<Record<CategoryKey, number>> = {};
  SUBS.forEach((x) => {
    if (s.subs[x.key]) subsByCat[x.cat] = (subsByCat[x.cat] ?? 0) + x.amount;
  });

  let subsSaving = 0;
  let gapSaving = 0;
  let housingGap = 0;
  const rows = CATEGORIES.map(({ key, label }) => {
    const now = Math.max(0, s.spending[key] || 0);
    const cut = Math.min(now, subsByCat[key] ?? 0); // 支出より多くは減らせない
    subsSaving += cut;
    const after = now - cut;
    const over = Math.max(0, after - ideal[key]);
    if (key === "housing") housingGap = over; // 家賃はすぐに変えにくいので別あつかい
    else gapSaving += over;
    return { key, label, now, ideal: ideal[key], cut, over };
  });

  const totalSpend = rows.reduce((a, r) => a + r.now, 0);
  return {
    rows,
    subsSaving,
    gapSaving,
    housingGap,
    surplus: subsSaving + gapSaving, // 毎月生み出せる余剰資金
    currentSaving: Math.max(0, s.profile.takeHome - totalSpend), // いま残っているお金
    idealSaving: ideal.saving,
  };
}

/* ---------- ステップ3：経済圏ランキング ---------- */

export function rankEconomies(s: AppState, surplus: number) {
  const { conv, net, carrier } = s.shops;
  const sp = s.shopSpend;
  const invest = Math.min(Math.max(0, surplus), TSUMITATE_LIMIT);

  // 複数選んだときは、それぞれのお店で同じくらい使うとして、還元率を平均します
  const avgRate = <K extends string>(list: K[], table: Partial<Record<K, number>>, base: number) =>
    list.length ? list.reduce((a, k) => a + (table[k] ?? base), 0) / list.length : base;

  return ECONOMIES.map((e: Economy) => {
    const convRate = avgRate(conv, e.conv, e.base);
    const netRate = avgRate(net, e.net, e.base);
    const convHits = conv.filter((k) => (e.conv[k] ?? e.base) > e.base);
    const netHits = net.filter((k) => (e.net[k] ?? e.base) > e.base);
    const carrierHit = carrier.some((c) => e.carriers.includes(c));
    const parts = {
      conv: (sp.conv * convRate) / 100,
      super: (sp.super * e.base) / 100,
      net: (sp.net * netRate) / 100,
      other: (sp.other * e.base) / 100,
      carrier: carrierHit ? CARRIER_BONUS : 0,
      tsumitate: (invest * e.tsumitate) / 100,
    };
    const points = Math.round(Object.values(parts).reduce((a, b) => a + b, 0));
    const reasons: string[] = [];
    if (convHits.length) reasons.push(`よく使うコンビニ（${convHits.map((k) => CONV_NAME[k]).join("・")}）で還元率アップ`);
    if (netHits.length) reasons.push(`よく使うネット通販（${netHits.map((k) => NET_NAME[k]).join("・")}）で還元率アップ`);
    if (carrierHit) reasons.push("いまの携帯会社と相性がよい");
    if (invest > 0) reasons.push(`クレカ積立 月${Math.round(invest / 1000)}千円で ${e.tsumitate}% 還元`);
    return { eco: e, points, parts, reasons };
  }).sort((a, b) => b.points - a.points);
}

/* ---------- ステップ4：税金・ふるさと納税・iDeCo ---------- */

/** 給与所得控除（2025年分から） */
function kyuyoKojo(s: number) {
  if (s <= 1900000) return Math.min(s, 650000);
  if (s <= 3600000) return s * 0.3 + 80000;
  if (s <= 6600000) return s * 0.2 + 440000;
  if (s <= 8500000) return s * 0.1 + 1100000;
  return 1950000;
}
/** 所得税の基礎控除（2025年・2026年分） */
function kisoKojo(income: number) {
  if (income <= 1320000) return 950000;
  if (income <= 3360000) return 880000;
  if (income <= 4890000) return 680000;
  if (income <= 6550000) return 630000;
  if (income <= 23500000) return 580000;
  return 0;
}
/** 課税所得に対する所得税率 */
function itRate(taxable: number) {
  const T: [number, number][] = [
    [1950000, 0.05], [3300000, 0.1], [6950000, 0.2], [9000000, 0.23],
    [18000000, 0.33], [40000000, 0.4], [Infinity, 0.45],
  ];
  return T.find(([max]) => taxable <= max)![1];
}

export function taxInfo(annualGross: number, family: Family, ageGroup: AgeGroup) {
  const S = Math.max(0, annualGross || 0);
  const careRate = ageGroup === "40s" || ageGroup === "50s" ? 0.008 : 0;
  const social = S * (0.05 + careRate + 0.0055) + Math.min(S / 12, 650000) * 12 * 0.0915;
  const income = Math.max(0, S - kyuyoKojo(S));
  const spouse = family === "coupleDep" || family === "kidsDep";

  const itTaxable = Math.max(0, income - social - kisoKojo(income) - (spouse ? 380000 : 0));
  const rate = itRate(itTaxable);
  const rTaxable = Math.max(0, income - social - 430000 - (spouse ? 330000 : 0));
  const shotokuwari = Math.max(0, rTaxable * 0.1 - (spouse ? 5000 : 2500));

  // ふるさと納税の上限（目安）＝ 住民税所得割 × 20% ÷（90% − 所得税率 × 1.021）＋ 2,000円
  const limitRaw = shotokuwari > 0 ? (shotokuwari * 0.2) / (0.9 - rate * 1.021) + 2000 : 0;
  const furusatoLimit = Math.floor(limitRaw / 1000) * 1000;

  // iDeCo（会社員・企業年金なしの上限 月23,000円）で減る税金
  const idecoMonthly = 23000;
  const idecoSaving = itTaxable > 0 ? idecoMonthly * 12 * (rate * 1.021 + 0.1) : idecoMonthly * 12 * 0.1;

  return { furusatoLimit, itRate: rate, idecoMonthly, idecoSaving, spouse };
}

/* ---------- ステップ5：複利シミュレーション ---------- */

export function simulate(monthly: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12;
  let bal = 0;
  let principal = 0;
  const labels: string[] = [];
  const principals: number[] = [];
  const totals: number[] = [];
  for (let m = 1; m <= years * 12; m++) {
    bal = (bal + monthly) * (1 + r);
    principal += monthly;
    if (m % 12 === 0) {
      labels.push(`${m / 12}年`);
      principals.push(Math.round(principal));
      totals.push(Math.round(bal));
    }
  }
  return { labels, principals, totals, final: bal, principal, gain: bal - principal };
}
