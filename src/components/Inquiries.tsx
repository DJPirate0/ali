import React from 'react';
import { Trash2, MessageSquare, Calendar, ChevronRight, Sparkles, FolderOpen, Mail, Phone, Clock, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Inquiry } from '../types';

interface InquiriesProps {
  inquiries: Inquiry[];
  onDeleteInquiry: (id: string) => void;
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

export default function Inquiries({ inquiries, onDeleteInquiry, onViewChange }: InquiriesProps) {
  
  // Format dates elegantly
  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  // Re-open WhatsApp chat for a specific saved inquiry
  const handleWhatsAppForInquiry = (inquiry: Inquiry) => {
    const businessNumber = "923221804322";
    
    let message = `Hello Kalakar Creative Studio!\n\n`;
    message += `I want to discuss my saved quote: *${inquiry.id}* for *${inquiry.serviceName}*.\n\n`;
    message += `*Selected Specs Breakdowns:*\n`;
    
    inquiry.selectedOptions.forEach((item, index) => {
      const typeLabel = item.type === 'monthly' ? '/mo' : ' (one-time)';
      message += `${index + 1}. _${item.optionName}_: $${item.price}${typeLabel}\n`;
    });

    message += `\n*Consolidated Total:* $${inquiry.totalEstimate}`;
    message += `\n\n*Client Details:*\n- Name: ${inquiry.clientName}\n- Email: ${inquiry.clientEmail}`;
    if (inquiry.clientPhone) message += `\n- Phone: ${inquiry.clientPhone}`;
    if (inquiry.notes) message += `\n- Notes: _${inquiry.notes}_`;

    message += `\n\nLooking forward to aligning with you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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

      {/* Title */}
      <section className="mb-12 border-b border-neutral-900 pb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-3">Saved Quotations</span>
        <h1 className="text-3xl sm:text-5xl font-sans font-medium tracking-tight mb-4">Your Custom Quotes</h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
          Review your configured service specifications and total budget breakdowns. Your submissions are kept secure in your local browser sandbox.
        </p>
      </section>

      <AnimatePresence mode="wait">
        {inquiries.length === 0 ? (
          /* Empty State */
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center py-20 border border-neutral-900/60 bg-[#070708]/30 rounded-sm max-w-2xl mx-auto p-8 shadow-xl" 
            id="empty-inquiries"
          >
            <FolderOpen className="w-12 h-12 mx-auto text-neutral-700 mb-6" />
            <h2 className="text-lg font-sans font-medium mb-3">No Saved Configurations Found</h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed mb-8">
              You haven't initiated any inquiries or calculated estimates yet. Go ahead and customize a quote to suit your brand specs!
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange('estimator')}
              className="px-6 py-3.5 bg-white text-black font-mono text-[11px] tracking-widest uppercase rounded-sm hover:bg-neutral-200 transition-colors cursor-pointer inline-flex items-center gap-2 font-bold"
            >
              Launch Quote Calculator
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ) : (
          /* Saved List Card list */
          <motion.div 
            key="list"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-col gap-8 max-w-4xl mx-auto" 
            id="inquiries-list"
          >
            <AnimatePresence initial={false}>
              {inquiries.map((inquiry) => (
                <motion.div 
                  key={inquiry.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
                  }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, y: -20, marginBottom: 0, padding: 0, transition: { duration: 0.3 } }}
                  className="border border-neutral-900/60 bg-[#070708]/35 p-6 sm:p-8 rounded-sm hover:border-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                  id={`inquiry-card-${inquiry.id}`}
                >
                  {/* Header: ID & Service Type */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-5 mb-6">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono text-neutral-500 uppercase">{inquiry.id}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">{inquiry.serviceName}</span>
                      </div>
                      <h3 className="text-lg font-sans font-semibold mt-1 text-neutral-100">Project for {inquiry.clientName}</h3>
                    </div>

                    <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(inquiry.createdAt)}</span>
                    </div>
                  </div>

                  {/* Grid content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    
                    {/* Left Side Grid: Specs & Breakdown list */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        Bespoke Selection breakdown
                      </h4>
                      <div className="flex flex-col gap-2 bg-[#070708]/70 border border-neutral-900 rounded-sm p-4">
                        {inquiry.selectedOptions.map((opt, i) => (
                          <div key={i} className="flex justify-between text-xs font-light py-1.5 border-b border-neutral-900 last:border-0 last:pb-0">
                            <span className="text-neutral-400">{opt.optionName}</span>
                            <span className="font-mono text-neutral-300">
                              ${opt.price}{opt.type === 'monthly' ? '/mo' : ''}
                            </span>
                          </div>
                        ))}
                        
                        <div className="pt-3 border-t border-neutral-900 flex justify-between font-mono text-xs font-bold text-white mt-1">
                          <span>ESTIMATED TOTAL:</span>
                          <span>${inquiry.totalEstimate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Grid: Client Info Details & Notes */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2.5">Client Profile</h4>
                        <div className="flex flex-col gap-2 text-xs text-neutral-300">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-neutral-500" />
                            <span>{inquiry.clientEmail}</span>
                          </div>
                          {inquiry.clientPhone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-neutral-500" />
                              <span>{inquiry.clientPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {inquiry.notes && (
                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">Project Brief</h4>
                          <p className="text-neutral-400 text-xs font-light leading-relaxed bg-neutral-950/40 p-3 rounded-sm border border-neutral-900 max-h-24 overflow-y-auto custom-scrollbar">
                            {inquiry.notes}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Action Buttons for Card */}
                  <div className="border-t border-neutral-900 pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Status: Estimate Completed
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleWhatsAppForInquiry(inquiry)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono tracking-widest uppercase hover:text-white hover:border-neutral-500 transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-neutral-300 rounded-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        WhatsApp Team
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDeleteInquiry(inquiry.id)}
                        className="px-3 py-2 bg-transparent text-neutral-500 hover:text-red-400 border border-transparent hover:border-red-950/20 transition-colors rounded-sm cursor-pointer"
                        aria-label="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
