import React from 'react';
import { MdOutlineLocationOn, MdEventRepeat, MdOutlineHistory } from "react-icons/md";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const HeroSection = ({ 
  donor, 
  onToggle,
  onDaysChange
}) => {
  
  const nameHighlightStyle = "text-[#880808] underline decoration-dotted decoration-1 underline-offset-4";
  const infoDataBadgeStyle = "text-amber-700 font-bold bg-amber-50/60 px-1.5 py-0.5 rounded border border-amber-200/30";

  return (
    // 🔴 COMPACT FIX: Reduced outer padding (p-4 md:p-6) and gaps to shrink height
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:px-8 lg:py-6 border border-gray-300/80 shadow-md flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 mt-4 md:mt-0 lg:mt-2">
      
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 w-full lg:w-auto">
        
        {/* 🔴 1. DYNAMIC BLOOD GROUP SPHERE CASE (Shrunk size for compactness) */}
        <div className="relative group shrink-0">
          <div className="absolute inset-0 bg-[#880808] rounded-full blur-[20px] opacity-10 group-hover:opacity-25 transition-opacity duration-300"></div>
          <div className="relative w-[75px] h-[75px] md:w-[90px] md:h-[90px] bg-gradient-to-br from-red-600 to-[#880808] rounded-full flex flex-col items-center justify-center shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.25),4px_4px_10px_rgba(136,8,8,0.25)]">
            <span className="text-white text-2xl md:text-3xl font-bold leading-none mt-1">
              {donor.bloodGroup}
            </span>
            <span className="text-[7px] md:text-[8px] text-white font-semibold uppercase tracking-wider mt-0.5 opacity-90">
              Factor
            </span>
          </div>
        </div>

        {/* 🔴 2. DYNAMIC DONOR META PROFILE DETAILS */}
        <div className="text-center md:text-left flex-1 w-full min-w-0">
          <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Donor Registry Profile</p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide leading-tight mb-2">
            Welcome Back <span className={nameHighlightStyle}>{donor.name}</span>
          </h2>
          
          {/* Metadata Parameters Badges Row */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-3 text-[11px] md:text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <MdOutlineLocationOn className="text-[#880808] text-[14px] md:text-base" /> 
              <span className={infoDataBadgeStyle}>{donor.location}</span>
            </span>
            <span className="text-gray-300 hidden xs:inline">•</span>
            <span className="flex items-center gap-1">
              Age <span className={infoDataBadgeStyle}>{donor.age}</span>
            </span>
            <span className="text-gray-300 hidden xs:inline">•</span>
            <span className="flex items-center gap-1">
              <MdOutlineHistory className="text-gray-400 text-sm" />
              <span className={infoDataBadgeStyle}>{donor.donations}</span> total
            </span>
          </div>

          {/* 🔴 3. DYNAMIC ELIGIBILITY TRACKING TIMELINE (MANUAL SLIDER) */}
          <div className="mt-3 w-full max-w-[380px] mx-auto md:mx-0">
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-700">Set Next Eligibility</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                <span className="text-[#880808] font-bold">{donor.daysLeft}</span> / {donor.totalDays} Days
              </p>
            </div>
            
            {/* 🔴 BULLETPROOF INTERACTIVE RANGE SLIDER */}
            <div className="relative w-full py-1.5 flex items-center group z-10">
              <input 
                type="range" 
                min="0" 
                max={donor.totalDays || 90} 
                value={donor.daysLeft || 0}
                onChange={(e) => {
                  console.log("Slider moved to:", e.target.value); 
                  if (onDaysChange) onDaysChange(e.target.value);
                }}
                className="w-full h-2 md:h-2.5 bg-gray-200 rounded-lg cursor-pointer accent-[#880808] hover:accent-red-700 transition-all pointer-events-auto relative z-10"
              />
            </div>
            <p className="mt-1 text-[9px] md:text-[10px] text-gray-400 font-medium italic flex items-center justify-center md:justify-start gap-1">
              <MdEventRepeat className="text-gray-400 text-xs shrink-0" />
              <span>Manual override active for showcase</span> 
            </p>
          </div>
        </div>
      </div>

      {/* 🔴 4. SYSTEM AVAILABILITY ENGINE TOGGLE COMPONENT */}
      <div className="w-full lg:w-[220px] bg-gray-50/50 p-3 sm:p-4 rounded-xl border border-gray-400/60 shadow-inner shrink-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Availability</p>
          
          {/* Custom Track Toggle Switch Action Button */}
          <button 
            onClick={onToggle}
            className={`w-[36px] h-[20px] md:w-[42px] md:h-[22px] rounded-full relative cursor-pointer transition-colors duration-300 p-0.5 border border-transparent outline-none flex items-center ${
              donor.isAvailable ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
            aria-label="Toggle Availability Status"
          >
            <div className={`w-[14px] h-[14px] md:w-[16px] md:h-[16px] bg-white rounded-full transition-all duration-300 shadow-sm ${
              donor.isAvailable ? 'translate-x-[18px] md:translate-x-[22px]' : 'translate-x-0'
            }`}></div>
          </button>
        </div>

        <h4 className="text-xs md:text-sm font-bold text-gray-800 mb-2.5 text-center lg:text-left tracking-wide">
          {donor.isAvailable ? "Available to Donate" : "Currently on Break"}
        </h4>
        
        {/* Dynamic Status Notification Wrapper Badge */}
        <div className={`flex items-center justify-center lg:justify-start gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-bold p-2 md:p-2.5 rounded-lg border transition-all duration-300 text-left ${
          donor.isAvailable 
            ? 'text-emerald-700 bg-emerald-50/60 border-emerald-200/50' 
            : 'text-red-700 bg-red-50 border-red-100/60'
        }`}>
          <div className="shrink-0 mt-0.5">
            {donor.isAvailable ? (
              <FiCheckCircle size={11} className="text-emerald-600 animate-pulse" />
            ) : (
              <FiAlertCircle size={11} className="text-red-600" />
            )}
          </div>
          <span className="leading-tight">
            {donor.isAvailable ? "Visible to nearby centers" : "Hidden from search results"}
          </span>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;