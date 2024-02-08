import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set({
          isDarkMode: !get().isDarkMode
        })
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ...state })
    }
  )
);
