import { Database } from "lucide-react";
import Card from "./Card";
import { columns } from "../data/mockData";

export default function SchemaPanel() {
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
        {columns.map((column) => (
          <div
            key={column.name}
            className="flex items-center justify-between rounded-2xl bg-slate-950/60 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-white">{column.name}</p>
              <p className="text-xs text-slate-500">{column.type}</p>
            </div>

            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              {column.quality}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}