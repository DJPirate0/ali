import React from 'react';
import { ArrowRight, Code, Megaphone, Video, Palette, Flame, Check, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';

interface ShowcaseProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code,
  Megaphone,
  Video,
  Palette,
  Flame,
};

// Additional high-fidelity details to enrich the showcase
const EXTRA_SPECS: Record<string, {
  timeline: string;
  deliverables: string[];
  process: string[];
}> = {
  'web-dev': {
    timeline: '2 - 4 Weeks',
    deliverables: [
      'Production-ready code repository',
      'Figma source visual layouts',
      'Advanced PageSpeed optimization scores (90+)',
      '1 Year SSL & initial hosting setup',
      'Handover technical walk-through documentation'
    ],
    process: ['Visual Brief & Wireframing', 'Bespoke Frontend Sculpting', 'Custom Functional Coding', 'Staging, Testing & Launch']
  },
  'digital-marketing': {
    timeline: 'Ongoing (Monthly cycles)',
    deliverables: [
      'Interactive monthly performance logs',
      'Creative copywriting & ad-graphic library',
      'Custom audience segmentation profiles',
      'A/B test logs & budget blueprints',
      'Weekly strategy adjustment syncs'
    ],
    process: ['Audience & Keyword Mapping', 'Campaign Architecture Setup', 'Creative Curation & Launch', 'Continuous ROI Analytics']
  },
  'video-editing': {
    timeline: '3 - 7 Business Days',
    deliverables: [
      'High-resolution Master files (ProRes / H.264)',
      'Dynamic caption files (.SRT format)',
      'Optimized versions for diverse aspects (9:16, 16:9)',
      'Bespoke visual asset overrides',
      'Soundtrack licensing agreements'
    ],
    process: ['Footage Triage & Assembly Cut', 'Pacing, Captions & Graphics Overlays', 'Color Grading & Sound Mixing', 'Polished Delivery']
  },
  'graphic-designing': {
    timeline: '5 - 10 Business Days',
    deliverables: [
      'Vector layout source files (AI, EPS, Figma)',
      'Web & print formatted high-resolution files',
      'Custom typographic systems',
      'High-end structured brand book guidelines',
      'Commercial usage license rights'
    ],
    process: ['Research & Style Boards', 'Layout Sketching & Drafting', 'Typographic Harmonization', 'Format File Assembly']
  },
  'logo-making': {
    timeline: '1 - 2 Weeks',
    deliverables: [
      'Bespoke primary and secondary brandmarks',
      'Vector geometry files (SVG, PDF, EPS)',
      'Aesthetic identity palette pairings',
      'Typography hierarchy rules',
      'Digital social-profile formatted files'
    ],
    process: ['Discovery & Ideation Sketching', 'Geometric Drafting & Refinements', 'Typographic Pairing', 'Deliverable Assembly']
  }
};

