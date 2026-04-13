# JavaScript Error Handling Reference

## Contents
- Try-Catch Patterns
- Validation Functions
- Error Reporting
- Graceful Degradation
- Anti-Patterns

## Try-Catch Patterns

### Build Script Error Handling

```javascript
// Entry point - catch all errors
async function build() {
  await rimraf(dist);
  await copyDir(root, dist);
  await minifyCss();
  await minifyJs();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Non-Critical Browser Operations

```javascript
// Acceptable - Feature detection with fallback
try {
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
} catch {
  el.scrollIntoView();
}

// Acceptable - Optional enhancement
try {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
} catch {
  // Ignore if matchMedia not supported
}
```

### JSON Parsing

```javascript
function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath));
  } catch (err) {
    throw new Error(`Invalid JSON in ${filePath}: ${err.message}`);
  }
}
```

## Validation Functions

### Article Validation

```javascript
function validateDraft(draft) {
  const errors = [];
  
  if (!draft.title) {
    errors.push('Missing required field: title');
  }
  if (!draft.description) {
    errors.push('Missing required field: description');
  }
  if (draft.description && draft.description.length > 160) {
    errors.push('Description exceeds 160 characters');
  }
  if (!draft.date) {
    errors.push('Missing required field: date');
  }
  if (!isSpanish(draft.body)) {
    errors.push('Content appears to be non-Spanish');
  }
  
  return { valid: errors.length === 0, errors };
}
```

### Content Quality Checks

```javascript
function validateContent(body) {
  const headings = parseHeadings(body);
  const h1Count = headings.filter((h) => h.level === 1).length;
  const h2Count = headings.filter((h) => h.level === 2).length;
  
  const errors = [];
  
  if (h1Count !== 1) {
    errors.push(`Expected 1 H1, found ${h1Count}`);
  }
  if (h2Count < 5) {
    errors.push(`Expected at least 5 H2 headings, found ${h2Count}`);
  }
  if (!hasSection(body, /tabla de contenidos/)) {
    errors.push('Missing Table of Contents');
  }
  if (!hasSection(body, /preguntas frecuentes|faq/i)) {
    errors.push('Missing FAQ section');
  }
  
  return errors;
}
```

### Slug Validation

```javascript
function ensureUniqueSlug(baseSlug, existing) {
  if (!(existing instanceof Set)) {
    throw new TypeError('existing must be a Set');
  }
  
  let slug = baseSlug;
  let counter = 2;
  
  while (existing.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  
  existing.add(slug);
  return slug;
}
```

## Error Reporting

### Structured Report Object

```javascript
const report = {
  timestamp: new Date().toISOString(),
  live_articles_dir: path.relative(ROOT, liveDir),
  warning: null,
  published_count: 0,
  failed_count: 0,
  results: []
};

drafts.forEach((draftPath) => {
  const result = publishDraft(draftPath);
  
  if (result.ok) {
    report.published_count += 1;
    report.results.push({
      file: path.basename(draftPath),
      status: 'published',
      slug: result.slug
    });
  } else {
    report.failed_count += 1;
    report.results.push({
      file: path.basename(draftPath),
      status: 'failed',
      errors: result.errors
    });
  }
});

writeJson(REPORT_PATH, report);
```

### Error File Output

```javascript
// Save failed drafts with error details
if (!result.ok) {
  const failedPath = path.join(FAILED_DIR, path.basename(draftPath));
  writeFileSafe(failedPath, readText(draftPath));
  writeJson(`${failedPath}.error.json`, { errors: result.errors });
  fs.unlinkSync(draftPath);
}
```

## Graceful Degradation

### Feature Detection

```javascript
// Check for API support before use
const prefersReducedMotion = (() => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
})();

// Use detected preference
el.scrollIntoView({
  behavior: prefersReducedMotion ? 'auto' : 'smooth',
  block: 'start'
});
```

### Null Safety

```javascript
// Safe property access
const adsenseClient = document.querySelector('meta[name="adsense-client"]')
  ?.getAttribute('content');

// Guard before operations
if (adsenseClient && adSlots.length) {
  // Initialize ads
}
```

### Empty Array Protection

```javascript
function updateSitemap(blogUrls) {
  if (!blogUrls.length) return; // Early exit for empty input
  
  const sitemapPath = path.join(dist, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  
  // Process sitemap
}
```

## Anti-Patterns

### WARNING: Catching Without Handling

```javascript
// BAD - Silent failure, impossible to debug
try {
  processArticle(article);
} catch {}

// GOOD - At minimum, log the error
try {
  processArticle(article);
} catch (err) {
  console.error(`Failed to process ${article.slug}:`, err.message);
}
```

### WARNING: Throwing Generic Errors

```javascript
// BAD - No context
throw new Error('Validation failed');

// GOOD - Include what and why
throw new Error(`Validation failed for ${article.slug}: missing required field "title"`);
```

### WARNING: Catching Too Broadly

```javascript
// BAD - Catches even programmer errors
try {
  JSON.parse(data);
} catch (err) {
  // Catches SyntaxError (expected) AND ReferenceError if data is undefined (bug)
}

// GOOD - Check preconditions first
if (typeof data !== 'string') {
  throw new TypeError('data must be a string');
}
try {
  return JSON.parse(data);
} catch (err) {
  throw new Error(`Invalid JSON: ${err.message}`);
}
```

### WARNING: Errors Without Recovery Path

```javascript
// BAD - User can't fix this
if (wordCount < 2000) {
  throw new Error('Word count below 2000');
}

// GOOD - Provide actionable information
if (wordCount < 2000) {
  errors.push(`Word count is ${wordCount}, need at least 2000 more words. Consider adding: practical examples, troubleshooting tips, or FAQ questions.`);
}
```

## Validation Checklist

Copy this checklist for article validation:

- [ ] Word count: 2000+ words
- [ ] H1 headings: exactly 1
- [ ] H2 headings: 5+ sections
- [ ] FAQ section: 5+ questions
- [ ] Internal links: 5+ links
- [ ] Description: ≤160 characters
- [ ] Language: Spanish detected
- [ ] No placeholder text (TODO, TBD, [INSERT])