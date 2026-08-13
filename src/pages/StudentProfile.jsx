import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Bell,
  User,
  Menu,
  Home,
  Plus,
  List,
  LogOut,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { getCurrentUser, logout } from "../services/authService";

function StudentProfile() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = getCurrentUser() || { 
    name: "Student", 
    role: "student",
    email: "student@mitcollege.edu",
    studentId: "N/A",
    department: "N/A",
    phone: "N/A",
    status: "Active"
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          <Link to="/student" className="flex items-center gap-3">
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
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-white/20 hover:opacity-80 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              <User size={18} />
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-blue-200 mt-0.5 flex items-center gap-1 justify-end capitalize">
                {currentUser.role} <span className="text-xs">▾</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`absolute lg:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4 lg:mt-0">
            <Link to="/student" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <Home size={20} className="text-slate-400" />
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <Link to="/student/complaint" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <Plus size={20} className="text-slate-400" />
              <span className="text-sm">New Complaint</span>
            </Link>

            <Link to="/student/complaints" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <List size={20} className="text-slate-400" />
              <span className="text-sm">My Complaints</span>
            </Link>
            
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
              <User size={20} className="text-blue-600" />
              <span className="text-sm">Profile</span>
            </div>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                My Profile
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                View and manage your account details.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
              <div className="bg-gradient-to-r from-[#0B2A5B] to-blue-800 h-28 rounded-t-2xl"></div>

              <div className="px-6 pb-6 flex items-start gap-5">
                {/* Avatar: negative margin pulls it up into the banner */}
                <div className="shrink-0 -mt-10 w-20 h-20 bg-white p-1.5 rounded-full border-2 border-white shadow-lg z-10">
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={36} />
                  </div>
                </div>

                {/* Profile info: sits entirely in the white section */}
                <div className="pt-3 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{currentUser.name}</h3>
                    <p className="text-sm font-medium text-slate-500 capitalize mt-0.5 flex items-center gap-2">
                      <GraduationCap size={16} className="text-blue-500" />
                      {currentUser.role} Account
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      <CheckCircle2 size={14} />
                      {currentUser.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
              </div>
              
              <div className="p-5 grid sm:grid-cols-2 gap-6">
                
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                    <User size={14} /> Full Name
                  </p>
                  <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                </div>

              </div>
            </div>

            {/* Logout Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sign Out</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Log out of your MIT CampusCare account on this device.
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-2.5 rounded-lg text-sm font-bold transition shrink-0"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentProfile;
