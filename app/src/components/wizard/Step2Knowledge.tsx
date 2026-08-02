"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, FolderOpen, FileText, CheckCircle } from "lucide-react";

export default function Step2Knowledge({ onNext, onBack }: { onNext: (data: any) => void; onBack: () => void }) {
  const [phase, setPhase] = useState<"scanning" | "done">("scanning");
  const [progress, setProgress] = useState(0);
  const [rules, setRules] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setPhase("done"); return 100; }
        return p + Math.random() * 15;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const scanResults = [
    { icon: Package, label: "מוצרים", value: "47", done: progress > 30 },
    { icon: FolderOpen, label: "קטגוריות", value: "5", done: progress > 55 },
    { icon: FileText, label: "מדיניות משלוחים", value: "✓", done: progress > 75 },
    { icon: FileText, label: "מדיניות החזרות", value: "✓", done: progress > 90 },
  ];

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">בניית בסיס הידע 🧠</h2>
      <p className="text-gray-500 mb-6">הסוכן שלך לומד את העסק</p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          animate={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Scan results */}
      <div className="space-y-3 mb-6">
        {scanResults.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: item.done ? 1 : 0.3, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={item.done ? "text-primary-600" : "text-gray-300"} />
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            {item.done && (
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-bold">{item.value}</span>
                <CheckCircle size={16} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {phase === "done" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-center mb-4">
            🎉 מצאנו 47 מוצרים, 5 קטגוריות, מדיניות משלוחים ✅
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-1">חוקים עסקיים (אופציונלי)</label>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="למשל: משלוח חינם מעל ₪200, שעות פעילות 9-18, מבצע 1+1 על קטגוריית X..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none h-24"
          />
        </motion.div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
          ← חזרה
        </button>
        <button
          onClick={() => onNext({ knowledge: { products: 47, categories: 5, policies: ["משלוחים", "החזרות"], faq: [], rules } })}
          disabled={phase !== "done"}
          className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          המשך →
        </button>
      </div>
    </div>
  );
}
