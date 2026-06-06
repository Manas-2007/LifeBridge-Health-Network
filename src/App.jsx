import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import axios from "axios";
import Hero from "./components/homepage/Hero";
import InfoSection from "./components/homepage/InfoSection";
import HowItWorks from "./components/homepage/HowItWorks";
import Testimonials from "./components/homepage/Testimonials";
import Footer from "./components/homepage/Footer";
import DRegister from "./components/auth/DRegister";
import PRegister from "./components/auth/PRegister";
import DonorDashboard from './components/DonorDash/Dashboard';
import PatientDashboard from './components/PatientDash/Dashboard';

function App() {
  const navigate = useNavigate();
  // Logic States
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null); 
  const [userType, setUserType] = useState(null); 
  const [donorMode, setDonorMode] = useState(null);    
  const [patientMode, setPatientMode] = useState(null); 

  useEffect(() => {
    axios.get('https://lifedrop-backend-orz5.onrender.com/')
      .then(() => console.log('Backend is awake and ready! 🚀'))
      .catch(() => console.log('Backend waking up call sent... 🔥'));
  }, []);

  // --- 🔄 REFRESH HANDLER ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedDonor = localStorage.getItem('user');
    const savedPatient = localStorage.getItem('patientUser');

    if (token) {
      if (savedPatient) {
        const parsedPatient = JSON.parse(savedPatient);
        setUser(parsedPatient);
        setIsLoggedIn(true);
        setUserType('patient');
      } else if (savedDonor) {
        const parsedDonor = JSON.parse(savedDonor);
        setUser(parsedDonor);
        setIsLoggedIn(true);
        setUserType('donor');
      }
    }
  }, []);

  // --- LOGIN HANDLERS ---
  const handleDonorLogin = () => {
    setDonorMode(null);
    setUserType('donor');
    setIsLoggedIn(true);
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  };

  const handlePatientLogin = () => {
    setPatientMode(null);
    setUserType('patient');
    setIsLoggedIn(true);
    const savedUser = localStorage.getItem('patientUser');
    if (savedUser) setUser(JSON.parse(savedUser));
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('patientUser');
    localStorage.removeItem('userType'); 
    setIsLoggedIn(false);
    setUser(null);
    setUserType(null);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      
      {!isLoggedIn ? (
        <>
          {/* 🔴 NAVBAR: */}
          <Navbar 
            onRegisterClick={() => setDonorMode("register")} 
            onPatientAuth={(mode) => setPatientMode(mode)} 
          />

          <main>
            <Hero
              onRegisterClick={() => setDonorMode("register")}
              onPatientAuth={(mode) => setPatientMode(mode)}
            />
            <InfoSection />
            <HowItWorks />
            <Testimonials />
          </main>

          <Footer />

          {/* 🔴 DONOR MODAL */}
          {donorMode && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <DRegister
                mode={donorMode}
                setMode={setDonorMode}
                onClose={() => setDonorMode(null)}
                onLoginSuccess={handleDonorLogin} 
              />
            </div>
          )}

          {/* 🟣 PATIENT MODAL */}
          {patientMode && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <PRegister
                mode={patientMode}
                setMode={setPatientMode}
                onClose={() => setPatientMode(null)}
                onLoginSuccess={handlePatientLogin}
              />
            </div>
          )}
        </>
      ) : (
        /* --- DASHBOARD SELECTION --- */
        userType === 'donor' ? (
          <DonorDashboard 
            setIsLoggedIn={setIsLoggedIn} 
            setUser={setUser} 
            onLogout={handleLogout} 
          />
        ) : (
          <PatientDashboard 
            setIsLoggedIn={setIsLoggedIn} 
            setUser={setUser} 
            onLogout={handleLogout} 
            user={user}
          />
        )
      )}

    </div>
  );
}

export default App;