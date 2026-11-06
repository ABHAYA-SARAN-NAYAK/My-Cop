import React from 'react';
import { Bin } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';
import { Battery, Signal, Thermometer, Wind, Truck, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface BinCardProps {
  bin: Bin;
  onRequestPickup?: (bin: Bin) => void;
  onViewDetails?: (bin: Bin) => void;
  isPickupRequested?: boolean;
}

export const BinCard: React.FC<BinCardProps> = ({
  bin,
  onRequestPickup,
  onViewDetails,
  isPickupRequested = false,
}) => {
  const category = CATEGORY_COLORS[bin.type] || CATEGORY_COLORS.plastic;
  const isFull = bin.fillPercent >= 85;
  const isNearFull = bin.fillPercent >= 70 && bin.fillPercent < 85;

  const statusColor = isFull
    ? 'bg-red-500/10 text-red-400 border-red-500/30'
    : isNearFull
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

  const statusLabel = isFull ? 'Full (Collect Now)' : isNearFull ? 'Near Full' : 'Normal';

  return (
    <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between border hover:border-white/20 transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-white">{bin.id}</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusColor}`}
            >
              {statusLabel}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1 truncate max-w-[200px]" title={bin.location.label}>
            {bin.location.label}
          </p>
        </div>

        {/* Category color tag */}
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: category.hex, boxShadow: `0 0 10px ${category.hex}` }}
          title={category.name}
        />
      </div>

      {/* Center Liquid Fill Container */}
      <div className="my-5 flex items-center gap-4">
        {/* Animated Cylinder Bin */}
        <div className="relative w-16 h-28 rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden flex flex-col justify-end shadow-inner">
          {/* Fill Wave Animation */}
          <div
            className="w-full relative transition-all duration-700 ease-out flex items-center justify-center"
            style={{
              height: `${Math.max(8, bin.fillPercent)}%`,
              backgroundColor: category.hex,
            }}
          >
            {/* Top liquid wave highlight */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 rounded-t-sm" />
          </div>

          {/* Grid ruler markers on bin */}
          <div className="absolute inset-y-0 right-1 flex flex-col justify-between py-2 text-[8px] font-mono text-white/30 pointer-events-none">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
          </div>
        </div>

        {/* Fill Percentage & Sensor telemetry */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-heading font-extrabold text-white tracking-tight">
              {bin.fillPercent}%
            </span>
            <span className="text-xs text-text-muted font-mono">Fill Level</span>
          </div>

          {/* Telemetry Chips */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-mono text-text-muted">
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
              <Battery size={13} className="text-emerald-400" />
              <span>{bin.batteryPercent}%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
              <Thermometer size={13} className="text-sky-400" />
              <span>{bin.temperatureC}°C</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
              <Signal size={13} className="text-violet-400" />
              <span>{bin.signalStrength}/5 Bars</span>
            </div>
            {bin.gasLevel !== undefined ? (
              <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                <Wind size={13} className="text-amber-400" />
                <span>{bin.gasLevel} ppm</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-text-muted truncate">Clean</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono text-text-muted truncate">
          Emptied: {bin.lastEmptied}
        </span>
        <div className="flex items-center gap-2">
          {onViewDetails && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(bin)}
              className="p-1.5 text-xs text-text-muted hover:text-white"
              title="View sensor history"
            >
              <Info size={14} />
            </Button>
          )}
          {onRequestPickup && (
            <Button
              variant={isFull ? 'primary' : 'secondary'}
              size="sm"
              disabled={isPickupRequested || bin.fillPercent < 20}
              onClick={() => onRequestPickup(bin)}
              leftIcon={<Truck size={12} />}
            >
              {isPickupRequested ? 'Requested' : 'Request'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
