import {
  AreaChart,
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  Table,
  Sparkles,
} from "lucide-react";
import Card from "./Card";
import { suggestedCharts } from "../data/mockData";
import type { RecommendedChart } from "../services/api";

function getChartIcon(chartType: string) {
  const normalizedType = chartType.toLowerCase();

  if (normalizedType.includes("line")) return LineChart;
  if (normalizedType.includes("area")) return AreaChart;
  if (normalizedType.includes("bar")) return BarChart3;
  if (normalizedType.includes("pie")) return PieChart;
  if (normalizedType.includes("donut")) return PieChart;
  if (normalizedType.includes("scatter")) return ScatterChart;
  if (normalizedType.includes("table")) return Table;

  return BarChart3;
}

function formatChartType(chartType: string) {
  return chartType
    .split("_")
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function SuggestedCharts({
  recommendedCharts,
}: {
  recommendedCharts?: RecommendedChart[];
}) {
  const chartsToShow =
    recommendedCharts && recommendedCharts.length > 0
      ? recommendedCharts
      : suggestedCharts.map((chart) => ({
          title: chart.title,
          chart_type: chart.type,
          x: null,
          y: null,
          aggregation: null,
          reason: `${chart.confidence} confidence recommendation.`,
        }));

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-300">
          <Sparkles size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-400">AI recommendations</p>
          <h3 className="text-xl font-semibold text-white">Suggested charts</h3>
        </div>
      </div>

      <div className="space-y-3">
        {chartsToShow.map((item, index) => {
          const Icon = getChartIcon(item.chart_type);

          return (
            <div
              key={`${item.title}-${index}`}
              className="rounded-2xl bg-slate-950/60 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan-300/10 p-2 text-cyan-200">
                  <Icon size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs capitalize text-slate-500">
                    {formatChartType(item.chart_type)}
                    {item.aggregation ? ` · ${item.aggregation}` : ""}
                  </p>
                </div>

                <button className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 hover:bg-white/15">
                  Add
                </button>
              </div>

              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs leading-5 text-slate-400">
                <p>{item.reason}</p>

                {(item.x || item.y) && (
                  <p className="mt-1">
                    <span className="text-cyan-200">Fields:</span>{" "}
                    {item.x ? `X = ${item.x}` : ""}
                    {item.x && item.y ? " · " : ""}
                    {item.y ? `Y = ${item.y}` : ""}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}