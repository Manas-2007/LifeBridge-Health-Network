import React, { useEffect } from 'react';
import {
  MdOutlineClose,
  MdCheckCircle
} from "react-icons/md";

import {
  LuRadioTower,
  LuShieldAlert,
  LuMapPin,
  LuGitPullRequest
} from "react-icons/lu";

const HowItWorksModal = ({ isOpen, onClose }) => {

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

  const workflowSteps = [
    {
      icon: LuShieldAlert,
      stepNum: "01",
      title: "Broadcast Request",
      desc: "Patients create emergency blood requests with hospital details and required blood units."
    },
    {
      icon: LuRadioTower,
      stepNum: "02",
      title: "Smart Donor Search",
      desc: "Nearby compatible donors are identified and notified instantly using location mapping."
    },
    {
      icon: LuMapPin,
      stepNum: "03",
      title: "Secure Coordination",
      desc: "Donors and patients connect through live status updates and protected communication."
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

          <div className="relative z-10 text-left w-full max-w-xs">
            <span
              className="
                inline-flex items-center
                rounded-full
                border border-white/10
                bg-white/10
                px-3 py-1
                text-[10px]
                font-semibold
                uppercase tracking-[0.18em]
                text-red-100
              "
            >
              Blood Coordination System
            </span>

            <h2
              className="
                mt-5
                text-[28px]
                leading-[1.15]
                font-bold
                tracking-tight
                text-white
              "
            >
              How LifeDrop
              <br />
              Saves Time
            </h2>

            <p
              className="
                mt-4
                text-xs sm:text-sm
                leading-6
                text-red-100/80
                font-medium
              "
            >
              A smart emergency workflow that rapidly connects patients with verified blood donors nearby.
            </p>
          </div>

          <div className="relative z-10 space-y-3 mt-6 w-full max-w-xs text-left">
            {[
              "Live donor matching",
              "Fast emergency alerts",
              "Protected coordination"
            ].map((item, index) => (
              <div
                key={index}
                className="
                  flex items-center gap-3
                  rounded-xl
                  bg-white/10
                  border border-white/10
                  px-4 py-3
                  backdrop-blur-sm
                "
              >
                <MdCheckCircle
                  size={15}
                  className="text-red-100 shrink-0"
                />
                <p className="text-xs sm:text-sm text-red-50/90 font-semibold tracking-wide">
                  {item}
                </p>
              </div>
            ))}
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
              w-full
            "
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 text-left">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#880808] border border-red-200/40 shadow-sm">
                <LuGitPullRequest size={18} className="sm:w-[20px] sm:h-[20px]" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] sm:text-sm font-bold text-gray-900 tracking-wide">
                  Workflow Process
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-gray-600 mt-0.5 sm:mt-1">
                  Step-by-step emergency coordination
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

          <hr className="border-t border-gray-100 w-full shrink-0 m-0 p-0" />

          <div
            className="
              flex-1 overflow-y-auto min-h-0 overscroll-contain
              px-4 sm:px-7
              py-4 sm:py-5
              space-y-3 sm:space-y-4
              no-scrollbar
            "
          >
            {workflowSteps.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  flex gap-4 sm:gap-5
                  rounded-xl sm:rounded-2xl
                  border border-gray-200
                  bg-white
                  p-4 sm:p-5
                  transition-all duration-300
                  hover:border-red-300/60
                  hover:shadow-[0_10px_25px_rgba(136,8,8,0.03)]
                "
              >
                <div
                  className="
                    text-xl sm:text-2xl
                    font-black
                    text-gray-300
                    shrink-0
                    w-7 sm:w-8
                    text-right
                    pt-0.5
                    transition-colors duration-300
                    group-hover:text-red-100
                  "
                >
                  {item.stepNum}
                </div>

                <div
                  className="
                    flex h-10 w-10 sm:h-11 sm:w-11
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    transition-all duration-300
                    bg-[#880808] text-white border-transparent
                  "
                >
                  <item.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <h3
                    className="
                      text-[13px] sm:text-base
                      font-bold
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
                      mt-1
                      text-[12px] sm:text-sm
                      leading-5 sm:leading-6
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
              w-full
            "
          >
            <button
              onClick={onClose}
              className="
                w-full sm:w-auto
                rounded-xl sm:rounded-2xl
                px-5 sm:px-6 
                py-2.5 sm:py-3
                text-xs font-bold
                uppercase tracking-wider
                text-white
                transition-all duration-300
                bg-[#880808] hover:shadow-md hover:shadow-red-900/10
                hover:bg-green-600
                active:scale-[0.97]
                cursor-pointer
              "
            >
              Understand Workflow
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HowItWorksModal;