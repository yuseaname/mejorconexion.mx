const fs = require('fs');
const path = require('path');
const https = require('https');
const {
  ensureDir,
  readText,
  readJson,
  writeJson,
  slugify,
  parseOutlineFile,
  listOutlineFiles,
  writeFileSafe,
  copyFileSafe,
  wordCount,
  tokenSet,
  getAllMarkdownFiles,
  loadConfig,
  buildFrontmatter,
  uniqueSlug
} = require('./utils');
const { buildLinkGraph, suggestInternalLinks } = require('./link_graph');
const { ensurePillar, classifyPillar, getPillarTitle } = require('./pillar_manager');

const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, 'config', 'content-system.config.json');

function loadArticlesFromMarkdown(dirs, urlPattern) {
  const articles = [];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      return;
    }
    const files = getAllMarkdownFiles(dir);
    files.forEach((file) => {
      const raw = readText(file);
      if (!raw.startsWith('---')) {
        return;
      }
      const endIndex = raw.indexOf('---', 3);
      if (endIndex === -1) {
        return;
      }
      const frontmatter = raw.slice(0, endIndex + 3);
      const body = raw.slice(endIndex + 3);
      const data = parseFrontmatterToObject(frontmatter);
      if (!data.slug || !data.title) {
        return;
      }
      const pillar = data.pillar || data.category || 'general';
      const url = urlPattern
        .replace('{pillar}', pillar)
        .replace('{slug}', data.slug);
      articles.push({
        slug: data.slug,
        title: data.title,
        pillar,
        target_keyword: data.target_keyword || '',
        summary: data.description || '',
        url,
        body
      });
    });
  });
  return articles;
}

function parseFrontmatterToObject(frontmatter) {
  const lines = frontmatter.split(/\r?\n/).slice(1);
  const data = {};
  for (const line of lines) {
    if (line.trim() === '---') {
      break;
    }
    const idx = line.indexOf(':');
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) {
      data[key] = value.replace(/^"|"$/g, '');
    }
  }
  return data;
}

function buildMetaDescription(title, keyword) {
  const base = `Guia 2026 sobre ${keyword} en Mexico: pasos claros, comparativas y consejos para mejorar tu conexion.`;
  if (base.length <= 160) {
    return base;
  }
  return `Guia 2026 sobre ${keyword} en Mexico con pasos claros y comparativas para mejorar tu conexion.`;
}

function buildSections(outline) {
  const sections = [];
  let current = null;
  outline.headings.forEach((heading) => {
    if (heading.level === 2) {
      current = { title: heading.text, sub: [] };
      sections.push(current);
    } else if (heading.level === 3 && current) {
      current.sub.push(heading.text);
    }
  });
  const defaults = [
    'Panorama 2026 y cambios clave',
    'Factores que afectan la velocidad',
    'Como elegir un plan en Mexico',
    'Checklist rapido de mejoras',
    'Errores comunes y soluciones',
    'Comparativa rapida para decidir'
  ];
  defaults.forEach((title) => {
    if (sections.length < 5 && !sections.find((section) => section.title === title)) {
      sections.push({ title, sub: [] });
    }
  });
  return sections;
}

function renderTableOfContents(sections) {
  const lines = sections.map((section) => `- [${section.title}](#${slugify(section.title)})`);
  return ['## Tabla de contenidos', ...lines].join('\n');
}

function renderKeyTakeaways(outline) {
  const points = [
    `Prioriza ${outline.target_keyword} con base en tu zona y presupuesto.`,
    'Valida la cobertura real antes de contratar.',
    'Optimiza tu router y ubicacion para ganar estabilidad.',
    'Compara velocidad real vs precio, no solo megas en el papel.',
    'Guarda una lista de mejoras rapidas para mantener tu red estable.'
  ];
  return ['> **Key Takeaways**', ...points.map((point) => `> - ${point}`)].join('\n');
}

function renderIntro(outline) {
  return [
    `En 2026, ${outline.target_keyword} sigue siendo una decision clave para hogares y pequenos negocios en Mexico.`,
    'Esta guia explica como elegir, optimizar y comparar opciones con pasos simples y un enfoque realista.',
    `Audiencia: ${outline.audience}`,
    `Intencion: ${outline.intent}`
  ].join('\n\n');
}

