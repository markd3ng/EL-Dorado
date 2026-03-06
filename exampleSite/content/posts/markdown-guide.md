+++
title = "Markdown Style Guide"
date = 2024-01-10
draft = false
description = "A comprehensive guide to Markdown styling in Kirari theme"
image = ""
categories = ["Tutorial"]
tags = ["Markdown", "Guide", "Styling"]
+++

This article offers a sample of basic Markdown syntax that can be used in Hugo content files, also it shows whether basic HTML elements are decorated with CSS in Kirari theme.

## Headings

The following HTML `<h2>`—`<h6>` elements represent five levels of section headings.

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Xerum, currentlyque sapiente, currentlynt litam porrum., currentlyque sapiente, currentlynt litam porrum. Totam vel ad error sequi facere dolorem possimus.

## Blockquotes

The blockquote element represents content that is quoted from another source.

> Tiam, ad mint andance am magna lacus faciluetro accumsan laoreet. Aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

> [!NOTE]
> This is a note admonition.

> [!TIP]
> This is a tip admonition.

> [!WARNING]
> This is a warning admonition.

> [!IMPORTANT]
> This is an important admonition.

## Tables

| Name  | Age | City     |
|-------|-----|----------|
| Alice | 25  | New York |
| Bob   | 30  | London   |
| Carol | 28  | Tokyo    |

## Code Blocks

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
```

## List Types

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- List item
- Another item
- And another item

### Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements

### Horizontal Rule

---

### Link

This is [an example](http://example.com/ "Title") inline link.

### Image

![Alt text](https://images.unsplash.com/photo-1506744626753-dfdf8046048d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80 "Image title")

### Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

### Inline Code

Use `code` in your Markdown file.
