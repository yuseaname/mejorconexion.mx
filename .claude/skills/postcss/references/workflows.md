# PostCSS Workflows Reference

## Contents
- Adding New CSS Plugins
- Debugging Minification Issues
- Updating cssnano Configuration
- Build Pipeline Changes

## Adding New CSS Plugins

### Step-by-Step Process

1. Install the plugin:
```bash
npm install --save-dev autoprefixer
```

2. Import and add to plugin array in `scripts/build.js`:
```javascript
const autoprefixer = require('autoprefixer');

async function minifyCss() {
  const srcPath = path.join(root, 'assets', 'css', 'styles.css');
  const outPath = path.join(dist, 'assets', 'css', 'styles.css');
  const css = await fsp.readFile(srcPath, 'utf8');
  
  // Add autoprefixer BEFORE cssnano
  const result = await postcss([
    autoprefixer,
    cssnano({ preset: 'default' })
  ]).process(css, { from: srcPath, to: outPath });
  
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await fsp.writeFile(outPath, result.css, 'utf8');
}
```

3. Test the build:
```bash
npm run build
```

4. Verify output in `dist/assets/css/styles.css`

### Copy This Checklist

```markdown
- [ ] Install plugin: `npm install --save-dev <plugin-name>`
- [ ] Add require/import at top of scripts/build.js
- [ ] Add plugin to postcss array BEFORE cssnano
- [ ] Run `npm run build`
- [ ] Check dist/assets/css/styles.css for expected changes
- [ ] Verify no CSS errors in browser console
```

## Debugging Minification Issues

### Common Symptoms and Fixes

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Layout broken | Over-aggressive optimization | Disable specific cssnano options |
| Colors changed | Colormin converted formats | Set `colormin: false` |
| Animations fail | calc() simplified incorrectly | Check `calc: false` option |
| z-index wrong | Values reordered | Set `zindex: false` |
| Selectors missing | Duplicate removal too aggressive | Check `uniqueSelectors` option |

### Debug Workflow

1. **Compare source vs output:**
```bash
# View original
cat assets/css/styles.css | head -50

# View minified
cat dist/assets/css/styles.css
```

2. **Disable cssnano temporarily:**
```javascript
// In scripts/build.js - for debugging only
const result = await postcss([]).process(css, { from: srcPath, to: outPath });
```

3. **Enable verbose logging:**
```javascript
const result = await postcss([
  cssnano({
    preset: ['default', {
      // Add verbose options here
    }]
  })
]).process(css, { from: srcPath, to: outPath });

console.log('CSS size:', css.length, '→', result.css.length);
```

### Iterate Until Fixed

```markdown
1. Identify broken CSS property or selector
2. Find matching cssnano option in documentation
3. Disable that option in cssnano config
4. Run `npm run build`
5. Test in browser
6. Repeat until issue resolved
```

## Updating cssnano Configuration

### Conservative Configuration

For maximum safety with existing CSS:

```javascript
const result = await postcss([
  cssnano({
    preset: ['default', {
      zindex: false,           // Never modify z-index
      discardUnused: false,    // Keep all rules
      reduceIdents: false,     // Keep animation names
      mergeRules: false,       // Don't merge rules
      colormin: false          // Keep color format
    }]
  })
]).process(css, { from: srcPath, to: outPath });
```

### Aggressive Configuration

For maximum compression when you control all CSS:

```javascript
const result = await postcss([
  cssnano({
    preset: ['advanced', {
      discardComments: { removeAll: true },
      reduceIdents: true,
      mergeRules: true
    }]
  })
]).process(css, { from: srcPath, to: outPath });
```

## Build Pipeline Changes

### Adding CSS Source Maps to Production

1. Update `minifyCss()` function:
```javascript
async function minifyCss() {
  const srcPath = path.join(root, 'assets', 'css', 'styles.css');
  const outPath = path.join(dist, 'assets', 'css', 'styles.css');
  const css = await fsp.readFile(srcPath, 'utf8');
  
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, {
    from: srcPath,
    to: outPath,
    map: { inline: false }
  });
  
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await fsp.writeFile(outPath, result.css, 'utf8');
  await fsp.writeFile(`${outPath}.map`, result.map.toString(), 'utf8');
}
```

2. Verify the map file is created:
```bash
npm run build
ls -la dist/assets/css/
# Should show: styles.css and styles.css.map
```

### Processing Multiple CSS Files

For projects with multiple CSS files:

```javascript
async function processAllCss() {
  const cssDir = path.join(root, 'assets', 'css');
  const entries = await fsp.readdir(cssDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.css')) continue;
    
    const srcPath = path.join(cssDir, entry.name);
    const outPath = path.join(dist, 'assets', 'css', entry.name);
    const css = await fsp.readFile(srcPath, 'utf8');
    
    const result = await postcss([cssnano({ preset: 'default' })])
      .process(css, { from: srcPath, to: outPath });
    
    await fsp.mkdir(path.dirname(outPath), { recursive: true });
    await fsp.writeFile(outPath, result.css, 'utf8');
  }
}
```

## Validation Workflow

```markdown
1. Make CSS changes in assets/css/styles.css
2. Run: `npm run build`
3. Check build output for errors
4. Open dist/index.html in browser
5. Verify visual appearance unchanged
6. Check browser console for CSS errors
7. If issues found, debug with workflow above