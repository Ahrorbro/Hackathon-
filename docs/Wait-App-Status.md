# Wait App — Where We Are

Quick status: SoW, subagent breakdown, and design (Pencil).

---

## 1. Do we have the SoW?

**Yes.**

| Item | Location | Notes |
|------|----------|--------|
| Full SoW | `docs/Wait-App-SoW.md` | Wait App 4-week MVP, 4 modules, all AC, tech spec |
| Execution runbook | `docs/Wait-App-SoW-Execution.md` | Loop: Foundation → Venue Discovery → Wait Time → Venue Management |

---

## 2. Is the SoW divided into parts for subagents?

**Partially.** The runbook says “planner → tdd-guide → code-reviewer” per module but didn’t spell out who does what. Use the breakdown below.

### SoW → subagent mapping (per module)

For **each** of the 4 modules, run in this order:

| Step | Subagent / action | Responsibility |
|------|--------------------|----------------|
| 1 | **planner** | Plan this module only (scope from SoW, tasks, dependencies on previous modules). |
| 2 | **tdd-guide** | Write tests first, then implement to pass; follow SoW acceptance criteria for this module. |
| 3 | **code-reviewer** | Review implementation for quality and maintainability. |
| 4 | **security-reviewer** | Use only for Foundation (auth) and Venue Management (claim/email). Optional for other modules. |
| 5 | **You / main agent** | Verify all AC from SoW for this module; then move to next module. |

### Module ↔ subagent focus

| Module | Planner focuses on | TDD-guide focuses on | Code-reviewer focuses on | Security-reviewer (if used) |
|--------|--------------------|------------------------|---------------------------|-----------------------------|
| **Foundation** | Auth flows, location, splash/onboarding, guest mode | AUTH-01…04, LOC-01…02; tests for login, location, permissions | Auth safety, session handling, input validation | Auth, tokens, OAuth, no secrets in client |
| **Venue Discovery** | Home, list/map, categories, search, venue detail, Google Places | DISC-01…05, MAP-01…02, DETAIL-01…03; list/map/detail tests | API usage, state, empty states | — |
| **Wait Time** | Display priority, submission flow, 500m check, rate limit | WAIT-01…06; submission, location, rate-limit tests | Edge cases, sanitization | — |
| **Venue Management** | Claim flow, email verify, review queue, owner badge, self-report | VENUE-01…05; claim, verify, owner submission tests | Owner vs consumer logic | Claim verification, email, admin review |

### How to run it

- **Option A:** One phase at a time: e.g. “Run planner for Foundation using docs/Wait-App-SoW.md” → then tdd-guide → then code-reviewer → verify AC → next module.
- **Option B:** Use orchestrate per module: `/orchestrate feature "Wait App MVP — Foundation per docs/Wait-App-SoW.md"` (and same for Venue Discovery, Wait Time, Venue Management).

So: **SoW is divided into 4 modules, and each module is executed by the same subagent chain (planner → tdd-guide → code-reviewer, + security-reviewer where noted).**

---

## 3. Do we have design from Pencil?

**Tooling: yes. Design files: no.**

| Item | Status | Notes |
|------|--------|--------|
| Pencil MCP | Connected | 90 tools available; see `docs/Pencil-MCP-Tools-Reference.md` |
| Wait App design in Pencil | Not yet | No `.fig` files in the repo; no screens or flows created in Pencil yet |

So we *can* do design with Pencil (create/open .fig, shapes, export SVG, etc.), but we don’t yet have a Wait App design (splash, onboarding, home, list/map, venue detail, modals) in Pencil.

**Next steps if you want design from Pencil:**

1. Create a new .fig (e.g. `design/wait-app.fig` or in Pencil’s default dir) via Pencil MCP `new_document` / `create_page`.
2. For each main screen in the SoW (Splash, Onboarding, Home, Venue list, Map, Venue detail, Login/Signup, Update wait time, Claim venue), add a page or frame and rough layout with `create_shape`, `set_fill`, `set_text`, etc.
3. Export key frames as SVG/PNG with `export_svg` / `export_image` and save under e.g. `design/` or `docs/design/` for reference during build.
4. Optionally, use that .fig as the single source of truth for “design from Pencil” and implement screens to match.

---

## Summary

| Question | Answer |
|----------|--------|
| Do we have the SoW? | Yes — `docs/Wait-App-SoW.md` |
| Is the SoW divided into parts for subagents? | Yes — 4 modules, each run with planner → tdd-guide → code-reviewer (+ security-reviewer for Foundation & Venue Management); see table above. |
| Do we have design from Pencil? | Pencil MCP ready; design **pending** — you'll send via PDF or other; see `docs/Design-Intake.md`. |
| PM + tech lead to orchestrate and iterate in a loop? | Yes — see `docs/Wait-App-Orchestration.md`, `agents/pm.md`, `agents/tech-lead.md`. |


## 4. PM + Tech Lead orchestration

**Yes — configured.** PM (`pm`) and tech lead (`tech-lead`) orchestrate all subagents; tech lead runs the execution loop (planner → tdd-guide → code-reviewer per module, verify AC, next module). See `docs/Wait-App-Orchestration.md` and `agents/tech-lead.md`.

---

## 5. Design intake (PDF / Pencil)

When you send design (e.g. **PDF** or exports from Pencil): put files in `design/` and note in `docs/Design-Intake.md`. Tech lead and subagents use it as UI reference. Design files are **pending** until you send.
