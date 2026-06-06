import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PatientSidebar from './Sidebar'; 
import Navbar from './Navbar'; 
import Hero from './Hero'; 
import BloodReq from './BloodReq';
import DonorPool from './DonorPool';
import History from './History';
import Notifications from './Notifications';
import Profile from './Profile';

const PatientDashboard = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] ">
      <PatientSidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        onLogout={onLogout} 
      />

      <main className="flex-1 md:ml-[250px] flex flex-col h-screen overflow-y-auto no-scrollbar">
        <Navbar setIsOpen={setIsOpen} user={user} />
        
        {/* Main Content Wrapper */}
        <div className="w-[95%] mx-auto max-w-[1700px] px-5 md:px-8 lg:px-12 pb-[35px] mt-2">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="*" element={<Hero />} /> 
            <Route path="/dashboard" element={<Hero />} />
            <Route path="requests" element={<BloodReq />} />
            <Route path="pool" element={<DonorPool />} />
            <Route path="pool/:donorId" element={<DonorPool />} />
            <Route path="history" element={<History />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;