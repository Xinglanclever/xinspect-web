(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const revealSelector = [
    '.hero-content > *', '.truth-banner', '.section-block', '.evidence-section',
    '.privacy-section', '.download-section', '.ai-status-card', '.privacy-card',
    '.requirements-card', '.download-card', '.report-panel', '.support-card',
    '.metric-card', '.feature-card', '.source-item', '.evidence-card',
    '.status-panel', '.trust-panel', '.privacy-points > div', '.doc-card',
    '.history-item', '.verification-card'
  ].join(', ');
  const staggerGroups = [
    '.metric-grid', '.feature-grid', '.source-list', '.evidence-grid',
    '.status-trust-grid', '.privacy-points', '.doc-grid', '.history-list',
    '.verification-grid'
  ];

  // Add a purely decorative progress indicator; scrolling never changes content.
  const progress = document.createElement('div');
  progress.className = 'motion-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  let ticking = false;
  const updateProgress = () => {
    ticking = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // Only hide elements after the observer exists; without JS the CSS never hides content.
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    document.querySelectorAll(revealSelector).forEach((el) => el.classList.add('is-motion-visible'));
    return;
  }

  root.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-motion-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll(revealSelector).forEach((el) => revealObserver.observe(el));
  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      revealObserver.observe(group);
      group.querySelectorAll(':scope > *').forEach((item) => revealObserver.observe(item));
    });
  });

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-scroll-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => navObserver.observe(section));
  }

  // Keep keyboard and click navigation feedback aligned with the same active state.
  navLinks.forEach((link) => link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.toggle('is-scroll-active', item === link));
  }));
})();
