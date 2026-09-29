import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export const DEMO_USERS = [
  { email: 'admin@tacnasoc.pe',    password: 'Admin2026!',    name: 'Carlos Mendoza',      role: 'Super Admin'        as const },
  { email: 'analyst@tacnasoc.pe',  password: 'Analyst2026!',  name: 'Ana Torres',           role: 'Security Analyst'   as const },
  { email: 'auditor@tacnasoc.pe',  password: 'Auditor2026!',  name: 'Luis Quispe',          role: 'Auditor'            as const },
  { email: 'operator@tacnasoc.pe', password: 'Operator2026!', name: 'María Flores',         role: 'Operator'           as const },
  { email: 'usher.dhr1@gmail.com', password: 'Admin2026!',    name: 'Usher DHR',           role: 'Super Admin'        as const },
];

export type AuthUser = {
  email: string;
  name: string;
  role: 'Super Admin' | 'Security Analyst' | 'Auditor' | 'Operator';
};

interface LoginViewProps {
  onLogin: (user: AuthUser) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw]     = useState(false);
  const [loginError, setLoginError]       = useState('');
  const [loginLoading, setLoginLoading]   = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Por favor completa todos los campos.');
      return;
    }
    setLoginLoading(true);

    const emailTrimmed = loginEmail.trim().toLowerCase();

    // 1. Look in registered users from admin creations in localStorage
    let registeredUsers: Array<{ email: string; password?: string; name: string; role: any; status?: string }> = [];
    try {
      const stored = localStorage.getItem('sivit_registered_users');
      if (stored) {
        registeredUsers = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading registered users:', e);
    }

    const registeredMatch = registeredUsers.find(
      u => u.email?.toLowerCase() === emailTrimmed
    );

    // 2. Look in initial DEMO_USERS
    const demoMatch = DEMO_USERS.find(
      u => u.email?.toLowerCase() === emailTrimmed
    );

    const found = registeredMatch || demoMatch;

    if (!found) {
      setLoginError('Usuario no encontrado en el sistema SOC.');
      setLoginLoading(false);
      return;
    }

    if (found.status === 'Suspendido') {
      setLoginError('Esta cuenta se encuentra suspendida por el Administrador.');
      setLoginLoading(false);
      return;
    }

    if (found.password !== loginPassword) {
      setLoginError('Contraseña incorrecta. Por favor verifica tus credenciales.');
      setLoginLoading(false);
      return;
    }

    setLoginLoading(false);
    onLogin({ email: found.email, name: found.name, role: found.role });
  };

  const fillQuickRole = (email: string, password: string) => {
    setLoginEmail(email);
    setLoginPassword(password);
    setLoginError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Subtle red ambient glow decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[550px] h-[550px] rounded-full bg-red-500/10 blur-[110px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-red-300/40 to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '36px 36px' }} 
      />

      <div className="relative w-full max-w-md">
        {/* Logo / Brand Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 shadow-xl shadow-red-600/25 mb-3 border border-red-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tacna <span className="text-red-600">SOC</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            Centro de Operaciones de Seguridad · Región Tacna
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-red-950/5 overflow-hidden p-7 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Iniciar Sesión</h2>
            <p className="text-xs text-slate-500 mt-0.5">Ingresa tus credenciales institucionales para acceder</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="login-form">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="usuario@tacnasoc.pe"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showLoginPw ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all font-mono"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw(!showLoginPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors"
                >
                  {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 text-red-700 text-xs font-medium animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loginLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-red-600/30 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-sm cursor-pointer mt-2"
            >
              {loginLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verificando acceso...</>
              ) : (
                <><Shield className="w-4 h-4" /> Acceder al SOC</>
              )}
            </button>

            {/* Quick role selection */}
            <div className="pt-4 border-t border-slate-100 mt-5">
              <p className="text-[11px] text-slate-400 font-semibold mb-2.5 text-center uppercase tracking-wider">
                Acceso rápido por rol institucional:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_USERS.map(u => (
                  <button
                    key={u.role}
                    type="button"
                    onClick={() => fillQuickRole(u.email, u.password)}
                    className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-red-50/80 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <p className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                      {u.role}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 truncate">{u.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6 font-medium">
          Universidad Privada de Tacna · FAING · EPIS · SI885 · 2026-I
        </p>
      </div>
    </div>
  );
}
