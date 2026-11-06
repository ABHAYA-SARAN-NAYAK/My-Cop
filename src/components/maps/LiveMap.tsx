import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Bin, Truck } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';
import { FallbackMap } from './FallbackMap';
import { useUIStore } from '../../store/useUIStore';

interface LiveMapProps {
  bins: Bin[];
  trucks: Truck[];
  onSelectBin?: (bin: Bin) => void;
  onSelectTruck?: (truck: Truck) => void;
  selectedBinId?: string;
  selectedTruckId?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export const LiveMap: React.FC<LiveMapProps> = ({
  bins,
  trucks,
  onSelectBin,
  onSelectTruck,
  selectedBinId,
  selectedTruckId,
  height = '500px',
  center = [13.0418, 80.2341],
  zoom = 12,
}) => {
  const offlineFallback = useUIStore((s) => s.offlineFallback);
  const [hasError, setHasError] = useState(false);

  // If user toggled offline mode in Presenter Mode or error occurred, render FallbackMap immediately
  if (offlineFallback || hasError) {
    return (
      <FallbackMap
        bins={bins}
        trucks={trucks}
        onSelectBin={onSelectBin}
        onSelectTruck={onSelectTruck}
        selectedBinId={selectedBinId}
        selectedTruckId={selectedTruckId}
        height={height}
      />
    );
  }

  // Helper to create custom HTML DivIcons for Bins
  const createBinIcon = (bin: Bin, isSelected: boolean) => {
    const color = CATEGORY_COLORS[bin.type]?.hex || '#38BDF8';
    const isFull = bin.fillPercent >= 85;

    return L.divIcon({
      className: 'custom-bin-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
          ${isFull ? `<div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: ${color}; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
          <div style="
            width: ${isSelected ? '24px' : '20px'};
            height: ${isSelected ? '24px' : '20px'};
            border-radius: 50%;
            background: ${color};
            border: 3px solid #070B14;
            box-shadow: 0 0 12px ${color};
            display: flex;
            align-items: center;
            justify-content: center;
            color: #070B14;
            font-size: 9px;
            font-weight: bold;
            font-family: monospace;
          ">
            ${bin.fillPercent > 80 ? '!' : ''}
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // Helper to create custom HTML DivIcons for Trucks
  const createTruckIcon = (truck: Truck, isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-truck-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
          <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(34, 229, 139, 0.25); animation: pulse 2s infinite;"></div>
          <div style="
            width: ${isSelected ? '28px' : '24px'};
            height: ${isSelected ? '28px' : '24px'};
            border-radius: 8px;
            background: #22E58B;
            border: 2px solid #070B14;
            box-shadow: 0 0 15px rgba(34, 229, 139, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #070B14;
            font-weight: 800;
            font-size: 10px;
          ">
            🚚
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  try {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg" style={{ height }}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Bins */}
          {bins.map((bin) => (
            <Marker
              key={bin.id}
              position={[bin.location.lat, bin.location.lng]}
              icon={createBinIcon(bin, selectedBinId === bin.id)}
              eventHandlers={{
                click: () => onSelectBin && onSelectBin(bin),
              }}
            >
              <Popup className="dark-popup">
                <div className="p-2 text-xs font-sans text-slate-900">
                  <p className="font-bold">{bin.id} ({bin.type.toUpperCase()})</p>
                  <p className="text-slate-600 font-mono">{bin.location.label}</p>
                  <p className="mt-1 font-semibold text-emerald-700">Fill Level: {bin.fillPercent}%</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Render Trucks */}
          {trucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.location.lat, truck.location.lng]}
              icon={createTruckIcon(truck, selectedTruckId === truck.id)}
              eventHandlers={{
                click: () => onSelectTruck && onSelectTruck(truck),
              }}
            >
              <Popup>
                <div className="p-2 text-xs font-sans text-slate-900">
                  <p className="font-bold">{truck.id} - {truck.driverName}</p>
                  <p className="font-mono text-slate-600">Status: {truck.status}</p>
                  <p className="mt-1">Load: {truck.loadKg} / {truck.capacityKg} kg</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  } catch (err) {
    console.error('Error rendering Leaflet map, switching to offline fallback', err);
    return (
      <FallbackMap
        bins={bins}
        trucks={trucks}
        onSelectBin={onSelectBin}
        onSelectTruck={onSelectTruck}
        selectedBinId={selectedBinId}
        selectedTruckId={selectedTruckId}
        height={height}
      />
    );
  }
};
