# Wait App — Build plan (pages, admin, mobile)

Build order **one by one**. Use **subagents** (planner → tdd-guide → code-reviewer) per module. **Mobile-first**; **admin dashboard** for claim review. Tokens/OAuth you’ll share on the way.

---

## Build order

| Phase | What | Pages / screens | Subagents |
|-------|------|------------------|-----------|
| **1. Foundation** | Auth, location, shell | Splash, Onboarding, Home (shell), Login/Signup modal, location header | planner → tdd-guide → code-reviewer → security-reviewer |
| **2. Venue Discovery** | List, map, search, detail | Home (list + map), Search modal, Venue detail | planner → tdd-guide → code-reviewer |
| **3. Wait Time** | Display + submit | Venue detail (wait card), Update wait time bottom sheet | planner → tdd-guide → code-reviewer |
| **4. Venue Management** | Claim, verify, owner | Venue detail (Claim CTA, Verified badge), Claim modal, owner “Your Venue” | planner → tdd-guide → code-reviewer → security-reviewer |
| **5. Admin dashboard** | Review venue claims | Web app: login, list pending claims, approve/reject | planner → tdd-guide → code-reviewer |

---

## Mobile-friendly checklist (every screen)

- [ ] **Safe area** — SafeAreaView or useSafeAreaInsets so content isn’t under notch/home indicator.
- [ ] **Touch targets** — Buttons/links at least 44pt height; spacing between tappable items.
- [ ] **Scroll** — Long content in ScrollView; keyboard avoiding where there are inputs.
- [ ] **Text** — Readable sizes (e.g. 16pt body); no tiny labels.
- [ ] **Orientation** — Portrait-first; layout works on small phones (e.g. 375pt width).

---

## Pages (mobile app) — one by one

1. **Splash** — Already there; 2s then next. ✓
2. **Onboarding** — Already there; 3 slides, Get started. ✓
3. **Home** — Shell done; next: location header, category tabs, venue list placeholder (then real list in Venue Discovery).
4. **Login/Signup modal** — Email + password; “Sign in with Google” (active when you share OAuth).
5. **Venue list** — Home content: categories, list of cards (Venue Discovery).
6. **Map view** — Toggle on Home; Mapbox when you share token (Venue Discovery).
7. **Search** — Modal; debounced search (Venue Discovery).
8. **Venue detail** — Name, address, wait time, actions, Claim CTA (Venue Discovery + Wait Time + Venue Management).
9. **Update wait time** — Bottom sheet; presets, optional comment (Wait Time).
10. **Claim venue** — Modal; email input, verify flow (Venue Management).

---

## Admin dashboard (web)

- **Purpose:** Review venue claims (approve/reject within 48h per SoW).
- **Tech:** Next.js or Vite + React; same Supabase project; admin-only auth (e.g. email allowlist or role in DB).
- **Screens:** Login → Pending claims list → Approve/Reject per claim.
- **When:** After or in parallel with Venue Management (Phase 4).

---

## Tokens / OAuth (you share on the way)

- **Map token** — When you share → we add to `.env` and wire map (Phase 2).
- **Google OAuth** — When you share Client ID + Secret → we add in Supabase and enable “Sign in with Google” (Phase 1).

---

## Status: Phase 1 done; Phase 2 (Venue Discovery) implemented

- **Done:** Build plan doc; Supabase client + AuthProvider; Login/Signup modal (email + Google placeholder); location hook (permission + coords); SafeAreaView on all screens; “Update Wait Time” on Home → login prompt when guest. iOS/Android location permissions in app.json.
- **Venue Discovery:** Migration in wait-app/supabase/migrations/; CategoryTabs, VenueList, SearchModal, VenueDetailScreen; List/Map toggle (map placeholder until Mapbox token). Run the SQL in Supabase SQL Editor. Next: Phase 3 (Wait Time), Phase 4 (Venue Management).
