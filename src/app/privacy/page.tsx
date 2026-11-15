import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";

export const metadata: Metadata = { title: "プライバシーポリシー・免責事項" };

export default function Privacy() {
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-10 leading-relaxed text-ink">
      <Link href="/" className="text-sm font-bold text-accent">← 診断にもどる</Link>
      <h1 className="text-2xl font-bold text-ink">プライバシーポリシー・免責事項</h1>
      <p className="text-sm text-muted">制定日：{SITE.updated}</p>

      <h2 className="mt-4 text-lg font-bold text-ink">入力した内容の取り扱い</h2>
      <p>診断で入力した年収や支出などの内容は、お使いのブラウザの中（LocalStorage）にだけ保存されます。当サイトのサーバーや第三者に送信されることはありません。</p>

      <h2 className="mt-4 text-lg font-bold text-ink">広告の配信について</h2>
      <p>
        当サイトは、第三者配信の広告サービス「Google AdSense」を利用しています。Google などの第三者配信事業者は、Cookie を使用して、利用者が当サイトやほかのサイトに過去にアクセスした情報にもとづいて広告を配信します。
        利用者は <a className="text-accent underline" href="https://adssettings.google.com/" target="_blank" rel="noopener">Google の広告設定</a> でパーソナライズ広告を無効にできます。
        くわしくは <a className="text-accent underline" href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener">Google の広告に関するポリシー</a> をご覧ください。
      </p>

      <h2 className="mt-4 text-lg font-bold text-ink">アフィリエイトについて</h2>
      <p>当サイトは、アフィリエイトプログラム（成果報酬型の広告）に参加しています。「PR」と表示したリンクは広告で、そのリンクから申し込みがあった場合、当サイトが紹介料を受け取ることがあります。紹介する内容は、報酬の有無にかかわらず当サイトの基準で選んでいます。</p>

      <h2 className="mt-4 text-lg font-bold text-ink">免責事項</h2>
      <p>
        当サイトの診断・シミュレーションの結果は、一般的な条件をもとにした目安です。税金・社会保険・各社のサービス内容やポイント還元率は変わることがあり、正確さを保証するものではありません。
        当サイトは情報の提供を目的としており、特定の金融商品の購入や投資をすすめるものではありません。投資にはリスクがあり、元本を下回ることがあります。
        当サイトの利用によって生じた損害について、当サイトは責任を負いかねます。最終的なご判断は、各社の公式情報を確認のうえ、ご自身でお願いいたします。
      </p>

      <h2 className="mt-4 text-lg font-bold text-ink">このポリシーの変更</h2>
      <p>必要に応じて内容を変更することがあります。変更した場合は、このページでお知らせします。</p>
    </article>
  );
}
