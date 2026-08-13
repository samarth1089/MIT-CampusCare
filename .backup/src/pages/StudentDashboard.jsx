import { useNavigate } from "react-router-dom";
import {
  Plus,
  Clock3,
  CheckCircle2,
  FileText,
  ArrowRight,
  AlertCircle,
  Sparkles,
  UserCircle,
} from "lucide-react";


function StudentDashboard() {
  const navigate = useNavigate();

  const complaints = [
    {
      id: "CMP-1024",
      title: "Hostel Wi-Fi not working",
      category: "IT & Network",
      date: "Today, 10:32 AM",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "CMP-1021",
      title: "Water supply issue in Block B",
      category: "Hostel",
      date: "Yesterday",
      status: "Resolved",
      priority: "High",
    },
    {
      id: "CMP-1018",
      title: "Classroom projector not working",
      category: "Infrastructure",
      date: "Aug 10",
      status: "Pending",
      priority: "Medium",
    },
  ];

  return (
    <div className="student-dashboard">

      {/* ================= NAVBAR ================= */}
      <header className="dashboard-navbar">
        <div className="dashboard-navbar-inner">

          <div className="dashboard-brand">
            <div className="brand-mark">MIT</div>

            <div>
              <h1>CampusCare</h1>
              <p>Student Grievance Portal</p>
            </div>
          </div>

          <div className="dashboard-user">
            <div className="dashboard-user-info">
              <strong>Samarth Bonde</strong>
              <span>Student</span>
            </div>

            <div className="user-avatar">
              SB
            </div>
          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="dashboard-container">

        {/* Welcome section */}
        <section className="dashboard-welcome">

          <div>
            <span className="section-label">
              STUDENT DASHBOARD
            </span>

            <h2>
              Good evening, Samarth
              <span className="wave">👋</span>
            </h2>

            <p>
              Manage your complaints and stay updated on their progress.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/student/complaint")}
          >
            <Plus size={18} />
            New Complaint
          </button>

        </section>

        {/* ================= STAT CARDS ================= */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-top">
              <div className="stat-icon blue">
                <FileText size={20} />
              </div>

              <span className="stat-label">
                All time
              </span>
            </div>

            <div className="stat-number">
              12
            </div>

            <div className="stat-title">
              Total Complaints
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-card-top">
              <div className="stat-icon orange">
                <Clock3 size={20} />
              </div>

              <span className="stat-label orange-text">
                Active
              </span>
            </div>

            <div className="stat-number">
              4
            </div>

            <div className="stat-title">
              In Progress
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-card-top">
              <div className="stat-icon green">
                <CheckCircle2 size={20} />
              </div>

              <span className="stat-label green-text">
                Completed
              </span>
            </div>

            <div className="stat-number">
              8
            </div>

            <div className="stat-title">
              Resolved Complaints
            </div>

          </div>

        </section>


        {/* ================= SMART ROUTING ================= */}
        <section className="smart-card">

          <div className="smart-icon">
            <Sparkles size={21} />
          </div>

          <div className="smart-content">

            <span className="smart-label">
              SMART ASSISTANCE
            </span>

            <h3>
              Submit your complaint easily
            </h3>

            <p>
              CampusCare helps identify the appropriate category
              and department when you submit a complaint.
            </p>

          </div>

          <button
            className="smart-button"
            onClick={() => navigate("/student/complaint")}
          >
            Submit Complaint
            <ArrowRight size={17} />
          </button>

        </section>


        {/* ================= RECENT COMPLAINTS ================= */}
        <section className="complaints-card">

          <div className="complaints-header">

            <div>
              <h3>
                Recent Complaints
              </h3>

              <p>
                Your latest grievance activity
              </p>
            </div>

            <button className="view-all-button">
              View all
              <ArrowRight size={16} />
            </button>

          </div>


          <div className="complaints-list">

            {complaints.map((complaint) => (

              <div
                key={complaint.id}
                className="complaint-row"
                onClick={() =>
                  navigate(`/student/complaint/${complaint.id}`)
                }
              >

                <div className="complaint-main">

                  <div className="complaint-icon">
                    <AlertCircle size={19} />
                  </div>

                  <div className="complaint-info">

                    <h4>
                      {complaint.title}
                    </h4>

                    <div className="complaint-meta">

                      <span className="category">
                        {complaint.category}
                      </span>

                      <span>
                        {complaint.id}
                      </span>

                      <span>
                        {complaint.date}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="complaint-right">

                  <span
                    className={`status-badge ${
                      complaint.status === "Resolved"
                        ? "resolved"
                        : complaint.status === "In Progress"
                        ? "progress"
                        : "pending"
                    }`}
                  >
                    {complaint.status}
                  </span>

                  <span
                    className={`priority-badge ${
                      complaint.priority === "High"
                        ? "high"
                        : "medium"
                    }`}
                  >
                    {complaint.priority}
                  </span>

                  <ArrowRight
                    size={18}
                    className="row-arrow"
                  />

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* ================= FOOTER ================= */}
        <footer className="dashboard-footer">

          <span>
            © 2026 Maharashtra Institute of Technology
          </span>

          <span>
            CampusCare Student Portal
          </span>

        </footer>

      </main>

    </div>
  );
}

export default StudentDashboard;