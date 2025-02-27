import { create } from "zustand";

export const useThemeStore = create((set) => ({
  currentTheme: localStorage.getItem("pref-theme") || "forest",

  setCurrentTheme: (currentTheme) => {
    localStorage.setItem("pref-theme", currentTheme);
    set({ currentTheme });
  },
}));
