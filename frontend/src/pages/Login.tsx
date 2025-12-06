import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import LoadingScreen from '../components/LoadingScreen';
import ColorBends from '../components/ColorBends';

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
    >
      {/* ColorBends Background */}
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#000000' }}>
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
            style={{ color: '#FFFFFF' }}
          >
            MyTask
          </h1>
          <p 
            className="text-sm"
            style={{ color: '#FFFFFF', opacity: 0.8 }}
          >
            Notlarınız ve görevleriniz için
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="rounded-2xl shadow-lg p-8 border backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
          }}
        >
          <h2 
            className="text-xl font-semibold mb-2 text-center"
            style={{ color: '#FFFFFF' }}
          >
            Giriş Yap
          </h2>
          <p 
            className="text-sm text-center mb-6"
            style={{ color: '#FFFFFF', opacity: 0.7 }}
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
                style={{ color: '#FFFFFF' }}
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
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
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
                style={{ color: '#FFFFFF' }}
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
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
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
          <p className="text-xs" style={{ color: '#FFFFFF', opacity: 0.5 }}>
            ✨ Minimal & Productive
          </p>
        </div>
      </div>
    </div>
  );
}
