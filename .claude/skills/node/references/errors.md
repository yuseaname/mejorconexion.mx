# Node.js Errors Reference

Error handling patterns and common pitfalls in this codebase.

## Contents
- Error Handling Patterns
- Build Script Errors
- Validation Errors
- File Operation Errors
- Common Pitfalls

## Error Handling Patterns

### Top-Level Error Handler

```javascript
// GOOD - Catch all errors at entry point
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  await minifyCss();
  await minifyJs();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Validation Error Collection

```javascript
// GOOD - Collect all errors, report once
function validateArticle(data, body) {
  const errors = [];

  if (!data.title) errors.push('Missing title');
  if (!data.description) errors.push('Missing description');
  if (!data.slug) errors.push('Missing slug');
  if (countWords(body) < 2000) errors.push('Word count below 2000');
  if (h2Count < 5) errors.push('Must have at least 5 H2 headings');
  if (faqCount < 5) errors.push('FAQ must include at least 5 questions');
  if (internalLinks < 5) errors.push('Must include at least 5 internal links');

  if (errors.length) {
    return { ok: false, errors };
  }
  return { ok: true };
}
```

### WARNING: Silent Failures

**The Problem:**

```javascript
// BAD - Silent failure, no indication of error
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return parseContent(content);
  } catch (e) {
    return null;  // Silent failure
  }
}
```

**Why This Breaks:**
1. Bugs are impossible to trace
2. User doesn't know something went wrong
3. Downstream code receives null unexpectedly

**The Fix:**

```javascript
// GOOD - Log and rethrow or return error info
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { ok: true, data: parseContent(content) };
  } catch (e) {
    console.error(`Failed to process ${filePath}:`, e.message);
    return { ok: false, error: e.message };
  }
}
```

## Build Script Errors

### Exit Codes

```javascript
// GOOD - Use exit codes for CI/CD
build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);  // Non-zero = failure
});

// Success exits with 0 (implicit)
```

### WARNING: Unhandled Promise Rejections

**The Problem:**

```javascript
// BAD - Async function without await or catch
async function processFiles() {
  const files = await fsp.readdir(dir);
  files.forEach(file => {
    fsp.readFile(file).then(data => {  // Fire and forget
      processData(data);
    });
  });
}
```

**Why This Breaks:**
1. Promise rejections are unhandled
2. Script may exit before async work completes
3. Errors are silently swallowed

**The Fix:**

```javascript
// GOOD - Await all async operations
async function processFiles() {
  const files = await fsp.readdir(dir);
  for (const file of files) {
    const data = await fsp.readFile(file);
    processData(data);
  }
}

// Or use Promise.all for parallel execution
async function processFilesParallel() {
  const files = await fsp.readdir(dir);
  await Promise.all(files.map(file => 
    fsp.readFile(file).then(processData)
  ));
}
```

## Validation Errors

### Report Format

```javascript
// GOOD - Structured error reporting
const report = {
  timestamp: new Date().toISOString(),
  live_articles_dir: path.relative(ROOT, liveDir),
  warning: null,  // Optional warning message
  published_count: 0,
  failed_count: 0,
  results: [
    { file: 'article1.md', status: 'published', slug: 'article-1' },
    { file: 'article2.md', status: 'failed', errors: ['Word count below 2000'] }
  ]
};

writeJson(REPORT_PATH, report);
console.log(`Publish complete. Published: ${report.published_count}, Failed: ${report.failed_count}`);
```

### Failed Article Handling

```javascript
// GOOD - Move failed articles with error details
if (errors.length) {
  const failedPath = path.join(FAILED_DIR, path.basename(filePath));
  writeFileSafe(failedPath, readText(filePath));
  writeJson(`${failedPath}.error.json`, { errors });
  fs.unlinkSync(filePath);  // Remove from input
  return { ok: false, errors };
}
```

## File Operation Errors

### Safe File Write Pattern

```javascript
// GOOD - Backup before overwrite
function writeFileSafe(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.bak-${stamp}`;
    fs.copyFileSync(filePath, backupPath);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}
```

### Directory Creation Pattern

```javascript
// GOOD - Always use recursive option
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}
```

### WARNING: Race Conditions in File Ops

**The Problem:**

```javascript
// BAD - Check-then-act pattern
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);  // Could be created between check and mkdir
}
```

**Why This Breaks:**
1. Race conditions in parallel operations
2. Fails if directory created by another process

**The Fix:**

```javascript
// GOOD - Use recursive option, ignore existence
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// For async
await fsp.mkdir(dirPath, { recursive: true });
```

## Common Pitfalls

### Missing Error Propagation

```javascript
// BAD - Error swallowed in callback
fs.readdir(dir, (err, files) => {
  if (err) return;  // Silent failure
  processFiles(files);
});

// GOOD - Proper error handling
fs.readdir(dir, (err, files) => {
  if (err) {
    console.error('Failed to read directory:', err);
    process.exit(1);
  }
  processFiles(files);
});
```

### Sync Operation in Async Context

```javascript
// BAD - Blocking sync in async function
async function build() {
  const files = fs.readdirSync(dir);  // Blocks event loop
  return Promise.all(files.map(processFile));
}

// GOOD - Use async equivalents
async function build() {
  const files = await fsp.readdir(dir);
  return Promise.all(files.map(processFile));
}
```

### Process Exit Before Async Complete

```javascript
// BAD - Exits before async work done
function main() {
  processData();
  console.log('Done');
}

// GOOD - Await async operations
async function main() {
  await processData();
  console.log('Done');
}

main();
```

## Debug Checklist

When a script fails:

1. Check error output in console
2. Review last-run-report.json for content pipeline errors
3. Check failed-outlines/ or failed-publish/ for failed files
4. Verify file paths are relative to script location
5. Check if required directories exist

```bash
# Run build with error trace
node scripts/build.js

# Check publish report
cat content-system/reports/last-publish-report.json | jq '.results[] | select(.status == "failed")'

# View failed articles
ls content-system/failed-publish/