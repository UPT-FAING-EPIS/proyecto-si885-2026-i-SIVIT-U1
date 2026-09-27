import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LoginView, AuthUser } from './components/LoginView';
import './index.css';

const AUTH_STORAGE_KEY = 'tacna_soc_auth_user';

function Root() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user: AuthUser) => {
    setAuthUser(user);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error guardando sesión:', e);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem('tacna_soc_active_tab');
    } catch (e) {
      console.error('Error eliminando sesión:', e);
    }
  };

  if (!authUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <App
      authUser={authUser}
      onLogout={handleLogout}
    />
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
