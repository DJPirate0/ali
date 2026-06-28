import React from 'react';
import { Mail, Phone, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  
  const handleWhatsAppRedirect = () => {
    const businessNumber = "923221804322";
    const message = encodeURIComponent("Hello Kalakar Creative Studio! I am visiting your website and would love to collaborate on a digital project.");
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-[#050506] border-t border-neutral-900 text-white relative">
      
      {/* Footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        
        {/* Studio Branding summary Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center">
              <span className="text-black font-bold text-base tracking-widest font-mono">K</span>
            </div>
            <div>
              <span className="text-white font-sans font-medium text-lg tracking-wider block">KALAKAR</span>
              <span className="text-neutral-500 font-mono text-[9px] tracking-widest uppercase block -mt-1">Creative Studio</span>
            </div>
          </div>
          
          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
            We are a compact, disciplined decentralized freelancer collective. We deliver structural web code, strategic brand campaigns, viral video timelines, and high-contrast visuals. Handcrafted with precision.
          </p>
          
          <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mt-2 block">
            © {new Date().getFullYear()} KALAKAR CREATIVE. ALL RIGHTS SECURED.
          </span>
        </div>

        {/* Sitemap Link Coordinates Column */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2">Explore Directory</h4>
          <nav className="flex flex-col gap-3 font-mono text-xs">
            <button 
              onClick={() => onViewChange('home')} 
              className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer"
            >
              /HOME
            </button>
            <button 
              onClick={() => onViewChange('showcase')} 
              className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer"
            >
              /SERVICES_SHOWCASE
            </button>
            <button 
              onClick={() => onViewChange('estimator')} 
              className="text-[#ececec] hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1.5"
            >
              /QUOTE_CALCULATOR
              <Sparkles className="w-3 h-3 text-neutral-500" />
            </button>
            <button 
              onClick={() => onViewChange('inquiries')} 
              className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer"
            >
              /SAVED_QUOTES
            </button>
          </nav>
        </div>

        {/* Contact Coordinates Column */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Contact Channels</h4>
          
          <div className="flex flex-col gap-3.5 font-sans text-xs text-neutral-300">
            <button
              onClick={handleWhatsAppRedirect}
              className="flex items-center gap-3 hover:text-white text-left transition-colors cursor-pointer group"
              id="footer-whatsapp-link"
            >
              <div className="w-8 h-8 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:border-neutral-700 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-mono">WhatsApp Call/Text</span>
                <span className="font-mono text-xs text-white">0322 1804322</span>
              </div>
            </button>

            <a
              href="mailto:studio@kalakar.io"
              className="flex items-center gap-3 hover:text-white text-left transition-colors group"
              id="footer-email-link"
            >
              <div className="w-8 h-8 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:border-neutral-700 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-mono">Email Direct</span>
                <span className="font-mono text-xs text-white">studio@kalakar.io</span>
              </div>
            </a>
          </div>

          <div className="mt-2 text-[10px] font-mono text-neutral-600 leading-relaxed uppercase">
            <span>Reference Inspiration: </span>
            <a 
              href="https://www.kalakar.io/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 hover:text-white underline inline-flex items-center gap-1"
            >
              kalakar.io
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

      </div>

      {/* PERSISTENT FLOATING WHATSAPP BUTTON (Pinned on bottom-right of viewport) */}
      <button
        onClick={handleWhatsAppRedirect}
        id="floating-whatsapp-badge"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white text-black hover:bg-neutral-200 transition-all shadow-2xl hover:scale-110 active:scale-95 duration-300 cursor-pointer flex items-center justify-center border border-neutral-200 group"
      >
        <MessageCircle className="w-6 h-6 stroke-[2]" />
        
        {/* Floating Tooltip Label */}
        <span className="absolute right-14 scale-0 group-hover:scale-100 origin-right transition-all bg-[#0a0a0c] text-white text-[10px] font-mono uppercase tracking-widest py-1.5 px-3 rounded-sm whitespace-nowrap border border-neutral-800 pointer-events-none shadow-lg">
          Chat on WhatsApp
        </span>
      </button>

    </footer>
  );
}
