#!/bin/bash

# Script de build para Strapi en Render.com
set -e

echo "Installing dependencies..."
yarn install --frozen-lockfile

echo "Building Strapi..."
yarn build

echo "Build completed successfully!"
