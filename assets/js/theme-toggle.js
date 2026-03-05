/**
 * Kirari Theme Toggle — 3-state: light / dark / auto
 */
;(function () {
  const STORAGE_KEY = 'kirari-theme-mode';
  const MODES = ['light', 'dark', 'auto'];
  const html = document.documentElement;

  function getStoredMode() {
    return localStorage.getItem(STORAGE_KEY) || 'auto';
  }

  function applyMode(mode) {
    localStorage.setItem(STORAGE_KEY, mode);

    if (mode === 'dark') {
      html.classList.add('dark');
    } else if (mode === 'light') {
      html.classList.remove('dark');
    } else {
      // auto
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    updateIcons(mode);
    updateSettingsButtons(mode);
  }

  function updateIcons(mode) {
    const btn = document.getElementById('btn-theme-toggle');
    if (!btn) return;
    btn.setAttribute('data-theme-mode', mode);
    btn.querySelectorAll('.theme-icon').forEach(el => el.classList.add('hidden'));
    const target = btn.querySelector('.theme-icon-' + mode);
    if (target) target.classList.remove('hidden');
  }

  function updateSettingsButtons(mode) {
    document.querySelectorAll('.theme-mode-btn').forEach(btn => {
      const m = btn.getAttribute('data-set-theme');
      if (m === mode) {
        btn.classList.add('ring-2', 'ring-[var(--primary)]');
      } else {
        btn.classList.remove('ring-2', 'ring-[var(--primary)]');
      }
    });
  }

  function cycleMode() {
    const current = getStoredMode();
    const idx = MODES.indexOf(current);
    const next = MODES[(idx + 1) % MODES.length];
    applyMode(next);
  }

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    applyMode(getStoredMode());

    // Toggle button click
    const btn = document.getElementById('btn-theme-toggle');
    if (btn) btn.addEventListener('click', cycleMode);

    // Settings panel buttons
    document.querySelectorAll('.theme-mode-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const mode = this.getAttribute('data-set-theme');
        if (mode) applyMode(mode);
      });
    });

    // Listen for system preference changes when in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (getStoredMode() === 'auto') {
        applyMode('auto');
      }
    });

    // Hue slider
    const hueSlider = document.getElementById('hue-slider');
    if (hueSlider) {
      const storedHue = localStorage.getItem('kirari-hue');
      if (storedHue) hueSlider.value = storedHue;

      hueSlider.addEventListener('input', function () {
        const hue = this.value;
        html.style.setProperty('--hue', hue);
        localStorage.setItem('kirari-hue', hue);
      });
    }
  });
})();
