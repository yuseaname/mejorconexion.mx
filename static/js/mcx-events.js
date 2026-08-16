// MCX Phase 4: experiment event instrumentation (delegated, no collection).
// Tracks: CTA clicks (exp 2), trust-card link clicks (exp 4), intent-path clicks (exp 5).
// Uses Rybbit's window.rybbit.track when available.
(function () {
  'use strict';
  function track(name, props) {
    try {
      if (window.rybbit && typeof window.rybbit.track === 'function') {
        window.rybbit.track(name, props || {});
      }
    } catch (e) { /* blocked */ }
  }
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-cta], [data-trust-link], [data-intent-path]');
    if (!el) return;
    var cta = el.getAttribute('data-cta');
    if (cta) { track('cta_click', { cta: cta }); return; }
    var trust = el.getAttribute('data-trust-link');
    if (trust) { track('trust_link_click', { link: trust }); return; }
    var path = el.getAttribute('data-intent-path');
    if (path) { track('intent_path_click', { path: path }); return; }
  });
})();
