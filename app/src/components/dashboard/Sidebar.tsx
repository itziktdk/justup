"use client";
import { Home, MessageCircle, Brain, Settings, BarChart3, FlaskConical } from "lucide-react";

const nav = [
  { id: "home", label: "דשבורד ראשי", icon: Home },
  { id: "chat", label: "צ׳אט ניסיון", icon: FlaskConical },
  { id: "knowledge", label: "בסיס ידע", icon: Brain },
  { id: "settings", label: "הגדרות סוכן", icon: Settings },
];

export default function Sidebar({ current, onNavigate, agentName, businessName }: {
  current: string; onNavigate: (p: string) => void; agentName: string; businessName: string;
}) {
  return (
    <aside className="w-64 bg-white border-l border-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="text-lg font-bold gradient-text">JustUp.ai</div>
        <div className="text-xs text-gray-500 mt-1">{businessName}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              current === item.id
                ? "bg-primary-50 text-primary-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Agent badge */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
          <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-sm">🤖</div>
          <div>
            <div className="text-sm font-bold text-green-800">{agentName}</div>
            <div className="text-xs text-green-600">● פעיל</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
