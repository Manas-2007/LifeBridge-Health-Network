import React from 'react';
import { LuUser, LuMail, LuPhone, LuMapPin, LuDroplets, LuShieldAlert, LuPencil, LuActivity, LuCalendarCheck } from "react-icons/lu";

const Profile = ({ user }) => {
  // 🔴 SMART DOCTOR IDENTITY LOGIC (Synced with Navbar)
  const validName = user?.name || user?.patientName || "Doctor";
  const displayName = validName.toLowerCase().startsWith('dr') ? validName : `Dr. ${validName}`;
  const initial = validName === "Doctor" ? "D" : validName.charAt(0).toUpperCase();

  // 🔴 HYBRID DATA MAPPING
  const doctorData = {
    name: displayName,
    id: user?.patientId || "ID-UNASSIGNED",
    bloodGroup: user?.bloodGroup || "N/A",
    hospital: user?.hospital || "Registered Medical Center",
    // Premium Dummy Data for missing fields
    email: "secure.staff@lifedrop.network", 
    phone: "Classified (Hospital Internal Ext.)", 
    emergencyContact: "Central Hospital Administration"
  };

  return (
<div className="bg-transparent pb-14 w-full mx-auto max-w-[1700px] select-none animate-[fadeIn_0.4s_ease-out] text-left">      
      {/* 🔴 1. EXECUTIVE ZONE COMPONENT BRAND HEADER */}
      <div className="flex items-center gap-3 mt-2 sm:mt-4 mb-6">
        <div className="bg-[#880808] p-2 rounded-xl text-white shadow-md shadow-red-900/20 shrink-0">
          <LuUser size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-wide">My Profile</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Clinical Staff Registry Properties</p>
        </div>
      </div>

      {/* 🔴 2. ASYMMETRIC METRICS LAYOUT ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN PANEL: Identity Core Card */}
        <div className="bg-gradient-to-br from-white via-white to-red-50/20 p-6 sm:p-8 rounded-2xl border border-red-400 shadow-[0_10px_35px_-15px_rgba(136,8,8,0.06)] text-center relative overflow-hidden group/card hover:shadow-[0_15px_40px_-10px_rgba(136,8,8,0.1)] transition-all duration-300">
          {/* Neon Border Line Top */}
          <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-red-400 via-[#880808] to-red-600" />
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-100/40 rounded-full blur-2xl pointer-events-none" />

          {/* Premium Avatar Container */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-extrabold shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-white mb-5 transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[#880808]/10 shrink-0">
            {initial}
            <span className="absolute bottom-[-6px] right-[-6px] bg-emerald-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white font-black shrink-0 shadow-md shadow-emerald-900/20 z-20">
              ✓
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 tracking-wide mt-2">{doctorData.name}</h3>
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1.5 bg-gray-50 border border-gray-200/60 px-3 py-1 rounded-lg w-fit mx-auto shadow-inner">
            Staff ID: {doctorData.id}
          </p>
          
          {/* Blood Parameter Display Token */}
          <div className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-50 to-red-50/30 border border-red-400/80 p-3.5 rounded-xl text-[#880808] font-bold text-xs sm:text-sm shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite] pointer-events-none" />
            <LuDroplets size={16} className="animate-pulse shrink-0" />
            <span className="tracking-wide font-bold text-gray-700">Blood Group Matrix:</span>
            <span className="bg-[#880808] text-white px-2.5 py-0.5 rounded-lg text-xs font-black shadow-sm tracking-wider shadow-red-900/30 shrink-0">{doctorData.bloodGroup}</span>
          </div>

          {/* Micro Health Analytics Metrics */}
          <div className="mt-5 pt-5 border-t border-dashed border-gray-400 grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 bg-gray-50/60 border border-gray-400 rounded-xl">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Status Code</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5"><LuActivity size={12}/> Active Duty</span>
            </div>
            <div className="p-2.5 bg-gray-50/60 border border-gray-400 rounded-xl">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Access Level</span>
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1 mt-0.5"><LuCalendarCheck size={12}/> Verified</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN PANEL: Granular Credentials Feed */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-white to-gray-50/30 p-6 sm:p-8 rounded-2xl border border-gray-400/80 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.04)] flex flex-col justify-between relative hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] transition-all duration-300 h-full">
          
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
              <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">Account & Contact Parameters</h4>
              <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-200/80 text-amber-700 text-[8px] sm:text-[9px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-sm shrink-0">
                <LuShieldAlert size={11} className="shrink-0" /> Secure Terminal
              </span>
            </div>
            
            {/* Split Data Attribute Fields Structure Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              {[
                { icon: LuMail, label: "Staff Portal Email", value: doctorData.email, type: "normal" },
                { icon: LuPhone, label: "Secure Comms Number", value: doctorData.phone, type: "normal" },
                { icon: LuMapPin, label: "Registered Hospital Base", value: doctorData.hospital, type: "normal" },
                { icon: LuUser, label: "Emergency Admin Escalation", value: doctorData.emergencyContact, type: "emergency" }
              ].map((field, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 group/field ${
                    field.type === 'emergency' 
                      ? 'bg-red-50/30 border-red-200/60 hover:bg-red-50/50 hover:border-red-800/80' 
                      : 'bg-gray-50/50 border-gray-500/40 hover:border-red-500/60 hover:bg-white hover:shadow-md hover:shadow-gray-100'
                  }`}
                >
                  <div className={`p-2.5 bg-white border rounded-xl shadow-sm transition-all duration-300 shrink-0 ${
                    field.type === 'emergency'
                      ? 'border-red-200 text-[#880808] group-hover/field:bg-[#880808] group-hover/field:text-white group-hover/field:border-transparent'
                      : 'border-gray-200/60 text-gray-400 group-hover/field:text-[#880808] group-hover/field:border-red-200'
                  }`}>
                    <field.icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className={`text-[9px] font-bold uppercase tracking-wider ${
                      field.type === 'emergency' ? 'text-red-700/60' : 'text-gray-400'
                    }`}>{field.label}</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 truncate tracking-wide">{field.value}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Action Trigger Footers row zone */}
          <div className="mt-8 pt-4 border-t border-gray-50 flex justify-end">
            <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-neutral-900 to-neutral-950 hover:from-[#880808] hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-gray-900/10 hover:shadow-red-900/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
              <LuPencil size={13} className="animate-[bounce_2s_infinite]" /> 
              <span>Request Data Modification</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;