import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ReportsViewProps {
  onExportReport: (format: 'PDF' | 'EXCEL') => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onExportReport }) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (format: 'PDF' | 'EXCEL') => {
    setDownloading(format);
    onExportReport(format);
    setTimeout(() => setDownloading(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
            Informes Ejecutivos y Cumplimiento
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 font-sans">
            Generación de reportes formales de ciberseguridad para gerencia, OCI y auditoría gubernamental.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleDownload('EXCEL')}
            disabled={downloading !== null}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{downloading === 'EXCEL' ? 'Generando...' : 'Exportar XLSX'}</span>
          </button>
          <button
            onClick={() => handleDownload('PDF')}
            disabled={downloading !== null}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading === 'PDF' ? 'Generando PDF...' : 'Descargar PDF Oficial'}</span>
          </button>
        </div>
      </div>

      {/* Official Executive Report Paper Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Document Header with White & Red Branding */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="font-mono text-[11px] text-red-600 uppercase tracking-wider font-bold block">
                SOC TACNA • INFORME TÉCNICO OFICIAL
              </span>
              <h3 className="font-sans text-xl font-extrabold text-slate-900 mt-0.5">
                Evaluación Consolidada de Seguridad Perimetral - Q4 2026
              </h3>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-500">
            <div>Fecha: <span className="text-slate-800 font-semibold">11 de Septiembre, 2026</span></div>
            <div>Código: <span className="text-red-600 font-bold">SOC-TAC-REP-2026-09</span></div>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold">
            1. Resumen Ejecutivo
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            Durante el ciclo trimestral de evaluación continua se monitorearon <strong>150 activos web</strong> correspondientes a los sectores de Gobierno Regional, Educación, Salud y Finanzas de Tacna. Se registraron <strong>420 vulnerabilidades</strong> acumuladas, de las cuales <strong>12 ostentan rango Crítico</strong> con alto potencial de denegación o secuestro de datos.
          </p>
        </div>

        {/* Quantitative Findings Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Índice Global</span>
            <span className="font-mono text-2xl font-black text-red-600 block mt-1">68 / 100</span>
            <span className="text-[10px] text-red-700 font-mono font-semibold">Nivel Alto Riesgo</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Críticas Urgentes</span>
            <span className="font-mono text-2xl font-black text-red-600 block mt-1">12</span>
            <span className="text-[10px] text-slate-500 font-mono">CVSS &ge; 9.0</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Tiempo Medio Remediación</span>
            <span className="font-mono text-2xl font-bold text-slate-800 block mt-1">4.2 Días</span>
            <span className="text-[10px] text-emerald-600 font-mono font-semibold">-18% respecto a Q3</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Cumplimiento Marco</span>
            <span className="font-mono text-2xl font-bold text-emerald-700 block mt-1">82.4%</span>
            <span className="text-[10px] text-slate-500 font-mono">OWASP ASVS v4.0</span>
          </div>
        </div>

        {/* High-Level Recommendations */}
        <div className="space-y-3 pt-2">
          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold">
            2. Conclusiones y Plan Prioritario de Mitigación
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 font-sans list-disc list-inside">
            <li><strong>Parche Inmediato:</strong> Aplicar actualización de Nginx a versión 1.24+ en los servidores de trámites públicos.</li>
            <li><strong>Políticas WAF:</strong> Habilitar reglas OWASP CRS 3.3 en ModSecurity para bloquear inyecciones SQL ciegas y XSS reflejado.</li>
            <li><strong>Revisión Criptográfica:</strong> Deprecar totalmente TLS 1.0 y 1.1; forzar suites seguras ECDHE con certificados de 2048 bits.</li>
          </ul>
        </div>

        {/* Document Footer Signature */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-2">
          <span>Firmado digitalmente: <strong>CSIRT Tacna SOC</strong></span>
          <span className="text-slate-400">Hash SHA-256 del Reporte: a7f89b...3c4e1</span>
        </div>
      </div>
    </div>
  );
};