function renderSectionContent(sectionTitle, outline, pillarSlug, linkTargets) {
  const paragraph1 = `Para ${sectionTitle.toLowerCase()}, parte de tu uso real: cuantas personas se conectan, cuantas horas de streaming hay y si trabajas con videollamadas. Esto evita sobrepagar por megas que no necesitas o quedarte corto en horas pico.`;
  const paragraph2 = `Un metodo rapido es estimar un rango de megas por persona y contrastarlo con pruebas en distintos horarios. Si necesitas mas contexto, revisa ${linkTargets[0] || 'las guias internas del pilar'} para comparar escenarios similares.`;
  const paragraph3 = `En Mexico, la calidad final depende de la cobertura local, del modem y de la ubicacion del router. Paredes gruesas, electrodomesticos y saturacion del vecindario pueden reducir la velocidad real sin que el proveedor lo anuncie.`;
  const paragraph4 = `Piensa tambien en la estabilidad: latencia baja, subidas consistentes y un WiFi bien configurado suelen importar mas que el numero maximo de megas en el contrato.`;
  const list = [
    'Haz una prueba de velocidad en 3 horarios distintos.',
    'Verifica si tu router soporta WiFi 6 o al menos doble banda.',
    'Coloca el modem en una zona central, elevada y sin obstrucciones.',
    'Si puedes, usa cable para tareas criticas como videollamadas.'
  ];
  return [paragraph1, paragraph2, paragraph3, paragraph4, `Checklist rapido:\n- ${list.join('\n- ')}`].join('\n\n');
}

function buildFaq(outline) {
  const keyword = outline.target_keyword;
  const questions = [
    `Cuantos megas necesito para ${keyword.toLowerCase()}?`,
    'Como saber si mi zona tiene buena cobertura?',
    'Es mejor fibra o coaxial en 2026?',
    'Que hago si mi velocidad real no coincide con el plan?',
    'Cada cuanto conviene cambiar de proveedor?'
  ];
  const answers = [
    'Depende del numero de personas y usos simultaneos. Para 1-2 personas, 50-100 Mbps suele funcionar; para familias grandes, 200 Mbps o mas es mas estable.',
    'Revisa mapas oficiales, opiniones locales y prueba con un speed test en distintos horarios.',
    'La fibra suele ofrecer mejor estabilidad y menor latencia, pero depende de la instalacion local.',
    'Primero revisa tu red interna, luego mide varias veces y reporta con evidencia al proveedor.',
    'Si el servicio es inestable o el precio se queda alto frente al mercado, considera cambiar cada 12-24 meses.'
  ];
  const lines = ['## FAQ'];
  questions.forEach((question, index) => {
    lines.push(`### ${question}`);
    lines.push(answers[index]);
    lines.push('');
  });
  return lines.join('\n').trim();
}

function buildInternalLinksSection(links, minLinks, fallback) {
  const unique = new Map();
  links.forEach((item) => {
    if (item && item.url && !unique.has(item.url)) {
      unique.set(item.url, item);
    }
  });
  fallback.forEach((item) => {
    if (unique.size < minLinks && item && item.url && !unique.has(item.url)) {
      unique.set(item.url, item);
    }
  });
  const finalLinks = Array.from(unique.values());
  const lines = ['## Enlaces internos'];
  finalLinks.forEach((item) => {
    lines.push(`- [${item.title}](${item.url})`);
  });
  return { section: lines.join('\n'), count: finalLinks.length, list: finalLinks };
}

function buildCtaSection() {
  return [
    '## CTA',
    '1) Compara planes y precios con tu presupuesto mensual.',
    '2) Haz una prueba de velocidad en horarios distintos.',
    '3) Revisa opciones de cobertura y promociones vigentes.'
  ].join('\n');
}

