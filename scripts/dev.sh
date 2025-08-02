#!/bin/bash

# Development Environment Script
echo "🚀 Starting LaunchPad Development Environment..."

# Load development environment variables
export $(cat env.development | xargs)

# Start services
docker-compose --env-file env.development up -d

echo "✅ Development environment started!"
echo "📊 Services:"
docker-compose --env-file env.development ps

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://localhost:1339/admin"
echo "   - Strapi API: http://localhost:1339/api"
echo "   - PostgreSQL: localhost:5433"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose --env-file env.development logs -f"
echo "   - Stop services: docker-compose --env-file env.development down" 