# Node.js Patterns Reference

Idiomatic patterns for build scripts in this codebase.

## Contents
- File System Operations
- Async vs Sync Patterns
- Directory Walking
- Error Handling Patterns
- Configuration Loading

## File System Operations

### Sync Operations for Utilities

Use synchronous operations in utility functions where simplicity matters more than concurrency:

```javascript
// GOOD - Simple utility functions
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}
```

### Async Operations for Build Scripts

Use `fs.promises` in build scripts for better performance with I/O-bound operations:

```javascript
// GOOD - Async build pipeline
const fsp = fs.promises;

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORES.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}
```

### WARNING: Mixing Sync and Async

**The Problem:**

```javascript
// BAD - Mixing sync/async creates confusing code
function processFiles() {
  fs.readdirSync(dir).forEach(file => {
    fs.promises.readFile(file).then(data => {
      fs.writeFileSync(output, data);  // Sync in async chain
    });
  });
}
```

**Why This Breaks:**
1. Error handling is inconsistent (try/catch vs .catch())
2. Control flow is unclear—async operations fire without awaiting
3. Race conditions when multiple writes happen simultaneously

**The Fix:**

```javascript
// GOOD - Consistent async/await
async function processFiles() {
  const files = await fsp.readdir(dir);
  for (const file of files) {
    const data = await fsp.readFile(file);
    await fsp.writeFile(output, data);
  }
}
```

## Async vs Sync Patterns

### Rule of Thumb

| Context | Pattern | Reason |
|---------|---------|--------|
| CLI scripts (one-shot) | Sync acceptable | No concurrent operations needed |
| Build scripts | Async preferred | I/O parallelization |
| Utility functions | Sync preferred | Simplicity, predictable execution |
| HTTP servers | Always async | Non-blocking requirement |

### Async Entry Point Pattern

```javascript
// GOOD - Async main with proper error handling
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  const blogUrls = await generateBlogHtml();
  await minifyCss();
  await minifyJs();
  await updateSitemap(blogUrls);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## Directory Walking

### Recursive Directory Traversal

```javascript
// GOOD - Sync walker for utility scripts
function getAllMarkdownFiles(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
      files.push(fullPath);
    }
  }
  return files;
}
```

### Async Directory Walker

```javascript
// GOOD - Async walker for build scripts
async function walk(dir, callback) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, callback);
      continue;
    }
    if (entry.isFile()) {
      await callback(fullPath);
    }
  }
}
```

## Error Handling Patterns

### Fail Fast with process.exit

```javascript
// GOOD - Exit on error in build scripts
build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Validation Error Collection

```javascript
// GOOD - Collect all errors before failing
function validateArticle(data, body) {
  const errors = [];
  
  if (!data.title) errors.push('Missing title');
  if (!data.description) errors.push('Missing description');
  if (countWords(body) < 2000) errors.push('Word count below 2000');
  
  if (errors.length) {
    return { ok: false, errors };
  }
  return { ok: true };
}
```

## Configuration Loading

### JSON Config with Defaults

```javascript
// GOOD - Simple config loading
function loadConfig(configPath) {
  return readJson(configPath);
}

// Usage
const config = loadConfig('./config/content-system.config.json');
```

### Environment Variables

```javascript
// GOOD - Env vars with defaults
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const IMAGE_SIZE = process.env.OPENAI_IMAGE_SIZE || '1536x1024';

// Check required env vars
if (!OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. Image generation disabled.');
}
```

## Import Order Convention

Follow this order in all scripts:

```javascript
// 1. Node.js built-ins
const fs = require('fs');
const path = require('path');

// 2. External packages
const esbuild = require('esbuild');
const postcss = require('postcss');

// 3. Local modules
const { ensureDir, readText } = require('./utils');
```