function expandForMinimumWords(markdown, outline, minWordCount) {
  let expanded = markdown;
  const templates = [
    [
      'En 2026, los precios y promociones cambian rapido, por eso conviene revisar contratos y permanencias antes de firmar.',
      'Si tu consumo es moderado, un plan de entrada puede ser suficiente y puedes invertir el ahorro en un mejor router.',
      'Otro punto clave es la atencion al cliente: tiempos de instalacion, calidad de soporte y claridad en las facturas.',
      'Evalua reseñas locales y pregunta en tu colonia, porque la experiencia real suele variar por zona.'
    ],
    [
      'Si necesitas justificar el gasto, estima el costo por mega real usando tu velocidad promedio, no la maxima anunciada.',
      'Esto ayuda a comparar opciones de forma objetiva y evita decisiones basadas solo en marketing.',
      'Considera tambien tu equipo interno: un router viejo o una mala ubicacion pueden borrar la ventaja de un plan premium.',
      'Un cambio de canal WiFi o un cable de mejor categoria suele mejorar estabilidad sin costo extra.'
    ],
    [
      'Para hogares con streaming 4K o gaming, la latencia constante es tan importante como la velocidad de bajada.',
      'Si notas cortes, prueba reiniciar el modem, actualizar firmware y separar redes 2.4 GHz y 5 GHz.',
      'En departamentos, la saturacion de canales es comun, por eso el analisis con apps de WiFi ayuda a elegir el canal menos congestionado.',
      'Guarda una bitacora simple de fallas para reportarlas con evidencia al proveedor.'
    ],
    [
      'Si vives en zona con poca infraestructura, compara opciones inalambricas fijas y revisa limites de datos.',
      'En planes moviles, busca politicas de uso justo para evitar reducciones de velocidad inesperadas.',
      'Un buen habito es medir la velocidad una vez al mes para detectar cambios con el tiempo.',
      `Para mas ideas, guarda este articulo y revisa el pilar ${outline.target_keyword} cuando haya nuevas promociones.`
    ]
  ];

  const bulletBase = [
    'Verifica la ubicacion del modem y evita ponerlo en el piso.',
    'Usa cable para tareas criticas como trabajo remoto.',
    'Apaga dispositivos inactivos para reducir ruido en la red.',
    'Actualiza el firmware del router cada cierto tiempo.',
    'Separa redes 2.4 GHz y 5 GHz para usos distintos.',
    'Comprueba si tu plan incluye limites de datos.',
    'Revisa promociones anuales para negociar mejor precio.',
    'Guarda capturas de tus pruebas de velocidad.'
  ];

  let index = 0;
  let block = 1;
  while (wordCount(expanded) < minWordCount && block <= 12) {
    const template = templates[index % templates.length];
    const header = `## Notas adicionales ${block}`;
    const list = ['Checklist extra:', ...bulletBase.map((item) => `- ${item}`)].join('\n');
    expanded = `${expanded}\n\n${[header, ...template, list].join('\n')}`;
    index += 1;
    block += 1;
  }
  return expanded;
}

function buildImageBlocks(slug, altTexts) {
  const featured = `![${altTexts.featured}](/content-system/assets/images/${slug}-featured.jpg)`;
  const inline1 = `![${altTexts.inline1}](/content-system/assets/images/${slug}-inline-1.jpg)`;
  const inline2 = `![${altTexts.inline2}](/content-system/assets/images/${slug}-inline-2.jpg)`;
  return { featured, inline1, inline2 };
}

function buildImagePromptPack(slug, outline) {
  const promptBase = `${outline.target_keyword} en Mexico 2026, estilo fotografia limpia, sin marcas, enfoque en tecnologia y hogar.`;
  return {
    featured_image_prompt: `${promptBase} Imagen principal con router y sala iluminada.`,
    inline_image_1_prompt: `${promptBase} Imagen de persona haciendo speed test en laptop.`,
    inline_image_2_prompt: `${promptBase} Imagen de edificio con fibra optica representada.`,
    alt_text: {
      featured: `Router y sala representando ${outline.target_keyword} en Mexico`,
      inline1: `Persona midiendo velocidad de internet en casa`,
      inline2: `Ilustracion de fibra optica en entorno urbano`
    },
    filenames: {
      featured: `${slug}-featured.jpg`,
      inline1: `${slug}-inline-1.jpg`,
      inline2: `${slug}-inline-2.jpg`
    }
  };
}

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(destPath));
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(destPath, () => reject(err));
    });
  });
}

