# Docker Reference

This project does not use Docker for deployment. The static site is built on GitHub Actions runners and deployed via rsync.

## Why No Docker?

1. **Static site simplicity** - No runtime dependencies beyond the build step
2. **GitHub Actions runners** - Ubuntu-latest provides all required tooling
3. **Direct rsync deployment** - Faster than building/pushing images for static files
4. **No container orchestration needed** - Single server, no scaling requirements

## When Docker Would Help

Consider Docker if:
- Adding a Node.js API backend
- Needing consistent local development environments
- Running multiple environments (staging/production) with isolation
- Implementing blue-green or canary deployments

## Dockerfile Template (Future Use)

If adding a containerized backend:

```dockerfile
# Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# For static site serving
RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
```

## Docker Compose for Local Development

```yaml
# docker-compose.yml (optional for local dev)
version: '3.8'
services:
  site:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./content:/app/content:ro
```

## WARNING: Docker Anti-Patterns

### Over-Engineering Static Sites

**The Problem:**

```yaml
# BAD - Unnecessary complexity for static files
services:
  nginx:
    image: nginx:alpine
    volumes:
      - ./dist:/usr/share/nginx/html
```

**Why This Breaks:**
1. Adds deployment complexity without benefit
2. CI/CD pipeline becomes slower
3. Debugging requires container knowledge
4. rsync is faster and simpler for static files

**The Fix:**

```bash
# GOOD - Direct rsync for static sites
rsync -avz --delete ./dist/ user@host:/var/www/html/
```

## Container Registry Integration

If Docker becomes necessary, configure GitHub Packages:

```yaml
- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: ${{ secrets.REGISTRY }}/mejorconexion:${{ github.sha }}
```

## Related Skills

- **node** - Application runtime
- **deployment** - Current rsync-based deployment