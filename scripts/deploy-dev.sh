#!/bin/bash

# Simple Docker Stack Deployment Script
echo "🚀 Starting LaunchPad Simple Stack Deployment..."

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

# Load development environment variables
while IFS= read -r line; do
    if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
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
docker network rm alejandro-louro-dev_default 2>/dev/null || true

# Deploy the stack using existing docker-compose.yml
echo "🚀 Deploying Docker Stack using docker-compose.yml..."
docker stack deploy -c docker-compose.yml $STACK_NAME

echo "✅ Docker Stack deployed!"
echo "📊 Stack services:"
docker stack services $STACK_NAME

# Get server IP (cross-platform)
SERVER_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
if [ -z "$SERVER_IP" ]; then
    SERVER_IP="localhost"
fi

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://$SERVER_IP:1339/admin"
echo "   - Strapi API: http://$SERVER_IP:1339/api"
echo "   - PostgreSQL: Internal only (not exposed externally)"
echo ""
echo "📋 Useful commands:"
echo "   - View stack services: docker stack services $STACK_NAME"
echo "   - View service logs: docker service logs ${STACK_NAME}_strapi"
echo "   - Remove stack: docker stack rm $STACK_NAME"
echo "   - Update stack: ./scripts/deploy-stack-simple.sh" 