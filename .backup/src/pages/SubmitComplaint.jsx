import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { addComplaint } from "../services/complaintService";

function SubmitComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const analyzeComplaint = () => {
    if (!form.title || !form.description) {
      alert("Please enter complaint title and description.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const text = (
        form.title +
        " " +
        form.description
      ).toLowerCase();

      let category = "General";
      let department = "Administration";
      let priority = "Medium";
      let sentiment = "Negative";
      let sla = "48 hours";

      if (
        text.includes("wifi") ||
        text.includes("internet") ||
        text.includes("network") ||
        text.includes("computer")
      ) {
        category = "IT & Network";
        department = "IT Department";
        priority = "High";
        sla = "24 hours";
      } else if (
        text.includes("hostel") ||
        text.includes("room") ||
        text.includes("water")
      ) {
        category = "Hostel";
        department = "Hostel Administration";
        priority = "High";
        sla = "24 hours";
      } else if (
        text.includes("fee") ||
        text.includes("payment") ||
        text.includes("scholarship")
      ) {
        category = "Finance";
        department = "Finance Department";
        priority = "Medium";
        sla = "48 hours";
      } else if (
        text.includes("teacher") ||
        text.includes("exam") ||
        text.includes("class") ||
        text.includes("marks")
      ) {
        category = "Academics";
        department = "Academic Department";
        priority = "Medium";
        sla = "48 hours";
      }

      setAnalysis({
        category,
        department,
        priority,
        sentiment,
        sla,
      });

      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!analysis) {
      alert("Please analyze the complaint first.");
      return;
    }

    const complaint = addComplaint({
      student: "Samarth Bonde",
      title: form.title,
      description: form.description,
      category: analysis.category,
      department: analysis.department,
      priority: analysis.priority,
      sentiment: analysis.sentiment,
      sla: analysis.sla,
      status: "Pending",
      assignedTo: analysis.department,
      location: form.location,
    });

    alert(
      `Complaint ${complaint.id} submitted successfully!`
    );

    navigate("/student");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
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
            Submit Complaint
          </p>

          <p className="text-xs text-slate-400">
            Report your issue to the college administration
          </p>

        </div>

      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="mb-8">

          <p className="text-sm text-indigo-600 font-semibold">
            NEW COMPLAINT
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Tell us what happened
          </h1>

          <p className="text-slate-500 mt-2">
            Our AI will analyze your complaint and route it to
            the correct department.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-6"
        >

          {/* FORM */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-bold text-slate-900 mb-6">
              Complaint Information
            </h2>

            {/* TITLE */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Complaint Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Hostel Wi-Fi not working"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* CATEGORY */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >

                <option value="">
                  Select category
                </option>

                <option value="Academics">
                  Academics
                </option>

                <option value="IT & Network">
                  IT & Network
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Finance">
                  Finance
                </option>

                <option value="Facilities">
                  Facilities
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            {/* LOCATION */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Hostel Block B"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* DESCRIPTION */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Describe your complaint
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="7"
                placeholder="Explain the issue in detail..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* FILE */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">

              <Upload
                size={25}
                className="mx-auto text-slate-400 mb-2"
              />

              <p className="text-sm font-semibold text-slate-700">
                Attach supporting evidence
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Images or PDF files up to 5MB
              </p>

              <button
                type="button"
                className="mt-3 text-sm text-indigo-600 font-semibold"
              >
                Choose File
              </button>

            </div>

            {/* ANALYZE */}
            <button
              type="button"
              onClick={analyzeComplaint}
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2"
              >

             <Sparkles size={18} className="text-indigo-100" />

              {loading
                ? "Analyzing Complaint..."
                : "Analyze with AI"}

            </button>

          </div>

          {/* AI PANEL */}
          <div className="space-y-6">

            {!analysis ? (

              <div className="bg-indigo-50 text-indigo-800 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-4">

                  <Sparkles
                    size={19}
                    className="text-indigo-600"
                  />

                  <h3 className="font-bold text-indigo-800">
                    AI Complaint Analysis
                  </h3>

                </div>

                <p className="text-sm text-indigo-700 leading-6">
                  Submit your complaint details and our AI
                  system will automatically identify the
                  category, priority and responsible department.
                </p>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-3 text-sm text-indigo-700">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    Automatic categorization
                  </div>

                  <div className="flex items-center gap-3 text-sm text-indigo-700">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    Priority detection
                  </div>

                  <div className="flex items-center gap-3 text-sm text-indigo-700">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    Department routing
                  </div>

                  <div className="flex items-center gap-3 text-sm text-indigo-700">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    SLA estimation
                  </div>

                </div>

              </div>

            ) : (

              <div className="bg-white border border-slate-200 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-5">

                  <Sparkles
                    size={19}
                    className="text-indigo-600"
                  />

                  <h3 className="font-bold text-slate-900">
                    AI Analysis Result
                  </h3>

                </div>

                <div className="space-y-4">

                  <div>
                    <p className="text-xs text-slate-400">
                      CATEGORY
                    </p>

                    <p className="font-semibold text-slate-900 mt-1">
                      {analysis.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      DEPARTMENT
                    </p>

                    <p className="font-semibold text-slate-900 mt-1">
                      {analysis.department}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      PRIORITY
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        analysis.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {analysis.priority}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      SENTIMENT
                    </p>

                    <p className="font-semibold text-slate-900 mt-1">
                      {analysis.sentiment}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      EXPECTED SLA
                    </p>

                    <p className="font-semibold text-slate-900 mt-1">
                      {analysis.sla}
                    </p>
                  </div>

                </div>

                <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">

                  <div className="flex gap-2">

                    <AlertTriangle
                      size={18}
                      className="text-amber-600 mt-0.5"
                    />

                    <p className="text-xs text-amber-700 leading-5">
                      Please review the AI classification before
                      submitting your complaint.
                    </p>

                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-semibold"
                >
                  Submit Complaint
                </button>

              </div>

            )}

          </div>

        </form>

      </main>

    </div>
  );
}

export default SubmitComplaint;