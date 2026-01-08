
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop - Increased z-index to 250 */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[250] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer Panel - Increased z-index to 300 to be on top of all header elements */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[300] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-2xl font-black text-[#1a1a1a]">Your cart</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Table Headers */}
          <div className="px-6 py-2 flex justify-between items-center text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
            <span>PRODUCT</span>
            <span>TOTAL</span>
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto px-6 divide-y divide-gray-50">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <svg className="w-16 h-16 text-gray-100 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
                <button onClick={onClose} className="mt-6 text-[#0054ff] font-black text-xs uppercase underline underline-offset-4">Continue shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-6 flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-center">
                    <img src={item.image} className="max-w-full max-h-full object-contain" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between mb-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MKING EBIKE®</span>
                        <h3 className="text-[14px] font-bold text-[#1a1a1a] leading-tight">{item.name}</h3>
                      </div>
                      <span className="text-[14px] font-bold text-[#1a1a1a]">€{(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    
                    <div className="text-[12px] text-gray-500 space-y-0.5 mb-4">
                      <p>€{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p>Model: {item.model}</p>
                      <p>Color: {item.selectedColor}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden h-9">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-9 h-full flex items-center justify-center hover:bg-gray-50 text-gray-400 font-bold transition-colors border-r border-gray-200"
                        >
                          <span className="text-lg">－</span>
                        </button>
                        <span className="w-9 h-full flex items-center justify-center text-[13px] font-bold text-[#1a1a1a]">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-full flex items-center justify-center hover:bg-gray-50 text-gray-400 font-bold transition-colors border-l border-gray-200"
                        >
                          <span className="text-lg">＋</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area */}
          <div className="p-6 bg-white border-t border-gray-100 space-y-4">
            {/* Special Instructions */}
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-gray-50">
                <span className="text-[13px] font-bold text-gray-600">Order special instructions</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
              <textarea 
                placeholder="How can we help you?"
                className="w-full mt-3 p-3 text-[13px] bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-gray-300 transition-colors min-h-[80px]"
              />
            </details>

            {/* Price Breakdown */}
            <div className="space-y-3">
              {items.length > 0 && (
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#005a4d]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.48 8.48a.75.75 0 0 1-1.06 0l-8.48-8.48a6 6 0 0 1 8.48-8.48L12 4.06l.76-.3zm-1.06 9.54a.75.75 0 0 0 1.06 0l5.47-5.47a4.5 4.5 0 0 0-6.36-6.36L12 1.44l-.47.47a4.5 4.5 0 0 0-6.36 6.36l5.47 5.47z"/></svg>
                  Merry Christmas (-€10.00)
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span className="text-[14px] font-black text-[#1a1a1a]">Estimated total</span>
                <span className="text-[20px] font-black text-[#1a1a1a]">€{items.length > 0 ? (subtotal - 10).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}</span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                Taxes, Discounts and <a href="#" className="underline">shipping</a> calculated at checkout
              </p>
            </div>

            {/* Checkout Button */}
            <button 
              disabled={items.length === 0}
              className={`w-full font-black text-sm py-4 rounded-lg tracking-wider uppercase shadow-xl transition-all active:scale-95 ${items.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-[#0054ff] hover:bg-blue-700 text-white'}`}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
