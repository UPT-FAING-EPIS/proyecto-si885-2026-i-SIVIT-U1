import React from 'react';
import { 
  TrendingUp, 
  ExternalLink,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { WebsiteItem } from '../types';

interface DashboardViewProps {
  onSelectSite: (siteName: string) => void;
  onNavigateToVulns: () => void;
  onNavigateToSites: () => void;
  websites: WebsiteItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectSite,
  onNavigateToVulns,
  onNavigateToSites,
  websites
}) => {
  const topVulnerable = [
    { name: 'internal-portal.tacna.corp', vulns: 84, pct: 85, color: '#dc2626' },
    { name: 'api-gateway.tacna.io', vulns: 62, pct: 65, color: '#ea580c' },
    { name: 'legacy-crm.tacna.net', vulns: 41, pct: 45, color: '#e11d48' },
    { name: 'tramites.regiontacna.gob.pe', vulns: 35, pct: 38, color: '#b91c1c' },
    { name: 'auth-sso.regiontacna.gob.pe', vulns: 28, pct: 30, color: '#64748b' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Risk Score Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vulnerability Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-sans">
            Monitoreo en tiempo real de amenazas y auditoría de seguridad perimetral.
          </p>
        </div>

        {/* Overall Risk Score */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-5 border-l-4 border-l-red-600 shadow-sm">
          <div>
            <p className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
              OVERALL RISK SCORE
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-mono text-3xl md:text-4xl font-extrabold text-red-600">
                68
              </span>
              <span className="font-mono text-sm text-slate-400">/100</span>
            </div>
          </div>
          <div className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            HIGH ALERT
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div 
          onClick={onNavigateToSites}
          className="bg-white border border-slate-200 hover:border-red-300 rounded-xl p-4 flex flex-col cursor-pointer transition-all hover:shadow-sm group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-slate-500 uppercase font-semibold">TOTAL SITES</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
          </div>
          <span className="font-mono text-2xl font-bold text-slate-900">150</span>
          <span className="text-[10px] font-mono text-emerald-600 font-semibold mt-1">98.2% activos</span>
        </div>

        <div 
          onClick={onNavigateToVulns}
          className="bg-white border border-slate-200 hover:border-red-300 rounded-xl p-4 flex flex-col cursor-pointer transition-all hover:shadow-sm group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-slate-500 uppercase font-semibold">TOTAL VULNS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
          </div>
          <span className="font-mono text-2xl font-bold text-slate-900">420</span>
          <span className="text-[10px] font-mono text-red-600 font-semibold mt-1">+8 esta semana</span>
        </div>

        <div 
          onClick={onNavigateToVulns}
          className="bg-white border border-slate-200 hover:border-red-400 rounded-xl p-4 flex flex-col border-b-2 border-b-red-600 cursor-pointer transition-all hover:shadow-sm"
        >
          <span className="font-mono text-[11px] text-red-600 uppercase mb-2 flex items-center justify-between font-bold">
            CRITICAL
            <span className="w-2 h-2 rounded-full bg-red-600" />
          </span>
          <span className="font-mono text-2xl font-black text-red-600">12</span>
          <span className="text-[10px] font-mono text-red-600/80 mt-1">Parche urgente</span>
        </div>

        <div 
          onClick={onNavigateToVulns}
          className="bg-white border border-slate-200 hover:border-amber-400 rounded-xl p-4 flex flex-col border-b-2 border-b-amber-600 cursor-pointer transition-all hover:shadow-sm"
        >
          <span className="font-mono text-[11px] text-amber-700 uppercase mb-2 flex items-center justify-between font-bold">
            HIGH
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </span>
          <span className="font-mono text-2xl font-bold text-amber-700">45</span>
          <span className="text-[10px] font-mono text-amber-700/80 mt-1">Mitigación en curso</span>
        </div>

        <div 
          onClick={onNavigateToVulns}
          className="bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-4 flex flex-col border-b-2 border-b-slate-600 cursor-pointer transition-all hover:shadow-sm"
        >
          <span className="font-mono text-[11px] text-slate-700 uppercase mb-2 flex items-center justify-between font-bold">
            MEDIUM
            <span className="w-2 h-2 rounded-full bg-slate-600" />
          </span>
          <span className="font-mono text-2xl font-bold text-slate-700">120</span>
          <span className="text-[10px] font-mono text-slate-500 mt-1">Revisión programada</span>
        </div>

        <div 
          onClick={onNavigateToVulns}
          className="bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-4 flex flex-col border-b-2 border-b-slate-400 cursor-pointer transition-all hover:shadow-sm"
        >
          <span className="font-mono text-[11px] text-slate-500 uppercase mb-2 flex items-center justify-between font-semibold">
            LOW
            <span className="w-2 h-2 rounded-full bg-slate-400" />
          </span>
          <span className="font-mono text-2xl font-bold text-slate-600">243</span>
          <span className="text-[10px] font-mono text-slate-400 mt-1">Bajo impacto</span>
        </div>
      </div>

      {/* Bento Grid Charts: Severity Distribution & Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Severity Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-4 flex flex-col shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-wider font-bold">
              Distribución de Severidad
            </h3>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
              v2023.10
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center py-4 relative">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                {/* Critical (12 / 420 ~ 2.8%) in Bold Red */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#dc2626" 
                  strokeWidth="12" 
                  strokeDasharray="238.7" 
                  strokeDashoffset="232" 
                />
                {/* High (45 / 420 ~ 10.7%) in Amber */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#ea580c" 
                  strokeWidth="12" 
                  strokeDasharray="238.7" 
                  strokeDashoffset="213" 
                  className="origin-center"
                  style={{ transform: 'rotate(10deg)' }}
                />
                {/* Medium (120 / 420 ~ 28.5%) in Slate */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#64748b" 
                  strokeWidth="12" 
                  strokeDasharray="238.7" 
                  strokeDashoffset="170" 
                  className="origin-center"
                  style={{ transform: 'rotate(48deg)' }}
                />
                {/* Low (243 / 420 ~ 58%) in Light Slate */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="12" 
                  strokeDasharray="238.7" 
                  strokeDashoffset="100" 
                  className="origin-center"
                  style={{ transform: 'rotate(152deg)' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-mono text-3xl font-black text-slate-900">420</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Total</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span className="text-slate-600">Críticas:</span>
              <span className="font-bold text-red-600">12 (3%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-600">Altas:</span>
              <span className="font-bold text-amber-700">45 (11%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="text-slate-600">Medias:</span>
              <span className="font-bold text-slate-700">120 (28%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="text-slate-600">Bajas:</span>
              <span className="font-bold text-slate-600">243 (58%)</span>
            </div>
          </div>
        </div>

        {/* Trend Line Chart (6 Months) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-8 flex flex-col shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-wider font-bold">
              Tendencia de Detección (6 Meses)
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" /> +14.2% detección temprana
            </span>
          </div>

          <div className="flex-1 chart-grid rounded-xl border border-slate-200 relative min-h-[220px] flex items-end p-4 pt-8 bg-slate-50/60">
            {/* SVG Line Chart in Crimson Red */}
            <svg className="absolute inset-0 w-full h-full p-6" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="redGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 80 Q 15 65, 20 60 T 40 75 T 60 30 T 80 45 T 100 12"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 0 80 Q 15 65, 20 60 T 40 75 T 60 30 T 80 45 T 100 12 L 100 100 L 0 100 Z"
                fill="url(#redGlow)"
              />
              {/* Data points */}
              <circle cx="0" cy="80" r="3" fill="#dc2626" />
              <circle cx="20" cy="60" r="3" fill="#dc2626" />
              <circle cx="40" cy="75" r="3" fill="#dc2626" />
              <circle cx="60" cy="30" r="3" fill="#dc2626" />
              <circle cx="80" cy="45" r="3" fill="#dc2626" />
              <circle cx="100" cy="12" r="4" fill="#dc2626" className="animate-ping origin-center" />
              <circle cx="100" cy="12" r="3" fill="#dc2626" />
            </svg>

            {/* Y-Axis Labels */}
            <div className="absolute left-3 top-3 bottom-6 flex flex-col justify-between text-[10px] text-slate-400 font-mono font-semibold">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* X-Axis Month labels */}
            <div className="w-full flex justify-between text-[11px] text-slate-500 font-mono font-medium pt-2 pl-4 z-10">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Ago</span>
              <span>Set</span>
              <span className="text-red-600 font-bold">Oct (Actual)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid: Top 5 Vulnerable Sites & OWASP Top 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top 5 Vulnerable Sites */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-6 flex flex-col shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-wider font-bold">
              Top 5 Sitios con Mayor Riesgo
            </h3>
            <button 
              onClick={onNavigateToSites}
              className="text-xs text-red-600 hover:text-red-800 inline-flex items-center gap-1 font-semibold"
            >
              Ver todos <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3.5 flex-1 justify-around flex flex-col">
            {topVulnerable.map((site) => (
              <div 
                key={site.name}
                onClick={() => onSelectSite(site.name)}
                className="group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-900 group-hover:text-red-600 font-semibold transition-colors truncate">
                    {site.name}
                  </span>
                  <span className="font-bold" style={{ color: site.color }}>
                    {site.vulns} vulns
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${site.pct}%`, backgroundColor: site.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OWASP Top 10 Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-6 flex flex-col shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-wider font-bold">
              Distribución OWASP Top 10
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Marco 2021-2023</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl flex justify-between items-center border-l-4 border-l-red-600">
              <span className="text-slate-800 font-semibold">A01: Broken Access</span>
              <span className="font-mono font-black text-red-600">28%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl flex justify-between items-center border-l-4 border-l-amber-500">
              <span className="text-slate-800 font-semibold">A03: Injection</span>
              <span className="font-mono font-black text-amber-600">19%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl flex justify-between items-center border-l-4 border-l-red-400">
              <span className="text-slate-800 font-semibold">A05: Misconfig</span>
              <span className="font-mono font-black text-red-500">15%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl flex justify-between items-center border-l-4 border-l-slate-600">
              <span className="text-slate-800 font-semibold">A07: Auth Failures</span>
              <span className="font-mono font-black text-slate-700">12%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl flex justify-between items-center border-l-4 border-l-slate-400">
              <span className="text-slate-800 font-semibold">A06: Outdated Comps</span>
              <span className="font-mono font-black text-slate-600">10%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-3 rounded-xl flex justify-between items-center border-l-4 border-l-slate-300">
              <span className="text-slate-800 font-semibold">Otros Riesgos</span>
              <span className="font-mono font-black text-slate-500">16%</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50/70 border border-red-200 rounded-xl text-xs text-slate-700 flex items-center justify-between">
            <span>¿Deseas generar el informe ejecutivo consolidado?</span>
            <button 
              onClick={onNavigateToVulns}
              className="text-red-700 font-bold hover:underline text-xs"
            >
              Consultar CVEs &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
