import type { NextConfig } from "next";

// GitHub Pages で公開するときは、自動公開の設定（.github/workflows/deploy.yml）が
// リポジトリ名を REPO_NAME として渡します。
//   ・リポジトリ名が「ユーザー名.github.io」 → https://ユーザー名.github.io/
//   ・それ以外（例：kakei-shindan）         → https://ユーザー名.github.io/kakei-shindan/
// 自分のパソコン（npm run dev）では REPO_NAME がないので、いつもどおり / で動きます。
const repo = process.env.REPO_NAME;
const basePath = repo && !repo.toLowerCase().endsWith(".github.io") ? `/${repo}` : "";

const nextConfig: NextConfig = {
  // サーバーなしで公開できる「静的サイト」として書き出す（out フォルダ）
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_ORIGIN: process.env.REPO_OWNER
      ? `https://${process.env.REPO_OWNER.toLowerCase()}.github.io`
      : "",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
