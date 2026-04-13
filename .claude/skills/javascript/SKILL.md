---
name: javascript
description: |
  Writes ES2017+ vanilla JavaScript with CommonJS modules for Node.js build scripts and browser-side enhancements.
  Use when: creating or modifying files in scripts/, assets/js/, or any .js file in the project
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__4_5v_mcp__analyze_image, mcp__web_reader__webReader
---

# JavaScript Skill

ES2017+ vanilla JavaScript with CommonJS modules. No TypeScript, no frameworks. This project uses Node.js 22.x for build scripts and ES2017 target for browser code.

## Quick Start

### Import Order (Required)

```javascript
// 1. Node.js built-ins
const fs = require('fs');
const path = require('path');

// 2. External packages
const esbuild = require('esbuild');

// 3. Local modules
const { slugify, parseFrontmatter } = require('./utils');
```

### Export Pattern

```javascript
// Named exports at end of file
module.exports = {
  ensureDir,
  readText,
  slugify,
  parseFrontmatter
};
```

### IIFE for Browser Code

```javascript
// assets/js/main.js - encapsulation without polluting global scope
(() => {
  const header = document.querySelector('[data-site-header]');
  
  function setOpen(open) {
    header.classList.toggle('nav-open', open);
  }
  
  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('nav-open'));
  });
})();
```

## Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `link_graph.js`, `publish_drafts.js` |
| Functions | camelCase | `slugify()`, `parseFrontmatter()` |
| Variables | camelCase | `blogUrls`, `destPath` |
| Constants | SCREAMING_SNAKE_CASE | `IGNORES`, `ROOT`, `SPANISH_STOPWORDS` |

## Key Patterns

### Utility Functions

```javascript
// Pure functions, single responsibility
function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
```

### Async File Operations

```javascript
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
    } else {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}
```

## See Also

- [patterns](references/patterns.md) - Error handling, async patterns, validation
- [types](references/types.md) - Data structures, frontmatter parsing
- [modules](references/modules.md) - Module organization, exports
- [errors](references/errors.md) - Error handling, validation

## Related Skills

- **node** - Node.js runtime and built-in modules
- **esbuild** - JavaScript bundling and minification
- **github-actions** - CI/CD deployment pipeline