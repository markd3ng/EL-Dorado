let bodyOsInitialized = false;

function initOverlayScrollbars() {
    if (typeof window.OverlayScrollbarsGlobal === 'undefined') {
        console.error('OverlayScrollbars is not loaded.');
        return;
    }

    const { OverlayScrollbars } = window.OverlayScrollbarsGlobal;

    // Initialize on body only once
    if (!bodyOsInitialized) {
        OverlayScrollbars(document.body, {
            scrollbars: {
                theme: 'os-theme-dark',
                autoHide: 'scroll',
                clickScroll: true
            },
        });
        bodyOsInitialized = true;
    }

    // Initialize on TOC
    const tocNav = document.querySelector('.toc-nav');
    if (tocNav) {
        OverlayScrollbars(tocNav, {
            scrollbars: {
                theme: 'os-theme-dark',
                autoHide: 'scroll',
                clickScroll: true
            },
        });
    }

    // Initialize on code blocks (the inner pre or highlight depending on structure)
    const codeBlocks = document.querySelectorAll('.highlight, .code-block-wrapper, pre');
    codeBlocks.forEach(block => {
        // only if the block can actually scroll horizontally
        OverlayScrollbars(block, {
            scrollbars: {
                theme: 'os-theme-dark',
                autoHide: 'leave',
                clickScroll: true
            },
        });
    });
}

document.addEventListener('DOMContentLoaded', initOverlayScrollbars);
document.addEventListener('kirari:init', initOverlayScrollbars);
