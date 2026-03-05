/**
 * Kirari Navbar — auto-hide on scroll down, show on scroll up
 * Also handles mobile menu and display settings panels
 */
; (function () {
  document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            navbar.classList.add('hidden-up');
          } else {
            navbar.classList.remove('hidden-up');
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu panel
    const menuToggle = document.getElementById('btn-menu-toggle');
    const menuClose = document.getElementById('btn-menu-close');
    const menuOverlay = document.getElementById('nav-menu-overlay');
    const menuPanel = document.getElementById('nav-menu-panel');

    function openMenu() {
      if (!menuOverlay || !menuPanel) return;
      menuOverlay.classList.remove('hidden');
      menuOverlay.classList.add('show');
      menuPanel.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      if (!menuOverlay || !menuPanel) return;
      menuOverlay.classList.add('hidden');
      menuOverlay.classList.remove('show');
      menuPanel.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // Display settings panel
    const settingsBtn = document.getElementById('btn-display-settings');
    const settingsClose = document.getElementById('btn-display-settings-close');
    const settingsOverlay = document.getElementById('display-settings-overlay');
    const settingsPanel = document.getElementById('display-settings-panel');

    function openSettings() {
      if (!settingsOverlay || !settingsPanel) return;
      settingsOverlay.classList.remove('hidden');
      settingsOverlay.classList.add('show');
      settingsPanel.classList.remove('translate-x-full');
    }
    function closeSettings() {
      if (!settingsOverlay || !settingsPanel) return;
      settingsOverlay.classList.add('hidden');
      settingsOverlay.classList.remove('show');
      settingsPanel.classList.add('translate-x-full');
    }

    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
    if (settingsClose) settingsClose.addEventListener('click', closeSettings);
    if (settingsOverlay) settingsOverlay.addEventListener('click', closeSettings);

    // Mobile search panel
    const searchBtn = document.getElementById('btn-search-mobile');
    const searchOverlay = document.getElementById('search-overlay');
    const searchPanel = document.getElementById('search-panel');

    function openSearch() {
      if (!searchOverlay || !searchPanel) return;
      searchOverlay.classList.remove('hidden');
      searchOverlay.classList.add('show');
      searchPanel.classList.remove('float-panel-closed');
      const input = document.getElementById('search-input-mobile');
      if (input) setTimeout(() => input.focus(), 100);
    }
    function closeSearch() {
      if (!searchOverlay || !searchPanel) return;
      searchOverlay.classList.add('hidden');
      searchOverlay.classList.remove('show');
      searchPanel.classList.add('float-panel-closed');
    }

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

    // Escape key closes all panels
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
        closeSettings();
        closeSearch();
      }
    });
  });
})();
