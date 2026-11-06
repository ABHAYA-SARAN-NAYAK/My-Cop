import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Leaf, Package, Cpu } from 'lucide-react';

interface ParticleItem {
  id: number;
  type: 'plastic' | 'organic' | 'metal' | 'glass';
  icon: any;
  color: string;
  targetBin: number; // 0: plastic, 1: organic, 2: metal
}

export const HeroWasteParticles: React.FC = () => {
  const [particles, setParticles] = useState<ParticleItem[]>([]);
  const [activeBinGlow, setActiveBinGlow] = useState<number | null>(null);

  const itemsConfig: Array<Omit<ParticleItem, 'id'>> = [
    { type: 'plastic', icon: Package, color: '#38BDF8', targetBin: 0 },
    { type: 'organic', icon: Leaf, color: '#4ADE80', targetBin: 1 },
    { type: 'metal', icon: Cpu, color: '#A78BFA', targetBin: 2 },
    { type: 'glass', icon: Wine, color: '#2DD4BF', targetBin: 0 },
  ];

  useEffect(() => {
    let idCounter = 0;
    const interval = setInterval(() => {
      const randomCfg = itemsConfig[Math.floor(Math.random() * itemsConfig.length)];
      const newParticle: ParticleItem = {
        ...randomCfg,
        id: ++idCounter,
      };

      setParticles((prev) => [...prev.slice(-3), newParticle]);

      // Glow the corresponding bin momentarily when particle arrives
      setTimeout(() => {
        setActiveBinGlow(randomCfg.targetBin);
        setTimeout(() => setActiveBinGlow(null), 500);
      }, 2100);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto h-48 flex flex-col justify-between items-center p-4">
      {/* Floating Particle Arena */}
      <div className="relative w-full h-24 overflow-visible">
        <AnimatePresence>
          {particles.map((p) => {
            const Icon = p.icon;
            // Target X position for 3 bins (approx -90px, 0px, 90px)
            const targetX = (p.targetBin - 1) * 95;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: -20, x: Math.random() * 80 - 40, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 1, 0.9, 0],
                  y: [-20, 10, 35, 65, 80],
                  x: [0, Math.sin(p.id) * 20, targetX * 0.5, targetX, targetX],
                  scale: [0.6, 1.1, 1, 0.8, 0.3],
                }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="absolute left-1/2 -ml-5 top-0 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 shadow-lg pointer-events-none"
                style={{
                  backgroundColor: `${p.color}25`,
                  boxShadow: `0 0 15px ${p.color}60`,
                }}
              >
                <Icon size={18} style={{ color: p.color }} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 3 Receiving IoT Bins */}
      <div className="flex items-end justify-center gap-6 w-full pt-2">
        {/* Bin 1: Recyclable */}
        <div
          className={`flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 ${
            activeBinGlow === 0
              ? 'border-sky-400 bg-sky-500/20 scale-105 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
              : 'border-white/10 bg-surface/60'
          }`}
        >
          <div className="w-10 h-12 rounded-lg bg-sky-500/10 border border-sky-400/40 relative overflow-hidden flex items-end">
            <div className="w-full bg-sky-400/50 h-3/5 rounded-b-md animate-pulse" />
          </div>
          <span className="text-[10px] font-mono mt-1 text-sky-400 font-semibold">Plastic</span>
        </div>

        {/* Bin 2: Organic */}
        <div
          className={`flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 ${
            activeBinGlow === 1
              ? 'border-emerald-400 bg-emerald-500/20 scale-105 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
              : 'border-white/10 bg-surface/60'
          }`}
        >
          <div className="w-10 h-12 rounded-lg bg-emerald-500/10 border border-emerald-400/40 relative overflow-hidden flex items-end">
            <div className="w-full bg-emerald-400/50 h-4/5 rounded-b-md animate-pulse" />
          </div>
          <span className="text-[10px] font-mono mt-1 text-emerald-400 font-semibold">Organic</span>
        </div>

        {/* Bin 3: Metal */}
        <div
          className={`flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 ${
            activeBinGlow === 2
              ? 'border-violet-400 bg-violet-500/20 scale-105 shadow-[0_0_20px_rgba(167,139,250,0.5)]'
              : 'border-white/10 bg-surface/60'
          }`}
        >
          <div className="w-10 h-12 rounded-lg bg-violet-500/10 border border-violet-400/40 relative overflow-hidden flex items-end">
            <div className="w-full bg-violet-400/50 h-2/5 rounded-b-md animate-pulse" />
          </div>
          <span className="text-[10px] font-mono mt-1 text-violet-400 font-semibold">Metal</span>
        </div>
      </div>
      <p className="text-[11px] text-text-muted mt-2 font-mono flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping inline-block" />
        AI Sorter Camera & Gripper Routing
      </p>
    </div>
  );
};
