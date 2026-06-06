import React from 'react';
import { MapPin, Droplets, Users } from 'lucide-react';

const Hero = ({ onRegisterClick, onPatientAuth }) => {
  return (
    <section className="relative pt-[100px] sm:pt-[120px] pb-10 sm:pb-15 bg-white overflow-hidden">
      {/* Custom Animation Style */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(35px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Main Container - Adjusted gap for mobile */}
      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
        
        {/* Left Content */}
        {/* Text Center on mobile, Left on Desktop */}
        <div className="md:w-1/2 space-y-4 sm:space-y-6 flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
          
          <div className="text-red-600 font-[700] tracking-widest text-[10px] sm:text-xs uppercase bg-red-50/50 px-3 py-1 rounded-full w-fit">
            Every Drop Counts
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[700] text-gray-900 tracking-tight leading-[1.15] sm:leading-[1.1]">
            Donate Blood, <br className="hidden sm:block"/>
            <span className="text-red-600 block sm:inline mt-1 sm:mt-0">Save Lives</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-sm sm:max-w-lg mx-auto md:mx-0">
            A single blood donation can save up to three lives. Be a hero. Be a donor.
          </p>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 pt-2 sm:pt-4">
            
            {/* 🔴 I Need Blood Button (DOCTOR) */}
            <button 
              onClick={() => onPatientAuth("login")}
              className="flex items-center justify-center sm:justify-start gap-3 bg-red-600 text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-[0_8px_20px_rgba(220,38,38,0.25)] active:scale-[0.98] w-full sm:w-auto"
            >
              <Droplets className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <div className="text-left pointer-events-none">
                <div className="text-sm sm:text-base font-bold flex items-center gap-1.5 flex-wrap">
                  I Need Blood <span className="text-[10px] sm:text-xs font-semibold bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-md">(Doctor)</span>
                </div>
                <div className="text-[10px] sm:text-xs font-normal opacity-90 mt-0.5">
                  Request for blood
                </div>
              </div>
            </button>

            {/* ⚪ I Want to Donate Button (DONOR) */}
            <button 
              onClick={onRegisterClick}
              className="flex items-center justify-center sm:justify-start gap-3 border-2 border-red-200 bg-white text-red-600 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-bold hover:border-red-600 hover:bg-red-50 transition-all group active:scale-[0.98] w-full sm:w-auto shadow-sm"
            >
              <Users className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div className="text-left pointer-events-none">
                <div className="text-sm sm:text-base font-bold flex items-center gap-1.5 flex-wrap">
                  I Want to Donate <span className="text-[10px] sm:text-xs font-semibold bg-red-100 text-red-700 px-1.5 sm:px-2 py-0.5 rounded-md">(Donor)</span>
                </div>
                <div className="text-[10px] sm:text-xs font-normal opacity-90 mt-0.5">
                  Become a donor
                </div>
              </div>
            </button>

          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 pt-4 sm:pt-6">
            <MapPin size={16} className="text-red-600 sm:w-[18px] sm:h-[18px]" />
            <span className="text-[11px] sm:text-sm font-medium">Find donors near you. Save time. Save lives.</span>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="md:w-1/2 flex justify-center items-center w-full px-4 sm:px-0">
          <img 
            src="/herohome.jpg" 
            alt="Blood Donation" 
            className="w-full max-w-[280px] sm:max-w-sm md:max-w-lg object-contain animate-float drop-shadow-2xl"
          />
        </div>
        
      </div>
    </section>
  );
};

export default Hero;