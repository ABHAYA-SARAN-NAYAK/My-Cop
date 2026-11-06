import React from 'react';
import { useSimStore } from '../../store/useSimStore';
import { Radio } from 'lucide-react';

export const LiveTicker: React.FC<{ className?: string }> = ({ className = '' }) => {
  const tickerItems = useSimStore((s) => s.tickerItems);

  return (
    <div
      className={`w-full bg-[#0B1120] border-b border-white/5 py-1.5 px-4 overflow-hidden relative select-none flex items-center z-30 ${className}`}
    >
      {/* Live Badge indicator */}
      <div className="flex items-center gap-1.5 pr-4 border-r border-white/10 flex-shrink-0 z-10 bg-[#0B1120]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
        </span>
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-green flex items-center gap-1">
          <Radio size={11} /> Live Link
        </span>
      </div>

      {/* Marquee ticker stream */}
      <div className="flex overflow-hidden w-full ml-4 whitespace-nowrap mask-gradient">
        <div className="inline-flex gap-8 animate-marquee text-xs font-mono text-text-muted hover:pause">
          {tickerItems.concat(tickerItems).map((msg, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <span>{msg}</span>
              <span className="text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
