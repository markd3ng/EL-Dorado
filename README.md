# Kirari - Hugo Theme

A beautiful, modern Hugo theme inspired by [Kirari](https://github.com/markd3ng/KIRARI) Astro theme.

![Kirari Theme](https://kirari-astro.vercel.app/)

## Features

- Clean, modern design with smooth animations
- Dark / Light / Auto theme switching
- Fully responsive layout
- Full-text search with Pagefind
- Smooth Image Lightbox (PhotoSwipe)
- Table of Contents with scroll highlighting
- Categories and Tags taxonomy
- Archive page with timeline view
- Friends page for blogroll
- Giscus / Waline comments support
- i18n support (English, Chinese, Japanese)
- Tailwind CSS v4 integration
- Hugo v0.146+ new template system
- AI-friendly content generation (`llms.txt` support)

## Requirements

- Hugo Extended v0.146.0 or later
- Node.js 18+ (for Tailwind CSS)

## Installation

### Method 1: Git Submodule

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/kirari themes/kirari
```

### Method 2: Hugo Modules

Add to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/yourusername/kirari"
```

Then run:

```bash
hugo mod get -u
```

### Method 3: Manual Download

Download and extract the theme to `themes/kirari`.

## Quick Start

1. Copy `exampleSite/hugo.toml` to your site root
2. Customize the configuration
3. Create content in `content/posts/`
4. Run `hugo server`

## Configuration

See `exampleSite/hugo.toml` for full configuration options.

### Basic Configuration

```toml
baseURL = "https://example.com"
languageCode = "en"
title = "My Blog"
theme = "kirari"

[params]
  subtitle = "A blog about things"
  
  [params.profile]
    author = "Your Name"
    description = "Your bio here"
    avatar = "/images/avatar.jpg"
```

### Menu Configuration

```toml
[[menus.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menus.main]]
  name = "Archive"
  url = "/archive/"
  weight = 2

[[menus.main]]
  name = "About"
  url = "/about/"
  weight = 3
```

### Comments (Giscus)

```toml
[params.comments]
  provider = "giscus"
  
  [params.comments.giscus]
    repo = "username/repo"
    repoId = "your-repo-id"
    category = "Announcements"
    categoryId = "your-category-id"
```

## Content Structure

```
content/
├── _index.md
├── about.md
├── archive.md
├── friends.md
└── posts/
    ├── _index.md
    ├── hello-world.md
    └── another-post.md
```

### Post Front Matter

```yaml
+++
title = "My Post Title"
date = 2024-01-15
draft = false
description = "A brief description"
image = "/images/cover.jpg"
categories = ["Blog"]
tags = ["Hugo", "Tutorial"]
toc = true
+++
```

## Friends Page

Create `data/friends.yaml`:

```yaml
- name: "Friend Name"
  url: "https://example.com"
  avatar: "https://example.com/avatar.jpg"
  description: "Friend's blog description"
```

## Shortcodes

### Note

```markdown
{{</* note type="info" */>}}
This is an info note.
{{</* /note */>}}
```

Types: `info`, `warning`, `danger`, `tip`

### Friend Links

```markdown
{{</* friend-links */>}}
```

## Usage Guide

For more advanced features and detailed usage instructions, such as enabling `llms.txt` generation, please refer to our [Usage Guide](usage.md).

## Development

```bash
cd exampleSite
hugo server --themesDir ../..
```

## Credits

- Original Kirari theme by [markd3ng](https://github.com/markd3ng/KIRARI)
- Based on [Fuwari](https://github.com/saicaca/fuwari) by saicaca
- Icons from [Material Design Icons](https://pictogrammers.com/library/mdi/)

## License

MIT License
