import { useState, useEffect } from "react";
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
  FileText,
  ArrowRight,
  Search,
  Filter
} from "lucide-react";

import { getComplaints } from "../services/complaintService";
import { getCurrentUser, logout } from "../services/authService";

function MyComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const currentUser = getCurrentUser() || { name: "Student", role: "student" };

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = selectedStatus === "All" || complaint.status === selectedStatus;
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
          <Link to="/student/profile" className="flex items-center gap-3 pl-6 border-l border-white/20 hover:opacity-80 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              <User size={18} />
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
            <Link to="/student" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <Home size={20} className="text-slate-400" />
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <Link to="/student/complaint" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer transition">
              <Plus size={20} className="text-slate-400" />
              <span className="text-sm">New Complaint</span>
            </Link>

            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
              <List size={20} className="text-blue-600" />
              <span className="text-sm">My Complaints</span>
            </div>
            
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
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  My Complaints
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  View and track all your submitted grievances.
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

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <List size={18} className="text-slate-400" />
                  <h3 className="text-base font-bold text-slate-900">All Grievances</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                    <Search size={16} className="text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="outline-none text-sm w-32 sm:w-48 bg-transparent text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                    <Filter size={16} className="text-slate-400" />
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="outline-none text-sm bg-transparent text-slate-700 cursor-pointer font-medium"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
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
                    {filteredComplaints.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-16 text-center">
                          <FileText size={40} className="mx-auto text-slate-300 mb-4" />
                          <p className="text-sm font-semibold text-slate-700">No complaints found</p>
                          <p className="text-xs text-slate-500 mt-1">You haven't submitted any complaints matching this criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredComplaints.map((complaint) => (
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
                                ? "bg-amber-50 text-amber-700"
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

export default MyComplaints;
