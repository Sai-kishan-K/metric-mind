import { motion } from "framer-motion";
import { UploadCloud, Zap } from "lucide-react";
import Card from "./Card";

export default function HeroUploadSection({
  uploaded,
  setUploaded,
}: {
  uploaded: boolean;
  setUploaded: (value: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-5 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
          <Zap size={16} /> AI Business Intelligence SaaS
        </div>

        <h2 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
          Turn raw data into dashboards by chatting with AI.
        </h2>

        <p className="max-w-xl text-lg leading-8 text-slate-400">
          Upload a dataset, let AI profile the columns, generate KPI dashboards, and create calculated columns from
          plain English.
        </p>
      </div>

      <Card className="p-5">
        <button
          onClick={() => setUploaded(true)}
          className="group flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-cyan-300/[0.04] px-6 py-10 text-center transition hover:border-cyan-300/70 hover:bg-cyan-300/[0.08]"
        >
          <div className="rounded-3xl bg-cyan-300/10 p-5 text-cyan-200 transition group-hover:scale-105">
            <UploadCloud size={34} />
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white">Upload CSV or Excel</h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Drag and drop your dataset. DashPilot will auto-detect metrics, dimensions, dates, and chart opportunities.
          </p>

          <span className="mt-5 rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950">
            {uploaded ? "sales_data.csv uploaded" : "Choose file"}
          </span>
        </button>
      </Card>
    </motion.div>
  );
}