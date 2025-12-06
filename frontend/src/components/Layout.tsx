import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const { colors } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    <div style={{ minHeight: '100vh', backgroundColor: safeColors.background }}>
      <nav 
        className="shadow-sm border-b"
        style={{ backgroundColor: safeColors.card, borderColor: safeColors.border }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: safeColors.primary }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 
                  className="text-lg font-semibold" 
                  style={{ 
                    color: safeColors.text
                  }}
                >
                  MyTask
                </h1>
              </div>
              <nav className="flex space-x-2">
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 ${
                    location.pathname === '/dashboard' ? 'shadow-sm' : ''
                  }`}
                  style={{
                    backgroundColor: location.pathname === '/dashboard' ? safeColors.primary : 'transparent',
                    color: location.pathname === '/dashboard' ? 'white' : safeColors.text
                  }}
                >
                  Notlar
                </Link>
                <Link
                  to="/calendar"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 ${
                    location.pathname === '/calendar' ? 'shadow-sm' : ''
                  }`}
                  style={{
                    backgroundColor: location.pathname === '/calendar' ? safeColors.primary : 'transparent',
                    color: location.pathname === '/calendar' ? 'white' : safeColors.text
                  }}
                >
                  Takvim
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium" style={{ color: safeColors.text }}>
                {user?.name || user?.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: safeColors.primary,
                  color: 'white'
                }}
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

