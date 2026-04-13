# PostCSS Patterns Reference

## Contents
- Plugin Order
- Configuration Patterns
- Error Handling
- Anti-Patterns

## Plugin Order

Plugin order matters. Always place cssnano **last** in the plugin array.

```javascript
// GOOD - cssnano runs last after transformations
const result = await postcss([
  postcssPresetEnv({ stage: 3 }),
  autoprefixer,
  cssnano({ preset: 'default' })
]).process(css, { from, to });
```

```javascript
// BAD - cssnano first prevents other plugins from working correctly
const result = await postcss([
  cssnano({ preset: 'default' }),
  autoprefixer  // Never runs - cssnano already compressed everything
]).process(css, { from, to });
```

**Why:** PostCSS runs plugins sequentially. Minification removes whitespace and simplifies selectors, which can break plugins that expect readable CSS structure.

## Configuration Patterns

### Default Preset (Recommended)

```javascript
// Simple, production-ready minification
const result = await postcss([
  cssnano({ preset: 'default' })
]).process(css, { from, to });
```

### Advanced Preset Configuration

```javascript
// Disable specific optimizations that break your CSS
const result = await postcss([
  cssnano({
    preset: ['default', {
      discardComments: { removeAll: true },
      normalizeWhitespace: true,
      colormin: false,  // Keep color formats as-is
      zindex: false     // Never modify z-index values
    }]
  })
]).process(css, { from, to });
```

### With Source Maps

```javascript
const result = await postcss([cssnano()]).process(css, {
  from: srcPath,
  to: outPath,
  map: { inline: false }  // External .map file
});
await fsp.writeFile(outPath, result.css);
await fsp.writeFile(`${outPath}.map`, result.map.toString());
```

## Error Handling

### WARNING: Silent Failures

```javascript
// BAD - Swallows errors, broken CSS goes to production
try {
  const result = await postcss([cssnano()]).process(css, { from, to });
  await fsp.writeFile(outPath, result.css);
} catch (e) {
  // Silent failure
}
```

```javascript
// GOOD - Log errors and exit with failure code
try {
  const result = await postcss([cssnano()]).process(css, { from, to });
  await fsp.writeFile(outPath, result.css);
} catch (e) {
  console.error(`CSS processing failed: ${e.message}`);
  process.exit(1);
}
```

**Why:** Broken CSS breaks the entire site layout. Silent failures lead to broken production deployments that are hard to diagnose.

### Handling Warnings

```javascript
const result = await postcss([cssnano()]).process(css, { from, to });

// Check for warnings
if (result.warnings().length > 0) {
  result.warnings().forEach(warn => {
    console.warn(`PostCSS warning: ${warn.text} at ${warn.line}:${warn.column}`);
  });
}

await fsp.writeFile(outPath, result.css);
```

## Anti-Patterns

### WARNING: Missing `from` Option

```javascript
// BAD - No source path, poor error messages
const result = await postcss([cssnano()]).process(css);
```

```javascript
// GOOD - Include source path for better debugging
const result = await postcss([cssnano()]).process(css, {
  from: 'assets/css/styles.css',
  to: 'dist/assets/css/styles.css'
});
```

**Why This Breaks:**
1. Error messages lack file context
2. Source maps cannot be generated correctly
3. Relative URL resolution fails

**When You Might Be Tempted:** Quick scripts or one-off transformations seem simpler without the `from` option.

### WARNING: Processing Invalid CSS Silently

```javascript
// BAD - Invalid CSS passes through or causes cryptic errors
const css = '.broken { color }';  // Missing value
const result = await postcss([cssnano()]).process(css, { from, to });
```

```javascript
// GOOD - Validate CSS before processing, use safe mode for recovery
const result = await postcss([cssnano()]).process(css, {
  from,
  to,
  parser: require('postcss-safe-parser')  // Recovers from syntax errors
});
```

**Why This Breaks:** Invalid CSS in source files will either fail the build or produce broken output. Safe parser attempts recovery but may produce unexpected results.

### WARNING: Z-Index Modification

```javascript
// BAD - cssnano may reorder z-index values
cssnano({ preset: 'default' })  // zindex: true by default in some presets
```

```javascript
// GOOD - Explicitly disable z-index modification
cssnano({
  preset: ['default', { zindex: false }]
})
```

**Why This Breaks:**
1. Stacking context depends on specific z-index values
2. Reordering breaks modal overlays, dropdowns, tooltips
3. Debugging is nearly impossible - values change mysteriously

**When You Might Be Tempted:** Default presets seem safe, but z-index modification can silently break complex UIs.

## Integration with esbuild

See the **esbuild** skill for JS minification. Both run in the same build pipeline:

```javascript
// From scripts/build.js
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  await minifyCss();   // PostCSS + cssnano
  await minifyJs();    // esbuild
  await minifyHtmlFiles();
}