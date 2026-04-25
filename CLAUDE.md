# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

WHCH is a blog for sighthounds in Poland built with Astro 6 and Decap CMS. Content is authored via the Decap CMS admin UI at `/admin`, which commits markdown files to `src/content/posts/`. The site is deployed to GitHub Pages via GitHub Actions.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview production build locally
```

## Structure

```
src/
  content/
    config.ts          # Astro content collection schemas
    posts/             # Blog post markdown files (managed by Decap CMS)
  pages/
    blog/
      index.astro      # Blog listing at /blog
      [slug].astro     # Individual post pages at /blog/<slug>
  layouts/
    Layout.astro       # Base HTML layout
public/
  admin/
    index.html         # Decap CMS admin UI entry point
    config.yml         # Decap CMS configuration (fill in GitHub/OAuth placeholders)
.github/workflows/
  deploy.yml           # GitHub Actions deploy to GitHub Pages
docs/
  decap-cms-setup.md  # Manual setup steps for GitHub Pages + OAuth proxy
```

## Configuration Placeholders

`public/admin/config.yml` and `astro.config.mjs` contain placeholder values that must be filled in before deploying:
- `<GITHUB_USERNAME>` — GitHub account username
- `<REPO_NAME>` — GitHub repository name
- `<OAUTH_PROXY_URL>` — URL of the OAuth proxy for Decap CMS auth (see `docs/decap-cms-setup.md`)
