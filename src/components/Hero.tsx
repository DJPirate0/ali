import React from 'react';
import { ArrowRight, Code, Megaphone, Video, Palette, Flame, Shield, Award, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';

interface HeroProps {
  services: Service[];
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
  onSelectService: (serviceId: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code,
  Megaphone,
  Video,
  Palette,
  Flame,
};

// Framer motion variants for stagger lists
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    } 
  }
};

export default function Hero({ services, onViewChange, onSelectService }: HeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative text-white min-h-screen overflow-hidden"
    >
      {/* Background Subtle Gradient Glows (Light shades on eyes) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neutral-800/[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.15] blur-[100px] pointer-events-none" />

      {/* Hero Headline Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-32 pb-20 border-b border-neutral-900/80">
        <div className="max-w-4xl">
          {/* Subtle Tagline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/40 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">Decentralized Creative Collective</span>
          </motion.div>

          {/* Majestic Typography Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.08] mb-8 font-medium text-neutral-100"
          >
            We sculpt <span className="text-neutral-500 font-serif italic font-normal">digital excellence</span> into clean, bespoke brand assets.
          </motion.h1>

          {/* Explanatory Lead Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-base sm:text-lg lg:text-xl font-sans font-light leading-relaxed max-w-2xl mb-12"
          >
            A boutique freelancer collective providing premium digital marketing, bespoke web development, high-pacing video editing, graphic layouts, and timeless brand identities. No bloat. Pure intent.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98, y: 0 }}
              id="hero-cta-estimator"
              onClick={() => onViewChange('estimator')}
              className="px-8 py-4 bg-white text-black font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer flex items-center justify-center gap-3 transition-colors duration-300 font-semibold"
            >
              Configure Custom Quote
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              whileTap={{ scale: 0.98, y: 0 }}
              id="hero-cta-showcase"
              onClick={() => onViewChange('showcase')}
              className="px-8 py-4 bg-transparent border border-neutral-800 text-neutral-300 font-mono text-[11px] tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              Explore Services
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Core Studio Philosophies (Bento-lite grid with staggers) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-b border-neutral-900/80">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.015)' }}
            className="p-8 border border-neutral-900/60 bg-neutral-950/25 rounded-sm transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-sm bg-neutral-950 border border-neutral-900 flex items-center justify-center mb-6 group-hover:border-neutral-700 transition-colors">
              <Shield className="w-5 h-5 text-neutral-400" />
            </div>
            <h3 className="text-lg font-sans font-medium tracking-tight mb-3">Absolute Transparency</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              No dynamic or shadow overheads. You select exactly what you need, see the immediate estimate breakdown, and pay only for explicit deliverables.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.015)' }}
            className="p-8 border border-neutral-900/60 bg-neutral-950/25 rounded-sm transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-sm bg-neutral-950 border border-neutral-900 flex items-center justify-center mb-6 group-hover:border-neutral-700 transition-colors">
              <Award className="w-5 h-5 text-neutral-400" />
            </div>
            <h3 className="text-lg font-sans font-medium tracking-tight mb-3">Handcrafted Precision</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              We reject templated shortcuts. Every layout, social schedule, custom graphic overlay, and identity vector is sculpted from absolute scratch.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.015)' }}
            className="p-8 border border-neutral-900/60 bg-neutral-950/25 rounded-sm transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-sm bg-neutral-950 border border-neutral-900 flex items-center justify-center mb-6 group-hover:border-neutral-700 transition-colors">
              <TrendingUp className="w-5 h-5 text-neutral-400" />
            </div>
            <h3 className="text-lg font-sans font-medium tracking-tight mb-3">Compounding Results</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              We bridge the gap between pure artistic visual aesthetics and tactical conversion optimization to assure high long-term audience return.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Hub Highlight */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-2">Bespoke Suite</span>
            <h2 className="text-3xl sm:text-4xl font-sans tracking-tight font-medium">What we craft.</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="hero-view-all-services"
            onClick={() => onViewChange('showcase')}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            VIEW COMPREHENSIVE SERVICE SPECS
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Dynamic Service Grid (stagger cards entering, lifting smoothly) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Code;
            return (
              <motion.div 
                key={service.id} 
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  borderColor: 'rgba(255,255,255,0.2)', 
                  backgroundColor: 'rgba(10,10,12,0.6)',
                  boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)'
                }}
                className="group relative flex flex-col justify-between p-8 border border-neutral-900/60 bg-neutral-950/15 rounded-sm transition-all duration-300 h-[380px]"
                id={`hero-service-card-${service.id}`}
              >
                {/* Background Image Accent on Hover */}
                {service.imageRef && (
                  <div 
                    className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.045] transition-opacity duration-500 rounded-sm overflow-hidden pointer-events-none"
                    style={{ backgroundImage: `url(${service.imageRef})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                )}

                <div>
                  <div className="w-12 h-12 rounded-sm bg-[#0a0a0c] border border-neutral-900 flex items-center justify-center mb-8 text-neutral-400 group-hover:text-white group-hover:border-neutral-700 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-sans font-medium tracking-tight mb-4 text-white group-hover:text-neutral-200 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="pt-8 flex items-center justify-between border-t border-neutral-900/50 mt-4">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 group-hover:text-neutral-400 uppercase transition-colors">
                    {service.categories.length} Categories
                  </span>
                  <button
                    onClick={() => {
                      onSelectService(service.id);
                      onViewChange('estimator');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-neutral-400 group-hover:text-white transition-colors cursor-pointer"
                    id={`btn-quote-${service.id}`}
                  >
                    Build Quote
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="bg-neutral-950/80 border-t border-neutral-900 py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050506]/30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Sparkles className="w-8 h-8 mx-auto text-neutral-500 mb-8 animate-pulse" />
          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-medium mb-6">
            Ready to compute your brand's trajectory?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto font-light leading-relaxed mb-10">
            Use our interactive service configurer to detail your absolute specifications and retrieve an exact, non-binding studio estimate immediately.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px -5px rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98, y: 0 }}
            id="banner-cta"
            onClick={() => onViewChange('estimator')}
            className="px-8 py-4 bg-white text-black font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer inline-flex items-center gap-3 font-semibold"
          >
            Launch Interactive Estimator
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
}
