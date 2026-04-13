# Deployment Reference

rsync-based deployment to Hostinger shared hosting via SSH.

## Contents
- rsync Configuration
- SSH Setup
- Deployment Verification
- Rollback Strategy
- Anti-Patterns

## rsync Configuration

The current deployment uses rsync with atomic replacement:

```bash
rsync -avz --delete \
  --exclude='.git' \
  --exclude='.github' \
  -e "ssh -i ~/.ssh/deploy_key -p 65002" \
  ./dist/ \
  "${HOSTINGER_SSH_USER}@${HOSTINGER_SSH_HOST}:~/domains/mejorconexion.mx/public_html/"
```

### Flag Explanations

| Flag | Purpose |
|------|---------|
| `-a` | Archive mode (preserves permissions, timestamps, symlinks) |
| `-v` | Verbose output for debugging |
| `-z` | Compress during transfer |
| `--delete` | Remove files on server that don't exist locally |
| `--exclude` | Skip specified patterns |
| `-e` | Specify remote shell command |

### Why rsync Over Alternatives?

| Method | Pros | Cons |
|--------|------|------|
| **rsync** | Incremental transfers, --delete support, fast | Requires SSH access |
| scp | Simple, ubiquitous | No incremental, no delete |
| FTP | Universal | No delete, slower, insecure |
| git pull | Version control | Requires .git on server, slow |

## SSH Setup

### Key Generation

```bash
# Generate deployment key (run locally)
ssh-keygen -t ed25519 -C "github-actions@mejorconexion.mx" -f deploy_key -N ""

# Add public key to Hostinger authorized_keys
cat deploy_key.pub | ssh user@host "cat >> ~/.ssh/authorized_keys"
```

### SSH Config (Optional)

For local testing with the same config:

```
# ~/.ssh/config
Host mejorconexion
  HostName server.hostinger.com
  User u123456789
  Port 65002
  IdentityFile ~/.ssh/deploy_key
```

Then simplify rsync:

```bash
rsync -avz --delete ./dist/ mejorconexion:~/domains/mejorconexion.mx/public_html/
```

## Deployment Verification

Add post-deploy health check:

```yaml
- name: Verify deployment
  run: |
    sleep 10  # Wait for server to settle
    curl -sf https://mejorconexion.mx/ > /dev/null || { echo "Site unreachable"; exit 1; }
    curl -sf https://mejorconexion.mx/assets/css/styles.css > /dev/null || { echo "CSS missing"; exit 1; }
```

### Content Verification

```yaml
- name: Verify content
  run: |
    # Check that build generated expected files
    test $(ls dist/blog/*.html | wc -l) -gt 0 || { echo "No blog articles"; exit 1; }
```

## Rollback Strategy

### Simple Rollback (Redeploy Previous)

```bash
# Local rollback - redeploy previous commit
git checkout HEAD~1
npm run build
rsync -avz --delete ./dist/ user@host:~/domains/mejorconexion.mx/public_html/
git checkout -
```

### Automated Rollback (Advanced)

```yaml
- name: Rollback on failure
  if: failure()
  run: |
    # Fetch previous successful deployment
    PREV_SHA=$(git rev-parse HEAD~1)
    git checkout $PREV_SHA
    npm run build
    rsync -avz --delete ./dist/ user@host:~/domains/mejorconexion.mx/public_html/
```

**Note:** Store build artifacts for faster rollback:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: dist-${{ github.sha }}
    path: dist/
    retention-days: 7
```

## WARNING: Deployment Anti-Patterns

### Deploying Without --delete

**The Problem:**

```bash
# BAD - Orphan files accumulate
rsync -avz ./dist/ user@host:~/public_html/
```

**Why This Breaks:**
1. Renamed files leave duplicates
2. Deleted files persist on server
3. Disk space grows unbounded
4. Stale content remains accessible

**The Fix:**

```bash
# GOOD - Mirror local state
rsync -avz --delete ./dist/ user@host:~/public_html/
```

### SSH Key Permission Issues

**The Problem:**

```yaml
# BAD - Wrong permissions
- run: echo "${{ secrets.KEY }}" > ~/.ssh/key
- run: ssh -i ~/.ssh/key user@host  # Fails: key too open
```

**Why This Breaks:**
SSH rejects private keys with permissions > 600.

**The Fix:**

```yaml
# GOOD - Correct permissions
- run: |
    echo "${{ secrets.KEY }}" > ~/.ssh/key
    chmod 600 ~/.ssh/key
```

### Deploying Uncommitted Changes

**The Problem:**

```bash
# BAD - Deploying local changes not in git
npm run build
rsync ./dist/ server:/var/www/
```

**Why This Breaks:**
1. No audit trail of what was deployed
2. Can't rollback reliably
3. Team can't reproduce deployment

**The Fix:**

```yaml
# GOOD - Only deploy from CI after git push
on:
  push:
    branches: [main]
```

## Deployment Checklist

Copy this checklist for deployment changes:

```markdown
- [ ] Verify all secrets configured in GitHub
- [ ] Test SSH key authentication manually
- [ ] Run `npm run build` locally to verify output
- [ ] Check rsync excludes cover sensitive files
- [ ] Verify deployment path matches server config
- [ ] Test rollback procedure
```

## Related Skills

- **ci-cd** - Workflow configuration
- **monitoring** - Post-deploy verification