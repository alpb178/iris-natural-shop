#!/bin/bash

# Alejandro Louro's CMS Setup Script
# This script helps you set up the project for development and production

set -e

echo "🚀 Welcome to Alejandro Louro's CMS Setup!"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Generate secrets if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.dev .env
    
    echo "🔐 Generating secure secrets..."
    node scripts/generate-secrets.js > temp_secrets.txt
    
    echo "📋 Please copy the following secrets to your .env file:"
    echo "=================================================="
    cat temp_secrets.txt
    echo "=================================================="
    echo ""
    echo "⚠️  IMPORTANT: Update your .env file with the generated secrets above!"
    echo "   You can edit it with: nano .env"
    echo ""
    
    rm temp_secrets.txt
else
    echo "✅ Environment file already exists"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p nginx/ssl
mkdir -p strapi/public/uploads

# Set up local development
echo "🔧 Setting up local development environment..."
echo "Starting PostgreSQL and Strapi..."
docker-compose up -d postgres

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

echo "Starting Strapi..."
docker-compose up -d strapi

echo "⏳ Waiting for Strapi to be ready..."
sleep 30

# Check if Strapi is running
if curl -f http://localhost:1337/health > /dev/null 2>&1; then
    echo "✅ Strapi is running successfully!"
else
    echo "❌ Strapi health check failed"
    echo "📋 Container logs:"
    docker-compose logs strapi
    echo ""
    echo "🔧 You can check the logs manually with:"
    echo "   docker-compose logs -f strapi"
fi

echo ""
echo "🎉 Setup completed!"
echo ""
echo "📊 Services status:"
docker-compose ps
echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://localhost:1337/admin"
echo "   - Strapi API: http://localhost:1337/api"
echo ""
echo "📝 Next steps:"
echo "   1. Create your first admin user at http://localhost:1337/admin"
echo "   2. Start your Next.js development server:"
echo "      cd next && yarn install && yarn dev"
echo "   3. Configure your production environment variables"
echo "   4. Set up GitHub Actions secrets for automated deployment"
echo ""
echo "📚 For more information, see the README.md file" 