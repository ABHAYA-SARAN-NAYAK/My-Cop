import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Truck } from '../types';
import { SEED_TRUCKS } from '../data/seed';

interface FleetState {
  trucks: Truck[];
  updateTruck: (id: string, updates: Partial<Truck>) => void;
  setTruckLocation: (id: string, lat: number, lng: number) => void;
  resetFleet: () => void;
}

export const useFleetStore = create<FleetState>()(
  persist(
    (set) => ({
      trucks: SEED_TRUCKS,
      updateTruck: (id, updates) =>
        set((state) => ({
          trucks: state.trucks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      setTruckLocation: (id, lat, lng) =>
        set((state) => ({
          trucks: state.trucks.map((t) =>
            t.id === id ? { ...t, location: { lat, lng } } : t
          ),
        })),
      resetFleet: () => set({ trucks: SEED_TRUCKS }),
    }),
    {
      name: 'mycop_fleet',
    }
  )
);
