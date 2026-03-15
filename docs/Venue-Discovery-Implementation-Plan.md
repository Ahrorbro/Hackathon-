# Implementation Plan: Venue Discovery Module (Wait App)

## Overview

Add the Venue Discovery module to the Wait App: 6 category tabs (default Restaurants), list + map toggle, venue cards with distance and wait-status badge, debounced search modal, Mapbox map with color-coded markers and tap preview, and Venue Detail screen with wait time, actions, and Claim CTA. Venue data from Supabase; map from Mapbox.

## Requirements (from SoW)

- **Listing:** Default category Restaurants; 6 categories (Restaurants, Coffee Shops, Bars, Gyms, Salons, Other); venues sorted by distance; list/map toggle; venue cards (name, distance, wait status badge).
- **Search:** Search modal with debounce; relevant results.
- **Map:** Centers on user location; color-coded markers by wait status; tap marker → preview; tap preview → detail.
- **Venue Detail:** Name, address, wait time (prominent), source label, timestamp; Open/Closed; actions (Update, Directions, Call, Website); Claim CTA.
- **AC:** DISC-01 (default Restaurants), DISC-02 (6 categories filter), DISC-03 (distance sort), DISC-04 (search), DISC-05 (list/map toggle), MAP-01 (map centers on user), MAP-02 (marker colors), DETAIL-01 (wait time prominent), DETAIL-02 (open/closed), DETAIL-03 (action buttons).

---

## 1. Ordered Task List

| # | Task | AC / Notes |
|---|------|------------|
| 1 | Add Supabase `venues` and `wait_reports` tables + TypeScript types | Data model below |
| 2 | Add `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` to `.env.example` and document in README | Mapbox token |
| 3 | Add category constants and shared types (`VenueCategory`, `WaitStatus`, etc.) under `src/types/` | DISC-01, DISC-02 |
| 4 | Create `useVenues` hook: fetch venues by category + user coords, sort by distance, optional search query | DISC-03, DISC-04 |
| 5 | Add CategoryTabs component; integrate into Home (default category Restaurants) | DISC-01, DISC-02 |
| 6 | Add List/Map view state and toggle UI on Home (keep existing header + “Update Wait Time” CTA) | DISC-05 |
| 7 | Build VenueCard component (name, distance, wait status badge); use theme colors for status | MAP-02 (same colors) |
| 8 | Venue list on Home with mock data first, then wire to `useVenues` (Supabase) | DISC-03 |
| 9 | Add VenueDetail screen (name, address, wait time, source, timestamp, Open/Closed, action buttons, Claim CTA); add route in App.tsx | DETAIL-01, DETAIL-02, DETAIL-03 |
| 10 | Wire list: tap VenueCard → navigate to VenueDetail with `venueId` | Navigation |
| 11 | Install Mapbox SDK; add MapView component (center on user location, read token from env) | MAP-01 |
| 12 | Add color-coded markers from venues; tap marker → show preview card; tap preview → navigate to VenueDetail | MAP-02 |
| 13 | Add Search modal: input with debounce, filter venues by name (client or server); show results, tap → detail | DISC-04 |
| 14 | Empty states: no venues in category / no results; optional “change location” hint | SoW edge cases |
| 15 | (Optional) Recenter button on map | UX |

---

## 2. Data Model (Supabase)

Minimal schema for MVP. Run as migration(s) in your Supabase project.

### `venues`

