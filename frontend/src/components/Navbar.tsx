import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">DashPilot AI</h1>
          <p className="text-xs text-slate-400">No DAX. No SQL. Just insights.</p>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <button className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10">Docs</button>
        <button className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10">Templates</button>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">Launch MVP</button>
      </div>
    </nav>
  );
}