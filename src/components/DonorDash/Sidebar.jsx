import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdOutlineNotificationsActive, MdOutlineGpsOff } from "react-icons/md";
import { LuHistory, LuLayoutDashboard } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { IoClose } from "react-icons/io5";



const Sidebar = ({ isOpen, setIsOpen, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', path: 'dashboard', icon: <LuLayoutDashboard /> },
    { name: 'Nearby Requests', path: 'requests', icon: <MdOutlineGpsOff /> },
    { name: 'Donation History', path: 'history', icon: <LuHistory /> },
    { name: 'Schedule', path: 'schedule', icon: <RiCalendarScheduleLine /> },
    { name: 'Notifications', path: 'notifications', icon: <MdOutlineNotificationsActive /> },
  ];
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('patientUser'); 
    localStorage.removeItem('userType');

    if (setIsLoggedIn) setIsLoggedIn(false);
    if (setUser) setUser(null);
    
    setIsOpen(false);
    navigate('/', { replace: true });

  };

  return (
    <aside
  className={`
    h-screen w-[290px] md:w-[250px] bg-[#f8f9fa]/95 backdrop-blur-md shadow-2xl border-r border-gray-200
    flex flex-col p-5 overflow-hidden fixed left-0 top-0 z-40
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>

      {/* ================= LOGO SECTION ================= */}
     <div className="mb-[0px] relative group px-2"> 
             <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[24px] border border-white/60 shadow-sm transition-all duration-500 group-hover:bg-white/60 group-hover:shadow-md"></div>
     
             <div className="relative p-1.5"> 
     
               {/* DESKTOP LOGO */}
              <div className="hidden md:block select-none">
     
         {/* LOGO & TITLE CONTAINER */}
           <div className="flex items-center justify-center mb-3">
           <div className="flex items-center gap-2">
             {/* Logo Image Box */}
             <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-300/80 shrink-0">
               <img src="/navlogo.jpg" className="w-[52px] h-[52px] object-contain" alt="logo" />
             </div>
             
             {/* Brand Text */}
             <div>
               <h1 className="text-2xl font-[600] text-gray-900 tracking-wide leading-tight">
                 Life<span className="text-[#880808]">Drop</span>
               </h1>
               <p className="text-[9px] font-medium text-gray-400 uppercase tracking-[2px] mt-0.5">
                 Portal v2.0
               </p>
             </div>
           </div>
         </div>
     
       {/* LOWER SUBTEXT & BADGE AREA */}
       <div className="flex flex-col gap-2.5">
         {/* Tagline */}
         <p className="text-[10px] font-medium text-gray-500/90 uppercase tracking-[1.5px] text-center">
           Donate Blood • Save Lives
         </p>
         
         {/* Pill Badge */}
         <div className="inline-flex items-center self-center bg-red-50 px-3 py-1 rounded-full border border-red-200/60 shadow-sm">
           <span className="text-[#880808] text-[9px] font-semibold uppercase flex items-center gap-1.5">
             <span className="w-1.5 h-1.5 bg-[#880808] rounded-full animate-pulse shadow-sm shadow-red-300"></span>
             Donor Portal
           </span>
         </div>
       </div>
               </div>
     
               {/* MOBILE LOGO SECTION */}
               <div className="md:hidden flex flex-col items-center relative pt-4 pb-2 select-none">
       {/* Close Button */}
       <button 
         onClick={() => setIsOpen(false)} 
         className="absolute right-0 top-0 text-gray-800 hover:text-red-700 p-2 transition-colors duration-200"
         aria-label="Close Menu"
       >
         <IoClose size={24} />
       </button>
     
       {/* LOGO ON TOP & BRAND BELOW (CENTERED STACK) */}
       <div className="flex flex-col items-center text-center mb-3 mt-4">
         {/* 1. Logo Image Box on Top */}
         <div className="p-1 bg-white rounded-xl shadow-sm border border-gray-100/80 shrink-0 mb-2">
           <img src="/navlogo.jpg" className="w-[65px] h-[65px] object-contain" alt="logo" />
         </div>
         
         {/* 2. Brand Text Below */}
         <div>
           <h1 className="text-2xl font-[700] text-gray-900 tracking-wide leading-tight">
             Life<span className="text-[#880808]">Drop</span>
           </h1>
           <p className="text-[9px] font-medium text-gray-400 uppercase tracking-[2px] mt-0.5">
             Portal v2.0
           </p>
         </div>
       </div>
     
       {/* LOWER SUBTEXT & BADGE AREA */}
       <div className="flex flex-col gap-2.5 w-full items-center">
         {/* Tagline */}
         <p className="text-[10px] font-medium text-[grey] uppercase tracking-[1.5px] text-center">
           Donate Blood • Save Lives
         </p>
         
         {/* Pill Badge */}
         <div className="inline-flex items-center bg-red-50 px-3 py-1 rounded-full border border-red-200/60 shadow-sm">
           <span className="text-[#880808] text-[11px] font-semibold uppercase flex items-center gap-1.5">
             <span className="w-1.5 h-1.5 bg-[#880808] rounded-full animate-pulse shadow-lg shadow-red-600"></span>
             Donor Portal
           </span>
         </div>
       </div>
     </div>
             </div>
             <div className="w-[90%] mx-auto h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent mt-4" />
           </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 flex flex-col gap-2 overflow-hidden pr-1">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
           onClick={() => {
              setIsOpen(false); 
              window.scrollTo({ top: 0, behavior: 'smooth' });
              const rightPanel = document.querySelector('main') || document.querySelector('.overflow-y-auto');
              if(rightPanel) rightPanel.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={({ isActive }) => `
              w-full flex items-center justify-between
              px-4 py-3 rounded-xl
              transition-colors duration-200

              ${
                isActive
                  ? 'bg-[#880808] text-white'
                  : 'text-black hover:text-[#880808] hover:bg-white/60'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">

                  <span className={`text-[20px] ${
                    isActive ? 'text-white' : 'text-black'
                  }`}>
                    {item.icon}
                  </span>

                  <span className="font-semibold text-[14px]">
                    {item.name}
                  </span>

                </div>

                {isActive && (
                  <span className="text-xs opacity-80">›</span>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* LOGOUT */}
        <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-black font-semibold mt-auto transition-colors duration-200 hover:text-[#880808] hover:bg-white/60">
          <BiLogOut className="text-[18px]" />
          
          <span>Logout</span>
        </button>

      </nav>

      {/* ================= HELPLINE ================= */}
      <div className="mt-4 bg-[#880808] p-3 rounded-2xl text-center shadow-md">
        <p className="text-white/80 text-[10px] font-bold uppercase mb-1">
          Emergency Helpline
        </p>
        <h3 className="text-white text-[15px] font-bold">
          1800 123 4567
        </h3>
        <p className="text-white/60 text-[9px]">
          24x7 support
        </p>
      </div>

    </aside>
  );
};

export default Sidebar;