async function downloadImagesIfConfigured(pack, config, attributionPath) {
  const unsplashKey = process.env.UNSPLASH_API_KEY;
  const pexelsKey = process.env.PEXELS_API_KEY;
  if (!config.images.downloadIfKeyPresent) {
    return null;
  }
  let provider = null;
  if (unsplashKey) {
    provider = 'unsplash';
  } else if (pexelsKey) {
    provider = 'pexels';
  }
  if (!provider) {
    return null;
  }

  const attribution = fs.existsSync(attributionPath) ? readJson(attributionPath) : [];
  const queries = [pack.featured_image_prompt, pack.inline_image_1_prompt, pack.inline_image_2_prompt];
  const filenames = [pack.filenames.featured, pack.filenames.inline1, pack.filenames.inline2];
  const saved = [];

  for (let i = 0; i < queries.length; i += 1) {
    const query = encodeURIComponent(queries[i]);
    if (provider === 'unsplash') {
      const url = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape`;
      const data = await fetchJson(url, { Authorization: `Client-ID ${unsplashKey}` });
      await downloadFile(data.urls.regular, path.join(config.paths.images, filenames[i]));
      attribution.push({
        provider: 'unsplash',
        source_url: data.links.html,
        photographer: data.user && data.user.name ? data.user.name : 'Unknown',
        filename: filenames[i]
      });
      saved.push({ url: data.links.html, filename: filenames[i] });
    }
    if (provider === 'pexels') {
      const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`;
      const data = await fetchJson(url, { Authorization: pexelsKey });
      if (data.photos && data.photos.length) {
        const photo = data.photos[0];
        await downloadFile(photo.src.large, path.join(config.paths.images, filenames[i]));
        attribution.push({
          provider: 'pexels',
          source_url: photo.url,
          photographer: photo.photographer,
          filename: filenames[i]
        });
        saved.push({ url: photo.url, filename: filenames[i] });
      }
    }
  }

  writeJson(attributionPath, attribution);
  return { provider, saved };
}

function validateArticle(article, config, existingSlugs) {
  const issues = [];
  if (article.metaDescription.length > 160) {
    issues.push('Meta description is too long.');
  }
  if (existingSlugs.has(article.slug)) {
    issues.push('Slug is not unique.');
  }
  if (article.wordCount < config.minWordCount) {
    issues.push(`Word count below ${config.minWordCount}.`);
  }
  if (article.h2Count < config.minH2Count) {
    issues.push(`H2 count below ${config.minH2Count}.`);
  }
  if (article.faqCount < config.minFaqCount) {
    issues.push(`FAQ count below ${config.minFaqCount}.`);
  }
  if (article.internalLinkCount < config.minInternalLinks) {
    issues.push(`Internal link count below ${config.minInternalLinks}.`);
  }
  return issues;
}

function buildArticleMarkdown(outline, meta, sections, linksData, imageBlocks, config) {
  const tableOfContents = renderTableOfContents(sections);
  const keyTakeaways = renderKeyTakeaways(outline);
  const intro = renderIntro(outline);
  const sectionsContent = sections.map((section) => {
    const inBodyLinks = linksData.inBodyLinks.map((item) => `[${item.title}](${item.url})`).slice(0, 2);
    const linkTargets = inBodyLinks.length ? inBodyLinks : ['las guias internas del pilar'];
    const content = renderSectionContent(section.title, outline, meta.pillar, linkTargets);
    const subHeads = section.sub.map((sub) => `### ${sub}\n${content}`);
    return [`## ${section.title}`, content, ...subHeads].join('\n\n');
  }).join('\n\n');

  const internalLinksSection = buildInternalLinksSection(
    linksData.internalLinks,
    config.minInternalLinks,
    linksData.fallbackLinks
  );

  const faq = buildFaq(outline);
  const cta = buildCtaSection();

  const body = [
    `# ${outline.title}`,
    '',
    intro,
    '',
    imageBlocks.featured,
    '',
    keyTakeaways,
    '',
    tableOfContents,
    '',
    sectionsContent,
    '',
    imageBlocks.inline1,
    '',
    imageBlocks.inline2,
    '',
    faq,
    '',
    internalLinksSection.section,
    '',
    cta
  ].join('\n');

  return { markdown: body, internalLinksCount: internalLinksSection.count };
}

