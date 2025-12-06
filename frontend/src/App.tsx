import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { authApi } from './api/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const { token, setAuth, logout } = useAuthStore();
  const { colors } = useThemeStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Store'ların hydrate olmasını bekle
  useEffect(() => {
    // Zustand persist'in hydration'ı tamamlanmasını bekle
    // Daha uzun timeout ile hydration'ın tamamlanmasını garanti et
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 300); // 100ms'den 300ms'ye çıkarıldı

    return () => clearTimeout(timer);
  }, []);

  // Sayfa yüklendiğinde token varsa kullanıcı bilgilerini yenile
  useEffect(() => {
    const refreshAuth = async () => {
      if (!token || !isHydrated) return;

      try {
        setIsRefreshing(true);
        const response = await authApi.getMe();
        // Kullanıcı bilgileri güncellendi, token aynı kalıyor
        setAuth(response.user, token);
      } catch (error: any) {
        // Token geçersiz veya süresi dolmuş
        console.error('Auth refresh failed:', error);
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setIsRefreshing(false);
      }
    };

    refreshAuth();
  }, [token, isHydrated, setAuth, logout]);

  // Colors undefined kontrolü - default değerler
  const safeColors = colors || {
    primary: '#BA68C8',
    secondary: '#4DD0E1',
    accent: '#FF6B9D',
    background: '#1a0d2e',
    card: '#2d1b4e',
    text: '#F3E5F5',
    border: '#9C27B0'
  };

  // Hydrate olana kadar veya auth refresh yapılırken loading göster
  if (!isHydrated || (token && isRefreshing)) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: safeColors.background }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" replace /> : <Home />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/welcome" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/welcome" replace /> : <Register />}
          />
          <Route
            path="/welcome"
            element={
              token ? (
                <Welcome />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              token ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/calendar"
            element={
              token ? (
                <Layout>
                  <Calendar />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

