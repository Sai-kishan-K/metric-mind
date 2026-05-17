import { ChevronDown } from "lucide-react";

export default function SelectBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-slate-900">
        {value}
        <ChevronDown size={16} className="text-slate-500" />
      </button>
    </div>
  );
}