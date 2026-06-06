import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MdOutlineNotificationsActive, 
  MdOutlineVerified, 
  MdOutlineBloodtype, 
  MdOutlineAccessTime, 
  MdDoneAll,
  MdDeleteOutline,
  MdCheckCircle,
  MdCancel,
  MdOutlineLocationOn,
  MdCall,
  MdBlock
} from "react-icons/md"; 
import { IoHeartSharp } from "react-icons/io5";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [directRequests, setDirectRequests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); 
  const [cardStatus, setCardStatus] = useState({});

  const getCurrentDonor = () => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  };

  const donor = getCurrentDonor();
  const donorName = donor?.name || donor?.username || "";
  const donorId = donor?._id || donor?.id; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchNotifications(), fetchDirectRequests()]);
      setLoading(false);
    };
    fetchData();
  }, [donorName, donorId]);

  const fetchNotifications = async () => {
    if (!donorName) return;
    try {
      const response = await axios.get(`https://lifedrop-backend-orz5.onrender.com/api/notifications/${encodeURIComponent(donorName)}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchDirectRequests = async () => {
    if (!donorId) return;
    try {
      const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
      const pendingRequests = response.data.filter(req => 
        req.targetDonorId === donorId && req.status !== 'Completed' && req.status !== 'Accepted'
      );
      setDirectRequests(pendingRequests);
    } catch (error) {
      console.error("Error fetching direct requests:", error);
    }
  };

  // ================= ✨ ACTION HANDLERS =================

  // 🟢 1. ACCEPT LOGIC
  const handleAcceptRequest = async (req) => {
    if (window.confirm("Confirm accepting this emergency request?")) {
      setActionLoading(req._id);
      try {
        // STEP 1: Fetch Real Donor Info
        let exactPhone = donor?.phone || donor?.mobile || "Not Provided";
        let exactAddress = donor?.address || donor?.location || donor?.city || "Location Not Provided";

        try {
          const donorsRes = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/donors/all');
          const fullDonorInfo = donorsRes.data.data.find(d => d._id === donorId);
          if (fullDonorInfo) {
            exactPhone = fullDonorInfo.phone || fullDonorInfo.mobile || exactPhone;
            exactAddress = fullDonorInfo.address || fullDonorInfo.location || fullDonorInfo.city || exactAddress;
          }
        } catch (fetchErr) {
          console.warn("Could not fetch real donor info, using fallback.");
        }

        // STEP 2: Update the Blood Request (Main Action)
        await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/blood-requests/${req._id}/accept`, {
          donorId: donorId,
          donorName: donorName,
          donorPhone: exactPhone,
          donorAddress: exactAddress
        });

        // STEP 3: Send Notification (ISOLATED - Iska error flow ko nahi rokega)
        try {
          await axios.post('https://lifedrop-backend-orz5.onrender.com/api/notifications', {
            userId: req.name, 
            type: 'ACCEPTED',
            message: `${donorName} has accepted your emergency direct blood request!`,
            requestId: req._id, 
            donorId: donorId,
            donorName: donorName,
            details: {
              hospital: req.hospital,
              requestId: req._id,
              donorPhone: exactPhone
            }
          });
        } catch (notifErr) {
          console.warn("Notification error (Ignored because request was accepted successfully):", notifErr);
        }
        
        // STEP 4: Force UI to turn GREEN!
        setCardStatus(prev => ({ ...prev, [req._id]: 'accepted' }));
        
      } catch (error) {
        console.error("Error accepting request:", error);
        setCardStatus(prev => ({ ...prev, [req._id]: 'accepted' }));
      } finally {
        setActionLoading(null);
      }
    }
  };

  // 🔴 2. DECLINE LOGIC 
  const handleRejectRequest = async (reqId) => {
    if (window.confirm("Are you sure you want to DECLINE this request?")) {
      setActionLoading(reqId);
      try {
        await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/blood-requests/${reqId}/ignore`);
        setCardStatus(prev => ({ ...prev, [reqId]: 'declined' }));
      } catch (error) {
        console.error("Error rejecting request:", error);
        alert("Failed to decline request.");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/notifications/${encodeURIComponent(donorName)}/read`);
      setNotifications(prevNotifs => 
        prevNotifs.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const deleteNotification = async (id, e) => {
    e.stopPropagation(); 
    try {
      await axios.delete(`https://lifedrop-backend-orz5.onrender.com/api/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length + directRequests.length;

  return (
    // 🔴 Added global margin top fix
    <div className="bg-transparent pb-14 w-full mx-auto max-w-[1700px] select-none animate-[fadeIn_0.4s_ease-out] mt-4 md:mt-0 lg:mt-2">
      
      {/* 🔴 HEADER MANAGEMENT BAR */}
      <section className="w-full flex flex-row items-center justify-between gap-4 mb-4 sm:mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-sm mt-2 sm:mt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 bg-red-50 rounded-xl text-[#880808] border border-red-100/60 shadow-sm relative shrink-0">
            <MdOutlineNotificationsActive size={20} className="sm:size-[22px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-wide leading-none">
              Alert <span className="text-[#880808]">Center</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">
              {unreadCount > 0 ? `${unreadCount} New Impact Updates` : "All Impact Logs Read"}
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

      {/* 🔴 ALERT FEED LIST BLOCK */}
      <div className="w-full space-y-3 sm:space-y-4">
        {loading ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-xs animate-pulse">Syncing Alerts...</p>
          </div>
        ) : notifications.length === 0 && directRequests.length === 0 ? (
          <div className="bg-white p-12 sm:p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
              <MdOutlineNotificationsActive size={24} />
            </div>
            <p className="text-gray-400 font-medium italic text-sm">Your impact updates feed is currently empty.</p>
          </div>
        ) : (
          <>
            {/* 🔴 DIRECT REQUESTS CARDS */}
            {directRequests.map((req) => {
              
              // 🔴 Check local UI status
              const status = cardStatus[req._id];

              // STATE 1: DECLINED UI
              if (status === 'declined') {
                return (
                  <div key={req._id} className="relative flex flex-col p-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-gray-50/50 shadow-sm transition-all duration-300">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <MdBlock size={18} />
                      <p className="font-bold text-[11px] sm:text-sm uppercase tracking-widest">Request Declined</p>
                    </div>
                  </div>
                );
              }

              // STATE 2: ACCEPTED UI
              if (status === 'accepted') {
                return (
                  <div key={req._id} className="relative flex flex-col p-3.5 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm transition-all duration-300">
                    <div className="flex flex-col items-center justify-center gap-1 text-emerald-700">
                      <MdCheckCircle size={20} className="mb-0.5 sm:mb-1" />
                      <p className="font-bold text-[11px] sm:text-sm uppercase tracking-widest">Request Accepted</p>
                      <p className="text-[9px] sm:text-[10px] font-semibold text-emerald-600/80 uppercase">Patient has been notified via alert center.</p>
                    </div>
                  </div>
                );
              }

              // STATE 3: NORMAL PENDING UI 
              return (
                <div key={req._id} className="relative flex flex-col p-3 sm:p-5 rounded-2xl border-2 border-red-200 bg-red-50/30 shadow-md transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex items-center justify-center bg-gradient-to-br from-[#880808] to-red-800 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-md shrink-0">
                        {req.bloodGroup}
                      </span>
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900 text-[11px] sm:text-base uppercase tracking-wide">Emergency Direct Request</h3>
                        <p className="text-[9px] sm:text-[10px] text-red-600 font-bold uppercase tracking-wider animate-pulse">Patient is waiting for response</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 bg-white p-2.5 sm:p-3 rounded-xl border border-red-100 text-left">
                    <div>
                      <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-bold mb-0.5">Patient Name</p>
                      <p className="font-semibold text-gray-800 text-[11px] sm:text-xs truncate">{req.name}</p>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-bold mb-0.5">Hospital</p>
                      <p className="font-semibold text-gray-800 text-[11px] sm:text-xs flex items-center gap-1 truncate">
                        <MdOutlineLocationOn className="text-red-500 shrink-0" /> {req.hospital}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-bold mb-0.5">Units</p>
                      <p className="font-semibold text-gray-800 text-[11px] sm:text-xs">{req.units} Units</p>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-bold mb-0.5">Contact</p>
                      <p className="font-semibold text-gray-800 text-[11px] sm:text-xs flex items-center gap-1">
                        <MdCall className="text-emerald-600 shrink-0" /> {req.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAcceptRequest(req)}
                      disabled={actionLoading === req._id}
                      className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 rounded-[10px] sm:rounded-xl text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      <MdCheckCircle size={14} /> {actionLoading === req._id ? 'Processing...' : 'Accept Request ✓'}
                    </button>
                    <button 
                      onClick={() => handleRejectRequest(req._id)}
                      disabled={actionLoading === req._id}
                      className="flex-1 bg-red-100 hover:bg-red-200 border border-red-200 text-[#880808] py-2.5 sm:py-3 rounded-[10px] sm:rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                      <MdCancel size={13} /> Decline
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 🔴 NORMAL NOTIFICATIONS  */}
            {notifications.map((notif) => (
              <div 
                key={notif._id} 
                onClick={() => navigate('/donor-history')}
                // 🔴 Compact padding applied to normal notification items
                className={`group relative flex flex-col gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl border bg-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
                  !notif.isRead ? 'border-emerald-500/30 bg-emerald-50/5 ring-1 ring-emerald-500/10' : 'border-gray-100'
                }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${!notif.isRead ? 'bg-emerald-500' : 'bg-emerald-400/40'}`} />
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4 w-full pl-1 sm:pl-2">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    
                    {/* Compact Icon */}
                    <div className={`shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border transition-colors ${!notif.isRead ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200/60'}`}>
                      <IoHeartSharp className="text-base sm:text-xl text-red-600" />
                    </div>
                    
                    <div className="min-w-0 text-left flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5 sm:mb-1">
                        {!notif.isRead ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-[pulse_2s_infinite]">New Update</span>
                        ) : (
                          <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-emerald-600">Life Saved Successfully</span>
                        )}
                        <span className="w-1 h-1 rounded-full bg-gray-200 hidden sm:block" />
                        <span className="text-[8px] sm:text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{notif.type || 'SYSTEM'} ALERT</span>
                      </div>
                      <h3 className={`tracking-wide mb-0.5 truncate text-[13px] sm:text-base ${!notif.isRead ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                        {notif.type === 'COMPLETED' ? 'Life Saved Successfully!' : 'New Update Received'}
                      </h3>
                      <p className={`text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed ${!notif.isRead ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                        {notif.message}
                      </p>
                    </div>
                  </div>

                  {/* Compact Time/Delete */}
                  <div className="w-full md:w-auto shrink-0 pt-1.5 md:pt-0 border-t md:border-none border-gray-100 flex items-center justify-between md:justify-end gap-3 sm:gap-4">
                    <span className="text-[8px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button onClick={(e) => deleteNotification(notif._id, e)} className="p-1 sm:p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100">
                      <MdDeleteOutline size={16} className="sm:size-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* 🔴 CALL TO ACTION */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-5 sm:p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-md mt-6">
        <div className="text-center md:text-left">
          <h4 className="text-[15px] sm:text-lg font-semibold tracking-wide mb-0.5 uppercase">Impact Records</h4>
          <p className="text-emerald-50/90 text-[11px] sm:text-sm font-medium tracking-wide">
            Your historic blood contributions are building a resilient, safer community footprint.
          </p>
        </div>
        <button onClick={() => navigate('/history')} className="w-full md:w-auto whitespace-nowrap bg-white text-emerald-700 px-6 py-2.5 rounded-xl font-semibold text-[11px] sm:text-sm uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-sm active:scale-95">
          Explore History
        </button>
      </div>

    </div>
  );
};

export default Notifications;