function buildFallbackLinks(config) {
  return [
    { title: 'Internet en casa', url: '/internet-en-casa/' },
    { title: 'Planes moviles', url: '/planes-moviles/' },
    { title: 'Cobertura', url: '/cobertura/' },
    { title: 'Herramientas', url: '/herramientas/' },
    { title: 'Guias', url: '/guias/' },
    { title: 'eSIM', url: '/esim/' },
    { title: 'eSIM viajeros', url: '/esim-viajeros/' },
    { title: 'Transparencia', url: '/transparencia/' },
    { title: 'Metodologia', url: '/metodologia/' }
  ];
}

function collectExistingSlugs(articleDirs) {
  const existing = new Set();
  articleDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      return;
    }
    const files = getAllMarkdownFiles(dir);
    files.forEach((file) => {
      const raw = readText(file);
      if (raw.startsWith('---')) {
        const data = parseFrontmatterToObject(raw);
        if (data.slug) {
          existing.add(data.slug);
        }
      }
    });
  });
  return existing;
}

function copyPublishedToSite(publishedDir, siteDir) {
  ensureDir(siteDir);
  const files = getAllMarkdownFiles(publishedDir);
  files.forEach((file) => {
    const dest = path.join(siteDir, path.basename(file));
    copyFileSafe(file, dest);
  });
}

