/**
 * Kirari Search — Pagefind integration
 * Falls back to a simple JSON index if Pagefind is not available
 */
;(function () {
  let pagefind = null;

  async function initPagefind() {
    try {
      pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
    } catch (e) {
      // Pagefind not available — will show "no results"
      pagefind = null;
    }
  }

  async function doSearch(query, resultsContainer) {
    if (!resultsContainer) return;

    if (!query || query.length < 2) {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.add('hidden');
      return;
    }

    resultsContainer.classList.remove('hidden');

    if (!pagefind) {
      resultsContainer.innerHTML = '<div class="p-3 text-sm text-50 text-center">Search index not available. Run <code>npx pagefind</code> after building.</div>';
      return;
    }

    try {
      const search = await pagefind.search(query);
      if (search.results.length === 0) {
        resultsContainer.innerHTML = '<div class="p-3 text-sm text-50 text-center">No results found</div>';
        return;
      }

      const results = await Promise.all(search.results.slice(0, 8).map(r => r.data()));
      let html = '';
      results.forEach(function (r) {
        html += '<a href="' + r.url + '" class="block p-3 rounded-lg no-underline hover:bg-[var(--btn-plain-bg-hover)] transition-colors">' +
          '<div class="text-sm font-medium text-90">' + r.meta.title + '</div>' +
          '<div class="text-xs text-50 mt-1 line-clamp-2">' + (r.excerpt || '') + '</div>' +
          '</a>';
      });
      resultsContainer.innerHTML = html;
    } catch (e) {
      resultsContainer.innerHTML = '<div class="p-3 text-sm text-50 text-center">Search error</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPagefind();

    // Desktop search
    const desktopInput = document.getElementById('search-input-desktop');
    const desktopResults = document.getElementById('search-results-desktop');
    if (desktopInput) {
      let debounceTimer;
      desktopInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const q = this.value.trim();
        debounceTimer = setTimeout(function () { doSearch(q, desktopResults); }, 200);
      });

      // Close desktop results on outside click
      document.addEventListener('click', function (e) {
        if (!desktopInput.contains(e.target) && desktopResults && !desktopResults.contains(e.target)) {
          desktopResults.classList.add('hidden');
        }
      });

      desktopInput.addEventListener('focus', function () {
        if (this.value.trim().length >= 2 && desktopResults) {
          desktopResults.classList.remove('hidden');
        }
      });
    }

    // Mobile search
    const mobileInput = document.getElementById('search-input-mobile');
    const mobileResults = document.getElementById('search-results-mobile');
    if (mobileInput) {
      let debounceTimer;
      mobileInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const q = this.value.trim();
        debounceTimer = setTimeout(function () { doSearch(q, mobileResults); }, 200);
      });
    }
  });
})();
