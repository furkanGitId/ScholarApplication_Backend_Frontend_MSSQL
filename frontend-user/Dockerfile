# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Use 'npm ci' for more reliable builds in Docker
RUN npm ci 

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM nginx:alpine

# Copy built files to nginx
# Adjust the path based on your angular.json outputPath
COPY --from=builder /app/dist/scholar-app/browser /usr/share/nginx/html

# Create a simple nginx configuration
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
