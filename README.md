# LaunchPad - Strapi + Next.js Project

A full-stack application with Strapi CMS backend and Next.js frontend, configured for automated deployment using GitHub Actions.

## 🏗️ Architecture

- **Backend**: Strapi CMS with PostgreSQL database
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Deployment**:
  - Strapi → VPS with Docker
  - Next.js → Vercel
- **CI/CD**: GitHub Actions for automated deployments

## 🚀 Quick Start

### Prerequisites

- **Node.js 22.x** (required for both Strapi and Next.js)
- **Docker and Docker Compose** (for local development)
- **Yarn** (recommended package manager)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd LaunchPad
   ```

2. **Start local development environment**

   ```bash
   # Start Strapi and PostgreSQL
   ./scripts/dev.sh

   # Start Next.js development server
   cd next
   yarn install
   yarn dev
   ```

3. **Access your applications**
   - Strapi Admin: http://localhost:1339/admin
   - Next.js App: http://localhost:3000

### Deployment

#### Development Deployment (VPS)

```bash
./scripts/deploy-stack-simple.sh
```

#### Production Deployment (VPS)

```bash
./scripts/deploy-stack-prod.sh
```

#### Check Status

```bash
./scripts/status.sh
```

### Production Deployment

#### Prerequisites

1. **VPS Server** (for Strapi)

   - Ubuntu 20.04+ recommended
   - Docker and Docker Compose installed
   - Domain name pointing to your VPS

2. **Vercel Account** (for Next.js)
   - Vercel CLI installed
   - Project created in Vercel dashboard

#### Setup GitHub Secrets

Add these secrets to your GitHub repository:

**VPS Deployment Secrets:**

- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Private SSH key for VPS access
- `VPS_PORT`: SSH port (default: 22)
- `PROJECT_PATH`: Path to project on VPS (default: /opt/launchpad)

**Vercel Deployment Secrets:**

- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `NEXT_PUBLIC_STRAPI_URL`: Your Strapi production URL

**Optional:**

- `SLACK_WEBHOOK_URL`: Slack webhook for deployment notifications

#### Initial VPS Setup

1. **SSH into your VPS**

   ```bash
   ssh user@your-vps-ip
   ```

2. **Install Docker and Docker Compose**

   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Clone the repository**

   ```bash
   sudo mkdir -p /opt/launchpad
   sudo chown $USER:$USER /opt/launchpad
   cd /opt/launchpad
   git clone <your-repo-url> .
   ```

4. **Configure environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your production values
   nano .env
   ```

5. **Generate secure secrets**

   ```bash
   node scripts/generate-secrets.js
   # Copy the generated secrets to your .env file
   ```

6. **Update Nginx configuration**

   ```bash
   # Edit nginx/nginx.conf and replace 'your-domain.com' with your actual domain
   nano nginx/nginx.conf
   ```

7. **Setup SSL certificates**

   ```bash
   # Create SSL directory
   sudo mkdir -p nginx/ssl

   # Generate self-signed certificate (replace with Let's Encrypt for production)
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout nginx/ssl/key.pem \
     -out nginx/ssl/cert.pem
   ```

8. **Start the application**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 🔄 Automated Deployment

The project includes three GitHub Actions workflows:

1. **`deploy-strapi.yml`**: Deploys Strapi when changes are made to the `strapi/` directory
2. **`deploy-nextjs.yml`**: Deploys Next.js when changes are made to the `next/` directory
3. **`deploy-all.yml`**: Deploys both when changes affect the entire project

### How it works:

- Push to `main` branch triggers appropriate workflow based on changed files
- Strapi deployment uses SSH to connect to your VPS and runs Docker commands
- Next.js deployment builds and deploys to Vercel
- Slack notifications are sent on deployment completion (if configured)

## 📁 Project Structure

```
LaunchPad/
├── strapi/                 # Strapi CMS backend
│   ├── Dockerfile         # Production Dockerfile
│   ├── Dockerfile.dev     # Development Dockerfile
│   └── ...
├── next/                  # Next.js frontend
│   ├── vercel.json       # Vercel configuration
│   └── ...
├── nginx/                # Nginx configuration
│   └── nginx.conf
├── scripts/              # Utility scripts
│   └── generate-secrets.js
├── .github/workflows/    # GitHub Actions
│   ├── deploy-strapi.yml
│   ├── deploy-nextjs.yml
│   └── deploy-all.yml
├── docker-compose.yml    # Local development
├── docker-compose.prod.yml # Production deployment
└── env.example          # Environment variables template
```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
# Database
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_secure_password

# Strapi Security (generate with scripts/generate-secrets.js)
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# Optional: Cloudinary for file uploads
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

### Next.js Configuration

Update your Next.js app to use the production Strapi URL:

```typescript
// next/lib/constants/endpoints.ts
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
```

## 🛠️ Development

### Adding new features

1. **Backend changes**: Work in `strapi/` directory
2. **Frontend changes**: Work in `next/` directory
3. **Infrastructure changes**: Modify Docker files and GitHub Actions

### Database migrations

```bash
# In strapi directory
yarn strapi database:migrate
```

### Backup and restore

```bash
# Backup
docker exec launchpad_postgres_prod pg_dump -U strapi strapi > backup.sql

# Restore
docker exec -i launchpad_postgres_prod psql -U strapi strapi < backup.sql
```

## 📊 Monitoring

- **Strapi Health Check**: `https://your-domain.com/health`
- **Container Logs**: `docker-compose -f docker-compose.prod.yml logs -f`
- **Database**: Connect to PostgreSQL on port 5432

## 🔒 Security

- All containers run as non-root users
- Nginx includes security headers and rate limiting
- SSL/TLS encryption for all traffic
- Environment variables for sensitive data
- Regular security updates via Docker image updates

## 🆘 Troubleshooting

### Common Issues

1. **Strapi won't start**

   ```bash
   docker-compose -f docker-compose.prod.yml logs strapi
   ```

2. **Database connection issues**

   ```bash
   docker-compose -f docker-compose.prod.yml exec postgres psql -U strapi -d strapi
   ```

3. **Nginx configuration errors**
   ```bash
   docker-compose -f docker-compose.prod.yml exec nginx nginx -t
   ```

### Manual deployment

If GitHub Actions fail, you can deploy manually:

```bash
# On your VPS
cd /opt/launchpad
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📝 License

MIT License - see LICENSE file for details.
