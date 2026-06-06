import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LuDownload, LuHistory, LuHeart } from "react-icons/lu";
import { MdOutlineCheckCircle, MdOutlineLocationOn, MdOutlineAccessTime, MdOutlineBloodtype } from "react-icons/md";

const DonationHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donorProfile, setDonorProfile] = useState({ name: "Volunteer", bloodGroup: "--" });

  // ================= 🔄 FETCH REAL DYNAMIC DATA =================
  useEffect(() => {
    const fetchDonorHistory = async () => {
      try {
        // 1. Get Logged-in Donor from Local Storage
        let user = { name: "Volunteer", bloodGroup: "--" };
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          user = JSON.parse(storedUser);
          setDonorProfile(user);
        }

        const currentDonorName = user.name || user.username;

        // 2. Fetch all requests from backend
        const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
        const rawData = Array.isArray(response.data) ? response.data : (response.data?.data || []);

        // 3. Filter only 'Completed' requests specifically for THIS donor
        const completedRequests = rawData.filter(req => 
          req.status === 'Completed' && req.donorName === currentDonorName
        );

        setHistoryData(completedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      }
    };

    fetchDonorHistory();
  }, []);

  // 📊 DYNAMIC ANALYTICS COMPUTATIONS
  const stats = {
    total: historyData.length,
    group: donorProfile.bloodGroup || "O+", 
    lives: historyData.length * 3 
  };

  return (
<div className="bg-transparent pb-14 w-full mx-auto max-w-[1700px] select-none animate-[fadeIn_0.4s_ease-out]">      
      {/* 🔴 1. HEADER BAR */}
      <section className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl border border-gray-300 shadow-sm mt-2 sm:mt-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="p-2.5 bg-red-50/60 rounded-xl text-[#880808] border border-red-100/40 shadow-sm shrink-0">
            <LuHistory size={22} />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-xl font-semibold text-gray-900 tracking-wide leading-none">Donation History</h1>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mt-1.5">Lifetime Contributions</p>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 shrink-0"
        >
          <LuDownload size={16} /> 
          <span>Download Records</span>
        </button>
      </section>

      {/* 🔴 2.HIGHLIGHTED STATS COUNTERS (Soft Premium Colors, Balanced Weights) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
  
        {/* 📊 Counter Card 1: Slate Tint (Compact & Highlighted) */}
        <div className="bg-slate-200/90 border border-slate-500/60 shadow-sm p-2.5 sm:p-4 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <p className="text-slate-500 font-semibold text-[8px] sm:text-[10px] uppercase tracking-wider text-left truncate">
            Total Donations
          </p>
          <p className="text-xl sm:text-2xl font-semibold mt-0.5 sm:mt-1 text-left tracking-tight text-slate-800">
            {stats.total} <span className="text-[10px] sm:text-xs font-medium text-slate-400">sessions</span>
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-400" />
        </div>

        {/* 🩸 Counter Card 2: Red Tint (Compact & Highlighted) */}
        <div className="bg-red-100/90 border border-red-600/60 shadow-sm p-2.5 sm:p-4 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <p className="text-red-600 font-semibold text-[8px] sm:text-[10px] uppercase tracking-wider text-left truncate">
            Blood Type
          </p>
          <p className="text-xl sm:text-2xl font-semibold mt-0.5 sm:mt-1 text-left tracking-tight text-[#880808]">
            {stats.group}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600/80" />
        </div>

        {/* 🌱 Counter Card 3: Emerald Tint (Compact & Highlighted) */}
        <div className="bg-emerald-100/90 border border-emerald-600/60 shadow-sm p-2.5 sm:p-4 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <p className="text-emerald-600 font-semibold text-[8px] sm:text-[10px] uppercase tracking-wider text-left truncate">
            Lives Impacted
          </p>
          <p className="text-xl sm:text-2xl font-semibold mt-0.5 sm:mt-1 text-left tracking-tight text-emerald-700">
            {stats.lives} <span className="text-[10px] sm:text-xs font-medium text-emerald-500">souls</span>
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-500" />
        </div>

      </div>

      {/* 🔴 3. PREMIUM HISTORY CARD FEED */}
      <div className="w-full space-y-4">
        {loading ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-xs animate-pulse">Loading Your Life-Saving Records...</p>
          </div>
        ) : historyData.length === 0 ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-400 font-medium italic text-sm">No completed donation updates found.</p>
          </div>
        ) : (
          historyData.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white p-5 rounded-2xl border border-gray-100/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 hover:border-red-100/50 transition-all shadow-sm hover:shadow-md relative overflow-hidden text-left"
            >
              {/* Decorative Soft Left Inner Indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/80" />

              {/* BLOCK A: MEDICAL FACILITY INFORMATION */}
              <div className="flex items-center gap-4 min-w-0 pl-1 flex-1">
                {/* Premium Droplet Display Capsule */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100/30 text-[#880808] border border-red-100/60 flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-102">
                  <MdOutlineBloodtype size={22} />
                </div>
                
                {/* Hospital Metadata */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base tracking-wide truncate">
                    {item.hospital}
                  </h3>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <MdOutlineLocationOn size={13} className="text-red-700" />
                    Verified Regional Clinical Center
                  </p>
                </div>
              </div>

              {/* BLOCK B: INTEGRATED BALANCED TRACKING METRICS GRID */}
              <div className="grid grid-cols-3 md:flex items-center gap-4 md:gap-14 lg:gap-16 pl-2 md:pl-0 border-t md:border-none border-gray-50 pt-3.5 md:pt-0 flex-1">
                
                {/* Metric 1: Recipient Identity */}
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Recipient</span>
                  <span className="text-xs font-medium text-gray-700 block mt-1 truncate italic">
                    "{item.name}"
                  </span>
                </div>

                {/* Metric 2: Quantity Transfused */}
                <div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Volume</span>
                  <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100/40 inline-block mt-0.5">
                    {item.units} {item.units === 1 ? 'Unit' : 'Units'}
                  </span>
                </div>

                {/* Metric 3: Time Log */}
                <div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Completed</span>
                  <span className="text-xs font-medium text-gray-600 flex items-center gap-1 mt-1">
                    <MdOutlineAccessTime className="text-gray-400 shrink-0" size={13} />
                    {new Date(item.createdAt || item.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>
                </div>

              </div>

              {/* BLOCK C: VERIFIED COMPLETION BADGES */}
              <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-none pt-3 md:pt-0 border-gray-50 pl-2 md:pl-0 shrink-0">
                <span className="px-3 py-1 rounded-xl text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1.5 border bg-emerald-50 text-emerald-700 border-emerald-100/60 shadow-sm shadow-emerald-50">
                  <MdOutlineCheckCircle className="text-emerald-600" size={13} /> 
                  Success
                </span>
                <span className="px-3 py-1 rounded-xl text-[9px] font-semibold uppercase tracking-wider border bg-gray-50 text-gray-500 border-gray-200/60">
                  Whole Blood
                </span>
              </div>

            </div>
          ))
        )}
      </div>

      {/* 🔴 4. ENCOURAGEMENT PANEL NOTE */}
      <div className="flex items-center gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100/60 text-left mt-6">
        <div className="w-11 h-11 bg-white border border-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm shrink-0">
          <LuHeart size={20} />
        </div>
        <p className="text-xs sm:text-sm text-red-700 font-medium leading-relaxed">
          <span className="font-semibold uppercase tracking-wider mr-1">You are a hero!</span> 
          Every donation recorded here represents a person who got a second chance at life thanks to your kindness.
        </p>
      </div>

    </div>
  );
};

export default DonationHistory;