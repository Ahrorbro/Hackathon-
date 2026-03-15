# Wait App — PM + Tech Lead Orchestration

**PM** and **tech lead** orchestrate all subagents and iterate in a loop over the SoW modules.

---

## Roles

| Role | Agent | Responsibility |
|------|--------|-----------------|
| **PM** | `pm` | Scope, priorities, sprint goals, stakeholder communication, blockers. Does **not** run the implementation loop. |
| **Tech lead** | `tech-lead` | Runs the **execution loop**: for each SoW module, delegate to planner → tdd-guide → code-reviewer (→ security-reviewer when needed), verify AC, then next module. |

PM and tech lead work together: PM decides what’s in scope and what to report; tech lead runs the iteration over modules and subagents.

---

## Loop (tech lead)

1. **Current module** — Foundation → Venue Discovery → Wait Time → Venue Management (order fixed).
2. **Plan** — Delegate to **planner** (scope = this module from SoW).
3. **Implement** — Delegate to **tdd-guide** (plan + SoW AC for this module).
4. **Review** — Delegate to **code-reviewer**.
5. **Security** — For Foundation and Venue Management, delegate to **security-reviewer**.
6. **Verify** — Check all SoW AC for this module; mark in progress doc.
7. **Next** — If done, advance to next module; repeat from step 2.

Subagent breakdown per module: `docs/Wait-App-SoW-Subagent-Breakdown.md`.

---

## References

| Doc | Purpose |
|-----|---------|
| `docs/Wait-App-SoW.md` | Full SoW (scope, AC, tech spec). |
| `docs/Wait-App-SoW-Subagent-Breakdown.md` | Per-module: planner / tdd-guide / code-reviewer / security-reviewer focus and verify checklist. |
| `docs/Wait-App-SoW-Execution.md` | Runbook (loop, AC refs). |
| `docs/wait-app-progress.md` | Track which modules/AC are done (create if missing). |
| `agents/pm.md` | PM agent. |
| `agents/tech-lead.md` | Tech lead agent (orchestrates loop). |

---

## Design intake

When design arrives (e.g. PDF or exports from Pencil), place it under `design/` and note in `docs/Design-Intake.md`. Tech lead and subagents use it as UI reference during implementation.
