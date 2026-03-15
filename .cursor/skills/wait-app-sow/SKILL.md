---
name: wait-app-sow
description: Wait App MVP scope and execution. Use when implementing features, planning work, or verifying acceptance criteria. References SoW, design, and orchestration (PM + tech lead).
origin: Cursor Wait App
---

# Wait App — SoW & Execution (Cursor)

Use this skill when working on the Wait App: scope, modules, acceptance criteria, and design reference.

## When to Use

- Planning or implementing any Wait App feature
- Checking acceptance criteria before marking a module done
- Aligning UI with design (design.pen / Lunaris)
- Deciding which module or subagent to run next

## Source of Truth

| Doc | Purpose |
|-----|--------|
| `docs/Wait-App-SoW.md` | Full SoW — 4 modules, all AC, tech spec |
| `docs/Wait-App-SoW-Subagent-Breakdown.md` | Per-module: planner → tdd-guide → code-reviewer |
| `docs/Wait-App-Orchestration.md` | PM + tech lead roles, loop |
| `docs/Design-From-Pencil-Summary.md` | design.pen (Lunaris) → tokens, components, screen mapping |
| `design.pen` | Design file — use Pencil MCP to open/screenshot nodes |

## Modules (order)

1. **Foundation** — Auth, location, splash, onboarding, home shell. AC: AUTH-01…04, LOC-01…02.
2. **Venue Discovery** — Home content, list/map, categories, search, venue detail. AC: DISC-01…05, MAP-01…02, DETAIL-01…03.
3. **Wait Time** — Display, user submission, 500m check, rate limit. AC: WAIT-01…06.
4. **Venue Management** — Claim, email verify, verified badge, owner self-report. AC: VENUE-01…05.

## App & Design

- **App:** `wait-app/` — Expo (React Native), TypeScript. Run: `cd wait-app && npm start`.
- **Theme:** `wait-app/src/theme.ts` — Lunaris-inspired (background, primary, etc.).
- **Design:** Use Pencil MCP (`open_document`, `get_editor_state`, `get_screenshot`) for design.pen when matching UI.

## Orchestration (Cursor)

- **PM** (`agents/pm.md`) — Scope, priorities, stakeholder updates.
- **Tech lead** (`agents/tech-lead.md`) — Run loop: planner → tdd-guide → code-reviewer per module; verify AC.
- One module at a time; verify all AC before next module.
