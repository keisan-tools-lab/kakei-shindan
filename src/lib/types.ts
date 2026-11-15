// 診断で使うデータの形

export type AgeGroup = "20s" | "30s" | "40s" | "50s" | "60s";
export type Family = "single" | "couple" | "coupleDep" | "kids" | "kidsDep";
export type CategoryKey =
  | "housing"
  | "food"
  | "utility"
  | "telecom"
  | "insurance"
  | "daily"
  | "leisure"
  | "education";
export type ConvBrand = "seven" | "lawson" | "famima" | "other";
export type NetBrand = "amazon" | "rakuten" | "yahoo" | "none";
export type Carrier = "docomo" | "au" | "softbank" | "rakuten" | "other";

export interface AppState {
  step: number; // 1〜5
  profile: {
    ageGroup: AgeGroup;
    takeHome: number; // 手取り月収
    annualGross: number; // 額面の年収（ふるさと納税・iDeCoの計算用）
    family: Family;
  };
  spending: Record<CategoryKey, number>; // いまの毎月の支出
  subs: Record<string, boolean>; // 見直すチェック
  shops: { conv: ConvBrand[]; net: NetBrand[]; carrier: Carrier[] }; // 複数選べる
  shopSpend: { conv: number; super: number; net: number; other: number };
  sim: { rate: number; years: number; monthly: number | null }; // monthly が null なら自動
}

export const DEFAULT_STATE: AppState = {
  step: 1,
  profile: { ageGroup: "30s", takeHome: 280000, annualGross: 4500000, family: "single" },
  spending: {
    housing: 85000,
    food: 50000,
    utility: 12000,
    telecom: 14000,
    insurance: 12000,
    daily: 15000,
    leisure: 35000,
    education: 0,
  },
  subs: { carrier: true },
  shops: { conv: ["seven"], net: ["amazon"], carrier: ["docomo"] },
  shopSpend: { conv: 8000, super: 35000, net: 12000, other: 30000 },
  sim: { rate: 5, years: 20, monthly: null },
};
