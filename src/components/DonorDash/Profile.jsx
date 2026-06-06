import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiShield, 
  FiCheckCircle, FiDroplet, FiHeart, FiActivity, FiAward, FiCompass, FiSave 
} from "react-icons/fi";

const Profile = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('biometrics');
  
  const [isEditingBiometrics, setIsEditingBiometrics] = useState(false);
  
  const userData = user || {
    name: "Aanya Verma",
    email: "aanya.verma@domain.com",
    bloodGroup: "O+",
    location: "Bhopal, Madhya Pradesh",
    phone: "+91 98765 43210",
  };

  // 🔴 LOCAL STATE FOR BIOMETRICS 
  const [biometrics, setBiometrics] = useState({
    weight: userData.weight || "72",
    height: userData.height || "178",
    age: userData.age || "24"
  });

  const handleBiometricChange = (field, value) => {
    setBiometrics(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name[0].toUpperCase();
  };

  return (
    <div className="bg-transparent pb-16 w-full px-2 sm:px-4 select-none animate-[fadeIn_0.5s_ease-out] mt-4 md:mt-0 lg:mt-2">

      {/* ================= 🔴GLASS OVERLAY HERO HEAD ================= */}
      <div className="relative bg-gradient-to-br from-white via-white to-gray-50/40 rounded-3xl p-5 sm:p-6 md:p-10 border border-gray-400/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden mb-6 sm:mb-8 text-left group">
        
        {/* Designer Background Vector Elements */}
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-bl from-red-500/10 via-transparent to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gray-50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-5 sm:gap-6 w-full">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-neutral-900 rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-500 hover:rotate-3">
                {getInitials(userData.name)}
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 bg-[#880808] text-white w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-[3px] sm:border-4 border-white flex flex-col items-center justify-center font-bold text-[10px] sm:text-xs shadow-md">
                {userData.bloodGroup}
              </div>
            </div>

            {/* Title Identity Parameters Block */}
            <div className="text-center sm:text-left min-w-0 w-full sm:w-auto">
              
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight leading-none">
                  {userData.name}
                </h1>
                <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-2.5 sm:py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/50 uppercase tracking-widest shadow-sm shadow-emerald-100/40">
                  <FiCheckCircle size={12} className="animate-pulse shrink-0" /> Verified Donor
                </span>
              </div>
              
              <p className="text-gray-400 font-medium mt-2 flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm">
                <FiMapPin className="text-[#880808] shrink-0" size={15} /> {userData.location}
              </p>

              <div className="mt-4 sm:mt-5 flex items-center justify-center sm:justify-start gap-2.5 w-full">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2.5 sm:py-2 rounded-xl font-semibold text-[11px] sm:text-xs tracking-wide transition-all shadow-sm active:scale-95 flex-1 sm:flex-none"
                >
                  <FiEdit2 size={13} /> Edit Profile
                </button>
                <button className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:border-neutral-300 text-neutral-600 px-4 py-2.5 sm:py-2 rounded-xl font-semibold text-[11px] sm:text-xs tracking-wide transition-all shadow-sm flex-1 sm:flex-none">
                  <FiShield size={13} /> Privacy
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* ================= 🔴 ASYMMETRIC SYSTEM DASHBOARD GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">

        {/* CORE DATA CONTROL ZONE (Left Workspace) */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          
          {/* SEC 1: COMPACT DATA MODULE */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 border border-gray-400/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] text-left">
            <h3 className="text-[15px] sm:text-lg font-bold text-neutral-900 tracking-wide mb-4 sm:mb-6">
              Personal Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: FiUser, label: "Full Name Mapping", value: userData.name },
                { icon: FiMail, label: "Registered Email Address", value: userData.email },
                { icon: FiPhone, label: "Secure Contact Phone", value: userData.phone },
                { icon: FiDroplet, label: "Assigned Blood Matrix", value: `${userData.bloodGroup} (Whole Blood Only)` }
              ].map((item, i) => (
                <div key={i} className="space-y-1.5 group/field">
                  <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover/field:text-[#880808]">
                    <item.icon size={12} />
                    {item.label}
                  </label>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 p-2.5 sm:p-3 bg-gray-50/50 rounded-xl border border-gray-200/40 break-words shadow-inner transition-colors group-hover/field:bg-white group-hover/field:border-neutral-500">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SEC 2: BIOMETRIC CAPABILITY PANEL */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 border border-gray-400/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] text-left relative">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-[15px] sm:text-lg font-bold text-neutral-900 tracking-wide flex items-center gap-2">
                <FiActivity className="text-[#880808]" />
                Biometric Registry
              </h3>
              <button 
                onClick={() => {
                  if (isEditingBiometrics) {
                    if (onUpdateProfile) {
                      onUpdateProfile({ 
                        age: biometrics.age, 
                        weight: biometrics.weight, 
                        height: biometrics.height 
                      });
                    }
                  }
                  setIsEditingBiometrics(!isEditingBiometrics);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
                  isEditingBiometrics 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {isEditingBiometrics ? (
                  <><FiSave size={12} /> Save</>
                ) : (
                  <><FiEdit2 size={12} /> Edit</>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { key: 'weight', label: "Patient Mass", value: biometrics.weight, unit: "kg" },
                { key: 'height', label: "Vertical Scale", value: biometrics.height, unit: "cm" },
                { key: 'age', label: "Age Metric", value: biometrics.age, unit: "Yrs" }
              ].map((m, i) => (
                <div key={i} className={`text-center p-2.5 sm:p-4 border rounded-2xl relative overflow-hidden group transition-all ${
                  isEditingBiometrics ? 'bg-white border-red-300 shadow-inner' : 'bg-gradient-to-b from-red-50/30 to-red-50/10 border-red-500/40'
                }`}>
                  <p className="text-[7px] sm:text-[9px] font-bold text-red-700/80 uppercase tracking-widest mb-1">
                    {m.label}
                  </p>
                  
                  {isEditingBiometrics ? (
                    <input 
                      type="number" 
                      value={m.value}
                      onChange={(e) => handleBiometricChange(m.key, e.target.value)}
                      className="w-full text-center text-xs sm:text-base font-bold text-neutral-900 tracking-tight bg-transparent border-b border-red-200 focus:border-[#880808] outline-none pb-0.5 transition-colors"
                    />
                  ) : (
                    <p className="text-xs sm:text-base font-bold text-neutral-800 tracking-tight mt-1">
                      {m.value} <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">{m.unit}</span>
                    </p>
                  )}
                  
                  {isEditingBiometrics && (
                    <span className="text-[7px] sm:text-[8px] font-semibold text-gray-400 uppercase tracking-widest mt-1 block">
                      {m.unit}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* METRICS SIDEBAR COMPONENT (Right Column) */}
        <div className="space-y-5 sm:space-y-6">

          {/* SEC 3: EXECUTIVE DONOR FOOTPRINT OVERLAY */}
          <div className="bg-neutral-950 rounded-3xl p-5 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-[0_12px_30px_-8px_rgba(0,0,0,0.2)] text-left group">
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-white transition-transform duration-700 group-hover:scale-110 pointer-events-none">
              <FiAward size={150} />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-bl-full pointer-events-none" />

            <h3 className="text-sm sm:text-base font-bold tracking-wide mb-5 sm:mb-6 flex items-center gap-2">
              <FiHeart className="text-red-500 shrink-0 animate-pulse" />
              Donor Footprint Impact
            </h3>

            <div className="space-y-3 sm:space-y-4 relative z-10 text-xs sm:text-sm">
              {[
                { k: "Donor Tenure Since", v: "2023", highlight: "text-neutral-200" },
                { k: "Lifetime Impact", v: "36 Lives Saved", highlight: "text-red-400 font-bold" },
                { k: "Next Cycle Window", v: "June 2026", highlight: "text-emerald-400 font-bold" }
              ].map((d, i) => (
                <div key={i} className="flex justify-between items-baseline border-t border-white/[0.06] pt-3 sm:pt-4 first:border-0 first:pt-0">
                  <span className="text-neutral-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                    {d.k}
                  </span>
                  <span className={`tracking-wide text-[11px] sm:text-sm ${d.highlight}`}>
                    {d.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SEC 4: INSIGHT INFORMATION BOX */}
          <div className="p-4 sm:p-5 bg-red-50/50 rounded-2xl border border-red-100/50 text-left flex flex-col gap-1.5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-red-100/40 pointer-events-none">
              <FiCompass size={60} />
            </div>
            <h4 className="font-bold text-[#880808] text-[11px] sm:text-sm uppercase tracking-wide flex items-center gap-2">
              <FiDroplet className="text-red-600 shrink-0" size={14} />
              Clinical Health Insight
            </h4>
            <p className="text-[10px] sm:text-xs text-red-800 font-medium leading-relaxed mt-0.5">
              Maintaining regular donation habits enhances total vascular circulation cycles and safely supports optimal metabolic iron balance thresholds within body systems.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;