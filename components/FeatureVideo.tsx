
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface PlaylistVideo {
  id: number;
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  image: string;
  thumbnail: string;
  price?: string;
}

const PLAYLIST: PlaylistVideo[] = [
  {
    id: 1,
    title: "ULTIMATELY CITY CRUISER - OT05 PRO",
    subtitle: "Looking for the best valued E-bike of 2025? The OneSport OT05 Pro might just be it",
    quote: "Looking for the best valued E-bike of 2025? The OneSport OT05 Pro might just be it",
    author: "Martijn Wester",
    price: "€1019",
    image: "https://images.unsplash.com/photo-1532298229144-0ee0c9e910b9?auto=format&fit=crop&q=80&w=1200",
    thumbnail: "https://images.unsplash.com/photo-1532298229144-0ee0c9e910b9?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    title: "SLEEK, POWERFUL, BEST VALUED --- OT07",
    subtitle: "Excellent frame build quality, great value for the price & more",
    quote: "Excellent frame build quality, great value for the price & more",
    author: "BK42",
    image: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=1200",
    thumbnail: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 3,
    title: "THE ELF OF THE CITY - OT05",
    subtitle: "If you are looking for a reliable and comfortable Ebike for commuting, OT05 is definitely worth considering",
    quote: "If you are looking for a reliable and comfortable Ebike for commuting, OT05 is definitely worth considering",
    author: "BK42",
    image: "https://images.unsplash.com/photo-1593133671424-94c65538e8ec?auto=format&fit=crop&q=80&w=1200",
    thumbnail: "https://images.unsplash.com/photo-1593133671424-94c65538e8ec?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 4,
    title: "EXCEPTIONAL VALUE ALL-TERRAIN E-BIKE --- OT05 PRO",
    subtitle: "A good urban Ebike, a work bike, for going shopping, also for off-roading in the countryside",
    quote: "A good urban Ebike, a work bike, for going shopping, also for off-roading in the countryside",
    author: "Le Vélo Urbain",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200",
    thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 5,
    title: "LONGTAIL, BIG BATTERY, FUNCTIONAL CARGO E-BIKE",
    subtitle: "OneSport is definitely smart, battery-powered longtail is worth your money",
    quote: "OneSport is definitely smart, battery-powered longtail is worth your money",
    author: "Martijn Wester",
    image: "https://images.unsplash.com/photo-1544191446-e4d3f443a20a?auto=format&fit=crop&q=80&w=1200",
    thumbnail: "https://images.unsplash.com/photo-1544191446-e4d3f443a20a?auto=format&fit=crop&q=80&w=300"
  }
];

const CYCLE_TIME = 5000;

export const FeatureVideo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PLAYLIST.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const startTime = Date.now() - (progress / 100) * CYCLE_TIME;
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / CYCLE_TIME) * 100, 100);
      
      if (currentProgress >= 100) {
        nextSlide();
      } else {
        setProgress(currentProgress);
      }
    }, 16);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, progress]);

  const activeVideo = PLAYLIST[activeIndex];

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-10 lg:px-12 max-w-[1550px] mx-auto">
      <h2 className="text-[24px] md:text-[36px] font-black text-[#1a1a1a] mb-8 md:mb-12 tracking-tight">
        <span className="hidden md:inline">What They Say</span>
        <span className="md:hidden">WHAT THEY SAY</span>
      </h2>
      
      <div className="hidden lg:flex rounded-[0.5rem] overflow-hidden bg-white shadow-xl h-[580px] border border-gray-100">
        <div className="relative flex-1 group">
          <img 
            src={activeVideo.image} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            alt={activeVideo.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white z-10">
             <div className="mb-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80 mb-2 block">ONESPORT</span>
                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-8 drop-shadow-lg max-w-2xl">
                  {activeVideo.title.split(' --- ')[0]}
                </h3>
             </div>

             <div className="flex gap-4 mb-10">
                <button className="px-10 py-3.5 bg-white text-black rounded-full font-black text-[11px] hover:bg-gray-100 transition-all uppercase tracking-widest">
                  LEARN MORE
                </button>
                <button className="px-10 py-3.5 border-2 border-white text-white rounded-full font-black text-[11px] hover:bg-white/10 transition-all uppercase tracking-widest flex items-center gap-2">
                  WATCH
                </button>
             </div>

             <div className="max-w-xl">
               <p className="text-[15px] font-medium leading-relaxed italic opacity-95">
                 "{activeVideo.quote}" — {activeVideo.author}
               </p>
             </div>
          </div>
        </div>

        <div className="w-[400px] bg-[#050505] flex flex-col overflow-y-auto hide-scrollbar border-l border-white/5">
          {PLAYLIST.map((item, index) => (
            <button 
              key={item.id}
              onClick={() => handleItemClick(index)}
              className={`flex items-start gap-4 p-5 transition-all hover:bg-white/5 text-left border-b border-white/5 relative group ${index === activeIndex ? 'bg-white/[0.08]' : ''}`}
            >
              {index === activeIndex && (
                <div className="absolute top-0 left-0 h-[2px] bg-white z-20 transition-all" style={{ width: `${progress}%` }}></div>
              )}
              
              <div className="relative w-[110px] aspect-video rounded-md overflow-hidden flex-shrink-0 shadow-lg">
                <img src={item.thumbnail} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-1 left-1 bg-red-600 text-[8px] font-black px-1.5 py-0.5 rounded-sm text-white flex items-center gap-1">
                  <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </div>
                {item.price && (
                  <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-[8px] font-black px-1.5 py-0.5 rounded text-white">
                    {item.price}
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <h4 className={`text-[10px] font-black uppercase tracking-tight mb-1 truncate ${index === activeIndex ? 'text-white' : 'text-white/40'}`}>
                  {item.title}
                </h4>
                <p className="text-[12px] text-white/90 font-bold leading-tight line-clamp-2 mb-1">
                  "{item.subtitle.split('?')[0]}..."
                </p>
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">— {item.author}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div 
        className="lg:hidden flex flex-col rounded-[2.2rem] overflow-hidden bg-black shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-video overflow-hidden group/player">
          <img 
            src={activeVideo.image} 
            className="absolute inset-0 w-full h-full object-cover"
            alt={activeVideo.title}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
              <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-2 text-white/90">
             <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20">
               <img src={activeVideo.thumbnail} className="w-full h-full object-cover" alt="" />
             </div>
             <span className="text-[10px] font-bold truncate max-w-[150px] uppercase tracking-wider">{activeVideo.title.split(' --- ')[0]}</span>
          </div>
        </div>

        <div className="bg-black px-6 py-8 flex flex-col items-center text-center">
          <h3 className="text-[15px] md:text-xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
            {activeVideo.title}
          </h3>

          <div className="flex gap-2.5 mb-8 w-full max-w-sm">
            <button className="flex-1 py-3 border-2 border-white text-white rounded-full font-black text-[10px] active:scale-95 transition-all uppercase tracking-[0.15em]">
              WATCH
            </button>
            <button className="flex-1 py-3 bg-white text-black rounded-full font-black text-[10px] active:scale-95 transition-all uppercase tracking-[0.15em]">
              LEARN MORE
            </button>
          </div>

          <div className="flex gap-2 w-full max-w-[200px] mb-8">
            {PLAYLIST.map((_, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className="relative h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
              >
                {index === activeIndex && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-[16ms] ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-[280px]">
            <p className="text-[13px] text-white font-medium leading-relaxed italic mb-1 opacity-90">
              "{activeVideo.quote}"
            </p>
            <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] block">
              --- {activeVideo.author}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
