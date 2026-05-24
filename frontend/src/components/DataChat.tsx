import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageSquareText, Send } from "lucide-react";
import Card from "./Card";

type ChatMessage = {
  id: number;
  role: "user" | "ai";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "ai",
    text: "I can help you create calculated columns, explain your dataset, suggest charts, and generate metric logic using plain English.",
  },
  {
    id: 2,
    role: "ai",
    text: "Try asking: Create a profit margin column using profit divided by revenue.",
  },
];

function getMockAIResponse(userMessage: string) {
  const message = userMessage.toLowerCase();

  if (message.includes("profit margin")) {
    return "I understood your request. In the next phase, I will generate a safe calculated column formula like: Profit Margin = Profit / Revenue * 100.";
  }

  if (message.includes("profit") && message.includes("revenue")) {
    return "This sounds like a calculated metric request. Soon I will convert this into validated backend logic using your actual dataset columns.";
  }

  if (message.includes("chart") || message.includes("show")) {
    return "I can help create chart instructions. In the next phase, this will connect to the dashboard and chart builder.";
  }

  if (message.includes("explain") || message.includes("summary")) {
    return "I can summarize your dataset using the detected schema, numeric fields, categorical fields, and dashboard patterns.";
  }

  return "I understood your request. Formula generation and dataset-aware actions will be connected in the next phase.";
}

export default function DataChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [prompt, setPrompt] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  function handleSendMessage() {
    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt || isThinking) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: cleanedPrompt,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setPrompt("");
    setIsThinking(true);

    window.setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: getMockAIResponse(cleanedPrompt),
      };

      setMessages((currentMessages) => [...currentMessages, aiMessage]);
      setIsThinking(false);
    }, 700);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

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

      <div className="mb-4 h-80 space-y-3 overflow-y-auto rounded-3xl bg-slate-950/60 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
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

        {isThinking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-300">
              <Loader2 size={16} className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        {[
          "Create profit margin column",
          "Show revenue by region",
          "Explain this dataset",
          "Create high value customer category",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setPrompt(suggestion)}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-left text-xs text-slate-300 transition hover:border-cyan-300/40"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask: create profit margin, group customers, build KPI..."
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-600"
        />

        <button
          onClick={handleSendMessage}
          disabled={!prompt.trim() || isThinking}
          className="flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </Card>
  );
}