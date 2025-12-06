import { useThemeStore } from '../store/themeStore';

export default function LoadingScreen() {
  const { colors } = useThemeStore();
  
  // Safe colors fallback - koyu tema
  const safeColors = colors || {
    primary: '#8B7FA8',
    secondary: '#A8C5D1',
    accent: '#D4A5A5',
    background: '#0a0a0a',
    card: '#1a1a1a',
    text: '#f5f5f5',
    border: '#333333'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        backgroundColor: safeColors.background,
        background: `linear-gradient(135deg, ${safeColors.background} 0%, ${safeColors.card} 100%)`
      }}
    >
      <div className="text-center">
        {/* Minimal Spinner */}
        <div className="mb-6">
          <div className="relative w-12 h-12 mx-auto">
            <div 
              className="absolute inset-0 border-2 rounded-full border-t-transparent animate-spin"
              style={{
                borderColor: safeColors.primary,
                borderTopColor: 'transparent'
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <p 
          className="text-sm font-medium"
          style={{ 
            color: safeColors.text,
            opacity: 0.6
          }}
        >
          Yükleniyor...
        </p>
      </div>
    </div>
  );
}

