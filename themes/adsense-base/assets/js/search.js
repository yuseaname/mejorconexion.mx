/**
 * Client-side search for mejorconexion.mx
 * Loads /search-index.json, ranks matches by title/description/content,
 * renders live results and supports query-string ?q=.
 */
(function () {
  'use strict';

  var INDEX_URL = '/search-index.json';
  var MIN_QUERY_LENGTH = 2;
  var MAX_RESULTS = 12;

  var form = document.getElementById('search-form');
  var input = document.getElementById('search-input');
  var resultsEl = document.getElementById('search-results');
  var metaEl = document.getElementById('search-meta');
  var emptyEl = document.getElementById('search-empty');
  var statusEl = document.getElementById('search-status');

  var index = [];
  var indexReady = false;

  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(str) {
    var text = normalize(str);
    if (!text) return [];
    return text.split(/\s+/).filter(function (t) { return t.length >= 2; });
  }

  function uniqueTokens(str) {
    var tokens = tokenize(str);
    var seen = {};
    var out = [];
    for (var i = 0; i < tokens.length; i++) {
      if (!seen[tokens[i]]) {
        seen[tokens[i]] = true;
        out.push(tokens[i]);
      }
    }
    return out;
  }

  function scoreEntry(entry, query) {
    var qTokens = uniqueTokens(query);
    if (!qTokens.length) return 0;

    var title = normalize(entry.title);
    var desc = normalize(entry.description || '');
    var summary = normalize(entry.summary || '');
    var content = normalize(entry.content || '');
    var section = normalize(entry.section || '');
    var tags = (entry.tags || []).join(' ');

    var score = 0;
    var matchedTokens = 0;

    for (var i = 0; i < qTokens.length; i++) {
      var t = qTokens[i];
      var hasMatch = false;

      if (title.indexOf(t) !== -1) { score += 12; hasMatch = true; }
      if (desc.indexOf(t) !== -1) { score += 6; hasMatch = true; }
      if (tags.indexOf(t) !== -1) { score += 5; hasMatch = true; }
      if (section.indexOf(t) !== -1) { score += 4; hasMatch = true; }
      if (summary.indexOf(t) !== -1) { score += 3; hasMatch = true; }
      if (content.indexOf(t) !== -1) { score += 1; hasMatch = true; }

      if (hasMatch) matchedTokens++;

      // bonus for exact phrase matches in title/description
      if (title.indexOf(query) !== -1) score += 8;
      if (desc.indexOf(query) !== -1) score += 4;
    }

    // require all query tokens to match (AND)
    if (matchedTokens < qTokens.length) return 0;

    return score;
  }

  function highlight(text, query) {
    var normalized = normalize(query);
    if (!normalized) return escapeHtml(text);
    var tokens = uniqueTokens(query).sort(function (a, b) { return b.length - a.length; });
    if (!tokens.length) return escapeHtml(text);

    var safe = escapeHtml(text);
    var pattern = new RegExp('(' + tokens.map(escapeRegExp).join('|') + ')', 'gi');
    return safe.replace(pattern, '<mark class="search-highlight"\u003e$1</mark\u003e');
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function render(results, query) {
    if (!resultsEl) return;
    resultsEl.innerHTML = '';

    if (!query || query.length < MIN_QUERY_LENGTH) {
      if (emptyEl) resultsEl.appendChild(emptyEl);
      if (metaEl) metaEl.classList.add('hidden');
      if (statusEl) statusEl.textContent = 'Escribe para ver resultados.';
      return;
    }

    if (metaEl) {
      metaEl.classList.remove('hidden');
      metaEl.textContent = results.length
        ? results.length + ' resultado' + (results.length === 1 ? '' : 's') + ' para “' + query + '”'
        : 'No encontramos resultados para “' + query + '”. Prueba con otras palabras.';
    }

    if (statusEl) {
      statusEl.textContent = results.length
        ? 'Mostrando ' + results.length + ' resultado' + (results.length === 1 ? '' : 's')
        : 'Sin resultados.';
    }

    if (!results.length) {
      var noResults = document.createElement('p');
      noResults.className = 'text-[var(--ink-muted)]';
      noResults.textContent = 'Prueba con términos más generales como “internet”, “router”, “Telcel” o “planes”. Si sigues sin ver resultados, [contactanos](/contact.html).';
      resultsEl.appendChild(noResults);
      return;
    }

    for (var i = 0; i < results.length; i++) {
      var item = results[i];
      var article = document.createElement('article');
      article.className = 'search-result';

      var snippet = item.description || item.summary || '';
      if (!snippet && item.content) {
        snippet = item.content.substring(0, 220).replace(/\s+/g, ' ') + '...';
      }

      var titleHtml = highlight(item.title, query);
      var snippetHtml = highlight(snippet, query);

      var sectionLabel = item.section ? '<span class="search-result-section">' + escapeHtml(item.section) + '</span> · ' : '';

      article.innerHTML =
        '<a href="' + escapeHtml(item.url) + '" class="search-result-link">' +
          '<h2 class="search-result-title">' + titleHtml + '</h2>' +
          '<p class="search-result-snippet">' + snippetHtml + '</p>' +
          '<div class="search-result-meta">' + sectionLabel + '<time datetime="' + escapeHtml(item.date || '') + '"\u003e' + escapeHtml(item.date || '') + '</time></div>' +
        '</a>';

      resultsEl.appendChild(article);
    }
  }

  function doSearch(query) {
    query = (query || '').trim();
    if (!input) return;

    if (query !== input.value) {
      input.value = query;
    }

    if (!indexReady || query.length < MIN_QUERY_LENGTH) {
      render([], query);
      return;
    }

    var results = [];
    for (var i = 0; i < index.length; i++) {
      var s = scoreEntry(index[i], query);
      if (s > 0) {
        results.push({ entry: index[i], score: s });
      }
    }

    results.sort(function (a, b) { return b.score - a.score; });
    render(results.slice(0, MAX_RESULTS).map(function (r) { return r.entry; }), query);
  }

  function loadIndex() {
    if (!input) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', INDEX_URL, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          index = JSON.parse(xhr.responseText) || [];
          indexReady = true;
          doSearch(input.value);
        } catch (e) {
          if (statusEl) statusEl.textContent = 'Error al cargar el índice de búsqueda.';
        }
      } else {
        if (statusEl) statusEl.textContent = 'No se pudo cargar el índice de búsqueda.';
      }
    };
    xhr.send();
  }

  function getQueryParam(name) {
    var match = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
  }

  function init() {
    if (!input || !resultsEl) return;

    var initial = getQueryParam('q');
    if (initial) {
      input.value = initial;
    }

    loadIndex();

    var debounceTimer;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        doSearch(input.value);
      }, 150);
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        doSearch(input.value);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
