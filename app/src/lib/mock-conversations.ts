import { Conversation } from "./store";

export const mockConversations: Conversation[] = [
  {
    id: "1",
    customerName: "יוסי כהן",
    lastMessage: "תודה רבה! הזמנתי",
    time: "לפני 5 דקות",
    resolved: true,
    messages: [
      { id: "1a", role: "user", text: "היי, כמה עולה המוצר?", time: "14:20" },
      { id: "1b", role: "agent", text: "היי יוסי! 👋 המוצר עולה ₪149 כולל משלוח חינם", time: "14:20" },
      { id: "1c", role: "user", text: "מעולה, ויש אחריות?", time: "14:21" },
      { id: "1d", role: "agent", text: "בטח! שנה אחריות מלאה. רוצה שאוסיף לעגלה? 🛒", time: "14:21" },
      { id: "1e", role: "user", text: "תודה רבה! הזמנתי", time: "14:23" },
    ],
  },
  {
    id: "2",
    customerName: "מיכל לוי",
    lastMessage: "מתי המשלוח מגיע?",
    time: "לפני 12 דקות",
    resolved: false,
    messages: [
      { id: "2a", role: "user", text: "הזמנתי אתמול, מתי המשלוח מגיע?", time: "13:55" },
      { id: "2b", role: "agent", text: "היי מיכל! המשלוח בדרך כלל מגיע תוך 2-3 ימי עסקים 🚚", time: "13:55" },
      { id: "2c", role: "user", text: "מתי המשלוח מגיע?", time: "14:10" },
    ],
  },
  {
    id: "3",
    customerName: "דני אברהם",
    lastMessage: "אני רוצה להחזיר מוצר",
    time: "לפני 30 דקות",
    resolved: false,
    messages: [
      { id: "3a", role: "user", text: "אני רוצה להחזיר מוצר", time: "13:30" },
      { id: "3b", role: "agent", text: "בוודאי! מדיניות ההחזרות שלנו: 14 יום ללא שאלות. מה מספר ההזמנה?", time: "13:30" },
    ],
  },
  {
    id: "4",
    customerName: "שרה גולן",
    lastMessage: "תודה! קניתי שניים 😍",
    time: "לפני שעה",
    resolved: true,
    messages: [
      { id: "4a", role: "user", text: "מה המוצר הכי נמכר?", time: "12:45" },
      { id: "4b", role: "agent", text: "המוצר הכי פופולרי שלנו הוא הדגם Premium — 94% שביעות רצון! ₪199 במבצע", time: "12:45" },
      { id: "4c", role: "user", text: "תודה! קניתי שניים 😍", time: "12:50" },
    ],
  },
];
