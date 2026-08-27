import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Building2,
  MessageSquare,
  Sparkles,
  MapPin,
  Star,
  RotateCcw,
  AlertTriangle,
  FileText,
} from "lucide-react";

import { getComplaintById, addFeedback, reopenComplaint } from "../services/complaintService";
import { getSlaStatus } from "../services/slaService";
import { getCurrentUser } from "../services/authService";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [slaInfo, setSlaInfo] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({ rating: 0, comment: "" });
  const [showFeedback, setShowFeedback] = useState(false);

  const currentUser = getCurrentUser();
  const backLink = currentUser?.role === "admin" ? "/admin/complaints" : "/student";

  useEffect(() => {
    const c = getComplaintById(id);
    if (c) {
      setComplaint(c);
      setSlaInfo(getSlaStatus(c));
    }
  }, [id]);

  const handleFeedback = () => {
    if (feedbackForm.rating === 0) {
      alert("Please select a rating.");
      return;
    }
    addFeedback(id, feedbackForm);
    setComplaint({ ...complaint, feedback: feedbackForm });
    setShowFeedback(false);
  };

  const handleReopen = () => {
    reopenComplaint(id);
    const updated = getComplaintById(id);
    setComplaint(updated);
    setSlaInfo(getSlaStatus(updated));
  };

  if (!complaint) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-5">
          <Link to={backLink} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </header>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <AlertTriangle size={32} className="mx-auto text-slate-300 mb-3" />
          <h2 className="text-lg font-bold text-slate-700">Complaint not found</h2>
          <p className="text-sm text-slate-400 mt-1">The complaint {id} does not exist.</p>
          <button
            onClick={() => navigate(backLink)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const timeline = complaint.timeline || [];

  const formatDate = (ts) => {
    if (!ts) return "Pending";
    const d = new Date(ts);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-5">
        <Link
          to={backLink}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="ml-5 border-l border-slate-200 pl-5">
          <p className="text-sm font-semibold text-slate-900">Complaint Details</p>
          <p className="text-[10px] text-slate-400">{complaint.id}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                complaint.status === "Resolved"
                  ? "bg-emerald-50 text-emerald-600"
                  : complaint.status === "In Progress"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-amber-50 text-amber-600"
              }`}>
                {complaint.status}
              </span>

              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                complaint.priority === "Critical" || complaint.priority === "High"
                  ? "bg-red-50 text-red-600"
                  : complaint.priority === "Medium"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {complaint.priority} Priority
              </span>
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              {complaint.title}
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              {complaint.id} • Submitted {formatDate(complaint.createdAt)}
            </p>
          </div>

          {complaint.aiClassification && (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg shrink-0">
              <Sparkles size={15} />
              <div>
                <p className="text-[10px] font-semibold">AI CLASSIFIED</p>
                <p className="text-[10px] text-blue-500">
                  {complaint.aiClassification.confidence} confidence
                </p>
              </div>
            </div>
          )}

        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* Left */}
          <div className="lg:col-span-2 space-y-5">

            {/* Complaint */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-3">Complaint Description</h2>
              <p className="text-sm text-slate-600 leading-6">{complaint.description}</p>
            </div>

            {/* Evidence */}
            {complaint.attachment && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h2 className="text-sm font-bold text-slate-900 mb-3">Supporting Evidence</h2>
                {complaint.attachment.type.startsWith('image/') && complaint.attachment.url ? (
                   <a href={complaint.attachment.url} target="_blank" rel="noreferrer" className="block w-fit">
                     <img src={complaint.attachment.url} alt="Evidence" className="max-h-64 max-w-full object-contain rounded-md border border-slate-200 hover:opacity-90 transition" />
                   </a>
                ) : (
                   <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-sm">
                     <div className="w-10 h-10 bg-slate-200 text-slate-500 rounded flex items-center justify-center shrink-0">
                       <FileText size={20} />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-sm font-semibold text-slate-700 truncate">{complaint.attachment.name}</p>
                       <p className="text-[10px] text-slate-500 uppercase tracking-wider">{complaint.attachment.type.includes("pdf") ? "PDF Document" : "Attached File"}</p>
                     </div>
                   </div>
                )}
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">

              <h2 className="text-sm font-bold text-slate-900 mb-5">Complaint Timeline</h2>

              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">

                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        item.completed
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {item.completed ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Clock3 size={14} />
                        )}
                      </div>

                      {index !== timeline.length - 1 && (
                        <div className={`w-px flex-1 mt-1.5 min-h-[20px] ${
                          item.completed ? "bg-emerald-200" : "bg-slate-200"
                        }`} />
                      )}
                    </div>

                    <div className="pt-0.5 pb-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-xs font-semibold ${
                          item.completed ? "text-slate-800" : "text-slate-400"
                        }`}>
                          {item.event}
                        </h3>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Feedback Section */}
            {complaint.status === "Resolved" && !complaint.feedback && !showFeedback && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">How was the resolution?</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Your feedback helps us improve.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFeedback(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
                  >
                    Give Feedback
                  </button>
                  <button
                    onClick={handleReopen}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    Reopen
                  </button>
                </div>
              </div>
            )}

            {showFeedback && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Your Feedback</h3>

                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                      className="transition"
                    >
                      <Star
                        size={22}
                        className={star <= feedbackForm.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">
                    {feedbackForm.rating > 0 ? `${feedbackForm.rating}/5` : "Select rating"}
                  </span>
                </div>

                <textarea
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                  rows="3"
                  placeholder="Additional comments (optional)..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 mb-3"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleFeedback}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
                  >
                    Submit Feedback
                  </button>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {complaint.feedback && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2">Your Feedback</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= complaint.feedback.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                    />
                  ))}
                </div>
                {complaint.feedback.comment && (
                  <p className="text-xs text-slate-600">{complaint.feedback.comment}</p>
                )}
              </div>
            )}

            {/* Communication */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">

              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={15} className="text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Communication</h2>
              </div>

              {complaint.assignedTo ? (
                <div className="bg-slate-50 rounded-lg p-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {complaint.department?.substring(0, 2).toUpperCase() || "AD"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{complaint.assignedTo}</p>
                      <p className="text-[10px] text-slate-400">
                        {formatDate(complaint.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-5">
                    {complaint.status === "Resolved"
                      ? `This complaint has been resolved. ${complaint.resolution || ""}`
                      : complaint.status === "In Progress"
                      ? "We have received your complaint and are currently working on it. We will update you once the issue is resolved."
                      : "Your complaint is being reviewed. You will be notified once it is assigned to the appropriate team."
                    }
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No communication yet. Awaiting department assignment.</p>
              )}

            </div>

          </div>

          {/* Right */}
          <div className="space-y-4">

            {/* Details */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-4">Complaint Information</h2>

              <div className="space-y-4">

                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Building2 size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">CATEGORY</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{complaint.category}</p>
                  </div>
                </div>

                {complaint.location && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">LOCATION</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{complaint.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Building2 size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">DEPARTMENT</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{complaint.department}</p>
                  </div>
                </div>

                {complaint.assignedTo && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">ASSIGNED TO</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{complaint.assignedTo}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* SLA */}
            {slaInfo && (
              <div className={`rounded-lg p-5 ${
                slaInfo.isOverdue
                  ? "bg-red-50 border border-red-100"
                  : "bg-blue-50 border border-blue-100"
              }`}>

                <div className="flex items-center gap-2 mb-3">
                  <Clock3 size={15} className={slaInfo.isOverdue ? "text-red-600" : "text-blue-600"} />
                  <h3 className={`text-xs font-bold ${slaInfo.isOverdue ? "text-red-800" : "text-blue-800"}`}>
                    Resolution SLA
                  </h3>
                </div>

                <p className={`text-xl font-bold ${slaInfo.isOverdue ? "text-red-700" : "text-blue-800"}`}>
                  {slaInfo.formattedRemaining}
                </p>

                <p className={`text-[10px] mt-0.5 ${slaInfo.isOverdue ? "text-red-600" : "text-blue-600"}`}>
                  {slaInfo.isOverdue ? "SLA has been exceeded" : "Estimated time remaining"}
                </p>

                <div className="mt-3 h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      slaInfo.isOverdue ? "bg-red-500" : slaInfo.percentUsed > 75 ? "bg-amber-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${Math.min(100, slaInfo.percentUsed)}%` }}
                  />
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default ComplaintDetails;