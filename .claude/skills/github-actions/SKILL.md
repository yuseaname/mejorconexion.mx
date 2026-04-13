---
name: github-actions
description: |
  Configures CI/CD workflows for static site deployment to Hostinger via rsync over SSH.
  Use when: creating or modifying .github/workflows files, setting up deployment automation, configuring build pipelines, adding workflow triggers, managing GitHub secrets for deployment
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__4_5v_mcp__analyze_image, mcp__web_reader__webReader
---

# Github-actions Skill

Configures GitHub Actions workflows for deploying the mejorconexion.mx static site to Hostinger. Uses rsync over SSH for atomic deployments with the `--delete` flag.

## Quick Start

### Basic Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Hostinger

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.HOSTINGER_SSH_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H -p 65002 "${{ secrets.HOSTINGER_SSH_HOST }}" >> ~/.ssh/known_hosts
      - name: Deploy via rsync
        run: |
          rsync -avz --delete \
            --exclude='.git' \
            -e "ssh -i ~/.ssh/deploy_key -p 65002" \
            ./dist/ \
            "${{ secrets.HOSTINGER_SSH_USER }}@${{ secrets.HOSTINGER_SSH_HOST }}:~/domains/mejorconexion.mx/public_html/"
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HOSTINGER_SSH_KEY` | Private SSH key for server authentication |
| `HOSTINGER_SSH_HOST` | Hostinger server hostname |
| `HOSTINGER_SSH_USER` | SSH username |

## Key Concepts

| Concept | Usage | Example |
|---------|-------|---------|
| Triggers | `on: push` + `workflow_dispatch` | Manual and automatic deploys |
| Node cache | `cache: 'npm'` | Speeds up `npm ci` by 50-70% |
| SSH keyscan | Adds host to known_hosts | Prevents interactive prompts |
| rsync --delete | Removes stale files on server | Atomic deployments |

## Common Patterns

### Manual Deploy with Inputs

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deploy environment'
        required: true
        default: 'production'
        type: choice
        options:
          - production
          - staging
```

### Conditional Deployment

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: npm run deploy
```

## See Also

- [ci-cd](references/ci-cd.md) - Pipeline patterns and optimization
- [deployment](references/deployment.md) - Hostinger rsync configuration
- [monitoring](references/monitoring.md) - Post-deploy verification

## Related Skills

- **node** - Node.js build configuration
- **javascript** - Build script patterns (see `scripts/build.js`)
- **esbuild** - JavaScript minification
- **postcss** - CSS processing