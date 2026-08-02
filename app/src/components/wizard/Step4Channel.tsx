"use client";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

export default function Step4Channel({ onNext, onBack }: { onNext: (data: any) => void; onBack: () => void }) {
  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">חיבור ערוץ תקשורת 📡</h2>
      <p className="text-gray-500 mb-6">איפה הלקוחות שלך ידברו עם הסוכן?</p>

      <div className="space-y-3">
        {/* Website chat - active */}
        <div className="p-4 rounded-xl border-2 border-primary-500 bg-primary-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <MessageCircle size={20} className="text-primary-600" />
            </div>
            <div>
              <div className="font-bold text-gray-800">צ׳אט באתר</div>
              <div className="text-xs text-gray-500">וידג׳ט שמתחבר לאתר שלך</div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">פעיל ✓</div>
        </div>

        {/* WhatsApp - coming soon */}
        <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center justify-between opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Send size={20} className="text-green-600" />
            </div>
            <div>
              <div className="font-bold text-gray-600">WhatsApp Business</div>
              <div className="text-xs text-gray-400">חיבור מספר WhatsApp עסקי</div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-bold">בקרוב</div>
        </div>

        {/* Telegram - coming soon */}
        <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center justify-between opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Send size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-600">Telegram</div>
              <div className="text-xs text-gray-400">בוט טלגרם לעסק</div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-xs font-bold">בקרוב</div>
        </div>
      </div>

      {/* Chat preview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 p-4 rounded-xl bg-gray-900 text-white">
        <div className="text-xs text-gray-400 mb-2">תצוגה מקדימה — כך הלקוח יראה את הצ׳אט:</div>
        <div className="space-y-2">
          <div className="flex justify-start">
            <div className="bg-primary-600 text-white px-3 py-2 rounded-xl rounded-tr-none text-sm max-w-[80%]">
              שלום! 👋 איך אפשר לעזור?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-700 text-white px-3 py-2 rounded-xl rounded-tl-none text-sm max-w-[80%]">
              כמה עולה משלוח?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-primary-600 text-white px-3 py-2 rounded-xl rounded-tr-none text-sm max-w-[80%]">
              משלוח חינם מעל ₪200! 🎉 מתחת — רק ₪29
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
          ← חזרה
        </button>
        <button
          onClick={() => onNext({ channel: { website: true, whatsapp: false, telegram: false } })}
          className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-lg hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
        >
          🚀 הפעל את הסוכן!
        </button>
      </div>
    </div>
  );
}
