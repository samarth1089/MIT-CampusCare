import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  UserRound,
  Building2,
  MessageSquare,
  Sparkles,
} from "lucide-react";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const complaint = {
    id: id || "CMP-1024",
    title: "Hostel Wi-Fi not working",
    description:
      "The Wi-Fi connection has not been working properly in Hostel Block B for the last three days. Multiple students are unable to access online classes and college resources.",
    category: "IT & Network",
    department: "IT Department",
    priority: "High",
    status: "In Progress",
    submitted: "Aug 12, 2026 • 10:32 AM",
    assignedTo: "IT Support Team",
  };

  const timeline = [
    {
      title: "Complaint Submitted",
      description: "Complaint received successfully.",
      time: "10:32 AM",
      completed: true,
    },
    {
      title: "AI Analysis Completed",
      description:
        "Category, priority and responsible department identified.",
      time: "10:33 AM",
      completed: true,
    },
    {
      title: "Assigned to IT Department",
      description: "Complaint assigned to IT Support Team.",
      time: "11:05 AM",
      completed: true,
    },
    {
      title: "Investigation in Progress",
      description: "IT team is currently investigating the issue.",
      time: "12:10 PM",
      completed: true,
    },
    {
      title: "Complaint Resolved",
      description: "Waiting for resolution.",
      time: "Pending",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
        <button
          onClick={() => navigate("/student")}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="ml-6 border-l border-slate-200 pl-6">
          <p className="font-semibold text-slate-900">
            Complaint Details
          </p>
          <p className="text-xs text-slate-400">
            {complaint.id}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-2">

              <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                {complaint.status}
              </span>

              <span className="text-xs font-semibold bg-red-50 text-red-600 px-3 py-1.5 rounded-full">
                {complaint.priority} Priority
              </span>

            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              {complaint.title}
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              {complaint.id} • Submitted {complaint.submitted}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-3 rounded-xl">
            <Sparkles size={18} />

            <div>
              <p className="text-xs font-semibold">
                AI CLASSIFIED
              </p>

              <p className="text-xs text-indigo-500">
                Automatically routed
              </p>
            </div>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Complaint */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h2 className="font-bold text-slate-900 mb-4">
                Complaint Description
              </h2>

              <p className="text-slate-600 leading-7">
                {complaint.description}
              </p>

            </div>

            {/* Timeline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h2 className="font-bold text-slate-900 mb-7">
                Complaint Timeline
              </h2>

              <div className="space-y-7">

                {timeline.map((item, index) => (

                  <div
                    key={item.title}
                    className="flex gap-4"
                  >

                    <div className="flex flex-col items-center">

                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          item.completed
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <Clock3 size={18} />
                        )}
                      </div>

                      {index !== timeline.length - 1 && (
                        <div
                          className={`w-px h-12 mt-2 ${
                            item.completed
                              ? "bg-emerald-200"
                              : "bg-slate-200"
                          }`}
                        />
                      )}

                    </div>

                    <div className="pt-1">

                      <div className="flex items-center gap-3">

                        <h3
                          className={`font-semibold ${
                            item.completed
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <span className="text-xs text-slate-400">
                          {item.time}
                        </span>

                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Conversation */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-5">

                <MessageSquare
                  size={19}
                  className="text-indigo-600"
                />

                <h2 className="font-bold text-slate-900">
                  Communication
                </h2>

              </div>

              <div className="bg-slate-50 rounded-xl p-4">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    IT
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      IT Support Team
                    </p>

                    <p className="text-xs text-slate-400">
                      Today, 12:10 PM
                    </p>
                  </div>

                </div>

                <p className="text-sm text-slate-600 mt-4 leading-6">
                  We have received your complaint and are currently
                  checking the network equipment in Block B. We will
                  update you once the issue is resolved.
                </p>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h2 className="font-bold text-slate-900 mb-5">
                Complaint Information
              </h2>

              <div className="space-y-5">

                <div className="flex gap-3">

                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Building2 size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      CATEGORY
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      {complaint.category}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Building2 size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      DEPARTMENT
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      {complaint.department}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      ASSIGNED TO
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      {complaint.assignedTo}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* SLA */}
            <div className="bg-indigo-50 rounded-2xl p-6 text-indigo-800">

              <div className="flex items-center gap-2 mb-4">

                <Clock3
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-bold text-indigo-800">
                  Resolution SLA
                </h3>

              </div>

              <p className="text-3xl font-bold text-indigo-800">
                18h 24m
              </p>

              <p className="text-sm text-indigo-700 mt-1">
                Estimated time remaining
              </p>

              <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-indigo-600 rounded-full" />
              </div>

              <p className="text-xs text-slate-600 mt-3">
                Based on AI priority classification
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ComplaintDetails;