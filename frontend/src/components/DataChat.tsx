import { Bot, MessageSquareText } from "lucide-react";
import Card from "./Card";
import { initialChatMessages } from "../data/mockData";

export default function DataChat({
  prompt,
  setPrompt,
}: {
  prompt: string;
  setPrompt: (value: string) => void;
}) {
  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-200">
            <Bot size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-400">DAX replacement</p>
            <h3 className="text-xl font-semibold text-white">Chat with your data</h3>
          </div>
        </div>

        <MessageSquareText className="text-slate-500" />
      </div>

      <div className="mb-4 h-64 space-y-3 overflow-y-auto rounded-3xl bg-slate-950/60 p-4">
        {initialChatMessages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-cyan-300 text-slate-950"
                  : "border border-white/10 bg-white/[0.06] text-slate-200"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask: create profit margin, group customers, build KPI..."
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-600"
        />

        <button className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
          Send
        </button>
      </div>
    </Card>
  );
}