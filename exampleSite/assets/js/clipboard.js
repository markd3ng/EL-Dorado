document.addEventListener('DOMContentLoaded', () => {
    // Copy functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const codeBlock = btn.closest('.code-block');
            if (!codeBlock) return;

            // Hugo's syntax highlighter normally wraps the code in pre > code or table > pre > code
            // But we can extract text via traversing the inner container
            const pre = codeBlock.querySelector('pre');
            if (!pre) return;

            const textToCopy = pre.textContent || pre.innerText || "";

            try {
                await navigator.clipboard.writeText(textToCopy.trimEnd());

                // Show check mark
                const iconCopy = btn.querySelector('.icon-copy');
                const iconCheck = btn.querySelector('.icon-check');
                const copyText = btn.querySelector('.copy-text');

                if (iconCopy && iconCheck) {
                    iconCopy.classList.add('hidden');
                    iconCheck.classList.remove('hidden');
                    if (copyText) copyText.textContent = 'Copied!';

                    setTimeout(() => {
                        iconCopy.classList.remove('hidden');
                        iconCheck.classList.add('hidden');
                        if (copyText) copyText.textContent = 'Copy';
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // Code expansion functionality
    document.querySelectorAll('.code-block').forEach(block => {
        const scrollable = block.querySelector('.code-scrollable');
        const expandBtn = block.querySelector('.code-expand-btn');
        if (!scrollable || !expandBtn) return;

        const checkOverflow = () => {
            // Check if scroll height is meaningfully larger
            const isOverflowing = scrollable.scrollHeight > scrollable.clientHeight + 10 && scrollable.clientHeight > 0;
            if (isOverflowing && !block.classList.contains('is-expanded')) {
                expandBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else if (!isOverflowing && !block.classList.contains('is-expanded')) {
                expandBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        };

        // Delay checking to allow syntax highlighting or web fonts to render
        setTimeout(checkOverflow, 100);
        window.addEventListener('resize', checkOverflow);

        expandBtn.addEventListener('click', () => {
            const isExpanded = block.classList.contains('is-expanded');
            const spanText = expandBtn.querySelector('span');
            const iconSvg = expandBtn.querySelector('.icon-expand');

            if (isExpanded) {
                // Collapse
                block.classList.remove('is-expanded');
                scrollable.style.maxHeight = '';
                expandBtn.classList.add('code-expand-gradient', 'pt-16');
                expandBtn.classList.remove('pb-4');
                expandBtn.classList.add('pb-2');

                if (spanText) spanText.textContent = 'Expand';
                if (iconSvg) iconSvg.innerHTML = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>';

                // Scroll back up if needed
                const rect = block.getBoundingClientRect();
                if (rect.top < 0) {
                    window.scrollBy({ top: rect.top - 80, behavior: 'smooth' });
                }
            } else {
                // Expand
                block.classList.add('is-expanded');
                scrollable.style.maxHeight = `${scrollable.scrollHeight}px`;

                // Remove gradient for collapse button
                expandBtn.classList.remove('code-expand-gradient', 'pt-16');
                expandBtn.classList.remove('pb-2');
                expandBtn.classList.add('pb-4');

                if (spanText) spanText.textContent = 'Collapse';
                if (iconSvg) iconSvg.innerHTML = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 15l-6-6l-6 6"/>';

                setTimeout(() => {
                    if (block.classList.contains('is-expanded')) {
                        scrollable.style.maxHeight = 'none';
                    }
                }, 500);
            }
        });
    });
});
