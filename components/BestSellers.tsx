
import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';

interface ColorOption {
  hex: string;
  image: string;
}

interface ExtendedProduct extends Omit<Product, 'colors'> {
  colorOptions: ColorOption[];
}

const PRODUCTS: ExtendedProduct[] = [
  {
    id: 1,
    name: "OneSport OT16-2 Folding E-Bike",
    image: "https://onesportglobal.com/cdn/shop/files/OT16-2-Black-1_600x.png",
    price: 769.00,
    originalPrice: 1019.00,
    discount: "-25%",
    shipping: "within 24-hour",
    colorOptions: [
      { hex: "#000000", image: "https://onesportglobal.com/cdn/shop/files/OT16-2-Black-1_600x.png" },
      { hex: "#f5f5dc", image: "https://onesportglobal.com/cdn/shop/files/OT16-2-Black-1_600x.png" }
    ]
  },
  {
    id: 2,
    name: "Onesport OT05 Pro City E-Bike",
    image: "https://onesportglobal.com/cdn/shop/files/OT05-PRO-White-1_600x.png",
    price: 1069.00,
    originalPrice: 1499.00,
    discount: "-29%",
    shipping: "within 24-hour",
    colorOptions: [
      { hex: "#ffffff", image: "https://onesportglobal.com/cdn/shop/files/OT05-PRO-White-1_600x.png" },
      { hex: "#808080", image: "https://onesportglobal.com/cdn/shop/files/OT05-PRO-White-1_600x.png" }
    ]
  },
  {
    id: 3,
    name: "OneSport OT02 Lightweight Folding E-Bike",
    image: "https://onesportglobal.com/cdn/shop/files/OT02-Red-1_600x.png",
    price: 699.00,
    originalPrice: 799.00,
    discount: "-13%",
    shipping: "within 24-hour",
    colorOptions: [
      { hex: "#ff0000", image: "https://onesportglobal.com/cdn/shop/files/OT02-Red-1_600x.png" },
      { hex: "#008000", image: "https://onesportglobal.com/cdn/shop/files/OT02-Red-1_600x.png" }
    ]
  },
  {
    id: 4,
    name: "Onesport OT12 urban E-bike",
    image: "https://onesportglobal.com/cdn/shop/files/OT12-Black-1_600x.png",
    price: 749.00,
    originalPrice: 799.00,
    discount: "-6%",
    shipping: "within 24-hour",
    colorOptions: [
      { hex: "#000000", image: "https://onesportglobal.com/cdn/shop/files/OT12-Black-1_600x.png" },
      { hex: "#ffffff", image: "https://onesportglobal.com/cdn/shop/files/OT12-Black-1_600x.png" }
    ]
  },
  {
    id: 5,
    name: "Onesport OT08Pro Full Suspension E-Bike",
    image: "https://onesportglobal.com/cdn/shop/files/BK8-Cream-1_600x.png",
    price: 1499.00,
    originalPrice: undefined,
    discount: "",
    shipping: "within 24-hour",
    colorOptions: [
      { hex: "#f5f5dc", image: "https://onesportglobal.com/cdn/shop/files/BK8-Cream-1_600x.png" },
      { hex: "#000000", image: "https://onesportglobal.com/cdn/shop/files/BK8-Cream-1_600x.png" }
    ]
  },
  {
    id: 6,
    name: "OneSport OT05 City E-Bike",
    image: "https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_600x.png",
    price: 949.00,
    originalPrice: 1299.00,
    discount: "-27%",
    shipping: "November 10",
    colorOptions: [
      { hex: "#ffffff", image: "https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_600x.png" },
      { hex: "#0000ff", image: "https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_600x.png" },
      { hex: "#add8e6", image: "https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_600x.png" },
      { hex: "#808080", image: "https://onesportglobal.com/cdn/shop/files/OT05-City-Cream-1_600x.png" }
    ]
  }
];

const ProductCard: React.FC<{ product: ExtendedProduct }> = ({ product }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentImage = product.colorOptions[selectedColorIndex].image;

  return (
    <div className="flex-shrink-0 lg:flex-shrink w-[245px] sm:w-[280px] md:w-[320px] lg:w-full snap-start group flex flex-col rounded-[1.2rem] md:rounded-[1.4rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
      {/* Image Area - White Background */}
      <div className="relative aspect-[1/1] bg-white flex items-center justify-center p-3 md:p-5 border-b border-gray-50 overflow-hidden cursor-pointer">
        {product.discount && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 bg-[#004d43] text-white text-[13px] md:text-[14px] xl:text-[15px] font-black px-2 py-0.5 rounded-[3px] shadow-md uppercase tracking-tighter">
            {product.discount}
          </div>
        )}
        <img 
          src={currentImage} 
          className="w-[90%] h-[90%] object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none"
          alt={product.name}
        />
      </div>

      {/* Info Area - Dark Green Background */}
      <div className="bg-[#004d43] p-4 md:p-5 lg:p-4 xl:p-5 flex flex-col flex-grow text-white">
        <h3 className="font-extrabold text-[15px] md:text-[16px] xl:text-[17px] leading-[1.3] mb-4 md:mb-5 min-h-[2.6em] line-clamp-2 tracking-tight cursor-pointer hover:text-white/80">
          {product.name}
        </h3>
        
        <div className="space-y-4 mb-6 md:mb-7">
          <div className="space-y-0.5">
            <p className="text-[10px] md:text-[10px] text-white/50 font-bold tracking-tight uppercase">
              Shipping date
            </p>
            <p className="text-[11px] md:text-[12px] font-black tracking-tight uppercase">
              {product.shipping}
            </p>
          </div>

          {/* Color Swatches - Larger on Mobile */}
          <div className="flex gap-2.5 md:gap-2">
            {product.colorOptions.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedColorIndex(i)}
                style={{ backgroundColor: opt.hex }} 
                className={`w-6 h-6 md:w-5 md:h-5 rounded-full border shadow-sm transition-all duration-300 ${i === selectedColorIndex ? 'scale-110 border-white ring-2 ring-white/50' : 'border-white/20 hover:scale-105'}`}
                title={`Select color ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-2 md:gap-3 mb-8">
          <span className="text-[19px] md:text-[22px] xl:text-[24px] font-black text-[#ffcc00] leading-none">
            €{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] md:text-[13px] text-white/60 line-through font-bold">
              €{product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Policy Footer - Optimized typography */}
        <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-0.5 opacity-60">
          <p className="text-[7.5px] md:text-[8.5px] font-black tracking-[0.1em] text-white leading-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            2-year warranty , free shipping ,
          </p>
          <p className="text-[7.5px] md:text-[8.5px] font-black tracking-[0.1em] text-white leading-tight uppercase">
            14-day return time
          </p>
        </div>
      </div>
    </div>
  );
};

export const BestSellers: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return;
    if (!scrollRef.current) return;
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
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-10 xl:px-12 max-w-[1550px] mx-auto bg-white overflow-hidden select-none">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2 className="text-[24px] md:text-[36px] font-black text-[#1a1a1a] tracking-tight">
          Best seller
        </h2>
      </div>
      
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`
          flex lg:grid overflow-x-auto lg:overflow-visible pb-8 md:pb-10 lg:pb-0 
          hide-scrollbar gap-4 md:gap-5 lg:gap-3 xl:gap-5
          lg:grid-cols-6
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab lg:cursor-default'}
          snap-x snap-mandatory lg:snap-none
        `}
        style={{ 
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          userSelect: 'none' 
        }}
      >
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
