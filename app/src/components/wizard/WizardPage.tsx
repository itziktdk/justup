"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1Business from "./Step1Business";
import Step2Knowledge from "./Step2Knowledge";
import Step3Agent from "./Step3Agent";
import Step4Channel from "./Step4Channel";
import { setState } from "@/lib/store";

const steps = ["העסק שלך", "בסיס ידע", "הסוכן", "ערוץ תקשורת"];

export default function WizardPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<any>({});

  function next(stepData?: any) {
    if (stepData) setData((d: any) => ({ ...d, ...stepData }));
    if (current < 3) setCurrent(current + 1);
    else finish(stepData);
  }

  function back() {
    if (current > 0) setCurrent(current - 1);
  }

  function finish(stepData?: any) {
    const final = { ...data, ...stepData };
    setState({
      business: final.business || { name: "", website: "", type: "" },
      knowledge: final.knowledge || { products: 47, categories: 5, policies: ["משלוחים", "החזרות"], faq: [], rules: "" },
      agent: final.agent || { agentName: "נציג חכם", tone: "friendly", language: "he", greeting: "", pushSales: true, humanHandoff: true },
      channel: { website: true, whatsapp: false, telegram: false },
      wizardComplete: true,
    });
    // Confetti + redirect
    import("canvas-confetti").then((confetti) => {
      confetti.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => { window.location.href = "/dashboard"; }, 2000);
    });
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">JustUp.ai</h1>
        <p className="text-white/70 mt-1">בונים לך סוכן מכירות AI</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 w-full max-w-md">
        {steps.map((label, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i <= current ? "bg-white text-primary-700" : "bg-white/20 text-white/60"
            }`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i <= current ? "text-white" : "text-white/40"}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {current === 0 && <Step1Business onNext={next} />}
            {current === 1 && <Step2Knowledge onNext={next} onBack={back} />}
            {current === 2 && <Step3Agent onNext={next} onBack={back} />}
            {current === 3 && <Step4Channel onNext={next} onBack={back} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
