const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const esbuild = require('esbuild');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { minify } = require('html-minifier-terser');
const { parseFrontmatter, slugify } = require('./utils');

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

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text) {
  let output = escapeHtml(text);
  output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
  output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  output = output.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>');
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return output;
}

function renderMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const html = [];
  let inCode = false;
  let codeBuffer = [];
  let listBuffer = [];
  let paraBuffer = [];
  let quoteBuffer = [];

  function flushParagraph() {
    if (!paraBuffer.length) return;
    html.push(`<p>${renderInline(paraBuffer.join(' '))}</p>`);
    paraBuffer = [];
  }

  function flushList() {
    if (!listBuffer.length) return;
    const items = listBuffer.map((item) => `<li>${renderInline(item)}</li>`).join('');
    html.push(`<ul>${items}</ul>`);
    listBuffer = [];
  }

  function flushQuote() {
    if (!quoteBuffer.length) return;
    html.push(`<blockquote><p>${renderInline(quoteBuffer.join(' '))}</p></blockquote>`);
    quoteBuffer = [];
  }

  lines.forEach((line) => {
    if (line.trim().startsWith('```')) {
      if (!inCode) {
        flushParagraph();
        flushList();
        flushQuote();
        inCode = true;
        codeBuffer = [];
      } else {
        const codeHtml = escapeHtml(codeBuffer.join('\n'));
        html.push(`<pre><code>${codeHtml}</code></pre>`);
        inCode = false;
        codeBuffer = [];
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(line);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      return;
    }

    const listMatch = line.match(/^\s*[-*+]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      flushQuote();
      listBuffer.push(listMatch[1].trim());
      return;
    }

    const quoteMatch = line.match(/^\s*>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      quoteBuffer.push(quoteMatch[1].trim());
      return;
    }

    paraBuffer.push(line.trim());
  });

  flushParagraph();
  flushList();
  flushQuote();
  if (inCode && codeBuffer.length) {
    const codeHtml = escapeHtml(codeBuffer.join('\n'));
    html.push(`<pre><code>${codeHtml}</code></pre>`);
  }

  return html.join('\n');
}

function buildArticleTemplate({ title, description, slug, bodyHtml }) {
  const pageTitle = `${title} | Mejor Conexion`;
  const canonical = `https://mejorconexion.mx/blog/${slug}.html`;
  return `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}"/>
  <link rel="canonical" href="${canonical}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
  <link rel="preconnect" href="https://app.rybbit.io" crossorigin/>
  <link rel="dns-prefetch" href="https://app.rybbit.io"/>
  <link rel="stylesheet" href="/assets/css/styles.css?v=356105b"/>
  <script
      src="https://app.rybbit.io/api/script.js"
      data-site-id="095d6520421b"
      defer
  ></script>
</head>
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header" data-site-header>
    <div class="container header-inner">
      <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span><span>Mejor Conexion</span></a>
      <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" data-nav-toggle><span aria-hidden="true">+</span></button>
      <nav class="site-nav" aria-label="Menu principal" data-site-nav>
        <ul>
          <li><a href="/internet-en-casa/">Internet en casa</a></li>
          <li><a href="/planes-moviles/">Planes moviles</a></li>
          <li><a href="/esim/">eSIM</a></li>
          <li><a href="/ciudades/">Ciudades</a></li>
          <li><a href="/guias/">Guias</a></li>
          <li><a href="/herramientas/">Herramientas</a></li>
          <li><a href="/acerca/">Acerca de</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main id="contenido" class="content">
    <div class="container">
      <div class="breadcrumbs"><a href="/">Inicio</a> / <a href="/blog/">Blog</a></div>
      <article class="article-body">
        <h1 class="page-title">${escapeHtml(title)}</h1>
        ${bodyHtml}
      </article>
    </div>
  </main>
</body>
</html>`;
}

async function generateBlogHtml() {
  const srcDir = path.join(root, 'content', 'blog');
  const destDir = path.join(dist, 'blog');
  if (!fs.existsSync(srcDir)) {
    return [];
  }
  await fsp.mkdir(destDir, { recursive: true });
  const entries = await fsp.readdir(srcDir, { withFileTypes: true });
  const generated = [];

  for (const entry of entries) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.md') continue;
    const srcPath = path.join(srcDir, entry.name);
    const raw = await fsp.readFile(srcPath, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const title = data.title || entry.name.replace(/\.md$/i, '');
    const description = (data.description || '').slice(0, 160);
    const slug = data.slug ? slugify(data.slug) : slugify(title);
    const bodyHtml = renderMarkdown(body || '');
    const html = buildArticleTemplate({ title, description, slug, bodyHtml });
    const destPath = path.join(destDir, `${slug}.html`);
    await fsp.writeFile(destPath, html, 'utf8');
    generated.push(`/blog/${slug}.html`);
  }
  return generated;
}

async function updateSitemap(blogUrls) {
  if (!blogUrls.length) return;
  const sitemapPath = path.join(dist, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  const xml = await fsp.readFile(sitemapPath, 'utf8');
  const existing = new Set();
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  matches.forEach((match) => {
    const loc = match.replace(/<\/?loc>/g, '');
    existing.add(loc.trim());
  });
  const newEntries = blogUrls
    .map((url) => `https://mejorconexion.mx${url}`)
    .filter((url) => !existing.has(url))
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n');
  if (!newEntries) return;
  const updated = xml.replace(/<\/urlset>\s*$/i, `${newEntries}\n</urlset>`);
  await fsp.writeFile(sitemapPath, updated, 'utf8');
}

async function syncRootSitemap() {
  const distSitemap = path.join(dist, 'sitemap.xml');
  const rootSitemap = path.join(root, 'sitemap.xml');
  if (!fs.existsSync(distSitemap)) return;
  const xml = await fsp.readFile(distSitemap, 'utf8');
  await fsp.writeFile(rootSitemap, xml, 'utf8');
}

async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  const blogUrls = await generateBlogHtml();
  await minifyCss();
  await minifyJs();
  await updateSitemap(blogUrls);
  await minifyHtmlFiles();
  await syncRootSitemap();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
