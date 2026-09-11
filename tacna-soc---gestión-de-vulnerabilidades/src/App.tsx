import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { WebsitesView } from './components/WebsitesView';
import { WebsiteDetailView } from './components/WebsiteDetailView';
import { VulnerabilitiesView } from './components/VulnerabilitiesView';
import { VulnerabilityDetailView } from './components/VulnerabilityDetailView';
import { EvaluationsView } from './components/EvaluationsView';
import { ReportsView } from './components/ReportsView';
import { DataSourcesView } from './components/DataSourcesView';
import { UserManagementView } from './components/UserManagementView';
import { AuditLogsView } from './components/AuditLogsView';
import { SettingsView } from './components/SettingsView';
import { NewSiteModal } from './components/NewSiteModal';
import { NewScanModal } from './components/NewScanModal';
import { NewUserModal } from './components/NewUserModal';
import { AuditDetailModal } from './components/AuditDetailModal';

import { 
  NavigationTab, 
  WebsiteItem, 
  VulnerabilityItem, 
  EvaluationItem, 
  DataSourceItem, 
  SystemUser, 
  AuditLogItem 
} from './types';

import { 
  initialWebsites, 
  initialVulnerabilities, 
  initialEvaluaciones, 
  initialDataSources, 
  initialUsers, 
  initialAuditLogs 
} from './mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedVulnCve, setSelectedVulnCve] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActorEmail, setFilterActorEmail] = useState<string | null>(null);
  const [inspectedLog, setInspectedLog] = useState<AuditLogItem | null>(null);

  // Modals state
  const [isNewSiteModalOpen, setIsNewSiteModalOpen] = useState(false);
  const [isNewScanModalOpen, setIsNewScanModalOpen] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // System state
  const [websites, setWebsites] = useState<WebsiteItem[]>(initialWebsites);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityItem[]>(initialVulnerabilities);
  const [evaluaciones, setEvaluaciones] = useState<EvaluationItem[]>(initialEvaluaciones);
  const [dataSources, setDataSources] = useState<DataSourceItem[]>(initialDataSources);
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);

  // Active user profile (Administrator by default)
  const [currentUser, setCurrentUser] = useState<SystemUser>(initialUsers[0]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper to append an audit log
  const logAuditEvent = (
    eventType: AuditLogItem['eventType'],
    severity: AuditLogItem['severity'],
    target: string,
    description: string,
    details: Record<string, unknown> = {}
  ) => {
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);

    const newLog: AuditLogItem = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp,
      eventType,
      actor: {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role
      },
      severity,
      target,
      ipAddress: currentUser.ipAddress.split(' ')[0] || '190.239.77.102',
      location: 'Tacna, Perú',
      description,
      sha256Checksum: randomHex,
      details
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Switch role for simulation
  const handleSelectUserRole = (newRole: SystemUser['role']) => {
    setCurrentUser(prev => ({ ...prev, role: newRole }));
    logAuditEvent(
      'CONFIG_MODIFIED',
      'INFO',
      `Perfil Activo: ${newRole}`,
      `El usuario conmutó su rol activo a ${newRole} para pruebas de gobernanza.`,
      { previousRole: currentUser.role, newRole }
    );
    showToast(`Rol activo cambiado a: ${newRole}`);
  };

  // Handle adding new site
  const handleAddSite = (newSiteData: Omit<WebsiteItem, 'id' | 'lastEvaluation' | 'vulnCount' | 'criticalCount' | 'highCount' | 'mediumCount' | 'lowCount' | 'riskScore' | 'riskLevel'>) => {
    const newSite: WebsiteItem = {
      ...newSiteData,
      id: `site-${Date.now()}`,
      lastEvaluation: 'Pendiente de Escaneo',
      vulnCount: 0,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      riskScore: 10,
      riskLevel: 'Bajo'
    };

    setWebsites(prev => [newSite, ...prev]);
    logAuditEvent(
      'CONFIG_MODIFIED',
      'AUDIT',
      newSite.url,
      `Nuevo activo web registrado para monitoreo continuo: ${newSite.name} (${newSite.url})`,
      { siteName: newSite.name, ip: newSite.ip, category: newSite.category }
    );
    showToast(`Sitio "${newSite.name}" registrado correctamente.`);
  };

  // Handle quick scan
  const handleQuickScan = (site: WebsiteItem) => {
    const newEvalId = `EVAL-${Math.floor(100 + Math.random() * 900)}`;
    const newEval: EvaluationItem = {
      id: newEvalId,
      target: site.url.replace('https://', ''),
      date: 'Ahora mismo',
      critical: site.criticalCount,
      high: site.highCount,
      medium: site.mediumCount,
      low: site.lowCount,
      score: site.riskScore >= 70 ? 'D' : site.riskScore >= 40 ? 'B' : 'A',
      status: 'En Progreso',
      progress: 25
    };

    setEvaluaciones(prev => [newEval, ...prev]);
    setCurrentTab('evaluaciones');
    logAuditEvent(
      'SCAN_TRIGGERED',
      'AUDIT',
      site.url,
      `Escaneo de seguridad lanzado sobre el activo ${site.name} (${site.ip}).`,
      { evaluationId: newEvalId, targetUrl: site.url }
    );
    showToast(`Iniciando escaneo sobre ${site.name}...`);

    // Simulate scan progression
    setTimeout(() => {
      setEvaluaciones(prev => prev.map(e => e.id === newEvalId ? { ...e, progress: 75 } : e));
    }, 1500);

    setTimeout(() => {
      setEvaluaciones(prev => prev.map(e => e.id === newEvalId ? { ...e, status: 'Completado', progress: 100 } : e));
      logAuditEvent(
        'SCAN_COMPLETED',
        'INFO',
        site.url,
        `Escaneo ${newEvalId} completado exitosamente sin interrupciones.`,
        { evaluationId: newEvalId, score: newEval.score }
      );
      showToast(`Escaneo de ${site.name} completado.`);
    }, 3200);
  };

  // Handle new scan modal submission
  const handleStartScan = (targetUrl: string, scanType: string) => {
    const newEvalId = `EVAL-${Math.floor(100 + Math.random() * 900)}`;
    const newEval: EvaluationItem = {
      id: newEvalId,
      target: targetUrl.replace('https://', ''),
      date: 'Ahora mismo',
      critical: 1,
      high: 3,
      medium: 5,
      low: 12,
      score: 'B',
      status: 'En Progreso',
      progress: 35
    };

    setEvaluaciones(prev => [newEval, ...prev]);
    setCurrentTab('evaluaciones');
    logAuditEvent(
      'SCAN_TRIGGERED',
      'AUDIT',
      targetUrl,
      `Evaluación ${scanType} iniciada sobre ${targetUrl}.`,
      { scanType, targetUrl }
    );
    showToast(`Evaluación iniciada para ${targetUrl}.`);

    setTimeout(() => {
      setEvaluaciones(prev => prev.map(e => e.id === newEvalId ? { ...e, status: 'Completado', progress: 100 } : e));
    }, 2800);
  };

  // Handle adding new user
  const handleAddUser = (newUserData: Omit<SystemUser, 'id' | 'lastLogin' | 'ipAddress' | 'createdAt'>) => {
    const newUser: SystemUser = {
      ...newUserData,
      id: `usr-${Date.now()}`,
      lastLogin: 'Nunca (Pendiente activación)',
      ipAddress: 'Sin registro previo',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    setUsers(prev => [newUser, ...prev]);
    logAuditEvent(
      'USER_CREATED',
      'CRITICAL',
      newUser.email,
      `Creación de nuevo usuario con rol ${newUser.role} asignado a ${newUser.name}.`,
      { email: newUser.email, role: newUser.role, department: newUser.department }
    );
    showToast(`Usuario ${newUser.name} creado exitosamente.`);
  };

  // Handle toggling user status (Active / Suspended)
  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Activo' ? 'Suspendido' : 'Activo';
        logAuditEvent(
          nextStatus === 'Suspendido' ? 'USER_SUSPENDED' : 'USER_ROLE_UPDATED',
          nextStatus === 'Suspendido' ? 'CRITICAL' : 'WARNING',
          u.email,
          `Estado de usuario ${u.name} cambiado a ${nextStatus}.`,
          { userId: u.id, previousStatus: u.status, newStatus: nextStatus }
        );
        showToast(`Usuario ${u.name}: ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Handle updating role
  const handleUpdateRole = (userId: string, newRole: SystemUser['role']) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        logAuditEvent(
          'USER_ROLE_UPDATED',
          'CRITICAL',
          u.email,
          `Rol de seguridad del usuario ${u.name} actualizado de ${u.role} a ${newRole}.`,
          { userId: u.id, oldRole: u.role, newRole }
        );
        showToast(`Rol de ${u.name} cambiado a ${newRole}`);
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  // View user's audit logs
  const handleViewUserAuditLogs = (userEmail: string) => {
    setFilterActorEmail(userEmail);
    setCurrentTab('audit-logs');
  };

  // Simulate an event in Audit Logs
  const handleSimulateAuditEvent = () => {
    const events = [
      {
        type: 'VULN_STATUS_UPDATED' as const,
        sev: 'WARNING' as const,
        target: 'CVE-2023-28252',
        desc: 'Actualización de ticket de remediación: Parche aplicado en WAF para SQL Injection.'
      },
      {
        type: 'AUTH_LOGIN_SUCCESS' as const,
        sev: 'INFO' as const,
        target: 'API Key SOC Tacna',
        desc: 'Sincronización periódica automática con feed NVD completada con 42 nuevos registros.'
      },
      {
        type: 'AUTH_LOGIN_FAILED' as const,
        sev: 'CRITICAL' as const,
        target: 'Panel de Administración',
        desc: 'Intento de acceso denegado por IP no autorizada desde segmento WAN externo.'
      }
    ];

    const pick = events[Math.floor(Math.random() * events.length)];
    logAuditEvent(pick.type, pick.sev, pick.target, pick.desc, { simulated: true });
    showToast('Evento de auditoría registrado en el log inmutable.');
  };

  // Export report
  const handleExportReport = (format: 'PDF' | 'EXCEL') => {
    logAuditEvent(
      'REPORT_EXPORTED',
      'AUDIT',
      `Informe_Ejecutivo_Tacna_SOC.${format.toLowerCase()}`,
      `Descarga de reporte ejecutivo oficial consolidado en formato ${format}.`,
      { format, scope: 'Consolidado General 150 Activos' }
    );
    showToast(`Reporte ${format} generado y firmado digitalmente.`);
  };

  // Navigation handlers
  const handleSelectSiteFromList = (siteId: string) => {
    setSelectedSiteId(siteId);
  };

  const handleSelectSiteByName = (siteName: string) => {
    const found = websites.find(w => 
      w.name.toLowerCase().includes(siteName.toLowerCase()) || 
      w.url.toLowerCase().includes(siteName.toLowerCase())
    );
    if (found) {
      setSelectedSiteId(found.id);
      setCurrentTab('websites');
    } else {
      showToast(`Activo ${siteName} visualizado.`);
    }
  };

  const handleSelectVuln = (cve: string) => {
    setSelectedVulnCve(cve);
  };

  // Active site object
  const currentSite = websites.find(w => w.id === selectedSiteId) || websites[0];

  // Active vulnerability object
  const currentVuln = vulnerabilities.find(v => v.cve === selectedVulnCve) || vulnerabilities[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans">
      {/* Toast Notification Alert Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-slate-900 border border-slate-200 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-mono animate-in slide-in-from-bottom-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setSelectedSiteId(null);
          setSelectedVulnCve(null);
        }}
        currentUser={currentUser}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:pl-[260px] min-w-0">
        {/* Top Navbar */}
        <TopHeader
          currentUser={currentUser}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onSelectUserRole={handleSelectUserRole}
          onOpenAuditLogs={() => {
            setCurrentTab('audit-logs');
            setFilterActorEmail(null);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content Area with top header padding */}
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 max-w-7xl w-full mx-auto overflow-y-auto">
          {/* Dashboard View */}
          {currentTab === 'dashboard' && (
            <DashboardView
              websites={websites}
              onSelectSite={handleSelectSiteByName}
              onNavigateToVulns={() => {
                setCurrentTab('vulnerabilities');
                setSelectedVulnCve(null);
              }}
              onNavigateToSites={() => {
                setCurrentTab('websites');
                setSelectedSiteId(null);
              }}
            />
          )}

          {/* Websites View & Detail Subview */}
          {currentTab === 'websites' && (
            selectedSiteId ? (
              <WebsiteDetailView
                site={currentSite}
                vulnerabilities={vulnerabilities}
                onBack={() => setSelectedSiteId(null)}
                onSelectVuln={(cve) => {
                  setSelectedVulnCve(cve);
                  setCurrentTab('vulnerabilities');
                }}
                onReevaluate={handleQuickScan}
              />
            ) : (
              <WebsitesView
                websites={websites}
                onSelectSite={handleSelectSiteFromList}
                onOpenNewSiteModal={() => setIsNewSiteModalOpen(true)}
                onQuickScan={handleQuickScan}
              />
            )
          )}

          {/* Vulnerabilities View & Detail Subview */}
          {currentTab === 'vulnerabilities' && (
            selectedVulnCve ? (
              <VulnerabilityDetailView
                vuln={currentVuln}
                onBack={() => setSelectedVulnCve(null)}
                onSelectSiteByName={handleSelectSiteByName}
              />
            ) : (
              <VulnerabilitiesView
                vulnerabilities={vulnerabilities}
                onSelectVuln={handleSelectVuln}
              />
            )
          )}

          {/* Evaluations View */}
          {currentTab === 'evaluaciones' && (
            <EvaluationsView
              evaluaciones={evaluaciones}
              onOpenNewScanModal={() => setIsNewScanModalOpen(true)}
              onRerunScan={(item) => handleStartScan(item.target, 'RE_RUN')}
            />
          )}

          {/* Executive Reports View */}
          {currentTab === 'reports' && (
            <ReportsView
              onExportReport={handleExportReport}
            />
          )}

          {/* Threat Intelligence Data Sources View */}
          {currentTab === 'data-sources' && (
            <DataSourcesView
              dataSources={dataSources}
              onSyncSource={(id) => {
                logAuditEvent('CONFIG_MODIFIED', 'INFO', `Data Source ${id}`, `Sincronización manual iniciada para conector ${id}.`);
                showToast(`Feed ${id} sincronizado.`);
              }}
              onSyncAll={() => {
                logAuditEvent('CONFIG_MODIFIED', 'INFO', 'All Threat Feeds', 'Sincronización global de todos los feeds de inteligencia.');
                showToast('Todas las fuentes de datos han sido sincronizadas.');
              }}
            />
          )}

          {/* User Management & RBAC View (Requested for Administrator) */}
          {currentTab === 'user-management' && (
            <UserManagementView
              users={users}
              onOpenNewUserModal={() => setIsNewUserModalOpen(true)}
              onToggleUserStatus={handleToggleUserStatus}
              onUpdateRole={handleUpdateRole}
              onViewUserAuditLogs={handleViewUserAuditLogs}
            />
          )}

          {/* System Audit Logs View (Requested for Administrator) */}
          {currentTab === 'audit-logs' && (
            <AuditLogsView
              logs={auditLogs}
              filterActor={filterActorEmail || undefined}
              onClearActorFilter={() => setFilterActorEmail(null)}
              onSimulateEvent={handleSimulateAuditEvent}
              onInspectLog={(log) => setInspectedLog(log)}
            />
          )}

          {/* SOC System Settings View */}
          {currentTab === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              onSaveSettingsNotification={(msg) => {
                logAuditEvent('CONFIG_MODIFIED', 'WARNING', 'Configuración Global SOC', msg);
                showToast(msg);
              }}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewSiteModal
        isOpen={isNewSiteModalOpen}
        onClose={() => setIsNewSiteModalOpen(false)}
        onAddSite={handleAddSite}
      />

      <NewScanModal
        isOpen={isNewScanModalOpen}
        onClose={() => setIsNewScanModalOpen(false)}
        websites={websites}
        onStartScan={handleStartScan}
      />

      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <AuditDetailModal
        log={inspectedLog}
        onClose={() => setInspectedLog(null)}
      />
    </div>
  );
}
