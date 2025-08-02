#!/bin/bash

# Development Environment Script
echo "🚀 Starting LaunchPad Development Environment..."

# Load development environment variables (only export actual variables, skip comments)
while IFS= read -r line; do
    # Skip empty lines and comments
    if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
        # Check if line contains an equals sign (environment variable)
        if [[ "$line" == *"="* ]]; then
            export "$line"
        fi
    fi
done < env.development

# Show environment variables for debugging
echo "📋 Environment variables:"
echo "DATABASE_CLIENT: $DATABASE_CLIENT"
echo "DATABASE_HOST: $DATABASE_HOST"
echo "DATABASE_PORT: $DATABASE_PORT"
echo "DATABASE_NAME: $DATABASE_NAME"
echo "DATABASE_USERNAME: $DATABASE_USERNAME"
echo "DATABASE_PASSWORD: $DATABASE_PASSWORD"
echo "NODE_ENV: $NODE_ENV"
echo ""

# Start services
docker-compose --env-file env.development up -d

echo "✅ Development environment started!"
echo "📊 Services:"
docker-compose --env-file env.development ps

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://localhost:1339/admin"
echo "   - Strapi API: http://localhost:1339/api"
echo "   - PostgreSQL: Internal only (not exposed externally)"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose --env-file env.development logs -f"
echo "   - Stop services: docker-compose --env-file env.development down" 