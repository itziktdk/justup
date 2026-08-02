"use client";
import { AppState } from "@/lib/store";
import { Package, FileText, RefreshCw, Plus } from "lucide-react";

const mockItems = [
  { type: "product", name: "Lenovo ThinkPad X1 Carbon", detail: "₪5,499 | מחשבים ניידים" },
  { type: "product", name: "Lenovo IdeaPad 5", detail: "₪3,299 | מחשבים ניידים" },
  { type: "product", name: "Lenovo Tab M10", detail: "₪899 | טאבלטים" },
  { type: "policy", name: "מדיניות משלוחים", detail: "משלוח חינם מעל ₪200, 3-5 ימי עסקים" },
  { type: "policy", name: "מדיניות החזרות", detail: "14 יום להחזרה ללא שאלות" },
  { type: "faq", name: "שעות פעילות", detail: "א׳-ה׳ 9:00-18:00, ו׳ 9:00-13:00" },
];

export default function KnowledgeBase({ state }: { state: AppState }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">🧠 בסיס ידע</h1>
          <p className="text-sm text-gray-500">{state.knowledge.products} מוצרים, {state.knowledge.categories} קטגוריות</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-medium">
            <RefreshCw size={16} /> סרוק שוב
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm font-medium">
            <Plus size={16} /> הוסף ידע
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {mockItems.map((item, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                item.type === "product" ? "bg-blue-50 text-blue-600" :
                item.type === "policy" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
              }`}>
                {item.type === "product" ? <Package size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <div className="font-medium text-sm text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            </div>
            <button className="text-xs text-primary-600 hover:underline">ערוך</button>
          </div>
        ))}
      </div>
    </div>
  );
}
