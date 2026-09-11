import React, { useState } from 'react';
import { X, UserPlus, Shield, KeyRound } from 'lucide-react';
import { SystemUser } from '../types';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<SystemUser, 'id' | 'lastLogin' | 'ipAddress' | 'createdAt'>) => void;
}

export const NewUserModal: React.FC<NewUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SystemUser['role']>('Security Analyst');
  const [department, setDepartment] = useState('Equipo de Respuesta a Incidentes (CSIRT)');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onAddUser({
      name,
      email,
      role,
      department,
      status: 'Activo',
      twoFactorEnabled
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-sm text-slate-900">
              Registrar Nuevo Operador / Usuario del SOC
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
              Nombre Completo y Cargo *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Ing. Roberto Mendoza (Especialista Forense)"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-700 block mb-1 font-medium">
              Correo Electrónico Institucional *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="r.mendoza@regiontacna.gob.pe"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 block mb-1 font-medium">
                Rol en el SOC
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as SystemUser['role'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none font-mono"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Security Analyst">Security Analyst</option>
                <option value="Auditor">Auditor</option>
                <option value="Operator">Operator</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 block mb-1 font-medium">
                Departamento
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Área de Seguridad"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 text-slate-800 cursor-pointer p-3 bg-slate-50 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <div>
                <span className="font-semibold block">Exigir Autenticación en Dos Pasos (2FA Obligatorio)</span>
                <span className="text-[11px] text-slate-500">Envío de código de activación TOTP al correo en el primer inicio.</span>
              </div>
            </label>
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
              <UserPlus className="w-4 h-4" />
              <span>Crear Cuenta de Usuario</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
