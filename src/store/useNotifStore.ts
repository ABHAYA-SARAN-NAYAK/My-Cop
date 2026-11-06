import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '../types';
import { SEED_NOTIFICATIONS } from '../data/seed';

interface NotifState {
  notifications: Notification[];
  addNotif: (notif: Omit<Notification, 'id' | 'read' | 'time'> & { time?: string }) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  deleteNotif: (id: string) => void;
  resetNotifs: () => void;
}

export const useNotifStore = create<NotifState>()(
  persist(
    (set) => ({
      notifications: SEED_NOTIFICATIONS,
      addNotif: (notif) => {
        const item: Notification = {
          id: `notif-${Date.now()}`,
          type: notif.type,
          title: notif.title,
          body: notif.body,
          time: notif.time || 'Just now',
          read: false,
        };
        set((state) => ({
          notifications: [item, ...state.notifications],
        }));
      },
      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearAll: () => set({ notifications: [] }),
      deleteNotif: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      resetNotifs: () => set({ notifications: SEED_NOTIFICATIONS }),
    }),
    {
      name: 'mycop_notifs',
    }
  )
);
