
import React, { useRef, useState, useEffect } from 'react';
import { BlogPost } from '../types';

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How to Fix Common Electric Bicycle Gearbox Noise: Causes and Solutions",
    description: "Have you ever been cruising on your urban e-bike and suddenly heard some weird sounds coming from the gearbox? Whether it's...",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Why Isn't Your E-Bike Motor Working? Causes and Solutions",
    description: "So, you hop on your e-bike, ready for a smooth ride, but suddenly, the motor isn't kicking in. Frustrating, right? Well,...",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "E-Bike Riding Posture: Tips to Improve Comfort and Efficiency",
    description: "So, you've just gotten your hands on a pedal assist e-bike — maybe it's your first one, or maybe you're already an e-bike pro...",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
  }
];

export const BlogSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || window.innerWidth >= 1024) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden select-none">
      <div className="max-w-[1550px] mx-auto px-6 mb-8 md:mb-12">
        <h2 className="text-[24px] md:text-[36px] font-black text-[#1a1a1a] tracking-tight uppercase leading-[1.1]">
          DISCOVER YOUR MOST <br className="hidden md:block" /> EXCITING CITY RIDES
        </h2>
      </div>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`
          flex overflow-x-auto hide-scrollbar px-6 pb-12 gap-6
          lg:grid lg:grid-cols-3 lg:gap-12 lg:max-w-[1550px] lg:mx-auto
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab lg:cursor-default'}
          ${!isDragging ? 'snap-x snap-mandatory lg:snap-none' : ''}
        `}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {POSTS.map(post => (
          <article 
            key={post.id} 
            className="flex-shrink-0 w-[78vw] sm:w-[340px] lg:w-full flex flex-col snap-start pointer-events-none group"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-gray-100 shadow-sm">
              <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} draggable={false} />
            </div>
            
            <div className="pointer-events-auto">
              <h3 className="text-xl font-black mb-3 leading-tight text-[#1a1a1a] line-clamp-2">{post.title}</h3>
              <p className="text-gray-400 text-[14px] mb-6 line-clamp-2 leading-relaxed font-bold">{post.description}</p>
              <button className="px-8 py-3 border-2 border-[#1a1a1a] rounded-full text-[12px] font-black text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all uppercase tracking-widest active:scale-95">Read more</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
