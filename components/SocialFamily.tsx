
import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface ProductInfo {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
}

interface FamilyMoment {
  id: string;
  type: 'image' | 'video';
  url: string;
  poster?: string;
  products: ProductInfo[];
}

interface SocialFamilyProps {
  onAddToCart?: (product: ProductInfo) => void;
}

const ORIGINAL_MOMENTS: FamilyMoment[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    products: [
      { name: 'Onesport W77 Fat Tire E-Bike', price: '€999.00', originalPrice: '€1,199.00', image: 'https://onesportglobal.com/cdn/shop/files/OT07-Black-1_100x.png' },
      { name: 'Onesport W66 Moped', price: '€949.00', originalPrice: '€1,079.00', image: 'https://onesportglobal.com/cdn/shop/files/BK6-Cream-1_100x.png' }
    ]
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'OneSport OT05 City E-Bike', price: '€949.00', originalPrice: '€1,299.00', image: 'https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_100x.png' }]
  },
  {
    id: '3',
    type: 'video',
    url: 'https://v.ft-static.com/04/11/48/84/700_041148841.mp4',
    poster: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e910b9?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'Onesport W66 Moped E-Bike', price: '€949.00', originalPrice: '€1,079.00', image: 'https://onesportglobal.com/cdn/shop/files/BK6-Cream-1_100x.png' }]
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'Onesport W66 Moped E-Bike', price: '€949.00', originalPrice: '€1,079.00', image: 'https://onesportglobal.com/cdn/shop/files/BK6-Cream-1_100x.png' }]
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544191446-e4d3f443a20a?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'Onesport OT01 Cargo E-Bike', price: '€1,199.00', originalPrice: '€1,569.00', image: 'https://onesportglobal.com/cdn/shop/files/OT01-Blue-1_100x.png' }]
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'OneSport OT16-2 Fold', price: '€769.00', originalPrice: '€1,019.00', image: 'https://onesportglobal.com/cdn/shop/files/OT16-2-Black-1_100x.png' }]
  },
  {
    id: '7',
    type: 'video',
    url: 'https://v.ft-static.com/04/11/48/84/700_041148841.mp4',
    poster: 'https://images.unsplash.com/photo-1593133671424-94c65538e8ec?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'Onesport OT02 Light', price: '€699.00', originalPrice: '€799.00', image: 'https://onesportglobal.com/cdn/shop/files/OT02-Red-1_100x.png' }]
  },
  {
    id: '8',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'OneSport BK6 Fat Tire', price: '€899.00', originalPrice: '€1,199.00', image: 'https://onesportglobal.com/cdn/shop/files/BK6-Cream-1_100x.png' }]
  },
  {
    id: '9',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77891?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'Onesport OT05 City', price: '€949.00', originalPrice: '€1,299.00', image: 'https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_100x.png' }]
  },
  {
    id: '10',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1532660621034-fb55e2e59762?auto=format&fit=crop&q=80&w=800',
    products: [{ name: 'Onesport OT08 Pro', price: '€1,499.00', originalPrice: '€1,899.00', image: 'https://onesportglobal.com/cdn/shop/files/BK8-Cream-1_100x.png' }]
  }
];

const MOMENTS = [...ORIGINAL_MOMENTS, ...ORIGINAL_MOMENTS, ...ORIGINAL_MOMENTS];

