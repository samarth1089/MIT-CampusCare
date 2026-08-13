# MIT CampusCare — Smart Student Grievance Management Platform

> **Report. Track. Resolve.** — An intelligent campus grievance platform designed to make student complaints easier to report, manage, track, and resolve while protecting student privacy.

MIT CampusCare provides a centralized platform where students can submit campus complaints, receive smart assistance for categorization and priority, track their complaints, and provide feedback. Administrators can manage complaints, monitor SLA performance, update complaint status, and analyze grievance trends through a dedicated dashboard.

---

## ✨ Key Features

* **Smart Complaint Assistance**: Analyzes complaint descriptions and suggests the appropriate category, department, priority, location, and SLA.
* **Anonymous Complaint Reporting**: Allows students to report sensitive issues while keeping their identity protected from complaint handlers.
* **Complaint Tracking**: Students receive a unique `CMP-XXXX` complaint ID and can track status, priority, department, location, timeline, and SLA information.
* **File Attachments**: Students can attach supporting images or documents while submitting a complaint.
* **SLA & Escalation Management**: Complaints are assigned priority-based deadlines with overdue tracking and escalation levels.
* **Admin Management & Analytics**: Administrators can view all complaints, update complaint status, manage priorities and departments, and analyze complaint trends through interactive dashboards.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────┐
│        STUDENT PORTAL — React            │
│  • Student Dashboard                     │
│  • New Complaint                         │
│  • My Complaints                         │
│  • Complaint Details                     │
│  • Student Profile                       │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│        SERVICE LAYER                     │
│  • Authentication Service                │
│  • Complaint Service                     │
│  • Smart Classification                  │
│  • SLA Management                        │
│  • Analytics Service                    │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│        ADMIN PORTAL — React              │
│  • Admin Dashboard                       │
│  • All Complaints                        │
│  • Complaint Management                  │
│  • Analytics Dashboard                   │
│  • Admin Profile                         │
└────────────────┬─────────────────────────┘
                 │
                 ▼
          Browser localStorage
```

---

## 📂 Repository Structure

```text
college-grievance/
├── public/                ← Public assets and favicon
├── src/
│   ├── components/        ← Reusable UI components
│   ├── pages/             ← Student and Admin pages
│   ├── services/          ← Auth, complaints, SLA and analytics
│   ├── App.jsx            ← Application routing
│   └── main.jsx           ← Application entry point
├── index.html             ← Application HTML entry
├── package.json           ← Dependencies and scripts
├── vite.config.js         ← Vite configuration
└── README.md              ← Project overview and setup
```

---

## 🚀 Setup & Running

### Prerequisites

* Node.js 18+
* npm

### 1. Clone the Repository

```bash
git clone https://github.com/samarth1089/college-grievance.git
cd college-grievance
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will start on:

```text
http://localhost:5173
```

### 4. Production Build

```bash
npm run build
```

---

## 🔄 The Complaint Pipeline

1. **Student Registration/Login:** Student creates an account and enters the Student Portal.
2. **Complaint Submission:** Student enters the complaint details and can attach supporting evidence.
3. **Smart Classification:** The system analyzes the complaint and suggests category, department, priority, location, and SLA.
4. **Complaint Creation:** A unique `CMP-XXXX` complaint ID is generated and the complaint is stored through the complaint service.
5. **Tracking:** The complaint becomes available in My Complaints and the Student Dashboard.
6. **Admin Processing:** Administrators can view and manage the same complaint from the Admin Portal.
7. **Resolution:** Status changes such as Pending → In Progress → Resolved are reflected across the system.

---

## 🛡️ Privacy & Security

* **Anonymous Reporting:** Sensitive complaints can be submitted without exposing the student's identity to complaint handlers.
* **Role-Based Access:** Student and Administrator areas are separated through authentication and protected routes.
* **Centralized Complaint Data:** Student and Admin portals use the same complaint service to maintain consistent complaint status and information.
* **Session Management:** Login and logout functionality manages the active user session without deleting complaint records.
* **Client-Side Prototype:** The current version uses browser `localStorage`; a production deployment should use secure backend authentication and database storage.

---

## 👥 Team InnoX

Building a smarter campus grievance system that gives students a simple way to raise concerns, track progress, and stay informed while helping administrators resolve campus issues efficiently.

