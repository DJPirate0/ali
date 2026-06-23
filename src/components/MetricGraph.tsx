import React, { useState, useId } from 'react';

interface MetricGraphProps {
  data: { date: string; value: number }[];
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function MetricGraph({ data, label, prefix = '', suffix = '' }: MetricGraphProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const chartId = useId();

  if (!data || data.length === 0) return null;

  const padding = 30;
  const height = 140;
  const width = 360;

  const minVal = 0; // Use 0 as base for clean charts
  const maxVal = Math.max(...data.map(d => d.value)) * 1.15; // Give 15% head room
  const valueRange = maxVal - minVal || 1;

  // Map data to SVG coordinates
  const points = data.map((d, index) => {
    const x = padding + (index * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - ((d.value - minVal) * (height - padding * 2)) / valueRange;
    return { x, y, value: d.value, date: d.date };
  });

  // SVG Line path string
  const linePath = points.reduce((path, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
  }, '');

  // Closed path for the smooth gradient fill underneath
  const fillPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${prefix}${(val / 1000).toFixed(1)}k${suffix}`;
    }
    return `${prefix}${val}${suffix}`;
  };

  return (
    <div 
      id={`metric-graph-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group/graph"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono tracking-wider text-zinc-500 uppercase">{label} Growth</span>
        {activeIdx !== null ? (
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {points[activeIdx].date}: {formatValue(points[activeIdx].value)}
          </span>
        ) : (
          <span className="text-xs font-mono text-zinc-400">Hover graph to inspect</span>
        )}
      </div>

      <div className="relative w-full h-[140px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Linear Gradient for Background Area */}
            <linearGradient id={`grad-${chartId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
            </linearGradient>
            
            {/* Stroke Glow Filter */}
            <filter id={`glow-${chartId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Gridlines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" />
          <line x1={padding} y1={(height) / 2} x2={width - padding} y2={(height) / 2} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4" />

          {/* Gradient Fill under line */}
          {fillPath && (
            <path 
              d={fillPath} 
              fill={`url(#grad-${chartId})`}
              className="transition-all duration-300"
            />
          )}

          {/* Glowing Stroke Behind Main Line */}
          {linePath && (
            <path 
              d={linePath} 
              fill="none" 
              stroke="#059669" 
              strokeWidth="3.5" 
              filter={`url(#glow-${chartId})`}
              className="opacity-50"
            />
          )}

          {/* Main Line Stroke */}
          {linePath && (
            <path 
              d={linePath} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Dots on line vertices */}
          {points.map((p, idx) => (
            <g key={idx}>
              {/* Highlight Overlay on Hover */}
              {activeIdx === idx && (
                <>
                  <line 
                    x1={p.x} 
                    y1={padding} 
                    x2={p.x} 
                    y2={height - padding} 
                    stroke="rgba(16,185,129,0.3)" 
                    strokeWidth="1" 
                    strokeDasharray="2"
                  />
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="8" 
                    fill="#10b981" 
                    fillOpacity="0.15" 
                    className="animate-ping"
                  />
                </>
              )}
              {/* Main Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={activeIdx === idx ? "5.5" : "3.5"}
                fill={activeIdx === idx ? "#10b981" : "#090a0f"}
                stroke="#10b981"
                strokeWidth={activeIdx === idx ? "2" : "1.5"}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* X Axis Date Labels */}
      <div className="flex justify-between px-7 text-[10px] font-mono text-zinc-600 uppercase">
        {data.map((d, idx) => (
          <span key={idx}>{d.date}</span>
        ))}
      </div>
    </div>
  );
}
