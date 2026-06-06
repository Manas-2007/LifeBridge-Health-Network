import React, { useEffect } from 'react';
import {
  MdOutlineClose,
  MdCheckCircle,
  MdOutlineHealthAndSafety
} from "react-icons/md";

import {
  LuCalendarDays,
  LuShieldAlert,
  LuSparkles,
  LuStethoscope
} from "react-icons/lu";

const Eligibility = ({ isOpen, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const healthCheckpoints = [
    {
      icon: LuCalendarDays,
      title: "Age & Weight Parameters",
      desc: "Must be 18 to 65 years old and weigh at least 50 kg (110 lbs) to safely process blood."
    },
    {
      icon: LuSparkles,
      title: "Donation Cooldown Interval",
      desc: "A safe interval of at least 90 days for males and 120 days for females between sessions."
    },
    {
      icon: LuShieldAlert,
      title: "Chronic Diseases",
      desc: "No active history of cardiovascular diseases, unmanaged diabetes, or recent viral infections."
    },
    {
      icon: LuStethoscope,
      title: "Temporary Deferrals",
      desc: "No major surgeries, piercings, or tattoo modifications within the past 6 operational months."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:p-6 select-none animate-[fadeIn_0.2s_ease-out]">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
      />

      <div
        className="
          relative z-10
          w-full max-w-4xl
          h-auto max-h-[80vh] sm:max-h-[88vh]
          overflow-hidden
          rounded-2xl sm:rounded-[28px]
          bg-white
          border border-red-100/60
          shadow-[0_18px_50px_rgba(0,0,0,0.12)]
          flex flex-col lg:flex-row
        "
      >

        <div
          className="
            hidden lg:flex
            lg:w-[35%] shrink-0
            relative overflow-hidden
            bg-gradient-to-br
            from-[#5c0000]
            via-[#7a0000]
            to-[#a40000]
            px-7 py-8
            flex-col justify-between
            border-r border-red-900/20
          "
        >
          <div className="absolute -bottom-14 -left-10 w-44 h-44 bg-red-300/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 text-left">
            <span
              className="
                inline-flex items-center
                rounded-full
                border border-white/10
                bg-white/10
                px-3 py-1
                text-[10px]
                font-medium
                uppercase tracking-[0.18em]
                text-red-100
              "
            >
              Medical Eligibility
            </span>

            <h2
              className="
                mt-5
                text-[28px]
                leading-[1.15]
                font-semibold
                tracking-tight
                text-white
              "
            >
              Donation
              <br />
              Guidelines
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-red-100/80
                pr-2
              "
            >
              Ensure your health conditions align with
              the platform’s safe blood donation standards.
            </p>
          </div>

          <div
            className="
              relative z-10
              rounded-2xl
              border border-white/10
              bg-white/10
              p-5
              backdrop-blur-sm
              text-left
              mt-6
            "
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-red-100/70">
              Minimum Age
            </p>

            <h3 className="mt-1.5 text-3xl font-semibold text-white">
              18+
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm leading-5 text-red-100/75 pr-2">
              Donors must be legally eligible before
              participating in emergency requests.
            </p>
          </div>
        </div>

        <div
          className="
            flex-1
            flex flex-col
            bg-[#fcfcfc]
            min-w-0
            min-h-0
            overflow-hidden
          "
        >
          <div
            className="
              flex items-center justify-between
              px-4 sm:px-7
              py-4 sm:py-5
              bg-white/80 backdrop-blur-sm
              shrink-0
            "
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 text-left pr-4">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#880808] border border-red-100/40 shadow-sm">
                <MdOutlineHealthAndSafety size={18} className="sm:w-[20px] sm:h-[20px]" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] sm:text-base font-[600] text-gray-900 truncate">
                  Medical Criteria
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5 sm:mt-1 truncate">
                  Guidelines for safe donation
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                flex h-9 w-9 sm:h-10 sm:w-10
                shrink-0
                items-center justify-center
                rounded-xl
                text-gray-700
                transition-all duration-200
                hover:bg-gray-100
                hover:text-gray-700
                cursor-pointer
                active:scale-90
              "
            >
              <MdOutlineClose size={18} />
            </button>
          </div>

          <hr className="border-t border-gray-100 shrink-0 m-0 p-0" />

          <div
            className="
              flex-1 overflow-y-auto overscroll-contain
              px-4 sm:px-7
              py-4 sm:py-5
              space-y-3 sm:space-y-4
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#880808]
              [&::-webkit-scrollbar-thumb]:rounded-full
            "
          >
            {healthCheckpoints.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  flex gap-3 sm:gap-4
                  rounded-xl sm:rounded-2xl
                  border border-gray-200 sm:border-gray-300
                  bg-white
                  p-3.5 sm:p-4
                  transition-all duration-300
                  hover:border-red-500
                  hover:shadow-[0_10px_25px_rgba(136,8,8,0.02)]
                "
              >
                <div
                  className="
                    flex h-10 w-10 sm:h-11 sm:w-11
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    border border-gray-300
                    transition-all duration-300
                    bg-[#880808] text-white group-hover:border-transparent
                  "
                >
                  <item.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <h3
                    className="
                      text-[13px] sm:text-[14px]
                      font-[600] sm:font-[500]
                      text-gray-900
                      tracking-wide
                      transition-colors duration-300
                      group-hover:text-[#880808]
                    "
                  >
                    {item.title}
                  </h3>
                  <p
                    className="
                      mt-1 sm:mt-0.5
                      text-[12px]
                      leading-5
                      text-gray-500
                      font-semibold
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="
              border-t border-gray-100
              bg-white
              px-4 sm:px-7
              py-3.5 sm:py-4
              shrink-0
              flex justify-end
            "
          >
            <button
              onClick={onClose}
              className="
                w-full sm:w-auto
                rounded-xl sm:rounded-2xl
                bg-[darkred]
                px-5 sm:px-6 py-2.5 sm:py-3
                text-xs font-bold
                uppercase tracking-wider
                text-white
                transition-all duration-300
                hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-900/10
                active:scale-[0.97]
                cursor-pointer
              "
            >
              I Confirm Eligibility
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Eligibility;