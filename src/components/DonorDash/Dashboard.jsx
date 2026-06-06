import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🔴 NAYA: Axios import kiya API call ke liye
import Sidebar from './Sidebar';
import StatusNavbar from './StatusNavbar'; 
import FooterSection from './Footer'; 
import HeroSection from './HeroSection';
import RequestsAndActivity from './Notifications'; 
import DonationHistory from './BloodHistory'; 
import Notifications from './NotifyTab';
import ReqTab from './ReqTab'; 
import Schedule from './Schedule';
import Profile from './Profile';

const Dashboard = ({ setIsLoggedIn, setUser: setGlobalUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/') {
      navigate('dashboard', { replace: true });
    }
  }, [navigate]);

  //  🔄 AUTH PERSISTENCE & REAL API DATA FETCHING FLOW
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      const parsedUser = JSON.parse(savedUser);
      
      setDonorData({
        name: parsedUser.name || "Donor Hero",
        email: parsedUser.email || "N/A",
        phone: parsedUser.phone || "Not Provided",
        location: parsedUser.location || "Not Set",
        bloodGroup: parsedUser.bloodGroup || "N/A",
        age: parsedUser.age || "18",
        donations: parsedUser.donations || 0,
        livesSaved: (parsedUser.donations || 0) * 3,
        streak: parsedUser.donations > 0 ? "Active" : "New",
        daysLeft: 90,
        totalDays: 90,
        nextDate: "12 Feb 2026",
        isAvailable: true
      });

      const fetchRealStats = async () => {
        try {
          const response = await axios.get('https://lifedrop-backend-orz5.onrender.com/api/blood-requests');
          const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
          
          const currentDonorName = parsedUser.name || parsedUser.username;
          
          // Sirf is donor ki 'Completed' requests filter karo
          const completedRequests = data.filter(
            req => req.status === 'Completed' && req.donorName === currentDonorName
          );
          
          const realDonations = completedRequests.length;

          // State update karo naye real numbers ke sath
          setDonorData(prev => ({
            ...prev,
            donations: realDonations,
            livesSaved: realDonations * 3, // 🧠 1 Donation = 3 Lives Saved
            streak: realDonations > 2 ? "On Fire 🔥" : (realDonations > 0 ? "Active" : "New")
          }));
        } catch (error) {
          console.error("Failed to fetch real donation stats from DB", error);
        }
      };

      fetchRealStats(); // Call maro
      
    } else {
      setIsLoggedIn(false);
      navigate('/');
    }
  }, [navigate, setIsLoggedIn]);

  // 1. Toggle 
  const toggleAvailability = () => {
    setDonorData(prev => ({ 
      ...prev, 
      isAvailable: !prev.isAvailable 
    }));
  };

  // 2. Slider
  const handleDaysChange = (newDays) => {
    setDonorData(prev => ({ 
      ...prev, 
      daysLeft: Number(newDays) 
    }));
  };

  // Profile 
  const handleProfileUpdate = (updatedFields) => {
    setDonorData(prev => {
      const newData = { ...prev, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(newData)); 
      return newData;
    });
  };

  // 3. MASTER ACTION 
  const handleSuccessfulDonation = () => {
    setDonorData(prev => {
      const newDonations = prev.donations + 1;
      return {
        ...prev,
        donations: newDonations,
        livesSaved: newDonations * 3, 
        streak: newDonations > 2 ? "On Fire 🔥" : "Active",
        daysLeft: prev.totalDays 
      };
    });
  };

  // 3. ⏳ LOADING SHIMMER
  if (!donorData) return (
    <div className="h-screen w-full flex items-center justify-center bg-white select-none">
       <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#880808] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#880808] font-bold tracking-widest animate-pulse uppercase text-xs">Initializing LifeDrop...</p>
       </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        setIsLoggedIn={setIsLoggedIn} 
        setUser={setGlobalUser} 
      />

      <main className="flex-1 md:ml-[250px] flex flex-col h-screen overflow-y-auto no-scrollbar">
        <StatusNavbar setIsOpen={setIsOpen} user={donorData} />
        
        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pb-[35px]">

          <Routes>
            {/* Default Index Route */}
            <Route index element={
              <div className="space-y-6 mt-2">
                <HeroSection 
                  donor={donorData} 
                  onToggle={toggleAvailability} 
                  onDaysChange={handleDaysChange} 
                />
                {/* ================= 📊 DYNAMIC COUNTERS GRID SECTION ================= */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Total Donations", val: donorData.donations, unit: "Lifetime", type: "burgundy" },
                    { label: "Lives Saved", val: donorData.livesSaved, unit: "≈3 per donation", type: "emerald" },
                    { label: "Donation Streak", val: donorData.streak, unit: "Consistent hero", type: "amber" },
                    { label: "Next Eligible", val: `${donorData.daysLeft} Days`, unit: "Remaining window", type: "slate" }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className={`relative overflow-hidden p-3.5 sm:p-5 rounded-xl bg-white border shadow-sm transition-all duration-300 hover:shadow-md text-left select-none ${
                        stat.type === "burgundy" ? "border-red-100" :
                        stat.type === "emerald" ? "border-emerald-100" :
                        stat.type === "amber" ? "border-amber-100" :
                        "border-slate-200/60"
                      }`}
                    >
                      <p className="text-gray-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider mb-2 truncate">
                        {stat.label}
                      </p>

                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-none ${
                        stat.type === "burgundy" ? "text-[#880808]" : 
                        stat.type === "emerald" ? "text-emerald-700" : 
                        stat.type === "amber" ? "text-amber-600" : 
                        "text-slate-700"
                      }`}>
                        {stat.val}
                      </h3>

                      <p className="text-[10px] font-semibold text-gray-400 mt-2 uppercase tracking-wide truncate">
                        {stat.unit}
                      </p>

                      <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] ${
                        stat.type === "burgundy" ? "bg-[#880808]" : 
                        stat.type === "emerald" ? "bg-emerald-500" : 
                        stat.type === "amber" ? "bg-amber-500" : 
                        "bg-slate-400"
                      }`} />
                    </div>
                  ))}
                </div>

                <RequestsAndActivity onAccept={handleSuccessfulDonation} />
                <FooterSection />
              </div>
            } />
            
            {/* Sub-Route For Sidebar Handshake */}
            <Route path="dashboard" element={
              <div className="space-y-6 mt-2">
                <HeroSection donor={donorData} onToggle={toggleAvailability} onDaysChange={handleDaysChange} />
                
                {/* ================= 📊 DYNAMIC COUNTERS GRID SECTION ================= */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Total Donations", val: donorData.donations, unit: "Lifetime", type: "burgundy" },
                    { label: "Lives Saved", val: donorData.livesSaved, unit: "≈3 per donation", type: "emerald" },
                    { label: "Donation Streak", val: donorData.streak, unit: "Consistent hero", type: "amber" },
                    { label: "Next Eligible", val: `${donorData.daysLeft} Days`, unit: "Remaining window", type: "slate" }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className={`relative overflow-hidden p-3.5 sm:p-5 rounded-xl bg-white border shadow-sm transition-all duration-300 hover:shadow-md text-left select-none ${
                        stat.type === "burgundy" ? "border-red-100" :
                        stat.type === "emerald" ? "border-emerald-100" :
                        stat.type === "amber" ? "border-amber-100" :
                        "border-slate-200/60"
                      }`}
                    >
                      <p className="text-gray-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider mb-2 truncate">
                        {stat.label}
                      </p>

                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-none ${
                        stat.type === "burgundy" ? "text-[#880808]" : 
                        stat.type === "emerald" ? "text-emerald-700" : 
                        stat.type === "amber" ? "text-amber-600" : 
                        "text-slate-700"
                      }`}>
                        {stat.val}
                      </h3>

                      <p className="text-[10px] font-semibold text-gray-400 mt-2 uppercase tracking-wide truncate">
                        {stat.unit}
                      </p>

                      <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] ${
                        stat.type === "burgundy" ? "bg-[#880808]" : 
                        stat.type === "emerald" ? "bg-emerald-500" : 
                        stat.type === "amber" ? "bg-amber-500" : 
                        "bg-slate-400"
                      }`} />
                    </div>
                  ))}
                </div>

                <RequestsAndActivity />
                <FooterSection />
              </div>
            } />
            
            <Route path="/history" element={<DonationHistory donor={donorData} />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/requests" element={<ReqTab />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile user={donorData} onUpdateProfile={handleProfileUpdate} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;