async function run() {
  const config = loadConfig(CONFIG_PATH);
  const inboxFiles = listOutlineFiles(config.paths.inboxOutlines);
  const batch = inboxFiles.slice(0, config.maxOutlinesPerRun);

  if (!batch.length) {
    console.log('No outlines found.');
    return;
  }

  const siteBlogDir = path.join(ROOT, config.site.contentBlogDir);
  const existingArticles = loadArticlesFromMarkdown(
    [path.join(ROOT, config.paths.publishedArticles), siteBlogDir],
    config.site.articleUrlPattern
  );
  const existingSlugs = collectExistingSlugs([path.join(ROOT, config.paths.publishedArticles), siteBlogDir]);

  const runReport = {
    started_at: new Date().toISOString(),
    total_outlines: batch.length,
    successes: [],
    failures: []
  };

  const newArticles = [];

  for (const outlinePath of batch) {
    try {
      const outline = parseOutlineFile(outlinePath);
      const pillarSlug = classifyPillar(outline, config);
      const pillarTitle = getPillarTitle(pillarSlug, config);
      const baseSlug = slugify(outline.title || outline.target_keyword);
      const preExistingSlugs = new Set(existingSlugs);
      const articleSlug = uniqueSlug(baseSlug, existingSlugs);

      const url = config.site.articleUrlPattern
        .replace('{pillar}', pillarSlug)
        .replace('{slug}', articleSlug);

      const pillarUrl = config.site.pillarUrlPattern.replace('{pillar}', pillarSlug);

      const imagePack = buildImagePromptPack(articleSlug, outline);
      const imageBlocks = buildImageBlocks(articleSlug, imagePack.alt_text);

      const sectionList = buildSections(outline);

      const articleNode = {
        slug: articleSlug,
        title: outline.title,
        pillar: pillarSlug,
        target_keyword: outline.target_keyword,
        summary: outline.target_keyword,
        url
      };
      const graphWithCurrent = buildLinkGraph([...existingArticles, ...newArticles, articleNode]);
      const suggestions = suggestInternalLinks(articleNode, graphWithCurrent, { maxSiblings: 4, maxCross: 3 });

      const internalLinks = [
        { title: `${pillarTitle} (Pilar)`, url: pillarUrl },
        ...suggestions.siblings.map((item) => ({ title: item.title, url: item.url })),
        ...suggestions.cross.map((item) => ({ title: item.title, url: item.url }))
      ];

      const fallbackLinks = buildFallbackLinks(config);

      const linksData = {
        internalLinks,
        fallbackLinks,
        inBodyLinks: [...suggestions.siblings, ...suggestions.cross]
      };

      const metaDescription = buildMetaDescription(outline.title, outline.target_keyword);
      const frontmatter = buildFrontmatter({
        title: outline.title,
        slug: articleSlug,
        description: metaDescription,
        date: new Date().toISOString().split('T')[0],
        pillar: pillarSlug,
        language: config.language,
        audience: outline.audience,
        intent: outline.intent,
        target_keyword: outline.target_keyword
      });

      const { markdown, internalLinksCount } = buildArticleMarkdown(
        outline,
        { pillar: pillarSlug },
        sectionList,
        linksData,
        imageBlocks,
        config
      );

      const expandedMarkdown = expandForMinimumWords(markdown, outline, config.minWordCount);
      const fullArticle = `${frontmatter}\n\n${expandedMarkdown}\n`;
      const wc = wordCount(fullArticle);
      const h2Count = (fullArticle.match(/^##\s+/gm) || []).length;
      const faqCount = (fullArticle.match(/^###\s+/gm) || []).length;

      const validationIssues = validateArticle({
        slug: articleSlug,
        metaDescription,
        wordCount: wc,
        h2Count,
        faqCount,
        internalLinkCount: internalLinksCount
      }, config, preExistingSlugs);

      if (validationIssues.length) {
        const failedName = path.basename(outlinePath);
        const failedPath = path.join(config.paths.failedOutlines, failedName);
        writeFileSafe(failedPath, readText(outlinePath));
        writeJson(`${failedPath}.error.json`, { errors: validationIssues });
        fs.unlinkSync(outlinePath);
        runReport.failures.push({ outline: failedName, errors: validationIssues });
        continue;
      }

      const draftPath = path.join(config.paths.draftArticles, `${articleSlug}.md`);
      const publishedPath = path.join(config.paths.publishedArticles, `${articleSlug}.md`);
      writeFileSafe(draftPath, fullArticle);
      writeFileSafe(publishedPath, fullArticle);

      const promptPath = path.join(config.paths.imagePrompts, `${articleSlug}.json`);
      writeJson(promptPath, imagePack);

      const attribution = await downloadImagesIfConfigured(imagePack, config, config.paths.attribution);
      if (attribution) {
        const newFrontmatter = buildFrontmatter({
          title: outline.title,
          slug: articleSlug,
          description: metaDescription,
          date: new Date().toISOString().split('T')[0],
          pillar: pillarSlug,
          language: config.language,
          audience: outline.audience,
          intent: outline.intent,
          target_keyword: outline.target_keyword,
          image_attribution_provider: attribution.provider
        });
        const articleWithAttribution = `${newFrontmatter}\n\n${expandedMarkdown}\n`;
        writeFileSafe(draftPath, articleWithAttribution);
        writeFileSafe(publishedPath, articleWithAttribution);
      }

      const donePath = path.join(config.paths.doneOutlines, path.basename(outlinePath));
      writeFileSafe(donePath, readText(outlinePath));
      fs.unlinkSync(outlinePath);

      const articleRecord = {
        slug: articleSlug,
        title: outline.title,
        pillar: pillarSlug,
        target_keyword: outline.target_keyword,
        summary: metaDescription,
        url
      };
      newArticles.push(articleRecord);
      runReport.successes.push({ outline: path.basename(outlinePath), article: articleSlug });
    } catch (error) {
      const failedName = path.basename(outlinePath);
      const failedPath = path.join(config.paths.failedOutlines, failedName);
      writeFileSafe(failedPath, readText(outlinePath));
      writeJson(`${failedPath}.error.json`, { errors: [error.message] });
      fs.unlinkSync(outlinePath);
      runReport.failures.push({ outline: failedName, errors: [error.message] });
    }
  }

  const allArticles = [...existingArticles, ...newArticles];
  const articlesByPillar = allArticles.reduce((acc, article) => {
    if (!acc[article.pillar]) {
      acc[article.pillar] = [];
    }
    acc[article.pillar].push(article);
    return acc;
  }, {});

  Object.entries(articlesByPillar).forEach(([pillarSlug, articles]) => {
    const pillarTitle = getPillarTitle(pillarSlug, config);
    ensurePillar({ slug: pillarSlug, title: pillarTitle }, articles, config.paths.pillars, config);
  });

  copyPublishedToSite(path.join(ROOT, config.paths.publishedArticles), siteBlogDir);

  runReport.finished_at = new Date().toISOString();
  writeJson(config.paths.runReport, runReport);

  console.log(`Processed outlines: ${runReport.total_outlines}`);
  console.log(`Successes: ${runReport.successes.length}`);
  console.log(`Failures: ${runReport.failures.length}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
