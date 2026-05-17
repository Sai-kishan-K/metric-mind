// import { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   BarChart3,
//   Bot,
//   ChevronDown,
//   Database,
//   FileSpreadsheet,
//   LayoutDashboard,
//   LineChart,
//   MessageSquareText,
//   PieChart,
//   Plus,
//   Sparkles,
//   UploadCloud,
//   Wand2,
//   Zap,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart as ReLineChart,
//   Line,
//   PieChart as RePieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const sampleData = [
//   { month: "Jan", revenue: 42000, profit: 12000, orders: 320 },
//   { month: "Feb", revenue: 51000, profit: 16000, orders: 410 },
//   { month: "Mar", revenue: 48000, profit: 14000, orders: 390 },
//   { month: "Apr", revenue: 61000, profit: 21000, orders: 470 },
//   { month: "May", revenue: 72000, profit: 26000, orders: 530 },
//   { month: "Jun", revenue: 69000, profit: 24000, orders: 510 },
// ];

// const regionData = [
//   { region: "Europe", sales: 132000 },
//   { region: "Asia", sales: 98000 },
//   { region: "North America", sales: 155000 },
//   { region: "Middle East", sales: 64000 },
//   { region: "Africa", sales: 42000 },
// ];

// const categoryData = [
//   { name: "Software", value: 42 },
//   { name: "Services", value: 28 },
//   { name: "Hardware", value: 18 },
//   { name: "Support", value: 12 },
// ];

// const columns = [
//   { name: "Order Date", type: "Date", quality: "98%" },
//   { name: "Revenue", type: "Numeric", quality: "100%" },
//   { name: "Profit", type: "Numeric", quality: "100%" },
//   { name: "Region", type: "Category", quality: "97%" },
//   { name: "Product", type: "Category", quality: "95%" },
//   { name: "Customer ID", type: "Identifier", quality: "100%" },
// ];

// const suggestedCharts = [
//   { title: "Monthly Revenue Trend", type: "Line", confidence: "High", icon: LineChart },
//   { title: "Sales by Region", type: "Bar", confidence: "High", icon: BarChart3 },
//   { title: "Category Contribution", type: "Donut", confidence: "Medium", icon: PieChart },
// ];

// const chatMessages = [
//   {
//     role: "ai",
//     text: "I found Revenue, Profit, Region, Product and Order Date. I can create KPIs, charts, or calculated columns from plain English.",
//   },
//   {
//     role: "user",
//     text: "Create a profit margin column",
//   },
//   {
//     role: "ai",
//     text: "Created Profit Margin = Profit / Revenue * 100. The new column is now available for charts.",
//   },
// ];

// function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div
//       className={`rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur-xl ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function MetricCard({
//   label,
//   value,
//   change,
//   icon: Icon,
// }: {
//   label: string;
//   value: string;
//   change: string;
//   icon: any;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.04] p-5 shadow-xl shadow-black/20"
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-sm text-slate-400">{label}</p>
//           <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</h3>
//           <p className="mt-2 text-sm text-emerald-300">{change}</p>
//         </div>
//         <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
//           <Icon size={22} />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function SelectBox({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="space-y-2">
//       <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
//       <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-slate-900">
//         {value}
//         <ChevronDown size={16} className="text-slate-500" />
//       </button>
//     </div>
//   );
// }

// export default function App() {
//   const [uploaded, setUploaded] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [chartType, setChartType] = useState("Bar Chart");

//   const chartPreview = useMemo(() => {
//     if (chartType === "Line Chart") {
//       return (
//         <ResponsiveContainer width="100%" height={250}>
//           <ReLineChart data={sampleData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
//             <XAxis dataKey="month" stroke="#94a3b8" />
//             <YAxis stroke="#94a3b8" />
//             <Tooltip
//               contentStyle={{
//                 background: "#020617",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 borderRadius: 16,
//               }}
//             />
//             <Line type="monotone" dataKey="revenue" stroke="#67e8f9" strokeWidth={3} dot={false} />
//           </ReLineChart>
//         </ResponsiveContainer>
//       );
//     }

//     return (
//       <ResponsiveContainer width="100%" height={250}>
//         <BarChart data={regionData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
//           <XAxis dataKey="region" stroke="#94a3b8" tick={{ fontSize: 11 }} />
//           <YAxis stroke="#94a3b8" />
//           <Tooltip
//             contentStyle={{
//               background: "#020617",
//               border: "1px solid rgba(255,255,255,0.1)",
//               borderRadius: 16,
//             }}
//           />
//           <Bar dataKey="sales" fill="#67e8f9" radius={[10, 10, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     );
//   }, [chartType]);

//   return (
//     <main className="min-h-screen overflow-hidden bg-[#020617] text-slate-100">
//       <div className="pointer-events-none fixed inset-0">
//         <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
//         <div className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
//         <div className="absolute bottom-[-20%] left-[30%] h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
//       </div>

