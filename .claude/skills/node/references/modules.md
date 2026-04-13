# Node.js Modules Reference

Module organization and export patterns for this codebase.

## Contents
- Module Structure
- Utility Module Pattern
- Export Patterns
- Import Patterns
- Script Entry Points

## Module Structure

### Directory Organization

```
scripts/
├── utils.js              # Shared utilities (sync file ops, parsing)
├── build.js              # Production build (async, fs.promises)
├── link_graph.js         # Link suggestion algorithm
├── pillar_manager.js     # Pillar page management
├── generate_articles_from_outlines.js  # Content generator
└── publish_drafts.js     # Draft validation and publishing
```

### Module Categories

| Category | Pattern | Example |
|----------|---------|---------|
| Utilities | Sync operations, pure functions | `utils.js` |
| Build scripts | Async pipeline, single entry | `build.js` |
| Domain modules | Business logic, algorithms | `link_graph.js` |

## Utility Module Pattern

### utils.js Structure

Export grouped functionality with clear naming:

```javascript
// scripts/utils.js

const fs = require('fs');
const path = require('path');

// === File Operations ===
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

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function writeJson(filePath, data) {
  writeText(filePath, JSON.stringify(data, null, 2));
}

// === Text Processing ===
function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// === Parsing ===
function parseFrontmatter(text) {
  // ... implementation
}

// === Exports ===
module.exports = {
  ensureDir,
  readText,
  writeText,
  readJson,
  writeJson,
  slugify,
  wordCount,
  parseFrontmatter
};
```

### WARNING: Exporting Mutable State

**The Problem:**

```javascript
// BAD - Shared mutable state
let cache = {};

function setCache(key, value) {
  cache[key] = value;
}

module.exports = { cache, setCache };
```

**Why This Breaks:**
1. Modules are cached—state persists across imports
2. Tests interfere with each other
3. Debugging is nightmare when state is unexpected

**The Fix:**

```javascript
// GOOD - Factory function or pass state explicitly
function createCache() {
  const cache = {};
  return {
    get: (key) => cache[key],
    set: (key, value) => { cache[key] = value; }
  };
}

module.exports = { createCache };
```

## Export Patterns

### Named Exports (Preferred)

```javascript
// GOOD - Named exports for clarity
module.exports = {
  ensureDir,
  readText,
  writeText,
  readJson,
  writeJson,
  slugify,
  parseFrontmatter
};
```

### Single Function Export

```javascript
// GOOD - When module has one primary function
module.exports = function buildLinkGraph(articles) {
  return articles.map(article => ({
    ...article,
    keywordSet: tokenSet(`${article.title} ${article.target_keyword || ''}`)
  }));
};
```

### Export with Dependencies

```javascript
// GOOD - Destructured imports at top
const { tokenSet, similarityScore } = require('./utils');

function buildLinkGraph(articles) {
  return articles.map((article) => {
    const keywords = tokenSet(`${article.title} ${article.target_keyword || ''}`);
    return { ...article, keywordSet: keywords };
  });
}

module.exports = {
  buildLinkGraph,
  suggestInternalLinks
};
```

## Import Patterns

### Destructured Named Imports

```javascript
// GOOD - Explicit about what you use
const {
  ensureDir,
  readText,
  writeText,
  writeJson,
  slugify,
  parseFrontmatter
} = require('./utils');
```

### Import with Aliasing

```javascript
// GOOD - Alias when names conflict
const { slugify: slugifyText } = require('./utils');
const { slugify: slugifyUrl } = require('./url-utils');
```

### Conditional Requires

```javascript
// GOOD - Optional dependencies
let openai = null;
try {
  openai = require('openai');
} catch (e) {
  console.warn('OpenAI not available, image generation disabled');
}
```

## Script Entry Points

### IIFE Pattern

```javascript
// GOOD - Immediate invocation for CLI scripts
function main() {
  ensureDir(INPUT_DIR);
  const drafts = fs.readdirSync(INPUT_DIR)
    .filter(file => path.extname(file).toLowerCase() === '.md');
  // ... process
}

main();  // Call immediately
```

### Async Entry Point

```javascript
// GOOD - Async main with error handling
async function main() {
  const report = {
    timestamp: new Date().toISOString(),
    published_count: 0,
    failed_count: 0,
    results: []
  };

  drafts.forEach((draftPath) => {
    const result = publishDraft(draftPath, liveDir, existingSlugs);
    if (result.ok) {
      report.published_count += 1;
    } else {
      report.failed_count += 1;
    }
  });

  writeJson(REPORT_PATH, report);
}

main();
```

### Build Script Pattern

```javascript
// GOOD - Async build with top-level error handling
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  const blogUrls = await generateBlogHtml();
  await minifyCss();
  await minifyJs();
  await updateSitemap(blogUrls);
  await minifyHtmlFiles();
  await syncRootSitemap();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## Constants Module

### Define Constants at Top

```javascript
// GOOD - Constants in SCREAMING_SNAKE_CASE
const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'content-system', 'published-articles');
const ARCHIVE_DIR = path.join(ROOT, 'content-system', 'published-archive');
const FAILED_DIR = path.join(ROOT, 'content-system', 'failed-publish');
const REPORTS_DIR = path.join(ROOT, 'content-system', 'reports');

const IGNORES = new Set([
  '.git',
  '.venv',
  'node_modules',
  'dist',
  'scripts',
]);
```

### WARNING: Hardcoded Paths

**The Problem:**

```javascript
// BAD - Hardcoded absolute paths
const INPUT_DIR = '/home/user/project/content';
```

**Why This Breaks:**
1. Fails on different machines
2. Breaks in CI/CD environments
3. Requires code changes for deployment

**The Fix:**

```javascript
// GOOD - Relative to script or cwd
const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'content-system', 'inbox-outlines');

// Or relative to script location
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
```