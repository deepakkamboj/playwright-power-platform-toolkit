# Playwright Power Platform Toolkit - Documentation Site

This package contains the documentation website built with [Nextra](https://nextra.site/).

## Development

```bash
# Install dependencies (from root)
rush install

# Start development server
cd packages/docs
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the documentation.

## Building

```bash
# Build the documentation site
npm run build

# Start production server
npm run start
```

## Deployment

The documentation can be deployed to any static hosting service:

```bash
# Export static site
npm run export

# The output will be in the 'out' directory
```

## Structure

```
docs/
├── pages/              # Documentation pages
│   ├── guide/         # User guides and tutorials
│   ├── api/           # API reference
│   └── index.mdx      # Homepage
├── public/            # Static assets
├── theme.config.tsx   # Nextra theme configuration
└── next.config.mjs    # Next.js configuration
```

## Adding Content

### New Guide Page

1. Create a new `.mdx` file in `pages/guide/`
2. Add the page to `pages/guide/_meta.json`

### New API Documentation

1. Create a new `.mdx` file in `pages/api/`
2. Add the page to `pages/api/_meta.json`

## Features

- ✅ Full-text search
- ✅ Sidebar navigation
- ✅ Table of contents
- ✅ Dark mode
- ✅ Mobile responsive
- ✅ Syntax highlighting
- ✅ MDX support
