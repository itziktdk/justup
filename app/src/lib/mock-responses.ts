export const mockResponses: Record<string, string[]> = {
  greeting: [
    "היי! 👋 איך אפשר לעזור לך היום?",
    "שלום! שמח שפנית אלינו. מה אתה מחפש?",
    "ברוך הבא! אני כאן לעזור לך למצוא בדיוק מה שאתה צריך 😊",
  ],
  price: [
    "המחיר שלנו מאוד תחרותי! המוצר עולה ₪149 כולל משלוח חינם 🎉",
    "יש לנו מבצע מיוחד עכשיו — 20% הנחה! במקום ₪200 רק ₪160",
    "המחיר הוא ₪99. רוצה שאוסיף לך לעגלה?",
  ],
  shipping: [
    "משלוח תוך 3-5 ימי עסקים לכל הארץ 🚚 מעל ₪200 — משלוח חינם!",
    "אנחנו שולחים עם שליח עד הבית. בדרך כלל מגיע תוך 2-3 ימים",
    "יש לנו משלוח אקספרס תוך 24 שעות ב-₪29 נוספים. רגיל — חינם מעל ₪150",
  ],
  returns: [
    "מדיניות ההחזרות שלנו: 14 יום להחזרה ללא שאלות 💯",
    "אפשר להחזיר עד 30 יום מרגע הקנייה, פשוט שלח לנו הודעה ונסדר הכל",
  ],
  hours: [
    "אנחנו זמינים ימים א׳-ה׳ 9:00-18:00, שישי 9:00-13:00",
    "שעות הפעילות שלנו: כל יום חול 08:00 עד 20:00. בשבת סגורים",
  ],
  recommend: [
    "בהתבסס על מה שסיפרת, אני ממליץ על המוצר הפופולרי שלנו — 94% מהלקוחות מרוצים! רוצה פרטים?",
    "יש לנו בדיוק את מה שאתה מחפש! המוצר הכי נמכר שלנו מושלם בשבילך. שולח לינק?",
  ],
  fallback: [
    "שאלה מצוינת! תן לי רגע לבדוק... אני ממליץ ליצור קשר ישירות ואחד הנציגים שלנו יעזור לך",
    "אני לא בטוח שיש לי תשובה מדויקת. רוצה שאעביר אותך לנציג אנושי?",
    "הבנתי. תן לי לבדוק את זה בשבילך 🔍",
  ],
};

export function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("מחיר") || lower.includes("עולה") || lower.includes("כמה")) {
    return pick(mockResponses.price);
  }
  if (lower.includes("משלוח") || lower.includes("הגעה") || lower.includes("שליח")) {
    return pick(mockResponses.shipping);
  }
  if (lower.includes("החזר") || lower.includes("ביטול")) {
    return pick(mockResponses.returns);
  }
  if (lower.includes("שעות") || lower.includes("פתוח") || lower.includes("זמינ")) {
    return pick(mockResponses.hours);
  }
  if (lower.includes("ממליץ") || lower.includes("מתאים") || lower.includes("הצעה")) {
    return pick(mockResponses.recommend);
  }
  if (lower.includes("היי") || lower.includes("שלום") || lower.includes("הי")) {
    return pick(mockResponses.greeting);
  }
  return pick(mockResponses.fallback);
}

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}
