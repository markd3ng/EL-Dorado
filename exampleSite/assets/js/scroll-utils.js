/**
 * Kirari Scroll Utilities — back-to-top button
 */
;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    let ticking = false;

    function checkScroll() {
      if (window.scrollY > 300) {
        btn.classList.add('show');
        btn.classList.remove('hide');
      } else {
        btn.classList.remove('show');
        btn.classList.add('hide');
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    checkScroll();
  });
})();
