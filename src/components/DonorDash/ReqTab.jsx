import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FiSearch, FiFilter, FiChevronRight, FiClock, FiCalendar } from "react-icons/fi";
import { MdOutlineBloodtype } from "react-icons/md";

const ReqTab = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  
  // 🔴 CUSTOM DROPDOWN STATES ADDED
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // ================= 🔄 FETCH LIVE PATIENT BROADCASTS =================
  const fetchNearbyRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
      
      const rawData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setRequests(rawData);
      
      setLoading(false);
    } catch (error) {
      console.error("Error connecting to Patient Matrix:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyRequests();
  }, []);

  const getActiveDonorProfile = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) return JSON.parse(storedUser);
    } catch (e) {
      console.error("Session fetch failed", e);
    }
    return { name: "Active Volunteer", phone: "+91 99999 00000", address: "Medical Unit Vicinity" };
  };

  // ================= ⚡ UPDATE STATUS LOG (ACCEPT HANDSHAKE) =================
  const handleAcceptRequest = async (reqObject) => {
    const idToSend = reqObject._id || "fallback-id";
    
    try {
      const activeDonor = getActiveDonorProfile();

      let exactPhone = activeDonor.phone || activeDonor.mobile || "+91 00000 00000";
      let exactAddress = activeDonor.address || activeDonor.city || activeDonor.location || "Gokuldham Society, Mumbai";
      let exactDonorId = activeDonor._id || activeDonor.id || null;

      try {
        const donorsRes = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/donors/all');
        const fullDonorInfo = donorsRes.data.data.find(d => d.name === activeDonor.name || d.username === activeDonor.username);
        if (fullDonorInfo) {
          exactPhone = fullDonorInfo.phone || fullDonorInfo.mobile || exactPhone;
          exactAddress = fullDonorInfo.address || fullDonorInfo.location || fullDonorInfo.city || exactAddress;
          exactDonorId = fullDonorInfo._id || exactDonorId;
        }
      } catch (fetchErr) {
        console.warn("Could not fetch full donor pool, using local data.");
      }

      const payload = {
        donorName: activeDonor.name || activeDonor.username || "Verified Volunteer",
        donorPhone: exactPhone,
        donorAddress: exactAddress      
      };

      // 2. UPDATE DB: Request Status
      const response = await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/blood-requests/${idToSend}/accept`, payload);
      
      if (response.data.success || response.status === 200) {
        
        // 🔴 3. BULLETPROOF DOCTOR NOTIFICATION LINK
        try {
          const targetNotificationUser = reqObject.createdBy || reqObject.name || "Admin";
          const cleanTargetUser = typeof targetNotificationUser === 'string' ? targetNotificationUser.trim() : "Admin";

          const notifPayload = {
            userId: cleanTargetUser,
            type: 'ACCEPTED',
            message: `Donor ${payload.donorName} has accepted your blood request for Patient: ${reqObject.name} at ${reqObject.hospital}!`,
            requestId: idToSend,
            donorName: payload.donorName,
            details: {
              hospital: reqObject.hospital,
              requestId: idToSend,
              donorPhone: payload.donorPhone,
              patientName: reqObject.name
            }
          };

          if (exactDonorId) {
            notifPayload.donorId = exactDonorId;
          }

          await axios.post('https://lifedrop-backend-orz5.onrender.com/api/notifications', notifPayload);
          console.log("Notification successfully streamed to Creator node:", cleanTargetUser);
        } catch (notifErr) {
          console.warn("Notification API failed but Request was Accepted in DB:", notifErr);
        }

        // 4. UPDATE UI: Green Button
        setRequests(prev => prev.map(r => 
          (r._id === reqObject._id) ? { ...r, status: 'Accepted' } : r
        ));
        
        alert("Success! You have officially accepted this emergency request.");
      }
    } catch (error) {
      console.error("Error accepting blood request:", error);
      alert("Failed to accept emergency assignment.");
    }
  };

  const formatTime = (dateString) => {
    const diff = new Date() - new Date(dateString);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const filteredRequests = requests.filter(req => {
    if (req.status === 'Completed') return false; 
    const hospitalStr = (req.hospital || "").toLowerCase();
    const patientStr = (req.name || "").toLowerCase();
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch = hospitalStr.includes(searchStr) || patientStr.includes(searchStr);
    const matchesGroup = selectedGroup === "All" || req.bloodGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
<div className="h-full bg-transparent pb-2 md:pb-14 w-full mx-auto max-w-[1700px] select-none animate-[fadeIn_0.4s_ease-out] mt-4 md:mt-0 lg:mt-2">    
    {/* 🔴 1. HEADER & MATRIX SEARCH FILTERS AREA */}
      <div className="flex flex-col gap-4 text-left mt-2 sm:mt-4 mb-5 sm:mb-6">
        
        <div className="md:hidden">
          <h1 className="text-xl font-bold text-gray-900 tracking-wide leading-none">
            Nearby <span className="text-[#880808]">Requests</span>
          </h1>
          <p className="text-[11px] font-medium text-gray-400 mt-1.5">
            Find urgent live blood requests in your vicinity grid.
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 sm:gap-2.5">
          <div className="relative flex-1 min-w-0">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search hospital..."
              className="w-full bg-white border border-gray-200 focus:border-red-300 py-2.5 pl-8 pr-2 text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-sm rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🔴 CUSTOM DROPDOWN (Side-by-side on mobile) */}
          <div className="relative w-[110px] sm:w-[160px] shrink-0">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="w-full bg-white border border-gray-200 hover:border-red-300 py-2.5 px-2.5 sm:px-4 rounded-xl flex items-center justify-between text-[11px] sm:text-sm font-semibold text-gray-700 transition-all shadow-sm"
            >
              <div className="flex items-center gap-1.5 truncate">
                <FiFilter className={`shrink-0 ${selectedGroup !== "All" ? "text-[#880808]" : "text-gray-400"}`} size={13} />
                <span className={`truncate ${selectedGroup !== "All" ? "text-[#880808]" : ""}`}>
                  {selectedGroup === "All" ? "All" : selectedGroup}
                </span>
              </div>
              <FiChevronRight className={`shrink-0 text-gray-400 transition-transform ${showFilter ? 'rotate-[-90deg]' : 'rotate-90'}`} size={14} />
            </button>

            {/* Dropdown Menu Popup */}
            {showFilter && (
              <div className="absolute right-0 top-full mt-2 w-[140px] sm:w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                <div className="p-1 flex flex-col max-h-48 overflow-y-auto custom-scrollbar">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      onClick={() => {
                        setSelectedGroup(bg);
                        setShowFilter(false);
                      }}
                      className={`text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors
                        ${selectedGroup === bg ? 'bg-red-50 text-[#880808]' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {bg === "All" ? "All Groups" : bg}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔴 2. RESPONSIVE CARDS COHORT GRID MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-400 font-semibold animate-pulse uppercase text-xs tracking-wider">
            Loading Real-Time Emergency Broadcast Feed Matrix...
          </div>
        ) : filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div 
              key={req._id} 
              className="group bg-white rounded-2xl p-3 sm:p-5 border border-gray-200/80 border-l-[4px] border-l-[#880808] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div>
                <div className="flex gap-2.5 sm:gap-4 items-start mb-2 sm:mb-4">
                  {/* Reduced Icon Box Size on Mobile */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50/60 text-[#880808] border border-red-100 flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:bg-[#880808] group-hover:text-white transition-colors duration-300">
                    <span className="font-bold text-sm sm:text-base leading-none">{req.bloodGroup}</span>
                    <span className="text-[7px] font-semibold uppercase tracking-wide mt-0.5 opacity-60">Type</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-[13px] sm:text-sm leading-tight tracking-wide line-clamp-2 h-[2.1rem] sm:h-9">
                      {req.hospital}
                    </h3>
                    <p className="flex items-center gap-1.5 text-gray-400 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider mt-0.5 sm:mt-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                      Patient: <span className="text-gray-700 font-bold truncate">{req.name}</span>
                    </p>
                  </div>
                </div>

                <div className="mb-2.5 sm:mb-4">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border ${
                    req.urgency === 'Critical' ? 'bg-red-50 border-red-200 text-red-600' : 
                    req.urgency === 'Urgent' ? 'bg-amber-50 border-amber-200 text-amber-600' : 
                    'bg-emerald-50 border-emerald-200 text-emerald-600'
                  }`}>
                    {req.urgency}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2 sm:pt-3 mb-3 sm:mb-4">
                  <div className="relative pl-0.5 sm:pl-1 text-left">
                    <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Units Required</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1">
                      <MdOutlineBloodtype size={14} className="text-[#880808]" />
                      <span>{req.units}</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold">Vol</span>
                    </p>
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gray-100" />
                  </div>
                  <div className="pl-2 sm:pl-3 text-left">
                    <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Broadcasted</p>
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-600 flex items-center gap-1.5 truncate">
                      <FiClock size={12} className="text-gray-400 shrink-0" />
                      {formatTime(req.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 🔴 Compact Button Height on Mobile */}
              <div className="flex flex-row gap-2 sm:gap-2.5 mt-auto relative z-10 pt-1">
                
                {/* BUTTON 1: ACCEPT REQUEST */}
                <button 
                  onClick={() => handleAcceptRequest(req)}
                  disabled={req.status === 'Accepted' || req.status === 'Scheduled'}
                  className={`flex-1 py-2 sm:py-2.5 rounded-xl font-bold text-[9px] sm:text-xs uppercase transition-all flex items-center justify-center gap-1 active:scale-95 border ${
                    (req.status === 'Accepted' || req.status === 'Scheduled')
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-none cursor-default' 
                      : 'bg-neutral-950 hover:bg-[#880808] text-white border-transparent shadow-sm' 
                  }`}
                >
                  {(req.status === 'Accepted' || req.status === 'Scheduled') ? 'Accepted ✓' : 'Accept Request'}
                </button>

                {/* BUTTON 2: DYNAMIC SCHEDULING */}
                {req.status === 'Scheduled' ? (
                  <button 
                    disabled
                    className="flex-1 py-2 sm:py-2.5 rounded-xl font-bold text-[9px] sm:text-xs uppercase bg-emerald-500 text-white border border-transparent transition-all flex items-center justify-center gap-1 shadow-sm cursor-not-allowed animate-[fadeIn_0.2s_ease-out]"
                  >
                    <FiCalendar size={13} /> Booked ✓
                  </button>
                ) : req.status === 'Accepted' ? (
                  <button 
                    onClick={() => navigate('/schedule', { state: { requestData: req } })}
                    className="flex-1 py-2 sm:py-2.5 rounded-xl font-bold text-[9px] sm:text-xs uppercase bg-red-700 hover:bg-[#880808] text-white border border-transparent transition-all flex items-center justify-center gap-1 active:scale-95 shadow-sm animate-[fadeIn_0.2s_ease-out]"
                  >
                    <FiCalendar size={13} /> Book Slot
                  </button>
                ) : null}

              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400 font-bold uppercase tracking-wider text-xs">
            No live nearby emergencies found matching selection parameters.
          </div>
        )}
      </div>

     {/* 🔴 3. MOTIVATIONAL IMPACT BANNER BLOCK */}
      <div className="bg-neutral-950 rounded-2xl p-6 sm:p-8 md:p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden mt-6 shadow-md group">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-colors duration-700 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <h4 className="text-lg sm:text-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2.5">
            <span className="text-red-500 animate-pulse text-xl sm:text-2xl">♥</span> The Power to Save a Life
          </h4>
          <p className="text-gray-400 text-xs sm:text-[13px] mt-3 font-medium leading-relaxed px-4 sm:px-0">
            Heroes don't always wear capes—sometimes they just roll up their sleeves. A single donation from you can bring a loved one back to their family. Step up and answer the emergency call today.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ReqTab;