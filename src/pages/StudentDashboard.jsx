import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Plus,
  Clock3,
  CheckCircle2,
  FileText,
  ArrowRight,
  AlertCircle,
  Sparkles,
  LogOut,
  Loader2,
  GraduationCap,
  Bell,
  Menu,
  Home,
  User,
  List,
} from "lucide-react";

import { getComplaints } from "../services/complaintService";
import { getCurrentUser, logout } from "../services/authService";

function StudentDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const currentUser = getCurrentUser() || { name: "Student", role: "student" };
  const studentName = currentUser.name;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const myComplaints = complaints;

  const total = myComplaints.length;
  const pending = myComplaints.filter((c) => c.status === "Pending").length;
  const inProgress = myComplaints.filter((c) => c.status === "In Progress").length;
  const resolved = myComplaints.filter((c) => c.status === "Resolved").length;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* TOP NAVBAR */}
      <header className="h-16 bg-[#0B2A5B] flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="text-white/80 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white shrink-0">
              <GraduationCap size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-white leading-tight tracking-wide">
                MIT CampusCare
              </h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">
                Student Portal
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-white/80 hover:text-white relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0B2A5B]"></span>
          </button>
          <Link to="/student/profile" className="flex items-center gap-3 pl-6 border-l border-white/20 hover:opacity-80 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              <User size={18} />
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white leading-tight">{studentName}</p>
              <p className="text-[10px] text-blue-200 mt-0.5 flex items-center gap-1 justify-end capitalize">
                {currentUser.role} <span className="text-xs">▾</span>
              </p>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`absolute lg:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4 lg:mt-0">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
              <Home size={20} className="text-blue-600" />
              <span className="text-sm">Dashboard</span>
            </div>
            
            <Link to="/student/complaint" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <Plus size={20} className="text-slate-400" />
              <span className="text-sm">New Complaint</span>
            </Link>

            <Link to="/student/complaints" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <List size={20} className="text-slate-400" />
              <span className="text-sm">My Complaints</span>
            </Link>
            
            <Link to="/student/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <User size={20} className="text-slate-400" />
              <span className="text-sm">Profile</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 font-medium transition cursor-pointer">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* OVERLAY FOR MOBILE SIDEBAR */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 z-0 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  Student Dashboard
                </h2>
                <h3 className="text-lg font-bold text-slate-800 mt-4">
                  {greeting}, {studentName.split(" ")[0]} <span className="inline-block animate-wave origin-bottom-right">👋</span>
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Manage your complaints and stay updated on their progress.
                </p>
              </div>

              <Link
                to="/student/complaint"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm shadow-blue-200 transition shrink-0"
              >
                <Plus size={18} />
                New Complaint
              </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <p className="text-xs font-bold text-slate-500 mb-3">Total Complaints</p>
                <p className="text-4xl font-bold text-slate-900 mb-4">{total}</p>
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <List size={22} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <p className="text-xs font-bold text-slate-500 mb-3">Pending</p>
                <p className="text-4xl font-bold text-slate-900 mb-4">{pending}</p>
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Clock3 size={22} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <p className="text-xs font-bold text-slate-500 mb-3">In Progress</p>
                <p className="text-4xl font-bold text-slate-900 mb-4">{inProgress}</p>
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <Loader2 size={22} className="animate-spin-slow" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <p className="text-xs font-bold text-slate-500 mb-3">Resolved</p>
                <p className="text-4xl font-bold text-slate-900 mb-4">{resolved}</p>
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>

            {/* Smart Assistance Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center gap-6 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                <Sparkles size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900">
                  Smart Complaint Assistance
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  CampusCare helps identify the appropriate category, priority and department when you submit a complaint.
                </p>
              </div>
              <Link
                to="/student/complaint"
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-sm transition shrink-0"
              >
                Submit Complaint <ArrowRight size={16} />
              </Link>
            </div>

            {/* Recent Complaints Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Complaints</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Your latest grievance activity</p>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200 text-xs font-bold text-slate-500">
                      <th className="px-6 py-4">Complaint Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {myComplaints.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                          <p className="text-sm font-semibold text-slate-600">No complaints yet</p>
                        </td>
                      </tr>
                    ) : (
                      myComplaints.slice(0, 5).map((complaint) => (
                        <tr 
                          key={complaint.id} 
                          className="hover:bg-slate-50 transition cursor-pointer"
                          onClick={() => navigate(`/student/complaint/${complaint.id}`)}
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900 max-w-[200px] truncate" title={complaint.title}>
                              {complaint.title}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                            {complaint.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {complaint.department || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-blue-600">
                            {complaint.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              complaint.status === "Resolved"
                                ? "bg-emerald-50 text-emerald-700"
                                : complaint.status === "In Progress"
                                ? "bg-amber-50 text-amber-700" // Note: the mockup uses orange for in progress sometimes or amber
                                : "bg-yellow-50 text-yellow-700"
                            }`}>
                              {complaint.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              complaint.priority === "Critical" || complaint.priority === "High"
                                ? "bg-red-50 text-red-700"
                                : complaint.priority === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-green-50 text-green-700"
                            }`}>
                              {complaint.priority}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;