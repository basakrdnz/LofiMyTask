import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const navigate = useNavigate();
  const { colors } = useThemeStore();
  const { token } = useAuthStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Lofi müzik URL'leri (ücretsiz lofi müzik kaynakları)
  const lofiMusicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Örnek - gerçek lofi müzik URL'i ile değiştirilebilir

  useEffect(() => {
    // Sayfa yüklendiğinde müziği başlat
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Düşük ses seviyesi
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Lofi Müzik */}
      <audio ref={audioRef} src={lofiMusicUrl} preload="auto" />

      {/* Lofi Kafe Sahnesi - Arka Plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gece gökyüzü gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #1a0d2e 0%, #2d1b4e 50%, #1a0d2e 100%)`
          }}
        />

        {/* Yıldızlar */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pixel-glow"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 5) % 80}%`,
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 4px #FFFFFF`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}

        {/* Neon Binalar (Arka Plan - Sağ Taraf) */}
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3">
          {/* Bina 1 - Sağ */}
          <div 
            className="absolute bottom-0 right-0 w-32 h-64 opacity-70"
            style={{
              backgroundColor: '#2d1b4e',
              clipPath: 'polygon(100% 100%, 100% 35%, 85% 30%, 85% 100%)',
              boxShadow: `0 0 30px ${colors.primary}40`
            }}
          />
          {/* Bina 2 - Sağ Orta */}
          <div 
            className="absolute bottom-0 right-32 w-36 h-80 opacity-70"
            style={{
              backgroundColor: '#1a0d2e',
              clipPath: 'polygon(100% 100%, 100% 40%, 90% 35%, 90% 100%)',
              boxShadow: `0 0 30px ${colors.secondary}40`
            }}
          />
          {/* Bina 3 - Sağ Uzak */}
          <div 
            className="absolute bottom-0 right-68 w-28 h-72 opacity-70"
            style={{
              backgroundColor: '#2d1b4e',
              clipPath: 'polygon(100% 100%, 100% 45%, 88% 40%, 88% 100%)',
              boxShadow: `0 0 30px ${colors.accent}40`
            }}
          />

          {/* Neon Pencereler - Yanıp Sönen */}
          {[...Array(18)].map((_, i) => {
            const positions = [
              { right: '8%', bottom: '40%' },
              { right: '8%', bottom: '55%' },
              { right: '8%', bottom: '70%' },
              { right: '25%', bottom: '35%' },
              { right: '25%', bottom: '50%' },
              { right: '25%', bottom: '65%' },
              { right: '25%', bottom: '80%' },
              { right: '45%', bottom: '30%' },
              { right: '45%', bottom: '45%' },
              { right: '45%', bottom: '60%' },
              { right: '45%', bottom: '75%' },
              { right: '65%', bottom: '25%' },
              { right: '65%', bottom: '40%' },
              { right: '65%', bottom: '55%' },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={`window-${i}`}
                className="absolute w-3 h-4 animate-pixel-glow"
                style={{
                  ...pos,
                  backgroundColor: i % 3 === 0 ? '#FF1744' : i % 3 === 1 ? '#00E5FF' : '#E91E63',
                  boxShadow: `0 0 12px ${i % 3 === 0 ? '#FF1744' : i % 3 === 1 ? '#00E5FF' : '#E91E63'}`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}
              />
            );
          })}

          {/* Neon Tabelalar - Hareketli Glow */}
          <div 
            className="absolute bottom-1/3 right-20 w-24 h-8 flex items-center justify-center animate-pixel-glow"
            style={{
              backgroundColor: '#00E5FF',
              boxShadow: `0 0 20px #00E5FF`,
              animationDuration: '2s'
            }}
          >
            <span className="text-xs font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>MARKET</span>
          </div>
          <div 
            className="absolute bottom-1/4 right-48 w-20 h-6 flex items-center justify-center animate-pixel-glow"
            style={{
              backgroundColor: '#FF1744',
              boxShadow: `0 0 20px #FF1744`,
              animationDuration: '2.5s',
              animationDelay: '0.5s'
            }}
          >
            <span className="text-xs font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>BURGER</span>
          </div>
          <div 
            className="absolute bottom-1/5 right-72 w-28 h-7 flex items-center justify-center animate-pixel-glow"
            style={{
              backgroundColor: '#E91E63',
              boxShadow: `0 0 20px #E91E63`,
              animationDuration: '3s',
              animationDelay: '1s'
            }}
          >
            <span className="text-xs font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>YAKINIKU</span>
          </div>
        </div>

        {/* İç Mekan - Sol Taraf (Kafe) */}
        <div className="absolute bottom-0 left-0 w-1/3 h-3/4">
          {/* Masa */}
          <div 
            className="absolute bottom-20 left-10 w-48 h-32 rounded-lg"
            style={{
              backgroundColor: '#8B4513',
              boxShadow: `0 4px 20px rgba(0,0,0,0.3)`
            }}
          />
          
          {/* Laptop (Masa Üstünde) */}
          <div 
            className="absolute bottom-32 left-16 w-32 h-20 rounded-sm"
            style={{
              backgroundColor: '#C0C0C0',
              boxShadow: `0 0 15px ${colors.primary}60`
            }}
          >
            {/* Laptop Ekran */}
            <div 
              className="absolute top-0 left-0 w-full h-3/4 rounded-t-sm animate-pixel-glow"
              style={{
                backgroundColor: '#E8E8E8',
                boxShadow: `inset 0 0 10px rgba(0,0,0,0.2), 0 0 20px ${colors.primary}40`,
                animationDuration: '3s'
              }}
            />
          </div>

          {/* Sandalye */}
          <div 
            className="absolute bottom-20 left-8 w-12 h-16"
            style={{
              backgroundColor: '#FF1744',
              clipPath: 'polygon(0% 100%, 0% 60%, 20% 50%, 20% 0%, 80% 0%, 80% 50%, 100% 60%, 100% 100%)',
              boxShadow: `0 4px 15px rgba(255,23,68,0.4)`
            }}
          />

          {/* Bitki (Sol Köşe) */}
          <div 
            className="absolute bottom-0 left-0 w-16 h-24"
            style={{
              backgroundColor: '#4A148C',
              clipPath: 'polygon(50% 0%, 30% 30%, 20% 60%, 40% 80%, 60% 80%, 80% 60%, 70% 30%)',
              opacity: 0.8
            }}
          />

          {/* Asılı Lambalar - Yanıp Sönen */}
          <div 
            className="absolute top-20 left-1/2 w-8 h-12 rounded-full animate-pixel-glow"
            style={{
              backgroundColor: '#FF1744',
              clipPath: 'ellipse(50% 100% at 50% 0%)',
              boxShadow: `0 0 25px #FF1744`,
              animationDuration: '3s'
            }}
          />
          <div 
            className="absolute top-20 right-10 w-8 h-12 rounded-full animate-pixel-glow"
            style={{
              backgroundColor: '#00E5FF',
              clipPath: 'ellipse(50% 100% at 50% 0%)',
              boxShadow: `0 0 25px #00E5FF`,
              animationDuration: '2.5s',
              animationDelay: '1s'
            }}
          />
        </div>

        {/* Neon Şeritler - Hareketli */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`neon-stripe-${i}`}
            className="absolute animate-pixel-slide"
            style={{
              left: `${(i * 18) % 100}%`,
              top: `${20 + (i * 12)}%`,
              width: '200px',
              height: '3px',
              backgroundColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
              opacity: 0.4,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
              boxShadow: `0 0 20px ${i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent}80`
            }}
          />
        ))}
      </div>

      {/* İçerik - Ortada */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fadeInUp">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 
              className="text-6xl md:text-7xl font-black mb-4 animate-slideInDown"
              style={{ 
                color: colors.text,
                textShadow: `0 0 30px ${colors.primary}60`,
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              MyTask
            </h1>
            <p 
              className="text-xl md:text-2xl font-light"
              style={{ 
                color: colors.text,
                opacity: 0.9,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Notlarınız ve görevleriniz için
              <br />
              <span className="font-semibold" style={{ color: colors.primary }}>
                lofi bir alan
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {token ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 rounded-3xl font-bold text-lg transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse-slow"
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow: `0 0 30px ${colors.primary}60`
                }}
              >
                Dashboard'a Git →
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 rounded-3xl font-bold text-lg transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse-slow"
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: `0 0 30px ${colors.primary}60`
                  }}
                >
                  Başlayalım →
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 rounded-3xl font-bold text-lg transform hover:scale-110 transition-all duration-300 border-4"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: colors.primary,
                    color: colors.primary,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Hesap Oluştur
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Müzik Kontrol Butonu */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-xl z-50 border-3"
        style={{
          backgroundColor: colors.primary,
          color: 'white',
          boxShadow: `0 0 20px ${colors.primary}60`
        }}
        title={isPlaying ? 'Müziği Durdur' : 'Müziği Başlat'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
}
