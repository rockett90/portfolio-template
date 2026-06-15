# Portfolio Template

A clean, fast personal site — an online CV, project showcase, and resource
library — that you update by editing plain text files. Built with
[Astro](https://astro.build) and designed to host **free** on Cloudflare, with
automatic deploys every time you push a change.

No database, no CMS, no monthly bill. If you can edit a text file, you can run
this site.

---

## Contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Personalising the site](#personalising-the-site)
- [Adding content](#adding-content)
- [CV and other external files](#cv-and-other-external-files)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Requirements

- **Node.js v22.12.0 or higher** — check with `node --version` ([download](https://nodejs.org)).
- **npm** — comes with Node, check with `npm --version`.

You only need these to run the site **locally**. You can also edit everything in
the GitHub web interface and let Cloudflare build it — no local setup at all.

---

## Quick start

### 1. Make your own copy

Click **“Use this template” → “Create a new repository”** at the top of this
repo's GitHub page. That gives you your own copy to edit — no need to fork or
clone anything by hand. (Prefer the command line? Clone it instead.)

### 2. Run it locally (optional but recommended)

```bash
npm install     # first time only
npm run dev     # live preview at http://localhost:4321
```

The site reloads as you save.

### 3. Make it yours

Work through this checklist and you're done:

- [ ] Edit **`src/site.config.ts`** — your name, title, bio, links, skills, datasheet.
- [ ] Replace the `example-*` files in **`src/content/projects/`**, **`resources/`**, and **`ventures/`** with your own.
- [ ] Add your CV at **`public/cv.pdf`** (or point `cv.strategy` elsewhere — see [CV](#cv-and-other-external-files)).
- [ ] Add a photo at **`public/me.jpg`** (optional — a placeholder shows otherwise).
- [ ] Update the favicon initials and colour in **`src/layouts/Base.astro`** (search for `YN`).
- [ ] Recolour to taste — change `--accent` in **`src/styles/global.css`**.
- [ ] Deploy (see [Deployment](#deployment)).

---

## Commands

All commands run from the project root:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies (once after copying) |
| `npm run dev` | Start dev server at `http://localhost:4321` |
| `npm run build` | Build the site to `./dist/` |
| `npm run preview` | Build, then preview in the Workers runtime via `wrangler dev` |
| `npm run deploy` | Build and deploy to Cloudflare |

---

## Project structure

```
portfolio-template/
├── src/
│   ├── content/
│   │   ├── projects/         ← one .md file per project
│   │   ├── resources/        ← one .md file per resource or article
│   │   └── ventures/         ← one .md file per venture
│   ├── layouts/
│   │   └── Base.astro        ← shared nav, footer, and theme toggle
│   ├── pages/
│   │   ├── index.astro       ← the single-page site (hero, about, skills…)
│   │   ├── projects/[slug].astro   ← auto-generated project pages
│   │   └── resources/[slug].astro  ← auto-generated resource pages
│   ├── styles/
│   │   └── global.css        ← all design tokens, colours, and styles
│   ├── site.config.ts        ← all your personal content — edit this
│   └── content.config.ts     ← content schemas — do not edit
├── public/
│   ├── cv.pdf                ← add your CV (or configure cv.strategy)
│   ├── me.jpg                ← add your photo (optional)
│   └── files/                ← downloadable resource files go here
├── astro.config.mjs          ← Markdown pipeline (code highlighting, math, captions)
├── wrangler.jsonc            ← Cloudflare deploy config
├── WRITING-CONTENT.md        ← full content authoring guide
└── package.json
```

### Key files at a glance

| File | Purpose |
|------|---------|
| `src/site.config.ts` | **Edit this** — all personal content: identity, bio, skills, links, datasheet, facts |
| `src/styles/global.css` | Design tokens (colours, fonts) at the top; change `--accent` to recolour |
| `src/pages/index.astro` | Page template — only edit to change the layout |
| `src/layouts/Base.astro` | Nav, footer, theme toggle, and the favicon — only edit to change the layout |
| `src/content.config.ts` | Defines and validates the content schemas — **do not edit** |
| `WRITING-CONTENT.md` | The full guide to writing projects, resources, and articles |

---

## Personalising the site

### Photo

Add a file named `me.jpg` to the `public/` folder. A square or 4:3 crop works
best. If it's missing, a placeholder icon shows instead.

### Everything else — `src/site.config.ts`

This one file holds all the text content. It's commented throughout; you
shouldn't need to touch the page templates. It covers:

| Property | What it controls |
|----------|-----------------|
| `name`, `title`, `email`, `url` | Identity used throughout the site |
| `tagline`, `taglineEm` | Hero heading (and which word is emphasised) |
| `lead` | Hero intro paragraph |
| `currently` | The "Currently" line in the hero |
| `linkedin`, `github`, `youtube` | Social links in the hero and footer |
| `cv` | Where your CV PDF comes from (see [CV](#cv-and-other-external-files)) |
| `datasheet` | The stats card in the hero (location, focus, etc.) |
| `facts` | The facts table in the About section |
| `bio` | Bio paragraphs — use `**text**` for bold |
| `skills` | Skills grid — each group has a label and a list of items |
| `consultingNote` | Footer "available for work" blurb |
| `metaTitle`, `metaDescription` | SEO / link-preview tags |

### Colours and fonts

These live at the top of **`src/styles/global.css`**, in the `:root` (light) and
`[data-theme="dark"]` blocks. Change `--accent` to recolour the whole site;
swap the `--serif` / `--sans` / `--mono` variables (and the Google Fonts link in
`src/layouts/Base.astro`) to change the type.

---

## Adding content

Each project, resource, and venture is a Markdown file with a small frontmatter
block. **Add a file → a card appears.** Delete the `example-*` files once you've
got the idea. The filename becomes the URL (`my-project.md` → `/projects/my-project`),
and `draft: true` hides anything without deleting it.

> **Full authoring reference:** [WRITING-CONTENT.md](WRITING-CONTENT.md) lists
> every frontmatter field and every Markdown feature (captioned images,
> syntax-highlighted code, maths, task lists, footnotes, and automatic touches
> like reading-time and a table of contents). The examples below get you started.

### Projects

Create a `.md` file in `src/content/projects/`.

```markdown
---
title: My Project
description: One sentence — used on the card and the page header.
type: build           # build | guide | document | wip
tags: [Tag, Tag]
date: "2025-06"       # "YYYY-MM" — newest first
status: In progress   # optional — shown on the card instead of the date
repo: https://github.com/...      # optional — adds a "GitHub repo" button
youtube: https://youtube.com/...  # optional — adds a "Watch" button
featured: false       # true pins it to the front of the rail
draft: false          # true hides it
---

## Overview

Write your project content here in standard Markdown.
```

### Resources

Resources work **three ways**, depending on the frontmatter.

#### 1. A downloadable file

Include a `file` field. The card shows a **Download** button and no page is
created. Put the actual file in `public/files/`.

```markdown
---
title: My Checklist
description: One sentence describing the file.
type: checklist       # template | checklist | guide | config
tags: [Tag]
updated: "Jun 2025"   # "Mon YYYY"
file: my-checklist.pdf   # filename only — must exist in public/files/
draft: false
---
```

#### 2. A link to something hosted elsewhere

Include a `url` field instead. The card shows an **Open ↗** link (opens in a new
tab) and no page is created. Use it for public repos, generated docs, shared
templates, or any externally-hosted asset.

```markdown
---
title: My Template Repo
description: One sentence describing the link.
type: template
tags: [Tag]
updated: "Jun 2025"
url: https://github.com/youruser/some-repo
draft: false
---
```

#### 3. A readable page (content in the `.md`)

Omit both `file` and `url`. A full page is generated at `/resources/your-slug`,
the card shows a **Read →** link, and everything below the frontmatter becomes
the article.

```markdown
---
title: My Guide
description: One sentence describing the guide.
type: guide
tags: [Tag]
updated: "Jun 2025"
draft: false
---

## A heading

Write your guide here — see WRITING-CONTENT.md for every Markdown feature.
```

### Ventures

Create a `.md` file in `src/content/ventures/`. Each file becomes one card.

```markdown
---
name: My Venture
tagline: One sentence — what it is and who it's for.
status: development   # active | development | stealth | complete
founded: "2025"       # optional
domain: Hardware      # optional — shown as a tag on the card
logo: /logos/my-venture.svg   # optional (in public/) — else initials are used
url: https://...      # optional — adds a "Visit site" button
email: hi@...         # optional — adds a "Get in touch" button
draft: false
---
```

---

## CV and other external files

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
a custom domain, Cloudflare gives you a free `*.workers.dev` address.

### Custom domain (subdomain)

In the project's **Settings → Domains & Routes**, add your subdomain. Cloudflare
gives you a CNAME target to add at your DNS provider (automatic if your domain is
already on Cloudflare). HTTPS is handled for you. See Astro's
[Cloudflare deployment guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
for the current screens.

---

## Troubleshooting

**Build fails with a schema validation error**
A required frontmatter field is missing or has the wrong value in one of your
content files. The error message names the file and field — check it against
[WRITING-CONTENT.md](WRITING-CONTENT.md).

**Card not appearing after adding a `.md` file**
Check that `draft: false` is set, and that the file is in the correct directory
(`src/content/projects/`, `resources/`, or `ventures/`).

**Photo not showing**
Confirm the file is named exactly `me.jpg` (lowercase) and is in `public/`, not `src/`.

**Downloadable resource not downloading**
Confirm the filename in the `file` field exactly matches the file in
`public/files/`, including extension and capitalisation.

**`npm run dev` fails with a Node version error**
This project needs Node.js v22.12.0+. Run `node --version` to check.

**Windows: “running scripts is disabled on this system”**
PowerShell blocks the `npm` script by default. Allow it for your user once with
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`, or run
commands in Command Prompt (`cmd.exe`) instead.

**Changes not appearing on the live site**
Check the Cloudflare **Workers & Pages** dashboard for a failed build — the build
log shows the error, most commonly a schema issue in a content file.

---

## License

[MIT](LICENSE) — use it freely, including for commercial work. Attribution is
appreciated but not required.
