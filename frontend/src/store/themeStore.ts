import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  border: string;
}

// Sadece koyu tema - giriş sayfasındaki gibi
const darkTheme: ThemeColors = {
  primary: '#8B7FA8', // Soft mor-lavanta
  secondary: '#A8C5D1', // Soft mavi
  accent: '#D4A5A5', // Soft pembe
  background: '#0a0a0a', // Çok koyu siyah
  card: '#1a1a1a', // Koyu gri
  text: '#f5f5f5', // Açık gri-beyaz
  border: '#333333' // Koyu gri border
};

interface ThemeState {
  colors: ThemeColors;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    () => ({
      colors: darkTheme,
    }),
    {
      name: 'theme-storage',
    }
  )
);

