// =============================================
// 家計の黄金比と、見直しチェックリスト
// 数字は当サイトが目安として決めたものです。自由に変えてかまいません。
// =============================================
import type { CategoryKey, Family } from "@/lib/types";

export const CATEGORIES: { key: CategoryKey; label: string; hint: string }[] = [
  { key: "housing", label: "住居費", hint: "家賃・住宅ローン・管理費" },
  { key: "food", label: "食費", hint: "外食・お弁当もふくむ" },
  { key: "utility", label: "光熱費", hint: "電気・ガス・水道" },
  { key: "telecom", label: "通信・サブスク", hint: "スマホ・ネット・動画や音楽の配信" },
  { key: "insurance", label: "保険", hint: "生命保険・医療保険など" },
  { key: "daily", label: "日用品・その他", hint: "洗剤・ティッシュ・新聞など" },
  { key: "leisure", label: "娯楽・交際費", hint: "趣味・飲み会・ジム" },
  { key: "education", label: "教育費", hint: "習い事・学費・塾" },
];

export type FamilyType = "single" | "couple" | "kids";
export const familyType = (f: Family): FamilyType =>
  f === "single" ? "single" : f.startsWith("kids") ? "kids" : "couple";

/** 手取りに対する割合（%）。合計100%になるようにしています。 */
export const GOLDEN: Record<FamilyType, Record<CategoryKey | "saving", number>> = {
  single: { housing: 25, food: 15, utility: 7, telecom: 5, insurance: 3, daily: 5, leisure: 10, education: 0, saving: 30 },
  couple: { housing: 25, food: 15, utility: 7, telecom: 5, insurance: 4, daily: 5, leisure: 8, education: 0, saving: 31 },
  kids: { housing: 25, food: 17, utility: 7, telecom: 4, insurance: 5, daily: 6, leisure: 6, education: 8, saving: 22 },
};

/** よくある固定費・サブスクの見直し候補（金額は一般的な月額の目安） */
export const SUBS: { key: string; label: string; amount: number; cat: CategoryKey; action: string }[] = [
  { key: "carrier", label: "大手キャリアのスマホ → 格安プランに変える", amount: 5000, cat: "telecom", action: "見直し" },
  { key: "video", label: "動画配信サービス（使っていないもの）", amount: 1490, cat: "telecom", action: "解約" },
  { key: "music", label: "音楽配信サービス", amount: 1080, cat: "telecom", action: "解約" },
  { key: "cloud", label: "クラウドの容量プラン", amount: 400, cat: "telecom", action: "解約" },
  { key: "gym", label: "あまり行っていないジム", amount: 7700, cat: "leisure", action: "解約" },
  { key: "magazine", label: "雑誌・マンガの読み放題", amount: 760, cat: "leisure", action: "解約" },
  { key: "insurance", label: "保険の見直し（保障の重なり）", amount: 3000, cat: "insurance", action: "見直し" },
  { key: "newspaper", label: "紙の新聞", amount: 4400, cat: "daily", action: "解約" },
  { key: "member", label: "通販サイトの有料会員（使っていない）", amount: 600, cat: "daily", action: "解約" },
];
