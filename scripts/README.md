# LaunchPad Scripts

This directory contains all the scripts for managing the LaunchPad project.

## 🚀 **Deployment Scripts**

### **Development Deployment**

- `deploy-stack-simple.sh` - Deploy development environment to VPS using Docker Stack
  - Uses `env.dev` configuration
  - Pulls latest image from Docker Hub
  - Deploys to `alejandro-louro-dev` stack

### **Production Deployment**

- `deploy-stack-prod.sh` - Deploy production environment to VPS using Docker Stack
  - Uses `env.production` configuration
  - Includes nginx for production
  - Deploys to `alejandro-louro-prod` stack

## 🛠️ **Development Scripts**

### **Local Development**

- `dev.sh` - Start local development environment
  - Uses Docker Compose (not Docker Stack)
  - Uses `env.dev` configuration
  - Good for local development and testing

### **Project Setup**

- `setup.sh` - Initial project setup
  - Checks Docker installation
  - Generates secure secrets
  - Creates necessary directories
  - Starts initial services

## 📊 **Utility Scripts**

### **Status & Monitoring**

- `status.sh` - Show current status of all stacks and services
  - Displays Docker context (local/remote)
  - Shows all running stacks
  - Lists available commands

### **Environment Management**

- `generate-secrets.js` - Generate secure secrets for environment files
- `copy-env.mts` - Copy environment files between environments

## 📚 **Documentation**

- `setup-dockerhub.md` - Instructions for setting up Docker Hub

## 🎯 **Quick Start**

### **Local Development**

```bash
./scripts/dev.sh
```

### **Deploy to VPS (Development)**

```bash
./scripts/deploy-stack-simple.sh
```

### **Deploy to VPS (Production)**

```bash
./scripts/deploy-stack-prod.sh
```

### **Check Status**

```bash
./scripts/status.sh
```

## 🔧 **Docker Contexts**

- **Local**: `docker context use default`
- **Remote VPS**: `docker context use hostinger`

## 📋 **Environment Files**

- `env.development` - Development environment variables
- `env.production` - Production environment variables
- `env.example` - Template for environment configuration
