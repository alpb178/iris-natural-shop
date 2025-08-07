# GitHub Workflows

This directory contains all the GitHub Actions workflows for the LaunchPad project.

## 🚀 **Deployment Workflows**

### **deploy-strapi.yml**

**Trigger**: Push to `main` or `dev` branches with changes to Strapi, docker-compose.yml, nginx, or scripts
**Purpose**: Deploy Strapi to VPS using Docker Stack

**Features**:

- Automatically detects environment (dev/prod) based on branch
- Uses the appropriate deployment script (`deploy-stack-simple.sh` or `deploy-stack-prod.sh`)
- Validates environment files before deployment
- Health checks after deployment
- Slack notifications

**Environment Mapping**:

- `main` branch → Production (`env.production`)
- `dev` branch → Development (`env.dev`)

### **deploy-all.yml**

**Trigger**: Push to `main` or `dev` branches with changes to package.json, README, scripts, or docker-compose.yml
**Purpose**: Deploy both Strapi and Next.js applications

**Features**:

- Deploys Strapi to VPS first
- Sequential deployment (Next.js waits for Strapi)
- Comprehensive Slack notifications

### **quick-deploy.yml**

**Trigger**: Manual workflow dispatch
**Purpose**: Quick deployment on demand

**Features**:

- Manual trigger with environment selection
- Optional force rebuild of Docker image
- Same validation and health checks as automated deployments
- Useful for hotfixes or testing

## 🐳 **Docker Workflows**

### **build-docker-image.yml**

**Trigger**: Push to `main` or `dev` branches with changes to Strapi
**Purpose**: Build and push Docker image to Docker Hub

**Features**:

- Multi-platform builds (linux/amd64, linux/arm64)
- Automatic tagging based on branch
- GitHub Actions cache for faster builds
- Slack notifications with build status

## 🧪 **Testing Workflows**

### **test-scripts.yml**

**Trigger**: Pull requests to `main` or `dev` branches with changes to scripts, docker-compose.yml, or env files
**Purpose**: Validate deployment scripts and configuration

**Features**:

- Syntax validation for all shell scripts
- Environment file validation
- Docker Compose configuration validation
- Environment variable validation
- Script permissions validation
- Automatic PR comments with test results

## 📋 **Required GitHub Secrets**

### **VPS Deployment Secrets**

- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Private SSH key for VPS access
- `VPS_PORT`: SSH port (default: 22)
- `PROJECT_PATH`: Path to project on VPS (default: /opt/alejandro-louro)

### **Docker Hub Secrets**

- `DOCKERHUB_USERNAME`: Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token

### **Optional**

- `SLACK_WEBHOOK_URL`: Slack webhook for deployment notifications

## 🔧 **Workflow Configuration**

### **Environment Files**

- `env.dev` - Development environment variables
- `env.production` - Production environment variables
- `env.example` - Template for environment configuration

### **Deployment Scripts**

- `scripts/deploy-stack-simple.sh` - Development deployment
- `scripts/deploy-stack-prod.sh` - Production deployment
- `scripts/status.sh` - Status monitoring

### **Docker Stack Names**

- Development: `alejandro-louro-dev`
- Production: `alejandro-louro-prod`

## 🎯 **Usage Examples**

### **Automatic Deployment**

```bash
# Push to dev branch - triggers development deployment
git push origin dev

# Push to main branch - triggers production deployment
git push origin main
```

### **Manual Deployment**

1. Go to GitHub Actions tab
2. Select "Quick Deploy" workflow
3. Click "Run workflow"
4. Choose environment and options
5. Click "Run workflow"

### **Testing Changes**

1. Create a pull request
2. The test-scripts workflow will automatically run
3. Check the test results in the PR comments

## 📊 **Monitoring**

### **Workflow Status**

- Check GitHub Actions tab for workflow status
- Monitor Slack notifications for deployment updates
- Use `scripts/status.sh` to check VPS deployment status

### **Troubleshooting**

- Check workflow logs in GitHub Actions
- Use `docker service logs` on VPS for service-specific issues
- Verify environment files are properly configured
- Ensure all required secrets are set in GitHub
