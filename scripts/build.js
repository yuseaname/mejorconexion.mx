const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const esbuild = require('esbuild');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { minify } = require('html-minifier-terser');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const IGNORES = new Set([
  '.git',
  '.venv',
  'node_modules',
  'dist',
  'scripts',
]);

async function rimraf(dir) {
  await fsp.rm(dir, { recursive: true, force: true });
}

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORES.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}

async function minifyCss() {
  const srcPath = path.join(root, 'assets', 'css', 'styles.css');
  const outPath = path.join(dist, 'assets', 'css', 'styles.css');
  const css = await fsp.readFile(srcPath, 'utf8');
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, { from: srcPath, to: outPath });
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await fsp.writeFile(outPath, result.css, 'utf8');
}

async function minifyJs() {
  const srcPath = path.join(root, 'assets', 'js', 'main.js');
  const outPath = path.join(dist, 'assets', 'js', 'main.js');
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

async function minifyHtmlFiles() {
  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
      const html = await fsp.readFile(fullPath, 'utf8');
      const minified = await minify(html, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
      });
      await fsp.writeFile(fullPath, minified, 'utf8');
    }
  }

  await walk(dist);
}

async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  await minifyCss();
  await minifyJs();
  await minifyHtmlFiles();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