export const SocialFamily: React.FC<SocialFamilyProps> = ({ onAddToCart }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [scales, setScales] = useState<number[]>(MOMENTS.map(() => 0.82));
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const updateScales = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerWidth = container.offsetWidth;
    const containerCenter = container.scrollLeft + containerWidth / 2;
    const isMobile = window.innerWidth < 768;

    const children = Array.from(container.children);
    const newScales = children.map((child) => {
      const childElem = child as HTMLElement;
      const childRect = childElem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2 - containerRect.left + container.scrollLeft;
      
      const distanceFromCenter = Math.abs(childCenter - containerCenter);
      
      if (isMobile) {
        const threshold = containerWidth / 1.4;
        const normalizedDist = Math.min(distanceFromCenter / threshold, 1);
        return 1 - (normalizedDist * 0.18); 
      } else {
        const threshold = containerWidth / 2.5;
        const normalizedDist = Math.min(distanceFromCenter / threshold, 1);
        return 1 - (normalizedDist * 0.04); 
      }
    });

    setScales(newScales);

    const scrollEnd = container.scrollWidth - containerWidth;
    if (container.scrollLeft <= 2) {
      container.scrollLeft = container.scrollWidth / 3;
    } else if (container.scrollLeft >= scrollEnd - 2) {
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
      scrollContainer.addEventListener('scroll', updateScales, { passive: true });
      setTimeout(updateScales, 100);
    }
    window.addEventListener('resize', updateScales);
    return () => {
      scrollContainer?.removeEventListener('scroll', updateScales);
      window.removeEventListener('resize', updateScales);
    };
  }, [updateScales]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const closeExpanded = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  const toggleExpand = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 500;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 500;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden select-none relative">
      <div className="max-w-[1550px] mx-auto px-6 mb-8 md:mb-12">
        <h2 className="text-[24px] md:text-[36px] font-black text-[#1a1a1a] tracking-tight leading-[1.1]">
          Welcome to the <br className="md:hidden" /> ONESPORT Family
        </h2>
      </div>

      <div className="relative group">
        <button 
          onClick={scrollLeft}
          className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full items-center justify-center shadow-2xl border border-gray-100 hover:scale-110 active:scale-95 transition-all text-[#1a1a1a] opacity-0 group-hover:opacity-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <button 
          onClick={scrollRight}
          className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full items-center justify-center shadow-2xl border border-gray-100 hover:scale-110 active:scale-95 transition-all text-[#1a1a1a] opacity-0 group-hover:opacity-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`
            flex overflow-x-auto hide-scrollbar snap-x snap-mandatory 
            px-[17vw] md:px-12 
            gap-4 md:gap-8 
            pb-2 md:pb-14 
            items-end
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          `}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {MOMENTS.map((moment, index) => (
            <div 
              key={`${moment.id}-${index}`} 
              className="flex-shrink-0 w-[66vw] sm:w-[320px] md:w-[480px] snap-center transition-all duration-500 ease-out will-change-transform flex flex-col items-center"
              style={{ 
                transform: `scale(${scales[index] || 1})`, 
                opacity: scales[index] > 0.9 ? 1 : 0.8 
              }}
            >
              <div className="relative w-full aspect-[3/4] md:aspect-square rounded-[2.2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-100">
                {moment.type === 'video' ? (
                  <video 
                    src={moment.url} 
                    poster={moment.poster} 
                    className="w-full h-full object-cover" 
                    muted loop playsInline autoPlay 
                  />
                ) : (
                  <img src={moment.url} className="w-full h-full object-cover" alt="Moment" draggable={false} />
                )}
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] pointer-events-auto">
                   <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-3 shadow-2xl border border-white/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-2xl p-1.5 flex items-center justify-center flex-shrink-0 border border-gray-100">
                          <img src={moment.products[0].image} className="max-w-full max-h-full object-contain" alt="" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-[11px] md:text-[14px] font-bold text-[#1a1a1a] truncate leading-tight">
                            {moment.products[0].name}
                          </h4>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-[13px] md:text-[18px] font-black text-[#1a1a1a]">{moment.products[0].price}</span>
                            {moment.products[0].originalPrice && (
                              <span className="text-[9px] md:text-[12px] text-gray-300 line-through font-bold">{moment.products[0].originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <button 
                          onClick={() => onAddToCart?.(moment.products[0])}
                          className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all active:scale-90 bg-white shadow-sm"
                        >
                          <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                        </button>
                        <button 
                          onClick={(e) => toggleExpand(e, index)}
                          className={`w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-90 bg-white shadow-sm ${expandedIndex === index ? 'rotate-180 bg-gray-100' : ''}`}
                        >
                           <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
                        </button>
                      </div>
                   </div>
                </div>

                <div 
                  onClick={closeExpanded}
                  className={`absolute inset-0 bg-white/98 backdrop-blur-xl transition-all duration-500 transform cursor-pointer z-50 ${expandedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                >
                   <div className="h-full flex flex-col p-5 md:p-12 overflow-hidden">
                      <div className="flex items-center justify-between mb-6 md:mb-10 cursor-default" onClick={(e) => e.stopPropagation()}>
                         <h3 className="text-[20px] md:text-[32px] font-black text-[#1a1a1a] tracking-tight leading-none">Products In This Post</h3>
                         <div className="p-2.5 md:p-3 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-all" onClick={closeExpanded}>
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                         </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 hide-scrollbar flex flex-col items-center">
                         {moment.products.map((p, i) => (
                           <div 
                             key={i} 
                             className="w-full max-w-lg bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-4 md:gap-6 cursor-default group/item" 
                             onClick={(e) => e.stopPropagation()}
                           >
                              <div className="w-14 h-14 md:w-24 md:h-24 bg-gray-50 rounded-[1.2rem] md:rounded-[1.8rem] p-1.5 md:p-3 flex items-center justify-center flex-shrink-0">
                                 <img src={p.image} className="max-w-full max-h-full object-contain group-hover/item:scale-110 transition-transform duration-500" alt="" />
                              </div>

                              <div className="flex-1 min-w-0 py-1">
                                 <h4 className="font-extrabold text-[13px] md:text-[17px] text-[#1a1a1a] leading-[1.3] mb-1 md:mb-2 line-clamp-2 md:line-clamp-none">
                                    {p.name}
                                 </h4>
                                 <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                                    <span className="text-[16px] md:text-[22px] font-black text-[#004d43] leading-none">{p.price}</span>
                                    {p.originalPrice && (
                                      <span className="text-[10px] md:text-[13px] text-gray-300 line-through font-bold opacity-80">{p.originalPrice}</span>
                                    )}
                                 </div>
                              </div>

                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAddToCart?.(p);
                                }}
                                className="w-10 h-10 md:w-14 md:h-14 bg-[#004d43] text-white rounded-full flex items-center justify-center hover:bg-[#003d35] transition-all shadow-lg active:scale-90 flex-shrink-0"
                              >
                                 <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                              </button>
                           </div>
                         ))}
                         <div className="h-20 w-full flex-shrink-0" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 md:mt-16 px-6">
        <button className="w-full md:w-auto bg-[#004d43] text-white px-16 py-4 md:py-5 rounded-full font-black text-[13px] md:text-sm tracking-[0.15em] hover:bg-[#003d35] transition-all shadow-xl uppercase active:scale-95">
          Upload your cycling moments
        </button>
      </div>
    </section>
  );
};
