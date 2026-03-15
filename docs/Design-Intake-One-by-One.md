# Design intake — one by one (Wait App)

Share designs **one by one**. For each design you share, we map it to a screen or component and update the app to match.

---

## Platform: **iOS + Android** (mobile only)

The app is built with **Expo / React Native** for **Android and iOS**. All UI is implemented for native mobile (touch targets, SafeAreaView, portrait-first). Web is supported for development only.

---

## Screens and components — design mapping

When you share a design, tell us which screen or flow it is (e.g. “Home”, “Venue detail”, “Login modal”). We’ll put the file here and update the matching code.

| # | Screen / flow | Design file (you share) | Code to update | Status |
|---|----------------|-------------------------|----------------|--------|
| 1 | Splash | `design/screens/splash.png` | `src/screens/SplashScreen.tsx` | Done — gradient, W logo, “Skip the wait, not the experience” |
| 2 | Onboarding (3 slides) | `design/screens/onboarding-1.png`, `onboarding-2.png` | `src/screens/OnboardingScreen.tsx` | Done — slide 1: “Real-Time Wait Times”; slide 2: “Community Powered”; coral button, dots |
| 3 | Home (list + map toggle, categories, search) | `design/screens/home-list.png` | `src/screens/HomeScreen.tsx`, CategoryTabs, VenueList | Done — location + pin + search, categories + List\|Map, “Nearby {Category}”, bottom nav (Home, Search, Map, Profile) |
| 4 | Venue list card | (in home-list) | `src/components/VenueCard.tsx` | Done — light card, name + wait badge (No Wait, ~5 min, ~20 min, 35+ min), distance + “Updated Xm ago” |
| 5 | Venue detail | — | `src/screens/VenueDetailScreen.tsx` | Pending design |
| 6 | Search modal | — | `src/components/SearchModal.tsx` | Pending design |
| 7 | Login / Signup modal | — | `src/screens/LoginSignupModal.tsx` | Pending design |
| 8 | Map view | — | Map placeholder → real map component | Pending design |
| 9 | Update wait time (bottom sheet) | — | To be added (Phase 3) | Pending design |
| 10 | Claim venue modal | — | To be added (Phase 4) | Pending design |

---

## Where to put each design

- **Single screen (e.g. “Home”)**  
  - Preferred: add to `design/screens/` with a clear name, e.g. `design/screens/home.png` or `design/screens/home.fig`.  
  - Or paste/link in chat and say “this is the Home screen”.

- **Full flow (e.g. onboarding 1–3)**  
  - One file per step or one file with all steps, e.g. `design/screens/onboarding-1.png`, `onboarding-2.png`, `onboarding-3.png`, or `onboarding.pdf`.

- **Format**  
  - Any of: **PNG**, **PDF**, **Figma/Pencil link**, or **.pen / .fig** in `design/` or project root.

---

## After you share a design

1. You: share the design (file path, link, or paste) and say which screen/flow it is.
2. We: add the path/link to the table above and update the matching screen/component to match the design (layout, colors, typography, components).
3. Repeat for the next screen.

---

## Theme and design system

- Current theme lives in `wait-app/src/theme.ts` (Lunaris-inspired).
- When you share a design, we can adjust the theme (colors, radii, font sizes) to match and then apply it across the app.

Ready for your first design — share it and say which screen or flow it is.
