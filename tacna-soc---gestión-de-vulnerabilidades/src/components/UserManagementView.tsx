import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Lock, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  KeyRound,
  Edit2,
  Trash2,
  Sliders,
  History
} from 'lucide-react';
import { SystemUser } from '../types';

interface UserManagementViewProps {
  users: SystemUser[];
  onOpenNewUserModal: () => void;
  onToggleUserStatus: (userId: string) => void;
  onUpdateRole: (userId: string, newRole: SystemUser['role']) => void;
  onViewUserAuditLogs: (userEmail: string) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  onOpenNewUserModal,
  onToggleUserStatus,
  onUpdateRole,
  onViewUserAuditLogs
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');

  const roles = ['Todos', 'Super Admin', 'Security Analyst', 'Auditor', 'Operator'];

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'Todos' || u.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header & Create User Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
              Administración de Usuarios y Permisos
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-50 text-red-700 border border-red-200 font-semibold">
              RBAC SOC
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Gestión centralizada de identidades, perfiles de analistas, roles y control de acceso multifactor (MFA).
          </p>
        </div>

        <button
          onClick={onOpenNewUserModal}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Crear Usuario</span>
        </button>
      </div>

      {/* Role Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Super Admins</span>
            <span className="font-mono text-xl font-bold text-slate-900 mt-0.5 block">1</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
            <KeyRound className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Analistas Sec</span>
            <span className="font-mono text-xl font-bold text-slate-800 mt-0.5 block">2</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Auditores Gov</span>
            <span className="font-mono text-xl font-bold text-slate-800 mt-0.5 block">1</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Operadores N1</span>
            <span className="font-mono text-xl font-bold text-slate-800 mt-0.5 block">1</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, correo o departamento..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`
                px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer
                ${selectedRole === r 
                  ? 'bg-red-600 text-white font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }
              `}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Usuario / Identidad</th>
                <th className="py-3 px-3">Rol Asignado</th>
                <th className="py-3 px-3">Departamento / Área</th>
                <th className="py-3 px-3 text-center">MFA 2FA</th>
                <th className="py-3 px-3">Último Acceso / IP</th>
                <th className="py-3 px-3 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center font-bold text-xs text-red-700 shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-slate-900 block">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateRole(user.id, e.target.value as SystemUser['role'])}
                      className="font-mono text-xs px-2 py-1 rounded border border-slate-300 bg-slate-50 text-slate-800 cursor-pointer focus:outline-none focus:border-red-500"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Security Analyst">Security Analyst</option>
                      <option value="Auditor">Auditor</option>
                      <option value="Operator">Operator</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-3 text-slate-700 font-sans">
                    {user.department}
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    {user.twoFactorEnabled ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Habilitado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-medium">
                        <XCircle className="w-3 h-3 text-red-600" /> Desactivado
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-xs text-slate-800 font-mono block">
                      {user.lastLogin}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {user.ipAddress}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onToggleUserStatus(user.id)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold transition-colors cursor-pointer ${
                        user.status === 'Activo' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                          : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                      }`}
                      title="Click para cambiar estado"
                    >
                      {user.status}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewUserAuditLogs(user.email)}
                        title="Ver traza de auditoría de este usuario"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      >
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
