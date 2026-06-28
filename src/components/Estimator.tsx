import React, { useState, useEffect } from 'react';
import { Check, ClipboardList, Send, Trash2, ArrowRight, Sparkles, AlertCircle, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, SelectedOption, Inquiry, ServiceOption } from '../types';

interface EstimatorProps {
  services: Service[];
  selectedServiceId: string;
  onServiceChange: (id: string) => void;
  onInquirySubmitted: (inquiry: Inquiry) => void;
}

export default function Estimator({ services, selectedServiceId, onServiceChange, onInquirySubmitted }: EstimatorProps) {
  // Finds current active service
  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  // Selected options state
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  // Quantity states for unit-based selections (mapping key: `${serviceId}-${optionId}` to quantity value)
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Client inquiry form states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);

  // Auto-fill default option if none is selected for active service to guide client interaction
  useEffect(() => {
    const activeSelections = selectedOptions.filter(o => o.serviceId === activeService.id);
    if (activeSelections.length === 0 && activeService.categories.length > 0) {
      const firstOpt = activeService.categories[0].options[0];
      if (firstOpt) {
        setSelectedOptions(prev => {
          const exists = prev.some(
            o => o.serviceId === activeService.id && o.categoryId === activeService.categories[0].id && o.optionId === firstOpt.id
          );
          if (exists) return prev;
          return [
            ...prev, 
            { 
              serviceId: activeService.id, 
              categoryId: activeService.categories[0].id, 
              optionId: firstOpt.id 
            }
          ];
        });
        if (firstOpt.type === 'per_unit') {
          setQuantities(prev => ({
            ...prev,
            [`${activeService.id}-${firstOpt.id}`]: 1
          }));
        }
      }
    }
  }, [activeService]);

  // Handle toggling option selection
  const handleToggleOption = (categoryId: string, option: ServiceOption) => {
    const exists = selectedOptions.some(
      o => o.serviceId === activeService.id && o.categoryId === categoryId && o.optionId === option.id
    );

    if (exists) {
      setSelectedOptions(prev => prev.filter(
        o => !(o.serviceId === activeService.id && o.categoryId === categoryId && o.optionId === option.id)
      ));
      // Remove quantity if unit based
      if (option.type === 'per_unit') {
        const updatedQuantities = { ...quantities };
        delete updatedQuantities[`${activeService.id}-${option.id}`];
        setQuantities(updatedQuantities);
      }
    } else {
      setSelectedOptions(prev => {
        const existsInPrev = prev.some(
          o => o.serviceId === activeService.id && o.categoryId === categoryId && o.optionId === option.id
        );
        if (existsInPrev) return prev;
        return [
          ...prev,
          {
            serviceId: activeService.id,
            categoryId: categoryId,
            optionId: option.id
          }
        ];
      });
      // Set default quantity
      if (option.type === 'per_unit') {
        setQuantities(prev => ({
          ...prev,
          [`${activeService.id}-${option.id}`]: 1
        }));
      }
    }
  };

  // Adjust quantities
  const handleQuantityChange = (optionId: string, increment: boolean) => {
    const key = `${activeService.id}-${optionId}`;
    const currentQty = quantities[key] || 1;
    const newQty = increment ? currentQty + 1 : Math.max(1, currentQty - 1);
    
    setQuantities(prev => ({
      ...prev,
      [key]: newQty
    }));
  };

  // Clean selections for active service
  const handleClearActiveServiceSelections = () => {
    setSelectedOptions(prev => prev.filter(o => o.serviceId !== activeService.id));
  };

  // Compute estimate summaries
  const getSelectedItemsDetails = () => {
    return selectedOptions
      .filter(o => o.serviceId === activeService.id)
      .map(sel => {
        const category = activeService.categories.find(c => c.id === sel.categoryId);
        const option = category?.options.find(opt => opt.id === sel.optionId);
        const qty = quantities[`${activeService.id}-${sel.optionId}`] || 1;
        const totalOptionPrice = option ? option.price * (option.type === 'per_unit' ? qty : 1) : 0;

        return {
          optionId: sel.optionId,
          name: option?.name || '',
          categoryName: category?.name || '',
          price: option?.price || 0,
          totalPrice: totalOptionPrice,
          type: option?.type || 'fixed',
          quantity: option?.type === 'per_unit' ? qty : undefined,
          unitLabel: option?.unitLabel || 'unit',
        };
      });
  };

  const selectedItemsDetails = getSelectedItemsDetails();

  const totalFixed = selectedItemsDetails
    .filter(item => item.type === 'fixed' || item.type === 'per_unit')
    .reduce((sum, item) => sum + item.totalPrice, 0);

  const totalMonthly = selectedItemsDetails
    .filter(item => item.type === 'monthly')
    .reduce((sum, item) => sum + item.totalPrice, 0);

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!clientName.trim()) errors.name = 'Name is required';
    if (!clientEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      errors.email = 'Please provide a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Inquiry handler
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (selectedItemsDetails.length === 0) {
      setFormErrors({ general: 'Please select at least one sub-option to build your estimate.' });
      return;
    }

    // Prepare complete inquiry object
    const inquiryId = `QL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      id: inquiryId,
      clientName,
      clientEmail,
      clientPhone,
      serviceId: activeService.id,
      serviceName: activeService.name,
      notes,
      selectedOptions: selectedItemsDetails.map(item => ({
        optionId: item.optionId,
        optionName: item.name,
        categoryName: item.categoryName,
        price: item.price,
        type: item.type as 'fixed' | 'monthly' | 'per_unit'
      })),
      totalEstimate: totalFixed + totalMonthly,
      createdAt: new Date().toISOString()
    };

    // Callback saves inquiry to localStorage in App.tsx
    onInquirySubmitted(newInquiry);

    // Set success states
    setSubmittedInquiry(newInquiry);
    setIsSuccess(true);
  };

  // WhatsApp Redirect Generator
  const handleWhatsAppRedirect = () => {
    const businessNumber = "923221804322"; // Standardized WhatsApp URL string format

    // Build beautiful multi-line breakdown
    let message = `Hello Kalakar Creative Studio!\n\n`;
    message += `I configured a custom studio quote for: *${activeService.name}*.\n\n`;
    message += `*Selected Options breakdown:*\n`;
    
    selectedItemsDetails.forEach((item, index) => {
      const typeLabel = item.type === 'monthly' ? '/mo' : item.type === 'per_unit' ? ` (${item.quantity} ${item.unitLabel}s)` : ' (one-time)';
      message += `${index + 1}. _${item.name}_: $${item.totalPrice}${typeLabel}\n`;
    });

    message += `\n*Estimate Total:*`;
    if (totalFixed > 0) message += `\n- One-time Cost: *$${totalFixed}*`;
    if (totalMonthly > 0) message += `\n- Monthly Recurring: *$${totalMonthly}/mo*`;
    
    if (clientName) message += `\n\n*Client Name:* ${clientName}`;
    if (clientEmail) message += `\n*Client Email:* ${clientEmail}`;
    if (notes) message += `\n*Specific Notes:* _${notes}_`;

    message += `\n\nLet's connect to discuss our workspace project!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
    
    // Open in separate browser window safely
    window.open(whatsappUrl, '_blank');
  };

  // Reset calculator view
  const handleReset = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setFormErrors({});
    setIsSuccess(false);
    setSubmittedInquiry(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white min-h-screen pb-24 max-w-7xl mx-auto px-6 lg:px-12 pt-12 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.1] blur-[120px] pointer-events-none" />

      {/* Page Title & Service Tab Toggles */}
      <section className="mb-12 border-b border-neutral-900 pb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-3">Live Cost Calculator</span>
        <h1 className="text-3xl sm:text-5xl font-sans font-medium tracking-tight mb-8">Build Your Bespoke Quote</h1>
        
        {/* Flat Minimal Grid of Services Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {services.map((service) => {
            const isActive = activeService.id === service.id;
            return (
              <button
                key={service.id}
                id={`tab-${service.id}`}
                onClick={() => {
                  onServiceChange(service.id);
                  setFormErrors({});
                }}
                className="relative py-3.5 px-4 rounded-sm text-xs font-mono uppercase tracking-wider text-center border transition-all duration-300 cursor-pointer focus:outline-none overflow-hidden"
                style={{
                  backgroundColor: isActive ? 'white' : 'transparent',
                  color: isActive ? '#070708' : '#a3a3a3',
                  borderColor: isActive ? 'white' : '#171717'
                }}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {isSuccess && submittedInquiry ? (
          /* SUCCESS SUMMARY INTERFACE */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto border border-neutral-800/80 bg-neutral-950/45 p-8 sm:p-12 rounded-sm text-center shadow-2xl relative"
            id="success-screen"
          >
            <div className="w-16 h-16 rounded-full bg-white text-[#070708] flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-2">Quote Secured Successfully</span>
            <h2 className="text-3xl font-sans tracking-tight mb-2 text-white">Thank you, {submittedInquiry.clientName}</h2>
            <p className="text-neutral-500 font-mono text-xs mb-8">Reference ID: {submittedInquiry.id}</p>

            {/* Selections breakdown */}
            <div className="bg-[#070708]/85 border border-neutral-900 rounded-sm p-6 sm:p-8 text-left mb-8 max-w-xl mx-auto shadow-inner">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-900 pb-3 mb-4">
                {submittedInquiry.serviceName} Breakdown
              </h3>
              <div className="flex flex-col gap-3.5 mb-6">
                {submittedInquiry.selectedOptions.map((opt, i) => (
                  <div key={i} className="flex justify-between text-xs font-light">
                    <span className="text-neutral-400">{opt.optionName}</span>
                    <span className="font-mono text-neutral-300">
                      ${opt.price}{opt.type === 'monthly' ? '/mo' : ''}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-neutral-900 pt-4 flex flex-col gap-2.5 font-mono text-xs">
                {totalFixed > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500 uppercase">One-time Budget:</span>
                    <span className="text-white font-bold">${totalFixed}</span>
                  </div>
                )}
                {totalMonthly > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500 uppercase">Monthly Cycle:</span>
                    <span className="text-white font-bold">${totalMonthly}/mo</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-10 max-w-md mx-auto">
              We have securely saved this inquiry locally. Direct this quote to our team's active business WhatsApp to secure real-time discussion.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-lg mx-auto">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                onClick={handleWhatsAppRedirect}
                id="success-whatsapp-cta"
                className="px-6 py-4 bg-white text-[#070708] font-mono text-[11px] tracking-widest uppercase font-bold rounded-sm cursor-pointer flex items-center justify-center gap-2 shadow-md hover:bg-neutral-200 transition-colors"
              >
                Direct WhatsApp Discussion
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                onClick={handleReset}
                id="success-reset-cta"
                className="px-6 py-4 bg-transparent border border-neutral-800 text-neutral-400 font-mono text-[11px] tracking-widest uppercase rounded-sm hover:bg-neutral-950 hover:text-white transition-colors cursor-pointer"
              >
                Build Another Estimate
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* MAIN INTERACTIVE CALCULATOR INTERFACE */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" 
            id="calculator-workspace"
          >
            
            {/* Left Side: Category Sub-options selections */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">Active Category</span>
                  <h2 className="text-xl font-sans font-medium text-white">{activeService.name} options</h2>
                </div>
                {selectedItemsDetails.length > 0 && (
                  <button
                    onClick={handleClearActiveServiceSelections}
                    id="clear-selections"
                    className="text-xs font-mono text-neutral-500 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Selection
                  </button>
                )}
              </div>

              {/* Render Category List */}
              <div className="flex flex-col gap-8">
                {activeService.categories.map((category) => (
                  <div key={category.id} className="border border-neutral-900/60 bg-[#070708]/30 p-6 sm:p-8 rounded-sm">
                    <h3 className="text-base font-sans font-medium mb-1 text-neutral-100">{category.name}</h3>
                    <p className="text-neutral-500 text-xs font-light mb-6 leading-relaxed">{category.description}</p>
                    
                    <div className="flex flex-col gap-4">
                      {category.options.map((option) => {
                        const isChecked = selectedOptions.some(
                          o => o.serviceId === activeService.id && o.categoryId === category.id && o.optionId === option.id
                        );
                        const optionKey = `${activeService.id}-${option.id}`;
                        const qty = quantities[optionKey] || 1;

                        return (
                          <motion.div 
                            key={option.id}
                            onClick={() => handleToggleOption(category.id, option)}
                            id={`opt-wrapper-${option.id}`}
                            whileHover={{ scale: 1.008, borderColor: isChecked ? '#ffffff' : 'rgba(255,255,255,0.12)' }}
                            className={`group border rounded-sm p-4 sm:p-5 flex items-start gap-4 transition-all duration-300 cursor-pointer ${
                              isChecked
                                ? 'bg-[#0a0a0d] border-white text-white'
                                : 'bg-neutral-950/15 border-neutral-900 text-neutral-400 hover:bg-[#08080a] hover:text-neutral-200'
                            }`}
                          >
                            {/* Checkbox Icon Indicator */}
                            <div className={`w-5 h-5 rounded-sm border shrink-0 flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-white border-white text-black'
                                : 'border-neutral-800 bg-[#08080a]'
                            }`}>
                              <AnimatePresence mode="popLayout">
                                {isChecked && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 20 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Info Text */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <span className="text-sm font-medium transition-colors font-sans">{option.name}</span>
                                <div className="font-mono text-xs text-right text-neutral-300">
                                  <span>${option.price}</span>
                                  <span className="text-[9px] text-neutral-500 uppercase block leading-none">
                                    {option.type === 'fixed' ? 'one-time' : option.type === 'monthly' ? '/mo' : `/${option.unitLabel}`}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-neutral-500 font-light leading-relaxed mt-2 pr-4">{option.description}</p>
                              
                              {/* Counter Controls if unit-based option is checked */}
                              <AnimatePresence>
                                {option.type === 'per_unit' && isChecked && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-900 rounded-sm w-fit p-1 overflow-hidden"
                                    onClick={(e) => e.stopPropagation()} // Stop checkbox trigger propagation
                                  >
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(option.id, false)}
                                      className="w-7 h-7 flex items-center justify-center bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors rounded-sm cursor-pointer"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-mono text-xs px-2 min-w-[20px] text-center">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(option.id, true)}
                                      className="w-7 h-7 flex items-center justify-center bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors rounded-sm cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    <span className="text-[10px] uppercase font-mono text-neutral-500 pr-2 pl-1">
                                      {option.unitLabel}s
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Quote Summary Breakdown & Contact Lead Form */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24">
              
              {/* Live Breakdowns Card */}
              <div className="border border-neutral-900/60 bg-neutral-950/35 p-6 sm:p-8 rounded-sm">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-900 pb-4 mb-5 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-neutral-500" />
                  Live Quote Summary
                </h3>

                {selectedItemsDetails.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-6 h-6 mx-auto text-neutral-600 mb-3" />
                    <p className="text-neutral-500 text-xs font-light">Select at least one sub-option from the checklist on the left to activate your quote.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    
                    {/* Option List Grid */}
                    <div className="flex flex-col gap-3.5 max-h-52 overflow-y-auto pr-2 custom-scrollbar border-b border-neutral-900 pb-5">
                      <AnimatePresence initial={false}>
                        {selectedItemsDetails.map((item) => (
                          <motion.div 
                            key={item.optionId} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex justify-between items-start gap-4 text-xs font-light"
                          >
                            <div className="max-w-xs">
                              <span className="text-neutral-300 block font-medium">{item.name}</span>
                              <span className="text-[10px] text-neutral-500 block">{item.categoryName}</span>
                            </div>
                            <div className="text-right font-mono">
                              <span className="text-white block font-semibold">
                                ${item.totalPrice}
                              </span>
                              <span className="text-[9px] text-neutral-500 block uppercase">
                                {item.quantity ? `${item.quantity} ${item.unitLabel}s` : item.type === 'monthly' ? '/mo' : 'one-time'}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Pricing Sums */}
                    <div className="flex flex-col gap-3.5 border-b border-neutral-900 pb-5 pt-1">
                      {totalFixed > 0 && (
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-400 uppercase tracking-widest">One-time / Fixed Subtotal:</span>
                          <span className="text-white text-base font-bold">${totalFixed}</span>
                        </div>
                      )}
                      {totalMonthly > 0 && (
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-400 uppercase tracking-widest">Monthly Cycle Subtotal:</span>
                          <span className="text-white text-base font-bold">${totalMonthly}/mo</span>
                        </div>
                      )}
                    </div>

                    {/* Combined Display */}
                    <div className="bg-[#070708]/90 border border-neutral-900 p-4 rounded-sm flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-neutral-500 tracking-wider block">Estimated Investment</span>
                        <span className="text-white font-sans font-semibold text-lg">
                          {totalFixed > 0 && `$${totalFixed}`}
                          {totalFixed > 0 && totalMonthly > 0 && ' + '}
                          {totalMonthly > 0 && `$${totalMonthly}/mo`}
                        </span>
                      </div>
                      
                      {/* Direct Quick WhatsApp shortcut */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={handleWhatsAppRedirect}
                        className="px-4 py-2.5 rounded-sm bg-[#121214] border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-500 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                        id="quick-whatsapp-cta"
                      >
                        WhatsApp Us
                      </motion.button>
                    </div>

                  </div>
                )}
              </div>

              {/* Client Inquiry Lead submission */}
              <div className="border border-neutral-900/60 bg-neutral-950/35 p-6 sm:p-8 rounded-sm">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-900 pb-4 mb-6">
                  Initiate Studio Inquiry
                </h3>

                <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-5">
                  {formErrors.general && (
                    <div className="p-3 bg-red-950/25 border border-red-900/60 text-red-400 text-xs rounded-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formErrors.general}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="client-name" className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      Your Name / Brand *
                    </label>
                    <input
                      type="text"
                      id="client-name"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="Enter your name"
                      className={`w-full bg-[#08080a] border text-sm text-neutral-200 px-4 py-3 rounded-sm focus:outline-none focus:border-white transition-all ${
                        formErrors.name ? 'border-red-900' : 'border-neutral-800'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-red-400 text-[10px] font-mono mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="client-email" className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="client-email"
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                        if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="name@company.com"
                      className={`w-full bg-[#08080a] border text-sm text-neutral-200 px-4 py-3 rounded-sm focus:outline-none focus:border-white transition-all ${
                        formErrors.email ? 'border-red-900' : 'border-neutral-800'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-red-400 text-[10px] font-mono mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="client-phone" className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      Phone / Contact (Optional)
                    </label>
                    <input
                      type="text"
                      id="client-phone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. +92 322 1804322"
                      className="w-full bg-[#08080a] border border-neutral-800 text-sm text-neutral-200 px-4 py-3 rounded-sm focus:outline-none focus:border-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-notes" className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      Project Specifications / Special Requirements
                    </label>
                    <textarea
                      id="project-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe specific timelines, integrations, pages needed, visual guidelines or brand references..."
                      rows={4}
                      className="w-full bg-[#08080a] border border-neutral-800 text-sm text-neutral-200 px-4 py-3 rounded-sm focus:outline-none focus:border-white transition-all resize-none font-light"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    id="submit-inquiry-btn"
                    className="w-full py-4 mt-2 bg-white text-black font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2 shadow-lg font-bold"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Inquiry & Save Quote
                  </motion.button>
                </form>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
