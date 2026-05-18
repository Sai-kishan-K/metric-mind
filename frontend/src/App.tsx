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
import { uploadDataset, type UploadResponse } from "./services/api";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [chartType, setChartType] = useState("Bar Chart");

  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileUpload(file: File) {
    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadedFileName(file.name);

      const result = await uploadDataset(file);
      setUploadResult(result);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
      setUploadResult(null);
    } finally {
      setIsUploading(false);
    }
  }

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
            <HeroUploadSection
              uploadedFileName={uploadedFileName}
              isUploading={isUploading}
              uploadError={uploadError}
              uploadResult={uploadResult}
              onFileUpload={handleFileUpload}
            />

            <SchemaPanel uploadResult={uploadResult} />
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