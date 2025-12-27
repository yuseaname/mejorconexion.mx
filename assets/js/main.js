(() => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (toggle && header && nav) {
    const setOpen = (open) => {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    toggle.addEventListener('click', () => {
      const open = !header.classList.contains('nav-open');
      setOpen(open);
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!header.classList.contains('nav-open')) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (header.contains(target)) return;
      setOpen(false);
    });

    // Cerrar al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!header.classList.contains('nav-open')) return;
      setOpen(false);
      toggle.focus();
    });

    // Cerrar al seleccionar un enlace
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a');
      if (!a) return;
      setOpen(false);
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
