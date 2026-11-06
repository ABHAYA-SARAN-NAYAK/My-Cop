import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bin } from '../types';
import { SEED_BINS } from '../data/seed';

interface BinsState {
  bins: Bin[];
  updateBin: (id: string, updates: Partial<Bin>) => void;
  addBin: (bin: Bin) => void;
  setFill: (id: string, fillPercent: number) => void;
  emptyBin: (id: string) => void;
  resetBins: () => void;
}

export const useBinsStore = create<BinsState>()(
  persist(
    (set) => ({
      bins: SEED_BINS,
      updateBin: (id, updates) =>
        set((state) => ({
          bins: state.bins.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      addBin: (bin) =>
        set((state) => ({
          bins: [bin, ...state.bins],
        })),
      setFill: (id, fillPercent) =>
        set((state) => ({
          bins: state.bins.map((b) => {
            if (b.id !== id) return b;
            const status = fillPercent >= 85 ? 'full' : fillPercent >= 70 ? 'near-full' : 'normal';
            return { ...b, fillPercent, status };
          }),
        })),
      emptyBin: (id) =>
        set((state) => ({
          bins: state.bins.map((b) =>
            b.id === id
              ? {
                  ...b,
                  fillPercent: 5,
                  status: 'normal',
                  lastEmptied: 'Just now',
                }
              : b
          ),
        })),
      resetBins: () => set({ bins: SEED_BINS }),
    }),
    {
      name: 'mycop_bins',
    }
  )
);