| Column | Type | Notes |
|--------|------|--------|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `name` | `text` | NOT NULL |
| `category` | `text` | NOT NULL; one of: `restaurants`, `coffee_shops`, `bars`, `gyms`, `salons`, `other` |
| `address` | `text` | |
| `lat` | `double precision` | NOT NULL |
| `lng` | `double precision` | NOT NULL |
| `phone` | `text` | nullable |
| `website` | `text` | nullable |
| `latest_wait_category` | `text` | nullable; `no_wait` \| `short` \| `moderate` \| `long` |
| `latest_wait_source` | `text` | nullable; `user` \| `venue` \| `google` |
| `latest_wait_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | default `now()` |
| `updated_at` | `timestamptz` | default `now()` |

Indexes: `(category)`, `(lat, lng)` or PostGIS for “nearby” queries if you use it later.

### `wait_reports`

| Column | Type | Notes |
|--------|------|--------|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `venue_id` | `uuid` | FK → venues, NOT NULL |
| `reported_by_user_id` | `uuid` | nullable (venue/google reports) |
| `wait_category` | `text` | NOT NULL; same enum as above |
| `source` | `text` | NOT NULL; `user` \| `venue` \| `google` |
| `created_at` | `timestamptz` | default `now()` |

Index: `(venue_id, created_at DESC)` for “latest per venue”. When Wait Time module is implemented, on insert (and optionally update) of `wait_reports`, update `venues.latest_wait_*` (trigger or app logic).

RLS: allow public read on `venues` and `wait_reports` for listing/detail; restrict writes per SoW.

---

## 3. File / Component List

All under `wait-app/src/` unless noted.

| Path | Purpose |
|------|--------|
| `types/venues.ts` | `Venue`, `VenueCategory`, `WaitStatus`, `WaitSource`; category list; status → color mapping |
| `hooks/useVenues.ts` | Fetch venues by category + center (lat/lng), optional search; return sorted by distance |
| `components/CategoryTabs.tsx` | Horizontal scrollable tabs; selected category; onSelect |
| `components/VenueCard.tsx` | Name, distance, wait status badge (theme colors) |
| `components/VenueList.tsx` | FlatList of VenueCard; onVenuePress |
| `components/MapView.tsx` | Mapbox map; center on coords; markers; preview on tap; onVenueSelect |
| `components/SearchModal.tsx` | Text input (debounced), result list, onSelect, onClose |
| `screens/VenueDetailScreen.tsx` | Name, address, wait time (prominent), source, timestamp, open/closed, Directions/Call/Website, Update Wait Time, Claim CTA |
| `screens/HomeScreen.tsx` | Extend: CategoryTabs, List/Map toggle, VenueList or MapView, Search icon → SearchModal, navigate to VenueDetail |
| `App.tsx` | Add `VenueDetail` to stack with `venueId` param |

Optional:

- `lib/supabase-queries.ts` or `api/venues.ts`: Supabase queries for venues (by category, bounds or radius, search).
- `components/WaitStatusBadge.tsx`: Reusable badge used in VenueCard and VenueDetail.

---

## 4. Dependencies

| Package | Purpose |
|---------|--------|
| `@rnmapbox/maps` (or `react-native-mapbox-gl`) | Mapbox map + markers. Prefer the official Expo-compatible option (e.g. `@rnmapbox/maps` with Expo config plugin if needed). |
| (none else) | Supabase and Expo Location already in use. |

- Add `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` to `.env` (and `.env.example`); do not commit the real token.

---

## 5. Testing Strategy

- **Unit:** Category constants and “distance sort” logic; debounce util; wait status → color.
- **Integration:** `useVenues` with mock Supabase (or local Supabase): category filter, distance order, search.
- **E2E:** Home → category change → list shows; toggle to map → markers; tap venue → VenueDetail; search modal → type → select → detail. (DISC-01–05, MAP-01/02, DETAIL-01–03.)

---

## 6. Success Criteria

- [ ] DISC-01: Default category is Restaurants  
- [ ] DISC-02: All 6 category tabs filter correctly  
- [ ] DISC-03: Venues sorted by distance  
- [ ] DISC-04: Search returns relevant results  
- [ ] DISC-05: List/Map toggle works  
- [ ] MAP-01: Map centers on user location  
- [ ] MAP-02: Marker colors match wait status  
- [ ] DETAIL-01: Wait time displays prominently on detail  
- [ ] DETAIL-02: Open/Closed status shows correctly  
- [ ] DETAIL-03: All action buttons work  

---

## 7. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Mapbox SDK + Expo compatibility | Use supported Mapbox React Native package and Expo config plugin; fallback: hide map or use static map until resolved. |
| No venues in DB | Seed script or mock data for dev; empty states in UI. |
| Open/Closed depends on hours | MVP: optional `opening_hours` on venue or “Open”/“Closed” placeholder; DETAIL-02 can be “shown” with stub logic. |

This plan is structured so a developer can execute the numbered tasks in order and tick off acceptance criteria as they go.
