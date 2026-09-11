import React, { useState } from 'react';
import { X, Globe, Plus, ShieldCheck } from 'lucide-react';
import { WebsiteItem } from '../types';

interface NewSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSite: (site: Omit<WebsiteItem, 'id' | 'lastEvaluation' | 'vulnCount' | 'criticalCount' | 'highCount' | 'mediumCount' | 'lowCount' | 'riskScore' | 'riskLevel'>) => void;
}

export const NewSiteModal: React.FC<NewSiteModalProps> = ({ isOpen, onClose, onAddSite }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [ip, setIp] = useState('');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState<WebsiteItem['category']>('Gobierno');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url || !ip) return;

    onAddSite({
      name,
      url,
      ip,
      institution: institution || 'Entidad Tacna',
      category,
      status: 'Activo'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-sm text-slate-900">
              Registrar Nuevo Sitio Web para Monitoreo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-sans">
          <div>
            <label className="text-slate-700 block mb-1 font-medium">
              Nombre del Portal o Sistema *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Portal de Trámites Licencias"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-medium">
              URL / Dominio FQDN *
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://servicios.tacna.gob.pe"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 block mb-1 font-medium">
                Dirección IP Primaria *
              </label>
              <input
                type="text"
                required
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="190.119.200.45"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1 font-medium">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WebsiteItem['category'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none"
              >
                <option value="Gobierno">Gobierno</option>
                <option value="Educación">Educación</option>
                <option value="Salud">Salud</option>
                <option value="Finanzas">Finanzas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-medium">
              Entidad / Institución Responsable
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Gobierno Regional de Tacna / Gerencia de Tecnologías"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar e Iniciar Monitoreo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
