import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Estimator from './components/Estimator';
import Inquiries from './components/Inquiries';
import Footer from './components/Footer';
import { SERVICES_DATA } from './data';
import { Inquiry } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'showcase' | 'estimator' | 'inquiries'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('web-dev');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kalakar_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse inquiries from local storage', e);
    }
  }, []);

  // Save inquiry callback
  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('kalakar_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save inquiry to local storage', e);
    }
  };

  // Delete inquiry callback
  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    try {
      localStorage.setItem('kalakar_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update local storage', e);
    }
  };

  // Navigates and auto-scrolls to top of viewport for proper page transitions
  const handleViewChange = (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-selects service for the estimator page
  const handleSelectServiceForEstimator = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* Navigation Header */}
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        savedInquiriesCount={inquiries.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero 
                services={SERVICES_DATA} 
                onViewChange={handleViewChange}
                onSelectService={handleSelectServiceForEstimator}
              />
            </motion.div>
          )}
          
          {currentView === 'showcase' && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Showcase 
                services={SERVICES_DATA} 
                onSelectService={handleSelectServiceForEstimator}
                onViewChange={handleViewChange}
              />
            </motion.div>
          )}

          {currentView === 'estimator' && (
            <motion.div
              key="estimator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Estimator 
                services={SERVICES_DATA} 
                selectedServiceId={selectedServiceId}
                onServiceChange={setSelectedServiceId}
                onInquirySubmitted={handleInquirySubmitted}
              />
            </motion.div>
          )}

          {currentView === 'inquiries' && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Inquiries 
                inquiries={inquiries}
                onDeleteInquiry={handleDeleteInquiry}
                onViewChange={handleViewChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Area with Float Badge */}
      <Footer onViewChange={handleViewChange} />

    </div>
  );
}
