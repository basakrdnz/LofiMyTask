import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import LoadingScreen from '../components/LoadingScreen';

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  
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
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kısa bir delay ile loading göster (smooth transition için)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center py-12 px-4"
      style={{ 
        background: `linear-gradient(135deg, ${safeColors.background} 0%, ${safeColors.card} 100%)`
      }}
    >
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ana İçerik */}
      <div className="relative z-10 max-w-2xl w-full px-6 text-center">
        {/* Hoşgeldin Mesajı */}
        <div className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-semibold mb-3"
            style={{ 
              color: safeColors.text
            }}
          >
            Hoşgeldin{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p 
            className="text-base md:text-lg"
            style={{ 
              color: safeColors.text,
              opacity: 0.6
            }}
          >
            MyTask'a hoş geldin! İşte yapabileceklerin:
          </p>
        </div>

        {/* Özellikler Kartı */}
        <div 
          className="mb-8 p-8 rounded-2xl shadow-lg border"
          style={{
            backgroundColor: safeColors.card,
            borderColor: safeColors.border
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">
              {features[currentFeature].icon}
            </div>
            <h2 
              className="text-xl md:text-2xl font-semibold mb-2"
              style={{ 
                color: safeColors.text
              }}
            >
              {features[currentFeature].title}
            </h2>
            <p 
              className="text-sm md:text-base"
              style={{ 
                color: safeColors.text,
                opacity: 0.7
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
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentFeature ? safeColors.primary : safeColors.border,
                  opacity: index === currentFeature ? 1 : 0.4
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
              className="p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md"
              onClick={() => setCurrentFeature(index)}
              style={{
                backgroundColor: index === currentFeature ? safeColors.primary + '10' : safeColors.card,
                borderColor: index === currentFeature ? safeColors.primary : safeColors.border
              }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div 
                className="text-sm font-medium"
                style={{ 
                  color: safeColors.text
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
          className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 shadow-sm"
          style={{
            backgroundColor: safeColors.primary
          }}
        >
          Başlayalım
        </button>
      </div>
    </div>
  );
}

