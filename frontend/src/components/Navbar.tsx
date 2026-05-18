import { Moon, Sparkles, Sun } from "lucide-react";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const isDark = theme === "dark";

  return (
    <nav
      className={`flex items-center justify-between rounded-3xl border px-5 py-4 backdrop-blur-xl transition-colors ${
        isDark
          ? "border-white/10 bg-white/[0.05]"
          : "border-slate-200 bg-white/80 shadow-xl shadow-slate-200/70"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
          <Sparkles size={22} />
        </div>

        <div>
          <h1 className={`text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
            DashPilot AI
          </h1>
          <p className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
            No DAX. No SQL. Just insights.
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <button
          className={`rounded-full px-4 py-2 text-sm transition ${
            isDark ? "text-slate-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Docs
        </button>

        <button
          className={`rounded-full px-4 py-2 text-sm transition ${
            isDark ? "text-slate-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Templates
        </button>

        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            isDark
              ? "border-white/10 bg-white/10 text-slate-100 hover:bg-white/15"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? "Light" : "Dark"}
        </button>

        <button
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            isDark ? "bg-white text-slate-950" : "bg-slate-950 text-white"
          }`}
        >
          Launch MVP
        </button>
      </div>
    </nav>
  );
}