import { LayoutDashboard, Wand2 } from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "./Card";
import { categoryData, sampleData } from "../data/mockData";

export default function AutoDashboard() {
  return (
    <Card className="p-5">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <LayoutDashboard size={16} /> Auto-generated dashboard
          </div>
          <h3 className="mt-1 text-2xl font-semibold text-white">Recommended business view</h3>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
          <Wand2 size={16} /> Regenerate
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-slate-950/60 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Revenue trend</p>
              <h4 className="font-semibold text-white">Monthly Revenue</h4>
            </div>
            <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">AI selected</span>
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
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}