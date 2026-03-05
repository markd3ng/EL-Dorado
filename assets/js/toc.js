/**
 * Kirari TOC — scroll-based active heading highlight
 */
;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    // Get all links in the TOC
    const tocLinks = tocContainer.querySelectorAll('a');
    if (!tocLinks.length) return;

    // Add the toc-link class
    tocLinks.forEach(function (link) {
      link.classList.add('toc-link');
      link.classList.add('block', 'py-1', 'no-underline', 'transition-colors', 'duration-200');
    });

    // Build a map of heading IDs to their elements
    const headingIds = [];
    tocLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        headingIds.push(href.substring(1));
      }
    });

    function highlightActive() {
      let activeId = null;
      const scrollY = window.scrollY;
      const offset = 100; // account for navbar height

      for (let i = headingIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(headingIds[i]);
        if (el && el.offsetTop - offset <= scrollY) {
          activeId = headingIds[i];
          break;
        }
      }

      tocLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === '#' + activeId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          highlightActive();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial highlight
    highlightActive();
  });
})();
