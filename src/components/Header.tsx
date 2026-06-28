import React from 'react';
import { Menu, X, Sparkles, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: 'home' | 'showcase' | 'estimator' | 'inquiries';
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
  savedInquiriesCount: number;
}

export default function Header({ currentView, onViewChange, savedInquiriesCount }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'showcase', label: 'Our Services' },
    { id: 'estimator', label: 'Quote Estimator' },
    { id: 'inquiries', label: 'Saved Quotes' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#070708]/90 backdrop-blur-md border-b border-neutral-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo Wordmark */}
        <button 
          onClick={() => { onViewChange('home'); setIsOpen(false); }}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          id="brand-logo"
        >
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-sm bg-white flex items-center justify-center transition-shadow shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <span className="text-[#070708] font-bold text-base tracking-widest font-mono">K</span>
          </motion.div>
          <div>
            <span className="text-white font-sans font-medium text-lg tracking-wider block">KALAKAR</span>
            <span className="text-neutral-500 font-mono text-[9px] tracking-widest uppercase block -mt-1">Creative Studio</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onViewChange(item.id)}
              className={`relative py-2 text-[12px] tracking-widest uppercase font-mono transition-colors duration-200 cursor-pointer focus:outline-none ${
                currentView === item.id 
                  ? 'text-white font-medium' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
              {item.id === 'inquiries' && savedInquiriesCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-4 w-4 h-4 rounded-full bg-white text-[#070708] text-[9px] font-bold flex items-center justify-center font-mono"
                >
                  {savedInquiriesCount}
                </motion.span>
              )}
              {currentView === item.id && (
                <motion.span 
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white rounded-full" 
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03, borderColor: '#ffffff', color: '#ffffff' }}
            whileTap={{ scale: 0.98 }}
            id="header-cta"
            onClick={() => onViewChange('estimator')}
            className="px-5 py-2.5 text-[11px] font-mono tracking-widest uppercase border border-neutral-800 text-neutral-300 bg-neutral-950/40 rounded-sm hover:bg-neutral-900 transition-colors duration-300 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
            Instant Quote
          </motion.button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          {currentView !== 'inquiries' && savedInquiriesCount > 0 && (
            <button 
              onClick={() => onViewChange('inquiries')}
              className="relative p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ClipboardList className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-[#070708] text-[9px] font-bold flex items-center justify-center font-mono">
                {savedInquiriesCount}
              </span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#0a0a0c] border-b border-neutral-900 absolute top-20 left-0 w-full px-6 py-6 flex flex-col gap-4 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`py-3 text-[13px] tracking-widest uppercase font-mono text-left border-b border-neutral-900 transition-colors ${
                    currentView === item.id ? 'text-white pl-2 border-l-2 border-l-white font-semibold' : 'text-neutral-400'
                  } flex items-center justify-between`}
                >
                  <span>{item.label}</span>
                  {item.id === 'inquiries' && savedInquiriesCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-white text-[#070708] text-[10px] font-bold flex items-center justify-center font-mono">
                      {savedInquiriesCount}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
