import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import { 
  MdSearch, MdOutlineLocationOn, MdCall, 
  MdOutlinePersonOutline, MdSend, MdOutlineBloodtype,
  MdOutlineWarningAmber, MdCheckCircleOutline, MdClose, MdCheck
} from "react-icons/md";

const DonorPool = () => {
  const { donorId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const requestId = params.get('requestId'); 

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState([]); 
  
  const [sentRequests, setSentRequests] = useState(new Set());
  const [sendingId, setSendingId] = useState(null); 

  const getCurrentPatient = () => {
    try {
      const patientUser = JSON.parse(localStorage.getItem('patientUser'));
      const generalUser = JSON.parse(localStorage.getItem('user'));
      return patientUser || generalUser || null;
    } catch {
      return null;
    }
  };

  // ================= 🔄 LOAD LIVE DATA CHANNEL =================
  const syncDonorPoolEngine = async () => {
    try {
      setLoading(true);
      if (requestId) {
        const response = await axios.get(`https://lifedrop-backend-orz5.onrender.com/api/donor-pool/${requestId}`);
        if (response.data.success) {
          const liveData = response.data;
          setDonors([{
            _id: liveData.requestId || requestId,
            name: liveData.donorName || "Committed Volunteer",
            bloodGroup: liveData.bloodGroup,
            donations: "Emergency Match Partner", 
            location: liveData.donorAddress || "Medical Unit Vicinity",
            phone: liveData.donorPhone || "Contact Panel Awaiting",
            isLiveCommitted: true 
          }]);
        }
      } else {
        const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/donors/all');
        if (response.data.success) {
          const formattedDonors = response.data.data.map((donor, index) => ({
            _id: donor._id,
            name: donor.name,
            bloodGroup: donor.bloodGroup,
            donations: `${12 + index} Real Units Logged`, 
            location: donor.address || "Bhopal, India",
            phone: donor.phone,
            isLiveCommitted: false 
          }));
          setDonors(formattedDonors);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error synchronizing active donor core stream:", error);
      setLoading(false);
    }
  };

  const syncSentRequestsFromDB = async () => {
    const patientData = getCurrentPatient();
    if (!patientData || !patientData.name) return;

    try {
      const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
      const activeIds = response.data
        .filter(req => req.isPrivate === true && req.name === patientData.name && req.status !== 'Completed' && req.status !== 'Accepted')
        .map(req => req.targetDonorId);
      
      setSentRequests(new Set(activeIds)); // Auto-update buttons
    } catch (error) {
      console.error("Error fetching sent requests from DB:", error);
    }
  };

  useEffect(() => {
    syncDonorPoolEngine();
    syncSentRequestsFromDB(); 

    const searchFromUrl = params.get('search');
    if (searchFromUrl) setSearchQuery(decodeURIComponent(searchFromUrl));
  }, [requestId, location.search]);


 // ================= ✨ NEW DIRECT REQUEST LOGIC =================
  const sendDirectRequest = async (donor) => {
    const patientData = getCurrentPatient();
    
    if (!patientData || !patientData.name) {
      alert("Please login to send direct requests.");
      return;
    }

    const hospitalName = window.prompt(`Please enter the Hospital/Location where ${donor.name} needs to come:`, "");
    if (hospitalName === null || hospitalName.trim() === "") return; 

    // 🔴 NEW PROMPT: BLOOD GROUP
    const bloodGroupInput = window.prompt("Enter required Blood Group (e.g., B+):", patientData.bloodGroup || donor.bloodGroup);
    if (bloodGroupInput === null || bloodGroupInput.trim() === "") return;

    const requiredUnits = window.prompt("How many units of blood are required?", "1");
    if (requiredUnits === null) return;

    const contactNumber = window.prompt("Please enter an Emergency Contact Number so the donor can reach you:", patientData.phone || "");
    if (contactNumber === null || contactNumber.trim() === "") {
      alert("Contact number is mandatory.");
      return;
    }

    if (window.confirm(`Confirm sending direct emergency request to ${donor.name}?`)) {
      setSendingId(donor._id); 

      try {
        const payload = {
          name: patientData.name || "Unknown Patient",
          phone: contactNumber, 
          bloodGroup: bloodGroupInput, 
          units: parseInt(requiredUnits) || 1,
          hospital: hospitalName, 
          urgency: "Critical",
          targetDonorId: donor._id,
          isPrivate: true
        };

        const response = await axios.post('https://lifedrop-backend-orz5.onrender.com/api/blood-requests', payload);

        if (response.data.success) {
          setSentRequests(prev => new Set(prev).add(donor._id));
        }
      } catch (error) {
        console.error("Failed to send direct request:", error);
        alert(error.response?.data?.message || "Failed to send request.");
      } finally {
        setSendingId(null); 
      }
    }
  };

  // 🟢 1. SUCCESS BUTTON LOGIC
  const handleDonationSuccess = async (donorName) => {
    if (window.confirm(`Has ${donorName} successfully donated blood? Confirming will move this request to your history.`)) {
      try {
        const patientData = getCurrentPatient();
        const patientName = patientData ? (patientData.name || "Patient") : "Patient";
        
        await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/blood-requests/${requestId}/complete`, {
          donorName: donorName,
          patientName: patientName,
          hospitalName: "Registered Hospital" 
        });

        alert("Success! The donation record has been verified and moved to the Clinical History Archive.");
        navigate('/history');
      } catch (error) {
        console.error("Error marking request complete:", error);
        alert("Server error. Please try again.");
      }
    }
  };

  // 🔴 2. IGNORE/CANCEL BUTTON LOGIC
  const handleIgnoreRequest = async () => {
    if (window.confirm(`Are you sure you want to decline this request? It will be returned to the public pool for other available donors.`)) {
      try {
        await axios.put(`https://lifedrop-backend-orz5.onrender.com/api/blood-requests/${requestId}/ignore`);
        alert("Request declined successfully. It is now visible in the public pool.");
        navigate('/notifications');
      } catch (error) {
        console.error("Error ignoring request:", error);
        alert("Server error. Please try again.");
      }
    }
  };

  const filteredDonors = donors.filter((donor) => {
    if (donorId) return donor._id.toString() === donorId.toString();
    const searchLower = searchQuery.toLowerCase().trim();
    return (
      donor.name.toLowerCase().includes(searchLower) ||
      donor.bloodGroup.toLowerCase().includes(searchLower) ||
      donor.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-transparent pb-14 w-full px-2 sm:px-4 select-none animate-[fadeIn_0.4s_ease-out] mt-4 md:mt-0 lg:mt-2">
      
      {/* 🔴 1. PORTAL BRANDING DIRECTORY NAVIGATION HEADER */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-md text-left">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2 bg-red-50 rounded-xl text-[#880808] border border-red-100/40 shadow-sm shrink-0">
            <MdOutlinePersonOutline size={18} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 tracking-wide leading-none">
              {requestId ? "Exclusive Assignment" : "Donor"}{" "}
              <span className="text-[#880808]">Pool</span>
            </h1>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
              {requestId 
                ? "Showing committed volunteer assigned for your active live tracking request" 
                : `Verified Clinical Registry (${filteredDonors.length} Donors Online)`}
            </p>
          </div>
        </div>

        {!requestId && (
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 animate-[fadeIn_0.2s_ease-out]">
            <div className="relative flex-1 md:w-80 group">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search via blood group, name, or city..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/60 border border-gray-200/80 focus:border-red-300 text-xs sm:text-sm font-medium text-neutral-800 placeholder-gray-400 rounded-xl outline-none transition-all focus:ring-4 focus:ring-red-50/60 shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </section>

      {/* 🔴 INDUSTRIAL INSULATED BANNER WARNING LAYER IN EXCLUSIVE VIEW */}
      {requestId && !loading && filteredDonors.length > 0 && (
        <div className="bg-red-50/60 border border-red-200/70 p-4 rounded-2xl flex gap-3 text-left mb-5 animate-[fadeIn_0.3s_ease-out]">
          <MdOutlineWarningAmber className="text-[#880808] text-xl shrink-0 mt-0.5" />
          <p className="text-[11px] text-red-900 font-semibold leading-relaxed uppercase tracking-wide">
            COMMITTED MODE ENABLED: OTHER DIRECTORY POOLS HAVE BEEN FILTERED OUT TO PROTECT YOUR TRACKING SEQUENCE. PLEASE CALL AND COORDINATE TRANSIT IMMEDIATELY.
          </p>
        </div>
      )}

      {/* 🔴 2. ACTIVE PROFILE DISPLAY MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-400 font-semibold animate-pulse uppercase text-xs tracking-wider bg-white rounded-2xl border p-5 shadow-sm">
            Streaming Real-time Registry Network Nodes from Database...
          </div>
        ) : filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div 
              key={donor._id} 
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-md relative border-l-[5px] flex flex-col justify-between hover:shadow-lg transition-all duration-300 text-left ${
                donor.isLiveCommitted ? 'border-l-[#880808] border-red-100/70 bg-gradient-to-br from-red-50/30 to-white' : 'border-l-[#880808] border-gray-100'
              }`}
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="flex flex-col items-center justify-center min-w-[48px] h-[48px] rounded-xl text-white shadow-sm bg-gradient-to-br from-[#880808] to-red-800 shadow-red-100">
                    <span className="text-sm font-bold leading-none">{donor.bloodGroup}</span>
                    <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5 opacity-70">Factor</span>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-wide truncate">{donor.name}</h3>
                    <p className="text-[9px] font-extrabold text-red-700 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                      {donor.isLiveCommitted ? (
                        <>
                          <MdCheckCircleOutline className="text-xs shrink-0" />
                          Assigned Life Saving Partner
                        </>
                      ) : (
                        `Registry Token: #${donor._id.slice(-4).toUpperCase()}`
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-5 text-left">
                  <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl shadow-inner">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Clinical Log</p>
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-0.5 truncate">
                      <MdOutlineBloodtype className="text-[#880808] text-sm shrink-0" />
                      {donor.donations}
                    </span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl shadow-inner min-w-0">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Transit Proximity</p>
                    <span className="text-[11px] font-bold text-gray-700 truncate block">
                      <MdOutlineLocationOn className="text-[#880808] inline shrink-0 mr-0.5" />
                      {donor.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* 🔴 CONTROL INTERACTION BUTTONS CONDITIONAL COMPILER BRIDGE */}
              <div className="flex flex-col gap-2 w-full mt-auto pt-1">
                {donor.isLiveCommitted ? (
                  <div className="space-y-2 w-full animate-[fadeIn_0.2s_ease-out]">
                    <a 
                      href={`tel:${donor.phone}`} 
                      className="flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100/80 border border-red-200 text-[#880808] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm"
                    >
                      <MdCall size={16} className="animate-bounce" /> Call Responder: {donor.phone}
                    </a>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDonationSuccess(donor.name)}
                        className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-widest shadow-md transition-all active:scale-95"
                      >
                        Donation Succeed ✓
                      </button>
                      
                      <button 
                        onClick={handleIgnoreRequest} 
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white border border-red-700 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm active:scale-95"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <MdClose size={12} />
                          <span>Cancel</span>
                        </div>
                      </button>
                    </div>

                  </div>
                ) : (
                  <button 
                    onClick={() => {
                        if (!sentRequests.has(donor._id)) {
                            sendDirectRequest(donor);
                        }
                    }}
                    disabled={sentRequests.has(donor._id) || sendingId === donor._id}
                    className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm active:scale-[0.95] ${
                      sentRequests.has(donor._id) 
                        ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                        : 'bg-gray-950 text-white hover:bg-[#880808]' 
                    }`}
                  >
                    {sendingId === donor._id ? (
                        "Sending..."
                    ) : sentRequests.has(donor._id) ? (
                        <>
                            <MdCheck size={14} className="text-emerald-600" />
                            Request Sent
                        </>
                    ) : (
                        <>
                            <MdSend size={14} />
                            Send Direct Request
                        </>
                    )}
                  </button>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400 font-bold uppercase tracking-wider text-xs bg-white rounded-2xl border border-gray-100">
            No dynamic or active registered donors found in the network database.
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorPool;