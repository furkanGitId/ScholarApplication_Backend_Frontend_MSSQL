# Docker Deployment Guide - Admin Scholar App

## Overview

This guide explains how to build and deploy the Admin Scholar App using Docker. Docker containerization ensures your application runs consistently across different environments.

---

## Prerequisites

Before deploying with Docker, ensure you have:

- **Docker** installed ([Download Docker](https://www.docker.com/products/docker-desktop))
- **Docker Compose** installed (usually comes with Docker Desktop)

To verify installation:

```bash
docker --version
docker-compose --version
```

---

## Files Included

- **Dockerfile** - Multi-stage build configuration for the application
- **nginx.conf** - Nginx server configuration for serving the Angular app
- **.dockerignore** - Specifies files to exclude from Docker build
- **docker-compose.yml** - Orchestration file for running the application

---

## Building the Docker Image

### Option 1: Using Docker Compose (Recommended)

The simplest way to build and run the application:

```bash
docker-compose up -d
```

This command:
- Builds the Docker image from the Dockerfile
- Starts the container in detached mode (-d flag)
- Exposes the application on `http://localhost`

### Option 2: Using Docker Directly

Build the image manually:

```bash
docker build -t admin-scholar-app:latest .
```

Then run the container:

```bash
docker run -d -p 80:80 --name admin-scholar-app admin-scholar-app:latest
```

---

## Accessing Your Application

After running the container, access the application at:

```
http://localhost
```

---

## Docker Commands Reference

### View Running Containers

```bash
docker ps
```

### View All Containers (including stopped)

```bash
docker ps -a
```

### Stop the Container

```bash
docker-compose down
```

or

```bash
docker stop admin-scholar-app
```

### Remove the Container

```bash
docker rm admin-scholar-app
```

### View Container Logs

```bash
docker logs admin-scholar-app
```

or with live streaming:

```bash
docker logs -f admin-scholar-app
```

### Rebuild the Image

```bash
docker-compose down
docker-compose up -d --build
```

or

```bash
docker build --no-cache -t admin-scholar-app:latest .
```

---

## Understanding the Dockerfile

The Dockerfile uses a **multi-stage build** approach:

### Stage 1: Builder
```dockerfile
FROM node:18-alpine AS builder
```
- Uses lightweight Node.js 18 Alpine image
- Installs dependencies
- Builds the Angular application for production
- Generates optimized build files

### Stage 2: Nginx Server
```dockerfile
FROM nginx:alpine
```
- Uses lightweight Nginx image (only the final image is deployed)
- Copies the built application
- Serves files with optimized caching and routing

**Benefits of multi-stage builds:**
- Smaller final image size
- Faster deployment
- More secure (no build tools in production)

---

## Nginx Configuration Explained

The `nginx.conf` file provides:

### 1. **Gzip Compression**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript...
```
- Reduces file sizes for faster transmission
- Compresses CSS, JavaScript, JSON, etc.

### 2. **Static Asset Caching**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```
- Tells browsers to cache static files for 1 year
- Reduces bandwidth usage and improves performance

### 3. **Angular Routing Support**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
- Routes all requests to `index.html`
- Allows Angular Router to handle client-side routing
- Essential for single-page applications (SPAs)

### 4. **Security Headers**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```
- Protects against clickjacking attacks
- Prevents MIME sniffing
- Blocks cross-site scripting (XSS) attacks

---

## Docker Compose Configuration

The `docker-compose.yml` file orchestrates the deployment:

```yaml
version: '3.8'

services:
  admin-scholar-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: admin-scholar-app
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - admin-network
```

**Key settings:**

| Setting | Purpose |
|---------|---------|
| `build` | Tells Docker where the Dockerfile is |
| `ports` | Maps host port 80 to container port 80 |
| `environment` | Sets NODE_ENV to production |
| `restart: unless-stopped` | Auto-restarts container if it crashes |
| `networks` | Creates a network for container communication |

---

## Production Deployment

### Adding HTTPS/SSL Support

For production, use a reverse proxy with SSL termination. Example with Let's Encrypt:

```yaml
version: '3.8'

services:
  admin-scholar-app:
    build: .
    ports:
      - "80:80"
    networks:
      - admin-network

  nginx-proxy:
    image: jwilder/nginx-proxy
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /etc/nginx/certs:/etc/nginx/certs
    networks:
      - admin-network

networks:
  admin-network:
    driver: bridge
```

### Environment Variables

Update `docker-compose.yml` for environment-specific configuration:

```yaml
environment:
  - NODE_ENV=production
  - API_URL=https://api.yourdomain.com
  - LOG_LEVEL=info
```

Then use these variables in your application:

```typescript
// In your service
export const environment = {
  apiUrl: process.env['API_URL'] || 'https://api.yourdomain.com'
};
```

---

## Scaling and Load Balancing

### Running Multiple Instances

```bash
docker-compose up -d --scale admin-scholar-app=3
```

This creates 3 instances of the application.

Use a load balancer (like Nginx, HAProxy, or cloud provider load balancer) to distribute traffic.

---

## Troubleshooting

### Container won't start

Check logs:
```bash
docker logs admin-scholar-app
```

### Port already in use

Change the port in `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Change 3000 to any available port
```

### Out of memory errors

Increase Docker memory limit in Docker Desktop settings or in `docker-compose.yml`:
```yaml
admin-scholar-app:
  mem_limit: 512m
  memswap_limit: 1024m
```

### Build fails

Clear Docker cache and rebuild:
```bash
docker system prune -a
docker-compose up -d --build
```

---

## Best Practices

1. **Use specific version tags** instead of `latest`:
   ```bash
   docker build -t admin-scholar-app:v1.0.0 .
   ```

2. **Use `.dockerignore`** to exclude unnecessary files and reduce image size

3. **Run containers as non-root user** (already handled by Nginx)

4. **Use health checks** to monitor container status:
   ```yaml
   healthcheck:
     test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost"]
     interval: 10s
     timeout: 5s
     retries: 3
   ```

5. **Use environment variables** for configuration instead of hardcoding values

6. **Regular image updates** to get security patches

7. **Use private registries** for sensitive applications:
   ```bash
   docker tag admin-scholar-app:latest myregistry.com/admin-scholar-app:latest
   docker push myregistry.com/admin-scholar-app:latest
   ```

---

## Deployment Checklist

- [ ] Docker and Docker Compose installed
- [ ] All required files present (Dockerfile, nginx.conf, .dockerignore, docker-compose.yml)
- [ ] Application builds successfully (`npm run build`)
- [ ] Environment variables configured
- [ ] Security headers in nginx.conf
- [ ] SSL/HTTPS configured (for production)
- [ ] Health checks configured
- [ ] Container logs monitored
- [ ] Backup strategy in place
- [ ] Documentation updated

---

## Summary

Your Docker setup includes:

1. **Optimized multi-stage build** - Minimal final image size
2. **Nginx server** - Fast, reliable web server
3. **Security headers** - Protects against common attacks
4. **Caching strategy** - Optimizes performance
5. **Docker Compose** - Easy orchestration and deployment

This configuration is production-ready and follows Docker best practices.

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Angular Production Build](https://angular.io/guide/build)
- [12 Factor App](https://12factor.net/)

---

## Getting Help

If you encounter issues:

1. Check container logs: `docker logs admin-scholar-app`
2. Verify image was built: `docker images`
3. Test locally before deploying: `docker run -p 80:80 admin-scholar-app:latest`
4. Check Docker daemon is running
5. Consult Docker and Angular documentation
