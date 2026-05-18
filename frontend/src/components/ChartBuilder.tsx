import { useMemo } from "react";
import { BarChart3, Plus } from "lucide-react";
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
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "./Card";
import SelectBox from "./SelectBox";
import { categoryData, regionData, sampleData } from "../data/mockData";

const chartTypes = [
  "Bar Chart",
  "Line Chart",
  "Area Chart",
  "Pie Chart",
  "Donut Chart",
  "Scatter Plot",
  "Histogram",
  "Table",
  "KPI Card",
];

const histogramData = [
  { range: "0-10K", count: 12 },
  { range: "10K-25K", count: 24 },
  { range: "25K-50K", count: 31 },
  { range: "50K-75K", count: 18 },
  { range: "75K+", count: 9 },
];

const scatterData = [
  { revenue: 42000, profit: 12000 },
  { revenue: 51000, profit: 16000 },
  { revenue: 48000, profit: 14000 },
  { revenue: 61000, profit: 21000 },
  { revenue: 72000, profit: 26000 },
  { revenue: 69000, profit: 24000 },
];

export default function ChartBuilder({
  chartType,
  setChartType,
}: {
  chartType: string;
  setChartType: (value: string) => void;
}) {
  const chartPreview = useMemo(() => {
    if (chartType === "Line Chart") {
      return (
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
          </ReLineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "Area Chart") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={sampleData}>
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
            <Area type="monotone" dataKey="revenue" stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.22} />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "Pie Chart") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={90} label>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={["#67e8f9", "#c084fc", "#818cf8", "#34d399"][index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "Donut Chart") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={90}
              paddingAngle={4}
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={["#67e8f9", "#c084fc", "#818cf8", "#34d399"][index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "Scatter Plot") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
            <XAxis dataKey="revenue" name="Revenue" stroke="#94a3b8" />
            <YAxis dataKey="profit" name="Profit" stroke="#94a3b8" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            />
            <Scatter name="Revenue vs Profit" data={scatterData} fill="#67e8f9" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "Histogram") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
            <XAxis dataKey="range" stroke="#94a3b8" />
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

    if (chartType === "Table") {
      return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 text-slate-300">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Revenue</th>
                <th className="px-4 py-3">Profit</th>
                <th className="px-4 py-3">Orders</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <tr key={row.month} className="border-t border-white/10">
                  <td className="px-4 py-3 text-white">{row.month}</td>
                  <td className="px-4 py-3 text-slate-300">${row.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300">${row.profit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300">{row.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (chartType === "KPI Card") {
      return (
        <div className="grid h-[260px] place-items-center rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.04] p-6 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Total Revenue</p>
            <h2 className="mt-4 text-6xl font-semibold text-white">$343K</h2>
            <p className="mt-4 text-sm text-emerald-300">+18.4% compared to previous period</p>
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={regionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey="region" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
            }}
          />
          <Bar dataKey="sales" fill="#67e8f9" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }, [chartType]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Manual override</p>
            <h3 className="text-xl font-semibold text-white">Custom Chart Builder</h3>
          </div>
          <Plus className="text-cyan-300" />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectBox label="X Axis" value="Region" />
            <SelectBox label="Y Axis" value="Revenue" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Visualization Type</p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {chartTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`rounded-2xl border px-3 py-3 text-sm transition ${
                    chartType === type
                      ? "border-cyan-300 bg-cyan-300 text-slate-950"
                      : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-cyan-300/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <SelectBox label="Aggregation" value="Sum" />

          <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4 text-sm text-slate-400">
            These visualization options are now available in the UI. In the next phases, they will use real uploaded
            dataset columns instead of demo data.
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Live preview</p>
            <h3 className="text-xl font-semibold text-white">{chartType}</h3>
          </div>
          <BarChart3 className="text-cyan-300" />
        </div>

        <div className="rounded-3xl bg-slate-950/60 p-4">{chartPreview}</div>
      </Card>
    </div>
  );
}