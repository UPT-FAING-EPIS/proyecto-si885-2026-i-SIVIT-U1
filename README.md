# 📁 SI885 — Proyecto SIVIT | UPT FAING EPIS 2026-I

Repositorio del proyecto de la asignatura **SI885** de la Universidad Privada de Tacna.

## 📦 Proyectos incluidos

| Carpeta | Descripción |
|---|---|
| [`tacna-soc---gestión-de-vulnerabilidades/`](./tacna-soc---gestión-de-vulnerabilidades/) | Plataforma SOC de gestión de vulnerabilidades web con IA |

---

## 🛡️ Tacna SOC — Gestión de Vulnerabilidades

Plataforma web de Centro de Operaciones de Seguridad (SOC) para el monitoreo y análisis de vulnerabilidades en sitios web de la región Tacna. Incluye escaneo real de cabeceras HTTP, búsqueda de CVEs (NVD/NIST) y análisis inteligente con **Gemini AI**.

### ✨ Módulos

| Módulo | Descripción |
|---|---|
| 📊 **Dashboard** | Panel ejecutivo con métricas globales y riesgo |
| 🌐 **Sitios Web** | Registro y monitoreo de activos web |
| 🔍 **Escaneo de Seguridad** | Análisis real de cabeceras HTTP (HSTS, CSP, cookies…) |
| 🤖 **Análisis IA** | Gemini 2.0 Flash: resumen, puntuación y recomendaciones |
| 🐞 **Vulnerabilidades** | CVEs con CVSS score, vector de ataque y remediación |
| 📋 **Evaluaciones** | Historial de escaneos con calificación A–F |
| 📄 **Reportes** | Reportes ejecutivos exportables |
| 👥 **Gestión de Usuarios** | RBAC: Super Admin, Analyst, Auditor, Operator |
| 📜 **Logs de Auditoría** | Registro inmutable de eventos con hash SHA-256 |

### 🔐 Acceso

La plataforma requiere **login con correo y contraseña**. Solo los usuarios autenticados pueden acceder al dashboard. Los roles determinan las vistas disponibles:

- **Super Admin / Security Analyst**: acceso completo
- **Auditor**: solo Dashboard y Logs de Auditoría
- **Operator**: solo Dashboard y Sitios Web

---

## 🚀 Inicio rápido (local)

```bash
cd tacna-soc---gestión-de-vulnerabilidades
npm install
cp .env.example .env     # añade tu GEMINI_API_KEY
npm run dev              # http://localhost:3000
```

**Credenciales de demo:**

| Email | Contraseña | Rol |
|---|---|---|
| `admin@tacnasoc.pe` | `Admin2026!` | Super Admin |
| `analyst@tacnasoc.pe` | `Analyst2026!` | Security Analyst |
| `auditor@tacnasoc.pe` | `Auditor2026!` | Auditor |
| `operator@tacnasoc.pe` | `Operator2026!` | Operator |

---

## ☁️ Deploy en VPS (SCP)

> Reemplaza `169.58.156.169` con la IP de tu VPS.

```bash
# 1. Compilar en local
cd tacna-soc---gestión-de-vulnerabilidades
npm run build

# 2. Subir al VPS
scp -r dist/        root@169.58.156.169:/var/www/sivit/
scp server.js       root@169.58.156.169:/var/www/sivit/
scp package.json    root@169.58.156.169:/var/www/sivit/
scp .env            root@169.58.156.169:/var/www/sivit/

# 3. En el VPS: instalar dependencias y reiniciar
ssh root@169.58.156.169
cd /var/www/sivit && npm install --omit=dev && pm2 restart sivit-app
```

## ☁️ Deploy en VPS (Git — recomendado)

```bash
# Primera vez en el VPS
ssh root@169.58.156.169
cd /var/www
git clone https://github.com/TU_USUARIO/TU_REPO.git sivit
cd sivit && npm install --omit=dev && npm run build
pm2 start server.js --name sivit-app && pm2 save && pm2 startup

# Actualizar tras cambios
git add . && git commit -m "feat: cambios" && git push origin main
ssh root@169.58.156.169
cd /var/www/sivit && git pull && npm run build && pm2 restart sivit-app
```

## Subir a GitHub (primera vez)

```bash
cd tacna-soc---gestión-de-vulnerabilidades
git init
git add .
git commit -m "feat: primera versión Tacna SOC"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Nginx (config del VPS)

```nginx
server {
    listen 80;
    server_name 169.58.156.169;

    client_max_body_size 10M;
    access_log /var/log/nginx/sivit_access.log;
    error_log  /var/log/nginx/sivit_error.log;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 PM2 — Comandos útiles

```bash
pm2 status                       # Estado de procesos
pm2 logs sivit-app               # Logs en tiempo real 
pm2 logs sivit-app --lines 100   # Últimas 100 líneas
pm2 restart sivit-app            # Reiniciar
pm2 monit                        # Monitor de recursos
```

---

## 🔑 Variables de entorno (`.env`)

```env
GEMINI_API_KEY="tu_api_key_de_gemini"
APP_URL="http://169.58.156.169"
PORT=3000
```

---

*Universidad Privada de Tacna — FAING · EPIS · SI885 · 2026-I*
