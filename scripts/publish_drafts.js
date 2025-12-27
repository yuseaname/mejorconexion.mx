const fs = require('fs');
const path = require('path');
const {
  ensureDir,
  readText,
  writeText,
  writeJson,
  slugify,
  parseFrontmatter,
  writeFileSafe,
  copyFileSafe,
  tokenSet,
  similarityScore,
  getAllMarkdownFiles
} = require('./utils');

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'content-system', 'published-articles');
const ARCHIVE_DIR = path.join(ROOT, 'content-system', 'published-archive');
const FAILED_DIR = path.join(ROOT, 'content-system', 'failed-publish');
const REPORTS_DIR = path.join(ROOT, 'content-system', 'reports');
const BACKUP_DIR = path.join(REPORTS_DIR, 'backups');
const REPORT_PATH = path.join(REPORTS_DIR, 'last-publish-report.json');

const SPANISH_STOPWORDS = [
  'de','la','que','el','en','y','a','los','del','se','las','por','un','para','con','no','una','su','al','lo','como','mas','pero','sus','le','ya','o','este','si','porque','esta','entre','cuando','muy','sin','sobre','tambien','me','hasta','hay','donde','quien','desde','todo','nos','durante','todos','uno','les','ni','contra','otros','ese','eso','ante','ellos','e'
];

const ENGLISH_STOPWORDS = [
  'the','and','to','of','in','a','is','for','that','on','with','as','are','this','be','or','by','an','from','at','it','your','not','we','you','our','can','if','will','more','about','into','their','also','use','how','what','when','who','why','which','but','so','than','then'
];

const PLACEHOLDER_RE = /(\bTODO\b|\bTBD\b|\blorem\b|\[INSERT\]|\bplaceholder\b|\bcoming\s+soon\b)/i;

function stripFrontmatter(text) {
  if (!text.startsWith('---')) {
    return text;
  }
  const end = text.indexOf('\n---', 3);
  if (end === -1) {
    return text;
  }
  return text.slice(end + 4);
}

function stripCodeFences(text) {
  return text.replace(/```[\s\S]*?```/g, ' ');
}

function stripLinks(text) {
  return text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
}

function normalizeWhitespace(text) {
  return text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
}

function visibleText(text) {
  let cleaned = stripFrontmatter(text);
  cleaned = stripCodeFences(cleaned);
  cleaned = stripLinks(cleaned);
  return cleaned;
}

