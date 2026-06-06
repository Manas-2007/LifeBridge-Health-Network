import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdOutlineBloodtype, MdAdd, MdOutlineNotificationsActive, 
  MdCheckCircleOutline, MdOutlineWarningAmber, MdStar,MdOutlineVerified,
  MdOutlineLocalHospital, MdCheckCircleOutline as MdCheckCircleIcon
} from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';
import { IoCallOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";

const StatCard = ({ title, value, unit, description, icon, type }) => (
  <div 
    className={`relative overflow-hidden p-4 sm:p-5 rounded-xl bg-white border shadow-sm transition-all duration-300 hover:shadow-md text-left select-none ${
      type === "burgundy" ? "border-red-400" :
      type === "emerald" ? "border-emerald-400" :
      type === "amber" ? "border-amber-400" :
      "border-slate-200/60"
    }`}
  >
    <div className="flex justify-between items-start mb-3 relative z-10">
      <div className={`p-2.5 rounded-xl border border-red-100/30 shadow-inner transition-all duration-300 ${
        type === "burgundy" ? "bg-red-50 text-[#880808]" :
        type === "emerald" ? "bg-emerald-50 text-emerald-700" :
        type === "amber" ? "bg-amber-50 text-amber-600" :
        "bg-slate-50 text-slate-700"
      }`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
        type === "burgundy" ? "bg-red-50 border-red-500 text-[#880808]" :
        type === "emerald" ? "bg-emerald-50 border-emerald-500 text-emerald-700" :
        type === "amber" ? "bg-amber-50 border-amber-500 text-amber-600" :
        "bg-slate-50 border-slate-200 text-slate-700"
      }`}>
        Live
      </div>
    </div>
    
    <div className="space-y-1 relative z-10">
      <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider truncate">{title}</p>
      <div className="flex items-baseline gap-0.5">
        <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-none ${
          type === "burgundy" ? "text-[#880808]" : 
          type === "emerald" ? "text-emerald-700" : 
          type === "amber" ? "text-amber-600" : 
          "text-slate-700"
        }`}>{value}</h3>
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide ml-0.5">{unit}</span>
      </div>
      <p className="text-[10px] font-semibold text-gray-400 mt-2 flex items-center gap-1 uppercase tracking-wide truncate">
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
          type === "burgundy" ? "bg-[#880808]/60" : 
          type === "emerald" ? "bg-emerald-500/60" : 
          type === "amber" ? "bg-amber-500/60" : 
          "bg-slate-400"
        }`} />
        {description}
      </p>
    </div>
    
    {/* Bottom Precision Accent Line */}
    <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] ${
      type === "burgundy" ? "bg-[#880808]" : 
      type === "emerald" ? "bg-emerald-500" : 
      type === "amber" ? "bg-amber-500" : 
      "bg-slate-400"
    }`} />
  </div>
);

