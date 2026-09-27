// API client for TacnaSOC real scanning endpoints

export interface SecurityFinding {
  type: string;
  name: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cwe?: string;
  description: string;
  remediation?: string;
}

export interface ScanResult {
  url: string;
  statusCode?: number;
  responseTime?: number;
  server?: string;
  poweredBy?: string | null;
  isHttps: boolean;
  findings: SecurityFinding[];
  totalFindings: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  scanDate: string;
  error?: string;
}

export interface AIAnalysis {
  resumen: string;
  riesgoGeneral: 'Crítico' | 'Alto' | 'Medio' | 'Bajo' | string;
  puntuacion?: number;
  recomendaciones: string[];
  vulnerabilidadesPrincipales: Array<{
    nombre: string;
    descripcion: string;
    impacto: string;
    cvss?: number;
  }>;
  error?: string;
}

export async function scanUrl(url: string): Promise<ScanResult> {
  const response = await fetch('/api/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(err.error || 'Error en el escaneo');
  }
  return response.json();
}

export async function analyzeWithAI(scanResult: ScanResult): Promise<AIAnalysis> {
  const response = await fetch('/api/ai/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scanResult, url: scanResult.url }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(err.error || 'Error en análisis IA');
  }
  return response.json();
}

export async function searchCVE(keyword: string, limit = 5): Promise<Array<{
  id: string; description: string; severity: string; score: number | null; published: string;
}>> {
  const response = await fetch(`/api/cve/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`);
  if (!response.ok) throw new Error('Error buscando CVEs');
  return response.json();
}
