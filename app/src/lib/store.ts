"use client";

export interface BusinessData {
  name: string;
  website: string;
  type: string;
  logo?: string;
}

export interface KnowledgeBase {
  products: number;
  categories: number;
  policies: string[];
  faq: { q: string; a: string }[];
  rules: string;
}

export interface AgentConfig {
  agentName: string;
  tone: string;
  language: string;
  greeting: string;
  pushSales: boolean;
  humanHandoff: boolean;
}

export interface ChannelConfig {
  website: boolean;
  whatsapp: boolean;
  telegram: boolean;
}

export interface AppState {
  business: BusinessData;
  knowledge: KnowledgeBase;
  agent: AgentConfig;
  channel: ChannelConfig;
  wizardComplete: boolean;
  conversations: Conversation[];
}

export interface Message {
  id: string;
  role: "user" | "agent";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  lastMessage: string;
  time: string;
  messages: Message[];
  resolved: boolean;
}

const DEFAULT_STATE: AppState = {
  business: { name: "", website: "", type: "" },
  knowledge: { products: 0, categories: 0, policies: [], faq: [], rules: "" },
  agent: { agentName: "", tone: "friendly", language: "he", greeting: "", pushSales: true, humanHandoff: true },
  channel: { website: true, whatsapp: false, telegram: false },
  wizardComplete: false,
  conversations: [],
};

export function getState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const raw = localStorage.getItem("justup_state");
  if (!raw) return DEFAULT_STATE;
  try { return JSON.parse(raw); } catch { return DEFAULT_STATE; }
}

export function setState(state: Partial<AppState>) {
  const current = getState();
  const next = { ...current, ...state };
  localStorage.setItem("justup_state", JSON.stringify(next));
  return next;
}

export function resetState() {
  localStorage.removeItem("justup_state");
}
