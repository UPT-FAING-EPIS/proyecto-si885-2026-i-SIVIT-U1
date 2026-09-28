import { createClient } from '@supabase/supabase-js';
import { 
  WebsiteItem, 
  EvaluationItem, 
  SystemUser, 
  AuditLogItem 
} from './types';
import { 
  initialWebsites, 
  initialEvaluaciones, 
  initialUsers, 
  initialAuditLogs 
} from './mockData';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://moqrfgsgcczcogwhbrsd.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcXJmZ3NnY2N6Y29nd2hicnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MTM1NDgsImV4cCI6MjEwNjA4OTU0OH0.AzplvueQR7ekAZowcTAe6RDZt97cGc_AZLbaOHOVQfs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── WEBSITES ─────────────────────────────────────────────────────────────
export async function getWebsitesFromDb(): Promise<WebsiteItem[]> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('risk_score', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialWebsites;
    }

    return data.map((d: any) => ({
      id: String(d.id || `site-${Date.now()}`),
      name: String(d.name || 'Portal Institucional'),
      institution: String(d.institution || 'Entidad Tacna'),
      category: d.category || 'Gobierno',
      url: String(d.url || 'https://tacna.gob.pe'),
      ip: String(d.ip || '190.119.200.45'),
      lastEvaluation: String(d.last_evaluation || 'Pendiente'),
      vulnCount: Number(d.vuln_count) || 0,
      criticalCount: Number(d.critical_count) || 0,
      highCount: Number(d.high_count) || 0,
      mediumCount: Number(d.medium_count) || 0,
      lowCount: Number(d.low_count) || 0,
      riskScore: Number(d.risk_score) || 0,
      riskLevel: d.risk_level || 'Bajo',
      status: d.status || 'Activo'
    }));
  } catch (err) {
    console.warn('Error fetching websites from Supabase, using local fallback:', err);
    return initialWebsites;
  }
}

export async function insertWebsiteToDb(site: WebsiteItem): Promise<boolean> {
  try {
    const { error } = await supabase.from('websites').insert([{
      id: site.id,
      name: site.name,
      institution: site.institution,
      category: site.category,
      url: site.url,
      ip: site.ip,
      last_evaluation: site.lastEvaluation,
      vuln_count: site.vulnCount,
      critical_count: site.criticalCount,
      high_count: site.highCount,
      medium_count: site.mediumCount,
      low_count: site.lowCount,
      risk_score: site.riskScore,
      risk_level: site.riskLevel,
      status: site.status
    }]);
    return !error;
  } catch {
    return false;
  }
}

// ─── EVALUATIONS ──────────────────────────────────────────────────────────
export async function getEvaluationsFromDb(): Promise<EvaluationItem[]> {
  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialEvaluaciones;
    }

    return data.map((d: any) => ({
      id: d.id,
      target: d.target,
      date: d.date || '2026-09-27',
      critical: d.critical || 0,
      high: d.high || 0,
      medium: d.medium || 0,
      low: d.low || 0,
      score: d.score || 'B',
      status: d.status || 'Completado',
      progress: d.progress
    }));
  } catch (err) {
    console.warn('Error fetching evaluations from Supabase:', err);
    return initialEvaluaciones;
  }
}

export async function insertEvaluationToDb(ev: EvaluationItem): Promise<boolean> {
  try {
    const { error } = await supabase.from('evaluations').insert([{
      id: ev.id,
      target: ev.target,
      date: ev.date,
      score: ev.score,
      critical: ev.critical,
      high: ev.high,
      medium: ev.medium,
      low: ev.low,
      status: ev.status,
      progress: ev.progress
    }]);
    return !error;
  } catch {
    return false;
  }
}

// ─── AUDIT LOGS ───────────────────────────────────────────────────────────
export async function getAuditLogsFromDb(): Promise<AuditLogItem[]> {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialAuditLogs;
    }

    return data.map((d: any) => ({
      id: d.id,
      timestamp: d.timestamp,
      actor: {
        name: d.actor_name || 'Sistema',
        email: d.actor_email || 'soc@tacnasoc.pe',
        role: d.actor_role || 'Super Admin'
      },
      eventType: d.event_type || 'CONFIG_MODIFIED',
      target: d.target || 'General',
      ipAddress: d.ip || '190.239.77.102',
      location: d.location || 'Tacna, Perú',
      severity: d.severity || 'INFO',
      description: d.description || '',
      sha256Checksum: d.sha256_hash || '',
      details: d.details || {}
    }));
  } catch (err) {
    console.warn('Error fetching audit logs from Supabase:', err);
    return initialAuditLogs;
  }
}

export async function insertAuditLogToDb(log: AuditLogItem): Promise<boolean> {
  try {
    const { error } = await supabase.from('audit_logs').insert([{
      id: log.id,
      timestamp: log.timestamp,
      actor_name: log.actor.name,
      actor_email: log.actor.email,
      actor_role: log.actor.role,
      event_type: log.eventType,
      target: log.target,
      ip: log.ipAddress,
      location: log.location,
      severity: log.severity,
      description: log.description,
      sha256_hash: log.sha256Checksum,
      details: log.details
    }]);
    return !error;
  } catch {
    return false;
  }
}

// ─── SYSTEM USERS ─────────────────────────────────────────────────────────
export async function getUsersFromDb(): Promise<SystemUser[]> {
  try {
    const { data, error } = await supabase
      .from('system_users')
      .select('*');

    if (error || !data || data.length === 0) {
      return initialUsers;
    }

    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      role: d.role,
      department: d.department || 'Ciberseguridad',
      status: d.status || 'Activo',
      twoFactorEnabled: d.two_factor_enabled ?? true,
      lastLogin: d.last_login || '2026-09-27',
      ipAddress: d.ip_address || '190.239.77.102 (Tacna)',
      createdAt: d.created_at || '2026-01-15'
    }));
  } catch (err) {
    console.warn('Error fetching users from Supabase:', err);
    return initialUsers;
  }
}

export async function insertUserToDb(user: SystemUser): Promise<boolean> {
  try {
    const { error } = await supabase.from('system_users').insert([{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      two_factor_enabled: user.twoFactorEnabled,
      last_login: user.lastLogin,
      ip_address: user.ipAddress
    }]);
    if (error) {
      console.error('Error inserting user to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception inserting user to Supabase:', err);
    return false;
  }
}

export async function updateUserStatusInDb(userId: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('system_users')
      .update({ status })
      .eq('id', userId);
    return !error;
  } catch {
    return false;
  }
}

export async function updateUserRoleInDb(userId: string, role: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('system_users')
      .update({ role })
      .eq('id', userId);
    return !error;
  } catch {
    return false;
  }
}

