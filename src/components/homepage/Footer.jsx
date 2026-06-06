import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 pt-10 pb-10 border-t border-gray-900">
      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-16">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-7">

          {/* Section 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-2 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                LifeDrop
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              We connect blood donors and those in need.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-red-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition">How It Works</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-red-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Terms</a></li>
            </ul>
          </div>

          {/* Section 4: Need Help */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Need Help?</h3>
            <div className="text-sm text-gray-500 space-y-3">
              <p>support@lifedrop.org</p>
              <p className="text-lg font-bold text-red-500">1800 123 4567</p>
            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t border-gray-900 pt-3 text-center text-white  text-white">
          © 2025 LifeDrop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;