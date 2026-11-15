// =============================================
// サイト全体の設定
// =============================================

export const SITE = {
  name: "まるっと家計診断",
  // 公開しているアドレス（サイトマップなどで使います。最後に / はつけません）
  url: "https://keisan-tools-lab.github.io/kakei-shindan",
  // Google サーチコンソールの所有権の確認（HTMLタグの content の値）
  googleVerification: "hgQtQbagWYO1CZbOsEXOiBtvng-TmpAs5_-IVNGuipk",
  description:
    "家計のムダ削減から、ポイ活、ふるさと納税、新NISA・iDeCoの資産運用までを、5つのステップで診断・シミュレーションできる無料ツールです。",
  // Google AdSense のサイト運営者ID（くらし計算帖と同じアカウント）
  adsenseClient: "ca-pub-1463938767131857",
  // お問い合わせ先（GitHub の Issues）
  contactUrl: "https://github.com/keisan-tools-lab/kakei-shindan/issues",
  // データや制度の内容を確認した日
  updated: "2026年11月15日",
};

/**
 * AdSense の「広告ユニット」の ID（data-ad-slot の数字）。
 * 審査に合格したら、AdSense の画面で広告ユニットを作って、ここに数字を入れてください。
 * 空のままなら、その場所には広告を出しません（自動広告は別に表示されます）。
 */
export const AD_SLOTS = {
  afterStep: "", // 各ステップの下
  afterResult: "", // シミュレーション結果の下
  inArticle: "", // 読み物の途中
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;
