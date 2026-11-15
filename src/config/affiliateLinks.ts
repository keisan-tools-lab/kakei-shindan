// =============================================
// 外部リンク（アフィリエイト）の一覧
// ---------------------------------------------
// 今は各社の公式サイトのアドレスが入っています。
// ASP（A8.net、もしもアフィリエイト、バリューコマースなど）で
// 広告リンクを発行したら、url を差し替えて isAffiliate を true にしてください。
// isAffiliate が true のボタンには、自動で「PR」の表示がつきます
// （広告であることを示す表示は、ステルスマーケティング規制で必要です）。
// =============================================

export interface OutLink {
  label: string;
  url: string;
  isAffiliate: boolean;
}

export const affiliateLinks = {
  // クレジットカード・決済
  olive: { label: "三井住友カード（Olive）", url: "https://www.smbc-card.com/", isAffiliate: false },
  paypayCard: { label: "PayPayカード", url: "https://www.paypay-card.co.jp/", isAffiliate: false },
  rakutenCard: { label: "楽天カード", url: "https://www.rakuten-card.co.jp/", isAffiliate: false },
  dCard: { label: "dカード", url: "https://dcard.docomo.ne.jp/", isAffiliate: false },
  auPayCard: { label: "au PAY カード", url: "https://www.kddi-fs.com/", isAffiliate: false },

  // 証券会社
  sbi: { label: "SBI証券", url: "https://www.sbisec.co.jp/", isAffiliate: false },
  rakutenSec: { label: "楽天証券", url: "https://www.rakuten-sec.co.jp/", isAffiliate: false },
  paypaySec: { label: "PayPay証券", url: "https://www.paypay-sec.co.jp/", isAffiliate: false },
  monex: { label: "マネックス証券", url: "https://www.monex.co.jp/", isAffiliate: false },
  mufgEsmart: { label: "三菱UFJ eスマート証券", url: "https://kabu.com/", isAffiliate: false },

  // ふるさと納税
  rakutenFurusato: { label: "楽天ふるさと納税", url: "https://event.rakuten.co.jp/furusato/", isAffiliate: false },
  satofull: { label: "さとふる", url: "https://www.satofull.jp/", isAffiliate: false },
  furunavi: { label: "ふるなび", url: "https://furunavi.jp/", isAffiliate: false },
} satisfies Record<string, OutLink>;

export type AffiliateKey = keyof typeof affiliateLinks;
