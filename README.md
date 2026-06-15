# Portfolio Template

A clean, fast personal site — an online CV, project showcase, and resource
library — that you update by editing plain text files. Built with
[Astro](https://astro.build) and designed to host **free** on Cloudflare, with
automatic deploys every time you push a change.

No database, no CMS, no monthly bill. If you can edit a text file, you can run
this site.

> **New here?** The companion article *"How I Built This Site"* walks through
> the whole thing in plain English. This README is the reference.

---

## Quick start

### 1. Make your own copy

Click **“Use this template” → “Create a new repository”** at the top of this
repo's GitHub page. That gives you your own copy to edit — no need to fork or
clone anything by hand. (Prefer the command line? Clone it instead.)

### 2. Run it locally (optional but recommended)

You'll need [Node.js](https://nodejs.org) v22.12+.

```bash
npm install     # first time only
npm run dev     # starts a live preview at http://localhost:4321
```

The site reloads as you save. You can also skip this and edit files directly on
GitHub — Cloudflare will build it for you.

### 3. Make it yours

Work through this checklist and you're done:

- [ ] Edit **`src/site.config.ts`** — your name, title, bio, links, skills, datasheet.
- [ ] Replace the example files in **`src/content/projects/`**, **`resources/`**, and **`ventures/`** with your own (delete the `example-*` ones).
- [ ] Add your CV at **`public/cv.pdf`** (or point `cv.strategy` elsewhere — see below).
- [ ] Add a photo at **`public/me.jpg`** (optional — a placeholder shows otherwise).
- [ ] Update the favicon initials and colour in **`src/layouts/Base.astro`** (search for `YN`).
- [ ] Deploy (see [Deployment](#deployment)).

---

## Personalising — `src/site.config.ts`

This one file holds all the text content: identity, hero, social links, the
hero "datasheet" card, the about facts and bio, skills, the footer note, and
SEO tags. It's commented throughout. You shouldn't need to touch the page
templates (`src/pages/index.astro`, `src/layouts/Base.astro`) unless you're
changing the layout itself.

Colours and fonts live in **`src/styles/global.css`** at the top (the `:root`
and `[data-theme="dark"]` blocks). Change `--accent` to recolour the whole site.

---

## Adding content

Each project, resource, and venture is a Markdown file with a small frontmatter
block. **Add a file → a card appears.** Delete the `example-*` files once you've
got the idea.

> **Full authoring reference:** [WRITING-CONTENT.md](WRITING-CONTENT.md) covers
> every content type and Markdown feature — captioned images, syntax-highlighted
> code, task lists, footnotes, and automatic touches like reading-time, drop
> caps, and a table of contents. The tables below are the quick version.

### Projects — `src/content/projects/`

```yaml
title: My Project
description: One sentence for the card and page header.
type: build            # build | guide | document | wip
tags: [Tag, Tag]
date: "2025-06"        # "YYYY-MM" — newest first
featured: false        # true pins it to the front
draft: false           # true hides it
# repo: https://github.com/...     # optional button
# youtube: https://youtube.com/...  # optional button
```

The filename becomes the URL (`my-project.md` → `/projects/my-project`).

### Resources — `src/content/resources/`

Resources resolve three ways, in priority order:

| Frontmatter | Card behaviour |
|-------------|----------------|
| `file: thing.pdf` | **Download** button (file goes in `public/files/`) |
| `url: https://…` | **Open ↗** link to anything hosted elsewhere |
| neither | A readable **page** is generated, card shows **Read →** |

```yaml
title: My Resource
description: One sentence.
type: guide            # template | checklist | guide | config
tags: [Tag]
updated: "Jun 2025"    # "Mon YYYY"
featured: false
draft: false
```

### Ventures — `src/content/ventures/`

```yaml
name: My Venture
tagline: One line about it.
status: development    # active | development | stealth | complete
founded: "2025"        # optional
domain: Hardware       # optional tag
# logo: /logos/x.svg   # optional (in public/) — else initials are used
# url: https://...     # optional "Visit site" button
# email: hi@...        # optional "Get in touch" button
draft: false
```

---

## CV (and other external files)

The CV link is driven by the `cv` block in `site.config.ts`. Set `strategy` to
choose where the PDF comes from — switching is a one-line change:

| Strategy | Where the PDF lives |
|----------|--------------------|
| `local` | This repo's `public/cv.pdf` (default). |
| `pages` | A GitHub Pages URL — works even if the source repo is private. |
| `release` | A `latest` GitHub Release asset on a **public** repo. |
| `url` | Any absolute URL (Cloudflare R2, a CDN, etc.). |

The same `resolveLink()` helper and the resource `url:` field let you link to
anything hosted elsewhere — public repos, generated docs, shared templates.

---

## Deployment

The site deploys to **Cloudflare Workers** with static assets (Cloudflare has
merged the old "Workers" and "Pages" products — new projects are Workers).
Config is in `wrangler.jsonc`.

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages → Create**.
2. **Import a Git repository** and pick your copy of this repo.
3. Set **build command** `npm run build`, **output directory** `dist`, and an environment variable `NODE_VERSION` = `22`.
4. Save and deploy.

Every push to `main` then rebuilds and republishes automatically. Until you add
a custom domain, Cloudflare gives you a free `*.workers.dev` address. See
Astro's [Cloudflare deployment guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
for the current screens.

---

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies (once after copying) |
| `npm run dev` | Live preview at `http://localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run deploy` | Build and deploy to Cloudflare |

---

## License

[MIT](LICENSE) — use it freely, including for commercial work. Attribution is
appreciated but not required.
