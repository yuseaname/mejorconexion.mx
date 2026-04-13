# JavaScript Patterns Reference

## Contents
- Async vs Sync File Operations
- Pure Functions
- Event Handling in Browser
- Defensive DOM Manipulation
- Data Transformation Pipelines
- Anti-Patterns

## Async vs Sync File Operations

### When to Use Each

| Context | Use | Reason |
|---------|-----|--------|
| Build scripts | Sync (`fs.readFileSync`) | Simpler, sequential is fine |
| Production server | Async (`fsp.readFile`) | Non-blocking I/O |
| Batch processing | Async with `for...of` | Sequential but non-blocking |

### Async Pattern

```javascript
const fsp = fs.promises;

async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  const blogUrls = await generateBlogHtml();
  await minifyCss();
  await minifyJs();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Sync Pattern (Utilities)

```javascript
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}
```

## Pure Functions

Functions with no side effects, same input = same output.

```javascript
// GOOD - Pure function
function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// GOOD - Pure function with multiple transforms
function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// GOOD - Token set for similarity comparison
function tokenSet(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  );
}
```

## Event Handling in Browser

### IIFE Encapsulation

```javascript
(() => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  
  if (!toggle || !header) return;
  
  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  
  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('nav-open'));
  });
})();
```

### Event Delegation

```javascript
// GOOD - Single listener on parent
nav.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const a = target.closest('a');
  if (!a) return;
  setOpen(false);
});
```

## Defensive DOM Manipulation

Always check types before DOM operations.

```javascript
// GOOD - Type guards before operations
document.querySelectorAll('.brand span:last-child').forEach((node) => {
  if (!(node instanceof HTMLElement)) return;
  node.textContent = 'Mejor Conexión';
});

// GOOD - Safe scroll with fallback
try {
  el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
} catch {
  el.scrollIntoView();
}
```

## Data Transformation Pipelines

### Markdown to HTML

```javascript
function renderMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const html = [];
  let inCode = false;
  let codeBuffer = [];
  let listBuffer = [];
  let paraBuffer = [];

  function flushParagraph() {
    if (!paraBuffer.length) return;
    html.push(`<p>${renderInline(paraBuffer.join(' '))}</p>`);
    paraBuffer = [];
  }

  lines.forEach((line) => {
    if (line.trim().startsWith('```')) {
      // Handle code blocks
    }
    // ... more parsing logic
  });

  return html.join('\n');
}
```

### Frontmatter Parsing

```javascript
function parseFrontmatter(text) {
  if (!text.startsWith('---')) {
    return { data: {}, body: text };
  }
  const lines = text.split(/\r?\n/);
  let i = 1;
  const data = {};
  for (; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === '---') {
      i += 1;
      break;
    }
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  }
  return { data, body: lines.slice(i).join('\n') };
}
```

## Anti-Patterns

### WARNING: Synchronous I/O in Async Context

```javascript
// BAD - Blocks event loop in server context
async function handler(req, res) {
  const data = fs.readFileSync('./data.json'); // Blocks!
  res.json(JSON.parse(data));
}

// GOOD - Non-blocking
async function handler(req, res) {
  const data = await fsp.readFile('./data.json', 'utf8');
  res.json(JSON.parse(data));
}
```

### WARNING: Mutation of Function Arguments

```javascript
// BAD - Mutates input
function processArticle(article) {
  article.slug = slugify(article.title);
  return article;
}

// GOOD - Returns new object
function processArticle(article) {
  return { ...article, slug: slugify(article.title) };
}
```

### WARNING: Deep Nesting Without Early Returns

```javascript
// BAD - Nested conditionals
function validate(draft) {
  if (draft.title) {
    if (draft.body) {
      if (draft.date) {
        return true;
      }
    }
  }
  return false;
}

// GOOD - Guard clauses
function validate(draft) {
  if (!draft.title) return false;
  if (!draft.body) return false;
  if (!draft.date) return false;
  return true;
}
```

### WARNING: Silent Error Swallowing

```javascript
// BAD - Silent failure
try {
  JSON.parse(data);
} catch {}

// GOOD - Log or handle explicitly
try {
  return JSON.parse(data);
} catch (err) {
  console.error(`Failed to parse JSON: ${err.message}`);
  return null;
}

// ACCEPTABLE - Non-critical browser operations
try {
  el.scrollIntoView({ behavior: 'smooth' });
} catch {
  el.scrollIntoView(); // Fallback for older browsers
}
```