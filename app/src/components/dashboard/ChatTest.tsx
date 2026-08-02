"use client";
import { useState, useRef, useEffect } from "react";
import { AppState } from "@/lib/store";
import { getMockResponse } from "@/lib/mock-responses";
import { Send } from "lucide-react";

interface Msg { id: string; role: "user" | "agent"; text: string; }

export default function ChatTest({ state }: { state: AppState }) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "1", role: "agent", text: state.agent.greeting || `שלום! אני ${state.agent.agentName}, איך אפשר לעזור? 😊` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  function send() {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Date.now().toString(), role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getMockResponse(userMsg.text);
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: "agent", text: response }]);
      setTyping(false);
    }, 1000 + Math.random() * 1500);
  }

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-3rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">🧪 צ׳אט ניסיון</h1>
        <p className="text-sm text-gray-500">בדוק איך הסוכן שלך מגיב ללקוחות</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "agent"
                  ? "bg-primary-600 text-white rounded-tl-sm"
                  : "bg-gray-100 text-gray-800 rounded-tr-sm"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-end">
              <div className="bg-primary-100 px-4 py-2.5 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="כתוב הודעה כלקוח..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-400 outline-none text-sm"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="px-4 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
