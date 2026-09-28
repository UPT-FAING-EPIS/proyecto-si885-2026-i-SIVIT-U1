import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertOctagon, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { VulnerabilityItem } from '../types';

interface VulnerabilitiesViewProps {
  vulnerabilities: VulnerabilityItem[];
  onSelectVuln: (cve: string) => void;
}

export const VulnerabilitiesView: React.FC<VulnerabilitiesViewProps> = ({
  vulnerabilities,
  onSelectVuln
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('Todas');
  const [selectedOwasp, setSelectedOwasp] = useState<string>('Todas');

  const severities = ['Todas', 'Crítico', 'Alto', 'Medio', 'Bajo'];
  const owaspCategories = ['Todas', 'A01: Broken Access', 'A03: Injection', 'A05: Misconfiguration', 'A07: Auth Failure', 'A06: Outdated'];

  const filteredVulns = vulnerabilities.filter(v => {
    const term = (searchTerm || '').toLowerCase();
    const cve = String(v?.cve || '').toLowerCase();
    const title = String(v?.title || (v as any)?.name || '').toLowerCase();
    const description = String(v?.description || '').toLowerCase();

    const matchesSearch = 
      cve.includes(term) ||
      title.includes(term) ||
      description.includes(term) ||
      (Array.isArray(v?.affectedSites) && v.affectedSites.some((s: any) => {
        const sName = String(typeof s === 'string' ? s : s?.siteName || s?.ip || '').toLowerCase();
        return sName.includes(term);
      }));

    const matchesSeverity = selectedSeverity === 'Todas' || v.severity === selectedSeverity;
    const owasp = String(v?.owaspCategory || '').toLowerCase();
    const matchesOwasp = selectedOwasp === 'Todas' || owasp.includes(selectedOwasp.toLowerCase().slice(0, 3));

    return matchesSearch && matchesSeverity && matchesOwasp;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
          Catálogo Global de Vulnerabilidades (CVE)
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Base de conocimiento de amenazas sincronizada con NVD/NIST, CISA KEV y el marco OWASP Top 10.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por CVE-XXXX-XXXX, título o activo..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto bg-slate-50 p-1 rounded-lg border border-slate-200">
          {severities.map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`
                px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer
                ${selectedSeverity === sev 
                  ? 'bg-red-600 text-white font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }
              `}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Vulnerabilities Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Identificador CVE</th>
                <th className="py-3 px-3">Título y Vulnerabilidad</th>
                <th className="py-3 px-3 text-center">Score CVSS</th>
                <th className="py-3 px-3 text-center">Severidad</th>
                <th className="py-3 px-3">Categoría OWASP</th>
                <th className="py-3 px-3">Activos Impactados</th>
                <th className="py-3 px-3">Estado</th>
                <th className="py-3 px-4 text-right">Guía</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVulns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-mono">
                    No se encontraron registros de vulnerabilidad.
                  </td>
                </tr>
              ) : (
                filteredVulns.map((v) => (
                  <tr 
                    key={v.id} 
                    onClick={() => onSelectVuln(v.cve)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-red-600 whitespace-nowrap">
                      {v.cve}
                    </td>

                    <td className="py-3.5 px-3 max-w-sm">
                      <span className="font-semibold text-slate-900 block group-hover:text-red-600 transition-colors">
                        {v.title}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {v.description}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                        v.cvss >= 9 ? 'bg-red-100 text-red-800' :
                        v.cvss >= 7 ? 'bg-orange-100 text-orange-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {v.cvss}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        v.severity === 'Crítico' ? 'bg-red-50 text-red-700 border border-red-200' :
                        v.severity === 'Alto' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {v.severity}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">
                      {v.owaspCategory}
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {(v.affectedSites || []).map((s: any, idx) => (
                          <span 
                            key={idx} 
                            className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono px-1.5 py-0.5 rounded"
                          >
                            {typeof s === 'string' ? s : s?.siteName || s?.ip || 'Activo'}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        v.status === 'En Remediación' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        v.status === 'Identificado' ? 'bg-red-50 text-red-700 border border-red-200 font-bold' :
                        'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {v.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => onSelectVuln(v.cve)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        Ver Guía <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
