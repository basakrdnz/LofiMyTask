import { useThemeStore } from '../store/themeStore';

export default function LoadingScreen() {
  const { colors } = useThemeStore();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      {/* Lofi Gece Kafe Loading Arka Plan */}
      <div className="absolute inset-0">
        {/* Gece gökyüzü */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #1a0d2e 0%, #2d1b4e 50%, #1a0d2e 100%)`
          }}
        />

        {/* Yıldızlar */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pixel-glow"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 5) % 100}%`,
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 4px #FFFFFF`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}

        {/* Neon şeritler */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pixel-slide"
            style={{
              left: `${(i * 25) % 100}%`,
              top: `${30 + (i * 15)}%`,
              width: '150px',
              height: '3px',
              backgroundColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
              opacity: 0.3,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '6s',
              boxShadow: `0 0 15px ${i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent}60`
            }}
          />
        ))}
      </div>

      {/* Loading İçeriği */}
      <div className="relative z-10 text-center">
        {/* Pixel Logo Animasyonu */}
        <div className="mb-8 animate-pixel-bounce">
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ imageRendering: 'pixelated' }}>
            {/* Pixel not defteri */}
            <rect x="15" y="10" width="50" height="60" fill={colors.primary} stroke={colors.text} strokeWidth="2" />
            <rect x="15" y="10" width="10" height="60" fill={colors.secondary} />
            <line x1="25" y1="10" x2="25" y2="70" stroke={colors.text} strokeWidth="2" />
            {/* Pixel çizgiler */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="30"
                y1={18 + i * 7}
                x2="60"
                y2={18 + i * 7}
                stroke={colors.text}
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
            {/* Pixel kalem */}
            <rect x="58" y="15" width="5" height="25" fill={colors.accent} />
            <polygon points="58,15 63,15 60.5,10" fill={colors.accent} />
          </svg>
        </div>

        {/* Loading Text */}
        <h2 
          className="text-3xl font-black mb-4 animate-pixel-glow"
          style={{ 
            color: colors.text,
            fontFamily: "'Poppins', sans-serif",
            textShadow: `0 0 20px ${colors.primary}60`
          }}
        >
          MyTask
        </h2>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-pixel-bounce"
              style={{
                backgroundColor: colors.primary,
                animationDelay: `${i * 0.2}s`,
                boxShadow: `0 0 10px ${colors.primary}`
              }}
            />
          ))}
        </div>

        {/* Loading Bar */}
        <div className="mt-8 w-64 mx-auto h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.card }}>
          <div
            className="h-full rounded-full animate-loading-bar"
            style={{
              width: '100%',
              backgroundColor: colors.primary,
              boxShadow: `0 0 10px ${colors.primary}`
            }}
          />
        </div>
      </div>
    </div>
  );
}

