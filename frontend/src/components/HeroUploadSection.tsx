import { motion } from "framer-motion";
import { UploadCloud, Zap, Loader2 } from "lucide-react";
import Card from "./Card";
import type { UploadResponse } from "../services/api";

export default function HeroUploadSection({
  uploadedFileName,
  isUploading,
  uploadError,
  uploadResult,
  onFileUpload,
}: {
  uploadedFileName: string | null;
  isUploading: boolean;
  uploadError: string | null;
  uploadResult: UploadResponse | null;
  onFileUpload: (file: File) => void;
}) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    onFileUpload(file);
  }

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
        <label className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-cyan-300/[0.04] px-6 py-10 text-center transition hover:border-cyan-300/70 hover:bg-cyan-300/[0.08]">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="rounded-3xl bg-cyan-300/10 p-5 text-cyan-200 transition group-hover:scale-105">
            {isUploading ? <Loader2 size={34} className="animate-spin" /> : <UploadCloud size={34} />}
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white">Upload CSV or Excel</h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Drag and drop your dataset. DashPilot will auto-detect metrics, dimensions, dates, and chart opportunities.
          </p>

          <span className="mt-5 rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950">
            {isUploading ? "Uploading..." : uploadedFileName || "Choose file"}
          </span>
        </label>

        {uploadError && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {uploadError}
          </div>
        )}

        {uploadResult && (
          <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Rows</p>
              <p className="mt-1 text-lg font-semibold text-white">{uploadResult.rows}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Columns</p>
              <p className="mt-1 text-lg font-semibold text-white">{uploadResult.columns}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quality</p>
              <p className="mt-1 text-lg font-semibold text-emerald-300">
                {uploadResult.profile.overall_quality_score}%
              </p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}