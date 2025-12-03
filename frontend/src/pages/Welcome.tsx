import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: '📝',
      title: 'Notlarınızı Kaydedin',
      description: 'Düşüncelerinizi, fikirlerinizi ve önemli bilgilerinizi not alın'
    },
    {
      icon: '✅',
      title: 'Görevlerinizi Yönetin',
      description: 'Deadline\'larınızı belirleyin ve görevlerinizi tamamlayın'
    },
    {
      icon: '📅',
      title: 'Takvimde Görün',
      description: 'Tüm görevlerinizi takvim görünümünde görüntüleyin'
    },
    {
      icon: '⭐',
      title: 'Yıldızlar Kazanın',
      description: 'Tamamladığınız görevler için yıldızlar toplayın'
    }
  ];

  useEffect(() => {
    // Özellikler arasında otomatik geçiş
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      {/* Lofi Gece Kafe Arka Plan */}
      <div className="absolute inset-0">
        {/* Gece gökyüzü gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #1a0d2e 0%, #2d1b4e 50%, #1a0d2e 100%)`
          }}
        />

        {/* Neon binalar (arka plan) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          {/* Bina 1 */}
          <div 
            className="absolute bottom-0 left-0 w-32 h-64 opacity-80"
            style={{
              backgroundColor: '#2d1b4e',
              clipPath: 'polygon(0% 100%, 0% 40%, 20% 30%, 20% 100%)',
              boxShadow: `0 0 30px ${colors.primary}40`
            }}
          />
          {/* Bina 2 */}
          <div 
            className="absolute bottom-0 left-32 w-40 h-80 opacity-80"
            style={{
              backgroundColor: '#1a0d2e',
              clipPath: 'polygon(0% 100%, 0% 50%, 15% 45%, 15% 100%)',
              boxShadow: `0 0 30px ${colors.secondary}40`
            }}
          />
          {/* Bina 3 */}
          <div 
            className="absolute bottom-0 right-32 w-36 h-72 opacity-80"
            style={{
              backgroundColor: '#2d1b4e',
              clipPath: 'polygon(100% 100%, 100% 35%, 85% 30%, 85% 100%)',
              boxShadow: `0 0 30px ${colors.accent}40`
            }}
          />
          {/* Bina 4 */}
          <div 
            className="absolute bottom-0 right-0 w-28 h-56 opacity-80"
            style={{
              backgroundColor: '#1a0d2e',
              clipPath: 'polygon(100% 100%, 100% 45%, 90% 40%, 90% 100%)',
              boxShadow: `0 0 30px ${colors.primary}40`
            }}
          />

          {/* Neon pencereler */}
          {[...Array(12)].map((_, i) => {
            const positions = [
              { left: '8%', bottom: '45%' },
              { left: '8%', bottom: '60%' },
              { left: '25%', bottom: '35%' },
              { left: '25%', bottom: '50%' },
              { left: '25%', bottom: '65%' },
              { left: '70%', bottom: '40%' },
              { left: '70%', bottom: '55%' },
              { left: '70%', bottom: '70%' },
              { left: '88%', bottom: '50%' },
              { left: '88%', bottom: '65%' },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={i}
                className="absolute w-3 h-4 animate-pulse-slow"
                style={{
                  ...pos,
                  backgroundColor: i % 3 === 0 ? '#FF1744' : i % 3 === 1 ? '#00E5FF' : '#E91E63',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#FF1744' : i % 3 === 1 ? '#00E5FF' : '#E91E63'}`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            );
          })}
        </div>

        {/* Neon şeritler (hareketli) */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pixel-slide"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${20 + (i * 12)}%`,
              width: '200px',
              height: '4px',
              backgroundColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
              opacity: 0.4,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
              boxShadow: `0 0 20px ${i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent}80`
            }}
          />
        ))}

        {/* Yıldızlar */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pixel-glow"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 5) % 50}%`,
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 4px #FFFFFF`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Ana İçerik */}
      <div className="relative z-10 max-w-2xl w-full px-6 text-center">
        {/* Hoşgeldin Mesajı */}
        <div className="mb-8 animate-fadeInUp">
          <h1 
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ 
              color: colors.text,
              fontFamily: "'Poppins', sans-serif",
              textShadow: `0 0 30px ${colors.primary}60`
            }}
          >
            Hoşgeldin{user?.name ? `, ${user.name}` : ''}! 👋
          </h1>
          <p 
            className="text-xl md:text-2xl font-light"
            style={{ 
              color: colors.text,
              opacity: 0.9,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            MyTask'a hoş geldin! İşte yapabileceklerin:
          </p>
        </div>

        {/* Özellikler Kartı */}
        <div 
          className="mb-8 p-8 rounded-3xl backdrop-blur-sm border-4 animate-fadeInUp"
          style={{
            backgroundColor: `${colors.card}90`,
            borderColor: colors.primary + '40',
            boxShadow: `0 8px 32px ${colors.primary}30`
          }}
        >
          <div className="flex flex-col items-center">
            <div 
              className="text-6xl mb-4 animate-pixel-bounce"
              style={{ animationDelay: `${currentFeature * 0.1}s` }}
            >
              {features[currentFeature].icon}
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ 
                color: colors.text,
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              {features[currentFeature].title}
            </h2>
            <p 
              className="text-base md:text-lg"
              style={{ 
                color: colors.text,
                opacity: 0.8,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {features[currentFeature].description}
            </p>
          </div>

          {/* Özellik göstergeleri */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentFeature ? colors.primary : colors.border,
                  transform: index === currentFeature ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: index === currentFeature ? `0 0 10px ${colors.primary}` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Tüm Özellikler Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border-3 transition-all transform hover:scale-105 cursor-pointer ${
                index === currentFeature ? 'animate-pixel-glow' : ''
              }`}
              onClick={() => setCurrentFeature(index)}
              style={{
                backgroundColor: index === currentFeature ? `${colors.primary}20` : `${colors.card}60`,
                borderColor: index === currentFeature ? colors.primary : colors.border,
                boxShadow: index === currentFeature ? `0 0 20px ${colors.primary}40` : 'none'
              }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div 
                className="text-sm font-semibold"
                style={{ 
                  color: colors.text,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                {feature.title.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Başla Butonu */}
        <button
          onClick={() => navigate('/dashboard')}
          className="px-10 py-4 rounded-3xl font-bold text-xl transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse-slow"
          style={{
            backgroundColor: colors.primary,
            color: 'white',
            fontFamily: "'Poppins', sans-serif",
            boxShadow: `0 0 30px ${colors.primary}60`
          }}
        >
          Başlayalım! 🚀
        </button>
      </div>
    </div>
  );
}

