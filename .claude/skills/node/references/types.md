# Node.js Types Reference

Data structures and type patterns used in this codebase.

## Contents
- Frontmatter Parsing
- Article Data Structures
- Configuration Types
- Validation Results
- Link Graph Types

## Frontmatter Parsing

### Parsed Frontmatter Structure

```javascript
// Result of parseFrontmatter(text)
const result = {
  data: {
    title: 'Article Title',
    slug: 'article-slug',
    description: 'Meta description',
    date: '2026-03-20',
    lang: 'es-MX',
    pillar: 'internet-en-casa',
    target_keyword: 'keyword phrase'
  },
  body: '# H1 Heading\n\nArticle content...'
};
```

### Frontmatter Parser

```javascript
// GOOD - Simple YAML-like parser
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
    if (key) {
      data[key] = value;
    }
  }
  return { data, body: lines.slice(i).join('\n') };
}
```

### Frontmatter Builder

```javascript
// GOOD - Reconstruct frontmatter for output
function buildFrontmatter(data) {
  const lines = ['---'];
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(item => `"${item}"`).join(', ')}]`);
      return;
    }
    lines.push(`${key}: ${String(value)}`);
  });
  lines.push('---');
  return lines.join('\n');
}
```

## Article Data Structures

### Outline Structure

```javascript
// Input outline for article generation
const outline = {
  title: 'Como mejorar el wifi en casa',
  target_keyword: 'mejorar wifi en casa',
  audience: 'Principiantes en Mexico',
  intent: 'Informativa y comparativa',
  pillar_hint: 'internet-en-casa',
  headings: [
    { level: 2, text: 'Panorama 2026 del wifi en casa' },
    { level: 2, text: 'Factores que afectan la senal' },
    { level: 3, text: 'Distancia y paredes' }
  ]
};
```

### Heading Extraction

```javascript
// GOOD - Extract headings from markdown list
function extractHeadings(body) {
  const lines = body.split(/\r?\n/);
  const headings = [];
  for (const line of lines) {
    const match = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (!match) continue;
    const indent = match[1].length;
    const text = match[2].trim();
    if (!text) continue;
    const level = indent >= 2 ? 3 : 2;
    headings.push({ level, text });
  }
  return headings;
}
```

### Parsed Heading Structure

```javascript
// Headings from markdown content
function parseHeadings(text) {
  const lines = text.split(/\r?\n/);
  const headings = [];
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (match) {
      headings.push({ 
        level: match[1].length, 
        text: match[2].trim(), 
        index 
      });
    }
  });
  return headings;
}
```

## Configuration Types

### Content System Config

```javascript
// config/content-system.config.json
const config = {
  site: {
    name: 'Mejor Conexion',
    url: 'https://mejorconexion.mx',
    lang: 'es-MX'
  },
  content: {
    minWordCount: 2000,
    minH2Count: 5,
    minFaqCount: 5,
    minInternalLinks: 5
  },
  pillars: [
    { slug: 'internet-en-casa', keywords: ['wifi', 'router', 'fibra'] },
    { slug: 'planes-moviles', keywords: ['plan movil', 'datos', 'prepago'] },
    { slug: 'esim', keywords: ['esim', 'sim digital', 'qr esim'] }
  ]
};
```

## Validation Results

### Publish Validation Result

```javascript
// Result of article validation
const result = {
  ok: true,  // or false
  slug: 'article-slug',  // only if ok: true
  errors: [  // only if ok: false
    'Word count below 2000.',
    'Missing FAQ section.'
  ]
};
```

### Validation Error Collection

```javascript
// GOOD - Comprehensive validation
function validateArticle(data, body) {
  const errors = [];
  
  // Required frontmatter
  if (!data.title || !data.description || !data.date || !data.lang || !data.slug) {
    errors.push('Missing required frontmatter fields (title, slug, description, date, lang).');
  }
  
  // Content requirements
  if (!isSpanish(body)) {
    errors.push('Language appears non-Spanish.');
  }
  if (countWords(body) < 2000) {
    errors.push('Word count below 2000.');
  }
  
  return { ok: errors.length === 0, errors };
}
```

## Link Graph Types

### Article Entry for Linking

```javascript
// Article entry in link graph
const article = {
  title: 'Como mejorar el wifi',
  slug: 'como-mejorar-wifi',
  url: '/como-mejorar-wifi/',
  pillar: 'internet-en-casa',
  keywordSet: new Set(['wifi', 'mejorar', 'conexion', 'router'])
};
```

### Token Set for Similarity

```javascript
// GOOD - Create comparable token set
function tokenSet(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  );
}

// Calculate Jaccard similarity
function similarityScore(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection += 1;
  }
  const union = new Set([...setA, ...setB]).size;
  return union ? intersection / union : 0;
}
```

## Slug Generation

### Unique Slug Generation

```javascript
// GOOD - Ensure unique slugs
function uniqueSlug(baseSlug, existing) {
  let slug = baseSlug;
  let counter = 2;
  while (existing.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  existing.add(slug);
  return slug;
}

// Usage
const existingSlugs = new Set(['mi-articulo', 'mi-articulo-2']);
const slug = uniqueSlug('mi-articulo', existingSlugs);
// Returns: 'mi-articulo-3'
```

### Slugify Function

```javascript
// GOOD - Spanish-aware slug generation
function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')     // Remove special chars
    .trim()
    .replace(/\s+/g, '-')             // Spaces to hyphens
    .replace(/-+/g, '-');             // Collapse multiple hyphens
}

// 'Cómo mejorar el WiFi' → 'como-mejorar-el-wifi'
```