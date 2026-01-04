(() => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  // Normalizar marca (acentos) sin editar todas las páginas
  document.querySelectorAll('.brand span:last-child').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.textContent = 'Mejor Conexión';
  });

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

  // Anclas: scroll suave con header sticky (TOC + enlaces internos)
  const prefersReducedMotion = (() => {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  })();

  const scrollToHash = (hash) => {
    if (!hash || hash === '#') return false;
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) return false;
    const el = document.getElementById(id);
    if (!el) return false;
    try {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    } catch {
      el.scrollIntoView();
    }
    return true;
  };

  // Soportar navegación directa con hash
  if (location.hash) {
    requestAnimationFrame(() => {
      scrollToHash(location.hash);
    });
  }

  // Interceptar clicks a anclas internas
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const a = target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (!href || href === '#') return;
    if (href.startsWith('#')) {
      const ok = scrollToHash(href);
      if (!ok) return;
      e.preventDefault();
      try {
        history.pushState(null, '', href);
      } catch {
        location.hash = href;
      }
    }
  });

  window.addEventListener('hashchange', () => {
    scrollToHash(location.hash);
  });

  // Año en footer
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Calculadora de consumo de datos
  const usageForm = document.querySelector('[data-tool="data-usage"]');
  if (usageForm) {
    const result = usageForm.querySelector('[data-tool-result]');
    const inputs = usageForm.querySelectorAll('input, select');

    const calc = () => {
      const videoHours = Number(usageForm.querySelector('[name="videoHours"]')?.value || 0);
      const videoQuality = Number(usageForm.querySelector('[name="videoQuality"]')?.value || 0);
      const callHours = Number(usageForm.querySelector('[name="callHours"]')?.value || 0);
      const socialHours = Number(usageForm.querySelector('[name="socialHours"]')?.value || 0);
      const daysMonth = Number(usageForm.querySelector('[name="daysMonth"]')?.value || 0);

      const videoGb = videoHours * videoQuality;
      const callGb = callHours * 0.6;
      const socialGb = socialHours * 0.15;
      const totalGb = (videoGb + callGb + socialGb) * daysMonth;

      if (result) {
        result.textContent = `${totalGb.toFixed(1)} GB/mes`;
      }
    };

    inputs.forEach((input) => input.addEventListener('input', calc));
    calc();
  }

  // BreadcrumbList JSON-LD
  const breadcrumb = document.querySelector('.breadcrumbs');
  const breadcrumbExists = document.querySelector('script[data-breadcrumb-jsonld]');
  if (!breadcrumbExists) {
    const items = [];
    const parts = breadcrumb ? breadcrumb.textContent.split('/').map((part) => part.trim()).filter(Boolean) : [];
    const links = breadcrumb ? Array.from(breadcrumb.querySelectorAll('a')) : [];
    if (parts.length) {
      parts.forEach((label, index) => {
        const link = links[index];
        const item = link ? link.href : location.href;
        items.push({
          '@type': 'ListItem',
          position: index + 1,
          name: label,
          item,
        });
      });
    } else if (location.pathname === '/') {
      items.push({
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: location.href,
      });
    }

    if (items.length) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb-jsonld', 'true');
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      });
      document.head.appendChild(script);
    }
  }

  // FAQPage JSON-LD (cuando hay FAQs)
  const faqSection = Array.from(document.querySelectorAll('section')).find((section) => {
    const heading = section.querySelector('h2');
    if (!heading) return false;
    const text = heading.textContent?.toLowerCase() || '';
    return text.includes('preguntas frecuentes') || text.includes('dudas comunes');
  });

  if (faqSection) {
    const faqDetails = faqSection.querySelectorAll('details');
    if (faqDetails.length) {
      const faqItems = Array.from(faqDetails).map((detail) => {
        const question = detail.querySelector('summary')?.textContent?.trim() || '';
        const answer = detail.querySelector('p')?.textContent?.trim() || '';
        return question && answer
          ? {
              '@type': 'Question',
              name: question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: answer,
              },
            }
          : null;
      }).filter(Boolean);

      if (faqItems.length) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems,
        });
        document.head.appendChild(script);
      }
    }
  }

  // Ads (requiere meta de cliente y slots configurados)
  const adsenseClient = document.querySelector('meta[name="adsense-client"]')?.getAttribute('content');
  const adSlots = document.querySelectorAll('[data-ad-slot]');
  if (adsenseClient && adSlots.length) {
    if (!document.querySelector('script[data-adsense]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-adsense', 'true');
      document.head.appendChild(script);
    }

    adSlots.forEach((slot) => {
      const slotId = slot.getAttribute('data-adsense-slot');
      if (!slotId) return;
      if (slot.querySelector('ins.adsbygoogle')) return;
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', adsenseClient);
      ins.setAttribute('data-ad-slot', slotId);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      slot.appendChild(ins);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // ignorar
      }
    });
  }

  // Ocultar espacios vacíos de anuncios
  if (adSlots.length) {
    setTimeout(() => {
      adSlots.forEach((slot) => {
        const hasContent = slot.querySelector('iframe, ins.adsbygoogle');
        if (!hasContent) slot.classList.add('is-empty');
      });
    }, 1500);
  }
})();

