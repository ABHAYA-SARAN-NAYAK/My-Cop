import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Listing, Transaction, Bid } from '../types';
import { SEED_LISTINGS } from '../data/seed';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-88101',
    listingId: 'LST-001',
    title: 'Clean Shredded PET Flakes – Grade A',
    amount: 9120,
    buyer: 'GreenLoop Recyclers',
    date: '2026-11-05',
    weightKg: 240,
    status: 'Completed',
  },
  {
    id: 'TX-88102',
    listingId: 'LST-003',
    title: 'Pre-Compost Organic Biomass',
    amount: 5525,
    buyer: 'Tamil Nadu BioAgro',
    date: '2026-11-04',
    weightKg: 850,
    status: 'Completed',
  },
];

interface MarketState {
  listings: Listing[];
  transactions: Transaction[];
  addListing: (listing: Listing) => void;
  placeBid: (listingId: string, bid: Bid) => void;
  buyListing: (listingId: string, buyerName: string) => Transaction;
  resetMarket: () => void;
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set, get) => ({
      listings: SEED_LISTINGS,
      transactions: INITIAL_TRANSACTIONS,
      addListing: (listing) =>
        set((state) => ({
          listings: [listing, ...state.listings],
        })),
      placeBid: (listingId, bid) =>
        set((state) => ({
          listings: state.listings.map((l) =>
            l.id === listingId ? { ...l, bids: [bid, ...l.bids] } : l
          ),
        })),
      buyListing: (listingId, buyerName) => {
        const item = get().listings.find((l) => l.id === listingId);
        const total = item ? item.weightKg * item.pricePerKg : 1000;
        const tx: Transaction = {
          id: `TX-${Date.now().toString().slice(-5)}`,
          listingId,
          title: item ? item.title : 'Recycled Material Batch',
          amount: total,
          buyer: buyerName,
          date: new Date().toISOString().split('T')[0],
          weightKg: item ? item.weightKg : 100,
          status: 'Completed',
        };

        set((state) => ({
          listings: state.listings.filter((l) => l.id !== listingId),
          transactions: [tx, ...state.transactions],
        }));

        return tx;
      },
      resetMarket: () => set({ listings: SEED_LISTINGS, transactions: INITIAL_TRANSACTIONS }),
    }),
    {
      name: 'mycop_market',
    }
  )
);
