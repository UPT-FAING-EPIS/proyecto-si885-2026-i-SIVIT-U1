import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  BarChart3, 
  FileText, 
  Database, 
  Settings, 
  Users, 
  ScrollText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { NavigationTab, SystemUser } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentUser: SystemUser;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'websites' as NavigationTab, label: 'Sitios Web', icon: Globe },
    { id: 'vulnerabilities' as NavigationTab, label: 'Vulnerabilidades', icon: ShieldAlert },
    { id: 'evaluaciones' as NavigationTab, label: 'Evaluaciones', icon: BarChart3 },
    { id: 'reports' as NavigationTab, label: 'Reportes', icon: FileText },
    { id: 'data-sources' as NavigationTab, label: 'Fuentes de Datos', icon: Database },
  ];

  const adminItems = [
    { id: 'user-management' as NavigationTab, label: 'Admin Usuarios', icon: Users, badge: 'Admin' },
    { id: 'audit-logs' as NavigationTab, label: 'Logs y Auditoría', icon: ScrollText, badge: 'Live' },
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    onSelectTab(tabId);
    if (isOpenMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-[260px] bg-white border-r border-slate-200 flex flex-col py-6 z-50 transition-transform duration-200 ease-in-out shadow-sm
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header with White + Crimson Red */}
        <div className="px-5 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center relative shadow-sm shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-sans font-bold text-[17px] text-slate-900 tracking-tight leading-snug truncate">
              Tacna Vulnerability
            </h1>
            <p className="font-mono text-[11px] text-red-600 font-bold uppercase tracking-wider">
              SOC DASHBOARD
            </p>
          </div>
        </div>

        {/* Primary Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          <div className="px-3 py-1 font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Monitoreo
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                  ${isActive 
                    ? 'text-red-700 bg-red-50/80 border-l-4 border-red-600 shadow-xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          {/* Administrator / Audit Section */}
          <div className="pt-4 mt-2 border-t border-slate-200">
            <div className="px-3 py-1 font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center justify-between">
              <span>Gobernanza & Auditoría</span>
              <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                Admin
              </span>
            </div>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                    ${isActive 
                      ? 'text-red-700 bg-red-50/80 border-l-4 border-red-600 shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    item.badge === 'Live' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Config & Active User Status */}
        <div className="px-3 pt-3 border-t border-slate-200 space-y-1 mt-auto">
          <button
            onClick={() => handleNavClick('settings')}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
              ${currentTab === 'settings' 
                ? 'text-red-700 bg-red-50 border-l-4 border-red-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }
            `}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Configuración</span>
          </button>

          {/* User mini status card */}
          <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              UD
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-slate-500 truncate">{currentUser.role}</span>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
};
