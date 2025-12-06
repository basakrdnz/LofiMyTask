import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import ColorBends from '../components/ColorBends';

export default function Home() {
  const navigate = useNavigate();
  const { colors } = useThemeStore();
  const { token, user } = useAuthStore();
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

  // Safe colors fallback
  const safeColors = colors || {
    primary: '#8B7FA8',
    secondary: '#A8C5D1',
    accent: '#D4A5A5',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#2D2D2D',
    border: '#E0E0E0'
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Lofi Müzik */}
      <audio ref={audioRef} src={lofiMusicUrl} preload="auto" />

      {/* ReactBits Color Bends Background */}
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#000000' }}>
        {/* ColorBends Component - Çok parlak ve belirgin renkler */}
        <ColorBends
          className="absolute inset-0"
          colors={['#a855f7', '#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent={false}
        />
      </div>

      {/* Hoşgeldin Mesajı - Sol Üst (Eğer giriş yapılmışsa) */}
      {token && user && (
        <div className="absolute top-6 left-6 z-20">
          <p 
            className="text-lg md:text-xl font-semibold"
            style={{ 
              color: '#FFFFFF'
            }}
          >
            Hoşgeldin{user.name ? `, ${user.name}` : ''}!
          </p>
        </div>
      )}

      {/* İçerik - Ortada */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 
              className="text-5xl md:text-6xl font-semibold mb-4"
              style={{ 
                color: '#FFFFFF'
              }}
            >
              MyTask
            </h1>
            <p 
              className="text-lg md:text-xl"
              style={{ 
                color: '#FFFFFF',
                opacity: 0.8
              }}
            >
              Notlarınız ve görevleriniz için
              <br />
              <span className="font-medium" style={{ color: safeColors.primary }}>
                minimal bir alan
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {token ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 shadow-sm"
                style={{
                  backgroundColor: safeColors.primary
                }}
              >
                Dashboard'a Git
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 shadow-sm"
                  style={{
                    backgroundColor: safeColors.primary
                  }}
                >
                  Başlayalım
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 rounded-lg font-medium transition-all hover:opacity-90 border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: safeColors.primary,
                    color: safeColors.primary
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
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:opacity-90 shadow-sm z-50"
        style={{
          backgroundColor: safeColors.primary,
          color: 'white'
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
