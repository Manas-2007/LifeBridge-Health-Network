import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSearch, MdNotificationsNone, MdOutlineGpsFixed, MdVerified } from "react-icons/md";
import { IoCallOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const Navbar = ({ setIsOpen, user }) => {
  const navigate = useNavigate(); 
  
  // 🔴 DOCTOR IDENTITY LOGIC
  const rawFirstName = user?.name ? user.name.split(' ')[0] : "Guest";
  const displayName = rawFirstName.toLowerCase().startsWith('dr') ? rawFirstName : `Dr. ${rawFirstName}`;
  const initial = rawFirstName.charAt(0).toUpperCase();

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 shadow-sm px-5 md:px-8 lg:px-12 py-3 md:py-4 sticky top-0 z-30 select-none">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        
        {/* TOP BAR CONTAINER */}
        <div className="flex items-center justify-between min-w-0 w-full md:w-auto">
          
          {/* LEFT COMPONENT: BRANDING */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 bg-gray-50 hover:bg-red-50/60 border border-gray-200/60 rounded-xl flex flex-col justify-center items-center gap-1 active:scale-90 transition-all duration-200 shrink-0 shadow-sm"
              aria-label="Open Side Panel"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#880808]" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              </div>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            </button>

            <div className="flex items-center gap-2 md:hidden">
              <img src="/navlogo.jpg" className="w-9 h-9 object-contain rounded-lg border border-gray-100" alt="Logo" />
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                Life<span className="text-[#880808]">Drop</span>
              </h1>
            </div>

            <div className="hidden md:flex flex-col min-w-0 text-left">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-wide leading-tight">
                Welcome <span className="text-[#880808]">{displayName}</span>
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5 tracking-wide">
                Life-Saving Connections • <span className="text-[#880808]/80 font-semibold">Real-time Oversight</span>
              </p>
            </div>
          </div>

          {/* MOBILE RESPONSIVE SHORTCUT LINKS */}
          <div className="flex items-center gap-4 md:hidden">
            <div className="flex flex-col items-center gap-0.5 cursor-pointer" onClick={() => navigate('notifications')}>
              <div className="relative w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <MdNotificationsNone className="text-lg text-red-700" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#880808] rounded-full ring-2 ring-white animate-pulse" />
              </div>
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Alerts</span>
            </div>

            {/* MOBILE PROFILE ICON */}
            <div className="flex flex-col items-center gap-0.5 cursor-pointer" onClick={() => navigate('profile')}>
              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-[#880808] font-bold text-xs border border-gray-200 relative">
                {initial}
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-white">
                  ✓
                </span>
              </div>
              <span className="text-[9px] font-semibold text-gray-700 uppercase tracking-wide max-w-[55px] truncate">
                {displayName}
              </span>
            </div>
          </div>

        </div>

        {/* CONTROL STRIP CONTAINER */}
        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 lg:gap-8 w-full md:w-auto">
          
          <div className="hidden md:flex relative items-center w-full md:w-[260px] lg:w-[300px] group">               <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <MdOutlineSearch className="text-lg text-red-700" />
            </span>
            <input 
              type="text" 
              placeholder="Search requests near you..." 
              className="w-full bg-gray-50 border border-gray-200/80 focus:border-red-300 py-2.5 pl-10 pr-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-4 focus:ring-red-50/60"
            />
          </div>

          {/* DESKTOP ACTION GRID */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
            
            <button className="flex flex-col items-center group gap-1 cursor-pointer" onClick={() => navigate('notifications')}>
              <div className="relative w-11 h-11 bg-red-50/60 hover:bg-red-50 border border-red-100 group-hover:border-red-200 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95">
                <MdNotificationsNone className="text-xl text-red-700 transform group-hover:scale-105 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#880808] rounded-full ring-2 ring-white animate-pulse" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:text-red-700 transition-colors">
                Alerts
              </span>
            </button>

            {/* Profile Meta Segment Wrapper */}
            <div className="flex items-center gap-5 pl-4 border-l border-gray-100">
              <div className="flex flex-col text-right justify-center">
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {displayName}
                </p>
                <p className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mt-1.5 uppercase tracking-wider self-end">
                  Verified Doctor
                </p>
              </div>

              {/* DESKTOP PROFILE ICON */}
              <div className="flex flex-col items-center group gap-1 cursor-pointer" onClick={() => navigate('profile')}>
                <div className="w-11 h-11 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95 overflow-hidden">
                  <span className="text-[#880808] font-semibold text-base transform group-hover:scale-105 transition-transform">
                    {initial}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                  Profile
                </span>
              </div>
            </div>

          </div>
      </div>
        </div>
      </nav>
    </>
  );
};

export const BloodRequests = () => {
  const requests = [
    { id: 1, name: "Rohan K.", status: "Critical", units: 2, hospital: "Apollo Hospital", distance: "1.8 km", time: "20 min ago", bloodGroup: "B+", note: "ICU patient — urgent transfusion needed" },
    { id: 2, name: "Neha S.", status: "Urgent", units: 1, hospital: "Yashoda Hospital", distance: "3.2 km", time: "2 hrs ago", bloodGroup: "B+", note: "Anemia patient, scheduled surgery tomorrow" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8 px-1 sm:px-2 w-full select-none">
      <div className="flex-[1.8] space-y-5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-xl border border-red-100/50">
              <MdOutlineGpsFixed className="text-[#880808] text-lg" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">Requests Near You</h2>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">Matched by Blood Group & City</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-red-50/70 px-3 py-1 rounded-full border border-red-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
            </span>
            <span className="text-[#880808] text-[10px] font-semibold uppercase tracking-wider">
              {requests.length} active
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100/60 transition-all duration-300 group text-left">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-red-50/40 border border-red-100 flex items-center justify-center text-[#880808] font-semibold text-lg transition-transform group-hover:scale-102">
                    {req.bloodGroup}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-base">{req.name}</h4>
                      <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded ${req.status === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-50 text-amber-700 border border-amber-200/50'}`}>
                        {req.status}
                      </span>
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] font-semibold uppercase px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                        <IoCheckmarkCircleOutline /> Match
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Needs <span className="text-[#880808] font-semibold">{req.units} units</span> at {req.hospital}</p>
                    <p className="text-[11px] font-medium text-gray-400 mt-1 italic opacity-90">"{req.note}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto pt-4 xl:pt-0 border-t xl:border-none border-gray-50">
                  <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50 hover:text-red-700 transition-all active:scale-95">
                    <IoCallOutline className="text-sm" /> Call Hospital
                  </button>
                  <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#880808] text-white font-semibold text-xs shadow-sm hover:bg-red-700 transition-all active:scale-95">
                    Accept Request
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">📍 {req.distance} away</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">🕒 {req.time}</span>
                </div>
                <button className="text-[10px] font-semibold text-[#880808] uppercase tracking-wider hover:underline">View Location</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 text-left">
        <div className="sticky top-28 space-y-5">
          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
            <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-[#880808] rounded-full blur-[60px] opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-lg">Donor Status</h3>
                  <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">Live Identity</p>
                </div>
                <div className="p-2 bg-emerald-500/10 rounded-xl"><MdVerified className="text-emerald-400 text-2xl" /></div>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Current Eligibility</p>
                  <p className="text-sm font-semibold text-emerald-400">Ready to Donate</p>
                </div>
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Achievement</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">Top 5% Donor</p>
                    <span className="text-base">🏆</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-white text-gray-900 font-semibold rounded-xl text-xs hover:bg-gray-50 transition-all active:scale-95 shadow-sm">View Certificates</button>
            </div>
          </div>
          <div className="bg-red-50/40 border border-red-100 rounded-2xl p-5">
            <h4 className="text-[10px] font-semibold text-[#880808] uppercase tracking-wider mb-1.5">Did you know?</h4>
            <p className="text-xs font-medium text-gray-500 leading-relaxed">Donating whole blood can save up to three lives. Your next eligible date is confirmed for Feb 12th.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;