# JustUp.ai — Product Requirements Document (PRD)

## 🎯 Vision
**JustUp.ai** — פלטפורמה שמאפשרת לכל בעל עסק להקים סוכן AI דיגיטלי לשירות ומכירה, בקליק אחד. ללא צורך במפתח, ללא קוד, ללא ידע טכני.

> "Your AI sales agent. Just up."

---

## 👥 Target Audience
| סגמנט | דוגמה | כאב |
|--------|--------|-----|
| חנויות אונליין | ל.י סחר, חנויות Shopify | נציגים יקרים, לא זמינים 24/7 |
| עסקים קטנים-בינוניים | מכוני יופי, מרפאות, חנויות | לא מספיקים לענות לכל לקוח |
| סוחרים בוואטסאפ | יבואנים, סיטונאים | עומס הודעות, שאלות חוזרות |

---

## 🏗️ MVP — שלב 1 (4-6 שבועות)

### Core Features
1. **Onboarding Wizard**
   - בעל העסק מזין URL של האתר שלו
   - המערכת סורקת אוטומטית: מוצרים, מחירים, קטגוריות, מדיניות
   - בעל העסק מגדיר: שם הסוכן, טון דיבור, שפה, חוקים עסקיים

2. **Knowledge Engine**
   - סריקת אתר אוטומטית (crawl + extract)
   - העלאת קטלוג ידנית (CSV/Excel)
   - הזנת חוקים עסקיים: מבצעים, תשלומים, משלוחים, החזרות
   - עדכון אוטומטי (rescan כל X שעות)

3. **AI Agent Core**
   - מענה ללקוחות בזמן אמת
   - השוואת מוצרים
   - המלצות מותאמות אישית
   - דחיפה למכירה (upsell, urgency, הנחות)
   - העברה לנציג אנושי כשצריך (escalation)

4. **Channel Integration — WhatsApp**
   - חיבור מספר WhatsApp Business
   - הסוכן עונה אוטומטית
   - שליחת תמונות מוצר, PDF השוואות, קישורים

5. **Dashboard (ממשק ניהול)**
   - סטטיסטיקות: שיחות, המרות, שאלות נפוצות
   - היסטוריית שיחות
   - ניהול ידע (עדכון מוצרים/חוקים)
   - הגדרות סוכן

---

## 🔮 שלב 2 (חודשים 2-3)

- **ערוצים נוספים:** Telegram, Instagram DM, Widget לאתר
- **CRM בסיסי:** לידים, מעקב לקוחות, תיוגים
- **A/B Testing:** ניסוי טונים שונים, הצעות שונות
- **דוחות מתקדמים:** ROI, הכנסה שנוצרה מהסוכן
- **מועדונים והנחות:** הגדרת קבוצות לקוחות (חב"ר, VIP, עובדים)
- **תשלומים:** חיבור לסליקה ישירות מהשיחה

---

## 🚀 שלב 3 (חודשים 4-6)

- **Multi-agent:** כמה סוכנים לאותו עסק (מכירות, שירות, טכני)
- **Voice:** מענה קולי AI
- **Marketplace:** תבניות סוכנים מוכנות לפי ענף
- **API:** אינטגרציות עם ERP, מערכות מלאי, logistic
- **White Label:** בעלי עסקים יכולים למכור סוכנים ללקוחות שלהם

---

## 💰 מודל תמחור (הצעה)

| Plan | מחיר/חודש | כולל |
|------|-----------|------|
| **Starter** | ₪199 | סוכן אחד, 500 שיחות, ערוץ אחד |
| **Pro** | ₪499 | סוכן אחד, 2,000 שיחות, כל הערוצים, CRM |
| **Business** | ₪999 | 3 סוכנים, unlimited שיחות, דוחות, A/B |
| **Enterprise** | Custom | White label, API, SLA, התאמות |

שיחה מעבר למכסה: ₪0.30 לשיחה

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│                 JustUp.ai                     │
├─────────────────────────────────────────────┤
│  Frontend (React/Next.js)                    │
│  - Onboarding Wizard                         │
│  - Dashboard                                 │
│  - Knowledge Manager                         │
├─────────────────────────────────────────────┤
│  API Layer (Node.js/Express)                 │
│  - Auth (Entra ID / email)                   │
│  - Tenant Management                         │
│  - Agent Configuration                       │
│  - Analytics                                 │
├─────────────────────────────────────────────┤
│  AI Engine                                   │
│  - LLM (GPT-4 / Claude)                     │
│  - RAG (Vector DB — Pinecone/Qdrant)        │
│  - Product Knowledge Base                    │
│  - Conversation Memory                       │
│  - Sales Logic & Rules Engine                │
├─────────────────────────────────────────────┤
│  Channel Connectors                          │
│  - WhatsApp Business API                     │
│  - Telegram Bot                              │
│  - Web Widget (iframe/script)                │
│  - Instagram (future)                        │
├─────────────────────────────────────────────┤
│  Infrastructure (Azure)                      │
│  - App Service / Container Apps              │
│  - Azure OpenAI                              │
│  - Cosmos DB (conversations, tenants)        │
│  - Blob Storage (media, PDFs)                │
│  - Azure AI Search (vector)                  │
└─────────────────────────────────────────────┘
```

---

## 🎪 POC — Proof of Concept

**לקוח ראשון: ירון צדקה — ל.י סחר (online-shop.co.il)**

מה כבר עשינו:
- ✅ סריקת האתר והבנת הקטלוג
- ✅ בניית ידע מוצרים (Lenovo full catalog)
- ✅ Role play מוצלח — השוואות, המלצות, PDF
- 🔄 בתהליך: שיחה עם ירון להדגמה

---

## 🏆 Competitive Advantage

1. **שוק ישראלי** — עברית native, WhatsApp-first, הבנת תרבות מקומית
2. **Plug & Play** — מ-URL לסוכן חי תוך 5 דקות
3. **מחיר נגיש** — חלק מהמחיר של פתרונות Enterprise
4. **Sales-oriented** — לא רק שירות, גם דוחף מכירות
5. **Personal touch** — הסוכן מרגיש אנושי, לא בוטי

---

## 📋 Next Steps
- [ ] Landing page — justup.ai
- [ ] MVP Architecture — detailed design
- [ ] POC עם ירון — demo live
- [ ] 3 לקוחות beta נוספים
- [ ] עמוד pricing
- [ ] Legal: תקנון, פרטיות, GDPR

---

*Created: 2026-08-01 | Founders: Itzik Tzadaka & Johnny Tzadaka*
*Domain: justup.ai ✅*
