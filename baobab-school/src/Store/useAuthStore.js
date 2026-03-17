import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      user: null,
      isAuthenticated: false,
      theme: 'light', // Default theme
      _hasHydrated: false, // Internal flag to check if data is loaded

      // --- Auth Actions ---
      login: (student) => {
        set({ 
          user: student, 
          isAuthenticated: true 
        });
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
        // Optional: Clear specific local storage if needed
        localStorage.removeItem('baobab-auth-storage');
      },

      // --- Theme Actions ---
      setTheme: (newTheme) => {
        set({ theme: newTheme });
        // Physically toggle the 'dark' class on the HTML root
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(nextTheme);
      },

      // --- Persistence Helper ---
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'baobab-auth-storage', // Key in LocalStorage
      onRehydrateStorage: () => (state) => {
        // When the app starts, check the saved theme and apply it to the DOM
        if (state) {
          state.setHasHydrated(true);
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        }
      },
    }
  )
);

export default useAuthStore;