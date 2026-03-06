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
