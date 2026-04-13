# Esbuild Workflows Reference

## Contents
- Adding a New JavaScript File
- Debugging Minification Issues
- Updating Target Browser Support
- Switching to Bundle Mode
- Performance Optimization

## Adding a New JavaScript File

When adding a new JavaScript file that needs minification:

1. Create the source file in `assets/js/`

2. Add minification function in `scripts/build.js`:

```javascript
async function minifyNewScript() {
  const srcPath = path.join(root, 'assets', 'js', 'new-script.js');
  const outPath = path.join(dist, 'assets', 'js', 'new-script.js');
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

3. Call it in the `build()` function:

```javascript
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  const blogUrls = await generateBlogHtml();
  await minifyCss();
  await minifyJs();
  await minifyNewScript();  // Add here
  await updateSitemap(blogUrls);
  await minifyHtmlFiles();
  await syncRootSitemap();
}
```

4. Run build to verify:

```bash
npm run build
```

## Debugging Minification Issues

Copy this checklist when debugging:

- [ ] Verify source file exists at `assets/js/`
- [ ] Check output directory exists: `dist/assets/js/`
- [ ] Run build with verbose error output
- [ ] Test source file syntax with Node.js directly
- [ ] Check for ES2017+ incompatible syntax

### Common Error: Syntax Error in Source

```bash
# Error message
✘ [ERROR] Unexpected ")"
```

**Diagnosis:** Source file has invalid JavaScript syntax.

**Fix:** Run source file through Node.js to find the exact line:

```bash
node --check assets/js/main.js
```

### Common Error: Cannot Find Module

```bash
# Error message
✘ [ERROR] Could not resolve "some-module"
```

**Diagnosis:** `bundle: true` is set but module isn't installed.

**Fix:** Either install the module or set `bundle: false` if not needed.

### Feedback Loop Pattern

1. Make changes to source file
2. Validate: `npm run build`
3. If build fails, check error message for line/column
4. Fix syntax issue
5. Repeat step 2
6. Only proceed when `npm run build` exits with code 0

## Updating Target Browser Support

When browser support requirements change:

1. Edit `scripts/build.js`

2. Update the `target` array:

```javascript
// From ES2017 (current)
target: ['es2017']

// To ES2020 (optional chaining, nullish coalescing)
target: ['es2020']

// To specific browsers
target: ['chrome80', 'firefox78', 'safari14']
```

3. Verify build succeeds:

```bash
npm run build
```

4. Test in target browsers

### WARNING: Target Higher Than Source Syntax

**The Problem:**

```javascript
// Source uses ES2017 async/await
async function fetch() { ... }

// But target is ES5
target: ['es5']  // esbuild won't transpile async/await
```

**Why This Breaks:**
1. Esbuild does NOT transpile syntax down
2. Async/await in ES5 target causes syntax errors
3. Older browsers throw on unrecognized keywords

**The Fix:**

```javascript
// Match target to your source syntax
// If using async/await (ES2017):
target: ['es2017']

// Or avoid modern syntax in source:
function fetch() {
  return Promise.resolve(...)
}
```

## Switching to Bundle Mode

If you need to bundle imports (rare for this project):

1. Install dependencies:

```bash
npm install some-library
```

2. Update build configuration:

```javascript
async function minifyJs() {
  const srcPath = path.join(root, 'assets', 'js', 'main.js');
  const outPath = path.join(dist, 'assets', 'js', 'main.js');
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await esbuild.build({
    entryPoints: [srcPath],
    outfile: outPath,
    bundle: true,   // Changed to true
    minify: true,
    platform: 'browser',
    target: ['es2017'],
    // External dependencies you don't want bundled
    external: ['*.woff2', '*.png'],
  });
}
```

3. Verify bundle size is acceptable:

```bash
ls -la dist/assets/js/main.js
```

## Performance Optimization

### Parallel Minification

Process multiple files concurrently:

```javascript
async function minifyAllJs() {
  const files = ['main.js', 'tools.js', 'calculator.js'];
  await fsp.mkdir(path.join(dist, 'assets', 'js'), { recursive: true });
  
  await Promise.all(files.map((file) =>
    esbuild.build({
      entryPoints: [path.join(root, 'assets', 'js', file)],
      outfile: path.join(dist, 'assets', 'js', file),
      bundle: false,
      minify: true,
      platform: 'browser',
      target: ['es2017'],
    })
  ));
}
```

### Incremental Builds (Development)

For watch mode during development:

```javascript
async function createBuildContext() {
  const ctx = await esbuild.context({
    entryPoints: ['assets/js/main.js'],
    outfile: 'dist/assets/js/main.js',
    bundle: false,
    minify: false,  // Skip minification in dev
    platform: 'browser',
    target: ['es2017'],
  });
  
  await ctx.watch();  // Rebuild on file changes
  return ctx;
}
```

Note: This project uses simple `npx serve .` for development without build steps. Incremental builds are only useful if adding a watch mode to `scripts/build.js`.