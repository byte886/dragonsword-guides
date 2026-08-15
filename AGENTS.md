# AGENTS.md - Website Code Rules

Static HTML/CSS/JS site. No frameworks, no build step, no bundler.

## Stack

- Pure HTML5 + CSS3 + vanilla JS
- No npm dependencies, no node_modules
- Third-party scripts (GA, etc.) loaded via external JS files in `js/`, never inlined

## File Structure

```
index.html              # English homepage (root)
en/ ja/ ko/ ru/ zh/     # Language directories, each contains .html pages
css/style.css           # All styles
js/main.js              # Site functionality
js/analytics.js         # Google Analytics (single source of truth for Measurement ID)
assets/                 # Images, favicons
robots.txt
sitemap.xml
```

## Path Conventions

- Root-level HTML: `css/style.css`, `js/main.js`, `js/analytics.js`
- Subdirectory HTML (en/, ja/, etc.): `../css/style.css`, `../js/main.js`, `../js/analytics.js`
- Use relative paths consistently. Do not mix absolute and relative paths.

## HTML Rules

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- Every page must have unique `<title>` and `<meta name="description">`
- Every page must have `<link rel="canonical" href="https://ds-guides.wiki/...">` matching its actual URL (subpages include language dir, e.g. `/en/beginner-guide.html`)
- Include hreflang tags for all 5 language versions
- One `<h1>` per page; proper heading hierarchy (h1 > h2 > h3)
- `<meta charset="UTF-8">` in `<head>`
- Images must have descriptive `alt` text
- Third-party scripts go in `<head>` with `defer` or `async`

## JavaScript Rules

- Comments in English only
- No inline scripts in HTML; put code in external .js files
- Use IIFE or ES modules; do not pollute global scope
- `js/analytics.js` is the single file to update when GA Measurement ID changes
- Cache-bust with `?v=N` query param when updating CSS/JS (e.g., `js/main.js?v=3`)

## CSS Rules

- All styles in `css/style.css`
- Use CSS custom properties for colors and repeated values
- Mobile-first responsive design
- No inline `style` attributes unless dynamically set by JS

## Multi-language

- 5 languages: English (en/), Japanese (ja/), Korean (ko/), Russian (ru/), Chinese (zh/)
- Each language directory mirrors the same page filenames
- hreflang annotations must link all language versions including self

## SEO Checklist (every page)

- `<title>` under 60 chars, unique, includes target keyword
- `<meta name="description">` under 160 chars
- Canonical URL pointing to `https://ds-guides.wiki/`
- Open Graph tags for social sharing
- hreflang for all language versions
- Sitemap in `sitemap.xml`, disallow rules in `robots.txt`

## Git

- Commit messages: `type: description` (feat, fix, chore, style, refactor)
- Never commit .DS_Store, Thumbs.db, or editor config
- Never commit project docs (.md files except README.md) into this directory
