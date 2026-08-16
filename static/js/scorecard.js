// MCX-08: Local-only provider comparison scorecard.
// No data collection: scores live in localStorage only. No signup.
// Rybbit events: scorecard_start / scorecard_copy / scorecard_reset
(function () {
  'use strict';
  var PROVIDERS = ['Telmex', 'Izzi', 'Totalplay', 'Megacable'];
  var CRITERIA = [
    { key: 'cobertura', label: 'Cobertura en tu zona' },
    { key: 'velocidad', label: 'Velocidad real' },
    { key: 'precio', label: 'Precio final' },
    { key: 'instalacion', label: 'Costo de instalación' },
    { key: 'soporte', label: 'Soporte y fallas' },
    { key: 'permanencia', label: 'Sin permanencia' }
  ];
  var KEY = 'mcx-scorecard-v1';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }
  function track(name) {
    try {
      if (window.rybbit && typeof window.rybbit.track === 'function') window.rybbit.track(name, {});
    } catch (e) { /* analytics blocked */ }
  }
  function totalFor(state, prov) {
    var t = 0;
    CRITERIA.forEach(function (c) { t += (state[c.key] && state[c.key][prov]) || 0; });
    return t;
  }
  function stars(value) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += '<button type="button" class="sc-cell" data-score="' + i + '" aria-label="Puntuar ' + i + ' de 5"' +
        (value >= i ? ' data-on="1"' : '') + '></button>';
    }
    return html;
  }
  function render(root) {
    var state = load();
    var table = document.createElement('table');
    table.className = 'sc-table';
    var thead = '<thead><tr><th scope="col">Criterio</th>';
    PROVIDERS.forEach(function (p) { thead += '<th scope="col">' + p + '</th>'; });
    thead += '</tr></thead>';
    var rows = '';
    CRITERIA.forEach(function (c) {
      rows += '<tr><th scope="row">' + c.label + '</th>';
      PROVIDERS.forEach(function (p) {
        var v = (state[c.key] && state[c.key][p]) || 0;
        rows += '<td><div class="sc-cells" data-crit="' + c.key + '" data-prov="' + p + '">' + stars(v) + '</div></td>';
      });
      rows += '</tr>';
    });
    var totals = '<tr class="sc-total-row"><th scope="row">Total</th>';
    PROVIDERS.forEach(function (p) {
      totals += '<td class="sc-total-cell" data-total="' + p + '">' + (totalFor(state, p) || '—') + '</td>';
    });
    totals += '</tr>';
    table.innerHTML = thead + '<tbody>' + rows + totals + '</tbody>';

    var note = document.createElement('p');
    note.className = 'sc-note';
    note.textContent = 'Tus calificaciones se guardan solo en este navegador. No enviamos nada a ningún servidor.';

    var actions = document.createElement('div');
    actions.className = 'sc-actions';
    actions.innerHTML =
      '<button type="button" class="sc-btn sc-copy">Copiar resultado</button>' +
      '<button type="button" class="sc-btn sc-print">Imprimir / guardar PDF</button>' +
      '<button type="button" class="sc-btn sc-reset">Borrar</button>';

    actions.querySelector('.sc-copy').addEventListener('click', function () {
      var lines = ['Comparativa de internet — mejorconexion.mx', ''];
      CRITERIA.forEach(function (c) {
        lines.push(c.label + ': ' + PROVIDERS.map(function (p) {
          return p + ' ' + ((load()[c.key] && load()[c.key][p]) || 0) + '/5';
        }).join(' | '));
      });
      lines.push('');
      PROVIDERS.forEach(function (p) {
        lines.push('TOTAL ' + p + ': ' + totalFor(load(), p) + '/30');
      });
      var txt = lines.join('\n');
      var done = function () { track('scorecard_copy'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
      else done();
    });
    actions.querySelector('.sc-print').addEventListener('click', function () { window.print(); });
    actions.querySelector('.sc-reset').addEventListener('click', function () {
      save({}); render(root); track('scorecard_reset');
    });

    root.innerHTML = '';
    root.appendChild(table);
    root.appendChild(note);
    root.appendChild(actions);
    bindGrid(root);
  }
  function bindGrid(root) {
    root.addEventListener('click', function (ev) {
      var cell = ev.target.closest('.sc-cell');
      if (!cell) return;
      var wrap = cell.closest('.sc-cells');
      var crit = wrap.getAttribute('data-crit'), prov = wrap.getAttribute('data-prov');
      var score = parseInt(cell.getAttribute('data-score'), 10);
      var st = load();
      st[crit] = st[crit] || {};
      st[crit][prov] = score;
      save(st);
      Array.prototype.forEach.call(wrap.children, function (c, idx) {
        if (idx < score) c.setAttribute('data-on', '1'); else c.removeAttribute('data-on');
      });
      var totalCell = root.querySelector('[data-total="' + prov + '"]');
      if (totalCell) totalCell.textContent = totalFor(st, prov);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    var mounts = document.querySelectorAll('.mcx-scorecard');
    if (!mounts.length) return;
    Array.prototype.forEach.call(mounts, function (mount) {
      render(mount);
      mount.addEventListener('pointerdown', function once() { track('scorecard_start'); }, { once: true });
    });
  });
})();
