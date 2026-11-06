import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'dark' | 'light';
  presenterOpen: boolean;
  offlineFallback: boolean;
  sidebarCollapsed: boolean;
  narratorCaption: string | null;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  togglePresenter: () => void;
  setPresenterOpen: (open: boolean) => void;
  toggleOfflineFallback: () => void;
  setOfflineFallback: (val: boolean) => void;
  toggleSidebar: () => void;
  setNarratorCaption: (text: string | null) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      presenterOpen: false,
      offlineFallback: false,
      sidebarCollapsed: false,
      narratorCaption: null,
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          if (next === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
          } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
          }
          return { theme: next };
        }),
      setTheme: (theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },
      togglePresenter: () => set((state) => ({ presenterOpen: !state.presenterOpen })),
      setPresenterOpen: (presenterOpen) => set({ presenterOpen }),
      toggleOfflineFallback: () => set((state) => ({ offlineFallback: !state.offlineFallback })),
      setOfflineFallback: (offlineFallback) => set({ offlineFallback }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setNarratorCaption: (narratorCaption) => set({ narratorCaption }),
    }),
    {
      name: 'mycop_ui',
      partialize: (state) => ({ theme: state.theme, offlineFallback: state.offlineFallback }),
    }
  )
);
