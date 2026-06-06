import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineLocalHospital, MdCheckCircleOutline } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

const FooterSection = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH REAL DONATION HISTORY
  useEffect(() => {
    const fetchRecentHistory = async () => {
      try {
        // 1. Get Logged-in User
        const storedUser = localStorage.getItem('user');
        let currentDonorName = "Volunteer";
        if (storedUser) {
          const user = JSON.parse(storedUser);
          currentDonorName = user.name || user.username;
        }

        // 2. Fetch Data from API
        const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
        const rawData = Array.isArray(response.data) ? response.data : (response.data?.data || []);

        // 3. Filter only 'Completed' for this donor, Sort by newest, and slice top 4
        const completedRequests = rawData
          .filter(req => req.status === 'Completed' && req.donorName === currentDonorName)
          .sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt))
          .slice(0, 4); // Sirf top 4 dikhayenge taaki UI compact rahe

        setHistoryData(completedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching footer history:", error);
        setLoading(false);
      }
    };

    fetchRecentHistory();
  }, []);

  // RIGHT SIDE: Static Guide (Kept intact)
  const steps = [
    { num: 1, title: "Doctor creates request", desc: "Patient details + blood group + urgency" },
    { num: 2, title: "System matches donors", desc: "Filters by blood group, location & availability" },
    { num: 3, title: "Donors notified", desc: "Nearby eligible donors get instant alerts" },
    { num: 4, title: "Donor accepts", desc: "Donor confirms; doctor sees match in real-time" },
    { num: 5, title: "Donation completed", desc: "Status fulfilled; history updated for both sides" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 mt-8 pb-10 w-[95%] mx-auto max-w-[1700px] select-none">
      
      {/* 🏥 LEFT: YOUR DONATION HISTORY CELL */}
      <div className="w-full lg:flex-[2] bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200/80 shadow-md text-left">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">Your Donation History</h3>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">Past Success Records</p>
          </div>
          {/* View All Button routes to full History Page */}
          <button 
            onClick={() => navigate('/history')}
            className="text-xs font-bold text-red-700 flex items-center gap-1 hover:underline transition-all"
          >
            <span>View all</span>
            <FiArrowRight size={14} />
          </button>
        </div>

        {/* Timeline Vector Track */}
        <div className="relative space-y-5 sm:space-y-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gray-100" />

          {loading ? (
            <div className="py-4 text-center">
              <p className="text-xs font-semibold text-gray-400 animate-pulse uppercase tracking-widest">Loading Records...</p>
            </div>
          ) : historyData.length === 0 ? (
            <div className="py-4 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-xs font-medium text-gray-400">No completed donations yet. Save a life today!</p>
            </div>
          ) : (
            historyData.map((item, idx) => (
              <div key={item._id || idx} className="relative pl-7 sm:pl-9 flex flex-col xs:flex-row xs:items-center justify-between gap-2 group">
                {/* Premium Bullet Indicator */}
                <div className="absolute left-0 top-1.5 xs:top-1/2 xs:-translate-y-1/2 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full z-10 transition-transform group-hover:scale-110" />
                
                {/* Medical Identity Core */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-[15px] tracking-wide flex items-center gap-1.5">
                    <MdOutlineLocalHospital className="text-red-700/80 hidden sm:inline" size={16} />
                    {item.hospitalName || item.hospital || "Clinical Center"}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-0.5 truncate">
                    {item.patientName || item.name} • {item.units || 1} Unit{item.units > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Status Tags and Timestamps layout metrics */}
                <div className="flex items-center justify-between xs:justify-end gap-4 border-t xs:border-none border-gray-100 pt-1.5 xs:pt-0 shrink-0">
                  <span className="bg-emerald-50/60 text-emerald-700 text-[9px] font-semibold px-2.5 py-0.5 rounded-lg border border-emerald-100/50 flex items-center gap-1">
                    <MdCheckCircleOutline size={12} />
                    Success
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 w-[75px] text-right uppercase tracking-wider">
                    {item.createdAt || item.updatedAt ? new Date(item.createdAt || item.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PROCESS GUIDE TIMELINE */}
      <div className="w-full lg:flex-1 bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200/80 shadow-md text-left h-auto">
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">From Request to Donation</h3>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">How LifeDrop matches you</p>
        </div>

        {/* Process Flow Metric Layout */}
        <div className="space-y-5 relative">
          {/* Vertical Stepper Connective Line (Hidden on tiny screens) */}
          <div className="absolute left-3 top-2 bottom-6 w-[1px] bg-red-100/60 hidden xs:block" />

          {steps.map((step) => (
            <div key={step.num} className="flex gap-3.5 relative z-10 group">
              {/* Stepper Index Circular Node */}
              <div className="w-6 h-6 shrink-0 rounded-lg bg-red-50 text-red-700 flex items-center justify-center text-[11px] font-bold border border-red-100/60 shadow-sm group-hover:bg-red-700 group-hover:text-white transition-all duration-200">
                {step.num}
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-gray-800 tracking-wide">{step.title}</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FooterSection;