
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-4 md:px-10 lg:px-12">
      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div>
            <h4 className="font-black italic text-lg mb-10 uppercase tracking-widest text-white">About</h4>
            <ul className="space-y-4 text-gray-400 text-[13px] font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">User manuals</li>
              <li className="hover:text-white cursor-pointer transition-colors">Business Cooperation</li>
              <li className="hover:text-white cursor-pointer transition-colors">MKING EBIKE Community</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black italic text-lg mb-10 uppercase tracking-widest text-white">Quick links</h4>
            <ul className="space-y-4 text-gray-400 text-[13px] font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-white cursor-pointer transition-colors">MKING News</li>
              <li className="hover:text-white cursor-pointer transition-colors">Payment Methods</li>
              <li className="hover:text-white cursor-pointer transition-colors">Affiliate Marketing</li>
              <li className="hover:text-white cursor-pointer transition-colors">Collabs</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black italic text-lg mb-10 uppercase tracking-widest text-white">Services</h4>
            <ul className="space-y-4 text-gray-400 text-[13px] font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Warranty Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors uppercase">Intellectual Property Rights</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black italic text-lg mb-10 uppercase tracking-widest text-white">Stay in the loop</h4>
            <div className="relative mb-10">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-transparent border-b border-gray-800 py-4 text-[13px] font-medium focus:border-white transition-colors outline-none"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#005a4d] transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
            
            <div className="flex gap-6 mb-10">
               <span className="cursor-pointer hover:text-[#005a4d] transition-colors"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.419.679.819.896 1.377.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.217.558-.477.957-.896 1.377-.419.419-.819.679-1.377.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413-.558-.217-.957-.477-1.377-.896-.419-.419-.679-.819-.896-1.377-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.217-.558.477-.957.896-1.377.419-.419.819-.679 1.377-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.554-.789.306-1.459.716-2.126 1.383-.667.667-1.077 1.337-1.383 2.126-.297.763-.497 1.634-.554 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.258 2.148.554 2.911.306.789.716 1.459 1.383 2.126.667.667 1.337 1.077 2.126 1.383.763.297 1.634.497 2.911.554 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.258 2.911-.554.789-.306 1.459-.716 2.126-1.383.667-.667 1.077-1.337 1.383-2.126.297-.763.497-1.634.554-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.258-2.148-.554-2.911-.306-.789-.716-1.459-1.383-2.126-.667-.667-1.337-1.077-2.126-1.383-.763-.297-1.634-.497-2.911-.554-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></span>
               <span className="cursor-pointer hover:text-[#005a4d] transition-colors"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg></span>
            </div>
            
            <div className="space-y-4 text-[12px] font-medium">
               <div>
                 <p className="font-black text-white uppercase mb-1">Support:</p>
                 <p className="text-gray-400">support@mkingebike.com</p>
               </div>
               <div>
                 <p className="font-black text-white uppercase mb-1">Inquiries:</p>
                 <p className="text-gray-400">hello@mkingebike.com</p>
               </div>
            </div>
          </div>
        </div>

        {/* Brand Bottom - Updated Logo and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-900 pt-16">
          <div className="flex items-center mb-8 md:mb-0 opacity-100">
            <span className="text-3xl font-black italic tracking-tighter text-[#0054ff]">MKING</span>
            <span className="text-3xl font-black italic tracking-tighter text-white ml-1">EBIKE</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-0 grayscale opacity-40">
             {['Visa', 'Mastercard', 'Paypal', 'Amex', 'Klarna', 'ApplePay', 'GooglePay'].map(p => (
               <div key={p} className="bg-white/10 px-3 py-1 rounded text-[9px] font-black uppercase text-white border border-white/10">{p}</div>
             ))}
          </div>

          <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">© 2024, MKING EBIKE GROUP</p>
        </div>
      </div>
    </footer>
  );
};
