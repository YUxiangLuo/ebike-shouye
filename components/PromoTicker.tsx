
import React from 'react';

export const PromoTicker: React.FC = () => {
  const items = [
    { text: 'BLACK FRIDAY', icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    )},
    { text: 'UP TO 50% OFF', icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
      </svg>
    )},
    { text: 'FREE SHIPPING', icon: '🚚' },
    { text: '2-YEAR WARRANTY', icon: '🛡️' },
  ];

  const tickerItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#004d43] py-4 overflow-hidden border-y border-[#003d35] select-none">
      <div className="animate-marquee">
        <div className="flex items-center space-x-12 md:space-x-16 px-8">
          {tickerItems.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center gap-3 text-white font-black text-[12px] md:text-sm uppercase tracking-[0.1em] whitespace-nowrap italic">
              <span className="flex items-center text-white/90">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-12 md:space-x-16 px-8">
          {tickerItems.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center gap-3 text-white font-black text-[12px] md:text-sm uppercase tracking-[0.1em] whitespace-nowrap italic">
              <span className="flex items-center text-white/90">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
