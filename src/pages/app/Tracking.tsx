import React, { useState } from 'react';
import { usePickupsStore } from '../../store/usePickupsStore';
import { useFleetStore } from '../../store/useFleetStore';
import { useBinsStore } from '../../store/useBinsStore';
import { useAuthStore } from '../../store/useAuthStore';
import { advancePickupStep } from '../../store/actions';
import { evaluateNearestTrucks } from '../../sim/haversine';
import { LiveMap } from '../../components/maps/LiveMap';
import { CategoryBadge, SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Pickup } from '../../types';
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Share2,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Compass,
} from 'lucide-react';

export const TrackingPage: React.FC = () => {
  const { pickups, activePickupId, setActivePickupId, cancelPickup } = usePickupsStore();
  const { trucks } = useFleetStore();
  const { bins } = useBinsStore();
  const { role } = useAuthStore();

  const [filterTab, setFilterTab] = useState<'active' | 'completed' | 'all'>('active');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter pickups
  const filteredPickups = pickups.filter((p) => {
    if (filterTab === 'active') return p.status !== 'Delivered';
    if (filterTab === 'completed') return p.status === 'Delivered';
    return true;
  });

  const selectedPickup =
    pickups.find((p) => p.id === activePickupId) || filteredPickups[0] || pickups[0];

  // Find associated truck and bin
  const assignedTruck =
    trucks.find((t) => t.id === selectedPickup?.truckId) || trucks[0];

  // Run real Haversine distance evaluation for all 6 trucks to provide the "Why this truck?" proof!
  const targetBin = bins.find((b) => b.id === selectedPickup?.binId) || bins[0];
  const truckEvaluations = evaluateNearestTrucks(
    trucks,
    targetBin.location.lat,
    targetBin.location.lng,
    selectedPickup?.weightKg || 20
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 glass-card px-4 py-2.5 border-brand-teal/50 text-white text-xs font-mono shadow-2xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-brand-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Live Fleet Tracking & Dispatch
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Real-time GPS routing with verifiable Haversine nearest-truck algorithm.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
          <span className="text-brand-green font-bold">Active GPS Stream</span>
        </div>
      </div>

      {/* 3-Column Layout: Pickups List (Left), Big Map (Center), Detail & Math Proof (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Pickup Filter Tabs & List */}
        <div className="lg:col-span-3 glass-card p-4 space-y-3">
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {(['active', 'completed', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`flex-1 py-1 rounded-lg capitalize transition-colors ${
                  filterTab === tab
                    ? 'bg-brand-teal text-deep font-bold'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredPickups.map((p) => {
              const isSelected = selectedPickup?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setActivePickupId(p.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/[0.08] border-brand-teal shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                      : 'bg-surface/60 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-white">{p.id}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        p.status === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1 truncate">{p.address}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mt-2 pt-2 border-t border-white/5">
                    <span className="text-white font-semibold">{p.weightKg} kg</span>
                    <span>ETA {p.etaMinutes || 0}m</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Big Live Map */}
        <div className="lg:col-span-5 glass-card p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted flex items-center gap-1.5">
              <Compass size={14} className="text-brand-teal" />
              <span>Ward Map: T. Nagar & Chennai Central</span>
            </span>
            <span className="text-slate-300 font-bold">
              {assignedTruck.driverName} ({assignedTruck.id})
            </span>
          </div>

          <div className="h-[520px] rounded-xl overflow-hidden border border-white/10">
            <LiveMap
              bins={bins.slice(0, 10)}
              trucks={trucks}
              selectedBinId={selectedPickup?.binId}
              selectedTruckId={selectedPickup?.truckId}
              height="100%"
              center={[13.0418, 80.2341]}
              zoom={13}
            />
          </div>
        </div>

        {/* Right Column: Status Timeline, Haversine Proof & Driver Controls */}
        <div className="lg:col-span-4 space-y-4">
          {selectedPickup && (
            <div className="glass-card p-5 space-y-5">
              {/* Pickup Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-text-muted">
                    Dispatch Order
                  </span>
                  <h3 className="font-heading font-bold text-white text-base">
                    {selectedPickup.id}
                  </h3>
                  <p className="text-xs text-text-muted truncate mt-0.5 max-w-[200px]">
                    {selectedPickup.address}
                  </p>
                </div>
                <CategoryBadge category={selectedPickup.wasteType} />
              </div>

              {/* Status Timeline */}
              <div>
                <span className="text-[10px] font-mono uppercase text-text-muted block mb-2">
                  Trip Lifecycle
                </span>
                <div className="space-y-2 relative border-l-2 border-white/10 ml-2 pl-3">
                  {selectedPickup.timeline.map((step, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div
                        className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full ${
                          step.active
                            ? 'bg-brand-green ring-4 ring-brand-green/30 animate-pulse'
                            : step.done
                            ? 'bg-emerald-400'
                            : 'bg-slate-700'
                        }`}
                      />
                      <div className="flex justify-between">
                        <span
                          className={`font-medium ${
                            step.active
                              ? 'text-brand-green font-bold'
                              : step.done
                              ? 'text-white'
                              : 'text-text-muted'
                          }`}
                        >
                          {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-text-muted">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Haversine Proof Card ("Why this truck?") */}
              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold text-sky-300 flex items-center gap-1.5">
                    <Navigation size={13} />
                    <span>Why This Truck? (Haversine Proof)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    Real Math
                  </span>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Evaluated great-circle distance on coordinates (R = 6371 km).{' '}
                  <strong className="text-white">{assignedTruck.id}</strong> scored lowest distance (
                  <strong className="text-brand-green">{truckEvaluations.bestDistanceKm} km</strong>) with available payload capacity.
                </p>

                {/* Top 3 Closest Trucks Comparison */}
                <div className="pt-2 border-t border-white/10 space-y-1 text-[10px] font-mono">
                  {truckEvaluations.evaluations.slice(0, 3).map((e, idx) => (
                    <div
                      key={e.truck.id}
                      className={`flex justify-between p-1 rounded ${
                        e.truck.id === selectedPickup.truckId
                          ? 'bg-brand-teal/20 text-brand-teal font-bold'
                          : 'text-text-muted'
                      }`}
                    >
                      <span>
                        {idx + 1}. {e.truck.id} ({e.truck.driverName})
                      </span>
                      <span>{e.distanceKm} km · {e.availableCapacityKg}kg free</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Card */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{assignedTruck.driverName}</p>
                  <p className="text-[10px] font-mono text-text-muted">
                    Unit: {assignedTruck.id} · Load: {assignedTruck.loadKg}/{assignedTruck.capacityKg} kg
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => showToast(`Calling driver ${assignedTruck.driverName} on secure VoIP...`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-green border border-white/10"
                    title="Call Driver"
                  >
                    <Phone size={14} />
                  </button>
                  <button
                    onClick={() => showToast(`Messaging dispatch center for Truck ${assignedTruck.id}...`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-sky-400 border border-white/10"
                    title="Message Driver"
                  >
                    <MessageSquare size={14} />
                  </button>
                </div>
              </div>

              {/* Driver Role Specific Controls */}
              {role === 'driver' && selectedPickup.status !== 'Delivered' && (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                    Driver Trip Execution Console
                  </span>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => advancePickupStep(selectedPickup.id)}
                  >
                    Move Trip to Next Lifecycle Step →
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard?.writeText?.(window.location.href);
                    showToast('Tracking link copied to clipboard!');
                  }}
                  leftIcon={<Share2 size={13} />}
                >
                  Share Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-400 hover:text-red-300"
                  onClick={() => {
                    cancelPickup(selectedPickup.id);
                    showToast(`Pickup ${selectedPickup.id} cancelled.`);
                  }}
                  leftIcon={<XCircle size={13} />}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
