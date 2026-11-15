import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { Outfit, Zen_Kaku_Gothic_New } from "next/font/google";
import { PiggyBank } from "lucide-react";
import { SITE } from "@/config/site";
import "./globals.css";

// 英字・数字用（すっきりした幾何学的な形）
const latin = Outfit({
  variable: "--font-latin",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
// 日本語用（細身でモダンなゴシック体）
const jp = Zen_Kaku_Gothic_New({
  variable: "--font-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN;
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name}｜節約・ポイ活・ふるさと納税・新NISAを無料でまとめて診断`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,
  ...(origin ? { metadataBase: new URL(`${origin}${base}/`) } : {}),
  openGraph: { title: SITE.name, description: SITE.description, type: "website", locale: "ja_JP" },
  twitter: { card: "summary" },
  other: { "google-adsense-account": SITE.adsenseClient },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#172340" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${latin.variable} ${jp.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="border-b border-line bg-bg/80 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-ink">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white">
                <PiggyBank size={20} aria-hidden />
              </span>
              <span className="text-lg tracking-wide">{SITE.name}</span>
            </Link>
            <span className="hidden text-xs text-muted sm:block">登録不要・無料・入力内容は送信されません</span>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-16 border-t border-line bg-surface/60">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 text-sm text-ink-2">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 font-medium" aria-label="サイトの情報">
              <Link href="/" className="hover:text-accent">トップ（診断）</Link>
              <Link href="/about/" className="hover:text-accent">運営者情報・お問い合わせ</Link>
              <Link href="/privacy/" className="hover:text-accent">プライバシーポリシー・免責事項</Link>
            </nav>
            <p className="text-xs leading-relaxed text-muted">
              当サイトは情報の提供を目的としており、特定の金融商品の購入や投資をすすめるものではありません。
              投資にはリスクがあり、元本を下回ることがあります。最終的なご判断はご自身でお願いいたします。
              当サイトはアフィリエイトプログラムを利用しており、「PR」と表示したリンクは広告です。
            </p>
            <p className="text-xs text-muted">© {SITE.name}</p>
          </div>
        </footer>

        {/* Google AdSense（自動広告） */}
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}`}
        />
      </body>
    </html>
  );
}
