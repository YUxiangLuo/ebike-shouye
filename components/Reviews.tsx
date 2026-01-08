
import React, { useRef, useState, useEffect } from 'react';
import { Review } from '../types';

const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Maurizio R.",
    date: "2025/11/7",
    text: "Beautiful ebike I love",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    author: "Abdullatif A.",
    date: "2025/10/31",
    text: "I work in food delivery in Nuremberg; the bike is excellent, very comfortable and fast; the design is one of the best I have seen; I give 10 stars as a rating for this bike.",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    author: "Erik T.",
    date: "2025/10/20",
    text: "Already during my first testride i was completely amazed by the bike. The updated Bafang M210 middrive motor has lot of power and gives with the torque sensor very smooth ride with direct...",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    author: "Rossella Morena Z.",
    date: "2025/10/18",
    text: "Fantastica l'adoro va benissimo sia sullo sterrato che sul grandi salite senza sforzo, ma va un po' troppo veloce in discesa causa peso. Un po' rumorosa senza assistita sembra quasi...",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    author: "Laila B.",
    date: "2025/10/9",
    text: "Perfecte fiets voor mijn dochter. Stevig maar toch niet te zwaar. Geeft perfecte ondersteuning",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1593133671424-94c65538e8ec?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    author: "Marco P.",
    date: "2025/11/15",
    text: "Ottima bici, robusta e potente. Ideale per le strade di Roma. Consegna puntuale e imballaggio perfetto. Il motore è silenziosissimo!",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1571068316344-75bc76f77891?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    author: "Jennifer K.",
    date: "2025/11/10",
    text: "I was hesitant at first, but this bike changed my lifestyle. No more traffic jams! The battery life is better than advertised and the lights are very bright for night riding.",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1544191446-e4d3f443a20a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    author: "Klaus S.",
    date: "2025/11/05",
    text: "Sehr gute Verarbeitung und das Fahrgefühl ist einfach klasse. Der Drehmomentsensor reagiert sehr feinfühlig. Top Produkt, würde ich jederzeit wieder kaufen!",
    rating: 5,
    avatar: "https://onesportglobal.com/cdn/shop/files/logo_100x.png",
    productImage: "https://images.unsplash.com/photo-1532660621034-fb55e2e59762?auto=format&fit=crop&q=80&w=800",
  }
];

export const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

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
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden relative select-none">
      <div className="max-w-[1550px] mx-auto px-6 mb-8 md:mb-12">
        <h2 className="text-[24px] md:text-[36px] font-black text-[#1a1a1a] tracking-tight">Riders' Reviews</h2>
      </div>

      <div className="relative group">
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-300">
          {canScrollLeft && (
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 transition-all border border-gray-100"
            >
              <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
            </button>
          )}
        </div>

        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-300">
          {canScrollRight && (
            <button 
              onClick={scrollRight}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 transition-all border border-gray-100"
            >
              <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
            </button>
          )}
        </div>

        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={checkScroll}
          className={`
            flex gap-3 md:gap-6 overflow-x-auto hide-scrollbar px-6 pb-12
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            snap-x snap-mandatory
          `}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {REVIEWS.map(review => (
            <div 
              key={review.id} 
              className="flex-shrink-0 w-[84vw] sm:w-[320px] md:w-[380px] bg-white rounded-[2.2rem] md:rounded-[2.8rem] border border-gray-100 shadow-[0_12px_45px_rgba(0,0,0,0.06)] flex flex-col snap-center overflow-hidden pointer-events-none"
            >
              <div className="p-4 md:p-6 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2.5 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-sm">
                    <img src={review.avatar} className="w-full h-full object-contain" alt="Logo" />
                  </div>
                  <span className="font-black text-[14px] md:text-[16px] text-[#1a1a1a] tracking-tight">{review.author}</span>
                </div>
                <span className="text-[11px] md:text-[12px] font-bold text-gray-400 tracking-tight">{review.date}</span>
              </div>

              <div className="w-full aspect-square md:aspect-[4/3] overflow-hidden bg-gray-50">
                <img src={review.productImage} className="w-full h-full object-cover" alt="Review photo" draggable={false} />
              </div>

              <div className="px-5 md:px-6 pt-5 md:pt-6 pb-2 flex items-center justify-between pointer-events-auto">
                <div className="flex gap-2.5 md:gap-3">
                  <span className="text-xl md:text-2xl opacity-20 grayscale cursor-pointer hover:grayscale-0 hover:opacity-100 transition-all">😊</span>
                  <span className="text-xl md:text-2xl opacity-20 grayscale cursor-pointer hover:grayscale-0 hover:opacity-100 transition-all">😐</span>
                  <span className="text-xl md:text-2xl opacity-20 grayscale cursor-pointer hover:grayscale-0 hover:opacity-100 transition-all">☹️</span>
                </div>
                <div className="flex gap-0.5 md:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-[#ffcc00] fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
              </div>

              <div className="px-5 md:px-6 pb-8 md:pb-12 pointer-events-auto">
                <p className="text-[#333] text-[14px] md:text-[15px] font-medium leading-relaxed mt-2 md:mt-3 line-clamp-4">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