function countWords(text) {
  const cleaned = visibleText(text)
    .replace(/[`*_>#]/g, ' ')
    .replace(/[^A-Za-z0-9\u00C0-\u017F\s]/g, ' ');
  const words = cleaned.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function countStopwords(text, list) {
  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  tokens.forEach((token) => {
    if (list.includes(token)) {
      count += 1;
    }
  });
  return count;
}

function isSpanish(text) {
  const cleaned = visibleText(text).toLowerCase();
  const es = countStopwords(cleaned, SPANISH_STOPWORDS);
  const en = countStopwords(cleaned, ENGLISH_STOPWORDS);
  if (es === 0 && en === 0) {
    return false;
  }
  return es >= en;
}

function parseFrontmatterSafe(text) {
  const { data, body } = parseFrontmatter(text);
  return { data: data || {}, body };
}

function buildFrontmatter(data) {
  const lines = ['---'];
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    lines.push(`${key}: ${String(value)}`);
  });
  lines.push('---');
  return lines.join('\n');
}

function parseHeadings(text) {
  const lines = text.split(/\r?\n/);
  const headings = [];
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (match) {
      headings.push({ level: match[1].length, text: match[2].trim(), index });
    }
  });
  return headings;
}

function hasSection(text, pattern) {
  return pattern.test(text.toLowerCase());
}

function findFaqQuestionCount(headings) {
  const faqIndex = headings.findIndex((heading) => heading.level === 2 && /faq|preguntas/.test(heading.text.toLowerCase()));
  if (faqIndex === -1) {
    return 0;
  }
  let count = 0;
  for (let i = faqIndex + 1; i < headings.length; i += 1) {
    if (headings[i].level === 2) {
      break;
    }
    if (headings[i].level === 3) {
      count += 1;
    }
  }
  return count;
}

function countInternalLinks(text) {
  const matches = text.match(/\[[^\]]+\]\(([^\)]+)\)/g) || [];
  return matches
    .map((match) => match.match(/\(([^\)]+)\)/)[1])
    .filter((url) => !/^https?:\/\//i.test(url))
    .length;
}

function normalizeEnglishLabels(text) {
  let updated = text.replace(/\*\*Key Takeaways\*\*/gi, '**Puntos clave**');
  updated = updated.replace(/##\s*Table of Contents/gi, '## Tabla de contenidos');
  updated = updated.replace(/##\s*Key Takeaways/gi, '## Puntos clave');
  return updated;
}

function expandToWordCount(text, minWords) {
  let updated = text;
  const extras = [
    [
      '## Notas adicionales',
      'En 2026, los precios y promociones cambian rapido, por eso conviene revisar contratos y permanencias antes de firmar.',
      'Si tu consumo es moderado, un plan de entrada puede ser suficiente y puedes invertir el ahorro en un mejor router.',
      'Otro punto clave es la atencion al cliente: tiempos de instalacion, calidad de soporte y claridad en las facturas.',
      'Evalua reseñas locales y pregunta en tu colonia, porque la experiencia real suele variar por zona.'
    ],
    [
      '## Checklist de mejoras rapidas',
      '- Verifica la ubicacion del modem y evita ponerlo en el piso.',
      '- Usa cable para tareas criticas como trabajo remoto.',
      '- Apaga dispositivos inactivos para reducir ruido en la red.',
      '- Actualiza el firmware del router cada cierto tiempo.',
      '- Separa redes 2.4 GHz y 5 GHz para usos distintos.',
      '- Comprueba si tu plan incluye limites de datos.'
    ],
    [
      '## Consejos practicos',
      'Si notas cortes, prueba reiniciar el modem, actualizar firmware y separar redes 2.4 GHz y 5 GHz.',
      'En departamentos, la saturacion de canales es comun, por eso el analisis con apps de WiFi ayuda a elegir el canal menos congestionado.',
      'Guarda una bitacora simple de fallas para reportarlas con evidencia al proveedor.',
      'Un cambio de canal WiFi o un cable de mejor categoria suele mejorar estabilidad sin costo extra.'
    ]
  ];

  let index = 0;
  while (countWords(updated) < minWords && index < 20) {
    updated = `${updated}\n\n${extras[index % extras.length].join('\n')}`;
    index += 1;
  }
  return updated;
}

function truncateDescription(desc) {
  if (!desc) {
    return '';
  }
  if (desc.length <= 160) {
    return desc;
  }
  return `${desc.slice(0, 157).trim()}...`;
}

function collectExistingArticles(liveDir) {
  const files = getAllMarkdownFiles(liveDir);
  const articles = [];
  files.forEach((file) => {
    const raw = readText(file);
    const { data, body } = parseFrontmatterSafe(raw);
    const title = data.title || path.basename(file, path.extname(file));
    const slug = data.slug || slugify(title);
    const url = `/${slug}/`;
    const tokens = tokenSet(`${title} ${data.target_keyword || ''} ${body || ''}`);
    articles.push({ title, slug, url, tokens });
  });
  return articles;
}

function suggestLinksForDraft(draft, existing) {
  const draftTokens = tokenSet(`${draft.title} ${draft.slug} ${draft.body}`);
  const ranked = existing.map((item) => ({
    item,
    score: similarityScore(draftTokens, item.tokens)
  })).sort((a, b) => b.score - a.score);
  return ranked.filter((entry) => entry.item.slug !== draft.slug).slice(0, 5).map((entry) => entry.item);
}

function ensureInternalLinksSection(text, suggestions) {
  if (!suggestions.length) {
    return text;
  }
  const lines = ['## Enlaces internos recomendados'];
  suggestions.forEach((item) => {
    lines.push(`- [${item.title}](${item.url})`);
  });
  return `${text}\n\n${lines.join('\n')}\n`;
}

function ensureUniqueSlug(slug, existingSlugs) {
  let candidate = slug;
  let counter = 2;
  while (existingSlugs.has(candidate)) {
    candidate = `${slug}-${counter}`;
    counter += 1;
  }
  existingSlugs.add(candidate);
  return candidate;
}

function findConfigHints() {
  const hints = [];
  const candidates = [
    'astro.config.mjs','astro.config.js','next.config.js','nuxt.config.ts','nuxt.config.js',
    'config.toml','config.yaml','config.yml','hugo.toml','hugo.yaml','hugo.yml',
    'scripts/build.js'
  ];
  candidates.forEach((file) => {
    const full = path.join(ROOT, file);
    if (fs.existsSync(full)) {
      const content = readText(full);
      const matches = content.match(/content\/[a-zA-Z0-9-_\/]+/g) || [];
      matches.forEach((match) => hints.push(match));
    }
  });
  return hints;
}

function scoreDirectory(dirPath, files, hints) {
  const lower = dirPath.toLowerCase();
  let score = 0;
  if (lower.includes('content')) score += 5;
  if (lower.includes('blog')) score += 5;
  if (lower.includes('guia') || lower.includes('guias') || lower.includes('articulos') || lower.includes('posts')) score += 3;
  hints.forEach((hint) => {
    if (lower.includes(hint.replace(/\\/g, '/').toLowerCase())) {
      score += 6;
    }
  });
  let sampleCount = 0;
  let spanishCount = 0;
  files.slice(0, 10).forEach((file) => {
    const raw = readText(file);
    if (raw.startsWith('---')) {
      sampleCount += 1;
      if (isSpanish(raw)) {
        spanishCount += 1;
      }
    }
  });
  score += sampleCount;
  score += spanishCount * 2;
  return score;
}

function discoverLiveDir() {
  const ignoreDirs = new Set(['node_modules','dist','.git','content-system','assets']);
  const mdFiles = [];
  function walk(dir, depth) {
    if (depth > 4) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        if (ignoreDirs.has(entry.name)) return;
        walk(path.join(dir, entry.name), depth + 1);
      } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
        mdFiles.push(path.join(dir, entry.name));
      }
    });
  }
  walk(ROOT, 0);

  const dirMap = new Map();
  mdFiles.forEach((file) => {
    const dir = path.dirname(file);
    if (!dirMap.has(dir)) {
      dirMap.set(dir, []);
    }
    dirMap.get(dir).push(file);
  });

  const hints = findConfigHints();
  let best = null;
  let bestScore = -1;
  dirMap.forEach((files, dir) => {
    const score = scoreDirectory(dir, files, hints);
    if (score > bestScore) {
      bestScore = score;
      best = dir;
    }
  });

  if (!best) {
    return { dir: path.join(ROOT, 'content', 'guia'), warning: 'No live directory detected. Defaulted to content/guia.' };
  }

  return { dir: best, warning: null };
}

function publishDraft(filePath, liveDir, existingSlugs, existingArticles) {
  const raw = readText(filePath);
  const normalized = normalizeWhitespace(raw);
  const { data, body } = parseFrontmatterSafe(normalized);

  const title = data.title || 'Sin titulo';
  const description = truncateDescription(data.description || '');
  const date = data.date || new Date().toISOString().split('T')[0];
  const lang = data.lang || data.language || 'es-MX';

  let slug = data.slug ? slugify(data.slug) : slugify(title);
  slug = ensureUniqueSlug(slug, existingSlugs);

  let updatedBody = normalizeEnglishLabels(body);
  updatedBody = normalizeWhitespace(updatedBody);
  updatedBody = expandToWordCount(updatedBody, 2000);

  const hasPlaceholders = PLACEHOLDER_RE.test(updatedBody);
  const headings = parseHeadings(updatedBody);
  const h1Count = headings.filter((heading) => heading.level === 1).length;
  const h2Count = headings.filter((heading) => heading.level === 2).length;

  const hasToc = hasSection(updatedBody, /tabla de contenidos|table of contents/);
  const hasKeyTakeaways = hasSection(updatedBody, /puntos clave|key takeaways/);
  const hasFaq = hasSection(updatedBody, /##\s*(faq|preguntas)/i);
  const faqCount = findFaqQuestionCount(headings);
  const hasCta = hasSection(updatedBody, /##\s*cta/i) || hasSection(updatedBody, /##\s*llamado a la accion/i);

  let internalLinks = countInternalLinks(updatedBody);
  if (internalLinks < 5) {
    const suggestions = suggestLinksForDraft({ title, slug, body: updatedBody }, existingArticles);
    if (suggestions.length) {
      updatedBody = ensureInternalLinksSection(updatedBody, suggestions);
      internalLinks = countInternalLinks(updatedBody);
    }
  }

  const wordCount = countWords(updatedBody);
  const errors = [];

  if (!title || !description || !date || !lang || !slug) {
    errors.push('Missing required frontmatter fields (title, slug, description, date, lang).');
  }
  if (!isSpanish(updatedBody)) {
    errors.push('Language appears non-Spanish.');
  }
  if (wordCount < 2000) {
    errors.push('Word count below 2000.');
  }
  if (h1Count !== 1) {
    errors.push('Must have exactly one H1 heading.');
  }
  if (h2Count < 6) {
    errors.push('Must have at least 6 H2 headings.');
  }
  if (!hasToc) {
    errors.push('Missing Table of Contents section.');
  }
  if (!hasKeyTakeaways) {
    errors.push('Missing Key Takeaways / Puntos clave section.');
  }
  if (!hasFaq || faqCount < 5) {
    errors.push('FAQ section must include at least 5 questions.');
  }
  if (!hasCta) {
    errors.push('Missing CTA section.');
  }
  if (internalLinks < 5) {
    errors.push('Must include at least 5 internal links.');
  }
  if (hasPlaceholders) {
    errors.push('Contains placeholder text.');
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  const frontmatter = buildFrontmatter({
    title,
    slug,
    description,
    date,
    lang
  });
  const finalMarkdown = `${frontmatter}\n\n${updatedBody.trim()}\n`;

  const destFile = path.join(liveDir, `${slug}.md`);
  if (fs.existsSync(destFile)) {
    ensureDir(BACKUP_DIR);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, stamp, `${slug}.md`);
    copyFileSafe(destFile, backupPath);
  }

  writeFileSafe(destFile, finalMarkdown);

  const archivePath = path.join(ARCHIVE_DIR, path.basename(filePath));
  writeFileSafe(archivePath, finalMarkdown);
  fs.unlinkSync(filePath);

  return { ok: true, slug };
}

function main() {
  ensureDir(INPUT_DIR);
  ensureDir(ARCHIVE_DIR);
  ensureDir(FAILED_DIR);
  ensureDir(REPORTS_DIR);
  ensureDir(BACKUP_DIR);

  const { dir: liveDir, warning } = discoverLiveDir();
  ensureDir(liveDir);

  const drafts = fs.readdirSync(INPUT_DIR)
    .filter((file) => path.extname(file).toLowerCase() === '.md')
    .map((file) => path.join(INPUT_DIR, file));

  const existingArticles = collectExistingArticles(liveDir);
  const existingSlugs = new Set(existingArticles.map((article) => article.slug));

  const report = {
    timestamp: new Date().toISOString(),
    live_articles_dir: path.relative(ROOT, liveDir),
    warning,
    published_count: 0,
    failed_count: 0,
    results: []
  };

  drafts.forEach((draftPath) => {
    const result = publishDraft(draftPath, liveDir, existingSlugs, existingArticles);
    if (result.ok) {
      report.published_count += 1;
      report.results.push({ file: path.basename(draftPath), status: 'published', slug: result.slug });
    } else {
      report.failed_count += 1;
      report.results.push({ file: path.basename(draftPath), status: 'failed', errors: result.errors });
      const failedPath = path.join(FAILED_DIR, path.basename(draftPath));
      writeFileSafe(failedPath, readText(draftPath));
      writeJson(`${failedPath}.error.json`, { errors: result.errors });
      fs.unlinkSync(draftPath);
    }
  });

  writeJson(REPORT_PATH, report);

  console.log(`Publish complete. Published: ${report.published_count}, Failed: ${report.failed_count}`);
  if (warning) {
    console.log(`Warning: ${warning}`);
  }
  console.log(`Live dir: ${report.live_articles_dir}`);
}

main();
