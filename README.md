# DragonSword: Awakening Guides

A multilingual guide website for the game **DragonSword: Awakening**, providing reviews, guides, and reference content across 5 languages.

## Features

- **5 Languages**: English, Chinese (Simplified), Korean, Russian, Japanese
- **115 Pages**: Game reviews, character guides, weapon builds, and reference content
- **SEO Optimized**: hreflang tags, XML sitemap, robots.txt, semantic HTML
- **Static Site**: Pure HTML/CSS/JS, no build step required
- **Responsive**: Mobile-friendly layout

## Project Structure

```
.
├── index.html          # Homepage with language selection
├── en/                 # English pages
├── zh/                 # Chinese (Simplified) pages
├── ko/                 # Korean pages
├── ru/                 # Russian pages
├── ja/                 # Japanese pages
├── css/                # Stylesheets
├── js/                 # JavaScript
├── assets/             # Images and static assets
├── robots.txt          # Search engine rules
└── sitemap.xml         # Sitemap for SEO
```

## Local Development

### Prerequisites

- Python 3 (for local server) or any static file server

### Run Locally

```bash
# Clone the repository
git clone https://github.com/byte886/dragonsword-guides.git
cd dragonsword-guides

# Start local server
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser.

## Language Structure

Each language directory follows the same page structure:

| Page | Description |
|------|-------------|
| `index.html` | Language landing page |
| `review.html` | Game review |
| `characters/` | Character guides |
| `weapons/` | Weapon builds |
| `guides/` | Gameplay guides |

## SEO

- **hreflang**: Each page includes alternate language links
- **Sitemap**: `sitemap.xml` lists all 115 pages
- **Meta Tags**: Title, description, Open Graph on every page
- **Semantic HTML**: Proper H1-H4 heading hierarchy

## Game Info

- **Title**: DragonSword: Awakening
- **Platform**: PC (Steam)
- **Steam App ID**: 4570720

## License

This project is for educational and informational purposes.

## Contributing

Content corrections and translations are welcome. Please open an issue or pull request.
