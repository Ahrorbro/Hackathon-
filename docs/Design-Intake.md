# Design Intake — Wait App

When design is sent (e.g. **PDF** or exports from **Pencil**), we use it as the UI reference for implementation.

**→ Share designs one by one:** see **[Design-Intake-One-by-One.md](./Design-Intake-One-by-One.md)** for the screen-by-screen mapping and where to put each design file.

---

## Where to put design assets

| Format | Location | Notes |
|--------|----------|--------|
| **PDF** | `design/wait-app-design.pdf` (or `design/*.pdf`) | Screens, flows, or full spec. |
| **Pencil .pen** | `design.pen` (project root) | Pencil native format; received. |
| **Pencil .fig** | `design/wait-app.fig` (or as exported from Pencil) | Source design file; Pencil MCP can read/edit. |
| **Exported images (PNG/SVG)** | `design/screens/` or `design/exports/` | e.g. splash.png, onboarding.png, home.png, venue-detail.png. |
| **Links** | Add path or URL below | If design lives in Figma/other, link here. |

Create the `design/` folder if it doesn’t exist; keep filenames clear (e.g. by screen or flow).

---

## Status

| Item | Status | Location / notes |
|------|--------|-------------------|
| Design from Pencil / PDF | **Received** | `design.pen` in project root — Lunaris design system. Opened via Pencil MCP; used for Wait App theme and component reference. See `docs/Design-From-Pencil-Summary.md`. |

When you add files, update the table above (e.g. “Received: wait-app-design.pdf in design/”).

---

## How we use it

- **Tech lead / planner** — Reference design when planning each module (layout, components, flows).
- **tdd-guide / implementation** — Match UI to design (splash, onboarding, home, list/map, venue detail, modals).
- **code-reviewer** — Check that implemented screens align with design (layout, key elements).

If design is in PDF only, we’ll use it as a visual spec; if you also provide .fig or exports, we can align more closely (e.g. via Pencil MCP for .fig).
