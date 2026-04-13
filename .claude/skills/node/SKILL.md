---
name: node
description: |
  Configures Node.js 22.x runtime and CommonJS module patterns for build scripts.
  Use when: creating or modifying scripts in scripts/, working with fs/path modules, adding npm dependencies, or running build commands.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__4_5v_mcp__analyze_image, mcp__web_reader__webReader
---

# Node Skill

Node.js 22.x powers all build scripts and content generation in this project. The codebase uses vanilla ES2017+ JavaScript with CommonJS modules—no TypeScript, no ESM imports.

## Quick Start

### Script Entry Point

```javascript
const fs = require('fs');
const path = require('path');
const { ensureDir, readText, writeText } = require('./utils');

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'content-system', 'inbox-outlines');

function main() {
  ensureDir(INPUT_DIR);
  // script logic
}

main();
```

### Async Build Pattern

```javascript
const fsp = fs.promises;

async function build() {
  await fsp.rm(dist, { recursive: true, force: true });
  await copyDir(root, dist);
  await minifyCss();
  await minifyJs();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## Key Concepts

| Concept | Usage | Example |
|---------|-------|---------|
| CommonJS | All modules use `require()` | `const esbuild = require('esbuild')` |
| fs.promises | Async file ops in build scripts | `await fsp.readFile(src, 'utf8')` |
| Sync fs | Utility functions, CLI scripts | `fs.mkdirSync(dir, { recursive: true })` |
| path module | Cross-platform path handling | `path.join(__dirname, '..', 'dist')` |
| process.exit | Exit with error code | `process.exit(1)` on failure |

## Common Patterns

### Utility Module Export

**When:** Creating shared functions in `scripts/utils.js`

```javascript
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = {
  ensureDir,
  readText,
  // other exports
};
```

### Safe File Write with Backup

**When:** Overwriting existing files in content pipeline

```javascript
function writeFileSafe(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(filePath, `${filePath}.bak-${stamp}`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}
```

## Available Scripts

| Command | Entry Point |
|---------|-------------|
| `npm run build` | `scripts/build.js` |
| `npm run content:build` | `scripts/generate_articles_from_outlines.js` |
| `npm run content:publish` | `scripts/publish_drafts.js` |

## See Also

- [patterns](references/patterns.md) - Error handling, async patterns
- [types](references/types.md) - Frontmatter parsing, config types
- [modules](references/modules.md) - Module structure, exports
- [errors](references/errors.md) - Error handling patterns

## Related Skills

- **javascript** - ES2017+ syntax and conventions
- **esbuild** - JavaScript bundling and minification
- **postcss** - CSS processing pipeline
- **github-actions** - CI/CD deployment workflow