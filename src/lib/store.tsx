"use client";

// =============================================
// 入力した内容を、ブラウザ（LocalStorage）に自動で保存するしくみ
// 次に開いたときも、続きから見られます。
// React の useSyncExternalStore を使い、
// ・サーバーで作るHTMLでは初期値
// ・ブラウザでは保存されていた値
// を安全に切り替えます。
// =============================================
import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { DEFAULT_STATE, type AppState } from "./types";
import { rankEconomies, surplusOf, taxInfo } from "./calc";

const KEY = "kakei-shindan:v1";

/* ---------- ブラウザの保存領域とつなぐ小さな入れ物 ---------- */

interface Snap {
  state: AppState;
  restored: boolean; // 前回の入力を読み込んだかどうか
}

const SERVER_SNAP: Snap = { state: DEFAULT_STATE, restored: false };
let snap: Snap | null = null;
const listeners = new Set<() => void>();

/** 前の版では1つだけ選ぶ形（文字）だったので、リスト（配列）に直す */
const asList = <T,>(v: T | T[] | undefined, fallback: T[]): T[] =>
  Array.isArray(v) ? v : v === undefined ? fallback : [v];

/** 保存されていたデータと、最新の初期値を合わせる（項目が増えても壊れないように） */
function merge(saved: Partial<AppState>): AppState {
  const shops = (saved.shops ?? {}) as Partial<Record<keyof AppState["shops"], unknown>>;
  return {
    ...DEFAULT_STATE,
    ...saved,
    profile: { ...DEFAULT_STATE.profile, ...saved.profile },
    spending: { ...DEFAULT_STATE.spending, ...saved.spending },
    subs: { ...DEFAULT_STATE.subs, ...saved.subs },
    shops: {
      conv: asList(shops.conv as AppState["shops"]["conv"], DEFAULT_STATE.shops.conv),
      net: asList(shops.net as AppState["shops"]["net"], DEFAULT_STATE.shops.net),
      carrier: asList(shops.carrier as AppState["shops"]["carrier"], DEFAULT_STATE.shops.carrier),
    },
    shopSpend: { ...DEFAULT_STATE.shopSpend, ...saved.shopSpend },
    sim: { ...DEFAULT_STATE.sim, ...saved.sim },
  };
}

function getSnapshot(): Snap {
  if (snap) return snap;
  snap = { state: DEFAULT_STATE, restored: false };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) snap = { state: merge(JSON.parse(raw)), restored: true };
  } catch {
    /* 読み込めないときは初期値のまま */
  }
  return snap;
}

function setSnap(next: Snap) {
  snap = next;
  try {
    if (next.restored || next.state !== DEFAULT_STATE) window.localStorage.setItem(KEY, JSON.stringify(next.state));
  } catch {
    /* 保存できない環境（プライベートモードなど）では保存しない */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/* ---------- 画面から使う部分 ---------- */

type Updater = (draft: AppState) => void;

interface Store {
  state: AppState;
  update: (fn: Updater) => void;
  reset: () => void;
  restored: boolean;
  derived: {
    surplus: ReturnType<typeof surplusOf>;
    ranking: ReturnType<typeof rankEconomies>;
    tax: ReturnType<typeof taxInfo>;
    autoMonthly: number;
  };
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { state, restored } = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAP);

  const value = useMemo<Store>(() => {
    const surplus = surplusOf(state);
    const ranking = rankEconomies(state, surplus.surplus);
    const tax = taxInfo(state.profile.annualGross, state.profile.family, state.profile.ageGroup);
    return {
      state,
      restored,
      update: (fn) => {
        const next = structuredClone(getSnapshot().state);
        fn(next);
        setSnap({ state: next, restored: getSnapshot().restored });
      },
      reset: () => {
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          /* なにもしない */
        }
        snap = { state: DEFAULT_STATE, restored: false };
        listeners.forEach((l) => l());
      },
      derived: { surplus, ranking, tax, autoMonthly: surplus.surplus + ranking[0].points },
    };
  }, [state, restored]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore は StoreProvider の中で使ってください");
  return v;
}
