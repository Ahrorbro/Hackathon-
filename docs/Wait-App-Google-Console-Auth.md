# Wait App — Google Sign-In (Google Console)

We’ll use **Google Sign-In** with Supabase Auth. You’ll create OAuth credentials in Google Cloud Console and share them so we can add them to Supabase (or you add them in the Dashboard).

---

## What we need from Google Console

1. **Create (or pick) a project**  
   [Google Cloud Console](https://console.cloud.google.com/) → select or create a project.

2. **Enable Google+ / Google Identity**  
   APIs & Services → **Library** → search “Google+ API” or “Google Identity” and enable if needed. (For OAuth consent and sign-in, the “Google Identity Services” / OAuth consent screen is what matters.)

3. **Create OAuth 2.0 credentials**  
   APIs & Services → **Credentials** → **Create credentials** → **OAuth client ID**.

   - **Application type:** **Web application** (this is what Supabase uses for “Sign in with Google”).
   - **Name:** e.g. `Wait App Supabase`.
   - **Authorized redirect URIs:** add Supabase’s callback URL:
     - `https://wtnnrgsljvwaocphiffy.supabase.co/auth/v1/callback`  
     (Use your project ref if different: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`.)

4. **Share these two values** (you’ll get them after creating the client):
   - **Client ID** — looks like `xxxxx.apps.googleusercontent.com`
   - **Client Secret**

We’ll add them in **Supabase Dashboard → Authentication → Providers → Google** (Client ID + Client Secret). The app will keep using the same Supabase URL and anon key; no extra env vars in the app for Google.

---

## After you share

- We’ll paste **Client ID** and **Client Secret** into Supabase (Auth → Providers → Google) and enable the provider.
- You can also add them yourself in the Dashboard; then just tell us “Google provider is enabled.”
- We’ll wire the app to use Supabase’s `signInWithOAuth({ provider: 'google' })` (or equivalent) when we implement auth.

---

## Summary

| You do | We do |
|--------|--------|
| Create OAuth 2.0 Web client in Google Console; add redirect URI `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback` | Add Client ID + Secret in Supabase → Auth → Google |
| Share Client ID + Client Secret (here or in a secure way) | Enable Google provider and implement “Sign in with Google” in the app |

When you share the Client ID and Client Secret, we’ll configure Supabase and proceed with auth.
