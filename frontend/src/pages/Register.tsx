import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useThemeStore } from '../store/themeStore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { colors } = useThemeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await authApi.register({ email, password, name });
      setSuccess(true);
      // 2 saniye sonra giriş sayfasına yönlendir
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Kayıt başarısız';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Lofi Kafe Sahnesi - Arka Plan (Sade Versiyon) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gece gökyüzü gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #1a0d2e 0%, #2d1b4e 50%, #1a0d2e 100%)`
          }}
        />

        {/* Yıldızlar - Daha az sayıda */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pixel-glow"
            style={{
              left: `${(i * 10) % 100}%`,
              top: `${(i * 8) % 70}%`,
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 3px #FFFFFF`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 2)}s`
            }}
          />
        ))}

        {/* Neon Binalar - Sade versiyon (Sağ Taraf) */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-50">
          {/* Bina 1 */}
          <div 
            className="absolute bottom-0 right-0 w-24 h-48"
            style={{
              backgroundColor: '#2d1b4e',
              clipPath: 'polygon(100% 100%, 100% 40%, 90% 35%, 90% 100%)',
            }}
          />
          {/* Bina 2 */}
          <div 
            className="absolute bottom-0 right-24 w-28 h-56"
            style={{
              backgroundColor: '#1a0d2e',
              clipPath: 'polygon(100% 100%, 100% 45%, 92% 40%, 92% 100%)',
            }}
          />

          {/* Neon Pencereler - Daha az sayıda */}
          {[...Array(6)].map((_, i) => {
            const positions = [
              { right: '10%', bottom: '45%' },
              { right: '10%', bottom: '60%' },
              { right: '30%', bottom: '40%' },
              { right: '30%', bottom: '55%' },
              { right: '30%', bottom: '70%' },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={`window-${i}`}
                className="absolute w-2 h-3 animate-pixel-glow"
                style={{
                  ...pos,
                  backgroundColor: i % 2 === 0 ? '#00E5FF' : '#FF1744',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#00E5FF' : '#FF1744'}`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '3s'
                }}
              />
            );
          })}
        </div>

        {/* İç Mekan - Sol Taraf (Sade) */}
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-40">
          {/* Masa */}
          <div 
            className="absolute bottom-16 left-8 w-32 h-20 rounded-lg"
            style={{
              backgroundColor: '#8B4513',
            }}
          />
          
          {/* Laptop */}
          <div 
            className="absolute bottom-24 left-12 w-24 h-14 rounded-sm"
            style={{
              backgroundColor: '#C0C0C0',
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full h-3/4 rounded-t-sm"
              style={{
                backgroundColor: '#E8E8E8',
              }}
            />
          </div>
        </div>

        {/* Neon Şeritler - Çok az sayıda */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`neon-stripe-${i}`}
            className="absolute animate-pixel-slide"
            style={{
              left: `${20 + i * 40}%`,
              top: `${30 + i * 20}%`,
              width: '150px',
              height: '2px',
              backgroundColor: i === 0 ? colors.primary : colors.secondary,
              opacity: 0.2,
              animationDelay: `${i * 1}s`,
              animationDuration: '10s',
            }}
          />
        ))}
      </div>

      {/* Ana İçerik - Form */}
      <div 
        className="max-w-md w-full space-y-8 animate-fadeInUp relative z-10 backdrop-blur-md rounded-3xl p-8 border-4"
        style={{ 
          backgroundColor: `${colors.card}95`,
          borderColor: colors.border,
          boxShadow: `0 8px 32px ${colors.primary}40`
        }}
      >
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 
              className="text-4xl font-black"
              style={{ 
                color: colors.text,
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              MyTask
            </h1>
          </div>

          <h2 
            className="text-2xl font-extrabold mb-2"
            style={{ 
              color: colors.text,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Yeni hesap oluşturun
          </h2>
          <p 
            className="text-sm"
            style={{ 
              color: colors.text,
              opacity: 0.7,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Lofi dünyasına katılın ✨
          </p>
        </div>

        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          {success && (
            <div 
              className="px-4 py-3 rounded-2xl border-3"
              style={{
                backgroundColor: `${colors.secondary}20`,
                borderColor: colors.secondary,
                color: colors.text,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
            </div>
          )}
          {error && (
            <div 
              className="px-4 py-3 rounded-2xl border-3"
              style={{
                backgroundColor: `${colors.accent}20`,
                borderColor: colors.accent,
                color: colors.text,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: colors.text,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Ad (İsteğe bağlı)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-3 rounded-2xl border-3 focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Adınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: colors.text,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-2xl border-3 focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: colors.text,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Şifre (en az 6 karakter)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-2xl border-3 focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-pixel-bounce mr-2">⚡</span>
                  Kayıt yapılıyor...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span>
                  Kayıt ol
                </span>
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium transition-all hover:underline inline-flex items-center"
              style={{ 
                color: colors.primary,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              <span className="mr-1">💫</span>
              Zaten hesabınız var mı? Giriş yapın
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
