
import React, { useState, useEffect, useMemo, useRef } from 'react';

interface Announcement {
  id: number;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "The King of Urban Riding: OT05 PRO!",
    description: "Order now and enjoy a special discount! Use the code DOC50 to get an extra €50 off your OT05 PRO — available from just €1019.",
    linkText: "OT05 Pro",
    linkUrl: "#"
  },
  {
    id: 2,
    title: "Feel the Rhythm of the City: OT07 Mid-Drive E-Bike!",
    description: "Ride the city in style with the OT07. Use the code DEC50 to enjoy an extra €50 off, with final prices starting from €1,039.",
    linkText: "OT07",
    linkUrl: "#"
  },
  {
    id: 3,
    title: "Meet the all-new OT12 – your perfect urban commuter, now available!",
    description: "The perfect ride for your daily journey is here. Pre-order the OT12 now to enjoy an special discount — use code DEC30 for €30 off enjoy an extra discount",
    linkText: "OT12",
    linkUrl: "#"
  },
  {
    id: 4,
    title: "Unfold your city adventure with the new OT02!",
    description: "Compact, stylish, and electric — everything you need for easy urban travel. Use code DEC30 enjoy an extra discount .",
    linkText: "OT02",
    linkUrl: "#"
  }
];

const PRODUCT_CATEGORIES = [
  { name: 'City Ebike', image: 'https://onesportglobal.com/cdn/shop/files/OT05-PRO-White-1_400x.png' },
  { name: 'Fat Tire Ebike', image: 'https://onesportglobal.com/cdn/shop/files/BK6-Cream-1_400x.png' },
  { name: 'Folding Ebike', image: 'https://onesportglobal.com/cdn/shop/files/OT16-2-Black-1_400x.png' },
  { name: 'Cargo Ebike', image: 'https://onesportglobal.com/cdn/shop/files/OT01-Blue-1_400x.png' },
  { name: 'Road Ebike', image: 'https://onesportglobal.com/cdn/shop/files/OT07-Black-1_400x.png' },
  { name: 'All E Bike', image: 'https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_400x.png' },
];

const LANGUAGES = ['English', 'Italiano', 'Français', 'Español', 'Deutsch'];

interface HeaderProps {
  onCartClick?: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const langRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const longestTitle = useMemo(() => {
    return ANNOUNCEMENTS.reduce((a, b) => (a.title.length > b.title.length ? a : b)).title;
  }, []);

