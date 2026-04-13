# JavaScript Modules Reference

## Contents
- CommonJS Exports
- Utility Module Pattern
- Script Entry Points
- Module Organization
- Anti-Patterns

## CommonJS Exports

This project uses CommonJS (`require`/`module.exports`), not ES modules.

### Named Exports (Preferred)

```javascript
// utils.js
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Export at end of file
module.exports = {
  ensureDir,
  slugify
};
```

### Importing Named Exports

```javascript
// Destructured import (preferred)
const { ensureDir, slugify, parseFrontmatter } = require('./utils');

// Full namespace import
const utils = require('./utils');
utils.ensureDir('./output');
```

### Single Export

```javascript
// For modules with one main function
module.exports = function buildLinkGraph(articles) {
  return articles.map((article) => ({
    ...article,
    keywordSet: tokenSet(`${article.title} ${article.target_keyword || ''}`)
  }));
};
```

## Utility Module Pattern

### utils.js - Central Utilities

```javascript
const fs = require('fs');
const path = require('path');

// File operations
function ensureDir(dirPath) { /* ... */ }
function readText(filePath) { /* ... */ }
function writeText(filePath, content) { /* ... */ }
function readJson(filePath) { /* ... */ }
function writeJson(filePath, data) { /* ... */ }

// String utilities
function slugify(input) { /* ... */ }
function wordCount(text) { /* ... */ }

// Parsing
function parseFrontmatter(text) { /* ... */ }
function parseOutlineFile(filePath) { /* ... */ }

// Collections
function tokenSet(text) { /* ... */ }
function similarityScore(setA, setB) { /* ... */ }

module.exports = {
  ensureDir,
  readText,
  writeText,
  readJson,
  writeJson,
  slugify,
  parseFrontmatter,
  parseOutlineFile,
  wordCount,
  tokenSet,
  similarityScore
};
```

## Script Entry Points

### Build Script Pattern

```javascript
// scripts/build.js
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const esbuild = require('esbuild');
const { parseFrontmatter, slugify } = require('./utils');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const IGNORES = new Set(['.git', 'node_modules', 'dist', 'scripts']);

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

### Validation Script Pattern

```javascript
// scripts/publish_drafts.js
const {
  ensureDir,
  readText,
  writeText,
  slugify,
  parseFrontmatter
} = require('./utils');

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'content-system', 'published-articles');

function main() {
  ensureDir(INPUT_DIR);
  
  const drafts = fs.readdirSync(INPUT_DIR)
    .filter((file) => path.extname(file).toLowerCase() === '.md')
    .map((file) => path.join(INPUT_DIR, file));

  drafts.forEach((draftPath) => {
    const result = publishDraft(draftPath);
    if (result.ok) {
      console.log(`Published: ${result.slug}`);
    }
  });
}

main();
```

## Module Organization

### Directory Structure

```
scripts/
├── utils.js              # Shared utilities (imported by all)
├── build.js              # Production build (imports utils)
├── publish_drafts.js     # Content publishing (imports utils)
├── link_graph.js         # Link suggestions (imports utils)
└── pillar_manager.js     # Pillar pages (imports utils)
```

### Dependency Graph

```
utils.js
   ↑
   ├── build.js
   ├── publish_drafts.js
   ├── link_graph.js
   └── pillar_manager.js
```

### Import Order Convention

```javascript
// 1. Node.js built-ins (alphabetical)
const fs = require('fs');
const path = require('path');

// 2. External packages (alphabetical)
const esbuild = require('esbuild');
const postcss = require('postcss');

// 3. Local modules (alphabetical)
const { slugify, parseFrontmatter } = require('./utils');
const linkGraph = require('./link_graph');
```

## Anti-Patterns

### WARNING: Circular Dependencies

```javascript
// BAD - a.js requires b.js, b.js requires a.js
// a.js
const b = require('./b');
module.exports = { fnA: () => b.fnB() };

// b.js
const a = require('./a');
module.exports = { fnB: () => a.fnA() };

// GOOD - Extract shared logic to third module
// shared.js
module.exports = { shared: () => {} };
```

### WARNING: Mixed Export Styles

```javascript
// BAD - Mixing exports throughout file
module.exports.functionA = functionA;
function functionA() {}

module.exports.functionB = functionB;
function functionB() {}

// GOOD - Single export at end
function functionA() {}
function functionB() {}

module.exports = { functionA, functionB };
```

### WARNING: Importing More Than Needed

```javascript
// BAD - Imports entire lodash
const _ = require('lodash');

// GOOD - Import only what's needed (if using lodash)
const debounce = require('lodash/debounce');

// BETTER - Use native methods
const debounced = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
```

### WARNING: Global State in Modules

```javascript
// BAD - Shared mutable state
let cache = {};
module.exports = {
  get: (key) => cache[key],
  set: (key, val) => { cache[key] = val; }
};

// GOOD - Factory function for isolated state
function createCache() {
  const cache = {};
  return {
    get: (key) => cache[key],
    set: (key, val) => { cache[key] = val; }
  };
}
module.exports = { createCache };
```

## Related Skills

- **node** - Node.js runtime specifics
- **esbuild** - Build tool configuration