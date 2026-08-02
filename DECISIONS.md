# JustUp.ai — Decisions & Memory Log

> This file is the single source of truth for all decisions made about JustUp.ai.
> Johnny updates this after every conversation. No more "I forgot."

---

## 2026-08-01
- **Project born.** Itzhak and Johnny decided to build JustUp.ai
- Domain purchased: justup.ai ✅
- PRD written with full vision (MVP → Phase 3)
- First POC customer: ירון צדקה (ל.י סחר, online-shop.co.il)
- POC status: site scraped, catalog learned, role play successful

## 2026-08-02
- Landing page built and deployed to GitHub Pages: https://itziktdk.github.io/justup/
- Itzhak asked for full backend analysis — delivered Technical Design Document
- **Key decisions made:**
  - WhatsApp: Meta Cloud API direct (NOT Twilio) — saves ~30%
  - Data isolation: namespace per tenant in Azure AI Search
  - Multi-agent sharing: tag-based scoping within same tenant
  - Cost per tenant: ~$25-60/month → profitable from Starter tier
  - All project memory managed in this GitHub repo (not just local OpenClaw memory)

---

## Open Questions
- [ ] ירון demo date — need to schedule
- [ ] Custom domain (justup.ai) — connect to GitHub Pages or Azure?
- [ ] Dev environment setup — when to start building?
- [ ] Funding/budget for Azure infra (~$350/month fixed to start)

---

*Updated by Johnny after every conversation about JustUp.*
