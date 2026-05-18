import { Database } from "lucide-react";
import Card from "./Card";
import { columns as mockColumns } from "../data/mockData";
import type { UploadResponse } from "../services/api";

export default function SchemaPanel({
  uploadResult,
}: {
  uploadResult: UploadResponse | null;
}) {
  const columnsToShow =
    uploadResult?.profile.column_profiles.map((column) => ({
      name: column.name,
      type: column.type,
      quality: `${column.quality_score}%`,
    })) || mockColumns;

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Detected schema</p>
          <h3 className="text-xl font-semibold text-white">Column Intelligence</h3>
        </div>
        <Database className="text-cyan-300" />
      </div>

      <div className="space-y-3">
        {columnsToShow.map((column) => (
          <div
            key={column.name}
            className="flex items-center justify-between rounded-2xl bg-slate-950/60 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-white">{column.name}</p>
              <p className="text-xs capitalize text-slate-500">{column.type}</p>
            </div>

            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              {column.quality}
            </span>
          </div>
        ))}
      </div>

      {uploadResult && (
        <div className="mt-4 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4 text-sm text-slate-300">
          <p>
            <span className="text-cyan-200">Numeric:</span>{" "}
            {uploadResult.profile.numeric_columns.length
              ? uploadResult.profile.numeric_columns.join(", ")
              : "None"}
          </p>
          <p className="mt-2">
            <span className="text-cyan-200">Categorical:</span>{" "}
            {uploadResult.profile.categorical_columns.length
              ? uploadResult.profile.categorical_columns.join(", ")
              : "None"}
          </p>
          <p className="mt-2">
            <span className="text-cyan-200">Date:</span>{" "}
            {uploadResult.profile.date_columns.length
              ? uploadResult.profile.date_columns.join(", ")
              : "None"}
          </p>
        </div>
      )}
    </Card>
  );
}