// 🔴 PREMIUM FOOTER INTEGRATION: CLINICAL PATIENT HISTORY & WORKFLOW MATRIX
const FooterSection = ({ historyData }) => {
  const navigate = useNavigate();
  const steps = [
    { num: 1, title: "Initialize Broadcast Track", desc: "Patient sets target location parameters, required blood type matrix, and urgency class scale." },
    { num: 2, title: "Live Proximity Cloud Alert", desc: "LifeDrop network core filters proximity registers and transmits real-time alerts to verified group matches." },
    { num: 3, title: "Donor Acceptance Vector", desc: "An eligible donor triggers a direct response confirmation, immediately locking coordination channels." },
    { num: 4, title: "Secure Gateway Mapping", desc: "Communication gateways open automatically, providing secure phone links to arrange transit pipelines." },
    { num: 5, title: "Transfusion Log Verification", desc: "Medical destination coordinates fulfill the tracking block, updating timeline metrics for both portals." },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 mt-6 pb-6 w-full select-none text-left">
      
      {/* 🏥 LEFT COLUMN: BROADCAST HISTORY TRACK */}
      <div className="w-full lg:flex-[2] bg-white rounded-2xl p-5 sm:p-6 border border-gray-400/80 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">Your Broadcast History</h3>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">Archive of Fulfilled Critical Requirements</p>
          </div>
          <button
           onClick={() => navigate('/history')}
           className="text-xs font-bold text-[#880808] flex items-center gap-1 hover:underline transition-all uppercase tracking-wider">
            <span>View All</span>
            <FiArrowRight size={14} />
          </button>
        </div>

        {/* Timeline Tracking Line Layout */}
        <div className="relative space-y-5 sm:space-y-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gray-100" />

          {historyData && historyData.length > 0 ? (
            historyData.map((item, idx) => (
              <div key={item._id || idx} className="relative pl-7 sm:pl-9 flex flex-col xs:flex-row xs:items-center justify-between gap-2 group bg-transparent">
                {/* Custom Medical Node Pointer */}
                <div className="absolute left-0 top-1.5 xs:top-1/2 xs:-translate-y-1/2 w-3 h-3 bg-white border-2 border-[#880808] rounded-full z-10 transition-transform group-hover:scale-110" />
                
                <div className="min-w-0 flex-1 text-left">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                    <MdOutlineLocalHospital className="text-[#880808] hidden sm:inline" size={15} />
                    {item.hospital}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5 tracking-wide">
                    {item.name} • {item.bloodGroup} Requested • {item.units} Unit(s)
                  </p>
                </div>

                {/* Status Tags Layout */}
                <div className="flex items-center justify-between xs:justify-end gap-4 border-t xs:border-none border-gray-100 pt-1.5 xs:pt-0 shrink-0">
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2.5 py-0.5 rounded-lg border border-emerald-100/50 flex items-center gap-1">
                    <MdCheckCircleIcon size={11} />
                    Completed
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 w-[78px] text-right uppercase tracking-wider">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="relative pl-7 sm:pl-9">
               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">No completed requests found in archive.</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: PROCESS OPERATION STEPPER MAP */}
      <div className="w-full lg:flex-1 bg-gradient-to-b from-red-50/20 via-white to-transparent rounded-2xl p-5 sm:p-6 border border-red-300 shadow-[0_10px_30px_-15px_rgba(136,8,8,0.04)] h-auto self-stretch flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(136,8,8,0.08)] hover:border-red-600">
        
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-red-500/30 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-50 rounded-md border border-red-500/60 mb-2">
              <span className="w-1 h-1 rounded-full bg-[#880808] animate-ping" />
              <span className="text-[9px] font-bold text-[#880808] uppercase tracking-wider">Automated Matrix</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">Emergency Routing System</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">How LifeDrop Automates Patient Transit Matches</p>
          </div>

          <div className="space-y-4 relative">
            <div className="absolute left-[13px] top-3 bottom-6 w-[1.5px] bg-gradient-to-b from-[#880808]/40 via-red-100 to-transparent hidden xs:block" />

            {steps.map((step) => (
              <div 
                key={step.num} 
                className="flex gap-4 relative z-10 group/item text-left p-2 -mx-2 rounded-xl border border-transparent hover:border-red-700/40 hover:bg-white/60 hover:shadow-sm transition-all duration-300 transform hover:scale-[1.01]"
              >
                <div className="w-7 h-7 shrink-0 rounded-xl bg-white text-[#880808] flex items-center justify-center text-[10px] font-extrabold border border-red-200 shadow-sm group-hover/item:bg-[#880808] group-hover/item:text-white transition-all duration-300">
                  {step.num}
                </div>
                
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-800 tracking-wide transition-colors group-hover/item:text-[#880808]">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const Hero = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [history, setHistory] = useState([]); 
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [activeRequestName, setActiveRequestName] = useState("");
  const [loading, setLoading] = useState(true); // Loading state add ki
  const navigate = useNavigate();
  const [showNoDonorMsg, setShowNoDonorMsg] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [metrics, setMetrics] = useState({
    active: 0,
    fulfilled: 0,
    volume: 0,
    pending: 0
  }); 

  // 📦 METRICS SCHEMATICS GRID STYLING ARRAYS
  const formatNum = (num) => num.toString().padStart(2, '0'); // To show "05" instead of "5"

  const patientStats = [
    { title: "Active Broadcasts", value: formatNum(metrics.active), unit: "Tracks", description: "Live Network Feeds", icon: <MdOutlineNotificationsActive />, type: "burgundy" },
    { title: "Fulfilled Requests", value: formatNum(metrics.fulfilled), unit: "Cases", description: "Successful Transits", icon: <MdCheckCircleOutline />, type: "emerald" },
    { title: "Volume Requested", value: formatNum(metrics.volume), unit: "Units", description: "Total Lifetime Load", icon: <MdOutlineBloodtype />, type: "burgundy" },
    { title: "Pending Reviews", value: formatNum(metrics.pending), unit: "Alert", description: "Requires Action", icon: <MdOutlineWarningAmber />, type: "amber" },
  ];

  // 📦 MOCK REGISTRY DATABASE: Synced Mapping Keys
  const donorDatabaseFallback = {
    "req_a01": { name: "Dr. Vikram Malhotra", phone: "+91 94250 11223" },
    "req_a02": { name: "Priya Chandrasekhar", phone: "+91 98930 44556" },
    "req_a03": { name: "Arvinder Singh", phone: "+91 97550 88990" },
    "req_a04": { name: "Sneha Reddy", phone: "+91 88899 55667" },
    "req_a05": { name: "Manish Patidar", phone: "+91 75520 77889" }
  };

  // ================= 🔄 FETCH LIVE DASHBOARD DATA & CALCULATE METRICS =================
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
      
      let rawData = [];
      if (Array.isArray(response.data)) rawData = response.data;
      else if (response.data?.data) rawData = response.data.data;
      else if (response.data?.requests) rawData = response.data.requests;

      // 🧮 COUNTER CALCULATION ENGINE
      let activeCount = 0;
      let fulfilledCount = 0;
      let totalVolume = 0;
      let pendingCount = 0;

      rawData.forEach(req => {
        // 1. Total Volume (Sum of all units)
        totalVolume += parseInt(req.units) || 0;

        // 2. Active vs Fulfilled
        if (req.status === 'Completed') {
          fulfilledCount++;
        } else {
          activeCount++;
        }

        // 3. Pending Reviews (Accepted but not completed)
        if (req.status === 'Accepted') {
          pendingCount++;
        }
      });

      // Update Metrics State
      setMetrics({
        active: activeCount,
        fulfilled: fulfilledCount,
        volume: totalVolume,
        pending: pendingCount
      });

      // 🔴 BINA KISI DOCTOR FILTER KE: Sirf active aur completed alag karo (Top 5 for tables)
      const activeMyRequests = rawData.filter(req => req.status !== 'Completed');
      const completedHistory = rawData.filter(req => req.status === 'Completed');

      const top5Active = [...activeMyRequests].reverse().slice(0, 5);
      const top5History = [...completedHistory].reverse().slice(0, 5);

      setMyRequests(top5Active);
      setHistory(top5History);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleViewDonor = (requestId, patientName) => {
    setActiveRequestName(patientName);
    
    if (donorDatabaseFallback[requestId]) {
      setSelectedDonor(donorDatabaseFallback[requestId]);
    } else {
      setSelectedDonor(null);
    }
  };

  return (
<div className="animate-[fadeIn_0.4s_ease-out] space-y-5 pb-10 w-[95%] mx-auto max-w-[1700px] select-none ">      
      {/* 🔴 1. MOBILE ONLY IMPACT BANNER (Hidden on Desktop screens via md:hidden) */}
      <section className="relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-md text-left md:hidden mt-2">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-red-500/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 rounded-lg border border-red-100 mb-2">
              <MdStar className="text-[#880808] text-xs" />
              <span className="text-[9px] font-bold text-[#880808] uppercase tracking-wider">Patient Care Center</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-wide leading-none">
              Your Case <span className="text-[#880808]">Dashboard</span>
            </h2>
            <p className="text-gray-400 font-medium mt-1.5 text-xs">
              Monitor live broadcast channels, coordinate transit assignments, and track active proximity matches in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50/50 p-2 pr-4 rounded-xl border border-gray-200/60 w-fit shrink-0 shadow-inner">
            <div className="flex -space-x-2.5">
              {[1, 2, 3].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i + 32}`} className="w-8 h-8 rounded-lg border-2 border-white object-cover shadow-sm" alt="donor" />
              ))}
              <div className="w-8 h-8 rounded-lg border-2 border-white bg-neutral-900 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">+8</div>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-[10px] font-bold text-gray-800 leading-none">Top Responders</p>
              <p className="text-[8px] font-semibold text-gray-400 uppercase mt-0.5">Active Matches</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔴 2. THEMATIC STATS DATA GRID MATRIX */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-2 md:mt-4">
        {patientStats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      {/* 🔴 3. MAIN CONTENT PIPELINE COLUMNS */}
      <div className="flex flex-col xl:flex-row gap-5 items-start w-full mt-6">
        
        {/* LEFT COMPONENT BLOCK: Requests Table Vector */}
        <div className="w-full xl:flex-[2] bg-white rounded-2xl p-5 sm:p-6 border border-gray-400/80 shadow-md overflow-hidden text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">My Blood Requests</h2>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Select an active row to print responder parameters</p>
            </div>
            <button onClick={() => navigate('/requests')} className="w-full sm:w-auto flex items-center justify-center gap-1 bg-[#880808] hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm">
              <MdAdd size={16} /> New Request
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-left">
                  <th className="pb-3 text-center w-14">S.NO.</th>
                  <th className="pb-3 px-4">Patient Parameters</th>
                  <th className="pb-3 text-center w-24">Blood Group</th>
                  <th className="pb-3 text-center w-20">Units</th>
                  <th className="pb-3 px-4">Hospital Facility</th>
                  <th className="pb-3 text-right w-28">Status State</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-medium text-gray-700 divide-y divide-gray-50 bg-transparent">
  {loading ? (
    <tr>
      <td colSpan="6" className="py-10 text-center text-gray-400 font-semibold animate-pulse uppercase tracking-wider text-xs">
        Fetching Live Tracks...
      </td>
    </tr>
  ) : myRequests.length > 0 ? (
    myRequests.map((req, index) => (
      <tr 
        key={req._id} 
                onClick={async () => {
          try {
            // 1. Live backend se donors uthao
            const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/donors/all');
            const allDonors = response.data.data || response.data.donors || response.data || [];

            // 2. ROBUST MATCHING LOGIC (Spaces aur Case ignore karega)
            const targetBlood = (req.bloodGroup || "").toString().toUpperCase().trim();
            
            const foundDonors = allDonors.filter(d => {
              // Note: Agar tumhare DB mein field ka naam bloodType hai toh yahan d.bloodType likhna
              const donorBlood = (d.bloodGroup || d.bloodType || "").toString().toUpperCase().trim();
              return donorBlood === targetBlood;
            });

            if (foundDonors.length > 0) {
              // 🟢 MATCH FOUND: Max 2 donors uthao
              setMatchedDonors(foundDonors.slice(0, 2)); 
              setSelectedReq(req);
              setShowNoDonorMsg(false); // Error message OFF
            } else {
              // 🔴 NO MATCH
              setMatchedDonors([]);
              setSelectedReq(null);
              setShowNoDonorMsg(true); 
              setTimeout(() => {
                setShowNoDonorMsg(false);
              }, 2000);
            }
          } catch (error) {
            console.error("🚨 Error fetching donors for match:", error);
            setMatchedDonors([]);
            setSelectedReq(null);
            setShowNoDonorMsg(true);
            setTimeout(() => setShowNoDonorMsg(false), 2000);
          }
        }}
        // 👆 NAYA LOGIC KHATAM 👆

        className="group hover:bg-red-50/20 cursor-pointer transition-colors bg-transparent"
      >
        <td className="py-4 text-center font-bold text-gray-400">{index + 1}</td>
        <td className="py-4 px-4 text-left">
          <p className="font-bold text-gray-900 text-xs sm:text-sm">{req.name}</p>
          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Token: #{req._id?.slice(-4).toUpperCase()}</p>
        </td>
        <td className="py-4 text-center">
          <span className="inline-flex w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-[#880808] font-bold text-xs items-center justify-center shadow-inner">
            {req.bloodGroup}
          </span>
        </td>
        <td className="py-4 text-center font-bold text-gray-900">{req.units} <span className="text-[10px] text-gray-400 font-medium">U</span></td>
        <td className="py-4 px-4 text-left font-semibold text-gray-500 max-w-[140px] truncate">{req.hospital}</td>
        <td className="py-4 text-right">
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
            req.status === 'Accepted' || req.status === 'Completed'
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' // MATCHED
              : req.urgency === 'Critical'
                ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' // CRITICAL
                : req.urgency === 'Urgent'
                  ? 'bg-amber-50 border-amber-100 text-amber-600' // URGENT
                  : 'bg-blue-50 border-blue-100 text-blue-600' // NORMAL
          }`}>
            {req.status === 'Accepted' ? 'MATCHED ✓' : req.urgency}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="py-10 text-center text-gray-400 font-semibold uppercase tracking-wider text-xs">
        No active requests found.
      </td>
    </tr>
  )}
          </tbody>
            </table>
          </div>
        </div>

       {/* RIGHT COMPONENT BLOCK: Smart Donor Match Radar */}
        <div className="w-full xl:flex-1 bg-white rounded-2xl p-5 sm:p-6 border border-gray-400/80 shadow-md text-left sticky top-4 self-start">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 tracking-wide">Donor Match Radar</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Proactive Pool Scanning
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
              <MdOutlineBloodtype className="text-[#880808]" size={18} />
            </div>
          </div>

          {selectedReq && matchedDonors.length > 0 ? (
            /* 1️⃣ STATE: MATCH FOUND -> SHOW UP TO 2 DONOR CARDS */
            <div className="space-y-3 animate-[fadeIn_0.3s_ease]">
              <div className="mb-3 px-2 border-l-4 border-[#880808] bg-gray-50/50 py-1.5 rounded-r-lg">
                <h4 className="text-xs font-bold text-gray-800 tracking-wide">Target Patient: {selectedReq.name}</h4>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Requirement: <span className="text-[#880808]">{selectedReq.bloodGroup}</span> • {selectedReq.units} Unit(s)</p>
              </div>

              {matchedDonors.map((donor, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-emerald-400/60 bg-gradient-to-b from-white to-emerald-50/20 shadow-sm transition-all duration-300">
                  <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center shadow-inner border border-emerald-200 shrink-0">
                        {donor.bloodGroup}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide truncate">{donor.name}</h4>
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">
                          {donor.address || donor.location || "Verified Pool Donor"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5 px-1.5 py-0.5 rounded border bg-emerald-50 border-emerald-200 shadow-sm">Match ✓</span>
                  </div>

                  {/* 🟢 THE ACTION BUTTONS (Accept & Reject) */}
                  <div className="flex gap-2 w-full mt-1">
                    <button 
                      onClick={() => navigate('/pool')} 
                      className="flex-[2] py-2 bg-red-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <MdOutlineVerified size={14} /> Accept & Assign
                    </button>
                    <button 
                      onClick={() => setSelectedReq(null)} 
                      className="flex-1 py-2 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center justify-center shadow-sm active:scale-95 transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

          ) : showNoDonorMsg ? (
            /* 2️⃣ STATE: NO MATCH FOUND MESSAGE (2 Second Timer) */
            <div className="py-16 px-4 text-center border border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center min-h-[340px] animate-[fadeIn_0.2s_ease-in-out]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-200">
                <span className="text-xl">🔍</span>
              </div>
              <h4 className="font-bold text-gray-700 text-sm tracking-wide">No Match Found</h4>
              <p className="text-gray-500 font-medium text-[10px] uppercase tracking-widest mt-2 max-w-[200px] mx-auto">
                Currently, 0 verified donors available with required blood group in the pool.
              </p>
            </div>

          ) : (
            /* 3️⃣ STATE: DEFAULT BLOOD DROP ANIMATION */
            <div className="py-16 px-4 text-center border border-dashed border-red-200/60 rounded-xl bg-gradient-to-b from-white to-red-50/30 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden">
              <div className="relative flex justify-center items-center w-32 h-32 mb-6">
                <div className="absolute w-24 h-24 bg-red-500/10 rounded-full animate-[ping_2.5s_ease-in-out_infinite]" />
                <div className="absolute w-16 h-16 bg-[#880808]/20 rounded-full animate-[ping_1.5s_ease-in-out_infinite]" />
                <div className="relative z-10 animate-bounce">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-[#880808] rounded-full rounded-tr-none -rotate-45 shadow-[0_5px_15px_rgba(136,8,8,0.4)] relative">
                    <div className="absolute top-2 left-2 w-2 h-3 bg-white/40 rounded-full rotate-45" />
                  </div>
                </div>
                <div className="absolute -bottom-2 w-10 h-1.5 bg-red-900/15 rounded-full blur-[2px] animate-pulse" />
              </div>
              <h4 className="font-bold text-[#880808] text-sm tracking-wide z-10">LifeDrop Radar Online</h4>
              <p className="text-gray-500 font-medium text-[10px] uppercase tracking-widest leading-relaxed max-w-[220px] mx-auto mt-2 z-10">
                Click on any emergency track to scan the global donor pool for verified matches.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 🔴 FOOTER INTEGRATION HUB: Requests History & Stepper Blueprint Layout */}
      <FooterSection historyData={history}/>

    </div>
  );
};

export default Hero;