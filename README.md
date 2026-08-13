# MIT CampusCare — Smart Student Grievance Management System

> A professional, AI-assisted college grievance portal.Students submit complaints, an intelligent classification engine routes them to the correct department, SLA timers enforce accountability, and administrators manage everything from a real-time analytics dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Repository Structure](#repository-structure)
- [Setup & Running](#setup--running)
- [Student Complaint Workflow](#student-complaint-workflow)
- [Student Portal](#student-portal)
- [Administrator Portal](#administrator-portal)
- [Complaint Status Lifecycle](#complaint-status-lifecycle)
- [Smart Complaint Assistance](#smart-complaint-assistance)
- [Authentication & Data Management](#authentication--data-management)
- [UI/UX](#uiux)
- [Testing & Verification](#testing--verification)
- [Security Notes](#security-notes)
- [Future Improvements](#future-improvements)
- [Team](#team)

---

## Project Overview

MIT CampusCare is a full-featured, single-page web application for managing student grievances at a college campus. It provides:

- A **Student Portal** for submitting, tracking, and reviewing complaints.
- An **Administrator Portal** for triaging, updating statuses, and analyzing complaint trends.
- **AI-powered classification** that automatically categorises complaints, assigns departments, sets priority levels, and calculates SLA deadlines.
- **Real-time analytics** powered by Recharts with live data from the complaint store.

The application is a fully client-side React prototype — no backend server or database is required. All data persists in the browser's `localStorage`.

---

## Key Features

| Feature | Description |
|---|---|
| **AI Complaint Classification** | Keyword-based NLP engine that auto-detects category, department, priority, SLA, and location from complaint text |
| **Duplicate Detection** | Jaccard similarity algorithm flags potentially related/duplicate complaints before submission |
| **SLA Enforcement** | Configurable per-priority SLA deadlines (4h Critical → 72h Low) with real-time countdown timers |
| **Escalation Engine** | Three-tier automatic escalation: Department → HOD → Grievance Officer based on SLA breach duration |
| **File Attachments** | Students can attach images (PNG/JPG/JPEG/WEBP) and PDFs up to 5 MB as supporting evidence |
| **Cross-Portal Sync** | Single source of truth — admin status changes are instantly visible on the student side |
| **Live Analytics** | Interactive pie charts and bar charts (Recharts) reflecting real complaint data |
| **Role-Based Access** | Protected routes with role-based guards (student vs admin) |
| **Responsive Design** | Mobile-first layout with collapsible sidebars and adaptive grids |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────┐ │
│  │  Student Pages │  │  Admin Pages  │  │  Landing +   │ │
│  │  - Dashboard   │  │  - Dashboard  │  │  Login       │ │
│  │  - Submit      │  │  - Complaints │  │              │ │
│  │  - My Compls   │  │  - Analytics  │  │              │ │
│  │  - Details     │  │  - Profile    │  │              │ │
│  │  - Profile     │  │  - Details    │  │              │ │
│  └───────┬───────┘  └───────┬───────┘  └──────────────┘ │
│          │                  │                            │
│  ┌───────┴──────────────────┴───────────────────┐       │
│  │             Service Layer                     │       │
│  │  ┌────────────┐ ┌──────────┐ ┌─────────────┐│       │
│  │  │ complaint   │ │ ai       │ │ sla         ││       │
│  │  │ Service     │ │ Service  │ │ Service     ││       │
│  │  ├────────────┤ ├──────────┤ ├─────────────┤│       │
│  │  │ auth       │ │analytics │ │             ││       │
│  │  │ Service    │ │Service   │ │             ││       │
│  │  └────────────┘ └──────────┘ └─────────────┘│       │
│  └──────────────────┬───────────────────────────┘       │
│                     │                                    │
│  ┌──────────────────┴───────────────────────────┐       │
│  │        localStorage (Browser Storage)         │       │
│  │  campuscare_complaints  │  currentUser        │       │
│  └───────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 with JSX |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Storage** | Browser `localStorage` |
| **AI** | Deterministic keyword-based classifier (client-side, no external API) |

---

## Repository Structure

```
college-grievance/
├── index.html                  # Entry HTML with MIT CampusCare title & favicon
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite + React + Tailwind CSS v4 config
├── eslint.config.js            # ESLint configuration
├── .gitignore
│
├── public/
│   ├── favicon.svg             # MIT CampusCare favicon (graduation cap)
│   └── icons.svg               # SVG icon sprite
│
├── src/
│   ├── main.jsx                # React DOM root render
│   ├── App.jsx                 # Router, routes, ProtectedRoute, LandingPage
│   ├── App.css                 # App-level styles
│   ├── index.css               # Global Tailwind CSS import
│   │
│   ├── assets/
│   │   ├── campus.jpeg         # MIT campus hero background image
│   │   └── logo.png            # MIT CampusCare logo
│   │
│   ├── pages/
│   │   ├── StudentDashboard.jsx   # Student home — stats, recent complaints
│   │   ├── SubmitComplaint.jsx    # New complaint form + AI analysis panel
│   │   ├── MyComplaints.jsx       # Student's filed complaints list
│   │   ├── ComplaintDetails.jsx   # Full complaint view + timeline + feedback
│   │   ├── StudentProfile.jsx     # Student profile card + logout
│   │   ├── AdminDashboard.jsx     # Admin overview — stat cards
│   │   ├── AdminComplaints.jsx    # All complaints table with filters & status mgmt
│   │   ├── AdminAnalytics.jsx     # Charts and analytics dashboard
│   │   └── AdminProfile.jsx       # Admin profile card + logout
│   │
│   ├── services/
│   │   ├── complaintService.js    # CRUD operations, localStorage persistence
│   │   ├── aiService.js           # Keyword-based classifier + duplicate detection
│   │   ├── slaService.js          # SLA deadline calculation & status tracking
│   │   ├── analyticsService.js    # Aggregation functions for charts
│   │   └── authService.js         # Login, logout, session management
│   │
│   └── components/
│       ├── ComplaintCard.jsx      # Reusable complaint card component
│       ├── Navbar.jsx             # Navigation bar component
│       ├── Sidebar.jsx            # Sidebar navigation component
│       └── StatusBadge.jsx        # Status indicator badge component
│
└── dist/                       # Production build output (git-ignored)
```

---

## Setup & Running

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/college-grievance.git
cd college-grievance

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Student Complaint Workflow

```
Student logs in
  → Student Dashboard (overview stats, recent complaints)
  → Clicks "New Complaint"
  → Fills title, description, location
  → Clicks "Analyze with AI"
  → AI returns: category, department, priority, SLA, confidence
  → Optionally attaches evidence (images/PDF, max 5 MB)
  → Clicks "Submit Complaint"
  → Complaint saved with CMP-XXXX ID
  → Appears in "My Complaints" immediately
  → Student can view full details, timeline, SLA countdown
  → When resolved, student can rate and leave feedback
  → Student can reopen a resolved complaint if unsatisfied
```

---

## Student Portal

| Page | Route | Description |
|---|---|---|
| Dashboard | `/student` | Overview cards (total, pending, active, resolved), recent complaints list |
| New Complaint | `/student/complaint` | Multi-field form with AI analysis panel, file attachment, and submit |
| My Complaints | `/student/complaints` | Filterable list of all complaints filed by the logged-in student |
| Complaint Details | `/student/complaint/:id` | Full complaint view with AI classification, SLA timer, timeline, feedback form |
| Profile | `/student/profile` | Student information card with logout functionality |

---

## Administrator Portal

| Page | Route | Description |
|---|---|---|
| Dashboard | `/admin` | Overview stat cards — total, pending, active, resolved, SLA overdue count |
| All Complaints | `/admin/complaints` | Searchable, filterable table of all complaints with inline status/priority/department controls |
| Complaint Details | `/admin/complaint/:id` | Same complaint details view, with admin-specific back navigation |
| Analytics | `/admin/analytics` | Live Recharts — resolution breakdown (pie), category distribution (bar), department workload |
| Profile | `/admin/profile` | Administrator information card with logout functionality |

---

## Complaint Status Lifecycle

```
                  ┌──────────┐
                  │ Submitted│
                  │ (Pending)│
                  └────┬─────┘
                       │
              Admin changes status
                       │
                  ┌────▼─────┐
                  │   In     │
                  │ Progress │
                  └────┬─────┘
                       │
              Admin resolves complaint
                       │
                  ┌────▼─────┐
                  │ Resolved │◄─── Student can rate & give feedback
                  └────┬─────┘
                       │
              Student reopens if unsatisfied
                       │
                  ┌────▼─────┐
                  │   In     │
                  │ Progress │  (cycle continues)
                  └──────────┘
```

All status transitions write to the **same localStorage record** via `complaintService.updateComplaintStatus()`. Both portals read from the same `campuscare_complaints` key — there is one source of truth.

---

## Smart Complaint Assistance

### AI Classification (`aiService.js`)

The system uses a **deterministic keyword-matching engine** (not an external LLM API) that:

1. Scans the complaint title and description against 11 category rule sets.
2. Each rule set contains domain-specific keywords (e.g., `["wifi", "network", "server"]` → IT & Network).
3. Scores each category by keyword hit count.
4. Returns the best match with: `category`, `department`, `priority`, `sla`, and `confidence` (High/Medium/Low).
5. Extracts location hints using regex patterns (e.g., "Block B", "Room 204").

### Duplicate Detection

Before submission, the `findDuplicates()` function computes Jaccard similarity between the new complaint and all existing complaints. Results with ≥ 25% word overlap are surfaced as potential duplicates.

### SLA Engine (`slaService.js`)

| Priority | SLA Deadline |
|---|---|
| Critical | 4 hours |
| High | 12 hours |
| Medium | 48 hours |
| Low | 72 hours |

The `getSlaStatus()` function provides real-time countdown, overdue detection, and percentage-used calculations. The escalation engine (`getEscalationLevel()`) automatically determines the escalation tier based on how far past the SLA deadline the complaint is.

---

## Authentication & Data Management

### Authentication (`authService.js`)

- **Mechanism**: Mock credential-based login stored in `localStorage` under the `currentUser` key.
- **Demo Accounts**:
  | Role | Email | Password |
  |---|---|---|
  | Student | `samarth@mitcollege.edu` | `password123` |
  | Admin | `admin@mitcollege.edu` | `admin` |
- **Logout**: Clears the `currentUser` key from `localStorage`. Does **not** delete complaint data.
- **Route Protection**: `ProtectedRoute` component in `App.jsx` checks `isAuthenticated()` and enforces `allowedRole`.

### Data Persistence (`complaintService.js`)

- **Storage**: All complaint data is stored in `localStorage` under the key `campuscare_complaints`.
- **Seeded Data**: 7 default complaint records are seeded on first load to demonstrate the system.
- **Operations**: `getComplaints()`, `addComplaint()`, `updateComplaintStatus()`, `updateComplaint()`, `getComplaintById()`, `addFeedback()`, `reopenComplaint()`, `resetComplaints()`.
- **ID Generation**: Sequential `CMP-XXXX` format.

---

## UI/UX

- **Design System**: MIT blue (`#0B2A5B`) + white, with a professional institutional appearance.
- **Styling**: Tailwind CSS v4 utility classes throughout — no custom CSS framework.
- **Typography**: System font stack via Tailwind defaults.
- **Icons**: Lucide React icon library for consistent, clean iconography.
- **Charts**: Recharts library for interactive pie charts, bar charts, and responsive containers.
- **Responsive**: Mobile-first with collapsible sidebar navigation and adaptive grid layouts.
- **Hero Section**: Full-bleed campus background image with dark overlay and embedded login card.

---

## Testing & Verification

### Build Verification

```bash
npm run build
# ✓ 2392 modules transformed
# ✓ built in ~2s
# ✓ 0 errors
```

### End-to-End Flow (Manual)

1. ✅ Landing page loads with hero + embedded login
2. ✅ Student login → `/student` dashboard
3. ✅ Sidebar navigation: Dashboard, New Complaint, My Complaints, Profile
4. ✅ Submit complaint → AI classification → generates CMP-XXXX ID
5. ✅ New complaint appears in My Complaints
6. ✅ Student logout → redirects to landing page
7. ✅ Admin login → `/admin` dashboard with stat cards
8. ✅ Admin All Complaints shows student's complaint
9. ✅ Admin changes status (Pending → In Progress) — persists correctly
10. ✅ Admin Analytics renders live charts from real complaint data
11. ✅ Admin Profile shows administrator info + logout
12. ✅ Admin logout → redirects to landing page
13. ✅ Student re-login → complaint shows updated status ("In Progress") — **cross-portal sync confirmed**

---

## Security Notes

> ⚠️ **This is a prototype/hackathon project.** The following are known limitations:

- **No backend**: All data is client-side only (`localStorage`). Data is not synced across browsers or devices.
- **No real authentication**: Credentials are hardcoded in `authService.js`. There is no token-based auth, no encryption, and no server-side session validation.
- **No input sanitization**: Complaint text is rendered as-is. A production version should sanitize all user inputs.
- **File attachments**: Stored as base64 data URLs in `localStorage`. This is not scalable — a production version would upload to cloud storage (e.g., S3, Firebase Storage).

---

## Future Improvements

- [ ] **Backend API** — Express.js / Flask REST API with a proper database (PostgreSQL/MongoDB)
- [ ] **Real AI** — Integrate Google Gemini or OpenAI API for natural language classification
- [ ] **Real Authentication** — JWT-based auth with email verification
- [ ] **Push Notifications** — Email/SMS alerts for status changes and SLA warnings
- [ ] **Multi-language Support** — Hindi, Marathi, and other regional languages
- [ ] **Anonymous Complaints** — Allow students to file grievances without revealing identity
- [ ] **Mobile App** — React Native companion app
- [ ] **Admin Assignment** — Route complaints to specific staff members, not just departments
- [ ] **Audit Logs** — Track all admin actions for accountability
- [ ] **Export Reports** — Download complaint data as CSV/PDF

---

## Team

| Name | Role |
|---|---|
| Samarth Bonde | Full-Stack Developer |

---


