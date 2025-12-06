import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'library' | 'notebook' | 'playful';

// 'library' teması artık lofi gece kafe teması

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  border: string;
}

const themes: Record<Theme, ThemeColors> = {
  library: {
    primary: '#8B7FA8', // Soft mor-lavanta (sade, pazarlanabilir)
    secondary: '#A8C5D1', // Soft mavi (sakin, profesyonel)
    accent: '#D4A5A5', // Soft pembe (warm, friendly)
    background: '#F5F5F5', // Açık gri-beyaz (temiz, minimal)
    card: '#FFFFFF', // Beyaz (modern, sade)
    text: '#2D2D2D', // Koyu gri (okunabilir, profesyonel)
    border: '#E0E0E0' // Açık gri (subtle, minimal)
  },
  notebook: {
    primary: '#42A5F5', // Yumuşak mavi
    secondary: '#81D4FA', // Açık mavi
    accent: '#FF8A65', // Yumuşak turuncu
    background: '#E3F2FD', // Açık mavi
    card: '#FFFFFF', // Beyaz
    text: '#1565C0', // Koyu mavi
    border: '#42A5F5' // Daha belirgin mavi (yoğun)
  },
  playful: {
    primary: '#F06292', // Yumuşak pembe
    secondary: '#F8BBD0', // Açık pembe
    accent: '#CE93D8', // Yumuşak mor
    background: '#FCE4EC', // Açık pembe
    card: '#FFF0F5', // Çok açık pembe
    text: '#880E4F', // Koyu pembe
    border: '#F06292' // Daha belirgin pembe (yoğun)
  }
};

interface ThemeState {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'library',
      colors: themes.library,
      setTheme: (theme) => set({ theme, colors: themes[theme] }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

