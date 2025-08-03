#!/bin/bash

# LaunchPad Status Script
echo "📊 LaunchPad Status Report"
echo "=========================="

# Check if we're connected to remote
if docker context show | grep -q "hostinger"; then
    echo "🔗 Connected to: Remote VPS (hostinger)"
    CONTEXT="remote"
else
    echo "🔗 Connected to: Local"
    CONTEXT="local"
fi

echo ""

# Show Docker Swarm status
if docker info | grep -q "Swarm: active"; then
    echo "✅ Docker Swarm: Active"
else
    echo "❌ Docker Swarm: Not active"
fi

echo ""

# Show all stacks
echo "📋 Docker Stacks:"
echo "================="
docker stack ls 2>/dev/null || echo "No stacks found"

echo ""

# Show services for each stack
for stack in $(docker stack ls --format "{{.Name}}" 2>/dev/null); do
    echo "🔧 Stack: $stack"
    echo "Services:"
    docker stack services $stack 2>/dev/null || echo "  No services found"
    echo ""
done

# Show local containers if running locally
if [ "$CONTEXT" = "local" ]; then
    echo "🐳 Local Containers:"
    echo "==================="
    docker-compose --env-file .env.dev ps 2>/dev/null || echo "No local containers running"
fi

echo ""
echo "📚 Available Commands:"
echo "======================"
echo "  Local Development:"
echo "    ./scripts/dev.sh                    - Start local development environment"
echo "    ./scripts/setup.sh                  - Initial project setup"
echo ""
echo "  Remote Deployment:"
echo "    ./scripts/deploy-stack-simple.sh    - Deploy development stack to VPS"
echo "    ./scripts/deploy-stack-prod.sh      - Deploy production stack to VPS"
echo "    ./scripts/status.sh                 - Show this status report"
echo ""
echo "  Docker Context:"
echo "    docker context use default          - Switch to local Docker"
echo "    docker context use hostinger        - Switch to remote VPS"
echo ""
echo "  Stack Management:"
echo "    docker stack services <stack-name>  - List stack services"
echo "    docker stack rm <stack-name>        - Remove stack"
echo "    docker service logs <service-name>  - View service logs" 