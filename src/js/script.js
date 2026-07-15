document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const searchInput = document.getElementById('site-search');

  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    darkModeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
    localStorage.setItem('fluxus-theme', theme);
  };

  setTheme(localStorage.getItem('fluxus-theme') || 'dark');

  darkModeToggle.addEventListener('click', () => {
    setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
  });

  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.textContent = open ? '×' : '☰';
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.textContent = '☰';
    });
  });

  const revealElements = () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 90) el.classList.add('active');
    });
  };
  window.addEventListener('scroll', revealElements, { passive: true });
  revealElements();

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a')];

  const updateActiveNav = () => {
    let current = sections[0]?.id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 130) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  if (searchInput) {
    searchInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;

      document.querySelectorAll('.search-hit').forEach((el) => el.classList.remove('search-hit'));
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      const candidates = [...document.querySelectorAll('section, article')];
      const found = candidates.find((el) => el.innerText.toLowerCase().includes(query));

      if (found) {
        found.classList.add('search-hit');
        found.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});
