#!/bin/bash

echo "🚀 Starting Stack Deployment..."
docker context use default

# Check if .env file exists in strapi directory
if [ ! -f strapi/.env ]; then
    echo "❌ Error: strapi/.env file not found!"
    exit 1
fi

# Validate required environment variables
echo "🔍 Validating required environment variables..."

# Function to check if variable is set and not empty
check_required_var() {
    local var_name=$1
    local var_value=$(grep "^${var_name}=" strapi/.env | cut -d'=' -f2)
    
    if [ -z "$var_value" ] || [ "$var_value" = "tobemodified" ] || [ "$var_value" = "toBeModified1,toBeModified2" ]; then
        echo "❌ Error: ${var_name} is not properly set in strapi/.env"
        echo "💡 Please set a secure value for ${var_name} in your strapi/.env file"
        return 1
    fi
}

# Check required variables
required_vars=("DB_NAME" "DB_USERNAME" "DB_PASSWORD" "JWT_SECRET" "ADMIN_JWT_SECRET" "APP_KEYS" "API_TOKEN_SALT" "TRANSFER_TOKEN_SALT")

for var in "${required_vars[@]}"; do
    if ! check_required_var "$var"; then
        exit 1
    fi
done

echo "✅ All required environment variables are set"

# Check if docker-compose.yml exists
if [ ! -f docker-compose.yml ]; then
    echo "❌ Error: docker-compose.yml file not found!"
    exit 1
fi

# Build and push new Docker image
echo "🔨 Building new Docker image..."

# Generate timestamp for image tag
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
IMAGE_NAME="alegd/alejandro-louro-cms"
LATEST_TAG="latest"

# Build the new image
echo "📦 Building image: ${IMAGE_NAME}:${TAG}"
echo "🔧 Building for platform: linux/amd64 (compatible with remote x86_64 host)"
cd strapi
# docker build --platform linux/amd64 --no-cache -t ${IMAGE_NAME}:${LATEST_TAG} .

if [ $? -ne 0 ]; then
    echo "❌ Error: Docker build failed!"
    exit 1
fi

echo "✅ Docker image built successfully"

# Push the new image to Docker Hub
echo "🚀 Pushing image to Docker Hub..."
docker push ${IMAGE_NAME}:${TAG}
docker push ${IMAGE_NAME}:${LATEST_TAG}

if [ $? -ne 0 ]; then
    echo "❌ Error: Docker push failed!"
    exit 1
fi

echo "✅ Docker image pushed successfully: ${IMAGE_NAME}:${TAG}"

# Go back to root directory
cd ..

# Load development environment variables from strapi/.env
while IFS= read -r line; do
    if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
        if [[ "$line" == *"="* ]]; then
            export "$line"
        fi
    fi
done < strapi/.env

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
STACK_NAME="alejandro-louro-dev"

# Switch to remote context
echo "🔗 Switching to remote VPS..."
docker context use hostinger

# Check if Docker Swarm is initialized on remote
if ! docker info | grep -q "Swarm: active"; then
    echo "🔄 Initializing Docker Swarm on remote..."
    docker swarm init
fi

# Pull the latest image from Docker Hub (now using our newly built image)
echo "📥 Pulling latest image from Docker Hub..."
docker pull ${IMAGE_NAME}:${LATEST_TAG}

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

# Wait for services to be ready and check status
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status again
echo "📊 Final service status:"
docker stack services $STACK_NAME

# Get server IP (cross-platform)
SERVER_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
if [ -z "$SERVER_IP" ]; then
    SERVER_IP="localhost"
fi

echo ""
echo "🌐 Access your applications:"
echo "   - Strapi Admin: http://$SERVER_IP:${STRAPI_PORT:-1337}/admin"
echo "   - Strapi API: http://$SERVER_IP:${STRAPI_PORT:-1337}/api"
echo "   - PostgreSQL: Internal only (not exposed externally)"
echo ""
echo "📋 Useful commands:"
echo "   - View stack services: docker stack services $STACK_NAME"
echo "   - View service logs: docker service logs ${STACK_NAME}_strapi"
echo "   - Remove stack: docker stack rm $STACK_NAME"
echo "   - Update stack: ./scripts/deploy-stack-simple.sh"
echo ""
echo "🐳 New Docker image deployed: ${IMAGE_NAME}:${TAG}" 