//       <section className="relative mx-auto max-w-7xl px-5 py-6 lg:px-8">
//         <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
//               <Sparkles size={22} />
//             </div>
//             <div>
//               <h1 className="text-lg font-semibold tracking-tight text-white">DashPilot AI</h1>
//               <p className="text-xs text-slate-400">No DAX. No SQL. Just insights.</p>
//             </div>
//           </div>
//           <div className="hidden items-center gap-2 md:flex">
//             <button className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10">Docs</button>
//             <button className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10">Templates</button>
//             <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">Launch MVP</button>
//           </div>
//         </nav>

//         <div className="grid gap-6 py-8 lg:grid-cols-[0.95fr_1.35fr]">
//           <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//             <div className="space-y-5 pt-4">
//               <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
//                 <Zap size={16} /> AI Business Intelligence SaaS
//               </div>
//               <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
//                 Turn raw data into dashboards by chatting with AI.
//               </h2>
//               <p className="max-w-xl text-lg leading-8 text-slate-400">
//                 Upload a dataset, let AI profile the columns, generate KPI dashboards, and create calculated columns from
//                 plain English.
//               </p>
//             </div>

//             <Card className="p-5">
//               <button
//                 onClick={() => setUploaded(true)}
//                 className="group flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-cyan-300/[0.04] px-6 py-10 text-center transition hover:border-cyan-300/70 hover:bg-cyan-300/[0.08]"
//               >
//                 <div className="rounded-3xl bg-cyan-300/10 p-5 text-cyan-200 transition group-hover:scale-105">
//                   <UploadCloud size={34} />
//                 </div>
//                 <h3 className="mt-4 text-xl font-semibold text-white">Upload CSV or Excel</h3>
//                 <p className="mt-2 max-w-sm text-sm text-slate-400">
//                   Drag and drop your dataset. DashPilot will auto-detect metrics, dimensions, dates, and chart
//                   opportunities.
//                 </p>
//                 <span className="mt-5 rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950">
//                   {uploaded ? "sales_data.csv uploaded" : "Choose file"}
//                 </span>
//               </button>
//             </Card>

//             <Card className="p-5">
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-slate-400">Detected schema</p>
//                   <h3 className="text-xl font-semibold text-white">Column Intelligence</h3>
//                 </div>
//                 <Database className="text-cyan-300" />
//               </div>
//               <div className="space-y-3">
//                 {columns.map((column) => (
//                   <div key={column.name} className="flex items-center justify-between rounded-2xl bg-slate-950/60 px-4 py-3">
//                     <div>
//                       <p className="text-sm font-medium text-white">{column.name}</p>
//                       <p className="text-xs text-slate-500">{column.type}</p>
//                     </div>
//                     <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
//                       {column.quality}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </motion.div>

//           <div className="space-y-6">
//             <div className="grid gap-4 md:grid-cols-3">
//               <MetricCard label="Total Revenue" value="$343K" change="+18.4% vs prev." icon={BarChart3} />
//               <MetricCard label="Profit" value="$113K" change="+11.2% vs prev." icon={Sparkles} />
//               <MetricCard label="Orders" value="2.6K" change="+9.8% vs prev." icon={FileSpreadsheet} />
//             </div>

//             <Card className="p-5">
//               <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <div className="flex items-center gap-2 text-sm text-cyan-200">
//                     <LayoutDashboard size={16} /> Auto-generated dashboard
//                   </div>
//                   <h3 className="mt-1 text-2xl font-semibold text-white">Recommended business view</h3>
//                 </div>
//                 <button className="flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
//                   <Wand2 size={16} /> Regenerate
//                 </button>
//               </div>

//               <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
//                 <div className="rounded-3xl bg-slate-950/60 p-4">
//                   <div className="mb-4 flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-400">Revenue trend</p>
//                       <h4 className="font-semibold text-white">Monthly Revenue</h4>
//                     </div>
//                     <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">AI selected</span>
//                   </div>
//                   <ResponsiveContainer width="100%" height={260}>
//                     <ReLineChart data={sampleData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
//                       <XAxis dataKey="month" stroke="#94a3b8" />
//                       <YAxis stroke="#94a3b8" />
//                       <Tooltip
//                         contentStyle={{
//                           background: "#020617",
//                           border: "1px solid rgba(255,255,255,0.1)",
//                           borderRadius: 16,
//                         }}
//                       />
//                       <Line type="monotone" dataKey="revenue" stroke="#67e8f9" strokeWidth={3} dot={false} />
//                       <Line type="monotone" dataKey="profit" stroke="#c084fc" strokeWidth={3} dot={false} />
//                     </ReLineChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="rounded-3xl bg-slate-950/60 p-4">
//                   <p className="text-sm text-slate-400">Category split</p>
//                   <h4 className="font-semibold text-white">Revenue Contribution</h4>
//                   <ResponsiveContainer width="100%" height={260}>
//                     <RePieChart>
//                       <Pie data={categoryData} innerRadius={58} outerRadius={88} dataKey="value" paddingAngle={4}>
//                         {categoryData.map((_, index) => (
//                           <Cell key={index} fill={["#67e8f9", "#c084fc", "#818cf8", "#34d399"][index]} />
//                         ))}
//                       </Pie>
//                       <Tooltip
//                         contentStyle={{
//                           background: "#020617",
//                           border: "1px solid rgba(255,255,255,0.1)",
//                           borderRadius: 16,
//                         }}
//                       />
//                     </RePieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </Card>

