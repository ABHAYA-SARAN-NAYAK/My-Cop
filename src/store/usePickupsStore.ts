import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pickup, PickupStatus } from '../types';

export const INITIAL_PICKUPS: Pickup[] = [
  {
    id: 'PKP-101',
    binId: 'BIN-TN-01',
    wasteType: 'plastic',
    status: 'Delivered',
    truckId: 'TRK-04',
    etaMinutes: 0,
    createdAt: 'Today, 10:00 AM',
    address: 'Panagal Park North, T. Nagar',
    weightKg: 28.5,
    userNote: 'Sorted clean PET beverage bottles',
    timeline: [
      { step: 'Requested', time: '10:00 AM', done: true },
      { step: 'Assigned', time: '10:05 AM', done: true },
      { step: 'On The Way', time: '10:10 AM', done: true },
      { step: 'Picked Up', time: '10:15 AM', done: true },
      { step: 'Sorting', time: '10:25 AM', done: true },
      { step: 'Delivered', time: '10:40 AM', done: true },
    ],
  },
  {
    id: 'PKP-102',
    binId: 'BIN-TN-02',
    wasteType: 'organic',
    status: 'Sorting',
    truckId: 'TRK-01',
    etaMinutes: 12,
    createdAt: 'Today, 11:15 AM',
    address: 'Pondy Bazaar Market, T. Nagar',
    weightKg: 35.0,
    userNote: 'Vegetable peelings and compostable leaves',
    timeline: [
      { step: 'Requested', time: '11:15 AM', done: true },
      { step: 'Assigned', time: '11:20 AM', done: true },
      { step: 'On The Way', time: '11:25 AM', done: true },
      { step: 'Picked Up', time: '11:30 AM', done: true },
      { step: 'Sorting', time: '11:45 AM', done: true, active: true },
      { step: 'Delivered', time: 'Pending', done: false },
    ],
  },
  {
    id: 'PKP-103',
    binId: 'BIN-VEL-01',
    wasteType: 'plastic',
    status: 'OnTheWay',
    truckId: 'TRK-04',
    etaMinutes: 6,
    createdAt: 'Today, 01:30 PM',
    address: 'Phoenix Mall Gate, Velachery',
    weightKg: 42.0,
    userNote: 'High volume mall plastics',
    timeline: [
      { step: 'Requested', time: '01:30 PM', done: true },
      { step: 'Assigned', time: '01:35 PM', done: true },
      { step: 'On The Way', time: '01:40 PM', done: true, active: true },
      { step: 'Picked Up', time: 'Pending', done: false },
      { step: 'Sorting', time: 'Pending', done: false },
      { step: 'Delivered', time: 'Pending', done: false },
    ],
  },
];

interface PickupsState {
  pickups: Pickup[];
  activePickupId: string | null;
  setActivePickupId: (id: string | null) => void;
  addPickup: (pickup: Pickup) => void;
  updatePickupStatus: (id: string, status: PickupStatus, etaMinutes?: number) => void;
  cancelPickup: (id: string) => void;
  resetPickups: () => void;
}

export const usePickupsStore = create<PickupsState>()(
  persist(
    (set) => ({
      pickups: INITIAL_PICKUPS,
      activePickupId: 'PKP-103',
      setActivePickupId: (id) => set({ activePickupId: id }),
      addPickup: (pickup) =>
        set((state) => ({
          pickups: [pickup, ...state.pickups],
          activePickupId: pickup.id,
        })),
      updatePickupStatus: (id, status, etaMinutes) =>
        set((state) => {
          const steps = ['Requested', 'Assigned', 'OnTheWay', 'PickedUp', 'Sorting', 'Delivered'];
          const currentIndex = steps.indexOf(status);

          return {
            pickups: state.pickups.map((p) => {
              if (p.id !== id) return p;
              const newTimeline = p.timeline.map((item) => {
                const stepIdx = steps.indexOf(item.step.replace(/\s+/g, ''));
                return {
                  ...item,
                  done: stepIdx <= currentIndex,
                  active: stepIdx === currentIndex,
                  time: stepIdx <= currentIndex && item.time === 'Pending' ? 'Just now' : item.time,
                };
              });
              return {
                ...p,
                status,
                etaMinutes: etaMinutes !== undefined ? etaMinutes : p.etaMinutes,
                timeline: newTimeline,
              };
            }),
          };
        }),
      cancelPickup: (id) =>
        set((state) => ({
          pickups: state.pickups.filter((p) => p.id !== id),
          activePickupId: state.activePickupId === id ? null : state.activePickupId,
        })),
      resetPickups: () => set({ pickups: INITIAL_PICKUPS, activePickupId: 'PKP-103' }),
    }),
    {
      name: 'mycop_pickups',
    }
  )
);
