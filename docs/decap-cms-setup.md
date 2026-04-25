# Decap CMS Setup Guide

This guide documents how Decap CMS is integrated with this Astro blog and what manual steps are required to make it fully operational.

---

## How It Works

1. **Decap CMS** provides a web UI at `/admin` where you can write and publish blog posts.
2. When you save a post, Decap commits a markdown file to `src/content/posts/` in the GitHub repo.
3. **GitHub Actions** detects the new commit, runs `npm run build`, and deploys the updated site to GitHub Pages.

---

## Files Added by This Setup

| File | Purpose |
|------|---------|
| `public/admin/index.html` | Loads the Decap CMS UI (served at `/admin`) |
| `public/admin/config.yml` | Tells Decap where to read/write content |
| `src/content/config.ts` | Astro schema for blog posts |
| `src/content/posts/` | Folder where blog post markdown files live |
| `src/pages/blog/index.astro` | Blog listing page at `/blog` |
| `src/pages/blog/[slug].astro` | Individual post pages at `/blog/<slug>` |
| `astro.config.mjs` | Astro config with GitHub Pages `site` and `base` |
| `.github/workflows/deploy.yml` | Auto-deploys to GitHub Pages on every push |

---

## Manual Steps Required

These cannot be automated — you need to do them yourself once.

### Step 1: Create the GitHub Repository

If you haven't already, create a repo on GitHub and push this project:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### Step 3: Fill in Placeholders in Config Files

Edit `public/admin/config.yml` and replace:
- `<GITHUB_USERNAME>` — your GitHub username (e.g. `scoobek`)
- `<REPO_NAME>` — your repository name (e.g. `WHCH`)
- `<OAUTH_PROXY_URL>` — URL of your OAuth proxy (see Step 4)

Edit `astro.config.mjs` and replace:
- `<GITHUB_USERNAME>` — your GitHub username
- `<REPO_NAME>` — your repository name (omit the `base` line if using a custom domain)

### Step 4: Set Up the OAuth Proxy

GitHub Pages cannot run server-side code, so Decap CMS needs an external OAuth proxy to authenticate with GitHub.

**Recommended: deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) as a Cloudflare Worker (free)**

1. Clone the `sveltia-cms-auth` repository
2. Follow its README to create a GitHub OAuth App:
   - Go to GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App
   - **Homepage URL**: `https://<YOUR_USERNAME>.github.io/<YOUR_REPO>`
   - **Authorization callback URL**: `https://<YOUR_WORKER>.workers.dev/callback`
3. Deploy the worker to Cloudflare (free tier is sufficient)
4. Set the worker URL as `base_url` in `public/admin/config.yml`

### Step 5: Verify

- Push your changes to `main`
- Wait for the GitHub Actions deploy to complete
- Visit `https://<YOUR_USERNAME>.github.io/<YOUR_REPO>/admin/`
- Log in with your GitHub account
- Create a test blog post and publish it
- The GitHub Actions workflow will run automatically — the post will appear on the site after it completes (usually ~1–2 minutes)

---

## Local Development

The CMS admin login does **not** work locally (OAuth requires the deployed URL). But you can:

- Run `npm run dev` and preview the blog at `http://localhost:4321/blog/`
- Add markdown files manually to `src/content/posts/` to test layout and content rendering
- The build (`npm run build`) must pass before deploying

---

## Blog Post Frontmatter

Each post in `src/content/posts/` must have this frontmatter (Decap handles it automatically):

```markdown
---
title: "Your Post Title"
pubDate: 2026-04-24
description: "Optional short description"
heroImage: "/images/uploads/optional-cover.jpg"
---

Post body goes here...
```

---

## Troubleshooting

**Admin page is blank / JS errors**: Check browser console. Usually means the Decap CDN script failed to load or `config.yml` has a YAML syntax error.

**"Not Found" error when logging in**: The `base_url` in `config.yml` is wrong or the OAuth proxy isn't deployed correctly.

**Posts not appearing after publishing**: Check the GitHub Actions tab in your repo for build errors.
