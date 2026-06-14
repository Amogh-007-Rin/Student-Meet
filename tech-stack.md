# Student Meet — Tech Stack

## Overview
Student Meet is a cross-platform (web + mobile) social study platform with two core experiences:
1. **Study-Out Meetups** — location-based, ID-verified offline study group plans.
2. **Live Study Rooms** — subject/level-based virtual rooms with video-only presence (no audio), shared goals/tasks, free for all users.

---

## 1. Frontend (Web)

| Component | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)** | SSR/SSG for landing pages, SEO for discovery pages, API routes for backend logic |
| Runtime | **Bun** | Faster install/build/test cycles, native TS support |
| Styling | **Tailwind CSS** | Rapid UI development, consistent design tokens |
| State Management | **Zustand / TanStack Query** | Zustand for UI state, TanStack Query for server state & caching |
| Forms & Validation | **React Hook Form + Zod** | Shared validation schemas with backend |
| Maps & Location | **Mapbox GL JS** or **Google Maps JS SDK** | For GPS-based meetup discovery |
| Video Rooms | **LiveKit React SDK** | Video-only rendering, mute audio by default |
| Real-time Updates | **WebSockets (via LiveKit + Pusher/Ably for app events)** | Room presence, task updates, notifications |

---

## 2. Frontend (Mobile)

| Component | Choice | Notes |
|---|---|---|
| Framework | **React Native (Expo)** | Shared business logic/components with web where possible |
| Navigation | **React Navigation** | Standard mobile nav patterns |
| Video Rooms | **LiveKit React Native SDK** | Same backend rooms, native video rendering |
| Location | **Expo Location** | GPS-based meetup matching |
| Push Notifications | **Expo Notifications + FCM/APNs** | Meetup invites, room reminders |
| Camera/Document Upload | **Expo Image Picker + Camera** | Student ID upload for verification |

---

## 3. Backend

| Component | Choice | Notes |
|---|---|---|
| Framework | **Next.js API Routes / Route Handlers** | Unified codebase with frontend, deployed together |
| Runtime | **Bun** | Used for API routes, background jobs, scripts |
| Database | **PostgreSQL** | Relational data: users, rooms, meetups, tasks, verification records |
| ORM | **Drizzle ORM** | Type-safe, lightweight, Bun-friendly; alternative: Prisma |
| Caching / Sessions | **Redis (Upstash)** | Session storage, rate limiting, room presence cache |
| File Storage | **AWS S3 / Cloudflare R2** | Student ID images, profile photos |
| Background Jobs | **Bun cron / Inngest / Trigger.dev** | Sending reminders, cleanup of expired meetups, ID re-verification |

---

## 4. Authentication & Verification

| Layer | Choice | Notes |
|---|---|---|
| Auth Provider | **Auth.js (NextAuth) / Clerk** | Email+OTP and Social login (Google/Apple) |
| Email OTP | **Resend / SendGrid + custom OTP flow** | For email/password signup path |
| College Email Verification | **Custom domain-matching service** | Validates `.edu`/institution domains against a maintained whitelist |
| Student ID Verification | **Manual review queue + OCR pre-check (AWS Textract / Google Vision)** | OCR extracts name/DOB/institution for auto pre-fill; human review for final approval |
| Verification Status | **Stored in `users` table** (`unverified`, `pending`, `verified`, `rejected`) | Gates access to offline meetup creation/joining |

---

## 5. Video Infrastructure — Live Study Rooms

**Recommended: LiveKit (self-hostable, open-source)**

| Aspect | Detail |
|---|---|
| Why LiveKit | Open-source SFU, self-hostable (cost control at scale), official React & React Native SDKs, supports per-track mute enforcement (good for audio-disabled-by-default), scalable to many concurrent small rooms |
| Hosting | LiveKit Cloud for MVP → migrate to self-hosted on AWS/Hetzner as usage grows |
| Audio Policy | Audio tracks **disabled at publish level** — clients cannot publish audio tracks in study rooms (enforced server-side via room config) |
| Video Policy | Video optional/toggleable per user; default ON encouraged |
| Room Types | Persistent topic rooms (Science, Mathematics, History, etc.) with sub-rooms by education level |
| Shared Goals/Tasks | Built separately via WebSocket/Postgres — not part of LiveKit; synced in real-time to all room participants |

---

## 6. Location & Discovery

| Component | Choice | Notes |
|---|---|---|
| Geocoding/Places | **Google Places API / Mapbox** | Library/study spot suggestions near user |
| Matching Logic | **PostGIS extension on PostgreSQL** | Geospatial queries for nearby students/meetups |
| Manual Override | **City/area dropdown + search** | Fallback when GPS unavailable or for planning ahead |

---

## 7. Infrastructure & DevOps

| Component | Choice | Notes |
|---|---|---|
| Hosting (Web) | **Vercel** | Native Next.js support, edge functions |
| Hosting (DB) | **Neon / Supabase Postgres / AWS RDS** | Managed Postgres with PostGIS support |
| Hosting (Video) | **LiveKit Cloud → self-hosted later** | |
| CI/CD | **GitHub Actions** | Automated tests, lint, deploy on merge |
| Monitoring | **Sentry (errors) + PostHog (analytics)** | Error tracking and product analytics |
| Ads (Phase 2) | **Google AdSense / AdMob (mobile)** | Activated post-MVP for monetization |

---

## 8. Notifications & Communication

| Component | Choice | Notes |
|---|---|---|
| Push (Mobile) | **Expo Notifications / FCM** | Meetup invites, room start alerts |
| Email | **Resend** | OTP, verification status, weekly digest |
| In-app Notifications | **Postgres table + WebSocket push** | Real-time alerts within app |

---

## Summary Architecture Diagram (Textual)

```
[React Native App] ---\
                        \
[Next.js Web App] ------> [Next.js API Routes (Bun runtime)] --> [PostgreSQL + PostGIS]
                        /                                    \--> [Redis (Upstash)]
[LiveKit SFU] <---------                                      \--> [S3/R2 Storage]
                                                                \--> [Auth.js/Clerk]
                                                                 \--> [OCR Service]
```
