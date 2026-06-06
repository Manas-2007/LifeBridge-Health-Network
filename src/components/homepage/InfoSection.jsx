import React from 'react';
import { Droplets, Users, ShieldCheck, HeartPulse, Hospital } from 'lucide-react';

/* ── Reusable Circle Wrapper ── */
const IconCircle = ({ children }) => {
  return (
    <div
      className="
        w-14 h-14 sm:w-[68px] sm:h-[68px] 
        rounded-full flex items-center justify-center shrink-0
        transition-transform duration-300 hover:scale-105
      "
      style={{
        background: 'linear-gradient(145deg, #f1ebeb, #fff)',
        border: '1.5px solid rgba(220, 38, 38, 0.5)', /* Softer red border for premium look */
        boxShadow: '0 4px 14px 0 rgba(192,0,26,0.13), 0 1px 3px rgba(192,0,26,0.08)',
      }}
    >
      <div className="flex items-center justify-center scale-75 sm:scale-100">
        {children}
      </div>
    </div>
  );
};

/* ── UI Components ── */
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group px-1 sm:px-0">
    <IconCircle>
      <Icon className="text-red-600 transition-colors group-hover:text-red-700" size={32} strokeWidth={2} />
    </IconCircle>
    <h3 className="mt-3 sm:mt-4 mb-1 sm:mb-1.5 text-[14px] sm:text-[16px] font-bold text-gray-900">
      {title}
    </h3>
    <p className="text-[12px] sm:text-[13px] leading-[1.4] sm:leading-[1.6] text-gray-500 max-w-[140px]">
      {desc}
    </p>
  </div>
);

const StatCard = ({ icon: Icon, count, label }) => (
  <div className="flex flex-col items-center text-center">
    <IconCircle>
      <Icon className="text-red-600" size={32} strokeWidth={2} />
    </IconCircle>
    <span className="mt-3 sm:mt-4 text-xl sm:text-[26px] font-[700] text-gray-900 leading-none tracking-tight">
      {count}
    </span>
    <span className="mt-1 sm:mt-1.5 text-[9px] sm:text-[12px] font-[600] text-gray-500 uppercase tracking-wide sm:tracking-widest px-1 leading-tight">
      {label}
    </span>
  </div>
);

/* ── Main Component ── */
const InfoSection = () => {
  const features = [
    { icon: Droplets, title: 'Quick Request', desc: 'Request blood in emergencies instantly.' },
    { icon: Users, title: 'Nearby Donors', desc: 'Connect with nearby donors in your location.' },
    { icon: ShieldCheck, title: 'Secure & Safe', desc: 'Your data is safe with us. We care for your privacy.' },
    { icon: HeartPulse, title: 'Save Lives', desc: "Your small step can be someone's second chance." },
  ];

  const stats = [
    { icon: Droplets, count: '3,500+', label: 'Donors' },
    { icon: Users, count: '2,000+', label: 'Lives Saved' },
    { icon: Hospital, count: '320+', label: 'Requests Fulfilled' },
  ];

  return (
    <section className="py-8 sm:py-10 px-6 lg:px-16 bg-[#fafafa]">
      {/* Container: 95% width on mobile, max 1200px on large screens */}
<div className="w-full max-w-[1500px] mx-auto bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 md:p-10 shadow-[0_6px_32px_0_rgba(0,0,0,0.07)] border border-red-100">        
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 w-full">
          
          {/* Features Grid */}
          <div className="flex-[2] w-full grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 sm:gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block self-stretch w-[1px] min-h-[120px] bg-gray-200" />
          <div className="block lg:hidden w-full h-[1px] bg-gray-100 my-2" />

          {/* Stats Row */}
          <div className="flex-[1] w-full grid grid-cols-3 gap-2 sm:gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;