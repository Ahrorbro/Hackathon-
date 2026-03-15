# Cursor configuration — Wait App

This project is **configured for the Wait App** (Expo/React Native MVP). Unused skills and rules are archived so Cursor only uses what’s needed.

---

## Active skills (`.cursor/skills/`)

Only these skills are loaded for Wait App:

| Skill | Use |
|-------|-----|
| **wait-app-sow** | SoW, modules, AC, design reference, orchestration (PM + tech lead). |
| **tdd-workflow** | Test-first; 80%+ coverage; unit, integration, E2E. |
| **security-review** | Auth, tokens, input validation, no secrets in client. |
| **frontend-patterns** | React/React Native, state, components, navigation. |
| **coding-standards** | TypeScript, JavaScript, React, Node.js standards. |
| **api-design** | REST APIs, backend or external APIs (e.g. Google Places). |
| **backend-patterns** | API routes, data layer, if we add a backend. |

---

## Active rules (`.cursor/rules/`)

Only **TypeScript** and **common** rules are active:

- `typescript-*.md` — TypeScript/React patterns, testing, security, style.
- `common-*.md` — Development workflow, testing, security, git, coding style, agents.

**Archived:** Swift, Python, PHP, Kotlin, Golang rules are in `.cursor/rules-archive/` and are not loaded.

---

## Archived (not loaded)

- **`.cursor/skills-archive/`** — Previous Cursor skills (investor-outreach, market-research, article-writing, content-engine, frontend-slides). Restore by moving back into `.cursor/skills/` if needed.
- **`.cursor/rules-archive/`** — Language-specific rules (Swift, Python, PHP, Kotlin, Golang). Restore by moving back into `.cursor/rules/` if you add those stacks.

---

## MCP

- **Pencil** — Desktop app MCP for `design.pen` (open, get_editor_state, get_screenshot). Config: `.cursor/mcp.json`.

---

## Quick reference

- **Wait App SoW:** `docs/Wait-App-SoW.md`
- **Subagent breakdown:** `docs/Wait-App-SoW-Subagent-Breakdown.md`
- **Orchestration:** `docs/Wait-App-Orchestration.md`
- **Design summary:** `docs/Design-From-Pencil-Summary.md`
- **App code:** `wait-app/`
