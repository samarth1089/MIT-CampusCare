import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  LogOut,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Menu,
} from "lucide-react";

import { getCurrentUser, logout } from "../services/authService";

function AdminProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = getCurrentUser() || { 
    name: "System Administrator", 
    role: "admin",
    email: "admin@mitcollege.edu",
    studentId: "N/A",
    department: "IT Department",
    phone: "N/A",
    status: "Active"
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white">
            <span className="font-bold text-sm">MC</span>
          </div>
          <span className="font-bold text-slate-800">Admin</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-500">
          <Menu size={24} />
        </button>
      </div>

      {/* DESKTOP HEADER */}
      <header className="hidden md:flex fixed top-0 left-64 right-0 h-16 bg-[#0B2A5B] items-center justify-between px-6 z-10 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Administrator Portal</h2>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">My Profile</p>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-100 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            System Operational
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-white/20">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {currentUser.name.substring(0, 2).toUpperCase()}
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

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 flex flex-col ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100 bg-slate-50/50">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white shrink-0">
            <span className="font-bold text-sm">MC</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">MIT CampusCare</h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Admin</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
            <LayoutDashboard size={20} className="text-slate-400" />
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
          
          <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
            <User size={20} className="text-blue-600" />
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
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 pt-0 md:pt-16 min-h-screen">
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              Admin Profile
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              View and manage your administrator account details.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
            <div className="bg-gradient-to-r from-[#0B2A5B] to-blue-800 h-28 rounded-t-2xl"></div>

            <div className="px-6 pb-6 flex items-start gap-5">
              {/* Avatar: negative margin pulls it up into the banner */}
              <div className="shrink-0 -mt-10 w-20 h-20 bg-white p-1.5 rounded-full border-2 border-white shadow-lg z-10">
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <ShieldCheck size={36} />
                </div>
              </div>

              {/* Profile info: sits entirely in the white section */}
              <div className="pt-3 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{currentUser.name}</h3>
                  <p className="text-sm font-medium text-slate-500 capitalize mt-0.5 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" />
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
              <h3 className="text-base font-bold text-slate-900">Administrator Information</h3>
            </div>
            
            <div className="p-5 grid sm:grid-cols-2 gap-6">
              
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <User size={14} /> Full Name
                </p>
                <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <Mail size={14} /> Email Address
                </p>
                <p className="text-sm font-bold text-slate-800">{currentUser.email}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck size={14} /> Admin ID
                </p>
                <p className="text-sm font-bold text-slate-800">ADM-001</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <Phone size={14} /> Phone Number
                </p>
                <p className="text-sm font-bold text-slate-800">{currentUser.phone || "+1 (555) 000-0000"}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <Building2 size={14} /> Department Assigned
                </p>
                <p className="text-sm font-bold text-slate-800">{currentUser.department || "System Administrator"}</p>
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
  );
}

export default AdminProfile;
