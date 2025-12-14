import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;

  // Profile preferences
  languages: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  issueTypes: string[];
  dailyGoal: number;

  // Metadata
  onboardingComplete: boolean;
  createdAt: string;
}

interface UserStore {
  user: UserProfile | null;
  isAuthenticated: boolean;

  setUser: (user: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),

      completeOnboarding: () => set((state) => ({
        user: state.user ? { ...state.user, onboardingComplete: true } : null,
      })),

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'promance-user',
    }
  )
);
