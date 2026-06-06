import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { name: 'Ravi Sharma', location: 'Hyderabad', text: 'LifeDrop helped me find blood for my father during a critical time. Forever grateful for this platform.' },
    { name: 'Anjali Verma', location: 'Bangalore', text: 'A very seamless experience! I got notified and was able to donate near my home.' },
    { name: 'Mohit Jain', location: 'Pune', text: 'Finally, a platform that connects help seekers and donors so efficiently. Great initiative!' },
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); } /* Thoda smooth kiya hai */
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      <section className="py-10 sm:py-16 bg-gray-50/50">
        <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-16 text-center">
          <span className="text-red-600 font-semibold tracking-widest text-[10px] sm:text-xs uppercase mb-2 sm:mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 sm:mb-16 tracking-tight">
            What People Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {reviews.map((r, i) => (
              <div 
                key={i} 
                className="animate-float"
                style={{ animationDelay: `${i * 0.7}s` }} 
              >
                {/* FIX: flex flex-col justify-between lagaya hai 
                  taaki text chota-bada hone par bhi saare cards barabar height ke rahein 
                */}
                <div 
                  className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-gray-900/5 hover:bg-red-50/50 hover:shadow-[0_8px_30px_rgba(220,38,38,0.12)] transition-all duration-500 text-left group h-full flex flex-col justify-between"
                >
                  
                  <div>
                    <Quote className="text-red-100 mb-4 sm:mb-6 group-hover:text-red-400 transition-colors duration-500 w-8 h-8 sm:w-10 sm:h-10" />
                    <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed italic text-[13px] sm:text-[15px]">
                      {r.text}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600 text-sm sm:text-base shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{r.name}</h4>
                      <p className="text-[10px] sm:text-xs text-red-500 font-medium">{r.location}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Testimonials;