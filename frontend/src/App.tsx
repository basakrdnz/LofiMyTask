import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Layout from './components/Layout';

function App() {
  const { token } = useAuthStore();
  const { colors } = useThemeStore();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
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

