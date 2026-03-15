# Wait App — What else we need from Supabase

We already have **URL + anon key** in `wait-app/.env`. That’s enough to build. Below is what’s optional or what we’ll do ourselves.

---

## We already have (no more keys needed)

- **Project URL** — in `.env`
- **Anon key** — in `.env`  
We use these for Auth (sign up / sign in) and for the database from the app. **No other keys are required from you for the app.**

---

## Optional: Auth settings in Dashboard

You only need to change these if you want different behavior:

| Item | Where | What to do |
|------|--------|------------|
| **Email signup** | Authentication → Providers → Email | Usually already on. Turn **Confirm email** on or off (we can do magic link or password-only). |
| **Google sign-in** | Authentication → Providers → Google | If you want “Sign in with Google”: enable, add your Google OAuth client ID/secret in Supabase. We don’t need you to send those to us; we’ll use the same anon key. |
| **Apple sign-in** | Authentication → Providers → Apple | If you want “Sign in with Apple”: enable, add Apple credentials in Supabase. Same as above. |

So: **no extra keys from you.** If you enable Google/Apple, you configure them in the Supabase Dashboard; the app keeps using the same anon key.

---

## What we’ll do when we build (no action from you)

- **Database tables** — We’ll add tables (e.g. `venues`, `wait_reports`, `venue_claims`) via SQL migrations or Supabase client. You don’t need to create them.
- **Row Level Security (RLS)** — We’ll define policies so the anon key only has the access we want.
- **Storage** — If we need image uploads (e.g. venue photos), we’ll create a bucket and policies; no extra key from you.

---

## Later: claim verification email

For “Claim this venue” we’ll send a verification email. Options:

- **Supabase Auth** — e.g. magic link (uses Supabase’s built-in email), or  
- **Your provider** (Resend, SendGrid, etc.) — we’d need an API key or you add it as a secret in an Edge Function.

We’ll set this when we build Venue Management. You don’t need to send anything now.

---

## Summary

| From you | Needed? |
|----------|---------|
| More Supabase keys | **No** — URL + anon key are enough. |
| Enable Email auth | Only if you want to change defaults (e.g. confirm email). |
| Enable Google/Apple | Only if you want social login; configure in Dashboard, no need to send us keys. |
| Mapbox token | **Yes** — add `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` to `wait-app/.env` when you have it. |

So for Supabase: **we have what we need.** Next step is adding Mapbox (when you have a token) and then we proceed with building.
