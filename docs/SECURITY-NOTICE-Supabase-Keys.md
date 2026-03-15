# ⚠️ Security notice — Supabase keys

You shared Supabase credentials in chat. The following are **sensitive** and were exposed:

1. **PostgreSQL connection string** — contains your **database password** (`Ahrorbek_2005`).
2. **Service role key** — full admin access to your Supabase project; must never be in client code or public repos.

## What we did

- **Stored in the app (safe):** Only `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` were added to `wait-app/.env`. The anon key is intended for client-side use. `.env` is gitignored and will not be committed.
- **Not stored anywhere:** The database password and service role key were **not** written to any file. If you need the service role for a backend/Edge Function later, store it only in a secure secret store (e.g. EAS Secrets, CI secrets), never in the repo.

## What you should do now

1. **Rotate your database password**  
   Supabase Dashboard → Project Settings → Database → Reset database password. Use a new strong password and update any place you use the connection string (e.g. local DB tools).

2. **Regenerate the service role key**  
   Supabase Dashboard → Project Settings → API → Project API keys → Regenerate `service_role`. Then the old key you shared will stop working. Use the new key only in a secure server-side environment.

3. **Optional:** Regenerate the anon key if you want to invalidate the one you shared. If you do, update `wait-app/.env` with the new anon key.

4. **Never paste** the database password or service_role key into chat, docs, or code again. For future sharing: only URL + anon key are safe to put in client env; keep service_role and DB password secret.

---

After you rotate the password and regenerate the service_role key, you can delete this file if you want, or keep it as a reminder.
