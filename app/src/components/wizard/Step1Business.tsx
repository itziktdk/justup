"use client";
import { useState } from "react";
import { Store, Globe, ChefHat, Wrench } from "lucide-react";

const businessTypes = [
  { value: "ecommerce", label: "חנות אונליין", icon: Store },
  { value: "restaurant", label: "מסעדה / קפה", icon: ChefHat },
  { value: "services", label: "שירותים", icon: Wrench },
  { value: "other", label: "אחר", icon: Globe },
];

export default function Step1Business({ onNext }: { onNext: (data: any) => void }) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [type, setType] = useState("");
  const [scanning, setScanning] = useState(false);

  function handleWebsite(url: string) {
    setWebsite(url);
    if (url.includes(".")) {
      setScanning(true);
      setTimeout(() => setScanning(false), 2500);
    }
  }

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">ספר לנו על העסק שלך ✨</h2>
      <p className="text-gray-500 mb-6">נתחיל בפרטים בסיסיים — ייקח 30 שניות</p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם העסק</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="למשל: ל.י סחר"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">כתובת האתר</label>
          <div className="relative">
            <input
              value={website}
              onChange={(e) => handleWebsite(e.target.value)}
              placeholder="https://www.your-shop.co.il"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            />
            {scanning && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary-600 text-sm animate-pulse">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                סורק...
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">סוג העסק</label>
          <div className="grid grid-cols-2 gap-3">
            {businessTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  type === t.value
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <t.icon size={20} />
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onNext({ business: { name, website, type } })}
        disabled={!name || !type}
        className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        המשך →
      </button>
    </div>
  );
}
