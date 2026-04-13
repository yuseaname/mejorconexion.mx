# JavaScript Types Reference

## Contents
- No TypeScript - JSDoc for Type Hints
- Data Structures
- Frontmatter Data
- Configuration Objects
- Type Guards

## No TypeScript - JSDoc for Type Hints

This project uses vanilla JavaScript. Use JSDoc comments for complex function signatures.

```javascript
/**
 * @param {string} text - Raw markdown with frontmatter
 * @returns {{data: Object<string, string>, body: string}}
 */
function parseFrontmatter(text) {
  // ...
}

/**
 * @param {Object} article
 * @param {string} article.title
 * @param {string} article.slug
 * @param {string} [article.target_keyword]
 * @param {string} [article.summary]
 * @returns {{keywordSet: Set<string>}}
 */
function buildLinkGraph(article) {
  // ...
}
```

## Data Structures

### Article Metadata

```javascript
const article = {
  title: 'Como mejorar el wifi en casa',
  slug: 'como-mejorar-el-wifi-en-casa',
  description: 'Guía completa para mejorar tu señal WiFi...',
  date: '2026-03-20',
  lang: 'es-MX',
  pillar: 'internet-en-casa',
  target_keyword: 'mejorar wifi en casa'
};
```

### Outline Structure

```javascript
const outline = {
  title: 'Article Title',
  target_keyword: 'keyword phrase',
  audience: 'Principiantes en Mexico',
  intent: 'Informativa y comparativa',
  pillar_hint: 'internet-en-casa',
  headings: [
    { level: 2, text: 'Introduction' },
    { level: 3, text: 'Subsection' }
  ]
};
```

### Heading Object

```javascript
const heading = {
  level: 2,      // 1-6 for h1-h6
  text: 'Section Title',
  index: 5       // Line index in source
};
```

### Link Graph Node

```javascript
const graphNode = {
  title: 'Article Title',
  slug: 'article-slug',
  pillar: 'internet-en-casa',
  keywordSet: new Set(['wifi', 'router', 'velocidad'])
};
```

## Frontmatter Data

### Article Frontmatter Schema

```javascript
// Required fields
const frontmatter = {
  title: String,        // Article title (required)
  slug: String,         // URL slug (required)
  description: String,  // Meta description, max 160 chars (required)
  date: String,         // ISO date: '2026-03-20' (required)
  lang: String,         // Language code: 'es-MX' (required)
  pillar: String,       // Topic pillar: 'internet-en-casa'
  target_keyword: String  // SEO keyword
};
```

### Building Frontmatter String

```javascript
function buildFrontmatter(data) {
  const lines = ['---'];
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((item) => `"${item}"`).join(', ')}]`);
      return;
    }
    lines.push(`${key}: ${String(value)}`);
  });
  lines.push('---');
  return lines.join('\n');
}
```

## Configuration Objects

### Build Configuration

```javascript
const buildConfig = {
  entryPoints: ['assets/js/main.js'],
  outfile: 'dist/assets/js/main.js',
  bundle: false,
  minify: true,
  platform: 'browser',
  target: ['es2017']
};
```

### Validation Options

```javascript
const validationOptions = {
  minWords: 2000,
  minH2Count: 6,
  minFaqCount: 5,
  minInternalLinks: 5,
  maxDescriptionLength: 160
};
```

## Type Guards

### DOM Type Guards

```javascript
// Check before using DOM-specific properties
if (node instanceof HTMLElement) {
  node.textContent = 'New text';
}

if (target instanceof Element) {
  const a = target.closest('a');
}

if (target instanceof Node) {
  header.contains(target);
}
```

### Runtime Type Checking

```javascript
function ensureUniqueSlug(slug, existingSlugs) {
  // existingSlugs must be a Set
  if (!(existingSlugs instanceof Set)) {
    throw new TypeError('existingSlugs must be a Set');
  }
  
  let candidate = slug;
  let counter = 2;
  while (existingSlugs.has(candidate)) {
    candidate = `${slug}-${counter}`;
    counter += 1;
  }
  existingSlugs.add(candidate);
  return candidate;
}
```

### Optional Parameters

```javascript
// Use default values for optional parameters
function suggestInternalLinks(article, graph, options = {}) {
  const maxSiblings = options.maxSiblings || 4;
  const maxCross = options.maxCross || 3;
  // ...
}

// Or destructuring with defaults
function rankBySimilarity(source, candidates, { maxResults = 10 } = {}) {
  // ...
}
```

## Set Operations

```javascript
// Token set for text similarity
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

## Anti-Patterns

### WARNING: Stringly-Typed Data

```javascript
// BAD - Using strings for structured data
const article = {
  level: 'h2',
  status: 'draft'
};

// GOOD - Use constants or enums
const HEADING_LEVELS = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };
const ARTICLE_STATUS = { DRAFT: 'draft', PUBLISHED: 'published', ARCHIVED: 'archived' };
```

### WARNING: Implicit Type Coercion

```javascript
// BAD - Implicit coercion
const count = formData.querySelector('[name="count"]')?.value;
const total = count * 2; // "5" * 2 = 10, but "" * 2 = 0

// GOOD - Explicit conversion
const count = Number(formData.querySelector('[name="count"]')?.value || 0);
const total = count * 2;
```