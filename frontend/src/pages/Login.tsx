import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import LoadingScreen from '../components/LoadingScreen';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      setAuth(response.user, response.token);
      // Welcome sayfasına yönlendir
      navigate('/welcome');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Giriş başarısız');
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ 
        background: `linear-gradient(135deg, ${safeColors.background} 0%, ${safeColors.card} 100%)`
      }}
    >
      {/* Subtle lofi texture overlay - çok hafif */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle floating elements - minimal lofi */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              backgroundColor: safeColors.primary,
              left: `${15 + i * 25}%`,
              top: `${20 + i * 15}%`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Ana İçerik - Sade ve Minimal */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-sm"
            style={{ backgroundColor: safeColors.primary }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 
            className="text-3xl font-semibold mb-2"
            style={{ color: safeColors.text }}
          >
            MyTask
          </h1>
          <p 
            className="text-sm"
            style={{ color: safeColors.text, opacity: 0.6 }}
          >
            Notlarınız ve görevleriniz için
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="rounded-2xl shadow-lg p-8 border"
          style={{ 
            backgroundColor: safeColors.card,
            borderColor: safeColors.border
          }}
        >
          <h2 
            className="text-xl font-semibold mb-2 text-center"
            style={{ color: safeColors.text }}
          >
            Giriş Yap
          </h2>
          <p 
            className="text-sm text-center mb-6"
            style={{ color: safeColors.text, opacity: 0.5 }}
          >
            Hesabınıza giriş yapın
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div 
                className="px-4 py-3 rounded-lg text-sm"
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FECACA'
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: safeColors.text }}
              >
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: safeColors.background,
                  borderColor: safeColors.border,
                  color: safeColors.text,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = safeColors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${safeColors.primary}15`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = safeColors.border;
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
                style={{ color: safeColors.text }}
              >
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: safeColors.background,
                  borderColor: safeColors.border,
                  color: safeColors.text,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = safeColors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${safeColors.primary}15`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = safeColors.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              style={{
                backgroundColor: safeColors.primary,
              }}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: safeColors.primary }}
            >
              Hesabınız yok mu? Kayıt olun
            </Link>
          </div>
        </div>

        {/* Subtle lofi element - çok minimal */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: safeColors.text, opacity: 0.4 }}>
            ✨ Minimal & Productive
          </p>
        </div>
      </div>
    </div>
  );
}
