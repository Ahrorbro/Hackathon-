# SCOPE OF WORK

## Wait App — 4-Week MVP Sprint

**Client:** Lester Kelley  
**Date:** February 2025  
**Version:** 4.0 - Final  

**Prepared by:** Bolder Apps

---

## Problem Statement

Consumers frequently waste significant time traveling to venues only to encounter unexpected long wait times. There is no centralized platform that provides real-time wait time information across diverse venue types. This results in frustration, wasted time, and missed opportunities for both consumers and businesses.

## Solution Statement

Wait App is a mobile application that enables users to view and contribute real-time wait time information for venues in their area. The MVP will leverage crowdsourced user updates combined with venue self-reporting and Google Places data as fallback to provide actionable wait time estimates.

## Application Type

- Cross-platform mobile application (iOS and Android)
- 4-week vibe-coded MVP build
- Designed for iteration and scaling

## Commercialization Model

- Free to browse, account required to submit wait times
- Ad-supported via Google AdMob

## User Types

| User Type | Description |
|-----------|-------------|
| **Consumer** | End users who browse venues, view wait times, and submit wait time updates. Account required for submissions. |
| **Venue Owner** | Business representatives who claim their venue via email verification and can update wait times. |

### One app, two roles

**Consumer and Venue Owner use the same mobile app (one panel).** There is no separate “venue app” or “venue panel.” The difference is role and permissions:

- **Consumer:** Uses the app to browse and submit wait times (rate limited, must be within 500 m).
- **Venue Owner:** Same app, same screens. When they open a venue they have claimed and that has been approved, they see a **“Your Venue”** badge and can update wait times without rate limiting; their submissions are labeled **“Venue Reported.”**

**After a venue claim is approved:** The SoW does not define a separate post-approval “venue dashboard” or redirect. The intended behavior is: the venue owner continues using the same app. The next time they open the app and navigate to that venue’s detail page, they see the **Verified** badge and **“Your Venue”** and can use **Update Wait Time** with owner privileges. Optionally, an approval email can include a deep link that opens the app to that venue’s detail page (same panel as consumers use).

---

## Core Features

The MVP is organized into four functional modules designed to deliver the core value proposition within the 4-week sprint.

### Module Summary

| Module | Description |
|--------|-------------|
| **Foundation** | User authentication, location services, and shared UI components. |
| **Venue Discovery** | Browse and search venues with list view, map view, and category filtering. |
| **Wait Time** | Wait time display, user submissions with location validation, and Google fallback. |
| **Venue Management** | Venue claiming via email verification and self-reporting. |

---

## Foundation Module

Core infrastructure, authentication, and location services.

### User Authentication

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Allow users to browse venues freely. Require login only when submitting wait times. **User Flow:** 1) User opens app, sees splash screen (2 sec) 2) User sees onboarding slides (2-3 screens) 3) User proceeds to Home - no login required to browse 4) When user taps 'Update Wait Time', prompt login 5) User signs up with email/password or social login (Google/Apple) 6) After login, submission continues. **Edge Cases:** Invalid email: Show error message; Email exists: Prompt to login; Network error: Show retry option. |
| **UX/UI** | **Screens:** Splash, Onboarding, Home, Login/Signup modal. **Components:** App logo, Onboarding carousel, Email and password inputs, Social login buttons (Google, Apple), Primary CTA button. **States:** Loading, error, success. |
| **Development** | Email/password authentication; Google Sign-In and Apple Sign-In OAuth; Session token management; Guest mode as default state. |
| **QA** | Verify browsing works without login; Verify login prompt on submission attempt; Verify account creation works; Verify social login works. |

### Location Services

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Enable venue discovery based on user location. **User Flow:** 1) App requests location permission 2) If granted: Use GPS location 3) If denied: Prompt manual entry (city/ZIP) 4) User can change location from header. **Edge Cases:** Permission denied: Fallback to manual entry; GPS unavailable: Show manual entry option. |
| **UX/UI** | **Screens:** Permission prompt, manual entry. **Components:** System permission dialog, Location search field, Location indicator in header. |
| **Development** | iOS CoreLocation / Android FusedLocation; Geocoding for manual entry; Location caching. |
| **QA** | Verify permission handling; Verify manual entry works; Verify location displays in header. |

### Acceptance Criteria — Foundation Module

