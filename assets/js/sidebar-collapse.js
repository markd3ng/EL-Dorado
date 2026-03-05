/**
 * Kirari Sidebar Widget Collapse/Expand
 */
;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.widget-toggle');

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const widget = this.closest('[data-widget]');
        if (!widget) return;

        const content = widget.querySelector('.widget-content');
        const arrow = widget.querySelector('.widget-arrow');
        const expanded = this.getAttribute('aria-expanded') === 'true';

        if (expanded) {
          content.classList.add('collapsed');
          this.setAttribute('aria-expanded', 'false');
          if (arrow) arrow.style.transform = 'rotate(-90deg)';
        } else {
          content.classList.remove('collapsed');
          this.setAttribute('aria-expanded', 'true');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
        }
      });
    });
  });
})();
