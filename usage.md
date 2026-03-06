# Kirari Hugo Theme - Usage Guide

This guide provides detailed instructions on how to configure and use the advanced features included in the Kirari Hugo theme.

## AI-Friendly Content Generation (`llms.txt`)

The Kirari theme now supports generating an `llms.txt` file. This is a plain-text structure of your site designed specifically for Large Language Model (LLM) agents, crawlers, and read-it-later tools. It makes your site's content more accessible for AI processing, enhancing your site's SEO in the AI space.

### 1. Enable Configuration

To enable the generation of `llms.txt`, you need to configure your site's `hugo.toml` (or `config.toml`) file. Add the following custom output format settings:

```toml
[outputFormats]
  [outputFormats.llms]
    mediaType = "text/plain"
    baseName = "llms"
    isPlainText = true

[outputs]
  # Make sure "llms" is included in your home outputs
  home = ["HTML", "RSS", "llms"]
```

### 2. Verify Generation

After updating your configuration, run your hugo build command:

```bash
hugo
```

You should see an `llms.txt` file generated in your `public/` directory (e.g. `public/llms.txt`). The file contains your site title, description, and an aggregated list of your regular posts with their URL, publication date, description, and plain text content. 

This file will now be available under your root domain (e.g., `https://yoursite.com/llms.txt`), providing LLM crawlers direct access to your well-structured content!

## Smooth Image Lightbox (PhotoSwipe)

The Kirari theme integrates **PhotoSwipe** for a seamless, immersive image viewing experience directly within your blog posts.

### How to use

There is **no configuration needed**! The feature is enabled by default. 

Whenever you insert a standard Markdown image into your posts:

```markdown
![My awesome image](/images/awesome-photo.jpg)
```

The theme will automatically wrap the image with PhotoSwipe functionality. When users click on the image in a post, it will smoothly zoom into a full-screen, gesture-supported lightbox equipped with an immersive dark overlay.

- Images are optimally scaled but maintain natural aspect ratios.
- The lightbox automatically adapts to mobile constraints with swipe-to-close capabilities.

## Mac-Style Geek Code Blocks

The Kirari theme completely revamps default Hugo code blocks to provide a more functional and aesthetically pleasing experience. 

### Features Include:
- **Mac-style Controls**: Added red, yellow, and green window buttons to the top-left of each code block.
- **Language & Title display**: At the top bar, you will see the language (e.g. `html` or `ts`) or custom title of the code block.
- **One-click Copy**: Hovering over the code block reveals a sleek copy-to-clipboard button. When clicked, it copies the code and transforms into a green checkmark to confirm success.
- **Smart Expand/Collapse**: Super-long code blocks are automatically constrained in height to maintain a clean reading experience, fading into a gradient. Users can simply click the "Expand" button to reveal the whole snippet without needing to scroll endlessly.

### How to use
As long as you use standard Markdown syntax (optionally providing a language identifier) in your `posts/` content, the new engine handles the UI natively:

` ```html `
` <div>Hello World</div> `
` ``` `

## GitHub-Style Admonitions

The Kirari theme now natively supports GitHub-style admonitions using standard Markdown blockquotes. This allows you to easily create highlighted callout boxes for notes, warnings, quotes, and more, without needing shortcodes.

### How to use

Start a blockquote with a specific designator `[!TYPE]` on the first line. The theme will automatically render it as a styled card with an appropriate icon and color.

Supported types are:
- `[!NOTE]` (Default blue info style)
- `[!TIP]` (Green success style)
- `[!IMPORTANT]` (Orange warning style)
- `[!WARNING]` (Orange warning style)
- `[!CAUTION]` (Red danger style)

**Example:**

```markdown
> [!NOTE]
> This is a helpful note that provides extra context to the reader.
```

```markdown
> [!WARNING]
> Please be careful when executing this command!
```

If you do NOT include a designator, it will render as a standard, elegant blockquote:

```markdown
> This is a standard blockquote without an admonition title.
```
