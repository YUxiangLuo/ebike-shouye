
import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  thumbnail: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "The City Elf : OT07",
    subtitle: "Find your flow, wherever you go.",
    cta: "Explore more",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=1920",
    thumbnail: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    title: "Onesport OT05 Pro",
    subtitle: "Exceptional Value All-Terrain E-Bike.",
    cta: "Explore more",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1920",
    thumbnail: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 3,
    title: "OT16-2 : Urban Buddy",
    subtitle: "Designed for motion, built for life.",
    cta: "Explore more",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1920",
    thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 4,
    title: "Onesport OT12 urban",
    subtitle: "Master the rhythm of the city streets.",
    cta: "Explore more",
    image: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=1920",
    thumbnail: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=300"
  }
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[85vh] bg-[#f0f0f0] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, index) => {
        return (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={slide.image}
              className="w-full h-full object-cover"
              alt={slide.title}
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center md:justify-start px-6 md:px-24">
              <div className="max-w-2xl text-center md:text-left text-white drop-shadow-lg">
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase leading-none drop-shadow-2xl animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl font-bold mb-8 opacity-95 tracking-wide">
                  {slide.subtitle}
                </p>
                <div className="flex justify-center md:justify-start">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-full font-black text-sm md:text-lg hover:bg-white hover:text-black transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest bg-black/10 backdrop-blur-sm">
                    {slide.cta}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 w-full px-6">
        <div className="bg-white/90 backdrop-blur-md px-3 py-2 md:px-6 md:py-3 rounded-[2.5rem] shadow-2xl flex items-center gap-1 md:gap-4 border border-white/50">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className="relative transition-all active:scale-95 group"
            >
              <div className={`
                w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center p-1 transition-all duration-300
                ${index === currentIndex 
                  ? 'bg-white ring-2 ring-[#004d43] shadow-md' 
                  : 'opacity-30 hover:opacity-100'}
              `}>
                <img 
                  src={slide.thumbnail} 
                  className="w-full h-full object-cover" 
                  alt="Bike"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-2.5">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${index === currentIndex ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
