
import React from 'react';

const CATS = [
  { name: 'City E-Bike', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600' },
  { name: 'Foldable E-Bike', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600' },
  { name: 'Fat Tire E-Bike', image: 'https://images.unsplash.com/photo-1558981001-199556e089ed?auto=format&fit=crop&q=80&w=600' },
  { name: 'Cargo E-Bike', image: 'https://images.unsplash.com/photo-1591741535018-d042766c62eb?auto=format&fit=crop&q=80&w=600' },
  { name: 'Gear', image: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sale', image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=600' }
];

export const Categories: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-10 lg:px-12 max-w-[1550px] mx-auto">
      <h2 className="text-[24px] md:text-[36px] font-black text-[#1a1a1a] mb-8 md:mb-12 tracking-tight">
        Shop by category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {CATS.map(cat => (
          <div key={cat.name} className="group cursor-pointer flex flex-col items-center">
            <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden bg-[#f5f5f5] mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
              <img 
                src={cat.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={cat.name}
              />
            </div>
            <h4 className="font-extrabold text-base md:text-lg text-[#1a1a1a] tracking-tight group-hover:text-[#005a4d] transition-colors">{cat.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};
