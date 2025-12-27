const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function writeJson(filePath, data) {
  writeText(filePath, JSON.stringify(data, null, 2));
}

function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

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
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) {
      data[key] = value;
    }
  }
  return { data, body: lines.slice(i).join('\n') };
}

function parseOutlineFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.json') {
    const raw = readJson(filePath);
    return normalizeOutline(raw, filePath);
  }
  const raw = readText(filePath);
  const { data, body } = parseFrontmatter(raw);
  const headings = extractHeadings(body);
  const outline = {
    title: data.title || '',
    target_keyword: data.target_keyword || '',
    audience: data.audience || '',
    intent: data.intent || '',
    pillar_hint: data.pillar_hint || '',
    headings
  };
  return normalizeOutline(outline, filePath);
}

function normalizeOutline(outline, filePath) {
  const result = { ...outline };
  if (!result.headings) {
    result.headings = [];
  }
  if (!result.title) {
    if (result.headings.length) {
      result.title = result.headings[0].text;
    } else {
      result.title = path.basename(filePath, path.extname(filePath));
    }
  }
  if (!result.target_keyword) {
    result.target_keyword = result.title;
  }
  if (!result.audience) {
    result.audience = 'Principiantes en Mexico que quieren mejorar su conexion.';
  }
  if (!result.intent) {
    result.intent = 'Informativa y comparativa.';
  }
  return result;
}

function extractHeadings(body) {
  const lines = body.split(/\r?\n/);
  const headings = [];
  for (const line of lines) {
    const match = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (!match) {
      continue;
    }
    const indent = match[1].length;
    const text = match[2].trim();
    if (!text) {
      continue;
    }
    const level = indent >= 2 ? 3 : 2;
    headings.push({ level, text });
  }
  return headings;
}

function listOutlineFiles(inboxDir) {
  if (!fs.existsSync(inboxDir)) {
    return [];
  }
  return fs.readdirSync(inboxDir)
    .filter((file) => ['.md', '.json'].includes(path.extname(file).toLowerCase()))
    .map((file) => path.join(inboxDir, file))
    .sort();
}

function writeFileSafe(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.bak-${stamp}`;
    fs.copyFileSync(filePath, backupPath);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

function copyFileSafe(sourcePath, destPath) {
  ensureDir(path.dirname(destPath));
  if (fs.existsSync(destPath)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${destPath}.bak-${stamp}`;
    fs.copyFileSync(destPath, backupPath);
  }
  fs.copyFileSync(sourcePath, destPath);
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function tokenSet(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  );
}

function similarityScore(setA, setB) {
  if (!setA.size || !setB.size) {
    return 0;
  }
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) {
      intersection += 1;
    }
  }
  const union = new Set([...setA, ...setB]).size;
  return union ? intersection / union : 0;
}

function getAllMarkdownFiles(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
      files.push(fullPath);
    }
  }
  return files;
}

function loadConfig(configPath) {
  return readJson(configPath);
}

function buildFrontmatter(data) {
  const lines = ['---'];
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((item) => `"${item}"`).join(', ')}]`);
      return;
    }
    lines.push(`${key}: ${String(value)}`);
  });
  lines.push('---');
  return lines.join('\n');
}

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

module.exports = {
  ensureDir,
  readText,
  writeText,
  readJson,
  writeJson,
  slugify,
  parseFrontmatter,
  parseOutlineFile,
  listOutlineFiles,
  writeFileSafe,
  copyFileSafe,
  wordCount,
  tokenSet,
  similarityScore,
  getAllMarkdownFiles,
  loadConfig,
  buildFrontmatter,
  uniqueSlug
};
