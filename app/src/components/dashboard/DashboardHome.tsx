"use client";
import { AppState } from "@/lib/store";
import { MessageCircle, TrendingUp, HelpCircle, Star } from "lucide-react";

const stats = [
  { label: "שיחות היום", value: "12", icon: MessageCircle, color: "text-blue-600 bg-blue-50" },
  { label: "המרות", value: "3", icon: TrendingUp, color: "text-green-600 bg-green-50" },
  { label: "ללא מענה", value: "2", icon: HelpCircle, color: "text-orange-600 bg-orange-50" },
  { label: "שביעות רצון", value: "4.7/5", icon: Star, color: "text-purple-600 bg-purple-50" },
];

const recentConvos = [
  { name: "יוסי כהן", msg: "תודה רבה! הזמנתי", time: "לפני 5 דק׳", resolved: true },
  { name: "מירב לוי", msg: "כמה עולה משלוח לאילת?", time: "לפני 12 דק׳", resolved: false },
  { name: "אבי מזרחי", msg: "יש לכם את זה במידה L?", time: "לפני 28 דק׳", resolved: true },
  { name: "דנה שמש", msg: "רוצה להחזיר מוצר", time: "לפני שעה", resolved: false },
  { name: "רון ברק", msg: "מעולה, קונה!", time: "לפני 2 שעות", resolved: true },
];

export default function DashboardHome({ state }: { state: AppState }) {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">שלום, {state.business.name} 👋</h1>
        <p className="text-gray-500">{state.agent.agentName} עובד בשבילך עכשיו</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 card-hover">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent conversations */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">שיחות אחרונות</h2>
          <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">הצג הכל</span>
        </div>
        <div className="divide-y divide-gray-50">
          {recentConvos.map((c, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">
                  {c.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-800">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.msg}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{c.time}</span>
                <div className={`w-2 h-2 rounded-full ${c.resolved ? "bg-green-400" : "bg-orange-400"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