| ID | Criterion |
|----|-----------|
| AUTH-01 | User can browse venues without logging in |
| AUTH-02 | Login prompt appears when attempting to submit |
| AUTH-03 | User can create account with email/password |
| AUTH-04 | Social login (Google/Apple) works |
| LOC-01 | Location permission request works |
| LOC-02 | Manual location entry works when permission denied |

---

## Venue Discovery Module

Browse, search, and discover venues with list and map views.

### Venue Listing

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Allow users to discover venues by category and proximity. **User Flow:** 1) User lands on Home screen 2) Default category: Restaurants 3) Category tabs: Restaurants, Coffee Shops, Bars, Gyms, Salons, Other 4) Tap category to filter 5) Venues sorted by distance 6) Each card shows: name, distance, wait status 7) Tap search icon for search modal 8) Tap venue to open detail. **Edge Cases:** No venues in category: Show empty state; No venues in area: Show empty state with option to change location. |
| **UX/UI** | **Screens:** Home, Search modal. **Components:** Location header, Category tabs (6 categories), List/Map toggle, Venue cards with wait status badge, Search icon and modal. **Wait Status Colors:** Green: No wait; Yellow: Short wait; Orange: Moderate wait; Red: Long wait; Gray: No data. |
| **Development** | Google Places API for venue data; Paginated loading (20 per page); 6 category filters; Distance-based sorting; Search with debounce. |
| **QA** | Verify default category is Restaurants; Verify category filtering works; Verify search returns results; Verify empty states display. |

### Map View

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Visual display of venues with color-coded markers. **User Flow:** 1) Tap Map toggle 2) Map centers on user location 3) Markers show venue locations with wait status colors 4) Tap marker to see preview 5) Tap preview to open detail. |
| **UX/UI** | **Screens:** Map view. **Components:** Map canvas, Color-coded markers, Preview card on marker tap, Recenter button. |
| **Development** | Google Maps SDK; Custom colored markers; Marker clustering for dense areas. |
| **QA** | Verify map loads at user location; Verify marker colors match status; Verify preview appears on tap. |

### Venue Detail Page

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Show venue information with prominent wait time display. **Content:** Venue name, category, address; Wait time (prominent display); Source label (User/Venue/Google estimate); Timestamp of last update; Open/Closed status; Phone, website, directions buttons; Google Reviews (2-3 reviews); 'Claim This Venue' CTA (if unclaimed). **User Flow:** 1) Tap venue from list or map 2) View venue details and wait time 3) Tap 'Update Wait Time' to submit (requires login). |
| **UX/UI** | **Screens:** Venue detail. **Components:** Venue info header, Wait time card (large, prominent), Action buttons (Update, Directions, Call, Website), Google Reviews section, Claim CTA. |
| **Development** | Google Places API for details, hours, reviews; Open/Closed status logic; Deep links to Maps, Phone, Browser. |
| **QA** | Verify wait time displays prominently; Verify Open/Closed status; Verify action buttons work; Verify Google Reviews display. |

### Acceptance Criteria — Venue Discovery Module

| ID | Criterion |
|----|-----------|
| DISC-01 | Default category is Restaurants |
| DISC-02 | All 6 category tabs filter correctly |
| DISC-03 | Venues sorted by distance |
| DISC-04 | Search returns relevant results |
| DISC-05 | List/Map toggle works |
| MAP-01 | Map centers on user location |
| MAP-02 | Marker colors match wait status |
| DETAIL-01 | Wait time displays prominently |
| DETAIL-02 | Open/Closed status shows correctly |
| DETAIL-03 | All action buttons work |

---

## Wait Time Module

Core wait time display and user submissions.

### Wait Time Display

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Show wait times with source priority and timestamp. **Data Source Priority:** 1) User reports (most recent) 2) Venue reports (most recent) 3) Google 'popular times' (fallback). **Display:** Wait time value or category; Color indicator; Source label (User reported / Venue reported / Google estimate); Timestamp ('X min ago'). **Categories:** No Wait (0-5 min); Short Wait (5-15 min); Moderate Wait (15-30 min); Long Wait (30+ min). |
| **UX/UI** | **Components:** Wait time badge, Color indicator, Source label, Timestamp. |
| **Development** | Data source priority logic; Google Places 'popular times' fallback; Most recent report wins. |
| **QA** | Verify source priority works; Verify Google fallback displays; Verify timestamp shows correctly. |

