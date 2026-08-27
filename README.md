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
* **Persistent Authentication**: Student accounts and authentication data are stored through the Express backend and MongoDB Atlas.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────┐
│              REACT FRONTEND                  │
│                                              │
│  • Student Login / Registration              │
│  • Student Dashboard                         │
│  • Admin Login / Dashboard                   │
│  • Complaint Management                      │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTP / REST API
                       ▼
┌──────────────────────────────────────────────┐
│           NODE.JS + EXPRESS BACKEND          │
│                                              │
│  • Authentication API                        │
│  • Student Registration & Login              │
│  • Role-Based Authentication                 │
│  • API Routes                                │
│  • Server-Side Environment Variables         │
└──────────────────────┬───────────────────────┘
                       │
                       │ Mongoose
                       ▼
┌──────────────────────────────────────────────┐
│                 MONGOOSE                     │
│                                              │
│  • MongoDB Object Modeling                   │
│  • Database Queries                          │
│  • Schema & Data Validation                  │
└──────────────────────┬───────────────────────┘
                       │
                       │ Secure Database Connection
                       ▼
┌──────────────────────────────────────────────┐
│               MONGODB ATLAS                  │
│                                              │
│       PERSISTENT DATABASE STORAGE            │
│                                              │
│  • Student Accounts                          │
│  • Authentication Data                       │
│  • User Roles                                │
│  • Persistent User Records                   │
└──────────────────────────────────────────────┘
```

The frontend communicates with MongoDB only through the Express backend. Database credentials remain on the server side and are stored using environment variables.

---

## 📂 Repository Structure

```text
MIT-CampusCare/
├── frontend/               ← React/Vite UI
│   ├── public/             ← Public assets
│   ├── src/                ← Source code
│   │   ├── components/     ← Reusable UI components
│   │   ├── pages/          ← Student and Admin pages
│   │   ├── services/       ← API and app services
│   │   ├── App.jsx         ← Application routing
│   │   └── main.jsx        ← Application entry point
│   ├── index.html          ← Application HTML entry
│   ├── package.json        ← Frontend dependencies
│   └── vite.config.js      ← Vite configuration
├── backend/                ← Node.js/Express API
│   ├── routes/             ← Backend API routes
│   ├── models/             ← MongoDB/Mongoose models
│   ├── .env                ← Environment variables (not committed)
│   ├── .env.example        ← Environment variables template
│   ├── server.js           ← Express server & database connection
│   └── package.json        ← Backend dependencies
└── README.md               ← Project overview and setup
```

---

## 🚀 Setup & Running

### Prerequisites

* Node.js 18+
* npm
* MongoDB Atlas account
* MongoDB Atlas cluster and database user

### 1. Clone the Repository

```bash
git clone https://github.com/samarth1089/MIT-CampusCare.git
cd MIT-CampusCare
```

### 2. Install and Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory based on `.env.example`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Keep `.env` private and never commit it to GitHub.

### 4. Install and Run Backend

Open another terminal and go to the `backend` directory:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Production Build (Frontend)

From the `frontend` directory:

```bash
npm run build
```

---

## 🔄 Complaint Pipeline

1. **Student Registration/Login** — Student creates an account and enters the Student Portal.
2. **Complaint Submission** — Student enters complaint details and can attach supporting evidence.
3. **Smart Classification** — The system analyzes the complaint and suggests category, department, priority, location, and SLA.
4. **Complaint Creation** — A unique `CMP-XXXX` complaint ID is generated.
5. **Tracking** — Students can monitor complaint status, timeline, priority, department, and SLA information.
6. **Admin Processing** — Administrators can view and manage complaints through the Admin Portal.
7. **Resolution** — Complaint status progresses through stages such as Pending → In Progress → Resolved.

---

## 🛡️ Privacy & Security

* **Anonymous Reporting**: Sensitive complaints can be submitted without exposing the student's identity to complaint handlers.
* **Role-Based Access**: Student and Administrator areas are separated through authentication and protected routes.
* **Secure Database Access**: The frontend does not connect directly to MongoDB. Database operations are handled by the Express backend.
* **Persistent Authentication**: Student account and authentication data are stored in MongoDB Atlas.
* **Environment-Based Secrets**: MongoDB credentials are stored in environment variables and are not included in source-controlled files.
* **Session Management**: Login and logout functionality manages the active user session without deleting complaint records.

---

## 📊 Current Data Architecture

Authentication and student account data are persisted through the backend and MongoDB Atlas.

The existing complaint service continues to handle complaint data according to the current application implementation, while MongoDB provides persistent storage for authentication and student account information.

This architecture allows the platform to progressively move additional application data to backend-managed persistent storage as the system evolves.

---

## 👥 Team Innox

Building a smarter campus grievance system that gives students a simple way to raise concerns, track progress, and stay informed while helping administrators resolve campus issues efficiently.
