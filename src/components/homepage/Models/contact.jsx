import React, { useEffect } from 'react';
import {
  MdOutlineClose,
  MdOutlineMailOutline,
  MdOutlinePhoneInTalk
} from "react-icons/md";

import {
  LuMapPin,
  LuClock,
  LuSend
} from "react-icons/lu";

const Contact = ({ isOpen, onClose }) => {

  // 🟢 SINGLE USE-EFFECT (Escape Key + Scroll Lock)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Scroll Lock on
    }

    // Cleanup Function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Scroll Lock off
    };
  }, [isOpen, onClose]);

  // 🟢 EARLY RETURN (Hooks ke baad)
  if (!isOpen) return null;

  const contactChannels = [
    {
      icon: MdOutlinePhoneInTalk,
      title: "24/7 Hotline",
      value: "+91 75520 1122",
    },
    {
      icon: MdOutlineMailOutline,
      title: "Official Email",
      value: "emergency@lifedrop.org",
    },
    {
      icon: LuMapPin,
      title: "Main Registry",
      value: "Bhopal, MP, India",
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-5 select-none animate-[fadeIn_0.2s_ease-out]">

      {/* 🔴 BACKDROP SMOOTH GLASS */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* 🔴 COMPACT SINGLE REGION MODAL  */}
      <div
        className="
          relative z-10
          w-full max-w-[460px]
          h-auto max-h-[90vh] overflow-y-auto overscroll-contain
          rounded-[24px] sm:rounded-[28px] bg-white
          shadow-[0_25px_60px_rgba(0,0,0,0.12)]
          animate-[scaleUp_.25s_cubic-bezier(0.16,1,0.3,1)]
          flex flex-col
          text-left
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-red-200
        "
      >
        {/* TOP BRAND ACCENT LINE */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-[#880808] to-black shrink-0" />

        {/* HEADER SECTION */}
        <div className="flex items-start justify-between px-5 sm:px-6 pt-5 pb-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#880808] border border-red-200/50 shadow-sm">
              <LuSend size={18} />
            </div>

            <div>
              <p className="text-[9px] font-[700] uppercase tracking-[0.15em] text-[#880808]">
                LifeBridge Support
              </p>
              <h2 className="text-lg sm:text-xl font-[700] tracking-tight text-gray-900 mt-0.5">
                Contact Us
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-xl text-gray-500
              transition hover:bg-gray-100
              hover:text-gray-900
              cursor-pointer
            "
          >
            <MdOutlineClose size={18} />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-4 space-y-4">
          
          {/* Brief Context */}
          <p className="text-[11px] sm:text-xs leading-5 text-gray-600 font-medium bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            For urgent assistance or registry queries, our coordination team is available 24/7 to guide you through the process.
          </p>

          {/* CONTACT TILES GRID */}
          <div className="space-y-2.5">
            {contactChannels.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  flex items-center gap-3
                  rounded-xl sm:rounded-2xl
                  border border-gray-200
                  bg-white
                  p-3
                  transition-all duration-300
                  hover:border-red-300
                  hover:shadow-[0_4px_15px_rgba(136,8,8,0.04)]
                "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 bg-[#880808] text-white">
                  <item.icon size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    {item.title}
                  </p>
                  <p className="text-[13px] sm:text-sm font-[700] text-gray-800 truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* AVAILABILITY STATUS */}
          <div className="flex items-center gap-2 px-1 pt-1 pb-1">
            <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
              <LuClock size={11} className="text-gray-500" />
              Response Time: Under 5 Minutes
            </p>
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="border-t border-gray-100 px-5 sm:px-6 py-3.5 bg-gray-50/50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="
              w-full sm:w-auto
              rounded-xl
              hover:bg-green-600
              px-6 py-2.5 sm:py-3
              text-xs font-bold
              uppercase tracking-wider
              text-white
              transition-all duration-300
              bg-[#880808] hover:shadow-md
              active:scale-[0.97]
              cursor-pointer
            "
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Contact;