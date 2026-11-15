"use client";

// =============================================
// 画面でくり返し使う部品
// =============================================
import { useId, useState, type ReactNode } from "react";
import { Check, ExternalLink } from "lucide-react";
import { affiliateLinks, type AffiliateKey } from "@/config/affiliateLinks";
import { fmt } from "@/lib/format";

/** 白いカード */
export function Card({ title, icon, children, className = "" }: { title?: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-surface/90 p-5 shadow-lg shadow-black/25 ring-1 ring-white/[0.03] sm:p-6 ${className}`}>
      {title && (
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
          {icon && <span className="text-accent">{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}

/** 大きく表示する答え */
export function Big({ label, value, unit, sub, tone = "emerald" }: { label: string; value: string; unit?: string; sub?: ReactNode; tone?: "emerald" | "navy" }) {
  const bg = tone === "emerald" ? "bg-accent-soft border-accent/30" : "bg-surface-2 border-line-strong";
  const fg = tone === "emerald" ? "text-accent" : "text-ink";
  return (
    <div className={`rounded-2xl border p-5 ${bg}`} aria-live="polite">
      <p className="text-sm font-bold text-ink-2">{label}</p>
      <p className={`num mt-1 text-4xl font-bold tracking-tight sm:text-5xl ${fg}`}>
        {value}
        {unit && <span className="ml-1 text-lg font-bold">{unit}</span>}
      </p>
      {sub && <div className="mt-2 text-sm text-ink-2">{sub}</div>}
    </div>
  );
}

/** ボタン型の選択肢 */
export function Pills<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-ink">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.value)}
              className={`min-h-11 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                on ? "border-emerald-600 bg-emerald-600 text-white" : "border-line bg-surface text-ink hover:border-emerald-300"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * ボタン型の選択肢（複数選べる）
 * exclusive に指定した選択肢（「あまり使わない」など）を選ぶと、ほかの選択は外れます。
 */
export function MultiPills<T extends string>({ label, value, options, onChange, exclusive }: { label: string; value: T[]; options: { value: T; label: string }[]; onChange: (v: T[]) => void; exclusive?: T }) {
  const toggle = (v: T) => {
    if (value.includes(v)) return onChange(value.filter((x) => x !== v));
    if (v === exclusive) return onChange([v]);
    onChange([...value.filter((x) => x !== exclusive), v]);
  };
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-ink">
        {label}
        <span className="ml-2 text-xs font-normal text-muted">（複数選べます）</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(o.value)}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                on ? "border-emerald-600 bg-emerald-600 text-white" : "border-line bg-surface text-ink hover:border-emerald-300"
              }`}
            >
              <Check size={14} aria-hidden className={on ? "opacity-100" : "opacity-0"} />
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** 全角数字やカンマを、計算できる数字に直す */
function toNumber(raw: string): number | null {
  const s = raw
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[．。]/g, ".")
    .replace(/[,，、\s　円]/g, "");
  if (s === "") return null;
  if (!/^\d+(\.\d+)?$/.test(s)) return NaN;
  return parseFloat(s);
}

/** 数字を入れる欄（まちがった入力にはメッセージを出す） */
export function NumberInput({ label, value, onChange, unit = "円", min = 0, max = Infinity, hint }: { label: string; value: number; onChange: (v: number) => void; unit?: string; min?: number; max?: number; hint?: string }) {
  const id = useId();
  const [text, setText] = useState(fmt(value));
  const [error, setError] = useState("");
  const [prev, setPrev] = useState(value);

  // 外から値が変わったとき（スライダーやリセット）に、表示している文字を合わせる
  if (value !== prev) {
    setPrev(value);
    if (toNumber(text) !== value) {
      setText(fmt(value));
      setError("");
    }
  }

  const handle = (raw: string) => {
    setText(raw);
    const n = toNumber(raw);
    if (n === null) return setError(`「${label}」を入力してください。`);
    if (Number.isNaN(n)) return setError(`「${label}」には数字だけを入れてください（例：250000）。`);
    if (n < min) return setError(`「${label}」は ${fmt(min)} 以上にしてください。`);
    if (n > max) return setError(`「${label}」は ${fmt(max)} 以下にしてください。`);
    setError("");
    onChange(n);
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-bold text-ink">{label}</label>
      <div className={`flex items-center rounded-xl border-2 bg-surface focus-within:ring-4 ${error ? "border-red-500 focus-within:ring-red-500/20" : "border-line focus-within:border-emerald-500 focus-within:ring-emerald-500/25"}`}>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={text}
          onChange={(e) => handle(e.target.value)}
          onBlur={() => !error && setText(fmt(value))}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="num min-w-0 flex-1 bg-transparent px-4 py-3 text-lg outline-none"
        />
        <span className="pr-4 text-sm text-muted">{unit}</span>
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1 text-sm font-bold text-red-400">！{error}</p>
      ) : (
        hint && <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}

/** スライダー（数字の入力欄つき） */
export function Slider({ label, value, onChange, min, max, step, unit = "円", hint }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; unit?: string; hint?: string }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-ink">
          {label}
          {hint && <span className="ml-2 text-xs font-normal text-muted">{hint}</span>}
        </label>
        <span className="num shrink-0 text-lg font-bold text-ink">
          {fmt(value, 1)}
          <span className="ml-0.5 text-sm">{unit}</span>
        </span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={Math.min(max, value)} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

/** 外部サイトへのボタン（アフィリエイトなら PR を表示） */
export function OutButton({ link, children, variant = "solid" }: { link: AffiliateKey; children: ReactNode; variant?: "solid" | "outline" }) {
  const l = affiliateLinks[link];
  return (
    <a
      href={l.url}
      target="_blank"
      rel={l.isAffiliate ? "sponsored noopener" : "noopener"}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-bold transition-colors ${
        variant === "solid" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "border-2 border-emerald-600 text-accent hover:bg-accent-soft"
      }`}
    >
      {l.isAffiliate && <span className="rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-slate-800">PR</span>}
      {children}
      <ExternalLink size={16} aria-hidden />
    </a>
  );
}

/** 小さな注意書き */
export function Note({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-relaxed text-muted">{children}</p>;
}
