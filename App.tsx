
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoTicker } from './components/PromoTicker';
import { BestSellers } from './components/BestSellers';
import { Categories } from './components/Categories';
import { FeatureVideo } from './components/FeatureVideo';
import { Reviews } from './components/Reviews';
import { BlogSection } from './components/BlogSection';
import { SocialFamily, ProductInfo } from './components/SocialFamily';
import { HelpAndDownload } from './components/HelpAndDownload';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartItem } from './types';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Sample Cart Data matching the user's screenshot
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "OneSport OT16-2 Folding E-Bike",
      image: "https://onesportglobal.com/cdn/shop/files/OT16-2-Black-1_600x.png",
      price: 769.00,
      quantity: 1,
      model: "OT16-2",
      selectedColor: "Black",
      discount: "",
      shipping: "",
      colors: []
    },
    {
      id: 2,
      name: "OneSport OT01 Cargo E-Bike",
      image: "https://onesportglobal.com/cdn/shop/files/OT01-Blue-1_100x.png",
      price: 1199.00,
      quantity: 1,
      model: "OT01",
      selectedColor: "Teal Blue",
      discount: "",
      shipping: "",
      colors: []
    }
  ]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (productInfo: ProductInfo) => {
    const existingIndex = cartItems.findIndex(item => item.name === productInfo.name);
    
    if (existingIndex > -1) {
      handleUpdateQuantity(cartItems[existingIndex].id, cartItems[existingIndex].quantity + 1);
    } else {
      const priceVal = parseFloat(productInfo.price.replace(/[€,]/g, ''));
      const originalPriceVal = productInfo.originalPrice ? parseFloat(productInfo.originalPrice.replace(/[€,]/g, '')) : undefined;
      
      const newItem: CartItem = {
        id: Date.now(),
        name: productInfo.name,
        image: productInfo.image,
        price: priceVal,
        originalPrice: originalPriceVal,
        quantity: 1,
        model: productInfo.name.split(' ').slice(1, 3).join(' '),
        selectedColor: "Standard",
        discount: "",
        shipping: "within 24-hour",
        colors: []
      };
      
      setCartItems(prev => [...prev, newItem]);
    }
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter']">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartCount}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <main>
        <Hero />
        <PromoTicker />
        
        {/* Christmas Banner Section - Portait on Mobile, Horizontal on Desktop */}
        <section className="px-4 py-12 md:py-20 md:px-10 lg:px-12 max-w-[1550px] mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3.5/4] md:aspect-[21/8] lg:aspect-[25/9] flex items-end justify-center md:items-center md:justify-start group">
             {/* Dynamic background with parallax effect */}
             <img 
               src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1920" 
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
               alt="Christmas Sale"
             />
             {/* Multi-stage gradient for readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent"></div>
             
             <div className="relative z-10 text-white p-10 md:pl-16 lg:pl-24 max-w-2xl text-center md:text-left flex flex-col items-center md:items-start">
                <div className="mb-2 md:mb-4">
                   {/* Christmas Tree Icon */}
                   <svg className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2L4 18H9V22H15V18H20L12 2Z" />
                   </svg>
                </div>
                
                <h2 className="text-[42px] md:text-7xl lg:text-8xl font-serif-elegant italic mb-2 md:mb-4 tracking-tight drop-shadow-2xl leading-[1.1]">
                  Christmas Sale
                </h2>
                
                <p className="text-[13px] md:text-2xl font-bold mb-8 md:mb-10 drop-shadow-md opacity-95 tracking-wide max-w-[280px] md:max-w-none leading-relaxed">
                  Free Christmas Gift Pack + Extra 10€ stacked coupon
                </p>
                
                <button className="bg-[#004d43] hover:bg-[#003d35] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-[12px] md:text-base tracking-[0.1em] transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2.5 uppercase border border-white/10 backdrop-blur-sm">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                   </svg>
                   ORDER NOW
                </button>
             </div>
          </div>
        </section>

        <BestSellers />
        <Categories />
        <FeatureVideo />
        <Reviews />
        <BlogSection />
        <SocialFamily onAddToCart={handleAddToCart} />
        <HelpAndDownload />
      </main>
      <Footer />
    </div>
  );
}

export default App;
