import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SegregationGauge: React.FC<{ score?: number }> = ({ score = 94 }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Segregation Score
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 font-semibold">
          Top 5% in Ward
        </span>
      </div>

      <div className="relative my-2 flex items-center justify-center">
        <svg className="w-28 h-28 transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="url(#scoreGrad)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22E58B" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-heading font-extrabold text-white">{score}</span>
          <span className="text-[9px] font-mono text-text-muted">/100</span>
        </div>
      </div>

      <div className="w-full bg-white/[0.03] p-2.5 rounded-xl border border-white/5 text-xs">
        <div className="flex items-start gap-2">
          <Sparkles size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-text-muted leading-relaxed">
            Rinse milk pouches before disposal to bump score to <strong className="text-white">98</strong> & unlock +25 pts!
          </p>
        </div>
      </div>
    </div>
  );
};
