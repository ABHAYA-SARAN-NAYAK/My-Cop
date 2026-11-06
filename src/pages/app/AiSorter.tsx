import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketStore } from '../../store/useMarketStore';
import { useLedgerStore } from '../../store/useLedgerStore';
import { useSimStore } from '../../store/useSimStore';
import { SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { triggerRewardCelebration } from '../../lib/format';
import {
  Cpu,
  Camera,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Upload,
  Layers,
  Sparkles,
  CheckCircle2,
  Package,
  Leaf,
  Wine,
  Trash2,
  Box,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConveyorItem {
  id: number;
  name: string;
  category: 'plastic' | 'organic' | 'metal' | 'glass';
  confidence: number;
  icon: any;
  color: string;
}

export const AiSorterPage: React.FC = () => {
  const navigate = useNavigate();
  const addListing = useMarketStore((s) => s.addListing);
  const addBlock = useLedgerStore((s) => s.addBlock);

  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [itemsSorted, setItemsSorted] = useState<number>(42);
  const [binCounts, setBinCounts] = useState({
    plastic: 18,
    organic: 12,
    metal: 7,
    glass: 5,
  });

  const [logs, setLogs] = useState<string[]>([
    'Item #42 (PET Bottle) -> Classified Plastic (98.2%) -> Bin 1',
    'Item #41 (Banana Peel) -> Classified Organic (96.5%) -> Bin 2',
    'Item #40 (Aluminum Can) -> Classified Metal (99.0%) -> Bin 3',
  ]);

  // Current item under camera / scanner
  const sampleItems: Omit<ConveyorItem, 'id' | 'confidence'>[] = [
    { name: 'PET Water Bottle', category: 'plastic', icon: Package, color: '#38BDF8' },
    { name: 'Organic Banana Peel', category: 'organic', icon: Leaf, color: '#4ADE80' },
    { name: 'Aluminum Beverage Can', category: 'metal', icon: Box, color: '#A78BFA' },
    { name: 'Clear Glass Pickle Jar', category: 'glass', icon: Wine, color: '#2DD4BF' },
    { name: 'HDPE Milk Container', category: 'plastic', icon: Package, color: '#38BDF8' },
    { name: 'Vegetable Stalks', category: 'organic', icon: Leaf, color: '#4ADE80' },
  ];

  const [activeItem, setActiveItem] = useState<ConveyorItem>({
    id: 43,
    name: 'PET Water Bottle',
    category: 'plastic',
    confidence: 97.8,
    icon: Package,
    color: '#38BDF8',
  });

  const [isScanning, setIsScanning] = useState(true);
  const [gripperAction, setGripperAction] = useState<'idle' | 'descending' | 'gripping' | 'moving'>('idle');

  // Simulation Loop
  useEffect(() => {
    let timer: any;
    if (isRunning) {
      const intervalMs = Math.max(1200, 3000 / speed);
      timer = setInterval(() => {
        // Pick next random item
        const raw = sampleItems[Math.floor(Math.random() * sampleItems.length)];
        const confidence = Math.round((95 + Math.random() * 4.8) * 10) / 10;
        const nextId = itemsSorted + 1;

        setIsScanning(true);
        setGripperAction('descending');

        setTimeout(() => {
          setGripperAction('gripping');
          setTimeout(() => {
            setGripperAction('moving');
            // Drop in bin
            setBinCounts((prev) => ({
              ...prev,
              [raw.category]: prev[raw.category] + 1,
            }));
            setItemsSorted(nextId);
            setLogs((prev) => [
              `Item #${nextId} (${raw.name}) -> ${raw.category.toUpperCase()} (${confidence}%)`,
              ...prev.slice(0, 15),
            ]);
            setGripperAction('idle');
          }, 600);
        }, 500);

        setActiveItem({
          id: nextId,
          name: raw.name,
          category: raw.category,
          confidence,
          icon: raw.icon,
          color: raw.color,
        });
      }, intervalMs);
    }

    return () => clearInterval(timer);
  }, [isRunning, speed, itemsSorted]);

  // Upload user image simulation
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const name = file.name.toLowerCase();
      let cat: 'plastic' | 'organic' | 'metal' | 'glass' = 'plastic';
      if (name.includes('banana') || name.includes('peel') || name.includes('leaf') || name.includes('food')) cat = 'organic';
      else if (name.includes('can') || name.includes('tin') || name.includes('metal')) cat = 'metal';
      else if (name.includes('glass') || name.includes('bottle')) cat = 'glass';

      const customItem: ConveyorItem = {
        id: itemsSorted + 1,
        name: file.name.slice(0, 20),
        category: cat,
        confidence: 96.4,
        icon: Package,
        color: cat === 'organic' ? '#4ADE80' : cat === 'metal' ? '#A78BFA' : '#38BDF8',
      };
      setActiveItem(customItem);
      setItemsSorted((p) => p + 1);
      setBinCounts((prev) => ({ ...prev, [cat]: prev[cat] + 1 }));
      setLogs((prev) => [
        `Custom Upload (${file.name}) -> Classified ${cat.toUpperCase()} (96.4%)`,
        ...prev,
      ]);
      triggerRewardCelebration();
    }
  };

  // Convert sorted batch into Marketplace listing
  const handleListOnMarketplace = async () => {
    const batchId = `BATCH-${new Date().getFullYear()}-AI${Math.floor(100 + Math.random() * 900)}`;
    const weightKg = binCounts.plastic * 1.5;

    addListing({
      id: `LST-${Date.now().toString().slice(-3)}`,
      batchId,
      title: `AI-Segregated High Purity PET Plastic (${binCounts.plastic} units)`,
      category: 'plastic',
      weightKg: Math.round(weightKg),
      pricePerKg: 42,
      purity: 98.4,
      location: 'Guindy Central AI Sorting Hub',
      distanceKm: 3.2,
      seller: 'MyCop Automated Sorting Facility',
      verified: true,
      bids: [],
      createdAt: 'Just now',
    });

    await addBlock(
      batchId,
      'Segregated',
      `Guindy AI Hub: 98.4% optical camera purity. Items sorted: ${itemsSorted}. Converted to marketplace lot.`
    );

    triggerRewardCelebration();
    navigate('/app/marketplace');
  };

  const ActiveIcon = activeItem.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              AI Segregation Lab & Robotic Gripper
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Deck Step 7: Computer vision edge segmentation and multi-stream mechanical gripper sorting.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleListOnMarketplace}
          leftIcon={<Sparkles size={14} />}
        >
          List Sorted Batch on Marketplace
        </Button>
      </div>

      {/* Main 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Conveyor Belt Visualizer & Robotic Arm */}
        <div className="lg:col-span-8 glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-brand-green" />
              <span className="font-heading font-bold text-white text-sm">
                Live Conveyor & Computer Vision Arena
              </span>
            </div>

            {/* Simulation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={isRunning ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
                leftIcon={isRunning ? <Pause size={12} /> : <Play size={12} />}
              >
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10 text-xs font-mono">
                <span className="text-text-muted px-1.5">Speed:</span>
                {[1, 2, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 rounded ${
                      speed === s ? 'bg-brand-teal text-deep font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Conveyor Visual Arena */}
          <div className="relative w-full h-80 bg-[#070B14] rounded-2xl border border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none shadow-inner">
            {/* Top Scanning HUD */}
            <div className="flex items-center justify-between z-10 text-xs font-mono">
              <div className="flex items-center gap-2 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span className="text-white">Camera: 1080p 60fps Optical Stream</span>
              </div>
              <div className="bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-brand-teal">
                Model: MobileNet-V3 WasteNet (98.4% Acc)
              </div>
            </div>

            {/* Central Item on Conveyor under Scanner */}
            <div className="relative flex items-center justify-center h-40">
              {/* Conveyor Belt Stripes in background */}
              <div className="absolute inset-x-0 bottom-4 h-12 bg-slate-900 border-y border-white/10 flex items-center overflow-hidden opacity-50">
                <div className="w-full flex gap-4 animate-marquee text-[10px] text-white/20 font-mono">
                  <span>◀ ◀ ◀ CONVEYOR BELT ACTIVE ◀ ◀ ◀</span>
                  <span>◀ ◀ ◀ CONVEYOR BELT ACTIVE ◀ ◀ ◀</span>
                  <span>◀ ◀ ◀ CONVEYOR BELT ACTIVE ◀ ◀ ◀</span>
                </div>
              </div>

              {/* Robotic Arm / Gripper Simulation SVG */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                <div className="w-4 h-14 bg-slate-700 border border-white/20 rounded-t-sm" />
                {/* Arm Joint */}
                <div className="w-8 h-4 bg-brand-teal rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-deep" />
                </div>
                {/* Gripper Pincers */}
                <div className="flex gap-4 -mt-0.5">
                  <div className="w-1.5 h-6 bg-brand-green rounded-b-sm" />
                  <div className="w-1.5 h-6 bg-brand-green rounded-b-sm" />
                </div>
              </div>

              {/* Scanned Item with Grid Segmentation Bounding Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ x: 120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -120, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative p-4 rounded-2xl flex flex-col items-center justify-center z-10"
                >
                  {/* Grid Segmentation overlay lines */}
                  <div className="absolute inset-0 border-2 border-brand-teal rounded-xl pointer-events-none shadow-[0_0_20px_rgba(20,184,166,0.6)]">
                    <div className="absolute -top-3 left-2 bg-brand-teal text-deep font-mono font-bold text-[10px] px-2 py-0.2 rounded">
                      {activeItem.name} · {activeItem.confidence}%
                    </div>
                    {/* Crosshair corners */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
                  </div>

                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${activeItem.color}25` }}
                  >
                    <ActiveIcon size={32} style={{ color: activeItem.color }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4 Colored Destination Bins at Bottom */}
            <div className="grid grid-cols-4 gap-3 z-10">
              {[
                { name: 'Plastic', count: binCounts.plastic, color: '#38BDF8', key: 'plastic' },
                { name: 'Organic', count: binCounts.organic, color: '#4ADE80', key: 'organic' },
                { name: 'Metal', count: binCounts.metal, color: '#A78BFA', key: 'metal' },
                { name: 'Glass', count: binCounts.glass, color: '#2DD4BF', key: 'glass' },
              ].map((b) => (
                <div
                  key={b.key}
                  className="p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all"
                  style={{
                    backgroundColor: `${b.color}10`,
                    borderColor: `${b.color}35`,
                  }}
                >
                  <span className="text-[10px] font-mono uppercase font-bold" style={{ color: b.color }}>
                    {b.name}
                  </span>
                  <span className="text-xl font-heading font-extrabold text-white mt-0.5">
                    {b.count}
                  </span>
                  <span className="text-[9px] text-text-muted font-mono">items</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Image Upload Trigger */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Upload size={20} className="text-brand-teal flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Upload Your Own Item Image</p>
                <p className="text-[11px] text-text-muted">
                  Simulated neural classifier will segment and route your custom waste item.
                </p>
              </div>
            </div>

            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10">
                Choose Image
              </span>
              <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
            </label>
          </div>
        </div>

        {/* Right Column: Telemetry, Logs & Hardware Specs */}
        <div className="lg:col-span-4 space-y-4">
          {/* Sorter Statistics */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="font-heading font-bold text-white text-sm">Sorting Analytics</h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-text-muted uppercase">Total Sorted</span>
                <p className="text-2xl font-heading font-extrabold text-white mt-0.5">{itemsSorted}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-text-muted uppercase">Purity Accuracy</span>
                <p className="text-2xl font-heading font-extrabold text-brand-green mt-0.5">98.4%</p>
              </div>
            </div>

            {/* Purity breakdown per bin */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-sky-400">Plastic Stream:</span>
                <span className="text-white font-bold">98.2% Grade A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400">Organic Biomass:</span>
                <span className="text-white font-bold">99.1% High Nitrogen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-violet-400">Metal Cans:</span>
                <span className="text-white font-bold">99.5% Ferrous-Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-teal-400">Glass Cullet:</span>
                <span className="text-white font-bold">97.0% Color Sorted</span>
              </div>
            </div>
          </div>

          {/* Real-time Event Log */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-sm">Classification Stream</h3>
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-[11px] text-text-muted pr-1">
              {logs.map((log, idx) => (
                <div key={idx} className="p-1.5 rounded bg-white/[0.02] border border-white/5 truncate">
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Prototype Spec Card (Section 10.6) */}
          <div className="glass-card p-4 border-white/10 space-y-2 text-xs font-mono">
            <span className="text-[10px] text-brand-teal uppercase font-bold block">
              Hardware Architecture (Deck Spec)
            </span>
            <p className="text-slate-300">
              • Controller: <strong>Raspberry Pi 5 (8GB) + Edge TPU Coral</strong>
            </p>
            <p className="text-slate-300">
              • Camera: <strong>Sony IMX500 AI Vision Sensor</strong>
            </p>
            <p className="text-slate-300">
              • End Effector: <strong>Pneumatic Suction + 3-Jaw Servo Gripper</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
