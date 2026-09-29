export type NavigationTab = 
  | 'dashboard'
  | 'websites'
  | 'vulnerabilities'
  | 'evaluations'
  | 'evaluaciones'
  | 'reports'
  | 'data-sources'
  | 'user-management'
  | 'audit-logs'
  | 'settings'
  | 'guide';

export type RiskLevel = 'Crítico' | 'Alto' | 'Medio' | 'Bajo';

export interface WebsiteItem {
  id: string;
  name: string;
  institution: string;
  category: 'Gobierno' | 'Educación' | 'Salud' | 'Finanzas';
  url: string;
  ip: string;
  lastEvaluation: string;
  vulnCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: 'Activo' | 'Inactivo';
}

export interface VulnerabilityItem {
  id: string;
  cve: string;
  name: string;
  owaspCategory: string;
  cweId: string;
  cvssScore: number;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  detectionDate: string;
  description: string;
  cvssVector: string;
  attackVector: 'Network' | 'Adjacent' | 'Local' | 'Physical';
  attackComplexity: 'Low' | 'High';
  privilegesRequired: 'None' | 'Low' | 'High';
  userInteraction: 'None' | 'Required';
  nvdPublicationDate: string;
  remediation: string[];
  affectedSites: {
    siteName: string;
    ip: string;
    status: 'Activo' | 'Mitigado';
  }[];
  sources: {
    title: string;
    url: string;
  }[];
}

export interface EvaluationItem {
  id: string;
  target: string;
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  score: 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  status: 'Completado' | 'En Progreso' | 'Fallido';
  progress?: number;
}

export interface DataSourceItem {
  id: string;
  name: string;
  badge: 'Global' | 'Industry' | 'Framework' | 'Internal' | 'Experimental';
  badgeColor: string;
  description: string;
  statusType: 'Live Sync' | 'Static Ref' | 'Streaming' | 'Restricted';
  statusColor: string;
  endpoint: string;
  lastSync: string;
  recordsCount: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  role: 'Super Admin' | 'Security Analyst' | 'Auditor' | 'Operator';
  department: string;
  status: 'Activo' | 'Suspendido' | 'Pendiente';
  twoFactorEnabled: boolean;
  lastLogin: string;
  ipAddress: string;
  createdAt: string;
}

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'AUDIT';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  eventType: 
    | 'AUTH_LOGIN_SUCCESS'
    | 'AUTH_LOGIN_FAILED'
    | 'USER_CREATED'
    | 'USER_ROLE_UPDATED'
    | 'USER_SUSPENDED'
    | 'SCAN_TRIGGERED'
    | 'SCAN_COMPLETED'
    | 'VULN_STATUS_UPDATED'
    | 'REPORT_EXPORTED'
    | 'CONFIG_MODIFIED'
    | 'API_KEY_ROTATED';
  actor: {
    name: string;
    email: string;
    role: string;
  };
  severity: AuditSeverity;
  target: string;
  ipAddress: string;
  location: string;
  description: string;
  sha256Checksum: string;
  details: Record<string, unknown>;
}
