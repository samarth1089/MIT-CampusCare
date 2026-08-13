import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "student") {
      navigate("/student");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 mb-4">
            <GraduationCap size={32} className="text-indigo-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            CampusCare
          </h1>

          <p className="text-slate-500 mt-2">
            College Grievance Management System
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-md">

          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back
          </h2>

          <p className="text-slate-500 mt-1 mb-6">
            Sign in to continue
          </p>

          {/* Role */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg mb-6">

            <button
              type="button"
              onClick={() => setRole("student")}
              className={`py-2 rounded-md text-sm font-medium ${
                role === "student"
                  ? "bg-white shadow text-indigo-600"
                  : "text-slate-500"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`py-2 rounded-md text-sm font-medium ${
                role === "admin"
                  ? "bg-white shadow text-indigo-600"
                  : "text-slate-500"
              }`}
            >
              Administrator
            </button>

          </div>

          <form onSubmit={handleLogin}>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              College Email
            </label>

            <input
              type="email"
              placeholder="you@college.edu"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Sign In
            </button>

          </form>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
            <ShieldCheck size={14} className="text-indigo-500" />
            Secure college grievance portal
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;