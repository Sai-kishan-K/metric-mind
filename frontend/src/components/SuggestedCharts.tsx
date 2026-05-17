import { Sparkles } from "lucide-react";
import Card from "./Card";
import { suggestedCharts } from "../data/mockData";

export default function SuggestedCharts() {
  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-300">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-sm text-slate-400">AI recommendations</p>
          <h3 className="text-xl font-semibold text-white">Suggested charts</h3>
        </div>
      </div>

      <div className="space-y-3">
        {suggestedCharts.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-slate-950/60 p-3">
              <div className="rounded-xl bg-cyan-300/10 p-2 text-cyan-200">
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {item.type} · {item.confidence} confidence
                </p>
              </div>

              <button className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 hover:bg-white/15">
                Add
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}