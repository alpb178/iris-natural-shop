#!/bin/bash

# Production Environment Script
echo "🚀 Starting LaunchPad Production Environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy env.example to .env and configure your production values."
    exit 1
fi

# Load production environment variables
export $(cat env.production | xargs)

# Start services (including nginx)
docker-compose --env-file env.production --profile production up -d

echo "✅ Production environment started!"
echo "📊 Services:"
docker-compose --env-file env.production --profile production ps

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://localhost:1337/admin"
echo "   - Strapi API: http://localhost:1337/api"
echo "   - Nginx: http://localhost:80, https://localhost:443"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose --env-file env.production --profile production logs -f"
echo "   - Stop services: docker-compose --env-file env.production --profile production down" 