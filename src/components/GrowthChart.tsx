"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { man } from "@/lib/format";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

/** 元本と資産額の推移グラフ */
export function GrowthChart({ labels, principals, totals }: { labels: string[]; principals: number[]; totals: number[] }) {
  return (
    <div className="relative h-72 w-full sm:h-80">
      <Line
        aria-label="積立投資の資産額と元本の推移"
        role="img"
        data={{
          labels,
          datasets: [
            {
              label: "資産額（元本＋運用益）",
              data: totals,
              borderColor: "#34d399",
              backgroundColor: "rgba(52, 211, 153, 0.16)",
              fill: true,
              tension: 0.25,
              pointRadius: 0,
              borderWidth: 3,
            },
            {
              label: "元本（積み立てた合計）",
              data: principals,
              borderColor: "#7d9bd6",
              backgroundColor: "rgba(125, 155, 214, 0.14)",
              fill: true,
              tension: 0,
              pointRadius: 0,
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 12, color: "#b8c5dc", font: { size: 12, family: "Outfit, sans-serif" } } },
            tooltip: {
              backgroundColor: "#17223b",
              borderColor: "#34466d",
              borderWidth: 1,
              titleColor: "#eef3fb",
              bodyColor: "#b8c5dc",
              callbacks: { label: (c) => `${c.dataset.label}：${man(Number(c.raw))}` },
            },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#8494b2", maxTicksLimit: 8 } },
            y: { grid: { color: "#233150" }, ticks: { color: "#8494b2", callback: (v) => man(Number(v)) } },
          },
        }}
      />
    </div>
  );
}
