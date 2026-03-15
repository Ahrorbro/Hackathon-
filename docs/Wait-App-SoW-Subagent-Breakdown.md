# Wait App SoW — Subagent Breakdown

Use this when delegating to **planner**, **tdd-guide**, **code-reviewer**, and **security-reviewer**. One chain per module; run modules in order.

**SoW source:** `docs/Wait-App-SoW.md`

---

## Module 1: Foundation

| Subagent | Input / focus | Output / done when |
|----------|----------------|---------------------|
| **planner** | Foundation only: auth (email/password + Google/Apple), location (GPS + manual), splash, onboarding, guest browse. Dependencies: none. | Implementation plan (files, order, AC refs). |
| **tdd-guide** | Plan + SoW Foundation. AC: AUTH-01…04, LOC-01…02. | Tests first, then implementation; all 6 AC covered. |
| **code-reviewer** | Implementation. | Review done; CRITICAL/HIGH fixed. |
| **security-reviewer** | Auth flows, session, OAuth, no secrets in client. | Security review done. |

**Verify before next module:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, LOC-01, LOC-02.

---

## Module 2: Venue Discovery

| Subagent | Input / focus | Output / done when |
|----------|----------------|---------------------|
| **planner** | Venue Discovery only: Home, 6 categories, list/map, search, venue detail, Google Places. Depends on: Foundation (location, basic app shell). | Implementation plan. |
| **tdd-guide** | Plan + SoW Venue Discovery. AC: DISC-01…05, MAP-01…02, DETAIL-01…03. | Tests + implementation. |
| **code-reviewer** | Implementation. | Review done. |

**Verify before next module:** DISC-01…05, MAP-01…02, DETAIL-01…03.

---

## Module 3: Wait Time

| Subagent | Input / focus | Output / done when |
|----------|----------------|---------------------|
| **planner** | Wait Time only: display (source priority, Google fallback), user submission, 500m check, 30min rate limit, presets, comment. Depends on: Foundation (auth), Venue Discovery (venue detail). | Implementation plan. |
| **tdd-guide** | Plan + SoW Wait Time. AC: WAIT-01…06. | Tests + implementation. |
| **code-reviewer** | Implementation. | Review done. |

**Verify before next module:** WAIT-01…06.

---

## Module 4: Venue Management

| Subagent | Input / focus | Output / done when |
|----------|----------------|---------------------|
| **planner** | Venue Management only: claim CTA, email verify, review queue, verified badge, owner “Your Venue”, self-report (no rate limit). Depends on: Foundation (auth), Venue Discovery (detail). | Implementation plan. |
| **tdd-guide** | Plan + SoW Venue Management. AC: VENUE-01…05. | Tests + implementation. |
| **code-reviewer** | Implementation. | Review done. |
| **security-reviewer** | Claim verification, email, admin review flow. | Security review done. |

**Verify before next module:** VENUE-01…05.

---

## Order of execution

1. **Foundation** → planner → tdd-guide → code-reviewer → security-reviewer → verify AC → done.
2. **Venue Discovery** → planner → tdd-guide → code-reviewer → verify AC → done.
3. **Wait Time** → planner → tdd-guide → code-reviewer → verify AC → done.
4. **Venue Management** → planner → tdd-guide → code-reviewer → security-reviewer → verify AC → done.

Each module’s “verify AC” step = check the SoW acceptance criteria for that module and mark them (e.g. in `docs/wait-app-progress.md`).
