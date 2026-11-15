// サイトマップ（Google などにページの一覧を知らせるファイル）
// 公開すると https://keisan-tools-lab.github.io/kakei-shindan/sitemap.xml になります。
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

// 静的サイトとして書き出すために必要な設定
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
