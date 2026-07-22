# Student Meet — Project Execution Plan

## Vision
A free, ad-supported (future) social platform helping students stay academically motivated through two pillars: **verified offline study meetups** near them, and **video-only live study rooms** organized by subject and academic level.

---

## Phase 0: Foundation & Planning (Weeks 1-3)

- [ ] Finalize information architecture (sitemap for web + mobile screen flows)
- [ ] Define database schema (users, institutions, meetups, rooms, tasks, verification records)
- [ ] Set up monorepo structure (Next.js web + Expo mobile + shared packages)
- [ ] Configure Bun workspaces for shared types/utils/validation schemas
- [ ] Set up PostgreSQL with PostGIS, configure Drizzle ORM
- [ ] Set up CI/CD pipeline (GitHub Actions), staging environment on Vercel
- [ ] Set up error tracking (Sentry) and analytics (PostHog) from day one

**Deliverable:** Working dev environment, schema migrations, deployed "hello world" on web + mobile.

---

## Phase 1: Authentication & Verification System (Weeks 4-7)

- [ ] Implement email/password + OTP signup flow
- [ ] Implement social login (Google, Apple)
- [ ] Build college/institution email domain verification (maintain whitelist DB table)
- [ ] Build student ID upload flow (mobile camera + web file upload)
- [ ] Integrate OCR pre-check (extract name, DOB, institution from ID)
- [ ] Build admin review dashboard for manual ID verification queue
- [ ] Implement verification status gating (unverified users can browse rooms but not create/join offline meetups)
- [ ] Profile setup: academic niche(s), education level, location, bio, avatar

**Deliverable:** Users can sign up, verify via multiple methods, and reach "verified" status gating offline features.

---

## Phase 2: Live Study Rooms — Core MVP (Weeks 8-13)

- [ ] Integrate LiveKit (start with LiveKit Cloud)
- [ ] Build room directory: subject-based rooms (Science, Mathematics, History, etc.) + level filters (school/college/competitive exam)
- [ ] Implement room join flow with video-only — enforce audio track publishing disabled server-side
- [ ] Build video grid UI (web + mobile) — "study together" aesthetic, minimal distractions
- [ ] Implement shared goals/tasks panel:
  - [ ] Users can post personal study goals visible to room
  - [ ] Checkbox/progress tracking per user, visible to all
  - [ ] Real-time sync via WebSocket
- [ ] Room capacity limits and auto-scaling logic
- [ ] Idle/away detection (camera off + inactivity → soft prompt)

**Deliverable:** Functional live study rooms — join by subject/level, video-only, shared task board, on web and mobile.

---

## Phase 3: Study-Out Meetups (Weeks 14-19)

- [ ] Build meetup creation flow (subject/niche, date/time, description, location)
- [ ] GPS-based discovery: "meetups near me" with radius filter
- [ ] Manual override: city/area search and selection
- [ ] Integrate Places API for nearby library/study spot suggestions
- [ ] Meetup detail page: attendee list, join/leave, chat thread for coordination
- [ ] Verified-only gating: only verified students can create/join meetups
- [ ] Notifications: meetup invites, reminders, attendee updates
- [ ] Reporting/blocking system for safety

**Deliverable:** Verified students can create, discover, and join location-based study meetups on web and mobile.

---

## Phase 4: Mobile Parity & Polish (Weeks 20-24)

- [ ] Full feature parity check: rooms, meetups, verification on React Native
- [ ] Push notifications setup (Expo + FCM/APNs)
- [ ] Offline-friendly states, loading skeletons, error boundaries
- [ ] Accessibility audit (contrast, screen reader labels, focus states)
- [ ] Performance audit (video room load times, app bundle size)
- [ ] Cross-device testing (iOS, Android, major browsers)

**Deliverable:** Stable, polished apps on web, iOS, and Android with full feature parity.

---

## Phase 5: Beta Launch (Weeks 25-28)

- [ ] Closed beta with select colleges/student communities
- [ ] Feedback collection (in-app surveys, PostHog funnels)
- [ ] Bug triage and fixes based on real usage
- [ ] Load testing on LiveKit rooms (concurrent room stress test)
- [ ] Refine onboarding based on drop-off analytics

**Deliverable:** Beta feedback incorporated, platform stable under real user load.

---

## Phase 6: Public Launch & Monetization Prep (Weeks 29-32)

- [ ] Public launch (web + app store releases)
- [ ] Marketing site / landing page SEO optimization
- [ ] Prepare ad infrastructure (AdSense for web, AdMob for mobile) — integrate but keep dormant initially
- [ ] Set up community guidelines, moderation tooling, report review workflow
- [ ] Plan Phase 2 features backlog: study streaks, leaderboards, friend system, premium room themes

**Deliverable:** Public launch across platforms, ad infrastructure ready to activate, roadmap for next iteration defined.

---

## Team & Resourcing Recommendations

| Role | Responsibility |
|---|---|
| 1-2 Full-stack Devs (Next.js/Bun) | Web app, API routes, backend logic |
| 1 Mobile Dev (React Native/Expo) | Mobile app, native integrations |
| 1 Backend/Infra Dev | LiveKit, PostgreSQL/PostGIS, DevOps |
| 1 UI/UX Designer | Web + mobile design system, video room UX |
| 1 QA/Verification Ops | Manual ID review, moderation, testing |

---

## Risk Areas to Monitor

- **Verification bottleneck**: Manual ID review can become a scaling issue — plan automation improvements early.
- **Video infra cost**: Monitor LiveKit Cloud usage costs; plan self-hosting migration trigger point.
- **Safety**: Offline meetups carry real-world risk — verification + reporting must be robust before public launch.
- **Engagement**: Shared goals/tasks feature is core to retention — test thoroughly with beta users.
