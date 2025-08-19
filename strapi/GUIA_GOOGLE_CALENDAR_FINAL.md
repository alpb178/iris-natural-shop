# 🚀 **Guía Completa: Integración de Google Calendar con Strapi**

## 📋 **Índice**
1. [Configuración de Google Cloud Console](#1-configuración-de-google-cloud-console)
2. [Configuración de OAuth 2.0](#2-configuración-de-oauth-20)
3. [Configuración de Strapi](#3-configuración-de-strapi)
4. [Pruebas y Verificación](#4-pruebas-y-verificación)
5. [Solución de Problemas](#5-solución-de-problemas)
6. [Verificación Final](#6-verificación-final)

---

## 1. 🏗️ **Configuración de Google Cloud Console**

### **1.1 Crear Proyecto**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en **"Select a project"** > **"New Project"**
3. **Nombre del proyecto**: `alex-web` (o el que prefieras)
4. Haz clic en **"Create"**

### **1.2 Habilitar Google Calendar API**
1. En tu proyecto, ve a **"APIs & Services"** > **"Library"**
2. Busca **"Google Calendar API"**
3. Haz clic en **"Google Calendar API"**
4. Haz clic en **"Enable"**

### **1.3 Configurar Pantalla de Consentimiento OAuth**
1. Ve a **"APIs & Services"** > **"OAuth consent screen"**
2. **User Type**: Selecciona **"External"**
3. Haz clic en **"Create"**

#### **Información de la App:**
- **App name**: `alex-web`
- **User support email**: `alpb17.08@gmail.com`
- **Developer contact information**: `alpb17.08@gmail.com`
- Haz clic en **"Save and Continue"**

#### **Scopes:**
- Haz clic en **"Add or Remove Scopes"**
- Busca y agrega:
  - `https://www.googleapis.com/auth/calendar`
  - `https://www.googleapis.com/auth/calendar.events`
- Haz clic en **"Save and Continue"**

#### **Test Users:**
- Haz clic en **"+ Add Users"**
- Agrega: `alpb17.08@gmail.com`
- Haz clic en **"Save and Continue"**

---

## 2. 🔑 **Configuración de OAuth 2.0**

### **2.1 Crear Credenciales OAuth 2.0**
1. Ve a **"APIs & Services"** > **"Credentials"**
2. Haz clic en **"+ Create Credentials"** > **"OAuth 2.0 Client IDs"**
3. **Application type**: Selecciona **"Web application"**
4. **Name**: `Cliente web`

#### **URIs de Redirección:**
- **Authorized redirect URIs**: 
  ```
  https://developers.google.com/oauthplayground
  ```
- Haz clic en **"Create"**

### **2.2 Obtener Refresh Token**
1. Ve a [Google OAuth Playground](https://developers.google.com/oauthplayground/)
2. Haz clic en el ícono de engranaje (⚙️) en la esquina superior derecha
3. Marca **"Use your own OAuth credentials"**
4. Ingresa:
   - **OAuth Client ID**: El que obtuviste en el paso anterior
   - **OAuth Client Secret**: El que obtuviste en el paso anterior
5. Haz clic en **"Close"**

#### **Seleccionar Scopes:**
1. En la lista de APIs, busca y marca:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
2. Haz clic en **"Authorize APIs"**
3. **Inicia sesión con**: `alpb17.08@gmail.com`
4. Acepta los permisos solicitados
5. Haz clic en **"Exchange authorization code for tokens"**
6. **Copia el Refresh token**

---

## 3. ⚙️ **Configuración de Strapi**

### **3.1 Variables de Entorno**
Crea un archivo `.env` en la carpeta raíz de Strapi:

```bash
# Google Calendar API Configuration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_ADMIN_REFRESH_TOKEN=tu_refresh_token_aqui

# Base de datos y otras configuraciones
DB_CLIENT=postgres
DB_HOST=postgres
DB_PORT=5432
DB_NAME=strapi
DB_USERNAME=strapi
DB_PASSWORD=strapi

# JWT Secrets (genera estos con el script de Strapi)
JWT_SECRET=tu_jwt_secret
ADMIN_JWT_SECRET=tu_admin_jwt_secret
APP_KEYS=tu_app_keys
API_TOKEN_SALT=tu_api_token_salt
TRANSFER_TOKEN_SALT=tu_transfer_token_salt

# Environment
NODE_ENV=development
```

### **3.2 Instalar Dependencias**
```bash
cd strapi
yarn add googleapis
```

### **3.3 Verificar Archivos Creados**
Asegúrate de que tengas estos archivos:
- ✅ `src/api/appointment/services/google-calendar-sync.ts`
- ✅ `src/api/appointment/content-types/appointment/lifecycles.ts`
- ✅ `src/api/appointment/controllers/google-test.ts`
- ✅ `src/api/appointment/routes/appointment.ts` (con la ruta de test)

---

## 4. 🧪 **Pruebas y Verificación**

### **4.1 Probar Conexión**
1. Inicia Strapi: `yarn develop`
2. Ve a: `http://localhost:1337/api/appointments/google-test`
3. Deberías ver un mensaje de éxito

### **4.2 Probar Creación de Cita**
1. Ve al panel de administración de Strapi
2. Crea una nueva cita con estado **"confirmed"**
3. Verifica en los logs que se sincronice con Google Calendar
4. Verifica en tu calendario de Google que aparezca el evento

### **4.3 Verificar Evento en Google Calendar**
- **Título**: "Cita confirmada con [Nombre]"
- **Descripción**: Incluye nombre y email del cliente
- **Asistentes**: Cliente + alpb17.08@gmail.com
- **Duración**: 1 hora
- **Recordatorios**: Configurados por defecto

---

## 5. 🚨 **Solución de Problemas**

### **5.1 Error: "redirect_uri_mismatch"**
**Problema**: URI de redirección no configurada
**Solución**: Agregar `https://developers.google.com/oauthplayground` en las URIs autorizadas

### **5.2 Error: "access_denied"**
**Problema**: Aplicación no verificada por Google
**Solución**: Agregar tu cuenta como tester en la pantalla de consentimiento OAuth

### **5.3 Error: "Google Calendar API has not been used"**
**Problema**: API no habilitada
**Solución**: Habilitar Google Calendar API en Google Cloud Console

### **5.4 Error: "Missing Google Calendar configuration"**
**Problema**: Variables de entorno no configuradas
**Solución**: Verificar que `.env` tenga todas las variables necesarias

### **5.5 Las citas no se sincronizan**
**Problema**: Lifecycle hooks no funcionan
**Solución**: 
1. Verificar que `lifecycles.ts` esté en la ubicación correcta
2. Reiniciar Strapi después de cambios
3. Verificar logs de consola

---
