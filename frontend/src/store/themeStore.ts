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
    primary: '#BA68C8', // Yumuşak mor (daha tatlış)
    secondary: '#4DD0E1', // Yumuşak turkuaz (daha uyumlu)
    accent: '#FF6B9D', // Yumuşak pembe-kırmızı (daha tatlış)
    background: '#1a0d2e', // Koyu mor (Gece gökyüzü)
    card: '#2d1b4e', // Orta mor (Bina)
    text: '#F3E5F5', // Çok açık mor (Metin - daha yumuşak)
    border: '#9C27B0' // Daha belirgin mor (Kenarlık - yoğun)
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

