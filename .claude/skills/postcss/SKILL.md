---
name: postcss
description: |
  Processes CSS with PostCSS and cssnano for optimization. Use when: modifying the build pipeline, adding CSS transformations, troubleshooting minification issues, or extending PostCSS with additional plugins like autoprefixer or postcss-preset-env.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__4_5v_mcp__analyze_image, mcp__web_reader__webReader
---

# PostCSS Skill

PostCSS transforms CSS with JavaScript plugins. This project uses PostCSS with cssnano for production CSS minification in the static site build pipeline.

## Quick Start

### Basic CSS Minification

```javascript
const postcss = require('postcss');
const cssnano = require('cssnano');

async function minifyCss(srcPath, outPath) {
  const css = await fsp.readFile(srcPath, 'utf8');
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, { from: srcPath, to: outPath });
  await fsp.writeFile(outPath, result.css, 'utf8');
}
```

### Running the Build

```bash
npm run build  # Executes scripts/build.js which runs PostCSS/cssnano
```

## Key Concepts

| Concept | Usage | Example |
|---------|-------|---------|
| `postcss()` | Creates processor instance | `postcss([plugins])` |
| `.process()` | Transforms CSS | `processor.process(css, { from, to })` |
| `cssnano` | CSS minifier plugin | `cssnano({ preset: 'default' })` |
| Source map | Disabled by default | Add `{ map: true }` to process options |

## Common Patterns

### Extending with Additional Plugins

```javascript
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

async function processCss(css, from, to) {
  return postcss([
    postcssPresetEnv({ stage: 3 }),
    autoprefixer,
    cssnano({ preset: 'default' })
  ]).process(css, { from, to });
}
```

### Processing Multiple CSS Files

```javascript
async function processAllCssFiles(srcDir, destDir) {
  const files = await glob('**/*.css', { cwd: srcDir });
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const outPath = path.join(destDir, file);
    const css = await fsp.readFile(srcPath, 'utf8');
    const result = await postcss([cssnano()]).process(css, { from: srcPath, to: outPath });
    await fsp.mkdir(path.dirname(outPath), { recursive: true });
    await fsp.writeFile(outPath, result.css, 'utf8');
  }
}
```

## See Also

- [patterns](references/patterns.md)
- [workflows](references/workflows.md)

## Related Skills

- **javascript** - Build scripts are Node.js/JavaScript
- **esbuild** - JS minification in the same build pipeline
- **node** - Runtime environment for build scripts