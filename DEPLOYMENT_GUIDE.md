# Guía de Despliegue - Next.js + Strapi

Esta guía te ayudará a desplegar tu proyecto Next.js en Vercel y Strapi en Render.com.

## 📋 Prerrequisitos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Render.com](https://render.com)
- Repositorio en GitHub (recomendado)
- Node.js 18+ instalado localmente

## 🚀 Paso 1: Desplegar Strapi en Render.com

### 1.1 Preparar el repositorio

1. Asegúrate de que tu código esté en GitHub
2. Los archivos de configuración ya están creados:
   - `render.yaml` - Configuración de Render.com
   - `strapi/Dockerfile.render` - Dockerfile optimizado
   - `strapi/env.example` - Variables de entorno de ejemplo

### 1.2 Crear la base de datos PostgreSQL

1. Ve a [Render.com Dashboard](https://dashboard.render.com)
2. Haz clic en "New +" → "PostgreSQL"
3. Configura la base de datos:
   - **Name**: `shop-postgres`
   - **Database**: `shop_strapi`
   - **User**: `shop_user`
   - **Plan**: Starter (gratis)
4. Anota las credenciales de conexión

### 1.3 Desplegar Strapi

1. En Render.com Dashboard, haz clic en "New +" → "Web Service"
2. Conecta tu repositorio de GitHub
3. Configura el servicio:
   - **Name**: `shop-strapi-cms`
   - **Environment**: `Node`
   - **Build Command**: `cd strapi && npm install && npm run build`
   - **Start Command**: `cd strapi && npm start`
   - **Plan**: Starter (gratis)

### 1.4 Configurar variables de entorno

En la sección "Environment" del servicio de Strapi, agrega:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
DB_CLIENT=postgres
DB_HOST=[host de tu base de datos PostgreSQL]
DB_PORT=5432
DB_NAME=shop_strapi
DB_USERNAME=shop_user
DB_PASSWORD=[password de tu base de datos]
DATABASE_SSL=true
JWT_SECRET=[genera una clave secreta]
ADMIN_JWT_SECRET=[genera otra clave secreta]
APP_KEYS=[genera 4 claves separadas por comas]
API_TOKEN_SALT=[genera una clave]
TRANSFER_TOKEN_SALT=[genera otra clave]
```

**Para generar claves seguras:**
```bash
# En tu terminal local
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 1.5 Desplegar

1. Haz clic en "Create Web Service"
2. Espera a que se complete el despliegue (5-10 minutos)
3. Anota la URL de tu Strapi (ej: `https://shop-strapi-cms.onrender.com`)

## 🌐 Paso 2: Desplegar Next.js en Vercel

### 2.1 Preparar el proyecto

1. Asegúrate de que el archivo `vercel.json` esté en la raíz del proyecto
2. El archivo `next/env.example` contiene las variables de entorno necesarias

### 2.2 Conectar con Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en "New Project"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio de tu proyecto

### 2.3 Configurar el proyecto

1. **Framework Preset**: Next.js
2. **Root Directory**: `next` (ya que tu app Next.js está en la carpeta `next/`)
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### 2.4 Configurar variables de entorno

En la sección "Environment Variables", agrega:

```env
NEXT_PUBLIC_API_URL=https://tu-strapi-app.onrender.com/api
NEXT_PUBLIC_STRAPI_URL=https://tu-strapi-app.onrender.com
IMAGE_HOSTNAME=tu-strapi-app.onrender.com
```

### 2.5 Desplegar

1. Haz clic en "Deploy"
2. Espera a que se complete el despliegue (2-5 minutos)
3. Tu aplicación Next.js estará disponible en la URL proporcionada

## 🔧 Paso 3: Configuración adicional

### 3.1 Configurar CORS en Strapi

Después del primer despliegue de Strapi, necesitas configurar CORS:

1. Ve al panel de administración de Strapi: `https://tu-strapi-app.onrender.com/admin`
2. Crea una cuenta de administrador
3. Ve a Settings → Security → CORS
4. Agrega tu dominio de Vercel a la lista de orígenes permitidos

### 3.2 Configurar Cloudinary (opcional)

Si usas Cloudinary para imágenes:

1. Crea una cuenta en [Cloudinary](https://cloudinary.com)
2. Obtén tus credenciales
3. Agrega las variables de entorno en Render.com:
   ```env
   CLOUDINARY_NAME=tu-cloud-name
   CLOUDINARY_KEY=tu-api-key
   CLOUDINARY_SECRET=tu-api-secret
   ```

### 3.3 Importar datos (opcional)

Si tienes datos de respaldo:

1. Ve al panel de administración de Strapi
2. Settings → Import/Export
3. Importa tu archivo `export_20250116105447.tar.gz`

## 🚨 Solución de problemas comunes

### Error de conexión a la base de datos
- Verifica que las credenciales de PostgreSQL sean correctas
- Asegúrate de que `DATABASE_SSL=true` esté configurado

### Error de CORS
- Configura CORS en Strapi para permitir tu dominio de Vercel
- Verifica que las URLs de API sean correctas

### Error de build en Vercel
- Verifica que el directorio raíz esté configurado como `next`
- Asegúrate de que todas las dependencias estén en `package.json`

### Strapi no inicia
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Render.com para más detalles

## 📝 Notas importantes

1. **Render.com**: El plan gratuito tiene limitaciones de tiempo de inactividad (se duerme después de 15 minutos de inactividad)
2. **Vercel**: El plan gratuito es muy generoso para proyectos pequeños
3. **Base de datos**: PostgreSQL en Render.com es gratuito hasta 1GB
4. **Dominios personalizados**: Puedes configurar dominios personalizados en ambos servicios

## 🔄 Actualizaciones futuras

Para actualizar tu aplicación:

1. **Strapi**: Haz push a tu rama principal, Render.com se actualizará automáticamente
2. **Next.js**: Haz push a tu rama principal, Vercel se actualizará automáticamente

## 📞 Soporte

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Render.com](https://render.com/docs)
- [Documentación de Strapi](https://docs.strapi.io)
