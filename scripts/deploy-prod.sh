#!/bin/bash

# Production Docker Stack Deployment Script
echo "🚀 Starting LaunchPad Production Stack Deployment..."

# Check if env.production file exists
if [ ! -f env.production ]; then
    echo "❌ Error: env.production file not found!"
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f docker-compose.yml ]; then
    echo "❌ Error: docker-compose.yml file not found!"
    exit 1
fi

# Load production environment variables
while IFS= read -r line; do
    if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
        if [[ "$line" == *"="* ]]; then
            export "$line"
        fi
    fi
done < env.production

# Show environment variables for debugging
echo "📋 Environment variables:"
echo "DB_CLIENT: $DB_CLIENT"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_NAME: $DB_NAME"
echo "DB_USERNAME: $DB_USERNAME"
echo "DB_PASSWORD: $DB_PASSWORD"
echo "NODE_ENV: $NODE_ENV"
echo ""

# Set stack name
STACK_NAME="alejandro-louro-prod"

# Switch to remote context
echo "🔗 Switching to remote VPS..."
docker context use hostinger

# Check if Docker Swarm is initialized on remote
if ! docker info | grep -q "Swarm: active"; then
    echo "🔄 Initializing Docker Swarm on remote..."
    docker swarm init
fi

# Pull the latest image from Docker Hub
echo "📥 Pulling latest image from Docker Hub..."
docker pull alegd/alejandro-louro-cms:latest

# Remove existing stack if it exists
echo "Removing existing stack if it exists..."
docker stack rm $STACK_NAME 2>/dev/null || true

# Wait for stack removal to complete
echo "⏳ Waiting for stack removal to complete..."
sleep 5

# Clean up any existing networks
echo "🧹 Cleaning up existing networks..."
docker network rm alejandro-louro-prod_default 2>/dev/null || true

# Deploy the stack using existing docker-compose.yml with production profile
echo "🚀 Deploying Production Docker Stack..."
docker stack deploy -c docker-compose.yml $STACK_NAME

echo "✅ Production Stack deployed!"
echo "📊 Stack services:"
docker stack services $STACK_NAME

# Get server IP (cross-platform)
SERVER_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
if [ -z "$SERVER_IP" ]; then
    SERVER_IP="localhost"
fi

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://$SERVER_IP:1337/admin"
echo "   - Strapi API: http://$SERVER_IP:1337/api"
echo "   - Nginx: http://$SERVER_IP:80, https://$SERVER_IP:443"
echo "   - PostgreSQL: Internal only (not exposed externally)"
echo ""
echo "📋 Useful commands:"
echo "   - View stack services: docker stack services $STACK_NAME"
echo "   - View service logs: docker service logs ${STACK_NAME}_strapi"
echo "   - Remove stack: docker stack rm $STACK_NAME"
echo "   - Update stack: ./scripts/deploy-stack-prod.sh" 