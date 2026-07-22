# Student Meet — System Requirements

## 1. Functional Requirements

### 1.1 User Management
- FR-1.1.1: Users can sign up via email/password + OTP, or social login (Google/Apple)
- FR-1.1.2: Users can verify identity via college email domain matching
- FR-1.1.3: Users can upload a student ID for verification (OCR pre-check + manual review)
- FR-1.1.4: Verification status (`unverified`, `pending`, `verified`, `rejected`) gates feature access
- FR-1.1.5: Users set up a profile: name, academic niche(s), education level, city/location, bio, avatar
- FR-1.1.6: Users can edit profile and re-submit verification if rejected

### 1.2 Live Study Rooms
- FR-1.2.1: Rooms are organized by subject (Science, Mathematics, History, etc.) and education level
- FR-1.2.2: Any user (verified or not) can join a live study room
- FR-1.2.3: Audio is disabled by default and cannot be enabled — no audio publishing capability exists in rooms
- FR-1.2.4: Video can be toggled on/off by the user
- FR-1.2.5: Users can post personal study goals/tasks visible to all room participants
- FR-1.2.6: Task completion status updates in real-time for all participants
- FR-1.2.7: Rooms have a maximum capacity; users see a "room full" state and can join alternate rooms
- FR-1.2.8: Users can leave a room at any time

### 1.3 Study-Out Meetups
- FR-1.3.1: Only verified users can create or join offline study meetups
- FR-1.3.2: Meetup creation includes: subject/niche, date/time, location (map pin), description, max attendees
- FR-1.3.3: Users discover meetups via GPS-based "near me" search with adjustable radius
- FR-1.3.4: Users can manually search/select a city or area to find meetups
- FR-1.3.5: System suggests nearby libraries/study spots when creating a meetup
- FR-1.3.6: Users can view attendee lists and join/leave meetups
- FR-1.3.7: Users can report or block other users involved in meetups

### 1.4 Notifications
- FR-1.4.1: Users receive push/email notifications for meetup invites, reminders, and status changes
- FR-1.4.2: Users receive in-app notifications for room activity relevant to them (e.g., goal reminders)

### 1.5 Moderation & Safety
- FR-1.5.1: Admins have a dashboard to review pending ID verifications
- FR-1.5.2: Admins can suspend/ban users who violate community guidelines
- FR-1.5.3: Users can report inappropriate behavior in rooms or meetups

---

## 2. Non-Functional Requirements

### 2.1 Performance
- NFR-2.1.1: Web pages should achieve First Contentful Paint under 2 seconds on average connections
- NFR-2.1.2: Live study room join time (camera + connection) should be under 5 seconds
- NFR-2.1.3: System should support at least 50 concurrent participants per room without degradation
- NFR-2.1.4: API response times under 300ms for 95th percentile of requests (excluding video/media)

### 2.2 Scalability
- NFR-2.2.1: Architecture must support horizontal scaling of API layer (stateless Next.js routes on Bun)
- NFR-2.2.2: Video infrastructure (LiveKit) must support scaling from MVP (LiveKit Cloud) to self-hosted SFU clusters
- NFR-2.2.3: Database must support geospatial queries efficiently at scale (PostGIS indexing)

### 2.3 Security & Privacy
- NFR-2.3.1: Student ID images must be stored encrypted at rest (S3/R2 with server-side encryption)
- NFR-2.3.2: Access to verification documents restricted to authorized admin roles only
- NFR-2.3.3: All API endpoints require authentication except public room discovery listings
- NFR-2.3.4: Audio publishing must be disabled at the infrastructure level (not just UI) to prevent bypass
- NFR-2.3.5: Location data shared only with explicit user consent and used only for matching purposes
- NFR-2.3.6: Compliance with data protection regulations (GDPR/applicable regional laws) for student data

### 2.4 Availability & Reliability
- NFR-2.4.1: Target uptime of 99.5% for core services (auth, rooms, meetups)
- NFR-2.4.2: Graceful degradation if video service is unavailable — show informative state, not app crash
- NFR-2.4.3: Automated backups of PostgreSQL database (daily, retained 30 days)

### 2.5 Usability & Accessibility
- NFR-2.5.1: UI must meet WCAG 2.1 AA standards for contrast and keyboard navigation
- NFR-2.5.2: Mobile and web apps must maintain feature parity for core flows
- NFR-2.5.3: Onboarding flow should be completable in under 5 minutes for verified status pending

### 2.6 Maintainability
- NFR-2.6.1: Shared validation schemas (Zod) used across frontend and backend to avoid duplication
- NFR-2.6.2: Codebase organized as monorepo with clear separation: web, mobile, shared packages
- NFR-2.6.3: All new features require automated test coverage (unit + integration) before merge

---

## 3. System Constraints

- Audio functionality is explicitly out of scope for live study rooms — no future audio toggle planned for this room type
- Free-for-all access model at launch; ad infrastructure built but dormant until Phase 6
- Student ID verification involves a manual review step, introducing a human-dependent latency in the verification pipeline
- React Native (Expo) chosen for mobile — any native module requirements must be Expo-compatible or require custom dev client

---

## 4. Data Requirements (Core Entities)

| Entity | Key Fields |
|---|---|
| User | id, email, name, auth_provider, verification_status, education_level, academic_niches[], city, location (lat/lng), avatar_url |
| VerificationRecord | id, user_id, id_document_url, ocr_extracted_data, review_status, reviewed_by, reviewed_at |
| Room | id, subject, education_level, capacity, current_participants, livekit_room_name |
| RoomTask | id, room_id, user_id, description, completed, created_at |
| Meetup | id, creator_id, subject_niche, location (lat/lng), venue_suggestion, datetime, max_attendees, description |
| MeetupAttendee | id, meetup_id, user_id, status (invited/joined/declined) |
| Report | id, reporter_id, reported_user_id, context (room/meetup), reason, status |

---

## 5. Integration Requirements

- LiveKit Cloud API/SDK for video rooms
- Google/Apple OAuth for social login
- OCR service (AWS Textract / Google Vision) for ID pre-check
- Maps/Places API (Google Maps or Mapbox) for location and venue suggestions
- Email provider (Resend) for OTP and transactional emails
- Push notification services (FCM for Android, APNs via Expo for iOS)
- Future: Google AdSense (web) and AdMob (mobile) for ad-based monetization
