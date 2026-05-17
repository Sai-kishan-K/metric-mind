import { useMemo } from "react";
import { BarChart3, Plus } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "./Card";
import SelectBox from "./SelectBox";
import { regionData, sampleData } from "../data/mockData";

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
        <ResponsiveContainer width="100%" height={250}>
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

    return (
      <ResponsiveContainer width="100%" height={250}>
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          <SelectBox label="X Axis" value="Region" />
          <SelectBox label="Y Axis" value="Revenue" />

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Chart Type</p>
            <div className="grid grid-cols-2 gap-2">
              {["Bar Chart", "Line Chart"].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`rounded-2xl border px-4 py-3 text-sm transition ${
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