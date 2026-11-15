// =============================================
// 経済圏（カード × 証券口座）の設定
// ---------------------------------------------
// 還元率は、当サイトがランキングの計算に使う「目安」です。
// 実際の還元率は、カードの種類・キャンペーン・時期・利用条件で変わるので、
// 変わったときはここを直してください。（%で書きます）
// =============================================
import type { AffiliateKey } from "./affiliateLinks";
import type { Carrier, ConvBrand, NetBrand } from "@/lib/types";

export interface Economy {
  key: string;
  route: string; // 「○○ × △△ルート」
  point: string; // たまるポイント
  card: AffiliateKey;
  securities: AffiliateKey;
  base: number; // ふだんの買い物の還元率
  conv: Partial<Record<ConvBrand, number>>; // コンビニ・外食で上がる還元率
  net: Partial<Record<NetBrand, number>>; // ネット通販で上がる還元率
  carriers: Carrier[]; // 相性のよい携帯会社
  tsumitate: number; // クレカ積立の還元率
  features: string[];
}

/** 携帯会社とそろえたときに上乗せする、毎月のポイント・割引の目安 */
export const CARRIER_BONUS = 500;
/** クレジットカードで積み立てできる上限（月） */
export const TSUMITATE_LIMIT = 100000;

export const ECONOMIES: Economy[] = [
  {
    key: "olive",
    route: "三井住友Olive × SBI証券ルート",
    point: "Vポイント",
    card: "olive",
    securities: "sbi",
    base: 0.5,
    conv: { seven: 7, lawson: 7, famima: 7 },
    net: {},
    carriers: [],
    tsumitate: 0.5,
    features: ["対象のコンビニ・飲食店でスマホのタッチ決済をすると高還元", "銀行・カード・証券が1つのアプリにまとまる", "SBI証券でクレカ積立ができる"],
  },
  {
    key: "paypay",
    route: "PayPay × PayPay証券ルート",
    point: "PayPayポイント",
    card: "paypayCard",
    securities: "paypaySec",
    base: 1.0,
    conv: {},
    net: { yahoo: 5 },
    carriers: ["softbank"],
    tsumitate: 0.5,
    features: ["使えるお店がとても多いQRコード決済", "Yahoo!ショッピングでポイントがたまりやすい", "ソフトバンク・ワイモバイル・LINEMOと相性がよい"],
  },
  {
    key: "rakuten",
    route: "楽天ペイ × 楽天証券ルート",
    point: "楽天ポイント",
    card: "rakutenCard",
    securities: "rakutenSec",
    base: 1.0,
    conv: {},
    net: { rakuten: 3 },
    carriers: ["rakuten"],
    tsumitate: 0.5,
    features: ["楽天市場の買い物でポイントがたまりやすい", "楽天モバイルなどグループのサービスを使うほどお得", "ポイントで投資信託を買える"],
  },
  {
    key: "docomo",
    route: "dカード × マネックス証券ルート",
    point: "dポイント",
    card: "dCard",
    securities: "monex",
    base: 1.0,
    conv: {},
    net: {},
    carriers: ["docomo"],
    tsumitate: 0.5,
    features: ["ドコモの携帯料金と相性がよい", "dポイントが使えるお店が多い", "マネックス証券でdカード積立ができる"],
  },
  {
    key: "au",
    route: "au PAY × 三菱UFJ eスマート証券ルート",
    point: "Pontaポイント",
    card: "auPayCard",
    securities: "mufgEsmart",
    base: 1.0,
    conv: {},
    net: {},
    carriers: ["au"],
    tsumitate: 0.5,
    features: ["au・UQモバイルの携帯料金と相性がよい", "Pontaポイントが使えるお店が多い", "au PAY カードで積立ができる"],
  },
];
