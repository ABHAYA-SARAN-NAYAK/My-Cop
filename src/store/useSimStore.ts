import { create } from 'zustand';

interface SimState {
  isRunning: boolean;
  speed: 1 | 2 | 5;
  tickCount: number;
  tickerItems: string[];
  toggleRunning: () => void;
  setRunning: (val: boolean) => void;
  setSpeed: (speed: 1 | 2 | 5) => void;
  incTick: () => void;
  addTickerItem: (item: string) => void;
}

const INITIAL_TICKER = [
  '♻️ 12.4 kg plastic just matched with GreenLoop Recyclers',
  '🔔 Smart Bin #BIN-TN-01 is 92% full · Auto-pickup queued',
  '🚚 Truck TRK-04 arrived at Panagal Park Sorting Center',
  '🌱 56.8 kg CO₂ offset logged on blockchain ledger block #29',
  '💰 Marketplace: EcoPlast placed ₹38/kg bid on Shredded PET Flakes',
  '⚡ Anaerobic Digester converted 420kg organic biomass to 48m³ biogas',
  '🏆 Priya Nair reached Tree Tier with 1,240 green points',
];

export const useSimStore = create<SimState>((set) => ({
  isRunning: true,
  speed: 1,
  tickCount: 0,
  tickerItems: INITIAL_TICKER,
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setRunning: (isRunning) => set({ isRunning }),
  setSpeed: (speed) => set({ speed }),
  incTick: () => set((state) => ({ tickCount: state.tickCount + 1 })),
  addTickerItem: (item) =>
    set((state) => ({
      tickerItems: [item, ...state.tickerItems.slice(0, 15)],
    })),
}));
