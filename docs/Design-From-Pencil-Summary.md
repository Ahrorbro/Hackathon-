# Design from Pencil — Summary (design.pen)

**Source:** `design.pen` (opened via Pencil MCP)  
**Use:** UI reference for building the Wait App. Match components and tokens to this design system.

---

## What’s in design.pen

- **Design system:** Lunaris (dark theme by default)
- **Top-level:** 37 nodes including:
  - **lunaris: design system components** (frame) — main component library
  - **Start here**, **Step 2**, **Step 3** (text/prompts/frames) — wizard/onboarding-style steps
- **Reusable components (100):** Use these as the visual reference for Wait App UI.

### Component categories (from Pencil)

| Category | Examples |
|----------|----------|
| **Buttons** | Button/Default, Secondary, Outline, Ghost, Destructive; Large variants; Icon Button variants |
| **Forms** | Input Group/Default, Filled; Textarea; Select Group; Input OTP; Search Box; Checkbox; Radio; Switch |
| **Feedback** | Alert (Error, Success, Warning, Info); Tooltip; Progress |
| **Layout** | Card, Card Plain, Card Image, Card Action; Tabs; Accordion; Sidebar; Modal/Dialog |
| **Data** | Data Table, Table Row/Cell; List Item; Pagination; Breadcrumb |
| **Other** | Avatar (Text, Image); Label; Dropdown; Label variants (Success, Orange, Violet, Secondary) |

### Theming

- **Theme:** Dark mode in design (`"Mode": "Dark"`).
- **Variables:** Design uses tokens like `$--background`, `$--foreground`, `$--primary`, `$--secondary`, `$--input`, `$--border`, `$--radius-pill`, `$--font-secondary`, `$--popover`. Map these to the app’s theme (e.g. CSS variables or React Native theme).

---

## Mapping to Wait App (SoW)

| SoW screen / flow | Design reference |
|-------------------|-------------------|
| Splash | Full-screen frame; app logo; use primary/background from design system. |
| Onboarding (2–3 screens) | “Start here”, “Step 2”, “Step 3” frames; Button/Default or Large for CTA. |
| Home | Tabs (category tabs); Card or List Item for venue cards; Search Box; location in header. |
| Login / Signup modal | Modal/Center or Modal/Center Icon; Input Group (email, password); Button/Default (submit); Icon Label or buttons for Google/Apple. |
| Venue detail | Card; Button (Update, Directions, Call, Website); typography and spacing from design system. |
| Update wait time (sheet) | Modal or bottom sheet; Button presets; Textarea for optional comment. |
| Claim venue | Modal; Input Group (email); Button/Default (submit). |

Use Pencil MCP (`get_screenshot`, `batch_get`, `get_variables`) as needed to inspect specific components or export assets during implementation.
