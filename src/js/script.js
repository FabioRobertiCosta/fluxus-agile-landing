document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}