  const handleLangSelect = (lang: string) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  return (
    <header className="w-full bg-white z-[100] relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .lang-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .lang-scrollbar::-webkit-scrollbar-track {
          background: #f9f9f9;
        }
        .lang-scrollbar::-webkit-scrollbar-thumb {
          background: #666;
          border-radius: 4px;
        }
        .lang-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #666 #f9f9f9;
        }
      `}} />

      {/* Full-width Search Overlay */}
      <div className={`fixed inset-x-0 top-0 bg-white z-[200] transition-all duration-300 transform shadow-xl ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-[1440px] mx-auto px-6 h-32 flex items-center justify-center gap-6 relative">
          <div className="relative w-full max-w-3xl group">
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search" 
              className="w-full bg-white border-[1.5px] border-[#1a1a1a] rounded-2xl px-8 py-4 text-[15px] font-medium outline-none focus:ring-0 placeholder:text-gray-400"
            />
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[#1a1a1a] hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </button>
          </div>
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div 
          className={`absolute left-0 top-0 h-full w-[80%] max-w-[350px] bg-white transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center">
                 <span className="text-xl font-black italic tracking-tighter text-[#0054ff]">MKING</span>
                 <span className="text-xl font-black italic tracking-tighter text-[#1a1a1a] ml-0.5">EBIKE</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-lg font-black uppercase tracking-tight text-[#1a1a1a]">
              <a href="#" className="flex items-center justify-between border-b border-gray-100 pb-4">
                Products
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="#" className="border-b border-gray-100 pb-4">Accessories</a>
              <a href="#" className="border-b border-gray-100 pb-4">Ride Moments</a>
              <a href="#" className="border-b border-gray-100 pb-4">Support</a>
              <a href="#" className="flex items-center gap-2 text-[#005a4d]">
                Christmas Sale
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 18H9V22H15V18H20L12 2Z" /></svg>
              </a>
            </nav>

            <div className="mt-auto pt-10 border-t border-gray-100">
               <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Language</div>
               <div className="flex flex-wrap gap-3">
                  {LANGUAGES.map(lang => (
                    <button 
                      key={lang} 
                      onClick={() => handleLangSelect(lang)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${lang === selectedLang ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                      {lang}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between relative z-[110] bg-white">
        
        {/* Left: Hamburger (Mobile Only) */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
            <svg className="w-7 h-7 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Center: Logo (Mobile: Absolute center, Desktop: Flex-start) */}
        <div className="lg:flex-shrink-0 cursor-pointer flex items-center absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
          <div className="flex items-center">
             <span className="text-2xl font-black italic tracking-tighter text-[#0054ff]">MKING</span>
             <span className="text-2xl font-black italic tracking-tighter text-[#1a1a1a] ml-0.5">EBIKE</span>
          </div>
        </div>

        {/* Desktop: Center Navigation */}
        <nav className="hidden lg:flex items-center space-x-10 h-full">
          <div 
            className="relative h-full flex items-center group"
            onMouseEnter={() => setIsProductsHovered(true)}
            onMouseLeave={() => setIsProductsHovered(false)}
          >
            <div className={`flex items-center gap-1.5 cursor-pointer text-[#333] font-medium transition-colors h-full px-2 ${isProductsHovered ? 'text-[#0070e0]' : 'hover:text-[#0070e0]'}`}>
              <span className="text-[15px] border-b-2 border-transparent group-hover:border-[#0070e0] py-1 transition-all">Products</span>
              <svg className={`w-3 h-3 transition-transform duration-300 ${isProductsHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </div>

            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[1100px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-b-2xl border-t border-gray-100 transition-all duration-300 origin-top overflow-hidden ${isProductsHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
              <div className="p-10 flex gap-12">
                <div className="flex-1">
                  <div className="mb-8 flex justify-center">
                    <button className="bg-[#1e73be] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#165a94] transition-colors">
                      By Category
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-y-12 gap-x-8">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <div key={cat.name} className="group/item cursor-pointer flex flex-col items-center">
                        <div className="w-full aspect-[16/10] mb-4 flex items-center justify-center overflow-hidden">
                          <img 
                            src={cat.image} 
                            alt={cat.name} 
                            className="max-w-[80%] max-h-full object-contain group-hover/item:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="flex items-center gap-1 group-hover/item:text-[#1e73be] transition-colors">
                          <span className="text-[14px] font-bold text-gray-800 group-hover/item:text-[#1e73be]">{cat.name}</span>
                          <svg className="w-4 h-4 transition-transform group-hover/item:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7"></path></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[320px] border-l border-gray-100 pl-12 flex flex-col">
                  <button className="w-full bg-[#1e73be] hover:bg-[#165a94] text-white py-4 rounded-lg font-bold text-sm transition-all mb-8 shadow-md uppercase tracking-wider">
                    Shop all bikes
                  </button>

                  <div className="space-y-6">
                    <div className="items-start gap-4 group/link cursor-pointer hidden md:flex">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover/link:bg-[#eef6ff] group-hover/link:text-[#1e73be] transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#1e73be] font-bold text-[15px] flex items-center gap-1">
                          Compare models 
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                        </span>
                        <p className="text-[12px] text-gray-400 leading-tight mt-1">Compare MKING EBIKE models and choose your best fit</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors group/contact">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/contact:bg-gray-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </div>
                      <span className="text-[12px] font-medium">support@mkingebike.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cursor-pointer text-[#333] font-medium hover:text-[#0070e0] transition-colors text-[15px]">Accessories</div>
          <div className="cursor-pointer text-[#333] font-medium hover:text-[#0070e0] transition-colors text-[15px]">Ride Moments</div>
          <div className="cursor-pointer text-[#333] font-medium hover:text-[#0070e0] transition-colors text-[15px]">Support</div>
          
          <div className="flex items-center gap-1 cursor-pointer group">
            <div className="flex flex-col items-center">
              <div className="border border-[#005a4d] px-1 py-0 rounded-sm">
                <span className="text-[#005a4d] text-[8px] font-extrabold leading-none">SALE</span>
              </div>
              <span className="text-[#005a4d] text-[11px] font-bold font-serif">Christmas</span>
            </div>
            <div className="text-[#005a4d]">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2L4 18H9V22H15V18H20L12 2Z" />
               </svg>
            </div>
          </div>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Desktop Language Selector */}
          <div className="relative hidden lg:block" ref={langRef}>
            <div 
              className="flex items-center gap-1.5 text-[14px] font-bold cursor-pointer text-[#333] hover:text-[#0070e0] transition-colors py-2"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              {selectedLang}
              <svg className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
            </div>

            <div className={`absolute top-full right-0 mt-1 w-[160px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-md transition-all duration-300 origin-top z-[120] ${isLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="relative py-2 max-h-[220px] overflow-y-auto lang-scrollbar">
                {LANGUAGES.map((lang) => (
                  <div 
                    key={lang} 
                    onClick={() => handleLangSelect(lang)}
                    className={`px-5 py-2.5 text-[14px] font-medium cursor-pointer transition-colors ${lang === selectedLang ? 'text-gray-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                  >
                    <span className={lang === selectedLang ? 'underline underline-offset-4 decoration-gray-400' : ''}>{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-1 hover:text-[#0070e0] transition-colors"
          >
            <svg className="w-6 h-6 lg:w-5 lg:h-5 text-[#1a1a1a] lg:text-inherit" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          </button>
          
          <button className="p-1 hover:text-[#0070e0] transition-colors hidden md:block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </button>
          
          <button 
            onClick={onCartClick}
            className="p-1 hover:text-[#0070e0] transition-colors relative"
          >
            {/* Standard bag icon SVG */}
            <svg className="w-7 h-7 lg:w-5.5 lg:h-5.5 text-[#1a1a1a] lg:text-inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {/* Dynamic Cart Badge - Matches User Screenshot (Bottom Right Overlap, Black Circle, White Text) */}
            {cartCount > 0 && (
              <span className="absolute -bottom-1 -right-1 bg-[#1a1a1a] text-white text-[10px] lg:text-[9px] font-black w-5 h-5 lg:w-4.5 lg:h-4.5 rounded-full flex items-center justify-center border-2 border-white lg:border-none shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Dynamic Announcement Bar */}
      <div className={`bg-[#004d43] text-white transition-all duration-300 overflow-hidden relative z-[100] ${isExpanded ? 'py-10' : 'py-3'}`}>
        <div className="max-w-[1440px] mx-auto px-6 relative">
          
          {!isExpanded ? (
            <div className="flex items-center justify-center">
               <div className="flex items-center relative group max-w-full">
                  <div className="h-6 relative overflow-hidden flex items-center justify-center">
                    <div className="invisible px-4 whitespace-nowrap text-[13px] font-bold select-none pointer-events-none">
                      {longestTitle}
                    </div>

                    {ANNOUNCEMENTS.map((item, idx) => (
                      <div 
                        key={item.id}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${idx === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                      >
                        <span className="text-[12px] md:text-[13px] font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[80vw]">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setIsExpanded(true)}
                    className="ml-1 md:ml-2 p-1 bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center rounded"
                    title="Expand"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
               </div>
            </div>
          ) : (
            <div className="animate-fade-in relative">
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute -top-4 right-0 w-8 h-8 rounded-full bg-white text-[#004d43] flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm z-20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
                {ANNOUNCEMENTS.map((item) => (
                  <div key={item.id} className="flex flex-col group">
                    <h3 className="text-[14px] font-extrabold mb-3 leading-tight text-white uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-[12px] opacity-80 leading-relaxed mb-4 font-medium max-w-xs">
                      {item.description}
                    </p>
                    <a 
                      href={item.linkUrl} 
                      className="text-[12px] font-bold underline underline-offset-4 hover:opacity-70 transition-opacity mt-auto"
                    >
                      {item.linkText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
