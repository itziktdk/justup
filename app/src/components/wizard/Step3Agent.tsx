"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const tones = [
  { value: "professional", label: "מקצועי 👔", desc: "רשמי ומדויק" },
  { value: "friendly", label: "חברותי 😊", desc: "חם ונעים" },
  { value: "persuasive", label: "משכנע 🎯", desc: "דוחף מכירות" },
  { value: "custom", label: "מותאם ✨", desc: "אתה בוחר" },
];

const names = ["דני", "יעל", "נועם", "מיכל", "אלון", "שירה"];

export default function Step3Agent({ onNext, onBack }: { onNext: (data: any) => void; onBack: () => void }) {
  const [agentName, setAgentName] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("he");
  const [pushSales, setPushSales] = useState(true);
  const [humanHandoff, setHumanHandoff] = useState(true);
  const [suggestion] = useState(names[Math.floor(Math.random() * names.length)]);

  const greeting = agentName
    ? `שלום! אני ${agentName}, ${tone === "professional" ? "הנציג הדיגיטלי" : tone === "friendly" ? "כאן לעזור לך" : "אשמח לעזור לך למצוא בדיוק מה שאתה צריך"}! איך אפשר לשרת אותך? 😊`
    : "";

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">הגדרת הסוכן 🤖</h2>
      <p className="text-gray-500 mb-6">מה שם הנציג שלך? תן לו אישיות!</p>

      <div className="space-y-5">
        {/* Agent name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם הסוכן</label>
          <div className="flex gap-2">
            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder={`מה דעתך על "${suggestion}"?`}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
            <button
              onClick={() => setAgentName(suggestion)}
              className="px-4 py-3 rounded-xl bg-primary-50 text-primary-600 font-medium hover:bg-primary-100 transition-colors"
            >
              🎲
            </button>
          </div>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">טון דיבור</label>
          <div className="grid grid-cols-2 gap-2">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`p-3 rounded-xl border-2 text-right transition-all ${
                  tone === t.value ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-gray-500">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שפה</label>
          <div className="flex gap-2">
            {[{ v: "he", l: "🇮🇱 עברית" }, { v: "en", l: "🇺🇸 English" }, { v: "both", l: "🌐 שתיהן" }].map((lang) => (
              <button
                key={lang.v}
                onClick={() => setLanguage(lang.v)}
                className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                  language === lang.v ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600"
                }`}
              >
                {lang.l}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <Toggle label="דחיפת מכירות" desc="הסוכן ינסה לקדם מכירות" value={pushSales} onChange={setPushSales} />
          <Toggle label="העברה לנציג אנושי" desc="אפשרות להעביר שיחה לאדם" value={humanHandoff} onChange={setHumanHandoff} />
        </div>

        {/* Preview */}
        {agentName && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">תצוגה מקדימה של ברכה:</div>
            <div className="text-sm text-gray-700 leading-relaxed">{greeting}</div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
          ← חזרה
        </button>
        <button
          onClick={() => onNext({ agent: { agentName, tone, language, greeting, pushSales, humanHandoff } })}
          disabled={!agentName}
          className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-lg hover:opacity-90 disabled:opacity-40"
        >
          המשך →
        </button>
      </div>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
      <div>
        <div className="font-medium text-sm text-gray-700">{label}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${value ? "bg-primary-500" : "bg-gray-300"}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${value ? "left-0.5" : "left-[26px]"}`} />
      </button>
    </div>
  );
}