### User Submission

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Enable authenticated users to submit wait times with simple location check. **User Flow:** 1) Tap 'Update Wait Time' 2) If not logged in: Show login prompt 3) Location check: Must be within 500m of venue — If too far: Block with message 'Must be at venue' 4) Rate limit: 1 submission per venue per 30 min 5) Show presets: [No Wait] [~5 min] [~15 min] [~30 min] [30+ min] 6) Optional comment (140 chars) 7) Submit. **Edge Cases:** Not logged in: Show login; Too far: Block submission; Rate limited: Show 'Try again in X min'; Network error: Show retry. |
| **UX/UI** | **Screens:** Submission bottom sheet. **Components:** Preset time buttons, Comment input with counter, Submit button. **States:** Default, location blocked, rate limited, submitting, success. |
| **Development** | Authentication check; Simple location validation (500m radius); Server-side rate limiting (30 min); Comment sanitization. |
| **QA** | Verify login required; Verify location check blocks if too far; Verify rate limiting works; Verify submission succeeds. |

### Acceptance Criteria — Wait Time Module

| ID | Criterion |
|----|-----------|
| WAIT-01 | Wait time shows with source label |
| WAIT-02 | Google fallback displays when no user data |
| WAIT-03 | Login required for submissions |
| WAIT-04 | Location check blocks submissions if beyond 500m |
| WAIT-05 | Rate limiting prevents more than 1 per 30 min |
| WAIT-06 | Submission updates venue immediately |

---

## Venue Management Module

Venue claiming and self-reporting.

### Venue Claiming

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Allow venue owners to claim via email verification with manual review. **User Flow:** 1) Tap 'Claim This Venue' on detail page 2) Enter email address 3) Receive verification email 4) Click link to verify 5) Claim enters manual review queue 6) Admin approves/rejects within 48 hours 7) On approval: 'Verified' badge appears. **Notes:** Any email accepted (no domain restriction); Single owner per venue. **Edge Cases:** Already claimed: Show message; Link expired: Allow resend. |
| **UX/UI** | **Screens:** Claim modal, verification pending, approved. **Components:** Email input, Pending message, Verified badge. |
| **Development** | Email verification service; One owner per venue; Manual review queue; 24h token expiration. |
| **QA** | Verify claim flow works; Verify email sends; Verify badge shows after approval. |

### Venue Self-Reporting

| Perspective | Content |
|-------------|---------|
| **Business** | **Purpose:** Allow verified owners to update wait times. **User Flow:** 1) Owner navigates to their venue 2) Sees 'Your Venue' indicator 3) Taps 'Update Wait Time' 4) Same presets as user submission 5) Submission marked as 'Venue Reported'. **Owner Privileges:** No rate limiting; Data takes priority over user submissions. |
| **UX/UI** | **Components:** 'Your Venue' badge, Same submission UI, 'Venue Reported' label. |
| **Development** | Owner role check; No rate limit for owners; Venue data priority flag. |
| **QA** | Verify owner badge shows; Verify no rate limit; Verify 'Venue Reported' label. |

### Acceptance Criteria — Venue Management Module

| ID | Criterion |
|----|-----------|
| VENUE-01 | Claim CTA appears on unclaimed venues |
| VENUE-02 | Email verification works |
| VENUE-03 | Verified badge shows after approval |
| VENUE-04 | Owner can update without rate limit |
| VENUE-05 | Venue-reported label displays correctly |

---

## Technical Specifications

### Integration Requirements

- Google Places API — venue data, photos, reviews, popular times
- Google Maps SDK — map view and markers
- Firebase Authentication — email/password, Google, Apple sign-in
- Google AdMob — ad integration (config finalized by Lester before dev)
- Email service — venue claim verification

### Security Requirements

- HTTPS for all communications
- Secure password hashing
- Session token management
- Rate limiting on submissions
- Location validation (500m radius)
- Input sanitization

---

## Assumptions and Dependencies

### Client Responsibilities

- Set up Apple Developer ($99/year) and Google Play Console ($25) accounts
- Provide/fund API accounts (Google Cloud, Firebase)
- Finalize AdMob configuration before development starts
- Manual review of venue claims within 48 hours
- Provide feedback on deliverables within 2 business days

### Technical Dependencies

- Google Places API availability
- App store approval timelines
- Third-party service uptime

### Additional Deliverable

- Landing page via Webflow template customization

---

## MVP Limitations

The following limitations apply to this 4-week vibe-coded build:

- Design customization limited compared to custom development
- Wait time accuracy depends on user participation
- New venues may have limited data initially
- Google fallback is estimated, not real-time
- Single owner per venue (no team accounts)
- Manual venue claim review (no automated verification)
