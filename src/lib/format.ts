/** 3桁区切りの数字 */
export const fmt = (n: number, d = 0) =>
  Number.isFinite(n) ? n.toLocaleString("ja-JP", { maximumFractionDigits: d }) : "—";

/** 「1,234円」 */
export const yen = (n: number) => (Number.isFinite(n) ? `${fmt(Math.round(n))}円` : "—");

/** 「12.3万円」（1万円以上のとき） */
export function man(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 100000000) return `${fmt(n / 100000000, 2)}億円`;
  if (Math.abs(n) >= 10000) return `${fmt(n / 10000, 1)}万円`;
  return yen(n);
}
