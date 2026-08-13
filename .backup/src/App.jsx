import "./App.css";
import mitCampus from "./assets/campus.jpeg";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
import AdminDashboard from "./pages/AdminDashboard";

import { useState } from "react";

function LandingPage() {
  const [role, setRole] = useState("student");

  const dashboardPath =
    role === "student" ? "/student" : "/admin";

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${mitCampus})`,
      }}
    >
      <div className="image-overlay"></div>

      {/* NAVBAR */}
      <header className="landing-navbar">
        <div className="brand">
          <div>
            <div className="brand-college">
              MAHARASHTRA INSTITUTE OF TECHNOLOGY
            </div>

            <div className="brand-product">
              MIT CAMPUSCARE
            </div>
          </div>
        </div>

        <div className="nav-right">
          <span className="portal-text">
            Student Grievance Portal
          </span>

          <a
            href="#access"
            className="nav-login"
          >
            Login
          </a>
        </div>
      </header>

      {/* HERO */}
      <main className="hero-content">

        {/* LEFT SIDE */}
        <section className="hero-left">

          <div className="welcome-badge">
            MIT Student Support Portal
          </div>

          <h1>
            A better way to
            <br />
            <span>connect with MIT.</span>
          </h1>

          <p className="hero-description">
            CampusCare provides students with a simple and
            transparent way to raise concerns and connect
            with the appropriate department at Maharashtra
            Institute of Technology.
          </p>

          <div className="hero-actions">

            <a
              href="#access"
              className="primary-hero-button"
            >
              Access CampusCare →
            </a>

            <a
              href="#about"
              className="secondary-hero-button"
            >
              Learn More
            </a>

          </div>

          <div className="hero-features">

            <div className="hero-feature">
              <div className="feature-icon">✓</div>

              <div>
                <strong>Simple</strong>
                <span>Easy to use</span>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">◇</div>

              <div>
                <strong>Transparent</strong>
                <span>Clear communication</span>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">→</div>

              <div>
                <strong>Connected</strong>
                <span>Right department</span>
              </div>
            </div>

          </div>

        </section>

        {/* ACCESS CARD */}
        <section
          id="access"
          className="login-card"
        >

          <div className="card-top-line"></div>

          <div className="login-header">

            <div className="login-icon">
              ↗
            </div>

            <div>
              <p className="small-heading">
                CAMPUSCARE PORTAL
              </p>

              <h2>
                Welcome
              </h2>
            </div>

          </div>

          <p className="login-description">
            Sign in to access the MIT CampusCare portal.
          </p>

          {/* PORTAL SELECTION */}
          <div className="portal-heading">
            Select your access
          </div>

          <div className="role-buttons">

            {/* STUDENT */}
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`role-button ${
                role === "student" ? "active" : ""
              }`}
            >
              <span className="role-icon">
                ST
              </span>

              <span className="role-text">
                <strong>
                  Student
                </strong>

                <small>
                  Student Portal
                </small>
              </span>

              <span className="role-arrow">
                →
              </span>
            </button>

            {/* ADMIN */}
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`role-button ${
                role === "admin" ? "active" : ""
              }`}
            >
              <span className="role-icon">
                AD
              </span>

              <span className="role-text">
                <strong>
                  Administrator
                </strong>

                <small>
                  Admin Portal
                </small>
              </span>

              <span className="role-arrow">
                →
              </span>
            </button>

          </div>

          {/* DIRECT DASHBOARD BUTTON */}
          <Link
            to={dashboardPath}
            className="login-button"
          >
            Continue to {role === "student" ? "Student" : "Admin"} Portal →
          </Link>

          {/* SUPPORT */}
          <div className="support-area">
            <span>
              Need assistance?
            </span>

            <a href="#support">
              Contact Support
            </a>
          </div>

        </section>

      </main>

      {/* OPTIONAL LOWER SECTION */}
      <section
        id="about"
        className="landing-about"
      >
        <div>
          <span className="about-label">
            MIT CAMPUSCARE
          </span>

          <h2>
            Simple. Transparent. Connected.
          </h2>

          <p>
            A centralized platform designed to help students
            communicate concerns and reach the right department
            efficiently.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">

        <span>
          © 2026 Maharashtra Institute of Technology
        </span>

        <span>
          Quest for Excellence
        </span>

        <span>
          Smart • Transparent • Accountable
        </span>

      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* STUDENT DASHBOARD */}
        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        {/* SUBMIT COMPLAINT */}
        <Route
          path="/student/complaint"
          element={<SubmitComplaint />}
        />

        {/* COMPLAINT DETAILS */}
        <Route
          path="/student/complaint/:id"
          element={<ComplaintDetails />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* IMPORTANT:
            NO /login ROUTE
            THE SECOND LOGIN PAGE IS REMOVED.
        */}

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;