export default function Showcase({ services, onSelectService, onViewChange }: ShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.id === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white min-h-screen pb-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.08] blur-[120px] pointer-events-none" />

      {/* Page Title Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12 border-b border-neutral-900/80">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-3">Portfolio & Offerings</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-tight mb-6">Our Creative Services</h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            We combine structural design and pure technical execution. Explore our granular services, starting prices, delivery schedules, and deliverables.
          </p>
        </motion.div>
      </section>

      {/* Categories Switch Filter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-wrap items-center gap-3 border-b border-neutral-900/60">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory('all')}
          className={`relative px-5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-widest border transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-white text-[#070708] border-white font-semibold'
              : 'bg-transparent text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-700'
          }`}
          id="filter-all"
        >
          All Services
        </motion.button>
        {services.map((service) => (
          <motion.button
            key={service.id}
            id={`filter-${service.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(service.id)}
            className={`relative px-5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-widest border transition-all cursor-pointer ${
              selectedCategory === service.id
                ? 'bg-white text-[#070708] border-white font-semibold'
                : 'bg-transparent text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-700'
            }`}
          >
            {service.name}
          </motion.button>
        ))}
      </section>

      {/* Main Service Detailed List */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col gap-28">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Code;
            const specs = EXTRA_SPECS[service.id] || { timeline: 'Flexible', deliverables: [], process: [] };

            return (
              <motion.div 
                layout
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start scroll-mt-24 border-b border-neutral-900/30 pb-16 last:border-0 last:pb-0"
                id={`showcase-service-${service.id}`}
              >
                
                {/* Left Column: Core Info & Visual Represent */}
                <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-white">{service.name}</h2>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500 font-mono uppercase">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Timeline: {specs.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main description */}
                  <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                    {service.detailedDescription}
                  </p>

                  {/* Custom Visual Imagery */}
                  {service.imageRef && (
                    <motion.div 
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-[16/10] w-full rounded-sm overflow-hidden border border-neutral-900/80 relative group shadow-2xl"
                    >
                      <img 
                        src={service.imageRef} 
                        alt={service.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale brightness-[0.85] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/80 to-transparent pointer-events-none" />
                    </motion.div>
                  )}

                  {/* Call To Action Direct Link */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1, borderColor: '#ffffff', color: '#ffffff' }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    onClick={() => {
                      onSelectService(service.id);
                      onViewChange('estimator');
                    }}
                    id={`showcase-cta-${service.id}`}
                    className="px-6 py-4 bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px] tracking-widest uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer font-semibold"
                  >
                    Configure Custom Quote
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* Right Column: Categories, Sub-options, Deliverables & Process */}
                <div className="lg:col-span-7 flex flex-col gap-10 border-t lg:border-t-0 lg:border-l border-neutral-900 lg:pl-12 pt-8 lg:pt-0">
                  
                  {/* Deliverables Block */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">Core Deliverables</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {specs.deliverables.map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-2 rounded-sm hover:bg-neutral-900/20 transition-colors"
                        >
                          <Check className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <span className="text-neutral-300 text-xs font-light leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Design/Build Process */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">Our Creative Iterations</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {specs.process.map((step, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-950/50 border border-neutral-900"
                        >
                          <span className="text-[10px] font-mono text-neutral-500">{i+1}.</span>
                          <span className="text-neutral-300 text-xs font-light">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sub-options Catalog Grid */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">Granular Services Catalog</h3>
                    <div className="flex flex-col gap-4">
                      {service.categories.map((cat) => (
                        <div key={cat.id} className="border border-neutral-900 bg-neutral-950/20 p-6 rounded-sm">
                          <h4 className="text-sm font-sans font-medium mb-3.5 text-white border-b border-neutral-900 pb-2">{cat.name}</h4>
                          <div className="flex flex-col gap-4">
                            {cat.options.map((opt) => (
                              <div key={opt.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-900 last:border-0 last:pb-0">
                                <div className="max-w-md">
                                  <span className="text-xs font-sans font-medium text-neutral-200 block">{opt.name}</span>
                                  <span className="text-[11px] text-neutral-500 block leading-relaxed mt-0.5">{opt.description}</span>
                                </div>
                                <div className="font-mono text-xs text-right shrink-0">
                                  <span className="text-neutral-300 font-semibold block">${opt.price}</span>
                                  <span className="text-[9px] text-neutral-600 uppercase tracking-wider block -mt-0.5">
                                    {opt.type === 'fixed' ? 'starting' : opt.type === 'monthly' ? '/mo' : `/${opt.unitLabel || 'unit'}`}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* Bottom Showcase CTA */}
      <section className="max-w-5xl mx-auto px-6 text-center pt-20 mt-16 border-t border-neutral-900">
        <Sparkles className="w-6 h-6 mx-auto text-neutral-500 mb-6" />
        <h3 className="text-2xl font-sans font-medium mb-4">Ready to choose and calculate?</h3>
        <p className="text-neutral-400 text-sm font-light max-w-md mx-auto leading-relaxed mb-8">
          Navigate to our interactive estimate wizard to tick your exact specs and get a consolidated budget output.
        </p>
        <motion.button
          whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px -5px rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.98, y: 0 }}
          onClick={() => onViewChange('estimator')}
          className="px-6 py-3.5 bg-white text-black font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer inline-flex items-center gap-2 font-semibold"
        >
          Open Quote Wizard
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </section>
    </motion.div>
  );
}
