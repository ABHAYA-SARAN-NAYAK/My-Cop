import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';
import { DEMO_USERS } from '../data/seed';

interface AuthState {
  user: User;
  role: Role;
  loginAs: (role: Role) => void;
  updateUser: (fields: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEMO_USERS.generator,
      role: 'generator',
      loginAs: (role: Role) => {
        const selected = DEMO_USERS[role] || DEMO_USERS.generator;
        set({ user: selected, role: selected.role });
      },
      updateUser: (fields) =>
        set((state) => ({
          user: { ...state.user, ...fields },
        })),
      logout: () => {
        set({ user: DEMO_USERS.generator, role: 'generator' });
      },
    }),
    {
      name: 'mycop_auth',
    }
  )
);
