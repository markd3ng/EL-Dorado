# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Virtual OverlayScrollbars (F-5)**: Integrated OverlayScrollbars to replace native thick browser scrollbars with sleek, thin, and auto-hiding scrollbars, matching a highly polished aesthetic. This applies to the document body, the table of contents sidebar, and horizontally scrollable code blocks.
- **GitHub-style Admonitions (F-4)**: Support for rendering GitHub-style admonitions via blockquotes natively (e.g. `> [!NOTE]`). Supported types: note, tip, warning, important, caution.
- **Mac-style Geek Code Blocks (F-3)**: Refined Hugo code blocks with rounded corners, syntax highlighting enhancements, and removal of intrusive buttons per user requirements to keep them minimalist and entirely dark-themed.
- **PhotoSwipe Integration (F-2)**: Added an immersive image lightbox feature for a seamless photo viewing experience with gesture and dark overlay support.
- **AI-Friendly SEO Content (F-1)**: Support for generating `llms.txt` automatically, optimizing structural content crawling for AI models.

### Removed
- **Clipboard/Copy JS for Code Blocks**: Removed complex JS wrappers and copy button clutter specifically to ensure minimal, pure dark theme code boxes in `F-3`.
