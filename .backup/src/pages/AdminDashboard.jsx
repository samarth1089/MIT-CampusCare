import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  getComplaints,
  updateComplaintStatus,
} from "../services/complaintService";

function AdminDashboard() {
  const [complaints, setComplaints] = useState(
    getComplaints()
  );

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  // Update complaint status
  const updateStatus = (id, newStatus) => {
    const updated = updateComplaintStatus(
      id,
      newStatus
    );

    setComplaints(updated);
  };

  // Search + filter
  const filteredComplaints = complaints.filter(
    (complaint) => {
      const matchesStatus =
        selectedStatus === "All" ||
        complaint.status === selectedStatus;

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        complaint.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        complaint.student
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    }
  );

  // Statistics
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const highPriority = complaints.filter(
    (c) => c.priority === "High" && c.status !== "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-100 flex-col">

        <div className="p-6 border-b border-slate-100">

          <h1 className="text-xl font-bold">
            CampusCare
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Administration Portal
          </p>

        </div>

        <nav className="p-4 space-y-1">

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-600">
            <LayoutDashboard size={19} />

            <span className="text-sm font-medium">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400">
            <FileText size={19} />

            <span className="text-sm font-medium">
              Complaints
            </span>
          </div>

        </nav>

        <div className="mt-auto p-4 border-t border-slate-100">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
              AD
            </div>

            <div>

              <p className="text-sm font-medium">
                Administrator
              </p>

              <p className="text-xs text-slate-500">
                IT Department
              </p>

            </div>

          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">

        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">

          <div>

            <h2 className="font-bold text-slate-900">
              Admin Dashboard
            </h2>

            <p className="text-xs text-slate-400">
              Complaint Management System
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-semibold">

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              System Operational

            </div>

            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
              AD
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="mb-8">

            <p className="text-sm text-indigo-600 font-semibold">
              OVERVIEW
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Complaint Management
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor, assign and resolve student grievances.
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* TOTAL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText size={20} />
              </div>

              <p className="text-3xl font-bold text-slate-900 mt-4">
                {total}
              </p>

              <p className="text-sm text-slate-500">
                Total Complaints
              </p>

            </div>

            {/* PENDING */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock3 size={20} />
              </div>

              <p className="text-3xl font-bold text-slate-900 mt-4">
                {pending}
              </p>

              <p className="text-sm text-slate-500">
                Pending
              </p>

            </div>

            {/* PROGRESS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>

              <p className="text-3xl font-bold text-slate-900 mt-4">
                {progress}
              </p>

              <p className="text-sm text-slate-500">
                In Progress
              </p>

            </div>

            {/* RESOLVED */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>

              <p className="text-3xl font-bold text-slate-900 mt-4">
                {resolved}
              </p>

              <p className="text-sm text-slate-500">
                Resolved
              </p>

            </div>

          </div>

          {/* AI INSIGHT */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-indigo-800 mb-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <Sparkles
                    size={17}
                    className="text-indigo-600"
                  />

                  <span className="text-xs font-semibold text-indigo-600">
                    AI OPERATIONS INSIGHT
                  </span>

                </div>

                <h3 className="text-lg font-bold">
                  {highPriority} high-priority complaints need attention
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  AI has identified urgent complaints based on
                  priority and current status.
                </p>

              </div>

              <button
                onClick={() => {
                  setSelectedStatus("All");
                  setSearchTerm("");
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold"
              >
                Review Complaints
              </button>

            </div>

          </div>

          {/* COMPLAINT TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            {/* TOOLBAR */}
            <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h3 className="font-bold text-slate-900">
                  Recent Complaints
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Manage incoming student grievances
                </p>

              </div>

              <div className="flex items-center gap-2">

                {/* SEARCH */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2">

                  <Search
                    size={16}
                    className="text-slate-400"
                  />

                  <input
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    placeholder="Search..."
                    className="outline-none text-sm w-24 md:w-40"
                  />

                </div>

                {/* FILTER */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2">

                  <Filter
                    size={16}
                    className="text-slate-400"
                  />

                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value)
                    }
                    className="outline-none text-sm bg-white"
                  >

                    <option value="All">
                      All
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 text-left">

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                      Complaint
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                      Priority
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredComplaints.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="px-5 py-12 text-center"
                      >

                        <FileText
                          size={35}
                          className="mx-auto text-slate-300 mb-3"
                        />

                        <p className="font-semibold text-slate-700">
                          No complaints found
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          Try changing your search or filter.
                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredComplaints.map((complaint) => (

                      <tr
                        key={complaint.id}
                        className="hover:bg-slate-50"
                      >

                        {/* COMPLAINT */}
                        <td className="px-5 py-4">

                          <div>

                            <p className="font-semibold text-sm text-slate-900">
                              {complaint.title}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {complaint.id} • {complaint.student}
                            </p>

                          </div>

                        </td>

                        {/* CATEGORY */}
                        <td className="px-5 py-4">

                          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-md">
                            {complaint.category}
                          </span>

                        </td>

                        {/* PRIORITY */}
                        <td className="px-5 py-4">

                          <span
                            className={`text-xs font-semibold px-2.5 py-1.5 rounded-full ${
                              complaint.priority === "High"
                                ? "bg-red-50 text-red-600"
                                : complaint.priority === "Medium"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {complaint.priority}
                          </span>

                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">

                          <select
                            value={complaint.status}
                            onChange={(e) =>
                              updateStatus(
                                complaint.id,
                                e.target.value
                              )
                            }
                            className={`text-xs font-semibold border-0 rounded-full px-3 py-1.5 outline-none ${
                              complaint.status === "Resolved"
                                ? "bg-emerald-50 text-emerald-600"
                                : complaint.status === "In Progress"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>

                          </select>

                        </td>

                        {/* ACTION */}
                        <td className="px-5 py-4">

                          <button
                            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                            title="View complaint"
                          >

                            <ChevronRight
                              size={17}
                              className="text-slate-400"
                            />

                          </button>

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
  );
}

export default AdminDashboard;