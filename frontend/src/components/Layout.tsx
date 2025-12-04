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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <nav 
        className="shadow-md"
        style={{ backgroundColor: colors.card, borderBottom: `4px solid ${colors.border}` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transform hover:scale-110 transition-all" style={{ backgroundColor: colors.primary }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 
                  className="text-xl font-black" 
                  style={{ 
                    color: colors.text,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  MyTask
                </h1>
              </div>
              <nav className="flex space-x-2">
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded-2xl text-sm font-medium transition-all transform hover:scale-105 ${
                    location.pathname === '/' ? 'shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: location.pathname === '/' ? colors.primary : 'transparent',
                    color: location.pathname === '/' ? 'white' : colors.text
                  }}
                >
                  🏠 Ana Sayfa
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-2xl text-sm font-medium transition-all transform hover:scale-105 ${
                    location.pathname === '/dashboard' ? 'shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: location.pathname === '/dashboard' ? colors.primary : 'transparent',
                    color: location.pathname === '/dashboard' ? 'white' : colors.text
                  }}
                >
                  📝 Notlar
                </Link>
                <Link
                  to="/calendar"
                  className={`px-3 py-1.5 rounded-2xl text-sm font-medium transition-all transform hover:scale-105 ${
                    location.pathname === '/calendar' ? 'shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: location.pathname === '/calendar' ? colors.primary : 'transparent',
                    color: location.pathname === '/calendar' ? 'white' : colors.text
                  }}
                >
                  📅 Takvim
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium" style={{ color: colors.text }}>
                👤 {user?.name || user?.email}
              </span>
              
              {/* Tema Seçici */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 rounded-2xl transition-all hover:scale-110"
                  style={{
                    backgroundColor: isThemeMenuOpen ? colors.primary : 'transparent',
                    color: isThemeMenuOpen ? 'white' : colors.text
                  }}
                  title="Tema Değiştir"
                >
                  <span className="text-xl">🎨</span>
                </button>
                
                {isThemeMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border-3 z-50"
                    style={{
                      backgroundColor: colors.card,
                      borderColor: colors.border
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
                            theme === t.value ? 'font-bold' : ''
                          }`}
                          style={{
                            backgroundColor: theme === t.value ? colors.primary + '20' : 'transparent',
                            color: colors.text
                          }}
                          onMouseEnter={(e) => {
                            if (theme !== t.value) {
                              e.currentTarget.style.backgroundColor = colors.secondary + '20';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (theme !== t.value) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <span className="text-lg">{t.emoji}</span>
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
                className="px-3 py-1.5 rounded-2xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.primary,
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

