import { useEffect, useMemo, useState } from "react";
import { BarChart3, Loader2, Plus } from "lucide-react";
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
import type { DashboardChart, UploadResponse } from "../services/api";
import { createCustomChart } from "../services/api";

const COLORS = ["#67e8f9", "#c084fc", "#818cf8", "#34d399", "#facc15", "#fb7185"];

const chartTypes = [
  { label: "Bar Chart", value: "bar" },
  { label: "Line Chart", value: "line" },
  { label: "Area Chart", value: "area" },
  { label: "Pie Chart", value: "pie" },
  { label: "Donut Chart", value: "donut" },
  { label: "Scatter Plot", value: "scatter" },
  { label: "Histogram", value: "histogram" },
  { label: "Table", value: "table" },
];

const aggregations = [
  { label: "Sum", value: "sum" },
  { label: "Average", value: "average" },
  { label: "Count", value: "count" },
  { label: "Min", value: "min" },
  { label: "Max", value: "max" },
];

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

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none transition hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function renderChart(chart: DashboardChart | null) {
  if (!chart) {
    return (
      <div className="grid h-[280px] place-items-center rounded-3xl border border-dashed border-cyan-300/20 bg-cyan-300/[0.04] p-6 text-center">
        <div>
          <BarChart3 className="mx-auto text-cyan-300" size={34} />
          <p className="mt-4 text-sm font-medium text-white">Upload data and build a custom chart</p>
          <p className="mt-2 text-xs text-slate-500">
            Select fields, chart type, and aggregation to preview your chart here.
          </p>
        </div>
      </div>
    );
  }

  const chartType = chart.chart_type;
  const xKey = chart.x || "x";
  const yKey = chart.y || "count";
  const data = chart.data || [];

  if (!data.length) {
    return (
      <div className="grid h-[280px] place-items-center rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center">
        <div>
          <p className="text-sm font-medium text-white">No chart data available</p>
          <p className="mt-2 text-xs text-slate-500">Try another field combination.</p>
        </div>
      </div>
    );
  }

  if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
          <Line type="monotone" dataKey={yKey} stroke="#67e8f9" strokeWidth={3} dot={false} />
        </ReLineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
          <Area type="monotone" dataKey={yKey} stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.22} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
          <Bar dataKey={yKey} fill="#67e8f9" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "pie" || chartType === "donut") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey={yKey}
            nameKey={xKey}
            innerRadius={chartType === "donut" ? 60 : 0}
            outerRadius={95}
            paddingAngle={chartType === "donut" ? 4 : 1}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "histogram") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey="range" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
          <Bar dataKey="count" fill="#c084fc" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "scatter") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis dataKey={xKey} name={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis dataKey={yKey} name={yKey} stroke="#94a3b8" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
          <Scatter name={chart.title} data={data} fill="#67e8f9" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "table") {
    const columns = Object.keys(data[0] || {}).slice(0, 6);

    return (
      <div className="max-h-[280px] overflow-auto rounded-2xl border border-white/10">
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

export default function ChartBuilder({
  uploadResult,
}: {
  uploadResult: UploadResponse | null;
}) {
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [aggregation, setAggregation] = useState("sum");

  const [customChart, setCustomChart] = useState<DashboardChart | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

  const profile = uploadResult?.profile;

  const allColumns = useMemo(() => uploadResult?.column_names || [], [uploadResult]);

  const numericColumns = useMemo(() => profile?.numeric_columns || [], [profile]);

  const dimensionColumns = useMemo(() => {
    if (!profile) return [];
    return [
      ...profile.categorical_columns,
      ...profile.date_columns,
      ...profile.text_columns,
      ...profile.id_columns,
    ];
  }, [profile]);

  const xOptions = useMemo(() => {
    if (chartType === "histogram") return numericColumns;
    if (chartType === "scatter") return numericColumns;
    if (chartType === "table") return [];
    return dimensionColumns.length ? dimensionColumns : allColumns;
  }, [chartType, numericColumns, dimensionColumns, allColumns]);

  const yOptions = useMemo(() => {
    if (chartType === "table" || chartType === "histogram") return [];
    if (chartType === "scatter") return numericColumns.filter((column) => column !== xAxis);
    return numericColumns;
  }, [chartType, numericColumns, xAxis]);

  useEffect(() => {
    setCustomChart(null);
    setChartError(null);

    if (!uploadResult) {
      setXAxis("");
      setYAxis("");
      return;
    }

    if (chartType === "table") {
      setXAxis("");
      setYAxis("");
      return;
    }

    if (chartType === "histogram") {
      setXAxis(numericColumns[0] || "");
      setYAxis("");
      return;
    }

    if (chartType === "scatter") {
      setXAxis(numericColumns[0] || "");
      setYAxis(numericColumns[1] || "");
      return;
    }

    setXAxis(dimensionColumns[0] || allColumns[0] || "");
    setYAxis(numericColumns[0] || "");
  }, [uploadResult, chartType, numericColumns, dimensionColumns, allColumns]);

  async function handleGenerateChart() {
    if (!uploadResult) {
      setChartError("Please upload a dataset first.");
      return;
    }

    if (chartType !== "table" && !xAxis) {
      setChartError("Please select an X-axis field.");
      return;
    }

    if (!["table", "histogram"].includes(chartType) && !yAxis) {
      setChartError("Please select a Y-axis field.");
      return;
    }

    try {
      setIsGenerating(true);
      setChartError(null);

      const result = await createCustomChart({
        chart_type: chartType,
        x: xAxis || null,
        y: yAxis || null,
        aggregation: ["table", "scatter"].includes(chartType) ? null : aggregation,
      });

      setCustomChart(result.chart);
    } catch (error) {
      setChartError(error instanceof Error ? error.message : "Failed to generate chart");
    } finally {
      setIsGenerating(false);
    }
  }

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
          {!uploadResult && (
            <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4 text-sm text-slate-400">
              Upload a dataset first to unlock real field selection.
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Visualization Type</p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {chartTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setChartType(type.value)}
                  className={`rounded-2xl border px-3 py-3 text-sm transition ${
                    chartType === type.value
                      ? "border-cyan-300 bg-cyan-300 text-slate-950"
                      : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-cyan-300/40"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {chartType !== "table" && (
            <SelectField
              label={chartType === "histogram" ? "Numeric Field" : "X Axis"}
              value={xAxis}
              options={xOptions}
              onChange={setXAxis}
              disabled={!uploadResult}
            />
          )}

          {!["table", "histogram"].includes(chartType) && (
            <SelectField
              label="Y Axis"
              value={yAxis}
              options={yOptions}
              onChange={setYAxis}
              disabled={!uploadResult}
            />
          )}

          {!["table", "scatter"].includes(chartType) && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Aggregation</p>
              <select
                value={aggregation}
                onChange={(event) => setAggregation(event.target.value)}
                disabled={!uploadResult}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none transition hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {aggregations.map((item) => (
                  <option key={item.value} value={item.value} className="bg-slate-950 text-white">
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {chartError && (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {chartError}
            </div>
          )}

          <button
            onClick={handleGenerateChart}
            disabled={!uploadResult || isGenerating}
            className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <BarChart3 size={16} />}
            {isGenerating ? "Generating..." : "Generate Custom Chart"}
          </button>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Live preview</p>
            <h3 className="text-xl font-semibold text-white">
              {customChart ? customChart.title : formatChartType(chartType)}
            </h3>
          </div>
          <BarChart3 className="text-cyan-300" />
        </div>

        <div className="rounded-3xl bg-slate-950/60 p-4">{renderChart(customChart)}</div>
      </Card>
    </div>
  );
}