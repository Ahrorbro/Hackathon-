# Wait App — API & keys we need from you

Use this when you share Supabase keys and Mapbox. **Map = free Mapbox** (not Google Maps). Supabase = auth + database.

---

## 1. Supabase (you will share keys)

We need these from your Supabase project (Dashboard → Project Settings → API):

| What | Env variable | Where to get it |
|------|----------------|------------------|
| **Project URL** | `EXPO_PUBLIC_SUPABASE_URL` | Project Settings → API → Project URL |
| **Anon public key** | `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → Project API keys → `anon` `public` |

**Optional (only if we add server/Edge Functions later):**
- **Service role key** — never in the app; only for backend. We’ll ask if we need it.

**What we’ll use Supabase for:**
- Auth (email/password, optionally magic link)
- Database: users, venues, wait_reports, venue_claims (tables we’ll add when building)

---

## 2. Mapbox (free — for map)

We use **Mapbox** for the map (list/map view, markers). You need a free Mapbox account and one token.

| What | Env variable | Where to get it |
|------|----------------|------------------|
| **Public access token** | `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` | [Mapbox Account](https://account.mapbox.com/) → Access tokens → default public token or create one (e.g. with `styles:tiles` scope for map) |

**Notes:**
- Free tier is enough for development and moderate usage.
- Use the **public** token in the app (it will be in client code). Restrict URL/scope in Mapbox if you want.

---

## 3. Optional later (SoW mentions)

- **Google Places API** — if we want Google for venue search/details/photos instead of or in addition to our own data. Not required to start; we can use Supabase + manual/imported venues first.
- **AdMob** — SoW says Lester finalizes; we add when you have it.
- **Email (claim verification)** — can be Supabase Auth (magic link) or a provider like Resend; we’ll set when we build Venue Management.

---

## What to send

When ready, share:

1. **Supabase** — done (URL + anon key in `.env`).
2. **Map token** — you'll share; we add to `.env` as `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN`.
3. **Google Auth** — Client ID + Client Secret from Google Console (see `docs/Wait-App-Google-Console-Auth.md`). We add in Supabase Auth → Google only.

You can paste them here (I’ll put them only in `wait-app/.env` and never commit), or add them locally to `wait-app/.env` yourself and tell me “keys are in .env”.

After that we’ll wire the app (Supabase client, map with Mapbox) and proceed with building.
