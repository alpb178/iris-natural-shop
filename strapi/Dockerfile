FROM node:22-alpine AS builder

# Set working directory
WORKDIR /srv/app

# Install dependencies for node-gyp
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:22-alpine AS production

# Set working directory
WORKDIR /srv/app

# Install dependencies for node-gyp
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production=true

# Copy built application from builder stage
COPY --from=builder /srv/app/dist ./dist
COPY --from=builder /srv/app/public ./public
COPY --from=builder /srv/app/favicon.png ./favicon.png
COPY --from=builder /srv/app/package.json ./package.json

# Create uploads directory
RUN mkdir -p public/uploads

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001

# Change ownership of the app directory
RUN chown -R strapi:nodejs /srv/app
USER strapi

# Expose port
EXPOSE 1337

# Start production server
CMD ["yarn", "start"] 