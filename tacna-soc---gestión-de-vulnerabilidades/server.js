import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import dns from 'dns';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// ─────────────────────────────────────────────
// DNS IP RESOLUTION ENDPOINT
// ─────────────────────────────────────────────
app.get('/api/resolve-ip', async (req, res) => {
  const { host } = req.query;
  if (!host) return res.status(400).json({ error: 'host requerido' });
  try {
    const cleanHost = String(host).replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
    const lookup = await dns.promises.lookup(cleanHost);
    res.json({ ip: lookup.address, hostname: cleanHost });
  } catch (err) {
    res.status(404).json({ error: 'No se pudo resolver la IP vía DNS: ' + err.message });
  }
});

// ─────────────────────────────────────────────
// REAL SECURITY SCAN ENDPOINT
// ─────────────────────────────────────────────
app.post('/api/scan', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL requerida' });
  try {
    const result = await performSecurityScan(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// NVD CVE SEARCH ENDPOINT
// ─────────────────────────────────────────────
app.get('/api/cve/search', async (req, res) => {
  const { keyword = 'web', limit = 5 } = req.query;
  try {
    const nvdRes = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(keyword)}&resultsPerPage=${limit}`
    );
    if (!nvdRes.ok) throw new Error('NVD API no disponible');
    const data = await nvdRes.json();
    const cves = (data.vulnerabilities || []).map(v => ({
      id: v.cve.id,
      description: v.cve.descriptions?.find(d => d.lang === 'en')?.value || '',
      severity: v.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity || 'UNKNOWN',
      score: v.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore || null,
      published: v.cve.published?.slice(0, 10),
    }));
    res.json(cves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// GEMINI AI ANALYSIS ENDPOINT
// ─────────────────────────────────────────────
app.post('/api/ai/analyze', async (req, res) => {
  const { scanResult, url } = req.body;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });
  }

  const findings = (scanResult.findings || [])
    .map(f => `- [${f.severity}] ${f.name}: ${f.description}`)
    .join('\n');

  const prompt = `Eres un experto en ciberseguridad del SOC de Tacna, Peru. Analiza estos resultados de escaneo de seguridad y responde SOLO con un JSON valido sin markdown.

URL analizada: ${url}
Servidor: ${scanResult.server || 'desconocido'}
HTTPS: ${scanResult.isHttps ? 'Si' : 'No'}
Tiempo de respuesta: ${scanResult.responseTime || 0}ms
Hallazgos (${scanResult.totalFindings}):
${findings || 'Ninguno encontrado'}

Responde con este JSON exacto:
{
  "resumen": "parrafo conciso del estado de seguridad",
  "riesgoGeneral": "Critico o Alto o Medio o Bajo",
  "puntuacion": numero del 0 al 100,
  "recomendaciones": ["recomendacion 1", "recomendacion 2", "recomendacion 3"],
  "vulnerabilidadesPrincipales": [
    {"nombre": "nombre", "descripcion": "descripcion", "impacto": "impacto", "cvss": numero}
  ]
}`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
        })
      }
    );
    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      throw new Error(errData.error?.message || 'Error en Gemini API');
    }
    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { resumen: rawText, riesgoGeneral: 'Desconocido' };
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), geminiConfigured: !!GEMINI_API_KEY });
});

// ─────────────────────────────────────────────
// SECURITY SCAN ENGINE
// ─────────────────────────────────────────────
function performSecurityScan(targetUrl) {
  return new Promise((resolve) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
    } catch {
      return resolve({
        url: targetUrl, error: 'URL invalida', findings: [],
        totalFindings: 0, critical: 0, high: 0, medium: 0, low: 0,
        scanDate: new Date().toISOString(), isHttps: false
      });
    }

    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;
    const startTime = Date.now();
    const findings = [];

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname || '/',
      method: 'HEAD',
      timeout: 12000,
      rejectUnauthorized: false,
      headers: { 'User-Agent': 'TacnaSOC-Scanner/2.0' }
    };

    const reqHttp = client.request(options, (response) => {
      const h = response.headers;

      const headerChecks = [
        { key: 'strict-transport-security', label: 'HSTS', sev: 'HIGH',   cwe: 'CWE-319',  fix: 'Agregar: Strict-Transport-Security: max-age=31536000; includeSubDomains' },
        { key: 'x-frame-options',           label: 'X-Frame-Options',      sev: 'MEDIUM', cwe: 'CWE-1021', fix: 'Agregar: X-Frame-Options: SAMEORIGIN' },
        { key: 'x-content-type-options',    label: 'X-Content-Type-Options',sev: 'MEDIUM', cwe: 'CWE-430',  fix: 'Agregar: X-Content-Type-Options: nosniff' },
        { key: 'content-security-policy',   label: 'Content Security Policy (CSP)', sev: 'HIGH', cwe: 'CWE-79', fix: 'Implementar politica CSP restrictiva para prevenir XSS' },
        { key: 'referrer-policy',           label: 'Referrer-Policy',      sev: 'LOW',    cwe: 'CWE-200', fix: 'Agregar: Referrer-Policy: strict-origin-when-cross-origin' },
        { key: 'permissions-policy',        label: 'Permissions-Policy',   sev: 'LOW',    cwe: 'CWE-732', fix: 'Restringir acceso a APIs del navegador con Permissions-Policy' },
      ];

      for (const check of headerChecks) {
        if (!h[check.key]) {
          findings.push({
            type: 'MISSING_SECURITY_HEADER',
            name: `Cabecera ausente: ${check.label}`,
            severity: check.sev,
            cwe: check.cwe,
            description: `El servidor no incluye la cabecera de seguridad "${check.key}". Aumenta la superficie de ataque.`,
            remediation: check.fix,
          });
        }
      }

      if (!isHttps) {
        findings.push({
          type: 'INSECURE_TRANSPORT', name: 'Sin cifrado HTTPS',
          severity: 'CRITICAL', cwe: 'CWE-319',
          description: 'El sitio no usa HTTPS. Las credenciales y datos viajan en texto claro.',
          remediation: 'Instalar certificado TLS con Let\'s Encrypt y redirigir HTTP a HTTPS.',
        });
      }

      if (h['server'] && /\d/.test(h['server'])) {
        findings.push({
          type: 'INFORMATION_DISCLOSURE', name: 'Version de servidor expuesta',
          severity: 'LOW', cwe: 'CWE-200',
          description: `Cabecera Server revela: "${h['server']}"`,
          remediation: 'Ocultar la version en la configuracion del servidor web.',
        });
      }

      if (h['x-powered-by']) {
        findings.push({
          type: 'INFORMATION_DISCLOSURE', name: 'Cabecera X-Powered-By expuesta',
          severity: 'LOW', cwe: 'CWE-200',
          description: `Tecnologia revelada: "${h['x-powered-by']}"`,
          remediation: 'Eliminar X-Powered-By del servidor.',
        });
      }

      const rawCookies = h['set-cookie'];
      if (rawCookies) {
        const cookieStr = (Array.isArray(rawCookies) ? rawCookies : [rawCookies]).join(' ');
        if (!cookieStr.toLowerCase().includes('httponly')) {
          findings.push({
            type: 'INSECURE_COOKIE', name: 'Cookies sin HttpOnly',
            severity: 'MEDIUM', cwe: 'CWE-1004',
            description: 'Cookies de sesion accesibles via JavaScript (riesgo XSS).',
            remediation: 'Agregar el atributo HttpOnly a todas las cookies.',
          });
        }
        if (isHttps && !cookieStr.toLowerCase().includes('secure')) {
          findings.push({
            type: 'INSECURE_COOKIE', name: 'Cookies sin atributo Secure',
            severity: 'MEDIUM', cwe: 'CWE-614',
            description: 'Cookies pueden transmitirse por HTTP no cifrado.',
            remediation: 'Agregar el atributo Secure a las cookies sensibles.',
          });
        }
      }

      const duration = Date.now() - startTime;
      resolve({
        url: targetUrl,
        statusCode: response.statusCode,
        responseTime: duration,
        server: h['server'] || 'No revelado',
        poweredBy: h['x-powered-by'] || null,
        isHttps,
        findings,
        totalFindings: findings.length,
        critical: findings.filter(f => f.severity === 'CRITICAL').length,
        high:     findings.filter(f => f.severity === 'HIGH').length,
        medium:   findings.filter(f => f.severity === 'MEDIUM').length,
        low:      findings.filter(f => f.severity === 'LOW').length,
        scanDate: new Date().toISOString(),
      });
    });

    reqHttp.on('timeout', () => {
      reqHttp.destroy();
      resolve({
        url: targetUrl, error: 'Timeout (>12s)',
        findings: [{ type: 'TIMEOUT', name: 'Timeout de conexion', severity: 'HIGH', cwe: 'CWE-400',
          description: 'El sitio no respondio en el tiempo esperado.',
          remediation: 'Verificar disponibilidad y rendimiento del servidor.' }],
        totalFindings: 1, critical: 0, high: 1, medium: 0, low: 0,
        isHttps: false, scanDate: new Date().toISOString(),
      });
    });

    reqHttp.on('error', (err) => {
      resolve({
        url: targetUrl, error: err.message,
        findings: [{ type: 'CONNECTION_ERROR', name: 'Error de conexion', severity: 'CRITICAL', cwe: 'CWE-693',
          description: `No se pudo conectar: ${err.message}`,
          remediation: 'Verificar que el sitio esta en linea y accesible.' }],
        totalFindings: 1, critical: 1, high: 0, medium: 0, low: 0,
        isHttps: false, scanDate: new Date().toISOString(),
      });
    });

    reqHttp.end();
  });
}

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TacnaSOC Server corriendo en puerto ${PORT}`);
  console.log(`Gemini AI: ${GEMINI_API_KEY ? 'Configurado' : 'Sin API Key'}`);
});
