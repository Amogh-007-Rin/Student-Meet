<div align="center">

# 📚 Student Meet

### *Find your study tribe — online or offline.*

A social platform where students pair up for real-world study sessions and join subject-based, video-only live study rooms to stay focused, motivated, and connected.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)]()
[![Platform](https://img.shields.io/badge/platform-web%20%7C%20iOS%20%7C%20Android-blue)]()
[![License](https://img.shields.io/badge/license-TBD-lightgrey)]()
[![Made with](https://img.shields.io/badge/made%20with-Next.js%20%7C%20Bun%20%7C%20PostgreSQL-black)]()

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Core Features](#-core-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Data Model](#-data-model-core-entities)
- [User Flow](#-user-flow)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Documentation](#-documentation)
- [Risk Areas & Considerations](#-risk-areas--considerations)

---

## 🌟 Overview

**Student Meet** helps students from any academic background — school, college, or competitive exam prep — beat isolation and stay consistent with their studies. It does this in two ways:

| 🤝 Study-Out Meetups | 🎥 Live Study Rooms |
|---|---|
| Verified students plan and join **offline study sessions** at nearby libraries, cafes, and study spots — found via GPS or manual city/area search. | Subject- and level-based **virtual rooms** (Science, Mathematics, History, etc.) where students sit on video — **audio always off** — and work alongside each other with shared, visible study goals. |

The platform is **free for everyone** at launch, with ad-based monetization planned for a later phase.

---

## ✨ Core Features

- 🆔 **Multi-layer verification** — email/OTP, social login, college email domain check, and student ID upload (OCR + manual review)
- 📍 **Location-aware meetups** — GPS-based discovery with manual city/area override, plus nearby library/study-spot suggestions
- 🎯 **Shared goals in live rooms** — every participant's tasks are visible to the room for accountability
- 🔇 **Audio-free by design** — no audio publishing capability at all, enforced at the infrastructure level
- 📱 **True cross-platform** — single experience across Web (Next.js) and Mobile (React Native/Expo)
- 🛡️ **Safety-first** — reporting, blocking, and admin moderation tools built in from day one

---

## 🏗 System Architecture

```mermaid
flowchart TB
    subgraph Clients["📱 Client Applications"]
        WEB["Next.js Web App<br/>(Bun runtime)"]
        MOB["React Native App<br/>(Expo)"]
    end

    subgraph Edge["☁️ Application Layer — Vercel"]
        API["Next.js API Routes<br/>(Bun runtime)"]
        AUTH["Auth.js / Clerk<br/>Email+OTP · Social Login"]
    end

    subgraph Data["🗄️ Data Layer"]
        PG[("PostgreSQL + PostGIS<br/>Users · Rooms · Meetups · Tasks")]
        REDIS[("Redis (Upstash)<br/>Sessions · Cache · Presence")]
        S3[("S3 / Cloudflare R2<br/>Student ID images · Avatars")]
    end

    subgraph Video["🎥 Live Study Rooms"]
        LIVEKIT["LiveKit SFU<br/>Video-only · Audio publish disabled"]
    end

    subgraph External["🔌 External Services"]
        OCR["OCR Service<br/>AWS Textract / Google Vision"]
        MAPS["Maps & Places API<br/>Google Maps / Mapbox"]
        EMAIL["Email Provider<br/>Resend"]
        PUSH["Push Notifications<br/>FCM / APNs via Expo"]
        ADS["Ad Networks<br/>AdSense / AdMob (Phase 2)"]
    end

    WEB --> API
    MOB --> API
    WEB -- "Join Room" --> LIVEKIT
    MOB -- "Join Room" --> LIVEKIT

    API --> AUTH
    AUTH --> PG
    API --> PG
    API --> REDIS
    API --> S3
    API --> OCR
    API --> MAPS
    API --> EMAIL
    API --> PUSH
    LIVEKIT -. "Room metadata & task sync" .-> API

    API -.->|"Phase 2"| ADS

    classDef client fill:#e0f2fe,stroke:#0284c7,stroke-width:1px,color:#0c4a6e;
    classDef app fill:#fef9c3,stroke:#ca8a04,stroke-width:1px,color:#713f12;
    classDef data fill:#dcfce7,stroke:#16a34a,stroke-width:1px,color:#14532d;
    classDef video fill:#fce7f3,stroke:#db2777,stroke-width:1px,color:#831843;
    classDef ext fill:#f1f5f9,stroke:#64748b,stroke-width:1px,color:#334155;

    class WEB,MOB client;
    class API,AUTH app;
    class PG,REDIS,S3 data;
    class LIVEKIT video;
    class OCR,MAPS,EMAIL,PUSH,ADS ext;
```

> **Note:** Audio is never published from any client into LiveKit — there is no audio track creation path in the client SDKs for study rooms, ensuring the "no-audio" policy is structural, not just a UI toggle.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Web Frontend** | Next.js (App Router), Tailwind CSS, Zustand, TanStack Query, React Hook Form + Zod |
| **Mobile Frontend** | React Native (Expo), React Navigation, Expo Location/Camera/Notifications |
| **Backend** | Next.js API Routes on **Bun** runtime |
| **Database** | PostgreSQL + PostGIS, via **Drizzle ORM** |
| **Caching** | Redis (Upstash) |
| **Video** | **LiveKit** (self-hostable SFU, video-only enforcement) |
| **Auth** | Auth.js / Clerk — Email+OTP, Google/Apple login, college email verification |
| **Storage** | AWS S3 / Cloudflare R2 |
| **OCR** | AWS Textract / Google Vision |
| **Maps** | Google Maps / Mapbox |
| **Hosting** | Vercel (app), Neon/Supabase (DB), LiveKit Cloud → self-hosted |
| **Monitoring** | Sentry + PostHog |

📄 Full breakdown in [`01. Tech-Stack.md`](./01.%20Tech-Stack.md)

---

## 🗂 Data Model (Core Entities)

```mermaid
erDiagram
    USER ||--o{ VERIFICATION_RECORD : submits
    USER ||--o{ MEETUP : creates
    USER ||--o{ MEETUP_ATTENDEE : "joins as"
    USER ||--o{ ROOM_TASK : posts
    USER ||--o{ REPORT : files
    MEETUP ||--o{ MEETUP_ATTENDEE : has
    ROOM ||--o{ ROOM_TASK : contains

    USER {
        uuid id
        string email
        string name
        string verification_status
        string education_level
        string[] academic_niches
        string city
        point location
    }
    VERIFICATION_RECORD {
        uuid id
        uuid user_id
        string id_document_url
        json ocr_extracted_data
        string review_status
    }
    ROOM {
        uuid id
        string subject
        string education_level
        int capacity
        string livekit_room_name
    }
    ROOM_TASK {
        uuid id
        uuid room_id
        uuid user_id
        string description
        boolean completed
    }
    MEETUP {
        uuid id
        uuid creator_id
        string subject_niche
        point location
        string venue_suggestion
        datetime datetime
        int max_attendees
    }
    MEETUP_ATTENDEE {
        uuid id
        uuid meetup_id
        uuid user_id
        string status
    }
    REPORT {
        uuid id
        uuid reporter_id
        uuid reported_user_id
        string context
        string reason
        string status
    }
```

---

## 🔄 User Flow

```mermaid
sequenceDiagram
    actor U as Student
    participant App as Web/Mobile App
    participant API as Next.js API
    participant DB as PostgreSQL
    participant LK as LiveKit
    participant OCR as OCR Service

    U->>App: Sign up (Email/OTP or Social)
    App->>API: Create account
    API->>DB: Store user record
    U->>App: Upload Student ID
    App->>API: Submit verification doc
    API->>OCR: Pre-check ID document
    OCR-->>API: Extracted data
    API->>DB: Save as "pending"
    DB-->>U: Status: Pending Review
    Note over API,DB: Admin manually reviews & approves
    DB-->>U: Status: Verified ✅

    rect rgb(252, 231, 243)
    U->>App: Join "Mathematics" Live Room
    App->>LK: Connect (video-only)
    LK-->>App: Room joined, audio publish blocked
    U->>App: Post study goal
    App->>API: Save task
    API->>DB: Store + broadcast to room
    end

    rect rgb(224, 242, 254)
    U->>App: Search meetups "near me"
    App->>API: GPS query
    API->>DB: PostGIS radius search
    DB-->>App: Nearby verified meetups
    U->>App: Join meetup
    App->>API: Add attendee
    API->>DB: Update meetup_attendee
    end
```

---

## 📁 Project Structure

```
student-meet/
├── apps/
│   ├── web/                 # Next.js web app (Bun runtime)
│   │   ├── app/              # App Router pages & API routes
│   │   ├── components/
│   │   └── lib/
│   └── mobile/               # React Native (Expo) app
│       ├── app/
│       ├── components/
│       └── lib/
├── packages/
│   ├── shared/               # Shared types, Zod schemas, constants
│   ├── db/                    # Drizzle schema & migrations
│   └── ui/                    # Shared UI primitives (where feasible)
├── docs/
│   ├── 01. Tech-Stack.md
│   ├── 02. Project-Execution.md
│   └── 03. system-requirements.md
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/student-meet.git
cd student-meet

# Install dependencies (Bun workspaces)
bun install

# Set up environment variables
cp .env.example .env
# Fill in: DATABASE_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET,
#          AUTH secrets, MAPS_API_KEY, OCR credentials, etc.

# Run database migrations
bun run db:migrate

# Start the web app
bun run dev:web

# Start the mobile app (Expo)
bun run dev:mobile
```

> ⚠️ This is a planning-stage README — commands assume the monorepo structure proposed in [`02. Project-Execution.md`](./02.%20Project-Execution.md) and will need actual scripts wired up during Phase 0.

---

## 🗺 Roadmap

| Phase | Focus | Status |
|---|---|---|
| 0 | Foundation & Planning | 🟡 Planned |
| 1 | Authentication & Verification | ⚪ Not started |
| 2 | Live Study Rooms MVP | ⚪ Not started |
| 3 | Study-Out Meetups | ⚪ Not started |
| 4 | Mobile Parity & Polish | ⚪ Not started |
| 5 | Beta Launch | ⚪ Not started |
| 6 | Public Launch & Monetization Prep | ⚪ Not started |

📄 Full plan in [`02. Project-Execution.md`](./02.%20Project-Execution.md)

---

## 📚 Documentation

| Document | Description |
|---|---|
| [`01. Tech-Stack.md`](./01.%20Tech-Stack.md) | Detailed breakdown of every technology choice and why |
| [`02. Project-Execution.md`](./02.%20Project-Execution.md) | Phase-by-phase execution plan, team structure, timelines |
| [`03. system-requirements.md`](./03.%20system-requirements.md) | Functional & non-functional requirements, constraints, data model |

---

## ⚠️ Risk Areas & Considerations

- **Verification bottleneck** — manual ID review introduces human-dependent latency; plan automation as scale grows
- **Video infrastructure cost** — monitor LiveKit Cloud usage and define a clear self-hosting migration trigger
- **Offline safety** — real-world meetups require robust verification, reporting, and moderation before public launch
- **No-audio policy** — must be enforced structurally (no audio track publishing path in client SDKs), not just hidden in UI
- **Engagement** — the shared goals/tasks feature is central to retention and needs thorough beta validation

---

<div align="center">

*Built for students, by design — focused, social, and free.*

</div>
