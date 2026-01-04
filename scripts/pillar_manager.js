const path = require('path');
const { buildFrontmatter, writeFileSafe, slugify } = require('./utils');

function buildPillarContent(pillar, articles, config) {
  const now = new Date().toISOString().split('T')[0];
  const frontmatter = buildFrontmatter({
    title: pillar.title,
    slug: pillar.slug,
    description: pillar.description || `Pilar sobre ${pillar.title}.`,
    updated: now,
    type: 'pillar'
  });

  const articleLines = articles.map((article) => `- [${article.title}](${article.url})`);
  const body = [
    `# ${pillar.title}`,
    '',
    '## Resumen',
    `Este pilar agrupa guias y comparativas sobre ${pillar.title} para Mexico en 2026.`,
    '',
    '## A quien ayuda',
    'Personas que buscan mejorar su conexion, comparar opciones y entender la cobertura.',
    '',
    '## Articulos',
    articleLines.length ? articleLines.join('\n') : '- (Aun no hay articulos en este pilar)'
  ].join('\n');

  return `${frontmatter}\n\n${body}\n`;
}

function ensurePillar(pillar, articles, pillarDir, config) {
  const filePath = path.join(pillarDir, `${pillar.slug}.md`);
  const content = buildPillarContent(pillar, articles, config);
  writeFileSafe(filePath, content);
  return filePath;
}

function classifyPillar(outline, config) {
  if (outline.pillar_hint) {
    return slugify(outline.pillar_hint);
  }
  const text = `${outline.title} ${outline.target_keyword} ${outline.headings.map((h) => h.text).join(' ')}`.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  for (const pillar of config.pillars || []) {
    let score = 0;
    for (const keyword of pillar.keywords || []) {
      if (text.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pillar;
    }
  }
  if (bestMatch) {
    return bestMatch.slug;
  }
  return slugify(outline.target_keyword || outline.title);
}

function getPillarTitle(pillarSlug, config) {
  const match = (config.pillars || []).find((pillar) => pillar.slug === pillarSlug);
  if (match) {
    return match.title;
  }
  return pillarSlug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

module.exports = {
  ensurePillar,
  classifyPillar,
  getPillarTitle
};
