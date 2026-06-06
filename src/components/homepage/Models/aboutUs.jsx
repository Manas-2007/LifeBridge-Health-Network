import React, { useEffect } from 'react';
import {
  MdOutlineClose,
  MdOutlineEmergency,
  MdCheckCircle
} from "react-icons/md";

import {
  LuHeart,
  LuDroplets,
  LuUsers
} from "react-icons/lu";

const AboutUs = ({ isOpen, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Scroll Lock
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Cleanup
    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const features = [
    {
      icon: LuDroplets,
      title: "For Patients",
      desc: "Create urgent blood requests and instantly reach compatible nearby donors."
    },
    {
      icon: LuHeart,
      title: "For Donors",
      desc: "Receive emergency requests and securely connect with patients."
    },
    {
      icon: LuUsers,
      title: "Smart Matching",
      desc: "Real-time blood compatibility and nearby donor tracking."
    }
  ];


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:p-6">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className="
          relative z-10
          w-full max-w-[540px]
          h-auto max-h-[80vh] sm:max-h-[90vh] 
          overflow-hidden
          rounded-2xl sm:rounded-3xl bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          animate-[scaleUp_.25s_ease]
          flex flex-col
        "
      >

        {/* TOP ACCENT */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-[#880808] to-black shrink-0" />

        {/* HEADER */}
        <div className="flex items-start justify-between px-4 sm:px-7 pt-4 sm:pt-6 shrink-0">

          <div className="flex items-center gap-3 sm:gap-4 min-w-0">

            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-red-50 text-[#880808]">
              <MdOutlineEmergency size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-[#880808] truncate">
                LifeBridge Health Network
              </p>

              <h2 className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-[600] tracking-tight text-gray-900">
                About LifeDrop
              </h2>
            </div>

          </div>

          <button
            onClick={onClose}
            className="
              flex h-9 w-9 sm:h-10 sm:w-10 shrink-0
              items-center justify-center
              rounded-xl text-gray-400
              transition hover:bg-gray-100
              hover:text-gray-700
            "
          >
            <MdOutlineClose size={18} />
          </button>

        </div>

        {/* SCROLLABLE CONTENT  */}
        <div className="
          flex-1 overflow-y-auto overscroll-contain px-4 sm:px-7 py-4 sm:py-5 space-y-4 sm:space-y-6
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-red-200
          hover:[&::-webkit-scrollbar-thumb]:bg-[#880808]
          [&::-webkit-scrollbar-thumb]:rounded-full
        ">

          {/* INTRO */}
          <div className="rounded-xl sm:rounded-2xl bg-gray-50 p-3.5 sm:p-5 border border-gray-100">
            <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700">
              LifeDrop is an emergency blood coordination platform designed
              to connect patients with nearby verified donors during
              critical situations with speed and reliability.
            </p>
          </div>

          {/* FEATURES */}
          <div className="space-y-2 sm:space-y-3">

            {features.map((item, index) => (
              <div
                key={index}
                className="
                  flex gap-3 sm:gap-4 rounded-xl sm:rounded-2xl
                  bg-white p-3 sm:p-4
                  border border-gray-50 sm:border-transparent
                  transition duration-300
                  hover:bg-red-50 hover:border-red-100
                "
              >

                <div className="
                  flex h-10 w-10 sm:h-11 sm:w-11 shrink-0
                  items-center justify-center
                  rounded-xl bg-gray-100
                  text-[#880808]
                ">
                  <item.icon size={18} className="sm:w-[20px] sm:h-[20px]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] sm:text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-500">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>

          {/* PROMISE */}
          <div className="rounded-xl sm:rounded-2xl bg-[#fafafa] p-3.5 sm:p-5 border border-gray-100">

            <p className="
              mb-3 sm:mb-4 text-[9px] sm:text-[10px]
              font-bold uppercase
              tracking-[0.1em]
              text-[#880808]
            ">
              Our Core Promise
            </p>

            <div className="space-y-2 sm:space-y-3">

              {[
                "100% free access without coordination charges.",
                "Fast emergency alerts for nearby donors.",
                "Secure protection of donor & patient information."
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3"
                >

                  <MdCheckCircle
                    size={15}
                    className="mt-[2px] sm:mt-[3px] shrink-0 text-emerald-500 sm:w-[17px] sm:h-[17px]"
                  />

                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="
          border-t border-gray-100
          px-4 sm:px-7 py-3 sm:py-4
          bg-white shrink-0
        ">

          <button
            onClick={onClose}
            className="
              w-full rounded-xl sm:rounded-2xl
              bg-red-800 py-2.5 sm:py-3
              text-sm font-semibold
              tracking-wide text-white
              transition hover:bg-green-600
              shadow-sm hover:shadow-md
            "
          >
            Understand & Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default AboutUs;