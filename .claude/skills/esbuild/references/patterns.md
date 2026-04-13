# Esbuild Patterns Reference

## Contents
- Minification-Only Pattern
- Target Configuration
- Platform Selection
- Source Maps
- Error Handling
- Integration with Build Pipeline

## Minification-Only Pattern

This project does NOT bundle JavaScript. Each file is minified independently.

**When to use:** Static sites with standalone scripts, no module imports between files.

```javascript
// CORRECT - Minification only
await esbuild.build({
  entryPoints: [srcPath],
  outfile: outPath,
  bundle: false,  // Critical: no bundling
  minify: true,
  platform: 'browser',
  target: ['es2017'],
});
```

**When NOT to use:** If your scripts import other modules, you need `bundle: true`.

### WARNING: Enabling Bundle Without Imports

**The Problem:**

```javascript
// BAD - Unnecessary bundle overhead
await esbuild.build({
  entryPoints: ['standalone.js'],
  outfile: 'out.js',
  bundle: true,  // Wastes time, no benefit
  minify: true,
});
```

**Why This Breaks:**
1. Bundle mode adds overhead for dependency resolution
2. No actual bundling occurs without imports
3. Build time increases without size reduction

**The Fix:**

```javascript
// GOOD - Direct minification
await esbuild.build({
  entryPoints: ['standalone.js'],
  outfile: 'out.js',
  bundle: false,
  minify: true,
});
```

## Target Configuration

Target specifies which JavaScript features esbuild can assume exist in the environment.

```javascript
// Project standard: ES2017 for broad browser support
target: ['es2017']

// For modern browsers only (Chrome 90+, Firefox 90+)
target: ['es2022']

// Specific browser versions
target: ['chrome90', 'firefox90', 'safari15']
```

### WARNING: Overly Aggressive Targets

**The Problem:**

```javascript
// BAD - Will break older browsers
target: ['esnext']  // Uses newest features
```

**Why This Breaks:**
1. Syntax like `??=` or `#private` may not be transpiled
2. Older browsers throw syntax errors
3. Users on older devices see broken pages

**The Fix:**

```javascript
// GOOD - Conservative target
target: ['es2017']  // Async/await works, broad support
```

## Platform Selection

```javascript
// Browser code (DOM, window, document)
platform: 'browser'

// Node.js code (fs, path, process)
platform: 'node'

// Neutral (no automatic platform-specific handling)
platform: 'neutral'
```

This project uses `platform: 'browser'` because all JavaScript runs in user browsers.

## Source Maps

Source maps are NOT enabled in this project's production builds for simplicity.

```javascript
// Enable for debugging
await esbuild.build({
  entryPoints: ['src/main.js'],
  outfile: 'dist/main.js',
  bundle: false,
  minify: true,
  sourcemap: true,  // Adds .map file
  platform: 'browser',
  target: ['es2017'],
});

// Inline source map (single file)
sourcemap: 'inline',

// External source map (separate .map file)
sourcemap: 'external',
```

### WARNING: Source Maps in Production

**The Problem:**

```javascript
// BAD - Exposes source structure in production
sourcemap: true  // .map file publicly accessible
```

**Why This Matters:**
1. Reveals internal code structure to attackers
2. Increases bundle size
3. May expose development paths

**The Fix:**

```javascript
// GOOD - Conditional source maps
const isDev = process.env.NODE_ENV !== 'production';
sourcemap: isDev
```

## Error Handling

Esbuild throws on build failures. Always catch errors in build scripts.

```javascript
// Pattern from scripts/build.js
async function minifyJs() {
  try {
    await esbuild.build({
      entryPoints: [srcPath],
      outfile: outPath,
      bundle: false,
      minify: true,
      platform: 'browser',
      target: ['es2017'],
    });
  } catch (err) {
    console.error(`esbuild failed: ${err.message}`);
    throw err;  // Re-throw to fail the build
  }
}
```

### WARNING: Silent Failures

**The Problem:**

```javascript
// BAD - Error swallowed, broken output deployed
esbuild.build({...}).catch(() => {});
```

**Why This Breaks:**
1. Build continues with missing/corrupt output
2. Broken site deploys silently
3. No indication of failure in CI logs

**The Fix:**

```javascript
// GOOD - Propagate errors
try {
  await esbuild.build({...});
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
```

## Integration with Build Pipeline

From `scripts/build.js`:

```javascript
const esbuild = require('esbuild');

async function minifyJs() {
  const srcPath = path.join(root, 'assets', 'js', 'main.js');
  const outPath = path.join(dist, 'assets', 'js', 'main.js');
  
  // Ensure output directory exists
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

// Called in build sequence after copy
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  await minifyJs();  // esbuild step
  await minifyCss(); // See postcss skill
  await minifyHtmlFiles();
}
```

See the **postcss** skill for CSS minification patterns and the **node** skill for build script organization.