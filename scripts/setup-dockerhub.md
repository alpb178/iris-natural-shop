# Docker Hub Setup for GitHub Actions

## Prerequisites

1. **Docker Hub Account**: Create an account at https://hub.docker.com
2. **Repository Access**: Make sure you have access to push to the `alegd/alejandro-louro-cms` repository

## Setup Steps

### 1. Create Docker Hub Access Token

1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Give it a name like "GitHub Actions"
4. Copy the token (you won't see it again!)

### 2. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

- **`DOCKERHUB_USERNAME`**: Your Docker Hub username (e.g., `alegd`)
- **`DOCKERHUB_TOKEN`**: The access token you created above

### 3. Create Docker Hub Repository

If the repository doesn't exist yet, create it:

1. Go to https://hub.docker.com/repositories
2. Click "Create Repository"
3. Name: `alejandro-louro-cms`
4. Visibility: Public or Private (your choice)

### 4. Test the Setup

Push a change to the `dev` branch to trigger the build:

```bash
git add .
git commit -m "Test Docker Hub build"
git push origin dev
```

## Image Tags

The workflow will create these image tags:

- **`alegd/alejandro-louro-cms:dev`** - Development branch
- **`alegd/alejandro-louro-cms:main`** - Main branch
- **`alegd/alejandro-louro-cms:latest`** - Latest stable version

## Troubleshooting

### Common Issues:

1. **Authentication Failed**: Check your Docker Hub username and token
2. **Repository Not Found**: Make sure the repository exists and you have push access
3. **Build Failed**: Check the GitHub Actions logs for build errors

### Manual Build (for testing):

```bash
# Build locally
docker build -t alegd/alejandro-louro-cms:dev ./strapi

# Push to Docker Hub
docker login
docker push alegd/alejandro-louro-cms:dev
```
