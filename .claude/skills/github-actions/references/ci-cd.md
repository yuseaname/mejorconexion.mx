# CI/CD Reference

GitHub Actions workflow configuration for the mejorconexion.mx static site pipeline.

## Contents
- Workflow Structure
- Build Optimization
- Secret Management
- Anti-Patterns

## Workflow Structure

The single workflow handles build and deploy in one job for simplicity:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'      # Caches ~/.npm for faster installs
      - run: npm ci         # Clean install from lockfile
      - run: npm run build  # Creates ./dist folder
      # ... deploy steps
```

### Why Single Job?

1. **No artifacts to pass** - dist/ folder used immediately
2. **Faster total time** - No job queuing overhead
3. **Simpler debugging** - All logs in one place

## Build Optimization

### npm Cache Configuration

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'
```

This caches `~/.npm` based on `package-lock.json` hash. First run: ~30s, subsequent: ~5s.

### Build Caching (Optional)

For faster builds, cache esbuild output:

```yaml
- name: Cache build
  uses: actions/cache@v4
  with:
    path: dist
    key: ${{ runner.os }}-build-${{ hashFiles('assets/**', 'content/**') }}
```

**WARNING:** Only enable if `npm run build` becomes a bottleneck. Stale cache bugs are harder to debug.

## Secret Management

### Required Secrets

Set in GitHub repository Settings > Secrets and variables > Actions:

```
HOSTINGER_SSH_KEY     # Private key content (include -----BEGIN header)
HOSTINGER_SSH_HOST    # Server hostname
HOSTINGER_SSH_USER    # SSH username
```

### SSH Key Format

```yaml
# GOOD - Key as multiline string
HOSTINGER_SSH_KEY: |
  -----BEGIN OPENSSH PRIVATE KEY-----
  b3BlbnNzaC1rZXktdjEAAAAABG5vbmU...
  -----END OPENSSH PRIVATE KEY-----
```

```yaml
# BAD - Base64 encoded (unnecessary complexity)
HOSTINGER_SSH_KEY: LS0tLS1CRUdJTi...
```

### Non-Secret Configuration

Environment variables for non-sensitive data:

```yaml
env:
  NODE_ENV: production
  DEPLOY_PATH: ~/domains/mejorconexion.mx/public_html/
```

## WARNING: CI/CD Anti-Patterns

### Unpinned Action Versions

**The Problem:**

```yaml
# BAD - Breaks when v5 introduces breaking changes
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
```

**Why This Breaks:**
1. Actions can introduce breaking changes in minor versions
2. Builds become non-reproducible
3. Debugging is harder when behavior changes unexpectedly

**The Fix:**

```yaml
# GOOD - Pin to exact version
- uses: actions/checkout@v4.1.1
- uses: actions/setup-node@v4.0.2
```

**Note:** The current workflow uses major versions (@v4) which is acceptable for GitHub-maintained actions, but pin to exact versions for third-party actions.

### SSH Key in Repository

**The Problem:**

```yaml
# CRITICAL SECURITY ISSUE - NEVER DO THIS
- run: echo "-----BEGIN PRIVATE KEY-----..." > ~/.ssh/deploy_key
```

**Why This Breaks:**
1. Credentials in git history forever
2. Anyone with repo access can deploy
3. Secret rotation requires force-pushing

**The Fix:**

```yaml
# GOOD - Use GitHub Secrets
- run: echo "${{ secrets.HOSTINGER_SSH_KEY }}" > ~/.ssh/deploy_key
```

### Missing Error Handling

**The Problem:**

```yaml
# BAD - Fails silently, no notification
- run: npm run build
- run: rsync ...
```

**Why This Breaks:**
1. Deployed broken site without awareness
2. No visibility into failure points

**The Fix:**

```yaml
# GOOD - Explicit error handling
- name: Build
  run: npm run build
  id: build

- name: Verify build output
  run: |
    test -d dist || { echo "Build failed: no dist/"; exit 1; }
    test -f dist/index.html || { echo "Build failed: no index.html"; exit 1; }

- name: Deploy
  if: success()
  run: rsync ...
```

## Parallel Job Pattern (Future)

For larger projects, split into parallel jobs:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      # ... deploy steps
```

## Related Skills

- **deployment** - rsync configuration for Hostinger
- **node** - Build script details
- **javascript** - Build pipeline implementation