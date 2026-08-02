"use client";
import { useEffect, useState } from "react";
import { getState } from "@/lib/store";
import WizardPage from "@/components/wizard/WizardPage";
import { redirect } from "next/navigation";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [wizardDone, setWizardDone] = useState(false);

  useEffect(() => {
    const state = getState();
    if (state.wizardComplete) {
      setWizardDone(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (wizardDone) {
      window.location.href = "/dashboard";
    }
  }, [wizardDone]);

  if (!ready) return <div className="min-h-screen gradient-bg" />;
  if (wizardDone) return <div className="min-h-screen gradient-bg" />;

  return <WizardPage />;
}
