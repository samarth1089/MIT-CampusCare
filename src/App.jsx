import "./App.css";
import mitCampus from "./assets/campus.jpeg";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { GraduationCap, ShieldCheck, Mail, Lock, Eye } from "lucide-react";

import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminProfile from "./pages/AdminProfile";
import MyComplaints from "./pages/MyComplaints";
import StudentProfile from "./pages/StudentProfile";

import { login, isAuthenticated, getCurrentUser, registerStudent } from "./services/authService";

function ProtectedRoute({ children, allowedRole }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  
  const user = getCurrentUser();
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === "student" ? "/student" : "/admin"} replace />;
  }

  return children;
}

function LandingPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [isRegistering, setIsRegistering] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    
    if (isRegistering && role === "student") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const result = await registerStudent(identifier.trim(), password);
      if (result.success) {
        setIsRegistering(false);
        setSuccessMsg("Account created successfully. Please log in.");
        setIdentifier(identifier.trim());
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(result.error || "Registration failed.");
      }
      return;
    }
    
    const result = await login(identifier.trim(), password);
    
    if (result.success) {
      if (result.user.role === "student") {
        navigate("/student");
      } else {
        navigate("/admin");
      }
    } else {
      setError(result.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* NAVBAR */}
      <header className="h-20 bg-white flex items-center justify-between px-6 md:px-12 z-10 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-blue-900 leading-tight tracking-wide uppercase">
              Maharashtra Institute of Technology
            </h1>
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mt-0.5">
              CampusCare
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-bold text-slate-700">
            Student Grievance Portal
          </span>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 relative flex items-center">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mitCampus})` }}
        >
          <div className="absolute inset-0 bg-[#0B2A5B]/85"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* LEFT: Hero Copy */}
          <div className="flex-1 text-white max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Smart Grievance<br />Management System
            </h2>
            <p className="text-base md:text-lg text-blue-100/90 leading-relaxed mb-10 max-w-xl">
              A faster, transparent and smarter way for MIT students to report issues, track complaints and connect with the right department.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => {
                  document.getElementById("email-input").focus();
                }}
                className="bg-[#2563EB] hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                Submit a Complaint &rarr;
              </button>
              <button 
                onClick={() => {
                  document.getElementById("email-input").focus();
                }}
                className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition"
              >
                Track Complaint
              </button>
            </div>
          </div>

          {/* RIGHT: Embedded Login Card */}
          <div className="w-full max-w-md shrink-0">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 tracking-wider uppercase">MIT CampusCare</h3>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">Welcome Back</h2>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-6">
                  Sign in to access your grievance portal.
                </p>

                {/* Role Selector */}
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Portal</p>
                <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setRole("student");
                      setIsRegistering(false);
                      setIdentifier("");
                      setPassword("");
                      setConfirmPassword("");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition ${
                      role === "student" ? "bg-[#2563EB] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <GraduationCap size={16} />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole("admin");
                      setIsRegistering(false);
                      setIdentifier("");
                      setPassword("");
                      setConfirmPassword("");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition ${
                      role === "admin" ? "bg-[#2563EB] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <ShieldCheck size={16} />
                    Administrator
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email-input"
                      type={role === "admin" ? "email" : "text"}
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={role === "student" ? "Student Name" : "Email"}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm text-slate-900 placeholder-slate-400"
                    />
                    <div 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <Eye size={18} />
                    </div>
                  </div>

                  {isRegistering && role === "student" && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm text-slate-900 placeholder-slate-400"
                      />
                    </div>
                  )}

                  {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
                  {successMsg && <p className="text-xs text-emerald-500 font-semibold">{successMsg}</p>}

                  <button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-lg text-sm font-bold transition shadow-sm mt-2 flex items-center justify-center gap-2"
                  >
                    {isRegistering ? "Create Account" : "Sign In"} &rarr;
                  </button>
                </form>

              </div>
              
              <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
                {role === "student" ? (
                  <p className="text-xs text-slate-500 font-medium">
                    {isRegistering ? (
                      <>
                        Already have an account?{" "}
                        <button 
                          type="button" 
                          onClick={() => { 
                            setIsRegistering(false); 
                            setIdentifier(""); 
                            setPassword(""); 
                            setConfirmPassword(""); 
                            setError(""); 
                            setSuccessMsg(""); 
                          }} 
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Sign In
                        </button>
                      </>
                    ) : (
                      <>
                        Don't have an account?{" "}
                        <button 
                          type="button" 
                          onClick={() => { 
                            setIsRegistering(true); 
                            setIdentifier(""); 
                            setPassword(""); 
                            setConfirmPassword(""); 
                            setError(""); 
                            setSuccessMsg(""); 
                          }} 
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Create Student Account
                        </button>
                      </>
                    )}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 font-medium">
                    Use your institutional credentials to continue.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE (Includes embedded Login) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* ALIAS FOR /login to avoid double login flow */}
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* STUDENT DASHBOARD */}
        <Route path="/student" element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />

        {/* SUBMIT COMPLAINT */}
        <Route path="/student/complaint" element={
          <ProtectedRoute allowedRole="student">
            <SubmitComplaint />
          </ProtectedRoute>
        } />

        {/* COMPLAINT DETAILS */}
        <Route path="/student/complaint/:id" element={
          <ProtectedRoute allowedRole="student">
            <ComplaintDetails />
          </ProtectedRoute>
        } />
        
        {/* MY COMPLAINTS */}
        <Route path="/student/complaints" element={
          <ProtectedRoute allowedRole="student">
            <MyComplaints />
          </ProtectedRoute>
        } />
        
        {/* STUDENT PROFILE */}
        <Route path="/student/profile" element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        } />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* ADMIN COMPLAINTS */}
        <Route path="/admin/complaints" element={
          <ProtectedRoute allowedRole="admin">
            <AdminComplaints />
          </ProtectedRoute>
        } />

        {/* ADMIN COMPLAINT DETAILS */}
        <Route path="/admin/complaint/:id" element={
          <ProtectedRoute allowedRole="admin">
            <ComplaintDetails />
          </ProtectedRoute>
        } />
        
        {/* ADMIN ANALYTICS */}
        <Route path="/admin/analytics" element={
          <ProtectedRoute allowedRole="admin">
            <AdminAnalytics />
          </ProtectedRoute>
        } />
        
        {/* ADMIN PROFILE */}
        <Route path="/admin/profile" element={
          <ProtectedRoute allowedRole="admin">
            <AdminProfile />
          </ProtectedRoute>
        } />

        {/* UNKNOWN ROUTES */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;