"use client";
import { useState, useEffect } from "react";
import { getState, AppState } from "@/lib/store";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHome from "@/components/dashboard/DashboardHome";
import ChatTest from "@/components/dashboard/ChatTest";
import KnowledgeBase from "@/components/dashboard/KnowledgeBase";
import Settings from "@/components/dashboard/Settings";

export default function DashboardPage() {
  const [page, setPage] = useState("home");
  const [state, setAppState] = useState<AppState | null>(null);

  useEffect(() => {
    const s = getState();
    if (!s.wizardComplete) { window.location.href = "/"; return; }
    setAppState(s);
  }, []);

  if (!state) return <div className="min-h-screen bg-gray-50" />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar current={page} onNavigate={setPage} agentName={state.agent.agentName} businessName={state.business.name} />
      <main className="flex-1 p-6 overflow-auto">
        {page === "home" && <DashboardHome state={state} />}
        {page === "chat" && <ChatTest state={state} />}
        {page === "knowledge" && <KnowledgeBase state={state} />}
        {page === "settings" && <Settings state={state} />}
      </main>
    </div>
  );
}
