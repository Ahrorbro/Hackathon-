# Wait App — Where We Are & Setup Before Building

Use this to see **what we have**, **what’s left to set up**, and **when we start building**.  
**Order:** Set up everything below → then proceed with building (SoW modules).

---

## What we have now (ready)

| Item | Status | Location / note |
|------|--------|------------------|
| **SoW** | Ready | `docs/Wait-App-SoW.md` — 4 modules, all AC, tech spec. |
| **Design** | Ready | `design.pen` (Lunaris). Opened via Pencil MCP; summary in `docs/Design-From-Pencil-Summary.md`. |
| **SoW → subagents** | Ready | `docs/Wait-App-SoW-Subagent-Breakdown.md` — who does what per module. |
| **PM + tech lead** | Ready | `docs/Wait-App-Orchestration.md`, `agents/pm.md`, `agents/tech-lead.md`. |
| **Cursor config** | Ready | Skills/rules reorganized for Wait App only. `.cursor/skills/`, `.cursor/rules/`, `.cursorrules`, `.cursor/README.md`. |
| **Pencil MCP** | Ready | `.cursor/mcp.json` — desktop Pencil app; open/screenshot design.pen. |
| **App scaffold** | Ready | `wait-app/` — Expo (React Native), TS. Splash (2s) → Onboarding (3 slides) → Home shell. Theme from design. |

---

## Setup steps before we build (in order)

Do these **before** we proceed with full implementation (Foundation → Venue Discovery → Wait Time → Venue Management).

### 1. SoW — done  
- Full scope and AC are in place.

### 2. Design — done  
- design.pen in repo; Pencil MCP connected; design summary doc exists.

### 3. Supabase — you share, then we configure  
- **You:** Share Supabase project (URL, anon key, and optionally service role or DB details as needed for backend).  
- **We:** Add Supabase to the app (e.g. `wait-app`): env vars, client config, and optionally auth + DB (e.g. venues, wait_reports, claims).  
- **Doc to create:** `docs/Wait-App-Supabase-Config.md` (or section below) with env var names and where they go (e.g. `.env.example` in `wait-app/`).

### 4. Mapbox + other integrations  
- **Map** — **Mapbox (free)**. We need `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN`. See `docs/Wait-App-API-And-Keys-Needed.md`.  
- **Supabase** — Auth + DB (you share URL + anon key).  
- **Google Places API** — Optional later for venue search/details; not required to start.  
- **AdMob** — SoW says “config finalized by Lester before dev”. Add when client provides config.  
- **Email (claim verification)** — Can be Supabase (e.g. magic link) or Resend; configure when we build Venue Management.

### 5. Environment and secrets (after Supabase + APIs)  
- **wait-app:** `.env.example` with placeholders (e.g. `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`).  
- **No secrets in repo** — real values only in local `.env` / EAS secrets / CI.

### 6. “Config complete” checklist  
- [ ] Supabase: URL + anon key in `wait-app/.env`; client wired.  
- [ ] Mapbox: public access token in `wait-app/.env`; map wired.  
- [ ] Auth: Supabase Auth configured (email/password or magic link).  
- [ ] Email for claim verification (can be later; Supabase or Resend).  
- [ ] AdMob: optional; Lester to finalize.

---

## After setup is complete — building

Once the checklist above is done:

1. **Tech lead loop** — For each SoW module in order (Foundation → Venue Discovery → Wait Time → Venue Management):  
   planner → tdd-guide → code-reviewer (and security-reviewer for Foundation & Venue Management) → verify AC → next module.

2. **Foundation (finish)** — Auth (login/signup modal, session), location (permission + manual entry), then any Supabase/Firebase wiring.

3. **Venue Discovery** — Home: categories, list/map, search, venue detail, Google Places (and Supabase if we store venues).

4. **Wait Time** — Display logic, user submission (500m, rate limit), Google fallback.

5. **Venue Management** — Claim flow, email verification, admin review, verified badge, owner self-report.

---

## Quick reference

| Need | Look here |
|------|-----------|
| Full scope | `docs/Wait-App-SoW.md` |
| Per-module tasks & AC | `docs/Wait-App-SoW-Subagent-Breakdown.md` |
| Who runs the loop | `docs/Wait-App-Orchestration.md` |
| Design tokens & mapping | `docs/Design-From-Pencil-Summary.md` |
| Cursor skills/rules | `.cursor/README.md`, `.cursorrules` |
| App code | `wait-app/` |
| API & keys (Supabase + Mapbox) | `docs/Wait-App-API-And-Keys-Needed.md`; `wait-app/.env.example` |

---

**Summary:** SoW and design are ready; Cursor is configured for Wait App. **Next:** You share Supabase → we configure Supabase + env (+ other APIs as needed) → we mark “setup complete” → then we proceed with building (tech lead loop, module by module).
