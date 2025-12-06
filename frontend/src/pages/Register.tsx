import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import LoadingScreen from '../components/LoadingScreen';
import ColorBends from '../components/ColorBends';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { colors } = useThemeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await authApi.register({ email, password, name });
      // Token ve kullanıcı bilgilerini kaydet
      setAuth(response.user, response.token);
      setSuccess(true);
      // Welcome sayfasına yönlendir
      setTimeout(() => {
        navigate('/welcome');
      }, 1500);
    } catch (err: any) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Kayıt başarısız';
      setError(errorMessage);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

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

      {/* Ana İçerik - Form */}
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
            Kayıt Ol
          </h2>
          <p 
            className="text-sm text-center mb-6"
            style={{ color: '#FFFFFF', opacity: 0.7 }}
          >
            Yeni hesap oluşturun
          </p>

        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          {success && (
            <div 
              className="px-4 py-3 rounded-lg text-sm"
              style={{
                backgroundColor: '#D1FAE5',
                color: '#065F46',
                border: '1px solid #A7F3D0'
              }}
            >
              Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
            </div>
          )}
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

          <div className="space-y-4">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#FFFFFF' }}
              >
                Ad (İsteğe bağlı)
              </label>
              <input
                id="name"
                name="name"
                type="text"
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
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
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
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
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
                Şifre (en az 6 karakter)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
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
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
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
              className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              style={{
                backgroundColor: safeColors.primary,
              }}
            >
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: safeColors.primary }}
            >
              Zaten hesabınız var mı? Giriş yapın
            </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
