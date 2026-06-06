import React, { useState, useEffect } from 'react';
import { Menu, User, Droplets, Users, Heart } from 'lucide-react'; 

// 🔴 THEMATIC POP-UP MODALS GATEWAY LINKS
import AboutUs from './Models/aboutUs';
import Contact from './Models/contact';
import Eligibility from './Models/eligibility';
import HowItWorksModal from './Models/howItWorks'; 

const Navbar = ({ onPatientAuth, onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#', action: () => setActiveModal(null), active: !activeModal },
    { name: 'About Us', href: '#', action: () => setActiveModal('about') },
    { name: 'How It Works', href: '#', action: () => setActiveModal('howItWorks') },
    { name: 'Eligibility', href: '#', action: () => setActiveModal('eligibility') },
    { name: 'Contact', href: '#', action: () => setActiveModal('contact') },
  ];

  const handleMobileClick = (linkAction) => {
    setIsOpen(false); 
    linkAction();     
  };

  return (
    <>
      <nav className="fixed w-full bg-white z-50 shadow-md h-20 flex items-center border-b border-gray-100">
        <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center h-full">

            {/* Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setActiveModal(null)}>
              <img src="/navlogo.jpg" alt="LifeDrop Logo" className="h-12 w-12 object-contain rounded-xl" />
              <div className="flex flex-col text-left">
                <span className="text-2xl font-bold text-gray-900 leading-none tracking-tight">
                  Life<span className='text-red-600'>Drop</span>
                </span>
                <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                  Donate Blood, Save Lives
                </span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isLinkHighlighted = 
                  (link.name === 'About Us' && activeModal === 'about') ||
                  (link.name === 'How It Works' && activeModal === 'howItWorks') ||
                  (link.name === 'Eligibility' && activeModal === 'eligibility') ||
                  (link.name === 'Contact' && activeModal === 'contact') ||
                  (link.name === 'Home' && !activeModal);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); link.action(); }}
                    className={`relative font-semibold text-sm transition-colors duration-200 py-2 ${
                      isLinkHighlighted ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ease-in-out ${isLinkHighlighted ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </a>
                );
              })}
            </div>

            {/* PERFECTLY ALIGNED INTERACTIVE DROPDOWN AUTH BUTTON */}
            <div className="hidden md:flex relative items-center">
              <button 
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                onBlur={() => setTimeout(() => setShowAuthDropdown(false), 200)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <User size={16} />
                <span>Portal Access</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${showAuthDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* Action Dropdown List Overlay */}
              {showAuthDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 text-left">
                  <button 
                    onMouseDown={(e) => {
                      e.preventDefault(); 
                      if (onPatientAuth) onPatientAuth("login");
                      setShowAuthDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Droplets size={16} className="text-red-600" />
                    <span>I Need Blood (Doctor)</span>
                  </button>
                  
                  <div className="border-t border-gray-50 my-1"></div>
                  
                  <button 
                    onMouseDown={(e) => {
                      e.preventDefault(); 
                      if (onRegisterClick) onRegisterClick();
                      setShowAuthDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Users size={16} className="text-gray-500" />
                    <span>I Want to Donate (Donor)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(true)} className="text-gray-700 p-2 hover:bg-gray-50 rounded-lg active:scale-90 transition-all">
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Off-Canvas Menu */}
        <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

          {/* Drawer */}
          <div className={`fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            {/* CLOSE BUTTON */}
            <div className="absolute top-5 right-5 z-[110]">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 active:scale-95 transition shadow-inner border border-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* CENTERED LOGO SECTION */}
            <div className="relative p-6 border-b border-gray-100 flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white select-none shrink-0">
              <div className="relative bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100 mb-3">
                <img src="/navlogo.jpg" alt="LifeDrop" className="h-12 w-12 object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900">Life<span className="text-red-600">Drop</span></span>
              <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Donate Blood • Save Lives</p>
            </div>

            {/* LINKS LIST (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 text-left overscroll-contain">
              {navLinks.map((link) => {
                const isLinkHighlighted = 
                  (link.name === 'About Us' && activeModal === 'about') ||
                  (link.name === 'How It Works' && activeModal === 'howItWorks') ||
                  (link.name === 'Eligibility' && activeModal === 'eligibility') ||
                  (link.name === 'Contact' && activeModal === 'contact') ||
                  (link.name === 'Home' && !activeModal);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleMobileClick(link.action); }}
                    className={`flex items-center px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isLinkHighlighted 
                        ? 'bg-red-50 text-red-700 border-l-4 border-red-600 pl-3' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              {/* MOBILE AUTH ACTIONS SPLIT */}
              <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 mb-1">Access Options</p>
                <button 
                  onClick={() => { setIsOpen(false); onPatientAuth && onPatientAuth("login"); }}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-red-600 text-white font-bold text-sm rounded-xl shadow-md active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Droplets size={16} />
                    <span>I Need Blood (Doctor)</span>
                  </div>
                  <span>→</span>
                </button>
                <button 
                  onClick={() => { setIsOpen(false); onRegisterClick && onRegisterClick(); }}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-900 text-white font-bold text-sm rounded-xl shadow-md active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Users size={16} />
                    <span>I Want to Donate (Donor)</span>
                  </div>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* INSPIRING QUOTE CARD IN FOOTER */}
            <div className="p-4 bg-white border-t border-gray-50 mt-auto shrink-0">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 p-5 shadow-lg text-center">
                
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white opacity-5 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-black opacity-10 rounded-full blur-lg"></div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-full shadow-inner mb-1">
                    <Heart size={20} className="text-white fill-white" />
                  </div>
                  <h4 className="text-white font-bold text-[15px] leading-tight tracking-wide">
                    Be a Hero Today
                  </h4>
                  <p className="text-red-100/90 text-[11px] font-medium leading-relaxed px-1">
                    "A single drop of your blood can be the ocean of life for someone else."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* FLOATING MODALS CONTAINER */}
      <AboutUs isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} />
      <HowItWorksModal isOpen={activeModal === 'howItWorks'} onClose={() => setActiveModal(null)} />
      <Eligibility isOpen={activeModal === 'eligibility'} onClose={() => setActiveModal(null)} />
      <Contact isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} />
    </>
  );
};

export default Navbar;