import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Shield, Mail, Linkedin, Instagram, Facebook, Video, Palette, 
  TrendingUp, CheckCircle2, ChevronRight, Award, ArrowUpRight, Globe,
  Terminal, ArrowRight, MessageSquare, Menu, X, ExternalLink, RefreshCw
} from 'lucide-react';
import { PORTFOLIO_ITEMS, BIO_DATA, SERVICES } from './data';
import { ContactMessage } from './types';
import PortfolioCard from './components/PortfolioCard';
import ContactForm from './components/ContactForm';
import AdminInbox from './components/AdminInbox';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'video' | 'design' | 'marketing'>('all');
  const [aboutTab, setAboutTab] = useState<'story' | 'skills' | 'workflow'>('story');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [justNotification, setJustNotification] = useState<string | null>(null);

  // Load and seed messages from localStorage
  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem('creative_portfolio_leads');
    } catch (err) {
      console.warn("localStorage is not accessible:", err);
    }
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse leads:", err);
      }
    } else {
      // Seed default highly realistic leads
      const seedLeads: ContactMessage[] = [
        {
          id: 'lead-1',
          name: 'Sarah Jenkins',
          email: 'sarah.j@apexledger.io',
          subject: 'Short-Form Video Retainer Inquiry',
          category: 'video',
          message: 'Hi Ali! I loved your Creator Shorts Growth Engine sample. We are looking for a dedicated video editor to handle 15-20 high-retention reels/shorts per month for our fintech personal brand. Could you share your monthly retainer rates and your typical turnaround time for vertical edits?',
          timestamp: Date.now() - 3600000 * 4, // 4 hours ago
          read: false
        },
        {
          id: 'lead-2',
          name: 'Marcus Chen',
          email: 'marcus@synthia.ai',
          subject: 'SaaS Figma UI & Thumbnail Overhaul',
          category: 'design',
          message: 'Hey Ali, we are preparing to launch Synthia AI on Product Hunt next month. We need a modern, high-fidelity dark-themed dashboard mockup in Figma for our marketing landing page, along with 4 clean Youtube thumbnails for our launch tutorials. Let me know your availability next week for a quick sync.',
          timestamp: Date.now() - 3600000 * 24 * 1.5, // 1.5 days ago
          read: true
        },
        {
          id: 'lead-3',
          name: 'Daniel Alvarez',
          email: 'd.alvarez@bloomwear.co',
          subject: 'E-commerce Facebook Ads Scaling',
          category: 'marketing',
          message: 'Hello, I manage Bloomwear, a sustainable apparel startup. We have been running Facebook Ads but are struggling to scale past 2x ROAS. We want someone who can redesign our ad creatives, rewrite the copies, and optimize our retargeting funnels. Your performance marketing case studies look excellent. Do you offer audits first?',
          timestamp: Date.now() - 3600000 * 24 * 4, // 4 days ago
          read: true
        }
      ];
      try {
        localStorage.setItem('creative_portfolio_leads', JSON.stringify(seedLeads));
      } catch (err) {
        console.warn("localStorage is not accessible:", err);
      }
      setMessages(seedLeads);
    }
  }, []);

  // Save messages to localstorage helper
  const saveLeads = (newLeads: ContactMessage[]) => {
    setMessages(newLeads);
    try {
      localStorage.setItem('creative_portfolio_leads', JSON.stringify(newLeads));
    } catch (err) {
      console.warn("localStorage is not accessible:", err);
    }
  };

  // Add a new message submission
  const handleNewMessage = (newMsg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => {
    const msg: ContactMessage = {
      ...newMsg,
      id: `lead-${Date.now()}`,
      timestamp: Date.now(),
      read: false
    };
    const updated = [msg, ...messages];
    saveLeads(updated);

    // Toast notification
    setJustNotification(`New lead received from ${msg.name}! Click Lead Center at the bottom to view.`);
    setTimeout(() => {
      setJustNotification(null);
    }, 6000);
  };

  // Mark message as read
  const handleMarkRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    saveLeads(updated);
  };

  // Delete message
  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    saveLeads(updated);
  };

  // Clear all messages
  const handleClearAll = () => {
    saveLeads([]);
  };

  // Filter portfolio items
  const filteredPortfolio = PORTFOLIO_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col relative font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Dynamic Toast Notification */}
      <AnimatePresence>
        {justNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-zinc-900 border border-emerald-500/30 shadow-[0_10px_30px_rgba(16,185,129,0.15)] rounded-xl p-4 flex gap-3 cursor-pointer"
            onClick={() => {
              setIsAdminOpen(true);
              setJustNotification(null);
            }}
          >
            <div className="w-8 h-8 shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-emerald-400">FORM SUBMISSION DETECTED</p>
              <p className="text-xs text-zinc-300 mt-1">{justNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Pattern Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-950 via-zinc-950 to-blue-950 border border-zinc-800/80 flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/40 group-hover:border-emerald-500/30 relative">
              {/* Ultra smooth subtle glow highlight inside */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/5 to-blue-500/5 opacity-80" />
              <span className="relative z-10 text-zinc-100 font-sans font-medium text-xs tracking-wider group-hover:text-emerald-400 transition-colors duration-300">
                A.H
              </span>
            </div>
            <span className="font-sans font-semibold text-base tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">
              A.H<span className="text-emerald-500">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
            <a href="#services" className="text-zinc-400 hover:text-white transition-colors">Services</a>
            <a href="#work" className="text-zinc-400 hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-zinc-400 hover:text-white transition-colors">Bio</a>
            <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
            
            {/* Quick Admin Access Link */}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Lead Inbox ({messages.filter(m => !m.read).length})
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              title="Admin Inbox"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-900 bg-zinc-950 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-4 text-sm font-mono uppercase tracking-widest">
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white py-1 block"
                >
                  Services
                </a>
                <a 
                  href="#work" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white py-1 block"
                >
                  Work Portfolio
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white py-1 block"
                >
                  Bio / Process
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white py-1 block"
                >
                  Contact Form
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        
        {/* 1. Hero Section */}
        <section id="hero" className="relative py-20 sm:py-32 overflow-hidden border-b border-zinc-900/40">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Profile Image, Status Tag & Socials at the top of the page */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-2 w-full">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md animate-pulse" />
                  <img
                    src={BIO_DATA.avatarUrl}
                    alt={BIO_DATA.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full border-2 border-emerald-500/30 object-cover relative z-10"
                  />
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#090a0f] border-2 border-[#090a0f] rounded-full flex items-center justify-center z-20">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                
                {/* Info & Socials Column */}
                <div className="flex flex-col items-center sm:items-start gap-3 pt-1">
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <h3 className="text-sm font-mono text-zinc-400">Creative Strategist</h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
                      Available for custom contracts
                    </div>
                  </div>

                  {/* Social Media Buttons */}
                  <div className="flex items-center gap-2.5 mt-1">
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/20 flex items-center justify-center transition-all cursor-pointer"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/20 flex items-center justify-center transition-all cursor-pointer"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>

                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/20 flex items-center justify-center transition-all cursor-pointer"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] max-w-xl">
                Aesthetics <span className="text-zinc-500 font-light font-sans">&</span> <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Conversion</span> combined.
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg font-light">
                Hi, I'm <strong className="text-white font-medium">{BIO_DATA.name}</strong>. I edit high-retention videos, design thumb-stopping graphics, and execute full-funnel marketing campaigns that generate millions of views and serious ROI for brands worldwide.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-2">
                <a 
                  href="#work"
                  className="bg-zinc-100 hover:bg-white text-zinc-950 font-display font-semibold text-xs py-3 px-6 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#contact"
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-display font-semibold text-xs py-3 px-6 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  Start a Project
                </a>
              </div>

              {/* Horizontal Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-zinc-900/80 pt-8 mt-6 w-full max-w-xl">
                {BIO_DATA.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase mt-1 tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Media Column - Creative Interactive Showcase */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-3xl rounded-full" />
              
              {/* Floating aesthetic card */}
              <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 relative shadow-2xl flex flex-col gap-4">
                {/* Visual Header */}
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>hussain_portfolio.config</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* Simulated Stack Loops */}
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="text-zinc-500">
                    // Defining core workflow pillars...
                  </div>
                  
                  {/* Row 1: Video */}
                  <div className="flex items-center justify-between bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-800/40">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-indigo-400" />
                      <span className="text-zinc-300 font-medium">Video Editing</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">12M+ Views</span>
                  </div>

                  {/* Row 2: Design */}
                  <div className="flex items-center justify-between bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-800/40">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-amber-400" />
                      <span className="text-zinc-300 font-medium">Graphic Design</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">9.8/10 Rating</span>
                  </div>

                  {/* Row 3: Marketing */}
                  <div className="flex items-center justify-between bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-800/40">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-zinc-300 font-medium">Performance Growth</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">5.4x Avg ROAS</span>
                  </div>
                </div>

                {/* Showcase CTA wrapper */}
                <div className="mt-2 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-emerald-400 font-semibold tracking-wide uppercase">Featured Showreel</span>
                    <span className="text-xs font-display font-medium text-white mt-0.5">Watch edited samples</span>
                  </div>
                  <a 
                    href="#work"
                    onClick={() => setActiveCategory('video')}
                    className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/20 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Services Section */}
        <section id="services" className="py-20 bg-zinc-950/30 border-b border-zinc-900/40">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">My Expertise</span>
                <h2 className="font-display font-bold text-3xl text-white mt-2 tracking-tight">
                  High-Impact Pillars Of Work
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                  I don't just execute; I strategize. Click any of the three service cards below to instantly filter the work gallery to matching case studies!
                </p>
              </div>
              <div className="flex gap-2">
                <a 
                  href="#contact" 
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  Request Customized Bundles <ChevronRight className="w-4 h-4 text-emerald-500" />
                </a>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICES.map((srv) => {
                const IconComponent = srv.id === 'video' ? Video : srv.id === 'design' ? Palette : TrendingUp;
                const isSelected = activeCategory === srv.id;

                return (
                  <div
                    key={srv.id}
                    onClick={() => {
                      setActiveCategory(srv.id as any);
                      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`group/service p-6 sm:p-7 bg-zinc-900/60 border rounded-2xl flex flex-col justify-between gap-8 cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'border-emerald-500/40 bg-zinc-900 shadow-[0_4px_30px_rgba(16,185,129,0.06)]' 
                        : 'border-zinc-800 hover:border-zinc-700/80 hover:bg-zinc-900/30'
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        srv.id === 'video' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        srv.id === 'design' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Header */}
                      <div>
                        <h3 className="font-display font-bold text-lg text-white group-hover/service:text-emerald-400 transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                          {srv.description}
                        </p>
                      </div>

                      {/* Capabilities checklist */}
                      <div className="flex flex-col gap-2 pt-2">
                        {srv.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-zinc-300 leading-normal">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-4 border-t border-zinc-800/60 flex justify-between items-center shrink-0">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">Starting Rates</span>
                        <span className="text-xs font-display font-semibold text-white mt-0.5">{srv.pricingRange}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 group-hover/service:text-emerald-400 flex items-center gap-1 transition-all">
                        Filter work
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover/service:translate-x-1 transition-transform" />
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 3. Work Gallery Section */}
        <section id="work" className="py-20 border-b border-zinc-900/40">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header with category selection */}
            <div className="flex flex-col gap-8 mb-10">
              <div className="max-w-lg">
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">My Work Case Studies</span>
                <h2 className="font-display font-bold text-3xl text-white mt-2 tracking-tight">
                  Creative Portfolio Gallery
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                  Click a project to expand into full case studies with real growth statistics, full-resolution graphics, or play high-retention video showreels.
                </p>
              </div>

              {/* Filtering tabs */}
              <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-2">
                {([
                  { key: 'all', label: 'All Case Studies' },
                  { key: 'video', label: 'Video Editing' },
                  { key: 'design', label: 'Graphic Design' },
                  { key: 'marketing', label: 'Digital Marketing' }
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`text-xs font-mono uppercase tracking-wider px-4 py-2 border rounded-full transition-all ${
                      activeCategory === tab.key
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold'
                        : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid with AnimatePresence */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPortfolio.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PortfolioCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* 5. About Me / Bio / Tabs */}
        <section id="about" className="py-20 border-b border-zinc-900/40">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">The Story</span>
              <h2 className="font-display font-bold text-3xl text-white mt-1.5 tracking-tight">
                Multi-Disciplinary Mindset
              </h2>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-8 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />

              {/* Badges in about section */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl px-4 py-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-mono text-zinc-300 font-medium">5+ Yrs Exp</span>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-zinc-300 font-medium">Full-Time Freelancer</span>
                </div>
              </div>

              {/* Tab selections */}
              <div className="flex gap-1 bg-zinc-950/60 p-1 rounded-xl border border-zinc-800 w-full max-w-md shrink-0">
                {([
                  { key: 'story', label: 'My Story' },
                  { key: 'skills', label: 'Skills Grid' },
                  { key: 'workflow', label: 'How I Work' }
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setAboutTab(tab.key)}
                    className={`flex-1 text-[10px] font-mono uppercase tracking-wider py-2.5 rounded-lg transition-all cursor-pointer ${
                      aboutTab === tab.key
                        ? 'bg-zinc-850 border border-zinc-800 text-white font-semibold shadow-inner'
                        : 'bg-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="w-full min-h-[220px]">
                <AnimatePresence mode="wait">
                  
                  {aboutTab === 'story' && (
                    <motion.div
                      key="story"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex flex-col gap-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light text-center"
                    >
                      <p className="max-w-2xl mx-auto">
                        {BIO_DATA.about}
                      </p>
                      <p className="max-w-2xl mx-auto">
                        Most creators know how to make a beautiful video, but they don't understand how traffic works. Most marketers know spreadsheets, but they don't know graphic style. By combining video editing, graphic design, and full-funnel marketing strategy, I give you a unified, high-performing package with no coordination friction.
                      </p>
                    </motion.div>
                  )}

                  {aboutTab === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left"
                    >
                      {BIO_DATA.skills.map((skillGroup, idx) => (
                        <div key={idx} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex flex-col gap-2.5">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wide font-semibold">
                            {skillGroup.category}
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {skillGroup.items.map((it, i) => (
                              <span key={i} className="text-[11px] text-zinc-300 flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-zinc-600" />
                                {it}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {aboutTab === 'workflow' && (
                    <motion.div
                      key="workflow"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex flex-col gap-4 text-xs sm:text-sm text-zinc-400 font-light w-full text-left max-w-xl mx-auto"
                    >
                      <div className="flex gap-4">
                        <div className="text-sm font-mono text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">1</div>
                        <div>
                          <h4 className="font-display font-bold text-white text-sm">Strategic Onboarding</h4>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">We audit your current CTR, watch times, and acquisition channels. We align on specific key performance indicators (KPIs).</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="text-sm font-mono text-indigo-400 font-semibold bg-indigo-500/5 border border-indigo-500/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">2</div>
                        <div>
                          <h4 className="font-display font-bold text-white text-sm">Rapid Assets Production</h4>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">I execute the direct edits, designs, or campaigns based on validated patterns. Drafts are uploaded for clear, collaborative frame-by-frame reviews.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="text-sm font-mono text-amber-400 font-semibold bg-amber-500/5 border border-amber-500/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">3</div>
                        <div>
                          <h4 className="font-display font-bold text-white text-sm">Deploy & Optimization</h4>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">We deploy the files or trigger ad creatives. We check engagement stats, refine hook angles, and adjust bid sizes to lock in continuous growth.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Workflow footer CTA */}
              <div className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 border-t border-zinc-850 pt-4">
                <span>Primary location:</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  Global / Remote Work
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Contact Section */}
        <section id="contact" className="py-20 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Info, Location, timezone, direct contact details */}
              <div className="lg:col-span-5 flex flex-col items-start gap-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Start Here</span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 tracking-tight leading-none">
                    Let's Build Something Memorable
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-3 leading-relaxed max-w-sm">
                    Have a video editing project, custom branding needs, or ad funnel specifications? Complete the brief, and I will get back to you with structured ideas.
                  </p>
                </div>

                {/* Simple direct links */}
                <div className="flex flex-col gap-4 text-xs font-mono">
                  {/* Email */}
                  <a 
                    href={`mailto:thealihussain013@gmail.com`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850/50 transition-all text-zinc-300 hover:text-white"
                  >
                    <Mail className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                    <span>thealihussain013@gmail.com</span>
                  </a>

                  {/* Availability Stat */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>Average Reply Time: <strong className="text-emerald-400">Under 4 Hours</strong></span>
                  </div>
                </div>


              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7 w-full">
                <ContactForm onSubmit={handleNewMessage} />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer Area */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright/Brand info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-semibold text-sm text-white tracking-tight">
              {BIO_DATA.name} <span className="text-emerald-500">•</span> Creative Director
            </span>
            <p className="text-[10px] font-mono text-zinc-600">
              © {new Date().getFullYear()} All rights reserved. Styled with minimalist premium guidelines.
            </p>
          </div>

          {/* Secure Admin Portal Link */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              Developer Panel / Leads ({messages.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Leads Center Modal */}
      <AdminInbox
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        messages={messages}
        onMarkRead={handleMarkRead}
        onDelete={handleDeleteMessage}
        onClearAll={handleClearAll}
      />

    </div>
  );
}
