---
name: esbuild
description: |
  Configures esbuild for JavaScript minification in static site builds.
  Use when: modifying scripts/build.js, adding new JavaScript entry points, configuring browser targets, or troubleshooting minification issues.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Esbuild Skill

This project uses esbuild exclusively for JavaScript minification (not bundling) in the static site build pipeline. The configuration lives in `scripts/build.js` and targets ES2017+ browsers.

## Quick Start

### Basic Minification (No Bundle)

```javascript
const esbuild = require('esbuild');

await esbuild.build({
  entryPoints: ['assets/js/main.js'],
  outfile: 'dist/assets/js/main.js',
  bundle: false,
  minify: true,
  platform: 'browser',
  target: ['es2017'],
});
```

### Adding a New Entry Point

```javascript
// In scripts/build.js, add a new minify function
async function minifyCalculator() {
  const srcPath = path.join(root, 'assets', 'js', 'calculator.js');
  const outPath = path.join(dist, 'assets', 'js', 'calculator.js');
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await esbuild.build({
    entryPoints: [srcPath],
    outfile: outPath,
    bundle: false,
    minify: true,
    platform: 'browser',
    target: ['es2017'],
  });
}
```

## Key Configuration Options

| Option | Value | Reason |
|--------|-------|--------|
| `bundle` | `false` | Files are standalone; no imports to resolve |
| `minify` | `true` | Whitespace, identifier shortening, dead code |
| `platform` | `'browser'` | Browser-specific output format |
| `target` | `['es2017']` | Matches ES2017+ support requirement |

## Common Patterns

### Conditional Minification

```javascript
const isProd = process.env.NODE_ENV === 'production';

await esbuild.build({
  entryPoints: ['src/main.js'],
  outfile: 'dist/main.js',
  bundle: false,
  minify: isProd,
  platform: 'browser',
  target: ['es2017'],
});
```

### Multiple Entry Points in Parallel

```javascript
const entries = ['main.js', 'calculator.js', 'tools.js'];

await Promise.all(entries.map((file) =>
  esbuild.build({
    entryPoints: [`assets/js/${file}`],
    outfile: `dist/assets/js/${file}`,
    bundle: false,
    minify: true,
    platform: 'browser',
    target: ['es2017'],
  })
));
```

## Related Skills

- See the **postcss** skill for CSS minification via cssnano
- See the **node** skill for build script patterns
- See the **github-actions** skill for CI/CD integration