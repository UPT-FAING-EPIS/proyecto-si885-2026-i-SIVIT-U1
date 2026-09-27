import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export const DEMO_USERS = [
  { email: 'admin@tacnasoc.pe',    password: 'Admin2026!',    name: 'Carlos Mendoza',      role: 'Super Admin'        as const },
  { email: 'analyst@tacnasoc.pe',  password: 'Analyst2026!',  name: 'Ana Torres',           role: 'Security Analyst'   as const },
  { email: 'auditor@tacnasoc.pe',  password: 'Auditor2026!',  name: 'Luis Quispe',          role: 'Auditor'            as const },
  { email: 'operator@tacnasoc.pe', password: 'Operator2026!', name: 'María Flores',         role: 'Operator'           as const },
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

    const found = DEMO_USERS.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
    );

    if (!found) {
      setLoginError('Correo o contraseña incorrectos.');
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
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-red-700/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-700/15 blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative w-full max-w-md">
        {/* Logo / Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_40px_rgba(220,38,38,0.5)] mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Tacna SOC</h1>
          <p className="text-slate-400 text-sm mt-1">Centro de Operaciones de Seguridad</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white tracking-tight">Iniciar Sesión</h2>
            <p className="text-xs text-slate-400 mt-1">Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="login-form">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="usuario@tacnasoc.pe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="login-password"
                  type={showLoginPw ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw(!showLoginPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {loginError}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(220,38,38,0.4)] disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
            >
              {loginLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verificando acceso...</>
              ) : (
                <><Shield className="w-4 h-4" /> Acceder al SOC</>
              )}
            </button>

            {/* Quick role selection (passwords are NOT displayed) */}
            <div className="pt-3 border-t border-white/5">
              <p className="text-[11px] text-slate-500 font-medium mb-2 text-center">Acceso rápido por rol:</p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_USERS.map(u => (
                  <button
                    key={u.role}
                    type="button"
                    onClick={() => fillQuickRole(u.email, u.password)}
                    className="px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                  >
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-red-400 transition-colors">{u.role}</p>
                    <p className="text-[10px] font-mono text-slate-500 truncate">{u.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Universidad Privada de Tacna · FAING · EPIS · SI885 · 2026-I
        </p>
      </div>
    </div>
  );
}
