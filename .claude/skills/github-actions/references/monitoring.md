# Monitoring Reference

Post-deployment monitoring using Rybbit analytics and GitHub Actions status checks.

## Contents
- Analytics Integration
- Deployment Notifications
- Health Checks
- Anti-Patterns

## Analytics Integration

The site uses Rybbit for privacy-focused analytics:

```html
<script
    src="https://app.rybbit.io/api/script.js"
    data-site-id="095d6520421b"
    defer
></script>
```

### Why Rybbit?

| Feature | Rybbit | Google Analytics |
|---------|--------|------------------|
| Cookie consent | Not required | Required (GDPR) |
| Data ownership | Self-hosted option | Google owns |
| Script size | ~2KB | ~45KB |
| Privacy | No PII collected | Extensive tracking |

### Analytics in Build

The script is included in the article template (`scripts/build.js`):

```javascript
function buildArticleTemplate({ title, description, slug, bodyHtml }) {
  return `<!doctype html>
<html lang="es-MX">
<head>
  <!-- ... -->
  <link rel="preconnect" href="https://app.rybbit.io" crossorigin/>
  <link rel="dns-prefetch" href="https://app.rybbit.io"/>
  <!-- ... -->
  <script
      src="https://app.rybbit.io/api/script.js"
      data-site-id="095d6520421b"
      defer
  ></script>
</head>
<!-- ... -->`;
}
```

## Deployment Notifications

### GitHub Status Checks

The workflow automatically reports status:

```yaml
# Implicit status checks
jobs:
  deploy:
    # Success/failure shown in GitHub UI
```

### Slack/Discord Notifications (Optional)

```yaml
- name: Notify on success
  if: success()
  run: |
    curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
      -H 'Content-Type: application/json' \
      -d '{"text":"✅ mejorconexion.mx deployed successfully"}'

- name: Notify on failure
  if: failure()
  run: |
    curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
      -H 'Content-Type: application/json' \
      -d '{"text":"❌ mejorconexion.mx deployment failed"}'
```

## Health Checks

### Built-in Verification

```yaml
- name: Health check
  run: |
    # Check main page
    curl -sf https://mejorconexion.mx/ > /dev/null
    
    # Check critical assets
    curl -sf https://mejorconexion.mx/assets/css/styles.css > /dev/null
    curl -sf https://mejorconexion.mx/assets/js/main.js > /dev/null
    
    # Check HTTP status
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://mejorconexion.mx/)
    test "$STATUS" = "200" || { echo "Got status $STATUS"; exit 1; }
```

### Performance Check

```yaml
- name: Performance check
  run: |
    # Verify response time under 3 seconds
    TIME=$(curl -s -o /dev/null -w "%{time_total}" https://mejorconexion.mx/)
    echo "Response time: ${TIME}s"
    test $(echo "$TIME < 3" | bc) -eq 1 || { echo "Slow response"; exit 1; }
```

### Content Integrity Check

```yaml
- name: Verify content
  run: |
    # Check that key elements exist
    curl -sf https://mejorconexion.mx/ | grep -q "Mejor Conexión" || { echo "Brand missing"; exit 1; }
    curl -sf https://mejorconexion.mx/ | grep -q "rybbit.io" || { echo "Analytics missing"; exit 1; }
```

## WARNING: Monitoring Anti-Patterns

### Silent Failures

**The Problem:**

```yaml
# BAD - Failure not reported
- run: curl https://mejorconexion.mx/
```

**Why This Breaks:**
1. Deploy could succeed but site be broken
2. No visibility into failures
3. Users discover issues before team

**The Fix:**

```yaml
# GOOD - Explicit failure on non-200
- run: curl -sf https://mejorconexion.mx/ > /dev/null || exit 1
```

### Checking Wrong URL

**The Problem:**

```yaml
# BAD - Checking localhost instead of production
- run: curl -sf http://localhost:3000/
```

**Why This Breaks:**
1. Verifies build, not deployment
2. Server issues go undetected

**The Fix:**

```yaml
# GOOD - Check production URL
- run: curl -sf https://mejorconexion.mx/
```

### No Alerting on Analytics

**The Problem:**
Traffic drops 80% but no one notices because alerts aren't configured.

**The Fix:**

Configure Rybbit alerts (if supported) or add external monitoring:

```yaml
# Optional: Uptime monitoring integration
- name: Ping monitoring service
  run: |
    curl -sf https://healthchecks.io/ping/${{ secrets.HEALTHCHECK_ID }}
```

## Monitoring Checklist

Copy this checklist for production monitoring:

```markdown
- [ ] Analytics script loads correctly
- [ ] Health check fails on non-200 status
- [ ] Response time threshold configured
- [ ] Deployment notifications enabled
- [ ] Rollback procedure documented
- [ ] External uptime monitoring configured
```

## Feedback Loop

1. Deploy changes
2. Verify: `curl -sf https://mejorconexion.mx/`
3. Check analytics dashboard for traffic changes
4. If traffic drops, investigate immediately
5. Rollback if issue persists

## Related Skills

- **deployment** - rsync configuration
- **ci-cd** - Workflow setup