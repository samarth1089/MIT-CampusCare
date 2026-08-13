import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
  FileText as FileIcon,
} from "lucide-react";

import { addComplaint } from "../services/complaintService";
import { classifyComplaint, findDuplicates } from "../services/aiService";
import { getSlaDeadline } from "../services/slaService";
import { getComplaints } from "../services/complaintService";
import { getCurrentUser } from "../services/authService";

const CATEGORIES = [
  "Hostel",
  "Infrastructure",
  "IT & Network",
  "Academics",
  "Finance",
  "Transport",
  "Library",
  "Canteen",
  "Sanitation",
  "Security",
  "Other",
];

function SubmitComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "",
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [duplicates, setDuplicates] = useState([]);
  
  const [attachment, setAttachment] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const analyzeComplaint = async () => {
    if (!form.title || !form.description) {
      alert("Please enter complaint title and description.");
      return;
    }

    setLoading(true);

    try {
      const result = await classifyComplaint(form.title, form.description);

      setAnalysis(result);

      // Auto-fill category if not manually selected
      if (!form.category) {
        setForm((prev) => ({ ...prev, category: result.category }));
      }
      if (!form.priority) {
        setForm((prev) => ({ ...prev, priority: result.priority }));
      }
      if (!form.location && result.suggestedLocation) {
        setForm((prev) => ({ ...prev, location: result.suggestedLocation }));
      }

      // Check for duplicates
      const existing = getComplaints();
      const dupes = findDuplicates(
        { title: form.title, description: form.description },
        existing
      );
      setDuplicates(dupes);
    } catch {
      alert("Analysis failed. Please try again.");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!analysis) {
      alert("Please analyze the complaint first.");
      return;
    }

    const category = form.category || analysis.category;
    const priority = form.priority || analysis.priority;
    const department = analysis.department;

    const currentUser = getCurrentUser() || { name: "Student", studentId: "STU-000" };

    const complaint = addComplaint({
      studentName: currentUser.name,
      studentId: currentUser.studentId,
      title: form.title,
      description: form.description,
      category,
      department,
      priority,
      location: form.location,
      slaDeadline: getSlaDeadline(priority, new Date().toISOString()),
      assignedTo: department,
      attachment: attachment ? {
        name: attachment.name,
        type: attachment.type,
        url: previewUrl // Store the URL for demo purposes
      } : null,
      aiClassification: {
        category: analysis.category,
        department: analysis.department,
        priority: analysis.priority,
        confidence: analysis.confidence,
        sla: analysis.sla,
      },
    });

    setSubmitted(complaint);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (5MB = 5 * 1024 * 1024)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      e.target.value = null;
      return;
    }

    // Validate type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload an image (PNG, JPG, JPEG, WEBP) or PDF.");
      e.target.value = null;
      return;
    }

    setAttachment(file);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null); // No preview for PDF, just show icon
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // SUCCESS STATE
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">

        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-5">
          <Link
            to="/student"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </header>

        <main className="max-w-lg mx-auto px-4 py-16 text-center">

          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} />
          </div>

          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Complaint Submitted Successfully
          </h1>

          <p className="text-sm text-slate-500 mb-6">
            Your complaint has been registered and will be reviewed by the appropriate department.
          </p>

          <div className="bg-white border border-slate-200 rounded-lg p-5 text-left mb-6">

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400 font-medium">COMPLAINT ID</span>
              <span className="text-sm font-bold text-blue-600">{submitted.id}</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Title</span>
                <span className="font-medium text-slate-800 text-right max-w-[60%] truncate">{submitted.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-medium text-slate-800">{submitted.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Priority</span>
                <span className={`font-semibold ${
                  submitted.priority === "High" || submitted.priority === "Critical"
                    ? "text-red-600" : "text-amber-600"
                }`}>{submitted.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department</span>
                <span className="font-medium text-slate-800">{submitted.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-amber-600 font-semibold">Pending</span>
              </div>
            </div>

          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/student/complaint/${submitted.id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
            >
              View Complaint
            </button>
            <button
              onClick={() => navigate("/student")}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              Back to Dashboard
            </button>
          </div>

        </main>

      </div>
    );
  }

  // FORM STATE
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-5">

        <Link
          to="/student"
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="ml-5 border-l border-slate-200 pl-5">
          <p className="text-sm font-semibold text-slate-900">Submit Complaint</p>
          <p className="text-[10px] text-slate-400">Report your issue to the administration</p>
        </div>

      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        <div className="mb-6">
          <p className="text-[10px] font-semibold text-blue-600 tracking-widest uppercase">
            NEW COMPLAINT
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Tell us what happened
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Our system will analyze your complaint and route it to the correct department.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-5"
        >

          {/* FORM */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5">

            <h2 className="text-sm font-bold text-slate-900 mb-5">
              Complaint Information
            </h2>

            {/* TITLE */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Complaint Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Hostel Wi-Fi not working"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category {analysis && <span className="text-blue-500 font-normal">(AI suggested: {analysis.category})</span>}
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">

              {/* LOCATION */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Hostel Block B"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* PRIORITY */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Priority {analysis && <span className="text-blue-500 font-normal">(AI: {analysis.priority})</span>}
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select priority</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Describe your complaint *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Explain the issue in detail..."
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 outline-none resize-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* FILE */}
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center mb-5">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png,image/jpeg,image/webp,application/pdf"
              />
              
              {!attachment ? (
                <>
                  <Upload size={22} className="mx-auto text-slate-400 mb-1.5" />
                  <p className="text-xs font-semibold text-slate-700">Attach supporting evidence</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Images or PDF files up to 5MB</p>
                  <button type="button" onClick={handleFileClick} className="mt-2 text-xs text-blue-600 font-semibold">
                    Choose File
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="h-24 object-contain rounded-md border border-slate-200" />
                    ) : (
                      <div className="h-24 w-20 flex items-center justify-center bg-slate-100 rounded-md border border-slate-200 text-slate-400">
                        <FileIcon size={32} />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm"
                      title="Remove attachment"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-700 mt-2 truncate max-w-[200px]">
                    {attachment.name}
                  </p>
                  <button type="button" onClick={handleFileClick} className="mt-1 text-[10px] text-blue-600 font-medium">
                    Change File
                  </button>
                </div>
              )}
            </div>

            {/* ANALYZE */}
            <button
              type="button"
              onClick={analyzeComplaint}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition"
            >
              <Sparkles size={16} />
              {loading ? "Analyzing Complaint..." : "Analyze with AI"}
            </button>

          </div>

          {/* AI PANEL */}
          <div className="space-y-4">

            {!analysis ? (

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">

                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-blue-600" />
                  <h3 className="text-sm font-bold text-blue-800">AI Complaint Analysis</h3>
                </div>

                <p className="text-xs text-blue-700 leading-5 mb-4">
                  Submit your complaint details and our system will automatically identify the
                  category, priority and responsible department.
                </p>

                <div className="space-y-2.5">
                  {["Automatic categorization", "Priority detection", "Department routing", "SLA estimation"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-blue-700">
                      <CheckCircle2 size={13} className="text-blue-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

              </div>

            ) : (

              <div className="bg-white border border-slate-200 rounded-lg p-5">

                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">AI Analysis Result</h3>
                </div>

                <div className="space-y-3.5">

                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">CATEGORY</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{analysis.category}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">DEPARTMENT</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{analysis.department}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">PRIORITY</p>
                    <span className={`inline-block mt-0.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      analysis.priority === "Critical" || analysis.priority === "High"
                        ? "bg-red-50 text-red-600"
                        : analysis.priority === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {analysis.priority}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">CONFIDENCE</p>
                    <span className={`inline-block mt-0.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      analysis.confidence === "High"
                        ? "bg-emerald-50 text-emerald-600"
                        : analysis.confidence === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {analysis.confidence}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">EXPECTED SLA</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{analysis.sla}</p>
                  </div>

                </div>

                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <div className="flex gap-2">
                    <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-amber-700 leading-4">
                      Please review the AI classification. You can override the category and priority using the form fields.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-semibold transition"
                >
                  Submit Complaint
                </button>

              </div>

            )}

            {/* DUPLICATE SUGGESTIONS */}
            {duplicates.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <h4 className="text-xs font-bold text-amber-800 mb-2">
                  ⚠ Possible Related Complaints
                </h4>
                <div className="space-y-2">
                  {duplicates.map((dup) => (
                    <div key={dup.complaint.id} className="flex items-center justify-between text-xs">
                      <div className="min-w-0 flex-1">
                        <p className="text-amber-800 font-medium truncate">{dup.complaint.title}</p>
                        <p className="text-amber-600">{dup.complaint.id} • {dup.similarity}% similar</p>
                      </div>
                      <ArrowRight size={12} className="text-amber-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-600 mt-2">
                  Your complaint may already be reported. You can still submit it.
                </p>
              </div>
            )}

          </div>

        </form>

      </main>

    </div>
  );
}

export default SubmitComplaint;