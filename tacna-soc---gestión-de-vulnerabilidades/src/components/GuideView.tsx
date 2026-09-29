import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Globe, 
  ShieldAlert, 
  BarChart3, 
  FileText, 
  Users, 
  ScrollText, 
  Settings, 
  Sparkles, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Eye, 
  Shield, 
  Server, 
  Zap, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Download,
  AlertTriangle,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { NavigationTab } from '../types';

interface GuideViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenNewScan?: () => void;
}

type GuideSection = 'all' | 'getting-started' | 'modules' | 'scanner' | 'roles' | 'faq';

export const GuideView: React.FC<GuideViewProps> = ({ onNavigateTab, onOpenNewScan }) => {
  const [activeSection, setActiveSection] = useState<GuideSection>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: '¿Cómo realiza Tacna SOC el escaneo de seguridad en sitios web?',
      a: 'El motor del SOC realiza una petición HTTP/HTTPS real al portal objetivo analizando cabeceras críticas de respuesta como HSTS (Strict-Transport-Security), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy y directivas de cookies seguras (Secure, HttpOnly, SameSite). Con base en estas cabeceras se calcula un puntaje de 0 a 100 y una calificación de la A a la F.'
    },
    {
      q: '¿Cómo funciona la Inteligencia Artificial (Gemini) en el análisis?',
      a: 'Una vez completado el escaneo de cabeceras, los hallazgos son procesados por el modelo Google Gemini 2.0 Flash a través de nuestra API backend. La IA evalúa el contexto de la entidad tacneña, genera un resumen ejecutivo no técnico para directivos, calcula un índice de riesgo contextual y redacta recomendaciones específicas de remediación técnica paso a paso.'
    },
    {
      q: '¿Qué es una vulnerabilidad CVE y cómo se vincula en el sistema?',
      a: 'Un CVE (Common Vulnerabilities and Exposures) es un identificador estándar internacional de fallas de seguridad conocidas. Nuestra plataforma consulta la base de datos nacional de vulnerabilidades (NVD/NIST) para mostrar descripciones, vectores de ataque CVSS v3.1, severidad oficial y medidas de corrección aplicables a los sistemas de la región.'
    },
    {
      q: '¿Qué garantizan los Logs de Auditoría con hash criptográfico SHA-256?',
      a: 'Cada acción crítica (inicio de sesión, escaneo, cambio de configuración o modificación de usuarios) genera una entrada inmutable con un hash SHA-256. Esto asegura la no-repudiación y permite auditorías forenses fiables requeridas por normativas de seguridad de la información como ISO/IEC 27001.'
    },
    {
      q: '¿Cómo cierro sesión de manera segura?',
      a: 'Puedes cerrar sesión en cualquier momento haciendo clic en el botón rojo con icono de salida ubicado en la barra lateral izquierda (al lado de tu perfil) o desplegando el menú superior derecho y seleccionando "Cerrar Sesión Segura". El sistema limpiará la sesión activa y te retornará al portal de acceso.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Monitorear el Estado Regional',
      desc: 'Ingresa al Dashboard para ver el Nivel de Riesgo Regional (0-100), la cantidad de sitios web monitoreados y la distribución de vulnerabilidades críticas y altas.',
      icon: LayoutIcon,
      tab: 'dashboard' as NavigationTab,
      btnLabel: 'Ir al Dashboard'
    },
    {
      step: '02',
      title: 'Explorar Sitios Web Institucionales',
      desc: 'En el módulo "Sitios Web" podrás visualizar todos los portales de Tacna clasificados por sector (Gobierno, Educación, Salud, Finanzas) y su calificación de seguridad.',
      icon: Globe,
      tab: 'websites' as NavigationTab,
      btnLabel: 'Ver Sitios Web'
    },
    {
      step: '03',
      title: 'Ejecutar Escaneo & Análisis con IA',
      desc: 'Haz clic en "Nuevo Escaneo", ingresa la URL de cualquier portal web institucional y presiona "Escanear y Diagnosticar". Obtendrás calificación instantánea y diagnóstico IA.',
      icon: Zap,
      action: onOpenNewScan,
      tab: 'evaluaciones' as NavigationTab,
      btnLabel: 'Iniciar Escaneo'
    },
    {
      step: '04',
      title: 'Remediar Vulnerabilidades CVE',
      desc: 'Revisa el catálogo de CVEs detectados, analiza el vector de ataque CVSS y copia los snippets de configuración sugeridos para blindar el servidor web.',
      icon: ShieldAlert,
      tab: 'vulnerabilities' as NavigationTab,
      btnLabel: 'Ver Vulnerabilidades'
    },
    {
      step: '05',
      title: 'Generar Reportes Ejecutivos',
      desc: 'Exporta reportes de ciberseguridad completos en formato PDF o impresión ejecutiva para presentar ante directores y comités de seguridad institucional.',
      icon: FileText,
      tab: 'reports' as NavigationTab,
      btnLabel: 'Generar Reportes'
    }
  ];

  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard Ejecutivo',
      icon: BarChart3,
      badge: 'Principal',
      color: 'text-red-600 bg-red-50 border-red-200',
      desc: 'Panel central con métricas en tiempo real, score de riesgo ponderado, gráficos de distribución por severidad y tendencias de seguridad en la región Tacna.',
      action: () => onNavigateTab('dashboard')
    },
    {
      id: 'websites',
      name: 'Gestión de Sitios Web',
      icon: Globe,
      badge: 'Activos',
      color: 'text-red-600 bg-red-50 border-red-200',
      desc: 'Inventario de activos digitales categorizados por sector (Gobierno, Educación, Salud). Permite registrar nuevos dominios y ver el histórico de cada sitio.',
      action: () => onNavigateTab('websites')
    },
    {
      id: 'vulnerabilities',
      name: 'Vulnerabilidades & CVEs',
      icon: ShieldAlert,
      badge: 'NVD / NIST',
      color: 'text-red-700 bg-red-50 border-red-200',
      desc: 'Base de conocimiento de fallas de seguridad identificadas con score CVSS v3.1, códigos CWE, criticidad y guía práctica de mitigación para administradores.',
      action: () => onNavigateTab('vulnerabilities')
    },
    {
      id: 'evaluaciones',
      name: 'Historial de Evaluaciones',
      icon: CheckCircle2,
      badge: 'Escaneos',
      color: 'text-red-600 bg-red-50 border-red-200',
      desc: 'Registro cronológico de todas las inspecciones realizadas. Muestra calificación por letras (A a F), hallazgos detallados y opción de re-escanear.',
      action: () => onNavigateTab('evaluaciones')
    },
    {
      id: 'reports',
      name: 'Reportes Ejecutivos',
      icon: FileText,
      badge: 'Exportable',
      color: 'text-red-600 bg-red-50 border-red-200',
      desc: 'Generación de informes de ciberseguridad ejecutivos y técnicos con métricas consolidadas, estado de cumplimiento y plan de acción recomendado.',
      action: () => onNavigateTab('reports')
    },
    {
      id: 'data-sources',
      name: 'Fuentes de Inteligencia',
      icon: Server,
      badge: 'Threat Intel',
      color: 'text-red-700 bg-red-50 border-red-200',
      desc: 'Conectores con feeds de ciberinteligencia globales como NIST NVD, MITRE ATT&CK, OWASP Top 10 y CISA KEV con estado de sincronización en vivo.',
      action: () => onNavigateTab('data-sources')
    },
    {
      id: 'user-management',
      name: 'Administración de Usuarios',
      icon: Users,
      badge: 'Admin Only',
      color: 'text-red-600 bg-red-50 border-red-200',
      desc: 'Control de accesos y roles (RBAC). Permite invitar analistas, activar o suspender credenciales y delegar privilegios de operador o auditor.',
      action: () => onNavigateTab('user-management')
    },
    {
      id: 'audit-logs',
      name: 'Logs y Auditoría SHA-256',
      icon: ScrollText,
      badge: 'Inmutable',
      color: 'text-red-600 bg-red-50 border-red-200',
      desc: 'Trazabilidad criptográfica forense de todos los eventos del sistema con cálculo de checksum SHA-256 para garantizar la no-repudiación.',
      action: () => onNavigateTab('audit-logs')
    }
  ];

  const roles = [
    {
      name: 'Super Admin',
      badge: 'Acceso Total',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      desc: 'Control absoluto del Centro de Operaciones. Administra usuarios, configuraciones del sistema, ejecuta escaneos masivos y exporta reportes.',
      features: ['Todas las vistas habilitadas', 'Gestión de usuarios y contraseñas', 'Configuración de feeds de inteligencia', 'Escaneo manual y automático']
    },
    {
      name: 'Security Analyst',
      badge: 'Operación & Análisis',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      desc: 'Especialista de seguridad encargado del monitoreo diario, ejecución de diagnósticos IA, evaluación de vulnerabilidades y elaboración de informes.',
      features: ['Escaneo HTTP y análisis Gemini AI', 'Gestión y clasificación de CVEs', 'Generación de reportes ejecutivos', 'Visualización de logs de auditoría']
    },
    {
      name: 'Auditor',
      badge: 'Solo Lectura & Cumplimiento',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
      desc: 'Responsable de verificar el cumplimiento normativo y la integridad del sistema. Diseñado específicamente para revisiones de control interno.',
      features: ['Dashboard regional en modo consulta', 'Acceso completo a bitácora de auditoría', 'Inspección de firmas SHA-256', 'Sin permisos para alterar configuraciones']
    },
    {
      name: 'Operator',
      badge: 'Monitoreo de Infraestructura',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      desc: 'Operador de guardia asignado a vigilar la disponibilidad y estado de los sitios web de la región.',
      features: ['Visualización del Dashboard general', 'Directorio de Sitios Web monitoreados', 'Alertas de caídas o timeouts', 'Sin acceso a módulos de administración']
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-28">
      {/* Hero Banner Header — Blanco y Rojo Institucional */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-red-50/50 to-white text-slate-900 p-6 md:p-8 overflow-hidden shadow-sm border border-red-200">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-red-600" />
            Centro de Ayuda &amp; Manual de Usuario
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
            Guía de Uso del Sistema <span className="text-red-600">Tacna SOC</span>
          </h1>
          <p className="mt-2.5 text-slate-600 text-sm md:text-base leading-relaxed">
            Bienvenido al Centro de Operaciones de Seguridad de Tacna. En este manual interactivo aprenderás cómo navegar la plataforma, escanear sitios web en tiempo real, interpretar el análisis de Gemini AI y auditar la seguridad institucional.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              Ir al Dashboard
            </button>
            {onOpenNewScan && (
              <button
                onClick={onOpenNewScan}
                className="inline-flex items-center gap-2 bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <Zap className="w-4 h-4 text-red-600" />
                Ejecutar un Escaneo
              </button>
            )}
            <button
              onClick={() => onNavigateTab('websites')}
              className="inline-flex items-center gap-2 bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-200 text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <Globe className="w-4 h-4 text-red-600" />
              Explorar Sitios Web
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'all', label: 'Toda la Guía', icon: Layers },
          { id: 'getting-started', label: '1. Primeros Pasos', icon: Zap },
          { id: 'modules', label: '2. Módulos del SOC', icon: Server },
          { id: 'scanner', label: '3. Escaneo & Calificación', icon: CheckCircle2 },
          { id: 'roles', label: '4. Roles y Permisos', icon: Users },
          { id: 'faq', label: '5. Preguntas Frecuentes', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as GuideSection)}
              className={`
                inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all
                ${isActive 
                  ? 'bg-red-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION: GETTING STARTED / FLUJO PASO A PASO */}
      {(activeSection === 'all' || activeSection === 'getting-started') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-700 text-xs font-bold">1</span>
                Flujo de Trabajo Principal (Paso a Paso)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Sigue estos 5 pasos recomendados para operar el SOC de forma óptima</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((st) => (
              <div 
                key={st.step}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      PASO {st.step}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
                      <st.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{st.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (st.action) st.action();
                      else onNavigateTab(st.tab);
                    }}
                    className="w-full inline-flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <span>{st.btnLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: MODULES DETAIL */}
      {(activeSection === 'all' || activeSection === 'modules') && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-700 text-xs font-bold">2</span>
              Módulos y Funcionalidades del Sistema
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Detalle de cada vista disponible en el menú lateral</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div 
                  key={m.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex items-start gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{m.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{m.desc}</p>
                    <button
                      onClick={m.action}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      <span>Abrir módulo</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION: SCANNER & GRADING EXPLANATION */}
      {(activeSection === 'all' || activeSection === 'scanner') && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-700 text-xs font-bold">3</span>
              Cómo se Califican los Sitios Web (Escala A – F)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Parámetros de evaluación de cabeceras HTTP de seguridad y ponderación</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200 bg-slate-50/60">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-2xl font-black text-emerald-600">A</span>
                  <p className="text-xs font-bold text-emerald-800 mt-1">90 - 100 pts</p>
                  <p className="text-[11px] text-emerald-700">Excelente seguridad</p>
                </div>
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl">
                  <span className="text-2xl font-black text-teal-600">B</span>
                  <p className="text-xs font-bold text-teal-800 mt-1">75 - 89 pts</p>
                  <p className="text-[11px] text-teal-700">Seguro con notas</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="text-2xl font-black text-amber-600">C</span>
                  <p className="text-xs font-bold text-amber-800 mt-1">50 - 74 pts</p>
                  <p className="text-[11px] text-amber-700">Riesgo moderado</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl">
                  <span className="text-2xl font-black text-orange-600">D</span>
                  <p className="text-xs font-bold text-orange-800 mt-1">30 - 49 pts</p>
                  <p className="text-[11px] text-orange-700">Alto riesgo</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl col-span-2 md:col-span-1">
                  <span className="text-2xl font-black text-red-600">F</span>
                  <p className="text-xs font-bold text-red-800 mt-1">&lt; 30 pts</p>
                  <p className="text-[11px] text-red-700">Crítico / Inseguro</p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cabeceras analizadas por el motor de escaneo:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800">Strict-Transport-Security (HSTS)</span>
                  </div>
                  <p className="text-xs text-slate-500">Fuerza a los navegadores a conectarse únicamente mediante HTTPS cifrado, previniendo ataques Man-in-the-Middle (MITM) y downgrade.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800">Content-Security-Policy (CSP)</span>
                  </div>
                  <p className="text-xs text-slate-500">Restringe los orígenes permitidos para cargar scripts, imágenes y recursos, bloqueando inyecciones de código Cross-Site Scripting (XSS).</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800">X-Frame-Options (Clickjacking)</span>
                  </div>
                  <p className="text-xs text-slate-500">Evita que el portal web pueda ser embebido dentro de iframes maliciosos en sitios de terceros.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800">X-Content-Type-Options</span>
                  </div>
                  <p className="text-xs text-slate-500">Establecido en <code className="text-red-600 bg-red-50 px-1 py-0.5 rounded">nosniff</code>, evita que los navegadores interpreten archivos con MIME types incorrectos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: ROLES & RBAC MATRIX */}
      {(activeSection === 'all' || activeSection === 'roles') && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-700 text-xs font-bold">4</span>
              Roles y Matriz de Control de Acceso (RBAC)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Cada cuenta tiene privilegios definidos según su responsabilidad en el SOC</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div 
                key={r.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-slate-900">{r.name}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{r.desc}</p>
                  
                  <div className="space-y-1.5">
                    {r.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: FAQ ACCORDION */}
      {(activeSection === 'all' || activeSection === 'faq') && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-700 text-xs font-bold">5</span>
              Preguntas Frecuentes (FAQ)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Dudas habituales sobre el funcionamiento y arquitectura del sistema</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Academic / Project Credits Footer Card — Blanco y Rojo */}
      <div className="rounded-3xl border border-red-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left shadow-xs mb-6">
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Universidad Privada de Tacna · FAING · EPIS
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Asignatura: SI885 — Seguridad de la Información y Gestión de Vulnerabilidades (2026-I)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold font-mono border border-red-200">
            v2.1 SOC LIVE
          </span>
          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold font-mono border border-red-100">
            Gemini 2.0 AI
          </span>
        </div>
      </div>
    </div>
  );
};

function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}
