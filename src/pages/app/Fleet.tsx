import React, { useState } from 'react';
import { useFleetStore } from '../../store/useFleetStore';
import { useAuthStore } from '../../store/useAuthStore';
import { LiveMap } from '../../components/maps/LiveMap';
import { SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Truck } from '../../types';
import {
  Truck as TruckIcon,
  Navigation,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';

export const FleetPage: React.FC = () => {
  const { trucks, updateTruck } = useFleetStore();
  const { role } = useAuthStore();

  const [selectedTruckId, setSelectedTruckId] = useState<string>(trucks[0]?.id || 'TRK-01');
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizedNotice, setOptimizedNotice] = useState<string | null>(null);

  const selectedTruck = trucks.find((t) => t.id === selectedTruckId) || trucks[0];

  // Stops for today's driver manifest
  const [stops, setStops] = useState([
    { id: 'ST-1', label: 'Panagal Park North (BIN-TN-01)', weight: 35, done: true, lat: 13.0418, lng: 80.2341 },
    { id: 'ST-2', label: 'Pondy Bazaar Market (BIN-TN-02)', weight: 28, done: false, lat: 13.0445, lng: 80.2382 },
    { id: 'ST-3', label: 'Usman Road Junction (BIN-TN-03)', weight: 19, done: false, lat: 13.0392, lng: 80.2310 },
    { id: 'ST-4', label: 'Guindy Central Sorting Facility', weight: 82, done: false, lat: 13.0067, lng: 80.2025 },
  ]);

  const handleOptimizeRoute = () => {
    setIsOptimized(true);
    setOptimizedNotice('Nearest-Neighbor route applied! Saved 4.8 km (23.5% fuel reduction).');
    setTimeout(() => setOptimizedNotice(null), 5000);
  };

  const handleToggleStopDone = (id: string) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Fleet Logistics & Dynamic Routes
            </h1>
            <SimulatedBadge />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Real-time truck capacity management and TSP nearest-neighbor route optimization.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOptimizeRoute}
          leftIcon={<Sparkles size={14} />}
        >
          Optimize Today's Route
        </Button>
      </div>

      {/* Optimization Notice Banner */}
      {optimizedNotice && (
        <div className="glass-card p-3.5 border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between text-xs text-emerald-300 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-brand-green" />
            <span>{optimizedNotice}</span>
          </div>
          <span className="text-[10px] text-brand-green font-bold uppercase">Optimal Route Active</span>
        </div>
      )}

      {/* 2-Column Layout: Truck Fleet Cards (Left), Map + Manifest (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Truck Units */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
            Active Vehicles ({trucks.length})
          </h2>

          <div className="space-y-3">
            {trucks.map((truck) => {
              const isSelected = selectedTruckId === truck.id;
              const loadPercent = Math.round((truck.loadKg / truck.capacityKg) * 100);

              return (
                <div
                  key={truck.id}
                  onClick={() => setSelectedTruckId(truck.id)}
                  className={`glass-card p-4 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-teal bg-white/[0.08] shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                        <TruckIcon size={18} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-white text-sm">{truck.id}</h3>
                        <p className="text-xs text-text-muted">{truck.driverName}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        truck.status === 'Idle'
                          ? 'bg-slate-700/50 text-slate-300'
                          : truck.status === 'Collecting'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}
                    >
                      {truck.status}
                    </span>
                  </div>

                  {/* Load Capacity Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-mono text-text-muted mb-1">
                      <span>Payload Load</span>
                      <span className="text-white font-bold">
                        {truck.loadKg} / {truck.capacityKg} kg ({loadPercent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          loadPercent > 80 ? 'bg-amber-400' : 'bg-brand-teal'
                        }`}
                        style={{ width: `${Math.min(100, loadPercent)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Route Map & Stops Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted flex items-center gap-1.5">
                <Compass size={14} className="text-brand-teal" />
                <span>Assigned Sector Route for {selectedTruck.id}</span>
              </span>
              <span className="text-brand-green font-bold">
                {isOptimized ? 'AI Nearest-Neighbor Path' : 'Default Scheduled Path'}
              </span>
            </div>

            <div className="h-64 rounded-xl overflow-hidden border border-white/10">
              <LiveMap
                bins={[]}
                trucks={[selectedTruck]}
                selectedTruckId={selectedTruck.id}
                height="100%"
                center={[selectedTruck.location.lat, selectedTruck.location.lng]}
                zoom={14}
              />
            </div>
          </div>

          {/* Today's Stops Checklist (Driver Manifest) */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-sm">
                Driver Route Stops ({stops.filter((s) => s.done).length}/{stops.length} Complete)
              </h3>
              <span className="text-[10px] font-mono text-text-muted">Sector Ward 112</span>
            </div>

            <div className="space-y-2">
              {stops.map((stop, idx) => (
                <div
                  key={stop.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    stop.done
                      ? 'bg-emerald-950/20 border-emerald-500/20 opacity-75'
                      : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleStopDone(stop.id)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        stop.done
                          ? 'bg-brand-green text-deep'
                          : 'border border-white/30 hover:border-brand-green'
                      }`}
                    >
                      {stop.done && <CheckCircle2 size={14} />}
                    </button>
                    <div>
                      <p className={`text-xs font-semibold ${stop.done ? 'line-through text-text-muted' : 'text-white'}`}>
                        {idx + 1}. {stop.label}
                      </p>
                      <p className="text-[10px] font-mono text-text-muted mt-0.5">
                        Target payload: {stop.weight} kg
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-teal text-xs flex items-center gap-1 font-mono"
                    title="Open Navigation in Google Maps"
                  >
                    <span>Nav</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
