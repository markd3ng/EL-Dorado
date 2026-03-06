/**
 * Kirari TOC — scroll-based active heading highlight
 */
; (function () {
  let scrollListenerAdded = false;
  let currentTocLinks = [];
  let currentHeadingIds = [];

  function initToc() {
    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const tocLinks = tocContainer.querySelectorAll('a');
    if (!tocLinks.length) return;

    tocLinks.forEach(function (link) {
      link.classList.add('toc-link', 'block', 'py-1', 'no-underline', 'transition-colors', 'duration-200');
    });

    currentHeadingIds = [];
    currentTocLinks = tocLinks;

    tocLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        currentHeadingIds.push(href.substring(1));
      }
    });

    highlightActive();

    if (!scrollListenerAdded) {
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
      scrollListenerAdded = true;
    }
  }

  function highlightActive() {
    let activeId = null;
    const scrollY = window.scrollY;
    const offset = 100;

    for (let i = currentHeadingIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(currentHeadingIds[i]);
      if (el && el.offsetTop - offset <= scrollY) {
        activeId = currentHeadingIds[i];
        break;
      }
    }

    currentTocLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initToc);
  document.addEventListener('kirari:init', initToc);
})();
