#!/bin/bash

# Docker Stack Development Deployment Script
echo "🚀 Starting LaunchPad Docker Stack Development Deployment..."

# Check if env.development file exists
if [ ! -f env.development ]; then
    echo "❌ Error: env.development file not found!"
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f docker-compose.yml ]; then
    echo "❌ Error: docker-compose.yml file not found!"
    exit 1
fi

# Check if Docker Swarm is initialized
if ! docker info | grep -q "Swarm: active"; then
    echo "🔄 Initializing Docker Swarm..."
    docker swarm init
fi

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

# Set stack name
STACK_NAME="alejandro-louro-dev"

# Remove existing stack if it exists
echo "Removing existing stack if it exists..."
docker stack rm $STACK_NAME 2>/dev/null || true

# Deploy the stack using existing docker-compose.yml
# Docker Stack doesn't support --env-file, so we use the environment variables directly
echo "🚀 Deploying Docker Stack using docker-compose.yml..."
docker stack deploy -c docker-compose.yml $STACK_NAME

echo "✅ Docker Stack deployed!"
echo "📊 Stack services:"
docker stack services $STACK_NAME

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://$(hostname -I | awk '{print $1}'):1339/admin"
echo "   - Strapi API: http://$(hostname -I | awk '{print $1}'):1339/api"
echo "   - PostgreSQL: Internal only (not exposed externally)"
echo ""
echo "📋 Useful commands:"
echo "   - View stack services: docker stack services $STACK_NAME"
echo "   - View service logs: docker service logs ${STACK_NAME}_strapi"
echo "   - Remove stack: docker stack rm $STACK_NAME"
echo "   - Update stack: docker stack deploy -c docker-compose.yml $STACK_NAME" 