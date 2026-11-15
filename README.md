# まるっと家計診断

家計のムダ削減 → ポイ活 → ふるさと納税・節税 → 新NISA・iDeCoの資産運用までを、
5つのステップで診断・シミュレーションできるサイトです（Next.js / TypeScript / Tailwind CSS / Chart.js）。

## 動かし方（自分のパソコンで確認）

```powershell
cd C:\dev\kakei-shindan
npm install      # 最初の1回だけ
npm run dev      # http://localhost:3000 で確認できます
```

止めるときは `Ctrl + C` を押します。

## 公開用のファイルを作る

```powershell
npm run build    # out フォルダに完成品ができる
```

GitHub に送ると、`.github/workflows/deploy.yml` の設定で GitHub Pages に自動公開されます。

## よく変える場所

| やりたいこと | ファイル |
|---|---|
| サイト名・説明・AdSense の ID | `src/config/site.ts` |
| AdSense の広告ユニットID（審査合格後） | `src/config/site.ts` の `AD_SLOTS` |
| アフィリエイトのリンク（ASPで発行したもの） | `src/config/affiliateLinks.ts`（`isAffiliate: true` で「PR」表示） |
| 経済圏の還元率（ランキングの計算） | `src/config/economies.ts` |
| 家計の黄金比・見直しチェックリスト | `src/config/budget.ts` |
| 計算のしかた（余剰資金・ふるさと納税・複利） | `src/lib/calc.ts` |
| 読み物・よくある質問 | `src/components/Articles.tsx` |

## フォルダの中身

```
src/
├─ app/                 ページ（page.tsx がトップ、privacy・about）
├─ components/
│   ├─ Wizard.tsx       5ステップの進み方
│   ├─ StepBar.tsx      上のステップバー
│   ├─ steps/           ステップ1〜5の画面
│   ├─ AdBanner.tsx     広告の枠（高さを確保してずれを防ぐ）
│   ├─ GrowthChart.tsx  複利のグラフ
│   ├─ ShareButtons.tsx X・LINE でシェア
│   ├─ Articles.tsx     読み物とよくある質問（構造化データつき）
│   └─ ui.tsx           カード・スライダー・入力欄などの部品
├─ config/              設定（上の表を参照）
└─ lib/
    ├─ calc.ts          計算
    ├─ store.tsx        入力内容をブラウザに自動保存
    └─ types.ts         データの形と初期値
```

## 注意

- 還元率・税金・制度は変わります。`src/config/site.ts` の `updated`（確認日）とあわせて、定期的に見直してください。
- 「PR」の表示は、アフィリエイトのリンクに必ずつけてください（ステルスマーケティング規制）。
