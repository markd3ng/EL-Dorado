import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.4.3/dist/photoswipe-lightbox.esm.js';

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.prose img');
    if (images.length === 0) return;

    // Add cursor style to signify it's clickable
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        // To ensure images don't exceed container
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });

    const lightbox = new PhotoSwipeLightbox({
        gallery: '.prose',
        children: 'img',
        pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.3/dist/photoswipe.esm.js'),
        bgOpacity: 0.85,
        padding: { top: 20, bottom: 20, left: 20, right: 20 }
    });

    lightbox.addFilter('itemData', (itemData, index) => {
        const img = itemData.element;
        if (img) {
            // If image doesn't have native width initially, fallback to window dimensions or fixed sizes
            itemData.src = img.src || img.getAttribute('src');
            itemData.w = img.naturalWidth || 1200;
            itemData.h = img.naturalHeight || 800;
            itemData.msrc = img.src;
            itemData.alt = img.alt;
        }
        return itemData;
    });

    // Handle case where image dimension might change after opening if it wasn't fully loaded
    lightbox.on('contentLoad', (e) => {
        const { content, index } = e;
        if (content.type === 'image' && content.element) {
            const img = content.element;
            if (img.naturalWidth > 0 && (content.data.w !== img.naturalWidth || content.data.h !== img.naturalHeight)) {
                content.data.w = img.naturalWidth;
                content.data.h = img.naturalHeight;
                lightbox.pswp.refreshSlideContent(index);
            }
        }
    });

    lightbox.init();
});
