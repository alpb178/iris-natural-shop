# 🔧 Configuración de Render.com para Strapi

## ❌ Error actual:
```
error: self-signed certificate
Error: self-signed certificate
```

## ✅ Solución aplicada:

He actualizado `strapi/config/database.ts` para manejar mejor los certificados SSL de Render.com.

## 🚀 Configuración en Render.com:

### 1. Variables de entorno necesarias:

Ve a tu servicio en Render.com → Settings → Environment y agrega:

```env
# Configuración básica
NODE_ENV=production
HOST=0.0.0.0
PORT=10000

# Base de datos PostgreSQL
DB_CLIENT=postgres
DB_HOST=[host de tu base de datos]
DB_PORT=5432
DB_NAME=[nombre de la base de datos]
DB_USERNAME=[usuario]
DB_PASSWORD=[contraseña]

# SSL Configuration - IMPORTANTE
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Claves de seguridad (generar nuevas)
JWT_SECRET=[generar clave secreta]
ADMIN_JWT_SECRET=[generar clave secreta]
APP_KEYS=[generar 4 claves separadas por comas]
API_TOKEN_SALT=[generar clave]
TRANSFER_TOKEN_SALT=[generar clave]

# Cloudinary (opcional)
CLOUDINARY_NAME=[tu-cloud-name]
CLOUDINARY_KEY=[tu-api-key]
CLOUDINARY_SECRET=[tu-api-secret]
```

### 2. Comandos de build y start:

**Build Command:**
```bash
cd strapi && apk add --no-cache python3 make g++ postgresql-client && yarn install --frozen-lockfile --network-timeout 600000 && yarn build
```

**Start Command:**
```bash
cd strapi && yarn start
```

## 🔑 Generar claves seguras:

Para generar las claves de seguridad, puedes usar:

```bash
# En tu terminal local
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Ejecuta este comando 6 veces para obtener:
- JWT_SECRET
- ADMIN_JWT_SECRET  
- API_TOKEN_SALT
- TRANSFER_TOKEN_SALT
- APP_KEYS (4 claves separadas por comas)

## 🔍 ¿Qué cambió?

1. **`DATABASE_SSL_REJECT_UNAUTHORIZED=false`** - Permite certificados autofirmados
2. **Configuración SSL condicional** - Solo aplica SSL si está habilitado
3. **Manejo de errores SSL** - Mejor compatibilidad con Render.com

## 📝 Pasos para aplicar:

1. **Actualizar variables de entorno** en Render.com
2. **Hacer commit** de los cambios en el código
3. **Redesplegar** el servicio

¿Necesitas ayuda con algún paso específico?
