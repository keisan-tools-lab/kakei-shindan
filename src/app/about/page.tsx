import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";

export const metadata: Metadata = { title: "運営者情報・お問い合わせ" };

export default function About() {
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-10 leading-relaxed text-ink">
      <Link href="/" className="text-sm font-bold text-accent">← 診断にもどる</Link>
      <h1 className="text-2xl font-bold text-ink">運営者情報・お問い合わせ</h1>

      <h2 className="mt-4 text-lg font-bold text-ink">このサイトについて</h2>
      <p>{SITE.name}は、家計の固定費の見直し、キャッシュレス決済とポイ活、ふるさと納税、新NISA・iDeCoの資産運用までを、5つのステップでまとめて診断・シミュレーションできる無料のツールです。</p>

      <h2 className="mt-4 text-lg font-bold text-ink">運営者</h2>
      <ul className="list-disc pl-6">
        <li>サイト名：{SITE.name}</li>
        <li>運営者：keisan-tools-lab（「くらし計算帖」の運営者）</li>
        <li>開設日：{SITE.updated}</li>
      </ul>

      <h2 className="mt-4 text-lg font-bold text-ink">お問い合わせ</h2>
      <p>計算のまちがいのご報告や、ご要望は、次のページから受け付けています（GitHub のアカウントでログインして「New issue」から送れます）。</p>
      <p><a className="font-bold text-accent underline" href={SITE.contactUrl} target="_blank" rel="noopener">お問い合わせページを開く</a></p>

      <h2 className="mt-4 text-lg font-bold text-ink">姉妹サイト</h2>
      <p><a className="text-accent underline" href="https://keisan-tools-lab.github.io/kurashi-keisan/" target="_blank" rel="noopener">くらし計算帖</a>（割り勘・日割り・手取り・年金など、毎日の暮らしの計算機）</p>
    </article>
  );
}
