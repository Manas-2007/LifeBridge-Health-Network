import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import { 
  MdOutlineNotificationsActive, 
  MdOutlineVerified, 
  MdOutlineAccessTime, 
  MdCalendarMonth,      
  MdAccessTimeFilled,
  MdDoneAll,
  MdDeleteOutline,
  MdSend
} from "react-icons/md"; 

const Notifications = () => {
  const navigate = useNavigate();
  const { patientName } = useParams(); 

  const resolveTargetPatient = () => {
    let finalName = "Unknown";
    try {
      const pStr = localStorage.getItem('patientUser');
      if (pStr) {
        try { finalName = JSON.parse(pStr).name || pStr; } 
        catch (e) { finalName = pStr; }
      } else {
        const uStr = localStorage.getItem('user');
        if (uStr) {
          try { finalName = JSON.parse(uStr).name || JSON.parse(uStr).username || uStr; } 
          catch (e) { finalName = uStr; }
        }
      }
    } catch (e) {
      console.error("Local storage access failed");
    }
    return finalName.replace(/["']/g, '').trim();
  };

  const currentPatientName = resolveTargetPatient();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= 🔄 FETCH LIVE ALERTS FROM BACKEND =================
  const fetchNotifications = async () => {
    try {
      if (notifications.length === 0) setLoading(true); 

      // 🔴 URL FIX: Seedha sabhi notifications bulao
      const apiUrl = 'https://lifedrop-backend-orz5.onrender.com/api/notifications'; 
      const response = await axios.get(apiUrl);
      
      let rawData = [];
      if (Array.isArray(response.data)) rawData = response.data;
      else if (response.data?.data && Array.isArray(response.data.data)) rawData = response.data.data;
      else if (response.data?.notifications && Array.isArray(response.data.notifications)) rawData = response.data.notifications;
      else if (typeof response.data === 'object') {
         const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
         if (possibleArray) rawData = possibleArray;
      }

      const normalizedData = rawData
        .filter(notif => notif.type !== 'COMPLETED')
        .reverse() // 🔴 SABSE NAYI UPAR AAYEGI
        .map(notif => {
        const isAlreadyRead = notif.isRead === true; 

        let finalDonorName = "";
        let customRefinedMessage = notif.message || "";

        if (notif.message && notif.message.includes("Donor ")) {
          const extracted = notif.message.split("Donor ")[1]?.split(" has accepted")[0];
          if (extracted && extracted.toLowerCase() !== "someone") {
            finalDonorName = extracted.trim();
          }
        }

        const targetType = notif.type || (notif.status?.toLowerCase() === 'accepted' ? 'ACCEPTANCE' : 'PENDING');
        const targetHospital = notif.details?.hospital || notif.hospital || "Emergency Unit";

        if (targetType === 'ACCEPTANCE' || notif.status === 'Accepted') {
          if (finalDonorName) {
            customRefinedMessage = `Donor ${finalDonorName} is Found and has accepted your blood request at ${targetHospital}.`;
          } else {
            customRefinedMessage = `Donor is Found and has accepted your blood request at ${targetHospital}.`;
          }
        }

        return {
          ...notif,
          _id: notif._id,
          requestId: notif.details?.requestId || notif.requestId || notif._id, 
          status: targetType === 'SLOT_BOOKED' || targetType === 'ACCEPTANCE' || targetType === 'ACCEPTED' || notif.status === 'Accepted' ? 'accepted' : 'pending',
          bloodGroup: notif.bloodGroup || "Live Matrix", 
          hospital: targetHospital,
          donorName: finalDonorName || notif.donorName || "Verified Life Saver", 
          donorId: notif.details?.donorPhone || notif.donorPhone ? { _id: notif.details?.donorPhone || notif.donorPhone } : null,
          appointmentDate: notif.details?.date || notif.appointmentDate || null,
          appointmentTime: notif.details?.time || notif.appointmentTime || null,
          isUnread: !isAlreadyRead, 
          rawMessage: customRefinedMessage
        };
      });

      setNotifications(normalizedData);
    } catch (error) {
      console.error("❌ Error connecting to notification API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ================= ✨ ACTION HANDLERS WITH DB SYNC =================

  const handleMarkAllRead = async () => {
    try {
      setNotifications(prevNotifs => 
        prevNotifs.map(notif => ({ ...notif, isUnread: false }))
      );
      await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/notifications/${currentPatientName}/read`);
    } catch (error) {
      console.error("Error updating read status database sync:", error);
    }
  };

  const deleteNotification = async (id, e) => {
    e.stopPropagation(); 
    
    setNotifications(prevNotifs => prevNotifs.filter(notif => notif._id !== id));

    try {
      await axios.delete(`https://lifedrop-backend-orz5.onrender.com/api/notifications/${id}`);
      console.log("Deleted permanently from database!");
    } catch (error) {
      console.error("Error deleting notification from DB:", error);
      alert("Failed to delete from database. Please refresh.");
    }
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const getStatusStyles = (status) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case 'accepted': 
        return { color: "text-emerald-600", bg: "bg-emerald-50", icon: <MdOutlineVerified className="text-xl" />, label: "Request Accepted" };
      case 'pending': 
        return { color: "text-amber-600", bg: "bg-amber-50", icon: <MdOutlineAccessTime className="text-xl" />, label: "Broadcast Live" };
      default: 
        return { color: "text-blue-600", bg: "bg-blue-50", icon: <MdOutlineVerified className="text-xl" />, label: "Searching Log" };
    }
  };

  return (
    <div className="bg-transparent pb-14 w-full px-2 sm:px-4 select-none animate-[fadeIn_0.4s_ease-out] mt-4 md:mt-0 lg:mt-2">
      
      {/* 🔴 HEADER MANAGEMENT BAR WITH ACTIONS */}
      <section className="w-full flex flex-row items-center justify-between gap-4 mb-4 sm:mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-md text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 bg-red-50 rounded-xl text-[#880808] border border-red-100/60 shadow-sm relative shrink-0">
            <MdOutlineNotificationsActive size={20} className="sm:size-[22px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide leading-none">
              Alert <span className="text-[#880808]">Center</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
              {unreadCount > 0 ? `${unreadCount} New Alerts` : "All Logs Read"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 border border-gray-200/70 hover:border-emerald-200 rounded-xl text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm shrink-0"
          >
            <MdDoneAll className="text-xs sm:text-base" />
            <span className="hidden xs:inline">Mark all read</span>
            <span className="xs:hidden">Clear</span>
          </button>
        )}
      </section>

      {/* 🔴 ALERT ARCHITECTURE BLOCK CORES */}
      <div className="w-full space-y-3 sm:space-y-4">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-semibold animate-pulse uppercase text-xs tracking-wider bg-white rounded-2xl border border-gray-200 shadow-sm">
            Streaming live notification matrix from db nodes...
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-200/80 text-center shadow-md">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
              <MdOutlineNotificationsActive size={24} />
            </div>
            <p className="text-gray-400 font-medium italic text-sm">No active alert history for "{currentPatientName || "Active Session"}".</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const style = getStatusStyles(notif.status);
            const currentStatus = (notif.status || "").toLowerCase();
            const isAccepted = currentStatus === 'accepted';

            return (
              <div 
                key={notif._id} 
                className={`group relative flex flex-col gap-2 sm:gap-4 p-3 sm:p-5 rounded-2xl border bg-white transition-all duration-300 shadow-sm hover:shadow-md ${
                  notif.isUnread 
                    ? 'border-emerald-500/30 bg-emerald-50/5 ring-1 ring-emerald-500/10' 
                    : isAccepted ? 'border-emerald-100' : 'border-gray-100'
                }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                  notif.isUnread ? 'bg-emerald-500' : isAccepted ? 'bg-emerald-400/70' : 'bg-amber-400'
                }`} />

                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4 w-full pl-1 sm:pl-2">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Icon Base */}
                    <div className={`shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-colors ${
                      notif.isUnread 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : `${style.bg} ${style.color} border-current/10`
                    }`}>
                      <div className="text-base sm:text-xl">{style.icon}</div>
                    </div>

                    <div className="min-w-0 text-left flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5 sm:mb-1">
                        {notif.isUnread ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-[pulse_2s_infinite]">
                            New Alert
                          </span>
                        ) : (
                          <span className={`text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider ${style.color}`}>
                            {style.label}
                          </span>
                        )}
                        <span className="w-1 h-1 rounded-full bg-gray-200 hidden sm:block" />
                        <span className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
                          Emergency Response Feed
                        </span>
                      </div>
                      
                      <h3 className={`tracking-wide truncate text-xs sm:text-base ${
                        notif.isUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'
                      }`}>
                        {isAccepted ? `Responder Assigned` : `Awaiting Emergency Match...`}
                      </h3>

                      <p className={`text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed mt-0.5 sm:mt-1 ${
                        notif.isUnread ? 'text-gray-700 font-medium' : 'text-gray-500'
                      }`}>
                        {notif.rawMessage}
                      </p>
                    </div>
                    
                    {/* 🔴 Delete button */}
                    <button 
                      onClick={(e) => deleteNotification(notif._id, e)}
                      className="p-1 sm:p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100 shrink-0 md:hidden block"
                      aria-label="Delete Notification"
                    >
                      <MdDeleteOutline size={16} />
                    </button>
                  </div>

                  {/* 🔴 Action Section (Contact / Button) */}
                  <div className="w-full md:w-auto shrink-0 pt-1.5 md:pt-0 border-t md:border-none border-gray-100 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-end gap-2 sm:gap-3">
                    
                    {isAccepted ? (
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto text-left md:text-right">
                        <div className="flex items-center gap-2 md:gap-0 md:flex-col">
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider hidden md:block">Contact Link</span>
                          <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-1 border border-emerald-100 rounded-lg select-all mt-0 md:mt-0.5 block">
                            📞 {notif.donorId?._id || "Verified Contact Partner"}
                          </span>
                        </div>

                        <button 
                          onClick={() => {
                            const searchParam = notif.donorName !== "Verified Life Saver" ? notif.donorName : "";
                            const reqParam = notif.requestId ? `&requestId=${notif.requestId}` : "";
                            navigate(`/pool?search=${encodeURIComponent(searchParam)}${reqParam}`);
                          }}
                          className="mt-0 md:mt-2 flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                        >
                          <MdSend size={11} /> <span className="hidden xs:inline">View Donor Panel</span><span className="xs:hidden">Donor</span>
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex w-full md:w-auto items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200/50 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider justify-center">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        Broadcasting Live
                      </span>
                    )}

                    {/* Desktop delete button */}
                    <button 
                      onClick={(e) => deleteNotification(notif._id, e)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 hidden md:block"
                      aria-label="Delete Notification"
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                </div>

                {/* 🔴 Appointment Box - Flex-row to save height */}
                {notif.appointmentDate && (
                  <div className={`p-2 sm:p-3.5 border rounded-lg sm:rounded-xl flex flex-row flex-wrap justify-between items-center gap-2 w-full ml-1 sm:mx-0 sm:ml-2 ${
                    notif.isUnread 
                      ? 'bg-emerald-50/60 border-emerald-200/50 text-emerald-900' 
                      : 'bg-emerald-50/40 border-emerald-100 text-emerald-800'
                  }`}>
                    <div className="flex flex-row flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 w-auto">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <MdCalendarMonth className="text-emerald-600 text-[11px] sm:text-base" />
                        <span className="text-[10px] sm:text-xs font-medium tracking-wide">Date: {notif.appointmentDate}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <MdAccessTimeFilled className="text-emerald-600 text-[11px] sm:text-base" />
                        <span className="text-[10px] sm:text-xs font-medium tracking-wide">Slot: {notif.appointmentTime}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-emerald-600 border border-emerald-700 text-white text-[7px] sm:text-[9px] font-semibold rounded uppercase tracking-wide">
                        Confirmed Arrival
                      </span>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default Notifications;