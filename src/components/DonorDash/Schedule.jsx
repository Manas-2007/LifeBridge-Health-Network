import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiCalendar, FiClock, FiMapPin, FiInfo, FiUser } from "react-icons/fi";

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const preFilledData = location.state?.requestData;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    { id: 1, time: "09:00 AM", status: "Available" },
    { id: 2, time: "10:30 AM", status: "Available" },
    { id: 3, time: "12:00 PM", status: "Full", disabled: true },
    { id: 4, time: "02:30 PM", status: "Available" },
    { id: 5, time: "04:00 PM", status: "Available" },
    { id: 6, time: "05:30 PM", status: "Full", disabled: true },
  ];

  const getActiveDonorProfile = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) return JSON.parse(storedUser);
    } catch (e) {
      console.error("Session fetch failed", e);
    }
    return { name: "Active Volunteer", phone: "+91 00000 00000" };
  };

  // ================= 📤 POST PROPOSED SCHEDULE TO BACKEND =================
  const handleConfirmAppointment = async () => {
    try {
      setLoading(true);
      const activeDonor = getActiveDonorProfile();

      if (preFilledData) {
        const payload = {
          donorName: activeDonor.name || activeDonor.username,
          donorPhone: activeDonor.phone || "+91 00000 00000",
          patientName: preFilledData.name,
          hospitalName: preFilledData.hospital,
          proposedDate: selectedDate,
          proposedTime: selectedSlot
        };

        console.log("🚀 Sending Proposed Schedule Payload:", payload);

        // 🔗 TERA ORIGINAL ENDPOINT (UNTOUCHED)
        const response = await axios.post(`https://lifedrop-backend-orz5.onrender.com/api/blood-requests/${preFilledData._id}/propose-schedule`, payload);

        if (response.data.success || response.status === 200) {
          setLoading(false);
          alert(`🎯 Success! You have proposed a schedule to ${preFilledData.name}. They will be notified to approve the timing!`);
          navigate('/dashboard'); 
        }
      } 
      // 🟢 VOLUNTARY MODE
      else {
        console.log("🚀 Booking Voluntary Slot at:", selectedHospital);
        
        // Yahan future me tu voluntary slots ki API laga sakta hai. Abhi just alert karega.
        setTimeout(() => {
          setLoading(false);
          alert(`🎯 Success! Your voluntary donation at ${selectedHospital} has been scheduled.`);
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error("Error scheduling assignment slot:", error);
      setLoading(false);
      alert(error.response?.data?.message || "Failed to propose appointment schedule.");
    }
  };

  return (
<div className="bg-transparent pb-5 w-[95%] mx-auto max-w-[1700px] select-none animate-[fadeIn_0.4s_ease-out]">
      {/* 🔴 1. PORTAL BRANDING HEADER */}
      <div className="px-1 text-left mt-5 sm:mt-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-wide leading-none">
          Schedule <span className="text-[#880808]">Appointment</span>
        </h1>
        <p className="text-xs font-medium text-gray-400 mt-2">
          {preFilledData 
            ? `Configuring transit parameters for ${preFilledData.name}'s medical requirement.` 
            : "Select a verified clinical center and timeslot for your voluntary donation."}
        </p>
      </div>

      {/* 🔴 2. MULTI-COLUMN RESPONSIVE GRID ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">

        {/* LEFT COLUMN COMPONENT PANELS: CONFIGURATORS */}
        <div className="lg:col-span-2 space-y-4">

          {/* DATE SELECTION ACCORDION CELL */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-300 shadow-sm text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-red-50 text-red-700 rounded-xl flex items-center justify-center border border-red-100/50 shrink-0">
                <FiCalendar size={16} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base leading-none">Select Target Date</h2>
                <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Clinical Calendar</p>
              </div>
            </div>

            <input
              type="date"
              className="w-full bg-gray-50 border border-gray-200/80 focus:border-red-300 p-3 rounded-xl outline-none transition-all focus:ring-4 focus:ring-red-50/60 font-semibold text-gray-700 text-sm"
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* TIME SLOTS RESERVATION CELL */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-300 shadow-sm text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-red-50 text-red-700 rounded-xl flex items-center justify-center border border-red-100/50 shrink-0">
                <FiClock size={16} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base leading-none">Available Slots</h2>
                <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Hourly Capacity logs</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={slot.disabled}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`
                    rounded-xl border p-2.5 sm:p-3.5 flex flex-col items-center gap-0.5 text-xs font-semibold transition-all duration-200
                    ${slot.disabled
                      ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                      : selectedSlot === slot.time
                      ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-red-700 hover:bg-red-50/30"
                    }
                  `}
                >
                  <span className="text-sm tracking-wide">{slot.time}</span>
                  <span className={`text-[8px] uppercase tracking-wider font-semibold ${selectedSlot === slot.time ? "text-emerald-400" : "text-gray-400"}`}>
                    {slot.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN COMPONENT PANELS: SUMMARY CARD */}
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden shadow-md text-left">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />

            <h3 className="text-base font-semibold tracking-wide mb-4 relative z-10">Booking Summary</h3>

            <div className="space-y-3.5 relative z-10">
              
              {/* 🔴 DYNAMIC UI BASED ON DONATION TYPE */}
              {preFilledData ? (
                // ================= MODE 1: PATIENT SOS  =================
                <>
                  <div className="flex gap-3 items-start">
                    <FiUser className="text-red-500 text-base shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Patient Requester</p>
                      <p className="text-xs sm:text-sm font-medium truncate mt-0.5">{preFilledData.name}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start border-t border-white/5 pt-3.5">
                    <FiMapPin className="text-red-500 text-base shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Destination Unit</p>
                      <p className="text-xs sm:text-sm font-medium mt-0.5 leading-snug">{preFilledData.hospital}</p>
                    </div>
                  </div>
                </>
              ) : (
                // ================= MODE 2: VOLUNTARY (NEW SMART UI) =================
                <>
                  <div className="flex gap-3 items-start">
                    <FiUser className="text-emerald-500 text-base shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Donation Type</p>
                      <p className="text-xs sm:text-sm font-medium truncate mt-0.5 text-emerald-400">Voluntary (Self-Choice)</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start border-t border-white/5 pt-3.5">
                    <FiMapPin className="text-red-500 text-base shrink-0 mt-0.5" />
                    <div className="min-w-0 w-full pr-2">
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mb-1">Select Blood Bank</p>
                      <select 
                        className="w-full bg-gray-800 text-white border border-gray-700 p-1.5 rounded-lg text-xs outline-none focus:border-red-500 transition-colors"
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                      >
                        <option value="">-- Choose Center --</option>
                        <option value="Apollo Blood Bank">Apollo Blood Bank</option>
                        <option value="Yashoda Hospital">Yashoda Hospital</option>
                        <option value="Care Clinical Center">Care Clinical Center</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* DATE & TIME (COMMON FOR BOTH) */}
              <div className="flex gap-3 items-start border-t border-white/5 pt-3.5">
                <FiCalendar className="text-red-500 text-base shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Target Date</p>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 text-emerald-400">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Awaiting Selection..."}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start border-t border-white/5 pt-3.5">
                <FiClock className="text-red-500 text-base shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Hourly Window</p>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 text-emerald-400">{selectedSlot || "Awaiting Selection..."}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmAppointment}
              // 🔴 SMART DISABLE: Agar voluntary hai toh hospital bhi choose karna hoga
              disabled={!selectedDate || !selectedSlot || (!preFilledData && !selectedHospital) || loading}
              className={`
                w-full mt-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-200 relative z-10 text-center
                ${!selectedDate || !selectedSlot || (!preFilledData && !selectedHospital) || loading
                    ? "bg-white/5 text-white/20 cursor-not-allowed"
                    : "bg-red-700 hover:bg-red-600 text-white shadow-sm active:scale-95"
                }
              `}
            >
              {loading ? "Processing Logs..." : "Confirm Appointment"}
            </button>
          </div>

          {/* CLINICAL HEALTH INFORMATION METRIC CONTAINER */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-left">
            <FiInfo className="text-blue-600 text-base shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
              Kindly stay hydrated and guarantee a regular solid dietary intake at least 3 hours prior to arriving at the clinical unit. 
              {preFilledData ? ` Notification metrics will alert ${preFilledData.name} upon verification.` : ""}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Schedule;