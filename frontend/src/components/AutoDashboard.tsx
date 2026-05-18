import { LayoutDashboard, Wand2 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "./Card";
import { categoryData, sampleData } from "../data/mockData";
import type { DashboardChart } from "../services/api";

const COLORS = ["#67e8f9", "#c084fc", "#818cf8", "#34d399", "#facc15", "#fb7185"];

function formatChartType(chartType: string) {
  return chartType
    .split("_")
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getValueAsString(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function renderDynamicChart(chart: DashboardChart) {
  const chartType = chart.chart_type;
  const xKey = chart.x || "x";
  const yKey = chart.y || "count";
  const data = chart.data || [];

  if (!data.length) {
    return (
      <div className="grid h-[260px] place-items-center rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center">
        <div>
          <p className="text-sm font-medium text-white">No chart data available</p>
          <p className="mt-2 text-xs text-slate-500">
            This recommendation could not generate enough clean data.
          </p>
        </div>
      </div>
    );
  }

  if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
          <Line type="monotone" dataKey={yKey} stroke="#67e8f9" strokeWidth={3} dot={false} />
        </ReLineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
          <Area type="monotone" dataKey={yKey} stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.22} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
          <Bar dataKey={yKey} fill="#67e8f9" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "donut" || chartType === "pie") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <RePieChart>
          <Pie
            data={data}
            dataKey={yKey}
            nameKey={xKey}
            innerRadius={chartType === "donut" ? 58 : 0}
            outerRadius={90}
            paddingAngle={chartType === "donut" ? 4 : 1}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
        </RePieChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "histogram") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey="range" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
          <Bar dataKey="count" fill="#c084fc" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "scatter") {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} name={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis dataKey={yKey} name={yKey} stroke="#94a3b8" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
          <Scatter name={chart.title} data={data} fill="#67e8f9" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "table") {
    const columns = Object.keys(data[0] || {}).slice(0, 6);

    return (
      <div className="max-h-[260px] overflow-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white/10 text-slate-300">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-white/10">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 text-slate-300">
                    {getValueAsString(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

function StaticDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-3xl bg-slate-950/60 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Revenue trend</p>
            <h4 className="font-semibold text-white">Monthly Revenue</h4>
          </div>
          <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">Demo</span>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <ReLineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#67e8f9" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="profit" stroke="#c084fc" strokeWidth={3} dot={false} />
          </ReLineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-3xl bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">Category split</p>
        <h4 className="font-semibold text-white">Revenue Contribution</h4>

        <ResponsiveContainer width="100%" height={260}>
          <RePieChart>
            <Pie data={categoryData} innerRadius={58} outerRadius={88} dataKey="value" paddingAngle={4}>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AutoDashboard({
  dashboardCharts,
}: {
  dashboardCharts?: DashboardChart[];
}) {
  const hasDynamicCharts = dashboardCharts && dashboardCharts.length > 0;

  return (
    <Card className="p-5">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <LayoutDashboard size={16} /> Auto-generated dashboard
          </div>
          <h3 className="mt-1 text-2xl font-semibold text-white">
            {hasDynamicCharts ? "Generated from your dataset" : "Recommended business view"}
          </h3>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
          <Wand2 size={16} /> Regenerate
        </button>
      </div>

      {!hasDynamicCharts && <StaticDashboard />}

      {hasDynamicCharts && (
        <div className="grid gap-4 lg:grid-cols-2">
          {dashboardCharts.slice(0, 6).map((chart, index) => (
            <div key={`${chart.title}-${index}`} className="rounded-3xl bg-slate-950/60 p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm capitalize text-slate-400">
                    {formatChartType(chart.chart_type)}
                    {chart.aggregation ? ` · ${chart.aggregation}` : ""}
                  </p>
                  <h4 className="font-semibold text-white">{chart.title}</h4>
                </div>
                <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                  AI selected
                </span>
              </div>

              {renderDynamicChart(chart)}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}