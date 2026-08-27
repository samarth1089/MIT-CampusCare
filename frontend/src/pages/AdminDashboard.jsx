import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  BarChart3,
  GraduationCap,
  Menu,
  User,
} from "lucide-react";

import { getComplaints } from "../services/complaintService";
import { getOverdueCount } from "../services/analyticsService";
import { getCurrentUser, logout } from "../services/authService";


function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [overdueCount, setOverdueCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = getCurrentUser() || { name: "System Administrator", role: "admin" };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const refreshData = () => {
    setComplaints(getComplaints());
    setOverdueCount(getOverdueCount());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const progress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

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
                Admin Portal
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            System Operational
          </div>
          <Link to="/admin/profile" className="flex items-center gap-3 pl-6 border-l border-white/20 hover:opacity-80 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white leading-tight">{currentUser.name}</p>
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
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
              <LayoutDashboard size={20} className="text-blue-600" />
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <Link to="/admin/complaints" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <FileText size={20} className="text-slate-400" />
              <span className="text-sm">All Complaints</span>
            </Link>
            
            <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <BarChart3 size={20} className="text-slate-400" />
              <span className="text-sm">Analytics</span>
            </Link>
            
            <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
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

        {/* OVERLAY */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 z-0 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                Admin Overview
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Complaint Management & Analytics
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} className="text-blue-600" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Complaints</span>
                </div>
                <p className="text-4xl font-bold text-slate-900">{total}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3">
                  <Clock3 size={16} className="text-amber-500" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending</span>
                </div>
                <p className="text-4xl font-bold text-slate-900">{pending}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-green-500" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active</span>
                </div>
                <p className="text-4xl font-bold text-slate-900">{progress}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resolved</span>
                </div>
                <p className="text-4xl font-bold text-slate-900">{resolved}</p>
              </div>

              <div className="bg-white border border-red-200 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center shadow-red-50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-red-500" />
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Overdue SLA</span>
                </div>
                <p className="text-4xl font-bold text-red-600">{overdueCount}</p>
              </div>
            </div>

            {/* Analytics Section */}


          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;