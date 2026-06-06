import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdAdd, MdClose, MdBloodtype, MdOutlineLocationOn, MdOutlineAccessTime, MdPhone } from "react-icons/md";
import { IoHeartSharp } from "react-icons/io5";

const BloodReq = ({ isPrivate, targetDonor, onClose }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    units: 1,
    phone: '',
    hospital: '',
    urgency: 'Normal'
  });

  // ================= 🔄 1. FOOLPROOF FETCH LOGIC =================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
      
      let rawData = [];
      if (Array.isArray(response.data)) {
        rawData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        rawData = response.data.data;
      } else if (response.data?.requests && Array.isArray(response.data.requests)) {
        rawData = response.data.requests;
      } else if (typeof response.data === 'object') {
         const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
         if (possibleArray) rawData = possibleArray;
      }

      const activeOnly = rawData.filter(req => {
        const isNotCompleted = req.status !== 'Completed';
        const isNotPrivate = req.isPrivate !== true && req.isPrivate !== "true"; 
        return isNotCompleted && isNotPrivate;
      });
      
      setRequests(activeOnly);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= ⚡ 2. DOCTOR/ADMIN AWARE SUBMIT LOGIC =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let creatorName = "Admin";
      try {
        const adminData = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('patientUser'));
        if (adminData && adminData.name) {
          creatorName = adminData.name;
        } else if (adminData && adminData.username) {
          creatorName = adminData.username;
        }
      } catch (err) {
        console.warn("Could not parse Admin Name from LocalStorage");
      }

      const payload = {
        name: formData.name || "Anonymous Patient",
        bloodGroup: formData.bloodGroup,
        units: parseInt(formData.units) || 1,
        phone: formData.phone,
        hospital: formData.hospital,
        urgency: formData.urgency || "Normal",
        targetDonorId: isPrivate ? targetDonor?._id : null, 
        isPrivate: isPrivate || false,
        createdBy: creatorName 
      };

      const response = await axios.post('https://lifedrop-backend-orz5.onrender.com/api/blood-requests', payload);
      
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        await fetchRequests(); 
        
        if (onClose) onClose(); 
        else setIsModalOpen(false);
        
        setFormData({ name: '', bloodGroup: '', units: 1, phone: '', hospital: '', urgency: 'Normal' });
        alert("Broadcast sent successfully!");
      } else {
        alert("Something went wrong with the broadcast stream.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send request.");
    }
  };

  return (
<div className="bg-transparent pb-14 w-full px-2 sm:px-4 select-none animate-[fadeIn_0.4s_ease-out] relative mt-4 md:mt-0 lg:mt-2">
  
      {/* 🔴 PORTAL EXECUTIVE BRANDING HERO BANNER */}
      <section className="relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 md:p-4 border border-gray-300 shadow-sm mb-5 sm:mb-6 text-left">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-red-50/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 rounded-lg border border-red-100 mb-2 sm:mb-2.5">
              <IoHeartSharp className="text-[#880808] text-[10px] sm:text-xs" />
              <span className="text-[9px] sm:text-[10px] font-bold text-[#880808] uppercase tracking-wider">Altruism Panel Grid</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-[600] text-gray-900 tracking-wide leading-tight">
              Patient <span className="text-[#880808]">Broadcast Center</span>
            </h1>
            <p className="text-gray-400 font-medium mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed">
              Monitor, schedule, and configure active emergency blood requirements.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-gray-900 text-white px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-[#880808] transition-colors shadow-sm w-full sm:w-auto shrink-0 active:scale-95"
          >
            <MdAdd size={16} /> New Request
          </button>
        </div>
      </section>

      {/* 🔴 BROADCAST DATA FEED ARCHITECTURE */}
      <div className="w-full text-left">
        
        {/* 📱 MOBILE VIEW: CARD BASED LAYOUT (Visible only on small screens) */}
        <div className="sm:hidden space-y-3">
          {loading ? (
            <div className="bg-white p-10 rounded-2xl border border-gray-200 text-center shadow-sm">
              <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] animate-pulse">Syncing Feed Matrix...</p>
            </div>
          ) : requests.length > 0 ? (
            requests.map((req) => (
              <div key={req._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 relative overflow-hidden flex flex-col gap-3">
                {/* Accent line based on urgency */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  req.urgency === 'Critical' ? 'bg-red-500' : 
                  req.urgency === 'Urgent' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                
                {/* Top Row: Blood Group & Identity */}
                <div className="flex items-start gap-3 pl-1">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#880808] border border-red-100 flex items-center justify-center font-bold text-sm shrink-0 shadow-inner">
                    {req.bloodGroup}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-bold text-gray-900 text-[13px] truncate">{req.name}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Token: #{req._id.slice(-4)}</p>
                  </div>
                  {/* Status Badge */}
                  <div className="shrink-0">
                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase border ${
                      req.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50/50 text-blue-600 border-blue-100'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 pl-1 border-t border-gray-50 pt-2 mt-1">
                  <div>
                    <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Units Needed</p>
                    <p className="text-[11px] font-bold text-gray-800 flex items-center gap-1"><MdBloodtype className="text-red-600" /> {req.units} Units</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Urgency Level</p>
                    <p className={`text-[11px] font-bold flex items-center gap-1 ${
                      req.urgency === 'Critical' ? 'text-red-600' : req.urgency === 'Urgent' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      <MdOutlineAccessTime /> {req.urgency}
                    </p>
                  </div>
                  <div className="col-span-2 mt-1">
                    <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Medical Facility</p>
                    <p className="text-[11px] font-semibold text-gray-700 flex items-start gap-1 leading-tight"><MdOutlineLocationOn className="shrink-0 mt-0.5 text-gray-500" /> {req.hospital}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="bg-white p-10 rounded-2xl border border-gray-200 text-center shadow-sm">
              <p className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">No active internal requirements.</p>
            </div>
          )}
        </div>

        {/* 💻 DESKTOP VIEW: PREMIUM TABLE MATRIX (Hidden on small screens) */}
        <div className="hidden sm:block rounded-2xl border border-gray-300/80 shadow-md overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-300 text-gray-600">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-center w-16">S.No.</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider">Patient</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-center w-24">Blood Group</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-center w-20">Units</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider">Medical Facility</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-center w-28">Urgency Class</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-right w-32">Status Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center text-gray-400 font-semibold animate-pulse uppercase text-xs tracking-wider">
                      Connecting to LifeBridge Feed Matrix...
                    </td>
                  </tr>
                ) : requests.length > 0 ? (
                  requests.map((req, index) => (
                    <tr key={req._id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="p-4 font-semibold text-gray-400 text-center">{index + 1}</td>
                      <td className="p-4 min-w-[160px]">
                        <p className="font-bold text-gray-900 text-sm">{req.name}</p>
                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Token: #{req._id.slice(-4)}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex w-9 h-9 rounded-xl bg-red-50 text-[#880808] border border-red-100 font-bold text-sm items-center justify-center shadow-inner">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-gray-900">{req.units} <span className="text-[10px] text-gray-400 font-medium">U</span></td>
                      <td className="p-4 max-w-[220px] truncate font-semibold text-gray-500">{req.hospital}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase border ${
                          req.urgency === 'Critical' ? 'bg-red-50 border-red-100 text-red-600' : 
                          req.urgency === 'Urgent' ? 'bg-amber-50 border-amber-100 text-amber-600' : 
                          'bg-emerald-50 border-emerald-100 text-emerald-600'
                        }`}>
                          {req.urgency}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          req.status === 'Accepted' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-blue-50/50 text-blue-600 border-blue-100'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-16 text-center text-gray-400 font-medium uppercase text-xs tracking-wider">
                      No active internal emergency requirements registered in tracking network.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 🔴 MODAL WINDOW SYSTEM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-4 select-none">
          <div className="absolute inset-0 bg-red-950/20 backdrop-blur-[4px]" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-[560px] bg-white rounded-2xl border border-red-100 shadow-[0_20px_50px_-12px_rgba(136,8,8,0.15)] animate-[zoomIn_0.25s_ease-out] overflow-hidden text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 md:px-8 md:pt-7 md:pb-4 flex justify-between items-center bg-white shrink-0 border-b border-gray-100 sm:border-none">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-wide">New Blood Request</h2>
                <p className="text-[10px] sm:text-[11px] font-semibold text-red-600/60 mt-0.5 sm:mt-1 uppercase tracking-wider">Broadcast Emergency Parameters</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#880808] p-2 bg-red-50/40 hover:bg-red-50 rounded-xl transition-all duration-200 border border-red-100/50">
                <MdClose size={18} />
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <div className="overflow-y-auto custom-scrollbar p-5 sm:p-6 md:px-8 pb-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-[500] text-gray-600 uppercase tracking-widest ml-0.5">Patient Name</label>
                    <input required type="text" value={formData.name} placeholder="e.g. Rohan Kapoor" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-red-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner" />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-[500] text-gray-600 uppercase tracking-widest ml-0.5">Phone Number</label>
                    <input required type="text" value={formData.phone} placeholder="Contact No." onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-red-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner" />
                  </div>
                </div>
                
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-[500] text-gray-600 uppercase tracking-widest ml-0.5">Units Required</label>
                  <input required type="number" min="1" value={formData.units} placeholder="e.g. 2" onChange={(e) => setFormData({...formData, units: e.target.value})} className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-red-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-[500] text-gray-600 uppercase tracking-widest ml-0.5">Blood Group</label>
                    <select required value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-red-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner cursor-pointer">
                      <option value="">Select Group</option>
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-[500] text-gray-600 uppercase tracking-widest ml-0.5">Urgency</label>
                    <select value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})} className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-red-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner cursor-pointer">
                      {['Normal', 'Urgent', 'Critical'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1.5 text-left pb-2">
                  <label className="text-[10px] font-[500] text-gray-600 uppercase tracking-widest ml-0.5">Hospital / Location</label>
                  <input required type="text" value={formData.hospital} placeholder="e.g. Apollo Emergency Center, Wing B" onChange={(e) => setFormData({...formData, hospital: e.target.value})} className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-red-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner" />
                </div>
                
                <div className="pt-2 sticky bottom-0 bg-white">
                  <button type="submit" className="w-full py-3.5 sm:py-3 bg-gray-900 hover:bg-[#880808] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95 text-center flex items-center justify-center gap-2">
                    Broadcast Request <MdAdd size={16} className="mt-0.5"/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodReq;