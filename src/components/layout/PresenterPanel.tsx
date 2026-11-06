import React, { useEffect, useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useSimStore } from '../../store/useSimStore';
import { useBinsStore } from '../../store/useBinsStore';
import { usePickupsStore } from '../../store/usePickupsStore';
import { useLedgerStore } from '../../store/useLedgerStore';
import { useRewardsStore } from '../../store/useRewardsStore';
import { useMarketStore } from '../../store/useMarketStore';
import {
  createDisposalAndPickup,
  advancePickupStep,
  triggerBinFillAlert,
  executeMarketPurchase,
  resetAllDemoData,
} from '../../store/actions';
import {
  Tv,
  X,
  Play,
  Pause,
  RotateCcw,
  WifiOff,
  Wifi,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  User,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../types';

export const PresenterPanel: React.FC = () => {
  const {
    presenterOpen,
    togglePresenter,
    setPresenterOpen,
    offlineFallback,
    toggleOfflineFallback,
    narratorCaption,
    setNarratorCaption,
  } = useUIStore();

  const { role, loginAs } = useAuthStore();
  const { isRunning, toggleRunning, speed, setSpeed } = useSimStore();
  const navigate = useNavigate();
  const [isRunningFullDemo, setIsRunningFullDemo] = useState(false);

  // Global Keyboard Shortcuts (P, 1-4, R, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        togglePresenter();
      } else if (e.key === '1') {
        e.preventDefault();
        loginAs('generator');
        navigate('/app/dashboard');
      } else if (e.key === '2') {
        e.preventDefault();
        loginAs('recycler');
        navigate('/app/recycler');
      } else if (e.key === '3') {
        e.preventDefault();
        loginAs('admin');
        navigate('/app/admin');
      } else if (e.key === '4') {
        e.preventDefault();
        loginAs('driver');
        navigate('/app/fleet');
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetAllDemoData();
      } else if (e.code === 'Space') {
        e.preventDefault();
        toggleRunning();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePresenter, loginAs, navigate, toggleRunning]);

  // Run Full Demo Automated Story Sequence (Section 11 & Section 15)
  const runFullDemo = async () => {
    setIsRunningFullDemo(true);

    try {
      // Step 1: Generator Dashboard & Fill Alert
      setNarratorCaption('1/6: Smart Bin #BIN-TN-01 in T. Nagar has reached 92% capacity. Automated alert dispatched.');
      loginAs('generator');
      navigate('/app/dashboard');
      await triggerBinFillAlert('BIN-TN-01');
      await new Promise((r) => setTimeout(r, 3500));

      // Step 2: Show Haversine proof on Tracking
      setNarratorCaption('2/6: Real Haversine algorithm evaluated all 6 trucks. Truck TRK-04 assigned (shortest 1.8km distance).');
      navigate('/app/tracking');
      await new Promise((r) => setTimeout(r, 4000));

      // Step 3: Waste reaches AI Sorter
      setNarratorCaption('3/6: Waste reaches Guindy Automated Hub. AI camera and robotic gripper sorting into clean streams.');
      navigate('/app/ai-sorter');
      const activePickup = usePickupsStore.getState().pickups[0];
      if (activePickup) await advancePickupStep(activePickup.id);
      await new Promise((r) => setTimeout(r, 4500));

      // Step 4: Cryptographic ledger updates
      setNarratorCaption('4/6: Batch #2026 hashed on SHA-256 blockchain ledger. Immutable origin & purity record created.');
      navigate('/app/ledger');
      if (activePickup) await advancePickupStep(activePickup.id);
      await new Promise((r) => setTimeout(r, 4000));

      // Step 5: Recycler buys the batch
      setNarratorCaption('5/6: Switching to GreenLoop Recyclers. Batch purchased on Digital Waste Marketplace.');
      loginAs('recycler');
      navigate('/app/marketplace');
      const listings = useMarketStore.getState().listings;
      if (listings.length > 0) {
        await executeMarketPurchase(listings[0].id, 'GreenLoop Recyclers');
      }
      await new Promise((r) => setTimeout(r, 4000));

      // Step 6: Rewards & Impact
      setNarratorCaption('6/6: Priya Nair earns +50 reward points! City dashboard registers +85.4kg diverted from landfill.');
      loginAs('generator');
      navigate('/app/dashboard');
      await new Promise((r) => setTimeout(r, 4000));

      setNarratorCaption('✨ Full Waste Journey complete: Dispose → Track → Recycle → Reward!');
      setTimeout(() => setNarratorCaption(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunningFullDemo(false);
    }
  };

  return (
    <>
      {/* Floating Bottom Narrator Caption Banner */}
      {narratorCaption && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92%] glass-panel p-4 rounded-2xl border border-brand-green/40 shadow-[0_10px_40px_rgba(34,229,139,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-green animate-ping flex-shrink-0" />
            <p className="text-sm font-sans font-medium text-white flex-1 leading-snug">
              {narratorCaption}
            </p>
            <button
              onClick={() => setNarratorCaption(null)}
              className="text-text-muted hover:text-white p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Presenter Trigger Button if panel is closed */}
      {!presenterOpen && (
        <button
          onClick={() => setPresenterOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-brand-green/40 text-brand-green font-mono text-xs font-semibold shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <Tv size={14} />
          <span>Presenter Tool</span>
          <span className="text-[10px] bg-white/10 px-1 py-0.5 rounded">P</span>
        </button>
      )}

      {/* Full Presenter Mode Drawer / Window */}
      {presenterOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-96 glass-card p-4 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Tv size={16} className="text-brand-green" />
              <h3 className="font-heading font-bold text-white text-sm">
                Presenter Mode Control
              </h3>
            </div>
            <button
              onClick={() => setPresenterOpen(false)}
              className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>

          {/* Master 1-Click Auto Run Demo */}
          <div className="mt-3">
            <button
              onClick={runFullDemo}
              disabled={isRunningFullDemo}
              className="w-full py-2.5 rounded-xl bg-brand-gradient text-deep font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Sparkles size={14} />
              {isRunningFullDemo ? 'Running Full Journey...' : '▶ Run Full Demo (3 Min Story)'}
            </button>
          </div>

          {/* Quick Step Trigger Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs font-mono">
            <button
              onClick={() => triggerBinFillAlert('BIN-TN-01')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-left flex items-center gap-1.5"
            >
              <Zap size={12} className="text-amber-400" />
              <span>Fill Bin (92%)</span>
            </button>

            <button
              onClick={async () => {
                const pickups = usePickupsStore.getState().pickups;
                if (pickups.length > 0) await advancePickupStep(pickups[0].id);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-left flex items-center gap-1.5"
            >
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span>Next Pickup Step</span>
            </button>

            <button
              onClick={() => {
                useLedgerStore.getState().tamperBlock(2, 'MALICIOUS_TAMPER_RECORD_DATA');
                navigate('/app/ledger');
              }}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-left flex items-center gap-1.5"
            >
              <AlertTriangle size={12} className="text-red-400" />
              <span>Tamper Ledger #2</span>
            </button>

            <button
              onClick={() => {
                useRewardsStore.getState().addPoints(100, 'Presenter Bonus Credited');
              }}
              className="p-2 rounded-xl bg-brand-green/10 hover:bg-brand-green/20 border border-brand-green/30 text-brand-green text-left flex items-center gap-1.5"
            >
              <Sparkles size={12} className="text-brand-green" />
              <span>+100 Points</span>
            </button>
          </div>

          {/* Simulation & Speed Controls */}
          <div className="mt-3 p-2.5 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between">
            <button
              onClick={toggleRunning}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold ${
                isRunning ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {isRunning ? <Pause size={12} /> : <Play size={12} />}
              <span>{isRunning ? 'Pause Sim' : 'Resume Sim'}</span>
            </button>

            <div className="flex items-center gap-1 text-[11px] font-mono">
              <span className="text-text-muted mr-1">Speed:</span>
              {([1, 2, 5] as const).map((s) => (
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

          {/* Quick Role Switch Tabs (1 - 4) */}
          <div className="mt-3">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-1.5">
              Switch Role (Keys 1-4)
            </span>
            <div className="grid grid-cols-4 gap-1 text-center font-mono text-[11px]">
              {(['generator', 'recycler', 'admin', 'driver'] as Role[]).map((r, i) => (
                <button
                  key={r}
                  onClick={() => {
                    loginAs(r);
                    if (r === 'generator') navigate('/app/dashboard');
                    else if (r === 'recycler') navigate('/app/recycler');
                    else if (r === 'admin') navigate('/app/admin');
                    else if (r === 'driver') navigate('/app/fleet');
                  }}
                  className={`py-1 rounded-lg capitalize border transition-all ${
                    role === r
                      ? 'bg-brand-teal/20 border-brand-teal text-brand-teal font-bold'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[9px] block opacity-50">{i + 1}</span>
                  {r.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Fallback Toggle & Reset */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <button
              onClick={toggleOfflineFallback}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                offlineFallback
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Force SVG Map mode (no internet dependency)"
            >
              {offlineFallback ? <WifiOff size={13} /> : <Wifi size={13} />}
              <span>{offlineFallback ? 'Offline SVG: ON' : 'Online Tiles'}</span>
            </button>

            <button
              onClick={() => {
                resetAllDemoData();
              }}
              className="flex items-center gap-1 text-text-muted hover:text-red-400 transition-colors"
              title="Reset all demo states (Key: R)"
            >
              <RotateCcw size={12} />
              <span>Reset (R)</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
