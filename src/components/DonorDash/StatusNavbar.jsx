import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsActive } from "react-icons/md";

// 🔴 ADDED 'onOpenLogin' prop to trigger the modal from Navbar
const StatusNavbar = ({ setIsOpen, user, onOpenLogin }) => {
  // Logic to check if user is actually authenticated
  const isLoggedIn = !!user?.name;
  const firstName = isLoggedIn ? user.name.split(' ')[0] : "Guest";

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm px-5 md:px-8 lg:px-12 py-3 md:py-4 sticky top-0 z-20 select-none">
      <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
      
      {/* 🔴 TOP BAR CONTAINER */}
      <div className="flex items-center justify-between min-w-0 w-full md:w-auto">
        
        {/* LEFT COMPONENT: BRANDING & GREETING */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 bg-gray-50 hover:bg-red-50/60 border border-gray-200/60 rounded-xl flex flex-col justify-center items-center gap-1 active:scale-90 transition-all duration-200 group shrink-0 shadow-sm"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-110 transition-transform" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-110 transition-transform delay-75" />
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-red-500 group-hover:scale-110 transition-all delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-300 group-hover:scale-110 transition-all delay-150" />
            </div>
          </button>

          <div className="md:hidden flex items-center gap-2">
            <img src="/navlogo.jpg" alt="LifeDrop" className="w-9 h-9 object-contain rounded-lg border border-gray-100" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Life<span className="text-red-700">Drop</span></span>
          </div>

          <div className="hidden md:flex flex-col min-w-0">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-wide leading-tight">
              Welcome <span className="text-[#880808]">{firstName}</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {isLoggedIn ? "Your impact dashboard — every drop counts." : "Join the matrix — save lives today."}
            </p>
          </div>
        </div>

        {/* MOBILE RESPONSIVE ACTION BOX */}
        <div className="flex items-center gap-4 md:hidden">
          {isLoggedIn ? (
            <>
              <Link to="/notifications" className="flex flex-col items-center group gap-0.5">
                <div className="relative w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                  <MdOutlineNotificationsActive className="text-lg text-red-700" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#880808] rounded-full animate-pulse ring-2 ring-white" />
                </div>
                <span className="text-[9px] font-semibold text-gray-500 uppercase">Alerts</span>
              </Link>
              <Link to="/profile" className="flex flex-col items-center group gap-0.5">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center relative border border-gray-200">
                  <CgProfile className="text-lg text-gray-800" />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-white font-bold">✓</span>
                </div>
                <span className="text-[9px] font-semibold text-gray-700 uppercase max-w-[55px] truncate">{firstName}</span>
              </Link>
            </>
          ) : (
            <button onClick={onOpenLogin} className="text-[10px] font-bold text-white bg-[#880808] px-3 py-2 rounded-lg uppercase tracking-wide">
              Login
            </button>
          )}
        </div>
      </div>

      {/* 🔴 CONTROL STRIP CONTAINER */}
      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 lg:gap-8 w-full md:w-auto">
        
            <div className="hidden md:flex relative items-center w-full md:w-[260px] lg:w-[300px] group">          <span className="absolute left-3.5 text-gray-500 pointer-events-none">
            <IoSearchSharp className="text-base text-red-700 group-focus-within:text-[#880808]" />
          </span>
          <input
            type="text"
            placeholder="Search matching requests..."
            className="w-full bg-gray-50 border border-gray-200/80 focus:border-red-300 py-2.5 pl-10 pr-4 rounded-xl text-sm font-medium text-gray-800 outline-none transition-all focus:ring-4 focus:ring-red-50/60"
          />
        </div>

        {/* DESKTOP EXCLUSIVE ACTION CARD */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
          {isLoggedIn ? (
            <>
              <Link to="/notifications" className="flex flex-col items-center group gap-1 cursor-pointer">
                <button className="relative w-11 h-11 bg-red-50/60 hover:bg-red-50 border border-red-100 group-hover:border-red-200 rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-95">
                  <MdOutlineNotificationsActive className="text-xl text-red-700 transform group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#880808] rounded-full ring-2 ring-white animate-pulse" />
                </button>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:text-red-700">Notifications</span>
              </Link>

              <div className="flex items-center gap-5 pl-4 border-l border-gray-100">
                <div className="flex flex-col text-right justify-center">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</p>
                  <p className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mt-1.5 uppercase tracking-wider self-end">
                    Verified Donor
                  </p>
                </div>
                <Link to="/profile" className="flex flex-col items-center group gap-1 cursor-pointer">
                  <button className="w-11 h-11 bg-gray-50 hover:bg-gray-100/70 border border-gray-200/60 group-hover:border-gray-300 rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-95">
                    <CgProfile className="text-xl text-gray-800 transform group-hover:scale-105 transition-transform" />
                  </button>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:text-gray-900">Profile</span>
                </Link>
              </div>
            </>
          ) : (
            <button 
              onClick={onOpenLogin} 
              className="bg-[#880808] text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#6d0606] transition-all shadow-md active:scale-95"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
      </div>
    </header>
  );
};

export default StatusNavbar;