import React, { useState } from 'react';
import { Bin, Truck } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';
import { Truck as TruckIcon, MapPin, Zap } from 'lucide-react';

interface FallbackMapProps {
  bins: Bin[];
  trucks: Truck[];
  onSelectBin?: (bin: Bin) => void;
  onSelectTruck?: (truck: Truck) => void;
  selectedBinId?: string;
  selectedTruckId?: string;
  height?: string;
}

// Map geographical bounds to SVG canvas (viewBox 0 0 800 600)
// Chennai approximate bounds:
// Lat: 12.91 to 13.10 (~0.19)
// Lng: 80.08 to 80.28 (~0.20)
function projectCoords(lat: number, lng: number): [number, number] {
  const minLat = 12.91;
  const maxLat = 13.10;
  const minLng = 80.08;
  const maxLng = 80.28;

  const x = ((lng - minLng) / (maxLng - minLng)) * 720 + 40;
  // Invert Y because latitude goes north (up) but SVG Y goes down
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 520 + 40;
  return [Math.max(30, Math.min(770, x)), Math.max(30, Math.min(570, y))];
}

export const FallbackMap: React.FC<FallbackMapProps> = ({
  bins,
  trucks,
  onSelectBin,
  onSelectTruck,
  selectedBinId,
  selectedTruckId,
  height = '500px',
}) => {
  const [hoveredNode, setHoveredNode] = useState<{ title: string; subtitle: string; x: number; y: number } | null>(null);

  // SVG Arterial Road Network connecting Chennai zones
  const roads = [
    // Anna Nagar to Guindy (Inner Ring Road)
    { from: [13.0850, 80.2100], to: [13.0067, 80.2025] },
    // Guindy to Velachery
    { from: [13.0067, 80.2025], to: [12.9815, 80.2180] },
    // T. Nagar to Adyar
    { from: [13.0418, 80.2341], to: [13.0012, 80.2565] },
    // Guindy to T. Nagar
    { from: [13.0067, 80.2025], to: [13.0418, 80.2341] },
    // Velachery to OMR
    { from: [12.9815, 80.2180], to: [12.9350, 80.2312] },
    // Guindy to Porur
    { from: [13.0067, 80.2025], to: [13.0382, 80.1565] },
    // Guindy to Tambaram (GST Road)
    { from: [13.0067, 80.2025], to: [12.9249, 80.1000] },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#0A0F1D] border border-white/10 select-none shadow-inner" style={{ height }}>
      {/* Offline Mode Badge indicator */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono">
        <Zap size={11} />
        Offline SVG Vector Map (Zero-Latency Fallback)
      </div>

      <svg viewBox="0 0 800 600" className="w-full h-full">
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <radialGradient id="waterGrad" cx="90%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="600" fill="url(#grid)" />
        {/* Bay of Bengal subtle coastline simulation on the right */}
        <path d="M 620 0 Q 640 250 680 600 L 800 600 L 800 0 Z" fill="url(#waterGrad)" />

        {/* Major Roads / Corridors */}
        {roads.map((road, idx) => {
          const [x1, y1] = projectCoords(road.from[0], road.from[1]);
          const [x2, y2] = projectCoords(road.to[0], road.to[1]);
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Ward Labels */}
        {[
          { label: 'Anna Nagar', lat: 13.0850, lng: 80.2100 },
          { label: 'T. Nagar', lat: 13.0418, lng: 80.2341 },
          { label: 'Guindy Hub', lat: 13.0067, lng: 80.2025 },
          { label: 'Adyar Coast', lat: 13.0012, lng: 80.2565 },
          { label: 'Velachery', lat: 12.9815, lng: 80.2180 },
          { label: 'Porur', lat: 13.0382, lng: 80.1565 },
          { label: 'OMR Corridor', lat: 12.9350, lng: 80.2312 },
          { label: 'Tambaram', lat: 12.9249, lng: 80.1000 },
        ].map((ward, i) => {
          const [x, y] = projectCoords(ward.lat, ward.lng);
          return (
            <text
              key={i}
              x={x}
              y={y + 20}
              textAnchor="middle"
              className="fill-white/20 text-[11px] font-mono select-none pointer-events-none"
            >
              {ward.label}
            </text>
          );
        })}

        {/* Bin Nodes */}
        {bins.map((bin) => {
          const [x, y] = projectCoords(bin.location.lat, bin.location.lng);
          const color = CATEGORY_COLORS[bin.type]?.hex || '#38BDF8';
          const isSelected = selectedBinId === bin.id;
          const isFull = bin.fillPercent >= 85;

          return (
            <g
              key={bin.id}
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectBin && onSelectBin(bin)}
              onMouseEnter={() =>
                setHoveredNode({
                  title: `${bin.id} · ${bin.type.toUpperCase()}`,
                  subtitle: `${bin.fillPercent}% full · ${bin.location.label}`,
                  x,
                  y,
                })
              }
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Pulse circle for full bins */}
              {isFull && (
                <circle cx={x} cy={y} r="14" fill={color} opacity="0.3" className="animate-ping" />
              )}

              <circle
                cx={x}
                cy={y}
                r={isSelected ? 9 : 6.5}
                fill={color}
                stroke="#070B14"
                strokeWidth={isSelected ? 3 : 2}
                className="drop-shadow-md"
              />
              <circle cx={x} cy={y} r="2.5" fill="#FFFFFF" />
            </g>
          );
        })}

        {/* Truck Nodes with directional indicators */}
        {trucks.map((truck) => {
          const [x, y] = projectCoords(truck.location.lat, truck.location.lng);
          const isSelected = selectedTruckId === truck.id;

          return (
            <g
              key={truck.id}
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectTruck && onSelectTruck(truck)}
              onMouseEnter={() =>
                setHoveredNode({
                  title: `${truck.id} (${truck.driverName})`,
                  subtitle: `Status: ${truck.status} · Load: ${truck.loadKg}/${truck.capacityKg} kg`,
                  x,
                  y,
                })
              }
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Truck boundary glow */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 16 : 12}
                fill="#22E58B"
                opacity="0.2"
                className="animate-pulse"
              />
              <rect
                x={x - 8}
                y={y - 8}
                width="16"
                height="16"
                rx="4"
                fill="#22E58B"
                stroke="#070B14"
                strokeWidth="2"
              />
              <circle cx={x} cy={y} r="3" fill="#070B14" />
            </g>
          );
        })}

        {/* Hover Tooltip inside SVG */}
        {hoveredNode && (
          <g transform={`translate(${Math.min(640, hoveredNode.x - 70)}, ${Math.max(50, hoveredNode.y - 45)})`}>
            <rect
              width="150"
              height="40"
              rx="8"
              fill="#0F1626"
              stroke="rgba(255,255,255,0.2)"
              filter="drop-shadow(0 4px 12px rgba(0,0,0,0.5))"
            />
            <text x="75" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
              {hoveredNode.title}
            </text>
            <text x="75" y="30" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
              {hoveredNode.subtitle}
            </text>
          </g>
        )}
      </svg>

      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-3 px-3 py-1.5 rounded-xl bg-surface/90 backdrop-blur-md border border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <span>Bin</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-brand-green" />
          <span>Truck</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <span>Full (&gt;85%)</span>
        </div>
      </div>
    </div>
  );
};
