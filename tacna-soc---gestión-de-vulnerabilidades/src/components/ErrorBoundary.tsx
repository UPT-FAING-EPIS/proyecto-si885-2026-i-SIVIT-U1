import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Tacna SOC ErrorBoundary capturó un error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('tacna_soc_active_tab');
      localStorage.removeItem('tacna_soc_auth_user');
      sessionStorage.clear();
    } catch {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0f1e] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-red-500/30 rounded-2xl p-7 text-center shadow-2xl animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Sesión Protegida del SOC</h2>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              El sistema detectó un estado inconsistente en la memoria del navegador. Pulsa el botón inferior para restablecer la sesión limpia e ingresar al SOC.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-900/50 mb-5 text-left overflow-x-auto font-mono max-h-28">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs shadow-lg shadow-red-600/30"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Limpiar Estado y Recargar</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
