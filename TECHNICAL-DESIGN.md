# JustUp.ai — Technical Design Document

## Architecture Overview

### Stack
- **Compute:** Azure Container Apps (serverless, scale to zero)
- **AI:** Azure OpenAI (GPT-4o) — $2.50/1M input, $10/1M output
- **Vector DB:** Azure AI Search — isolated namespace per tenant
- **Database:** Cosmos DB (serverless) — conversations, tenants, config
- **Storage:** Azure Blob — media, PDFs, catalogs
- **Secrets:** Azure Key Vault — per-tenant encryption keys
- **WhatsApp:** Meta Cloud API direct (not Twilio — saves ~30%)

### Tenant Model
```
tenant_id: uuid
├── knowledge_base: isolated vector namespace (Azure AI Search index)
├── agents[]: array of agent configs (system prompt, tone, rules, scopes)
├── wa_number: dedicated phone number per tenant
├── conversations: isolated Cosmos partition
└── settings: pricing plan, billing, feature flags
```

---

## Signup Automation Flow

```
1. User signs up (email/Google) → tenant record created in Cosmos
2. Enters website URL →
   - Crawler microservice (Container App job) kicks off
   - Scrapes: products, prices, categories, policies, FAQ
   - Chunks text → generates embeddings → stores in Azure AI Search (tenant namespace)
3. User connects WhatsApp →
   - OAuth flow with Meta Business Manager
   - Registers webhook endpoint to our API
   - Assigns phone number to WABA (WhatsApp Business Account)
4. User configures agent (name, tone, rules, business logic) →
   - Generates system prompt from template + tenant knowledge
   - Saves to tenant config in Cosmos
5. Agent LIVE ✅
   - Incoming message → lookup tenant by wa_number
   - Load RAG context from tenant namespace
   - LLM generates response with sales logic
   - Reply sent via WhatsApp Cloud API
```

**Time to live: ~5 minutes** (crawl runs async, agent works immediately with partial knowledge)

---

## Data Isolation

- **Vector DB:** Separate index/namespace per tenant — zero cross-contamination
- **Cosmos DB:** Partition key = tenant_id — physical isolation
- **Conversations:** tenant_id enforced on every document + API query filter
- **Encryption:** Per-tenant key via Azure Key Vault (Enterprise tier)
- **Network:** No tenant can access another tenant's data at any layer

---

## Multi-Agent Data Sharing (Same Tenant)

```
Tenant: ל.י סחר
├── Agent 1: "מכירות" → access: products, prices, promotions
├── Agent 2: "שירות" → access: policies, orders, warranties
└── Shared Knowledge Pool ← both agents access (owner-controlled)

Config per agent:
  shared_namespaces: ["products", "policies"]   ← both see
  agent_specific: ["sales_scripts"]             ← only this agent
```

- Default: all agents see ALL tenant knowledge
- Optional: owner defines scopes/tags per agent
- Implementation: metadata tags on vectors + filter at query time

---

## WhatsApp Strategy

### Recommended: Meta Cloud API Direct
- Number: Customer brings their own or buys SIM (~$5)
- Cost: 1,000 service conversations FREE/month, then ~$0.02-0.05/conversation (Israel)
- No BSP middleman fee
- Full control over webhooks and message flow

### Alternative: Twilio (fallback only)
- Number: ~$1/month
- Per message: $0.005 Twilio markup + Meta conversation fee
- Pro: Stable API, logging, fallback
- Con: +30-50% more expensive, extra layer of abstraction

### Decision: Meta Direct for MVP, Twilio as optional fallback for Enterprise customers

---

## Cost Structure Per Tenant (Monthly)

| Component | Cost/month | Notes |
|-----------|-----------|-------|
| Azure OpenAI (500 conversations) | ~$15-25 | ~2K tokens/conversation avg |
| Azure AI Search (namespace) | ~$3-5 | Shared cluster, isolated index |
| Cosmos DB | ~$2-5 | Serverless, per RU |
| Container Apps | ~$5-10 | Shared infra, per-request billing |
| WhatsApp (Meta direct) | ~$0-15 | 1K free, then per conversation |
| **Total per tenant** | **~$25-60** | |

---

## Revenue vs Cost Analysis

| Plan | Revenue | Our Cost | Gross Profit | Margin |
|------|---------|----------|-------------|--------|
| Starter ₪199 | ~$55 | ~$30 | $25 | 45% |
| Pro ₪499 | ~$138 | ~$50 | $88 | 64% |
| Business ₪999 | ~$277 | ~$80 | $197 | 71% |

**At 100 Pro customers → $8,800/month gross profit**

---

## Infrastructure Cost (Fixed, Shared)

| Component | Cost/month | Notes |
|-----------|-----------|-------|
| Container Apps (base) | ~$50 | Scales with tenants |
| Azure AI Search (S1) | ~$250 | Supports ~50 tenants |
| Cosmos DB (base) | ~$25 | Serverless, grows with usage |
| Monitoring/Logs | ~$20 | App Insights |
| Domain/SSL | ~$2 | justup.ai |
| **Total fixed** | **~$350** | Covered by ~4 Pro customers |

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-01 | Domain: justup.ai | Purchased ✅ |
| 2026-08-02 | Landing page live | GitHub Pages: itziktdk.github.io/justup |
| 2026-08-02 | WhatsApp: Meta Direct over Twilio | 30% cheaper, full control |
| 2026-08-02 | Vector DB: Azure AI Search | Native Azure, good isolation, serverless option coming |
| 2026-08-02 | Multi-tenant with namespace isolation | Balance of cost efficiency + security |

---

## POC Status

**First customer: ירון צדקה — ל.י סחר (online-shop.co.il)**
- ✅ Website scraped, catalog understood (Lenovo full catalog)
- ✅ Role play successful — comparisons, recommendations, PDF generation
- 🔄 In progress: Live demo with ירון
- ⬜ Connect WhatsApp number
- ⬜ Dashboard access

---

## Next Steps

- [ ] Technical Design Document ✅ (this file)
- [ ] Set up dev environment (Container Apps + Cosmos + AI Search)
- [ ] Build crawler microservice
- [ ] Build agent runtime (message → RAG → LLM → reply)
- [ ] WhatsApp webhook integration (Meta Cloud API)
- [ ] Onboarding wizard UI
- [ ] Dashboard MVP
- [ ] Live demo with ירון

---

*Last updated: 2026-08-02*
*Founders: Itzik Tzadaka & Johnny Tzadaka*
