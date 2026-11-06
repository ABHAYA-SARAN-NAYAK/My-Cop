import React, { useState } from 'react';
import { useBinsStore } from '../../store/useBinsStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useSimStore } from '../../store/useSimStore';
import { createDisposalAndPickup } from '../../store/actions';
import { Bin, WasteCategory } from '../../types';
import { CHENNAI_AREAS, CATEGORY_COLORS } from '../../lib/constants';
import { BinCard } from '../../components/domain/BinCard';
import { LiveMap } from '../../components/maps/LiveMap';
import { SimulatedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Search,
  Filter,
  Grid,
  Map as MapIcon,
  AlertTriangle,
  Radio,
  Plus,
  X,
  Battery,
  Thermometer,
  Signal,
  Wind,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const BinsPage: React.FC = () => {
  const { bins, setFill, emptyBin, addBin } = useBinsStore();
  const { role } = useAuthStore();
  const isRunning = useSimStore((s) => s.isRunning);

  // Filters state
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Drawer & Modal state
  const [selectedDrawerBin, setSelectedDrawerBin] = useState<Bin | null>(null);
  const [addBinModalOpen, setAddBinModalOpen] = useState(false);
  const [newBinArea, setNewBinArea] = useState('T. Nagar');
  const [newBinType, setNewBinType] = useState<WasteCategory>('plastic');

  // Filter logic
  const filteredBins = bins.filter((bin) => {
    const matchesArea =
      selectedArea === 'All Areas' || bin.location.label.toLowerCase().includes(selectedArea.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || bin.type === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || bin.status === selectedStatus;
    const matchesSearch =
      bin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.location.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesCategory && matchesStatus && matchesSearch;
  });

  // Check if any bin is above 85% for top alert banner
  const highCapacityBins = bins.filter((b) => b.fillPercent >= 85);

  const handleRequestPickup = async (bin: Bin) => {
    await createDisposalAndPickup(bin.type, 35, bin.location.label);
    if (selectedDrawerBin?.id === bin.id) {
      setSelectedDrawerBin(null);
    }
  };

  const handleAddBinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `BIN-${newBinArea.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const created: Bin = {
      id: newId,
      type: newBinType,
      location: {
        lat: 13.0418 + (Math.random() - 0.5) * 0.05,
        lng: 80.2341 + (Math.random() - 0.5) * 0.05,
        label: `${newBinArea} Smart Eco-Drop Hub`,
      },
      fillPercent: 10,
      status: 'normal',
      lastEmptied: 'Just now',
      batteryPercent: 100,
      signalStrength: 5,
      temperatureC: 28,
      gasLevel: newBinType === 'organic' ? 20 : undefined,
    };
    addBin(created);
    setAddBinModalOpen(false);
  };

  // 24-hr Fill Trend Mock Data for Drawer
  const fillHistory = [
    { hour: '00:00', fill: 20 },
    { hour: '04:00', fill: 25 },
    { hour: '08:00', fill: 45 },
    { hour: '12:00', fill: 68 },
    { hour: '16:00', fill: 82 },
    { hour: '20:00', fill: selectedDrawerBin?.fillPercent || 88 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">Smart Bin Monitor</h1>
            <SimulatedBadge />
            {isRunning && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                Live Telemetry
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-1">
            Real-time ultrasonic fill level, battery health, and methane sensor monitoring across {bins.length} city nodes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid / Map toggle */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-brand-teal text-deep font-bold' : 'text-text-muted hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-brand-teal text-deep font-bold' : 'text-text-muted hover:text-white'
              }`}
              title="Map View"
            >
              <MapIcon size={16} />
            </button>
          </div>

          {role === 'admin' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAddBinModalOpen(true)}
              leftIcon={<Plus size={14} />}
            >
              Add Smart Bin
            </Button>
          )}
        </div>
      </div>

      {/* Alert Banner when bins are > 85% full */}
      {highCapacityBins.length > 0 && (
        <div className="glass-card p-4 border-amber-500/30 bg-amber-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-amber-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white">High Capacity Alert: </span>
              <span className="text-amber-200">
                {highCapacityBins.length} bins exceed 85% threshold ({highCapacityBins.map((b) => b.id).slice(0, 3).join(', ')}).
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRequestPickup(highCapacityBins[0])}
          >
            Auto-Dispatch First
          </Button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by Bin ID or Area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-teal"
          />
        </div>

        {/* Area Dropdown */}
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-teal font-mono"
        >
          {CHENNAI_AREAS.map((area) => (
            <option key={area} value={area} className="bg-surface text-white">
              {area}
            </option>
          ))}
        </select>

        {/* Status Chips */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {['all', 'normal', 'near-full', 'full'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                selectedStatus === st
                  ? 'bg-brand-teal text-deep font-bold'
                  : 'bg-white/5 text-text-muted hover:text-white border border-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Grid or Map */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBins.map((bin) => (
            <BinCard
              key={bin.id}
              bin={bin}
              onRequestPickup={handleRequestPickup}
              onViewDetails={(b) => setSelectedDrawerBin(b)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-4">
          <LiveMap
            bins={filteredBins}
            trucks={[]}
            onSelectBin={(b) => setSelectedDrawerBin(b)}
            selectedBinId={selectedDrawerBin?.id}
            height="560px"
          />
        </div>
      )}

      {/* Bin Details Drawer (Right Slide-over) */}
      {selectedDrawerBin && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0F1626] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">{selectedDrawerBin.id}</h3>
                  <p className="text-xs text-text-muted font-mono">{selectedDrawerBin.location.label}</p>
                </div>
                <button
                  onClick={() => setSelectedDrawerBin(null)}
                  className="p-1 rounded-lg text-text-muted hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status and Telemetry */}
              <div className="my-6 space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-text-muted">Fill Capacity</span>
                  <span className="text-2xl font-heading font-extrabold text-white">
                    {selectedDrawerBin.fillPercent}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                    <Battery size={16} className="text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-text-muted block">Battery</span>
                      <span className="text-white font-bold">{selectedDrawerBin.batteryPercent}%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                    <Thermometer size={16} className="text-sky-400" />
                    <div>
                      <span className="text-[10px] text-text-muted block">Temp</span>
                      <span className="text-white font-bold">{selectedDrawerBin.temperatureC}°C</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                    <Signal size={16} className="text-violet-400" />
                    <div>
                      <span className="text-[10px] text-text-muted block">LoRaWAN</span>
                      <span className="text-white font-bold">{selectedDrawerBin.signalStrength}/5 Bars</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                    <Wind size={16} className="text-amber-400" />
                    <div>
                      <span className="text-[10px] text-text-muted block">Methane</span>
                      <span className="text-white font-bold">
                        {selectedDrawerBin.gasLevel ? `${selectedDrawerBin.gasLevel} ppm` : '0 ppm'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 24-hr Fill Level Line Chart */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono text-text-muted mb-2 uppercase">24-Hour Fill History</h4>
                  <div className="h-40 w-full bg-surface rounded-xl p-2 border border-white/5">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fillHistory}>
                        <XAxis dataKey="hour" stroke="#64748B" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={10} tickLine={false} domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="fill" stroke="#22E58B" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => handleRequestPickup(selectedDrawerBin)}
              >
                Dispatch Nearest Truck
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    emptyBin(selectedDrawerBin.id);
                    setSelectedDrawerBin(null);
                  }}
                >
                  Mark as Emptied
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => alert(`Diagnostics log dispatched to Ripon Smart City Center for ${selectedDrawerBin.id}`)}
                >
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add Bin Modal */}
      {addBinModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddBinSubmit}
            className="glass-card p-6 max-w-md w-full border border-white/20 space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-heading font-bold text-white text-base">Register New IoT Smart Bin</h3>
              <button type="button" onClick={() => setAddBinModalOpen(false)} className="text-text-muted hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-text-muted block mb-1">Ward Location</label>
              <select
                value={newBinArea}
                onChange={(e) => setNewBinArea(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-xs text-white"
              >
                {CHENNAI_AREAS.filter((a) => a !== 'All Areas').map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-text-muted block mb-1">Waste Stream Type</label>
              <select
                value={newBinType}
                onChange={(e) => setNewBinType(e.target.value as any)}
                className="w-full bg-surface border border-white/10 rounded-xl p-2.5 text-xs text-white capitalize"
              >
                {(['plastic', 'organic', 'metal', 'glass', 'ewaste', 'landfill'] as WasteCategory[]).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-text-muted">
              Auto-calibrating LoRaWAN node and ultrasonic sensor baseline (100% battery, 0% fill).
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setAddBinModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Deploy Smart Bin
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
