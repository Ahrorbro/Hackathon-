# Wait App — MVP

**Mobile app for iOS and Android** (Expo / React Native). Real-time venue wait times per SoW in `../docs/Wait-App-SoW.md`. UI is updated from designs you share one by one — see `../docs/Design-Intake-One-by-One.md`.

## Run on device / simulator

```bash
cd wait-app
npm start
# Then:
#   i — iOS Simulator
#   a — Android emulator
#   Or scan QR code with Expo Go on a physical device
```

## Test via ngrok (share with others / external devices)

**Option A — Expo tunnel (simplest for Expo Go on device)**  
Expo runs ngrok for you and sets bundle/asset URLs correctly (no port in the URL):

```bash
cd wait-app
npm run start:tunnel
```

Use the printed URL or QR code in Expo Go. No separate ngrok step.

**Option B — Manual ngrok with proxy (fixes manifest URLs)**  
Expo puts `:8081` in the manifest, but ngrok uses port 443, so the app can’t load. Run the proxy so the manifest is rewritten and bundle/asset URLs work:

1. **Terminal 1** — Start Expo (leave running):

   ```bash
   cd wait-app && npm start
   ```

2. **Terminal 2** — Start the proxy (rewrites manifest to drop `:8081`):

   ```bash
   cd wait-app && npm run proxy
   ```

3. **Terminal 3** — Start ngrok to the proxy port:

   ```bash
   cd wait-app && npm run tunnel
   ```

   Open the `https://….ngrok-free.app` URL in a browser or Expo Go. The proxy listens on 8080; ngrok forwards to it; the proxy forwards to Expo on 8081 and fixes the manifest.

## Build for production (iOS / Android)

```bash
# Install EAS CLI once: npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## Current state

- **Mobile:** Configured for **Android and iOS** (portrait, dark theme, location permissions).
- **Screens:** Splash → Onboarding → Home (list + categories + search + map toggle) → Venue detail; Login/Signup modal, Search modal.
- **Design:** Share designs one by one; we map each to a screen and update the UI. See `../docs/Design-Intake-One-by-One.md`.

## Structure

- `App.tsx` — SafeAreaProvider, Splash delay, stack (Onboarding → Home → VenueDetail)
- `src/theme.ts` — Theme tokens (aligned with design system)
- `src/screens/` — SplashScreen, OnboardingScreen, HomeScreen, VenueDetailScreen, LoginSignupModal
- `src/components/` — CategoryTabs, VenueCard, VenueList, SearchModal
