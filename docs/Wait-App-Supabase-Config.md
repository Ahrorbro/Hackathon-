# Wait App — Supabase configuration

**Status:** Configured — URL + anon key are in `wait-app/.env`. Map = **Mapbox** (free); add `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` when ready. **Important:** You shared DB password and service_role in chat; see `docs/SECURITY-NOTICE-Supabase-Keys.md` and rotate them.

---

## What we need from you (Supabase)

| Variable | Where to get it |
|----------|------------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon `public` key |

Optional later: service role key (server-only, never in client).

---

## App usage (after config)

- **Auth** — Supabase Auth (email/password, magic link).
- **Database** — venues, wait_reports, venue_claims (tables we’ll add when building).
- Env vars go in `wait-app/.env` (see `wait-app/.env.example`). Do not commit `.env`.

---

## Map

- **Map** = **Mapbox** (free). We need `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` from [Mapbox Account](https://account.mapbox.com/). Same doc: `docs/Wait-App-API-And-Keys-Needed.md`.
