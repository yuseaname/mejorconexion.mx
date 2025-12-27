(() => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (toggle && header && nav) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Marcar enlace activo por ruta
  try {
    const path = (location.pathname || '/').replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-site-nav] a[href^="/"]').forEach((a) => {
      const href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
      if (href !== '/' && path.startsWith(href)) a.setAttribute('aria-current', 'page');
      if (href === '/' && path === '/') a.setAttribute('aria-current', 'page');
    });
  } catch {
    // ignorar
  }

  // Año en footer
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
