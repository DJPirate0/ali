import React, { useState } from 'react';
import { Play, ZoomIn, ArrowRight, X, Sparkles, TrendingUp, Cpu, Calendar, ShieldCheck, SquareTerminal } from 'lucide-react';
import { PortfolioItem } from '../types';
import VideoPlayer from './VideoPlayer';
import MetricGraph from './MetricGraph';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      {/* Grid Card */}
      <motion.div
        layoutId={`card-container-${item.id}`}
        onClick={() => setIsDetailOpen(true)}
        className="group relative bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
      >
        <div>
          {/* Card Image Area with Overlays */}
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

            {/* Hover Action Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {item.category === 'video' ? (
                  <Play className="w-5 h-5 fill-emerald-400 translate-x-0.5" />
                ) : (
                  <ZoomIn className="w-5 h-5" />
                )}
              </div>
            </div>

            {/* Category tag badge */}
            <span className={`absolute top-3 left-3 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold border ${
              item.category === 'video' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
              item.category === 'design' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
              'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              {item.category === 'video' ? 'Video Editing' :
               item.category === 'design' ? 'Graphic Design' :
               'Digital Marketing'}
            </span>
          </div>

          {/* Card Details */}
          <div className="p-5 flex flex-col gap-3">
            <div>
              <h3 className="font-display font-semibold text-base text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Metrics Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-zinc-800/40 flex justify-between items-center shrink-0">
          <div className="flex gap-4">
            {item.metrics?.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                <span className="text-xs font-display font-semibold text-emerald-400">{metric.value}</span>
              </div>
            ))}
          </div>
          <span className="text-xs font-mono text-zinc-500 hover:text-emerald-400 flex items-center gap-1 transition-colors group/arrow">
            Details
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/arrow:translate-x-1 transition-transform" />
          </span>
        </div>
      </motion.div>

      {/* Lightbox Overlay Modal */}
      <AnimatePresence>
        {isDetailOpen && (
          <div 
            id={`lightbox-${item.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-zinc-950/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsDetailOpen(false)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Media Container (Left/Top) */}
              <div className="w-full md:w-3/5 bg-zinc-950 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-zinc-800">
                {item.category === 'video' && item.videoUrl ? (
                  <div className="p-4 w-full">
                    <VideoPlayer videoUrl={item.videoUrl} thumbnailUrl={item.thumbnailUrl} title={item.title} />
                  </div>
                ) : item.category === 'marketing' && item.stats ? (
                  <div className="p-6 w-full flex flex-col gap-4">
                    <div className="bg-zinc-900 border border-zinc-800/80 p-1 rounded-xl">
                      <MetricGraph data={item.stats} label={item.title} prefix={item.id === 'saas-campaign' ? '$' : ''} />
                    </div>
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-32 object-cover rounded-xl border border-zinc-800/50 filter brightness-75 opacity-40"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full aspect-video md:aspect-auto md:min-h-[340px] overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-30" />
                  </div>
                )}
              </div>

              {/* Specs and details column (Right/Bottom) */}
              <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none">
                <div className="flex flex-col gap-5">
                  {/* Category Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                        {item.category === 'video' ? 'Video Editing' :
                         item.category === 'design' ? 'Graphic Design' :
                         'Performance Marketing'}
                      </span>
                      <h2 className="font-display font-bold text-xl text-white mt-2 leading-tight">
                        {item.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Close"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Narrative description */}
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.longDescription || item.description}
                  </p>

                  {/* Client ROI metrics highlights */}
                  <div className="grid grid-cols-2 gap-3 bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-800/40">
                    {item.metrics?.map((metric, idx) => (
                      <div key={idx} className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wide flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          {metric.label}
                        </span>
                        <span className="text-base font-display font-bold text-white">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Software/Tools stack */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                      Tools & Stack Used
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((tool, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50 flex items-center gap-1"
                        >
                          <div className="w-1 h-1 rounded-full bg-emerald-500" />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Verified Work Sample
                  </span>
                  <a
                    href="#contact"
                    onClick={() => {
                      setIsDetailOpen(false);
                    }}
                    className="text-xs font-display text-white hover:text-emerald-400 font-medium flex items-center gap-1.5 group/book transition-colors"
                  >
                    Request Similar Work
                    <ArrowRight className="w-3.5 h-3.5 group-hover/book:translate-x-1 transition-transform text-emerald-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
