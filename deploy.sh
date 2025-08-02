#!/bin/bash

# LaunchPad Deployment Script
# This script deploys Strapi to a VPS server

set -e

echo "🚀 Starting LaunchPad deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy env.example to .env and configure your environment variables."
    exit 1
fi

# Load environment variables
source .env

# Check required environment variables
required_vars=("DATABASE_NAME" "DATABASE_USERNAME" "DATABASE_PASSWORD" "JWT_SECRET" "ADMIN_JWT_SECRET" "APP_KEYS" "API_TOKEN_SALT" "TRANSFER_TOKEN_SALT")

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var is not set in .env file"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if Strapi is running
echo "🔍 Checking Strapi health..."
if curl -f http://localhost:1337/health > /dev/null 2>&1; then
    echo "✅ Strapi is running successfully!"
else
    echo "❌ Strapi health check failed"
    echo "📋 Container logs:"
    docker-compose -f docker-compose.prod.yml logs strapi
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "📊 Services status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🌐 Your Strapi instance should be available at:"
echo "   - Admin panel: https://your-domain.com/admin"
echo "   - API: https://your-domain.com/api"
echo ""
echo "📝 Next steps:"
echo "   1. Update your domain in nginx/nginx.conf"
echo "   2. Configure SSL certificates"
echo "   3. Update your Next.js app to use the production API URL" 