import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { num: '1', title: 'Register / Login', desc: 'Create your account in just a few clicks.', img: '/how1.jpg' },
    { num: '2', title: 'Search / Request', desc: 'Search blood or request for blood in your area.', img: '/how2.jpg' },
    { num: '3', title: 'Get Matched', desc: 'We notify nearby donors and match instantly.', img: '/how3.jpg' },
    { num: '4', title: 'Save Lives', desc: 'Donation happens and lives are saved.', img: '/how4.jpg' },
  ];

  return (
    <section className="py-10 md:py-16 bg-white">
      {/* ── PART 1: EASY STEPS ── */}
      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-16 text-center mb-16 md:mb-24">
        <h4 className="text-red-600 font-bold tracking-widest text-xs sm:text-sm uppercase mb-2">
          Easy Steps
        </h4>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 md:mb-16">
          How <span className='text-red-600'>LifeDrop</span> Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 lg:gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] items-center relative w-full sm:w-[80%] md:w-64 p-5 sm:p-6 bg-red-50/30 rounded-3xl hover:bg-red-50 transition-colors duration-300 border border-red-50/50">
                <span className="absolute top-4 left-5 text-xl sm:text-2xl font-black text-red-600/20">
                  {step.num}
                </span>
                
                {/* Responsive Image Container */}
                <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 flex items-center justify-center mb-4 sm:mb-6 overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img src={step.img} alt={step.title} className="w-full h-full object-contain" />
                </div>
                
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[200px] md:max-w-none">
                  {step.desc}
                </p>
              </div>

              {/* Responsive Arrows */}
              {index !== steps.length - 1 && (
                <>
                  {/* Desktop Right Arrow */}
                  <div className="hidden md:block text-red-200">
                    <ArrowRight size={28} className="lg:w-8 lg:h-8" />
                  </div>
                  {/* Mobile Down Arrow */}
                  <div className="block md:hidden text-red-200 my-1">
                    <ArrowDown size={24} />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── PART 2: CTA BANNER  ── */}
      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-16">
        <div className="relative bg-red-600 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch">
          
          {/* Text Content */}
          <div className="relative z-10 w-full md:w-3/5 p-6 sm:p-8 md:p-11 text-white flex flex-col justify-center text-center md:text-left items-center md:items-start">
            <h4 className="font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-3 sm:mb-4 opacity-80">
              Be the Reason
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Someone Smiles Today
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 max-w-lg leading-relaxed">
              Your one donation can bring back smiles, hope and happiness in someone's life.
            </p>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth' 
              });
            }} 
            className="w-fit flex items-center gap-2 bg-white text-red-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-gray-100 transition-all shadow-md active:scale-95 cursor-pointer relative z-20"
          >
            Join as a Donor <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
          </div>

          {/* Right Side Image */}
          <div className="w-full md:w-2/5 h-[200px] sm:h-[250px] md:h-auto md:min-h-full">
            <img 
              src="/homelow.jpg" 
              alt="Hands holding heart" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;