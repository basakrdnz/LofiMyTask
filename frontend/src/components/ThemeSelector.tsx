import { useThemeStore, Theme } from '../store/themeStore';

export default function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  const themes: { value: Theme; label: string; emoji: string }[] = [
    { value: 'library', label: 'Kütüphane', emoji: '📚' },
    { value: 'notebook', label: 'Not Defteri', emoji: '📓' },
    { value: 'playful', label: 'Eğlenceli', emoji: '🎨' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-md">
      <span className="text-sm font-medium text-gray-700">Tema:</span>
      <div className="flex space-x-1">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              theme === t.value
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={t.label}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

