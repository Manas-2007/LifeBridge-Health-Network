import React, { useState, useEffect } from 'react';
import { Droplets, Heart } from 'lucide-react';
import axios from 'axios'; 

const DRegister = ({ onClose, mode, setMode, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    phone: '',
    lastDonation: '',
    location: '' 
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

  // ================= 📤 POST AUTHENTICATION PROCESS ENGINE =================
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Safety checkpoints during Registration phase
    if (mode === "register" && formData.password !== formData.confirmPassword) {
      alert("Validation Alert: Passwords matrix do not match!");
      return;
    }

    try {
      setLoading(true);
      let response;

      if (mode === "register") {
        // 1. HIT REGISTRATION SIGNUP PIPELINE
        const signupPayload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          bloodGroup: formData.bloodGroup,
          role: 'Donor', 
          address: formData.location
        };
        
        response = await axios.post('https://lifedrop-backend-orz5.onrender.com/api/auth/signup', signupPayload);
      } else {
        // 2. HIT SESSION LOGIN PIPELINE
        const loginPayload = {
          email: formData.email,
          password: formData.password
        };
        
        response = await axios.post('https://lifedrop-backend-orz5.onrender.com/api/auth/login', loginPayload);
      }

      if (response.data.success) {
        const userData = response.data.user;

        // Secure tokens and metrics globally into standard cache logs
        localStorage.setItem('token', 'active-verified-session-token-2026');
        localStorage.setItem('user', JSON.stringify({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          bloodGroup: userData.bloodGroup,
          location: userData.address, // City data node maps
          phone: userData.phone,
          role: 'donor'
        }));
        localStorage.setItem('userType', 'donor');

        setLoading(false);
        alert(`Authentication established for ${userData.name}!`);
        onLoginSuccess(); 
        onClose(); 
      }
    } catch (error) {
      console.error("Crash processing authentication layer context:", error);
      setLoading(false);
      alert(error.response?.data?.message || "Authentication validation handshake failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 sm:p-6 font-sans select-none animate-[fadeIn_.2s_ease]"> 
      
      {/* 🔴 PREMIUM LIGHT BLUR BACKDROP */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
      />

      {/* MODAL CARD */}
      <div className="relative z-10 w-full max-w-[900px] h-auto max-h-[85vh] sm:max-h-[90vh] md:h-[85vh] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row">

        {/* CLOSE BUTTON (FIXED OVERLAP & STYLING) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-50 flex h-8 w-8 items-center justify-center rounded-xl bg-gray-200/80 md:bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all cursor-pointer"
        >
          ✕
        </button>

        {/* Left Side: Premium Branding (Desktop Only - UNTOUCHED) */}
        <div className="hidden md:flex md:w-[38%] bg-[#880808] p-12 flex-col justify-between text-white relative overflow-hidden shrink-0">
          <div className="absolute top-[-10%] right-[-10%] opacity-10 pointer-events-none">
            <Droplets size={300} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            {/* LOGO */}
            <div className="flex items-center gap-3 mb-7">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                <Droplets className="text-white w-6 h-6" />
              </div>
              <span className="font-[700] text-2xl tracking-tighter">LifeDrop</span>
            </div>

            {/* MAIN HEADING */}
            <h2 className="text-[35px] font-[600] leading-[1.1] mb-6 tracking-tighter">
              Be the <br/> 
              <span className="text-red-300 font-serif italic capitalize">Reason</span> <br/>
              for a Life.
            </h2>

            <div className="space-y-4">
              <div className="h-1 w-12 bg-red-400 rounded-full"></div>
              <p className="text-red-100 text-lg font-medium leading-relaxed max-w-[260px]">
                Your single donation can save up to{" "}
                <span className="text-white font-bold underline decoration-red-400 underline-offset-4">
                  three lives
                </span>.
              </p>
            </div>
          </div>

          {/* BOTTOM CARD */}
          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-5 rounded-[24px] border border-white shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-1.5 bg-red-500/30 rounded-lg">
                <Heart className="w-4 h-4 text-red-200 fill-red-200" />
              </div>
              <p className="text-[13px] font-[700] uppercase tracking-[2px] text-red-200">
                Donor Excellence
              </p>
            </div>
            <p className="text-[13px] font-medium leading-snug text-white/90 italic">
              Join donor's community of life savers.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[62%] flex flex-col bg-[#fafafa] h-full min-h-0">

          {/* HEADER (FIXED: Matched Doctor's Light Theme) */}
          <div className="pt-14 sm:pt-8 pb-3 px-5 md:px-8 shrink-0">
            {/*  TOGGLE (PILL STYLE) */}
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
                > Register Donor </button>

                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`w-1/2 py-2 sm:py-2.5 text-xs sm:text-sm font-[500] rounded-full transition-all duration-300 cursor-pointer
                  ${mode === "login"
                      ? "bg-[#880808] text-white shadow-md"
                      : "text-gray-500 hover:text-gray-800"
                    }`}
                > Donor Login </button>
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-xl sm:text-2xl font-[600] tracking-tight text-red-900">
              {mode === "login" ? "Donor Login" : "Donor Registration"}
            </h2>

            {/* SUBTEXT */}
            <p className="text-[11px] sm:text-xs mt-1 text-gray-500 font-medium">
              {mode === "login"
                ? "Welcome back, please sign in to your account"
                : "Join the community & save lives today"}
            </p>
          </div>

          {/* FORM CONTAINER */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
              
              {/* SCROLLABLE AREA */}
              <div className="flex-1 overflow-y-auto overscroll-contain custom-red-scrollbar px-5 md:px-6 pt-5 md:pt-1 pb-4 space-y-3 md:space-y-2">
                {mode === "register" ? (
                  <>
                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Full Name</label>
                        <input 
                          name="name" required
                          value={formData.name} 
                          onChange={handleChange} 
                          type="text" placeholder="Vinay Joshi"
                          className="w-full px-4 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Email Address</label>
                        <input 
                          name="email" required
                          value={formData.email} 
                          onChange={handleChange} 
                          type="email" placeholder="john@example.com"
                          className="w-full px-4 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Password</label>
                        <input 
                          name="password" required
                          value={formData.password} 
                          onChange={handleChange} 
                          type="password" placeholder="••••••••"
                          className="w-full px-4 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Confirm Password</label>
                        <input 
                          name="confirmPassword" required
                          value={formData.confirmPassword} 
                          onChange={handleChange} 
                          type="password" placeholder="••••••••"
                          className="w-full px-4 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                    </div>

                    {/* BLOOD + PHONE */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Blood Group</label>
                        <select 
                          name="bloodGroup" required
                          value={formData.bloodGroup} 
                          onChange={handleChange} 
                          className="w-full px-3 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 bg-white focus:border-[#880808] outline-none text-sm text-neutral-800 transition-colors"
                        >
                          <option value="">Select</option>
                          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Contact Number</label>
                        <input 
                          name="phone" required
                          value={formData.phone} 
                          onChange={handleChange} 
                          type="tel" placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                    </div>

                    {/* DATE + CITY */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">Last Donation</label>
                        <input 
                          name="lastDonation" 
                          value={formData.lastDonation} 
                          onChange={handleChange} 
                          type="date"
                          className="w-full px-3 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-xs font-[500] text-gray-700 uppercase tracking-widest mb-1.5">City</label>
                        <input 
                          name="location" required
                          value={formData.location} 
                          onChange={handleChange} 
                          type="text" placeholder="Gwalior, India"
                          className="w-full px-4 py-2.5 md:py-2 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* LOGIN MODE */
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[11px] md:text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Email Address</label>
                      <input 
                        name="email" required
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" placeholder="john@example.com"
                        className="w-full px-4 py-3 md:py-2.5 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] md:text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Password</label>
                      <input 
                        name="password" required
                        value={formData.password} 
                        onChange={handleChange} 
                        type="password" placeholder="••••••••"
                        className="w-full px-4 py-3 md:py-2.5 rounded-[12px] border-2 border-[#880808]/20 focus:border-[#880808] outline-none font-semibold text-sm text-neutral-800 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER (SHRINK-0 ensures it stays at bottom) */}
              <div className="p-4 md:p-5 bg-white border-t border-gray-100 space-y-2 shrink-0">
                <button
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#880808] hover:bg-[#6d0606] active:scale-[0.98] text-white font-bold py-3 md:py-3.5 rounded-[14px] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed uppercase text-xs sm:text-sm tracking-wider shadow-md hover:shadow-lg"
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
                    mode === "login" ? "LOGIN" : "REGISTER AS DONOR"
                  )}
                </button>

                <p className="text-center text-[11px] md:text-xs font-semibold text-gray-700 pt-1">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <span
                    className="text-[#880808] font-bold cursor-pointer hover:underline"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                  >
                    {mode === "login" ? "Register" : "Login"}
                  </span>
                </p>
              </div> 
            </form>
          </div>

          <style>{`
            .custom-red-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .custom-red-scrollbar::-webkit-scrollbar-thumb {
              background-color: #880808;
              border-radius: 10px;
            }
            .custom-red-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #880808 transparent;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default DRegister;