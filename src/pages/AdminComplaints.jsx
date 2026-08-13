import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  LogOut,
  Search,
  Filter,
  Eye,
  Menu,
} from "lucide-react";
import { getComplaints, updateComplaintStatus, updateComplaint } from "../services/complaintService";
import { getSlaStatus } from "../services/slaService";
import { getCurrentUser, logout } from "../services/authService";

const DEPARTMENTS = [
  "IT Cell",
  "Maintenance",
  "Hostel Warden",
  "Security",
  "Academics",
  "Finance",
];

const PRIORITIES = ["Critical", "High", "Medium", "Low"];

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = getCurrentUser() || { name: "System Administrator", role: "admin" };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const refreshData = () => {
    setComplaints(getComplaints());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    updateComplaintStatus(id, newStatus);
    refreshData();
  };

  const handleFieldChange = (id, field, value) => {
    updateComplaint(id, { [field]: value });
    refreshData();
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = selectedStatus === "All" || complaint.status === selectedStatus;
    const matchesPriority = selectedPriority === "All" || complaint.priority === selectedPriority;
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

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
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Manage All Complaints</p>
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
          
          <Link to="/admin/complaints" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer transition">
            <FileText size={20} className="text-blue-600" />
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
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 pt-0 md:pt-16 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          
          {/* HEADER AREA */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">All Complaints</h1>
            <p className="text-sm text-slate-500 mt-1">Manage, filter, and assign student grievances</p>
          </div>

          {/* COMPLAINT TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                  <Search size={16} className="text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search complaints..."
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
                
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                  <Filter size={16} className="text-slate-400" />
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="outline-none text-sm bg-transparent text-slate-700 cursor-pointer font-medium"
                  >
                    <option value="All">All Priority</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Complaint</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">SLA</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-semibold text-slate-600">No complaints found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((complaint) => {
                      const slaInfo = getSlaStatus(complaint);
                      return (
                        <tr key={complaint.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 min-w-[200px] max-w-[250px]">
                            <p className="text-sm font-bold text-slate-900 truncate" title={complaint.title}>
                              {complaint.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                              <span className="font-bold text-blue-600">{complaint.id}</span>
                              <span className="text-slate-300">•</span>
                              <span className="truncate">{complaint.anonymous ? "Student: Anonymous 🔒" : complaint.studentName}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <select
                              value={complaint.priority}
                              onChange={(e) => handleFieldChange(complaint.id, "priority", e.target.value)}
                              className={`text-[11px] font-bold border-0 rounded-full px-3 py-1 outline-none cursor-pointer ${
                                complaint.priority === "Critical" || complaint.priority === "High"
                                  ? "bg-red-50 text-red-700"
                                  : complaint.priority === "Medium"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-green-50 text-green-700"
                              }`}
                            >
                              {PRIORITIES.map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-6 py-4">
                            {slaInfo.isOverdue ? (
                              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                                {slaInfo.formattedRemaining}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-600 font-medium">
                                {slaInfo.formattedRemaining}
                              </span>
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <select
                              value={complaint.department || ""}
                              onChange={(e) => {
                                handleFieldChange(complaint.id, "department", e.target.value);
                                handleFieldChange(complaint.id, "assignedTo", e.target.value);
                              }}
                              className="text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none max-w-[150px] bg-white cursor-pointer hover:border-slate-300 focus:ring-1 focus:ring-blue-500 transition"
                            >
                              <option value="">Unassigned</option>
                              {DEPARTMENTS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-6 py-4">
                            <select
                              value={complaint.status}
                              onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                              className={`text-[11px] font-bold border-0 rounded-full px-3 py-1 outline-none cursor-pointer ${
                                complaint.status === "Resolved"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : complaint.status === "In Progress"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-yellow-50 text-yellow-700"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <Link 
                              to={`/admin/complaint/${complaint.id}`}
                              className="inline-flex items-center justify-center p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminComplaints;