//             <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
//               <Card className="p-5">
//                 <div className="mb-5 flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-slate-400">Manual override</p>
//                     <h3 className="text-xl font-semibold text-white">Custom Chart Builder</h3>
//                   </div>
//                   <Plus className="text-cyan-300" />
//                 </div>
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
//                   <SelectBox label="X Axis" value="Region" />
//                   <SelectBox label="Y Axis" value="Revenue" />
//                   <div className="space-y-2">
//                     <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Chart Type</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       {["Bar Chart", "Line Chart"].map((type) => (
//                         <button
//                           key={type}
//                           onClick={() => setChartType(type)}
//                           className={`rounded-2xl border px-4 py-3 text-sm transition ${
//                             chartType === type
//                               ? "border-cyan-300 bg-cyan-300 text-slate-950"
//                               : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-cyan-300/40"
//                           }`}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <SelectBox label="Aggregation" value="Sum" />
//                 </div>
//               </Card>

//               <Card className="p-5">
//                 <div className="mb-4 flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-slate-400">Live preview</p>
//                     <h3 className="text-xl font-semibold text-white">{chartType}</h3>
//                   </div>
//                   <BarChart3 className="text-cyan-300" />
//                 </div>
//                 <div className="rounded-3xl bg-slate-950/60 p-4">{chartPreview}</div>
//               </Card>
//             </div>

//             <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
//               <Card className="p-5">
//                 <div className="mb-5 flex items-center gap-3">
//                   <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-300">
//                     <Sparkles size={20} />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-400">AI recommendations</p>
//                     <h3 className="text-xl font-semibold text-white">Suggested charts</h3>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   {suggestedCharts.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-slate-950/60 p-3">
//                         <div className="rounded-xl bg-cyan-300/10 p-2 text-cyan-200">
//                           <Icon size={18} />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-white">{item.title}</p>
//                           <p className="text-xs text-slate-500">
//                             {item.type} · {item.confidence} confidence
//                           </p>
//                         </div>
//                         <button className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 hover:bg-white/15">
//                           Add
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </Card>

//               <Card className="p-5">
//                 <div className="mb-5 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-200">
//                       <Bot size={20} />
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-400">DAX replacement</p>
//                       <h3 className="text-xl font-semibold text-white">Chat with your data</h3>
//                     </div>
//                   </div>
//                   <MessageSquareText className="text-slate-500" />
//                 </div>

//                 <div className="mb-4 h-64 space-y-3 overflow-y-auto rounded-3xl bg-slate-950/60 p-4">
//                   {chatMessages.map((message, index) => (
//                     <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
//                       <div
//                         className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
//                           message.role === "user"
//                             ? "bg-cyan-300 text-slate-950"
//                             : "border border-white/10 bg-white/[0.06] text-slate-200"
//                         }`}
//                       >
//                         {message.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2">
//                   <input
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     placeholder="Ask: create profit margin, group customers, build KPI..."
//                     className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-600"
//                   />
//                   <button className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
//                     Send
//                   </button>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import { useState } from "react";
import { BarChart3, FileSpreadsheet, Sparkles } from "lucide-react";

import Navbar from "./components/Navbar";
import HeroUploadSection from "./components/HeroUploadSection";
import SchemaPanel from "./components/SchemaPanel";
import MetricCard from "./components/MetricCard";
import AutoDashboard from "./components/AutoDashboard";
import ChartBuilder from "./components/ChartBuilder";
import SuggestedCharts from "./components/SuggestedCharts";
import DataChat from "./components/DataChat";

export default function App() {
  const [uploaded, setUploaded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chartType, setChartType] = useState("Bar Chart");

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[30%] h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <Navbar />

        <div className="grid gap-6 py-8 lg:grid-cols-[0.95fr_1.35fr]">
          <div className="space-y-6">
            <HeroUploadSection uploaded={uploaded} setUploaded={setUploaded} />
            <SchemaPanel />
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard label="Total Revenue" value="$343K" change="+18.4% vs prev." icon={BarChart3} />
              <MetricCard label="Profit" value="$113K" change="+11.2% vs prev." icon={Sparkles} />
              <MetricCard label="Orders" value="2.6K" change="+9.8% vs prev." icon={FileSpreadsheet} />
            </div>

            <AutoDashboard />

            <ChartBuilder chartType={chartType} setChartType={setChartType} />

            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <SuggestedCharts />
              <DataChat prompt={prompt} setPrompt={setPrompt} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}