import { ReactNode, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, Theme } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const { colors, theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const themes: { value: Theme; label: string; emoji: string }[] = [
    { value: 'library', label: 'Kütüphane', emoji: '📚' },
    { value: 'notebook', label: 'Not Defteri', emoji: '📓' },
    { value: 'playful', label: 'Eğlenceli', emoji: '🎨' }
  ];

  // Dışarı tıklanınca menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              
              {/* Tema Seçici */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 rounded-lg transition-all hover:opacity-90"
                  style={{
                    backgroundColor: isThemeMenuOpen ? safeColors.primary : 'transparent',
                    color: isThemeMenuOpen ? 'white' : safeColors.text
                  }}
                  title="Tema Değiştir"
                >
                  <span className="text-lg">🎨</span>
                </button>
                
                {isThemeMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border z-50"
                    style={{
                      backgroundColor: safeColors.card,
                      borderColor: safeColors.border
                    }}
                  >
                    <div className="py-2">
                      {themes.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => {
                            setTheme(t.value);
                            setIsThemeMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 flex items-center space-x-2 transition-all ${
                            theme === t.value ? 'font-semibold' : ''
                          }`}
                          style={{
                            backgroundColor: theme === t.value ? safeColors.primary + '10' : 'transparent',
                            color: safeColors.text
                          }}
                          onMouseEnter={(e) => {
                            if (theme !== t.value) {
                              e.currentTarget.style.backgroundColor = safeColors.secondary + '10';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (theme !== t.value) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <span className="text-base">{t.emoji}</span>
                          <span>{t.label}</span>
                          {theme === t.value && <span className="ml-auto">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

