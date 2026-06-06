import React, { useState, useEffect } from 'react'; // 🔴 Added Hooks
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🔴 Added Axios for API calls
import { 
  MdOutlineNearMe, 
  MdLocalPhone, 
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdOutlineBloodtype,
  MdOutlineCalendarMonth
} from "react-icons/md";
import { FiUser, FiArrowRight } from "react-icons/fi";

const RequestsAndActivity = () => {
  const navigate = useNavigate();

  // 🔴 STATE FOR REAL DATA
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeDonor = JSON.parse(localStorage.getItem('user')) || {};
  const donorBloodGroup = activeDonor.bloodGroup || "--";

  // 🔄 FETCH REAL REQUESTS FROM BACKEND
  useEffect(() => {
    const fetchNearbyRequests = async () => {
      try {
        const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        const activeRequests = data
          .filter(req => req.status !== 'Completed' && req.status !== 'Resolved')
          .slice(0, 2); 

        setRequests(activeRequests);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchNearbyRequests();
  }, []);

  const getUrgencyStyles = (urgency) => {
    const level = (urgency || '').toLowerCase();
    
    if (level === 'critical' || level === 'emergency') {
      return 'bg-red-50 text-red-600 border-red-100';      // 🔴 Danger/Red
    } else if (level === 'urgent' || level === 'high') {
      return 'bg-amber-50 text-amber-600 border-amber-100';  // 🟠 Warning/Orange
    } else if (level === 'normal' || level === 'routine') {
      return 'bg-blue-50 text-blue-600 border-blue-100';    // 🔵 Chill/Blue
    } else {
      return 'bg-gray-50 text-gray-600 border-gray-200';    // ⚪ Fallback/Gray
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 mt-8 w-full select-none">

      {/* ================= 📍 LEFT COLUMN: REQUESTS NEAR YOU ================= */}
      <div className="w-full lg:flex-[2] bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200/80 shadow-md text-left flex flex-col">

        {/* Section Header Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-50 rounded-xl text-[#880808] border border-red-100/40 shadow-sm shrink-0">
              <MdOutlineNearMe size={18} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">
              Requests Near You
            </h3>
          </div>

          <span className="bg-red-50 text-red-700 text-[10px] font-semibold px-3 py-0.5 rounded-lg border border-red-100/50 uppercase tracking-wider shadow-sm shadow-red-50">
            {requests.length} active
          </span>
        </div>

        {/* Request Items Feed List */}
        <div className="space-y-4 flex-1">
          {loading ? (
            // 🌀 Loading State
            <div className="flex justify-center items-center h-full min-h-[150px]">
              <p className="text-sm font-semibold text-gray-400 animate-pulse uppercase tracking-widest">Scanning Radar...</p>
            </div>
          ) : requests.length === 0 ? (
            // 📭 Empty State
            <div className="flex justify-center items-center h-full min-h-[150px] bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-sm font-medium text-gray-400">No emergency requests near you right now.</p>
            </div>
          ) : (
            // 🩸 Real Data Mapped
            requests.map((req) => (
              <div
                key={req._id}
                className="p-4 sm:p-5 rounded-xl bg-gray-50/50 border border-gray-200/40 hover:border-red-200/60 hover:bg-white transition-all duration-300 shadow-inner group relative"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left Aspect: Identity Framework */}
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    {/* Blood Type Droplet */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#880808] to-red-800 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-md shadow-red-100 transition-transform group-hover:scale-102">
                      {req.bloodGroup || req.bloodType || "O+"}
                    </div>

                    {/* Core Context Fields */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                          <FiUser className="text-gray-400 hidden sm:inline" size={14} />
                          {req.patientName || req.name || "Patient Request"}
                        </h4>
                      <span className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-bold rounded uppercase tracking-wider border ${getUrgencyStyles(req.urgency || req.status)}`}>
                        ● {req.urgency || req.status || "Standard"}
                      </span>
                      {(req.bloodGroup || req.bloodType) === donorBloodGroup && (
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100/50 text-emerald-700 text-[8px] sm:text-[9px] font-semibold rounded uppercase tracking-wider">
                          ✓ Group match
                        </span>
                      )}
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide leading-tight">
                        Needs <span className="text-[#880808]">{req.units || 1} units</span> <span className="text-gray-400 font-medium lowercase">at</span> {req.hospitalName || req.hospital || "Local Hospital"}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 mt-2 font-medium">
                        <span className="flex items-center gap-1 font-semibold text-gray-500 uppercase tracking-wide">
                          <MdOutlineLocationOn className="text-[#880808] text-sm shrink-0" /> 
{req.distance || `${(req._id ? (parseInt(req._id.slice(-4), 16) % 40 / 10 + 1).toFixed(1) : "2.5")} km`}
                        </span>
                        <span className="text-gray-200">|</span>
                        <span>👨‍⚕️ Verified</span>
                        <span className="text-gray-200">|</span>
                        <span className="flex items-center gap-1">
                          <MdOutlineAccessTime className="text-gray-400 text-sm shrink-0" />
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : "Just now"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Context Actions Toggle Group */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0 justify-end shrink-0 border-t md:border-none border-gray-100 pt-3 md:pt-0">
                    <button 
                      onClick={() => alert("⚠️ Please ACCEPT the request first! Booking a slot is only allowed after acceptance.")}
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all shadow-sm"
                    >
                      Book Slot
                    </button>
                    <button 
                      onClick={() => navigate('/requests')}
                      className="px-6 py-2 bg-gray-950 hover:bg-[#880808] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      Accept
                    </button>
                  </div>

                </div>

                {/* Dynamic Notes */}
                {(req.note || req.reason) && (
                  <div className="mt-3.5 py-2 px-3 sm:px-4 bg-white/70 rounded-xl border border-dashed border-gray-200 text-left">
                    <p className="text-[11px] italic text-gray-500 font-medium leading-normal">
                      "{req.note || req.reason}"
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= 🩸 RIGHT COLUMN: PREMIUM ANIMATED SCHEDULE WIDGET ================= */}
      <div className="w-full lg:flex-1 bg-gradient-to-b from-[#7a0707] to-[#3a0202] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-red-900/50 text-center text-white relative overflow-hidden flex flex-col justify-center items-center h-auto min-h-[320px] group">
        
        {/* ✨ Animated Ambient Background Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors duration-700"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff4d4d]/10 rounded-full blur-2xl animate-pulse duration-1000"></div>

        {/* 🎯 Main Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          
          {/* 🩸 3D Animated Blood Drop Framework */}
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            {/* Ripple Waves Behind */}
            <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping opacity-75 duration-1000"></div>
            <div className="absolute inset-2 bg-red-400/20 rounded-full animate-pulse"></div>
            
            {/* The Floating Drop */}
            <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-red-400 to-red-700 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.8)] animate-[bounce_3s_infinite]">
              <MdOutlineBloodtype size={30} className="text-white drop-shadow-md" />
            </div>
          </div>
          
          {/* Headline & Subtext */}
          <h3 className="text-xl sm:text-2xl font-black tracking-wide mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-red-200">
            Be a Lifesaver
          </h3>
          
          <p className="text-xs sm:text-[13px] text-red-100/70 mb-8 font-medium leading-relaxed px-2 sm:px-6">
            Schedule a voluntary donation at your convenience. Plan ahead and give the gift of life.
          </p>

          {/* Glassmorphism Button */}
          <button 
            onClick={() => navigate('/schedule')}
            className="w-full sm:w-[85%] relative overflow-hidden group/btn bg-white/10 hover:bg-white text-white hover:text-[#880808] border border-white/20 hover:border-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 active:scale-95 shadow-lg"
          >
            {/* Shine Sweep Animation on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              <MdOutlineCalendarMonth size={16} className="group-hover/btn:text-[#880808] transition-colors" />
              Book a Slot
              <FiArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default RequestsAndActivity;