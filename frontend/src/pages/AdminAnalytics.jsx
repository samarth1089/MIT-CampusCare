import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  LogOut,
  TrendingUp,
  Droplets,
  MonitorPlay,
  Menu,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  getResolutionStats,
  getComplaintsByCategory,
  getOverdueCount,
} from "../services/analyticsService";
import { getComplaints } from "../services/complaintService";
import { getCurrentUser, logout } from "../services/authService";

function AdminAnalytics() {
  const [resolutionStats, setResolutionStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = getCurrentUser() || { name: "System Administrator", role: "admin" };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const refreshData = () => {
    setResolutionStats(getResolutionStats());
    setCategoryStats(getComplaintsByCategory());
    setTotal(getComplaints().length);
  };

  useEffect(() => {
    refreshData();
  }, []);

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
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">System Analytics</p>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-100 bg-white/10 px-3 py-1.5 rounded-full">
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
          
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
            <BarChart3 size={20} className="text-blue-600" />
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
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 pt-0 md:pt-16 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          
          {/* HEADER AREA */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Analytics & Insights</h1>
            <p className="text-sm text-slate-500 mt-1">Monitor campus-wide grievance metrics and resolution times</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            
            {/* Resolution Status Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6">Resolution Status</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resolutionStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {resolutionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 mt-2 px-4">
                {resolutionStats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-xs font-medium text-slate-600">{stat.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {Math.round((stat.value / total) * 100) || 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:col-span-2 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6">Top Categories</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={categoryStats} margin={{ top: 0, right: 30, bottom: 0, left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569' }} width={120} />
                    <RechartsTooltip cursor={{ fill: '#f8fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={24}>
                      {categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#2563EB" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* CAMPUS INSIGHTS */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Campus Insights</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">IT & Network — Hostel Block B</h4>
                  <p className="text-xs text-slate-500 mt-1">Increasing complaints (+64%)</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Droplets size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Hostel — Water Supply</h4>
                  <p className="text-xs text-slate-500 mt-1">Recurring issue detected</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <MonitorPlay size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Infrastructure — Classroom Equip</h4>
                  <p className="text-xs text-slate-500 mt-1">Recurring complaints over 7 days</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminAnalytics;
