import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MdOutlineHistory, MdOutlineFileDownload, MdSearch, 
  MdOutlineCheckCircle, MdOutlineLocationOn, MdOutlineAccessTime, MdFilterList
} from "react-icons/md";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // ================= 🔄 FETCH REAL COMPLETED DATA FROM BACKEND =================
  useEffect(() => {
    const fetchHistoryLogs = async () => {
      try {
        const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
        
        // Sirf 'Completed' status wali requests filter karo
        const completedRequests = response.data.filter(req => req.status === 'Completed');
        setHistoryData(completedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      }
    };

    fetchHistoryLogs();
  }, []);

  // 🔴  COMBINED FILTER LOGIC (Search + Blood Group)
  const filteredHistory = historyData.filter((item) => {
    const searchLower = searchQuery.toLowerCase().trim();
    
    // 1. Check Search (Hospital, Patient Name, or Donor Name)
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchLower) ||
      item.hospital?.toLowerCase().includes(searchLower) ||
      item.donorName?.toLowerCase().includes(searchLower);

    // 2. Check Blood Group Filter
    const matchesBloodGroup = selectedBloodGroup === "All" || item.bloodGroup === selectedBloodGroup;

    return matchesSearch && matchesBloodGroup;
  });

  // 🔴 EXPORT DATA TO CSV FUNCTION
  const handleExport = () => {
    if (filteredHistory.length === 0) {
      alert("No data available to export!");
      return;
    }

    const headers = ["Patient Name", "Blood Group", "Hospital", "Donor Name", "Date Completed"];

    const csvRows = filteredHistory.map(item => {
      const date = new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      return [
        `"${item.name || ''}"`,
        `"${item.bloodGroup || ''}"`,
        `"${item.hospital || ''}"`,
        `"${item.donorName || 'Verified Volunteer'}"`,
        `"${date}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'LifeDrop_History_Log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
<div className="bg-transparent pb-14 w-full mx-auto max-w-[1700px] select-none animate-[fadeIn_0.4s_ease-out] mt-4 md:mt-0 lg:mt-2">      
      {/* 🔴 1. HEADER MANAGEMENT SECTION */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 mb-5 bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-sm mt-2 sm:mt-4">
        
        {/* Left Aspect: Branding Identity info */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="p-2.5 bg-red-50 rounded-xl text-[#880808] border border-red-100/60 shadow-sm shrink-0">
            <MdOutlineHistory size={22} />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-xl font-semibold text-gray-900 tracking-wide leading-none">Request History</h1>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1.5">Clinical Archives</p>
          </div>
        </div>

        {/* Right Aspect: Controls Grid Wrapper */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Realtime Local Filter Input Container */}
          <div className="relative flex-1 sm:w-64 md:w-80 group">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by Hospital or Patient..." 
              className="w-full bg-gray-50 border border-gray-200 focus:border-red-300 py-2.5 pl-10 pr-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Quick Action Button Group */}
          <div className="flex items-center gap-2 shrink-0">
            
            <div className="relative flex-1 sm:flex-none">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className={`w-full sm:w-auto p-2.5 border rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1 
                  ${selectedBloodGroup !== "All" ? 'bg-red-50 border-red-200 text-[#880808]' : 'bg-gray-50 border-gray-200/80 text-gray-600 hover:bg-gray-100'}`}
              >
                <MdFilterList size={20} />
                {selectedBloodGroup !== "All" && <span className="text-[10px] font-bold px-1">{selectedBloodGroup}</span>}
              </button>

              {/* Dropdown Menu */}
              {showFilter && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                  <div className="p-1 flex flex-col max-h-48 overflow-y-auto">
                    {bloodGroups.map((bg) => (
                      <button
                        key={bg}
                        onClick={() => {
                          setSelectedBloodGroup(bg);
                          setShowFilter(false);
                        }}
                        className={`text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors 
                          ${selectedBloodGroup === bg ? 'bg-red-100 text-[#880808]' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {bg === "All" ? "All Groups" : bg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleExport} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95">
              <MdOutlineFileDownload size={18} /> 
              <span>Export</span>
            </button>
          </div>
        </div>
      </section>

      {/* 🔴 2. ARCHIVAL FEED LIST VIEW */}
      <div className="w-full space-y-3">
        {loading ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-xs animate-pulse">Fetching Real-time Archival Logs...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-400 font-medium italic text-sm">No completed medical archival records found matching criteria.</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white p-3.5 sm:p-5 rounded-2xl border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 hover:border-red-100/60 transition-all shadow-sm hover:shadow-md relative overflow-hidden"
            >
              {/* Left Side Static Accent Stripe Indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-2xl" />

              {/* 1. TOP SECTION: Identity Row */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 pl-1">
                {/* Blood Group Accent Indicator */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-semibold text-xs sm:text-sm border bg-emerald-50 text-emerald-700 border-emerald-100 shrink-0">
                  {item.bloodGroup}
                </div>
                
                {/* Core Meta Descriptors */}
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base tracking-wide truncate">
                    {item.name} <span className="text-gray-400 font-medium text-[11px] sm:text-sm">(Patient)</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                    <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase flex items-center gap-1 tracking-wider">
                      <MdOutlineAccessTime size={12} className="text-red-700 shrink-0" /> 
                      {/* Using createdAt from DB */}
                      {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    <span className="text-gray-200 text-[10px]">|</span>
                    <p className="hidden sm:flex text-[10px] font-semibold text-emerald-600 uppercase items-center gap-1 tracking-wider">
                      <MdOutlineCheckCircle size={13} className="shrink-0" /> Dispensed Successfully
                    </p>
                    <p className="sm:hidden text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">
                      Success
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. MIDDLE SECTION */}
              <div className="grid grid-cols-2 lg:flex lg:items-center gap-4 lg:gap-16 text-left pl-2 lg:pl-0 border-t lg:border-none border-gray-50 pt-2.5 lg:pt-0">
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Medical Facility</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-700 flex items-center gap-1 mt-0.5 truncate">
                    <MdOutlineLocationOn className="text-[#880808] text-xs shrink-0" /> {item.hospital}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Assigned Donor</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-800 mt-1 flex items-center gap-1 truncate">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block shrink-0" />
                    {item.donorName || "Verified Volunteer"}
                  </p>
                </div>
              </div>

              {/* 3. BOTTOM SECTION: Action Tools Wrapper Row */}
              <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-none pt-2.5 lg:pt-0 border-gray-50 pl-2 lg:pl-0">
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1 border bg-emerald-50 text-emerald-700 border-emerald-100/60">
                  <MdOutlineCheckCircle size={12} /> 
                  COMPLETED
                </span>
                
                <button 
                  onClick={() => window.print()} 
                  className="p-1.5 sm:p-2 text-gray-500 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:text-[#880808] rounded-xl transition-colors shadow-sm"
                  aria-label="Print Document Summary"
                >
                  <MdOutlineFileDownload size={16} sm:size={18} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default History;