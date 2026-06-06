import React, { useState, useEffect } from "react";
import axios from "axios";

const PRegister = ({ onClose, mode, setMode, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    sex: "",
    age: "",
    bloodGroup: "",
    hospital: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  // 🟢 SCROLL LOCK LOGIC (Background freeze)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= 🔒 SECURE AUTH HANDLER =================
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      let response;
      if (mode === "register") {
        if (formData.password !== formData.confirmPassword) {
          return alert("Passwords do not match!");
        }
        // Registration API Call
        response = await axios.post("https://lifedrop-backend-orz5.onrender.com/api/patients/register", formData);
      } else {
        // Login API Call
        response = await axios.post("https://lifedrop-backend-orz5.onrender.com/api/patients/login", {
          patientId: formData.patientId,
          password: formData.password
        });
      }

      // 🔴 CRITICAL SUCCESS CHECK
      if (response.data && response.data.success) {
        // Save to LocalStorage
        localStorage.setItem("token", response.data.token || "session-active");
        localStorage.setItem("patientUser", JSON.stringify(response.data.patient));
        alert("Medical Staff Verification Successful! Redirecting...");
        onLoginSuccess();
      } else {
        alert(response.data.message || "Medical credentials verification failed!");
      }

    } catch (error) {
      console.error("Auth Error:", error);
      const errMsg = error.response?.data?.message || "Server Error. Please check your network.";
      alert(errMsg);
    }finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 sm:p-6 select-none animate-[fadeIn_.2s_ease]">
      
      {/* 🔴 BACKDROP SMOOTH GLASS */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      {/* 🔴 MAIN MODAL CONTAINER */}
      <div className="relative z-10 w-full max-w-4xl h-auto max-h-[85vh] sm:max-h-[90vh] md:h-[600px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 md:top-4 md:right-4 z-50 flex h-8 w-8 items-center justify-center rounded-xl bg-gray-200/80 text-gray-700 hover:bg-gray-300 transition-all cursor-pointer"
        > 
          ✕ 
        </button>

        {/* 🔴 PREMIUM LEFT PANEL (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-[45%] lg:w-[40%] bg-[#880808] p-8 flex-col justify-between text-white relative overflow-hidden shrink-0">
          {/* Background Icon Glow */}
          <div className="absolute top-[-10%] right-[-10%] opacity-10 pointer-events-none">
            <svg width="260" height="260" fill="none" stroke="white" strokeWidth="1">
              <circle cx="130" cy="130" r="120" />
            </svg>
          </div>

          {/* Top Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                🏥
              </div>
              <span className="font-[700] text-xl tracking-tight">
                Clinical Portal
              </span>
            </div>

            <h2 className="text-[30px] font-[600] leading-[1.1] mb-5 tracking-tight">
              Medical <br />
              <span className="text-red-300 italic font-serif">
                Practitioner
              </span> <br />
              Oversight
            </h2>

            <div className="space-y-3">
              <div className="h-1 w-12 bg-red-400 rounded-full"></div>
              <p className="text-red-100 text-sm leading-relaxed max-w-[240px]">
                Access and authorize life-saving blood requests, monitor nearby patient emergencies, and track real-time donor distributions.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 space-y-4">
            <div className="h-[1px] w-full bg-white/20"></div>

            {/* Card */}
            <div className="bg-white/10 backdrop-blur-xl p-5 rounded-[20px] border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500/30 rounded-lg">
                  🩺
                </div>
                <div>
                  <p className="text-[11px] font-[700] uppercase tracking-[2px] text-red-200">
                    Doctor Clearance
                  </p>
                  <p className="text-[10px] text-white/60">
                    Real-time hospital oversight
                  </p>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-white/90 italic">
                Verified clinical entry ensures instant deployment of blood units, zero transmission delays, and optimized emergency handling.
              </p>

              {/* Mini Stats */}
              <div className="flex justify-between mt-4 text-center">
                <div>
                  <p className="text-lg font-bold text-white">24/7</p>
                  <p className="text-[10px] text-white/60">Duty Access</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Direct</p>
                  <p className="text-[10px] text-white/60">Routing</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Secure</p>
                  <p className="text-[10px] text-white/60">Logs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔵 RIGHT SIDE (Form Area) */}
        <div className="flex-1 flex flex-col bg-[#fafafa] min-w-0 min-h-0">
          
          {/* HEADER ROW (FIXED OVERLAP) */}
          <div className="pt-14 sm:pt-8 pb-3 px-5 md:px-8 shrink-0">
            <div className="mb-5 sm:mb-6">
              <div className="flex bg-gray-200/60 rounded-full p-1 shadow-inner border border-gray-100">
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`w-1/2 py-2 sm:py-2.5 text-xs sm:text-sm font-[500] rounded-full transition-all duration-300 cursor-pointer
                  ${mode === "register"
                      ? "bg-[#880808] text-white shadow-md"
                      : "text-gray-500 hover:text-gray-800"
                    }`}
                > Register Staff </button>

                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`w-1/2 py-2 sm:py-2.5 text-xs sm:text-sm font-[500] rounded-full transition-all duration-300 cursor-pointer
                  ${mode === "login"
                      ? "bg-[#880808] text-white shadow-md"
                      : "text-gray-500 hover:text-gray-800"
                    }`}
                > Staff Login </button>
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-xl sm:text-2xl font-[600] tracking-tight text-red-900">
              {mode === "login" ? "Medical Staff Login" : "Practitioner Registration"}
            </h2>

            {/* SUBTEXT */}
            <p className="text-[11px] sm:text-xs mt-1 text-gray-500 font-medium">
              {mode === "login"
                ? "Access supervisor clinical dashboards securely"
                : "Hospital Administration Registry System"}
            </p>
          </div>

          <hr className="border-t border-gray-100 shrink-0 m-0 p-0" />
              
          {/* 🔴 FORM WRAPPER (To enable Enter/Go Key) */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* SCROLLABLE FORM CONTAINER */}
            <div className="flex-1 overflow-y-auto overscroll-contain custom-red-scrollbar px-5 md:px-8 py-5">
              {mode === "register" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {/* Patient ID Field mapped as Doctor Staff ID */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                      License / Staff ID
                    </label>
                    <input
                      name="patientId" required
                      value={formData.patientId}
                      onChange={handleChange}
                      placeholder="e.g., DOC-9921"
                      className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold transition"
                    />
                  </div>

                  {/* Full Name Mapped as Physician Name */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                      Physician Name
                    </label>
                    <input
                      name="name" required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Without 'Dr.'"
                      className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold transition"
                    />
                  </div>

                  {/* SEX + AGE */}
                  <div className="grid grid-cols-2 gap-3 md:contents">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                        Gender
                      </label>
                      <select 
                        name="sex" required
                        value={formData.sex}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-[12px] border border-gray-200 bg-white focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                        Age
                      </label>
                      <input
                        name="age" required
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="35"
                        className="w-full px-3 py-2.5 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* BLOOD + HOSPITAL */}
                  <div className="grid grid-cols-2 gap-3 md:contents">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                        Blood Group
                      </label>
                      <select 
                        name="bloodGroup" required
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-[12px] border border-gray-200 bg-white focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                        Base Hospital
                      </label>
                      <input
                        name="hospital" required
                        value={formData.hospital}
                        onChange={handleChange}
                        placeholder="City General"
                        className="w-full px-3 py-2.5 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                      Access Password
                    </label>
                    <input
                      name="password" required
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="md:col-span-2">
                    <label className="block text-[11px] sm:text-xs font-[500] text-gray-600 mb-1.5 uppercase tracking-wide">
                      Confirm Access Password
                    </label>
                    <input
                      name="confirmPassword" required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter access password"
                      className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Staff Identification ID
                    </label>
                    <input
                      name="patientId" required
                      value={formData.patientId}
                      onChange={handleChange}
                      placeholder="Enter License or Staff ID"
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Account Password
                    </label>
                    <input
                      name="password" required
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#880808] focus:ring-2 focus:ring-[#880808]/20 outline-none text-sm font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-4 md:p-5 bg-white border-t border-gray-100 shrink-0">
              <button 
                type="submit" /* 🔴 YAHAN TYPE SUBMIT LAGA HAI, ONCLICK HATA DIYA */
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#880808] hover:bg-red-800 text-white font-bold py-3 sm:py-3.5 text-xs sm:text-sm tracking-wide uppercase rounded-[14px] transition-all active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    {/* 🌀 CIRCULAR SPINNER SVG */}
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating Matrix...
                  </>
                ) : (
                  mode === "login" ? "AUTHORIZE & LOGIN" : "REGISTER CLINICAL STAFF"
                )}
              </button>
            </div>
            
          </form> 
        </div>

      </div>

      {/* SCROLLBAR STYLE */}
      <style>{`
        .custom-red-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-red-scrollbar::-webkit-scrollbar-thumb {
          background-color: #880808;
          border-radius: 10px;
        }
        .custom-red-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-red-scrollbar {
          scrollbar-color: #880808 transparent;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
};

export default PRegister;