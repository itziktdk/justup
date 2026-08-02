"use client";
import { useState } from "react";
import { AppState, setState } from "@/lib/store";

export default function Settings({ state }: { state: AppState }) {
  const [agentName, setAgentName] = useState(state.agent.agentName);
  const [tone, setTone] = useState(state.agent.tone);
  const [pushSales, setPushSales] = useState(state.agent.pushSales);
  const [humanHandoff, setHumanHandoff] = useState(state.agent.humanHandoff);
  const [rules, setRules] = useState(state.knowledge.rules);
  const [saved, setSaved] = useState(false);

  function save() {
    setState({
      agent: { ...state.agent, agentName, tone, pushSales, humanHandoff },
      knowledge: { ...state.knowledge, rules },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold text-gray-800 mb-6">⚙️ הגדרות סוכן</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם הסוכן</label>
          <input value={agentName} onChange={(e) => setAgentName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">טון דיבור</label>
          <div className="flex gap-2 flex-wrap">
            {["professional", "friendly", "persuasive", "custom"].map((t) => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  tone === t ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {t === "professional" ? "מקצועי" : t === "friendly" ? "חברותי" : t === "persuasive" ? "משכנע" : "מותאם"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
          <span className="text-sm font-medium text-gray-700">דחיפת מכירות</span>
          <button onClick={() => setPushSales(!pushSales)}
            className={`w-12 h-6 rounded-full relative transition-colors ${pushSales ? "bg-primary-500" : "bg-gray-300"}`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${pushSales ? "left-0.5" : "left-[26px]"}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
          <span className="text-sm font-medium text-gray-700">העברה לנציג אנושי</span>
          <button onClick={() => setHumanHandoff(!humanHandoff)}
            className={`w-12 h-6 rounded-full relative transition-colors ${humanHandoff ? "bg-primary-500" : "bg-gray-300"}`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${humanHandoff ? "left-0.5" : "left-[26px]"}`} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">חוקים עסקיים</label>
          <textarea value={rules} onChange={(e) => setRules(e.target.value)}
            placeholder="שעות פעילות, מבצעים, מדיניות..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none resize-none h-24" />
        </div>

        <button onClick={save}
          className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors">
          {saved ? "✓ נשמר!" : "שמור שינויים"}
        </button>
      </div>
    </div>
  );
}
