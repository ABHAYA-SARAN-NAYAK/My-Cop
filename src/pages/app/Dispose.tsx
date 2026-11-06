import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { WasteCategory } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';
import { createDisposalAndPickup } from '../../store/actions';
import { triggerRewardCelebration, formatCurrency } from '../../lib/format';
import { Button } from '../../components/ui/Button';
import { SimulatedBadge } from '../../components/ui/Badge';
import {
  Package,
  Leaf,
  Cpu,
  Wine,
  Trash2,
  Tv,
  CheckCircle2,
  QrCode,
  Upload,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Camera,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DisposePage: React.FC = () => {
  const navigate = useNavigate();

  // Stepper State (Step 1, 2, 3, or Completed 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [wasteType, setWasteType] = useState<WasteCategory>('plastic');
  const [weightKg, setWeightKg] = useState<number>(12);
  const [isSegregated, setIsSegregated] = useState<boolean>(true);
  const [userNote, setUserNote] = useState<string>('Clean dry PET bottles, rinsed');
  const [pickupTime, setPickupTime] = useState<'now' | 'today' | 'schedule'>('now');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // QR Modal State
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isScanningQr, setIsScanningQr] = useState(false);
  const [createdPickupId, setCreatedPickupId] = useState<string | null>(null);

  // Estimated points & value
  const estimatedPoints = Math.round(weightKg * (isSegregated ? 15 : 5));
  const priceMap: Record<WasteCategory, number> = {
    plastic: 38,
    metal: 115,
    glass: 14,
    organic: 6.5,
    landfill: 2,
    ewaste: 350,
  };
  const estimatedValueInr = Math.round(weightKg * (priceMap[wasteType] || 20));

  const wasteOptions = [
    { type: 'plastic' as WasteCategory, label: 'Recyclable Plastic', icon: Package, desc: 'PET bottles, milk containers, HDPE containers', color: '#38BDF8' },
    { type: 'organic' as WasteCategory, label: 'Organic Biomass', icon: Leaf, desc: 'Kitchen peels, food scraps, garden foliage', color: '#4ADE80' },
    { type: 'metal' as WasteCategory, label: 'Scrap Metal', icon: Cpu, desc: 'Aluminum drink cans, tins, copper wire scraps', color: '#A78BFA' },
    { type: 'glass' as WasteCategory, label: 'Glass Cullet', icon: Wine, desc: 'Clear & amber jars, bottles, glassware', color: '#2DD4BF' },
    { type: 'ewaste' as WasteCategory, label: 'Electronic E-Waste', icon: Tv, desc: 'Old circuit boards, chargers, phone batteries', color: '#F472B6' },
    { type: 'landfill' as WasteCategory, label: 'Mixed / Landfill', icon: Trash2, desc: 'Sanitary hygiene waste, non-recyclable multi-layers', color: '#FBBF24' },
  ];

  const handleSimulateQrScan = () => {
    setIsScanningQr(true);
    setTimeout(() => {
      setIsScanningQr(false);
      setQrModalOpen(false);
      setWasteType('plastic');
      setWeightKg(15);
      setUserNote('Auto-detected via Smart Bin #BIN-TN-01 QR Tag');
    }, 1500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleConfirmDisposal = async () => {
    const newPickup = await createDisposalAndPickup(
      wasteType,
      weightKg,
      'Panagal Park North, T. Nagar',
      userNote
    );

    setCreatedPickupId(newPickup.id);
    triggerRewardCelebration();
    setCurrentStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Title & QR Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">Dispose Waste</h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Log your segregated household waste, dispatch nearest truck, and earn green reward points.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setQrModalOpen(true)}
          leftIcon={<QrCode size={14} className="text-brand-green" />}
        >
          Scan Bin QR
        </Button>
      </div>

      {/* 3-Step Stepper Header */}
      {currentStep <= 3 && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, title: 'Waste Stream' },
              { num: 2, title: 'Weight & Details' },
              { num: 3, title: 'Confirm & Dispatch' },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    currentStep === s.num
                      ? 'bg-brand-gradient text-deep'
                      : currentStep > s.num
                      ? 'bg-emerald-500 text-deep'
                      : 'bg-white/10 text-text-muted'
                  }`}
                >
                  {currentStep > s.num ? <CheckCircle2 size={14} /> : s.num}
                </span>
                <span
                  className={`text-xs font-heading hidden sm:inline ${
                    currentStep === s.num ? 'text-white font-bold' : 'text-text-muted'
                  }`}
                >
                  {s.title}
                </span>
                {idx < 2 && <div className="w-8 sm:w-16 h-0.5 bg-white/10 mx-2" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Select Waste Stream */}
      {currentStep === 1 && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-heading font-bold text-white">
            1. Select Waste Stream Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wasteOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = wasteType === opt.type;
              return (
                <div
                  key={opt.type}
                  onClick={() => setWasteType(opt.type)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/[0.08] border-brand-teal shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                      : 'bg-surface/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: `${opt.color}15`, color: opt.color }}
                    >
                      <Icon size={20} />
                    </div>
                    {isSelected && (
                      <CheckCircle2 size={16} className="text-brand-green" />
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-white text-sm mt-3">{opt.label}</h3>
                  <p className="text-[11px] text-text-muted mt-1 leading-snug">{opt.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(2)}
              rightIcon={<ArrowRight size={14} />}
            >
              Continue to Details
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Weight & Pickup Details */}
      {currentStep === 2 && (
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-base font-heading font-bold text-white">
            2. Quantity & Pickup Details
          </h2>

          {/* Weight Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-white font-semibold">Estimated Weight:</span>
              <span className="text-2xl font-heading font-extrabold text-brand-green">
                {weightKg.toFixed(1)} <span className="text-xs font-mono text-text-muted">kg</span>
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-brand-green cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted font-mono mt-1">
              <span>0.5 kg (Small bag)</span>
              <span>25 kg</span>
              <span>50 kg (Bulk crate)</span>
            </div>
          </div>

          {/* Segregated Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div>
              <span className="text-xs font-bold text-white block">Already Clean & Segregated?</span>
              <span className="text-[11px] text-text-muted">
                Unlocks 3x bonus green points for high-purity recycling.
              </span>
            </div>
            <input
              type="checkbox"
              checked={isSegregated}
              onChange={(e) => setIsSegregated(e.target.checked)}
              className="w-5 h-5 accent-brand-green rounded cursor-pointer"
            />
          </div>

          {/* Pickup Timing */}
          <div>
            <label className="text-xs font-mono text-text-muted block mb-2">Preferred Dispatch Window</label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { id: 'now', label: 'Now (Instant)', sub: 'ETA 5m' },
                { id: 'today', label: 'Today Evening', sub: '5:00 PM' },
                { id: 'schedule', label: 'Tomorrow', sub: '9:00 AM' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPickupTime(t.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    pickupTime === t.id
                      ? 'bg-brand-teal/20 border-brand-teal text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-text-muted hover:text-white'
                  }`}
                >
                  <span className="block">{t.label}</span>
                  <span className="text-[10px] text-brand-green block mt-0.5">{t.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Notes */}
          <div>
            <label className="text-xs font-mono text-text-muted block mb-1.5">Optional Pickup Note</label>
            <textarea
              rows={2}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="e.g. 2 cartons kept near apartment gate #2"
              className="w-full bg-surface border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-teal"
            />
          </div>

          {/* Photo Drop Zone */}
          <div>
            <label className="text-xs font-mono text-text-muted block mb-1.5">Photo Verification (Optional)</label>
            <label className="border-2 border-dashed border-white/15 hover:border-brand-teal/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/[0.01]">
              <Upload size={20} className="text-text-muted mb-1" />
              <span className="text-xs text-slate-300">Click or drop an image of your sorted waste</span>
              <span className="text-[10px] text-text-muted font-mono mt-0.5">PNG, JPG up to 5MB</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {photoPreview && (
              <div className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                <img src={photoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                <span className="text-xs text-white flex-1 truncate">Image attached</span>
                <button onClick={() => setPhotoPreview(null)} className="text-text-muted hover:text-red-400 p-1">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <Button variant="ghost" size="md" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft size={14} />}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setCurrentStep(3)} rightIcon={<ArrowRight size={14} />}>
              Review & Confirm
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Confirm & Summary */}
      {currentStep === 3 && (
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-base font-heading font-bold text-white">
            3. Review & Confirm Disposal
          </h2>

          <div className="bg-surface/90 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-text-muted">Waste Stream</span>
                <p className="font-heading font-bold text-white text-base capitalize">{wasteType} Waste</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-text-muted">Total Weight</span>
                <p className="font-heading font-bold text-white text-base">{weightKg} kg</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-text-muted">Estimated Points</span>
                <p className="text-lg font-heading font-bold text-brand-green mt-1 flex items-center gap-1">
                  <Sparkles size={16} /> +{estimatedPoints} pts
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-text-muted">Marketplace Value</span>
                <p className="text-lg font-heading font-bold text-sky-400 mt-1">
                  {formatCurrency(estimatedValueInr)}
                </p>
              </div>
            </div>

            <div className="text-xs text-text-muted space-y-1 font-mono pt-2">
              <p>📍 Location: Panagal Park North, T. Nagar</p>
              <p>🚚 Nearest Truck: Real Haversine dispatch (ETA ~4 mins)</p>
              <p>⛓️ Ledger: Cryptographic SHA-256 batch registration enabled</p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft size={14} />}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleConfirmDisposal}
              rightIcon={<Sparkles size={16} />}
            >
              Confirm Disposal & Dispatch
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Success Confirmation */}
      {currentStep === 4 && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 text-center space-y-6 border-brand-green/30"
        >
          <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,229,139,0.4)]">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-heading font-extrabold text-white">
              Disposal Pickup Confirmed! 🎉
            </h2>
            <p className="text-xs text-text-muted mt-2 max-w-md mx-auto">
              Pickup <strong className="text-brand-green font-mono">{createdPickupId}</strong> is queued. The nearest truck has been assigned and is heading to your location.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 max-w-sm mx-auto text-xs font-mono space-y-1">
            <p className="text-brand-green font-bold">+{estimatedPoints} Green Points Credited!</p>
            <p className="text-text-muted">Logged on Blockchain Block #{createdPickupId?.slice(-3)}</p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link to="/app/tracking">
              <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
                Track Pickup Live
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setCurrentStep(1);
                setPhotoPreview(null);
              }}
            >
              Dispose More Waste
            </Button>
          </div>
        </motion.div>
      )}

      {/* Simulated QR Code Scanner Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-sm w-full border border-white/20 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-white text-sm">Scan Smart Bin QR</h3>
              <button onClick={() => setQrModalOpen(false)} className="text-text-muted hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* Scanner Viewfinder Simulation */}
            <div className="relative w-full h-56 bg-slate-950 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
              {/* Laser line animation */}
              <motion.div
                animate={{ y: [-80, 80, -80] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute w-full h-0.5 bg-brand-green shadow-[0_0_15px_#22E58B]"
              />
              <QrCode size={110} className="text-white/20" />
              <div className="absolute inset-4 border-2 border-brand-teal/40 rounded-xl pointer-events-none" />
            </div>

            <p className="text-[11px] text-text-muted text-center font-mono">
              Align camera with Smart Bin QR tag to auto-populate stream & ward coordinates.
            </p>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isScanningQr}
              onClick={handleSimulateQrScan}
            >
              Simulate Instant QR Read
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
