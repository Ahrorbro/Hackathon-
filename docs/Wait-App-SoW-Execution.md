# Wait App SoW — Execution Loop (Runbook)

Use this to **run the SoW in a loop** without a dedicated subagent. The main agent (or you) follows this playbook and uses existing **planner**, **orchestrate**, and optionally **loop-operator**.

## Source of truth

- **SoW:** `docs/Wait-App-SoW.md`
- **Modules (order):** 1. Foundation → 2. Venue Discovery → 3. Wait Time → 4. Venue Management

## Loop: one phase per module

For **each module** in order:

1. **Plan** — Invoke **planner** with:
   - Scope: the module name and its section from the SoW (requirements, user flows, acceptance criteria).
   - Constraint: "Implement only this module; depend on previous modules if any."

2. **Execute** — Run the **orchestrate feature** workflow for that module:
   - `/orchestrate feature "Wait App MVP — [Module Name] per docs/Wait-App-SoW.md"`
   - Or: planner → tdd-guide → code-reviewer (and security-reviewer for auth/claim flows).

3. **Verify** — Check the module’s acceptance criteria from the SoW. Mark them in a simple checklist (e.g. in this file or a `docs/wait-app-progress.md`).

4. **Next** — If all AC pass, move to the next module. If not, fix and re-verify before advancing.

## Module ↔ acceptance criteria (quick ref)

| Module            | Acceptance criteria IDs |
|-------------------|-------------------------|
| Foundation        | AUTH-01 … AUTH-04, LOC-01, LOC-02 |
| Venue Discovery   | DISC-01 … DISC-05, MAP-01, MAP-02, DETAIL-01 … DETAIL-03 |
| Wait Time         | WAIT-01 … WAIT-06 |
| Venue Management  | VENUE-01 … VENUE-05 |

## When to use loop-operator

- Use **loop-operator** when you have a **long-running or automated loop** (e.g. “run all four phases in one session” or a script that re-invokes the next phase). The operator monitors for stalls, retry storms, and cost drift and can pause or escalate.
- For **manual phase-by-phase** execution, you don’t need the loop-operator; just follow the four steps above per module.

## Optional: single “run SoW” entry point

To “orchestrate everything and run the SoW in a loop” in one go:

1. **Start:** “Run the Wait App SoW execution loop from docs/Wait-App-SoW-Execution.md. Begin with Foundation.”
2. **Per phase:** The agent runs planner → orchestrate feature for that module → verifies AC → then proceeds to the next module.
3. **Checkpoints:** After each module, optionally confirm with the user before starting the next (reduces risk of long unattended runs).

No separate SoW-orchestrator subagent is required; this runbook + existing agents is enough.
