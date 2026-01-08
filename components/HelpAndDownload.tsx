
import React from 'react';

export const HelpAndDownload: React.FC = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-10 lg:px-12 max-w-[1550px] mx-auto">
      {/* Horizontal Banner Design to save space */}
      <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-black min-h-[320px] md:min-h-[280px] flex items-center shadow-2xl">
        {/* Grayscale Background Image with high contrast */}
        <img 
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.35] contrast-125 transition-transform duration-700 hover:scale-105" 
          alt="Help center background" 
        />
        
        {/* Content Overlay - Responsive Flex Layout */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 py-10 md:py-0">
          
          {/* Left Side: Text Branding */}
          <div className="text-center md:text-left flex flex-col max-w-xl">
            <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-black text-white mb-2 tracking-tight leading-[1.1]">
              We Are Here To Help
            </h2>
            <p className="text-[13px] md:text-[15px] font-bold text-white/40 tracking-widest uppercase">
              Please contact us if you have any questions
            </p>
          </div>
          
          {/* Right Side: Contact Pill Bar */}
          <div className="w-full max-w-md lg:max-w-lg">
            <div className="bg-white rounded-full p-1.5 md:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center border border-white/10 group focus-within:ring-4 focus-within:ring-[#004d43]/20 transition-all">
              <input 
                type="text" 
                placeholder="Contact us" 
                className="flex-1 bg-transparent text-[#1a1a1a] px-6 md:px-8 py-3 md:py-4 font-bold text-[14px] md:text-base focus:outline-none placeholder:text-gray-400"
              />
              <button className="w-12 h-12 md:w-16 md:h-16 bg-[#004d43] text-white rounded-full flex items-center justify-center hover:bg-[#003d35] transition-all shadow-md active:scale-90 flex-shrink-0 group-hover:rotate-12">
                {/* WhatsApp Icon */}
                <svg className="w-6 h-6 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.412 2.437 1.111 3.393l-.707 2.584 2.646-.693c.895.539 1.944.852 3.067.852 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.435 8.197c-.147.414-.729.757-1.006.804-.277.047-.624.085-1.745-.373-1.428-.583-2.349-2.035-2.42-2.129-.071-.094-.574-.764-.574-1.458 0-.693.364-1.035.495-1.176.13-.141.284-.176.377-.176s.188 0 .271.004c.09.004.211-.034.33.254.12.288.412 1.003.447 1.074.035.071.058.153.011.247s-.07.153-.141.235c-.071.082-.148.183-.211.246-.071.07-.144.148-.063.287s.356.586.764.95c.525.467.967.612 1.108.683.141.07.223.058.306-.035.082-.094.353-.414.447-.553.094-.141.188-.117.317-.07s.824.388.966.459.235.106.27.165c.035.059.035.342-.112.756z"/>
                </svg>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
