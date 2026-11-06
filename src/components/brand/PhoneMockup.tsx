import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bell, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PhoneMockup: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-[290px] h-[580px] bg-slate-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(34,229,139,0.15)] border-4 border-slate-800/80 ring-1 ring-white/10 select-none"
    >
      {/* Speaker and Dynamic Island */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-auto mr-2" />
      </div>

      {/* Internal Screen Content */}
      <div className="w-full h-full bg-[#070B14] rounded-[38px] overflow-hidden flex flex-col pt-7 px-3.5 pb-4 text-xs font-sans border border-white/5">
        {/* Top Header inside phone */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-green" />
            <span className="font-heading font-bold text-white text-[13px]">MyCop Live</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <span className="text-[10px] font-mono">10:42</span>
            <Bell size={12} className="text-brand-teal" />
          </div>
        </div>

        {/* User Greeting & Points */}
        <div className="mt-3 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-2.5 rounded-2xl border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-text-muted">Welcome back,</p>
              <p className="font-semibold text-white text-[12px]">Priya Nair</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green font-mono font-medium border border-brand-green/20">
                <Sparkles size={9} /> 1,240 pts
              </span>
            </div>
          </div>
        </div>

        {/* Real numbers from Section 8.1 */}
        <div className="mt-2.5 bg-surface/80 p-2.5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center text-[10px] text-text-muted mb-1">
            <span>Collected Today</span>
            <span className="text-brand-green font-mono font-semibold">+18%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-heading font-extrabold text-white">85.4</span>
            <span className="text-text-muted font-mono text-[11px]">kg</span>
          </div>

          {/* Mini progress bar with exact 42/36/22 breakdown */}
          <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden mt-2">
            <div style={{ width: '42%' }} className="bg-sky-400" title="42% Recyclable" />
            <div style={{ width: '36%' }} className="bg-emerald-400" title="36% Organic" />
            <div style={{ width: '22%' }} className="bg-amber-400" title="22% Landfill" />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-text-muted mt-1.5">
            <span className="text-sky-400">42% Plastic</span>
            <span className="text-emerald-400">36% Org</span>
            <span className="text-amber-400">22% Land</span>
          </div>
        </div>

        {/* Live Truck Tracking mini card */}
        <div className="mt-2.5 bg-sky-950/20 border border-sky-500/20 p-2.5 rounded-2xl">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-semibold text-sky-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              Truck TRK-04 En Route
            </span>
            <span className="text-[9px] font-mono text-text-muted">ETA 4m</span>
          </div>
          <p className="text-[10px] text-text-muted leading-tight">
            Assigned nearest truck via Haversine (1.8 km away)
          </p>
        </div>

        {/* Recent Ledger Hash */}
        <div className="mt-2.5 bg-purple-950/20 border border-purple-500/20 p-2 rounded-xl">
          <div className="flex items-center gap-1 text-[9px] text-purple-300 font-mono">
            <CheckCircle2 size={10} className="text-purple-400" />
            <span>Block #29 · SHA-256 Verified</span>
          </div>
          <p className="text-[8px] font-mono text-text-muted truncate mt-0.5">
            00c7a1f...82e4
          </p>
        </div>

        {/* CTA Button */}
        <Link
          to="/login"
          className="mt-auto w-full py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-teal text-deep font-semibold text-center text-[11px] flex items-center justify-center gap-1 shadow-md hover:opacity-95 transition-all"
        >
          Open Web App <ArrowUpRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};
