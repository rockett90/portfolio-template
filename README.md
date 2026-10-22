# Portfolio Template

A clean, fast personal site: an online CV, resource library, project showcase and
ventures page, laid out like an engineering drawing sheet. You update it by editing
plain text files. It's built with [Astro 7](https://astro.build) and designed to host
**free** on Cloudflare Workers, with an automatic deploy every time you push a change.

No database, no CMS, no monthly bill. If you can edit a text file, you can run this
site.

The homepage is one scrolling page with six sections: **Hero, About, Skills,
Resources, Projects and Ventures**, and it closes with a short "get in touch" note.
Resources, Projects and Ventures are side-scrolling rails that fill themselves from
Markdown files in `src/content/`, so adding a card means adding a file, not editing
HTML. Light and dark themes are built in.

---

## Contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Personalising the site](#personalising-the-site)
- [Adding content](#adding-content)
  - [Resources](#resources)
  - [Projects](#projects)
  - [Ventures](#ventures)
- [Content schemas](#content-schemas)
- [Design](#design)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Requirements

- **Node.js v22.12.0 or higher**. Check with `node --version`.
- **npm**, which comes with Node. Check with `npm --version`.

Download Node.js from [nodejs.org](https://nodejs.org) if needed.

You only need these to run the site **locally**. You can also edit everything in the
GitHub web interface and let Cloudflare build it, with no local setup at all.

---

## Quick start

### 1. Make your own copy

Click **"Use this template" → "Create a new repository"** at the top of this repo's
GitHub page. That gives you your own copy to edit, with no need to fork or clone by
hand. (Prefer the command line? Clone it instead.)

### 2. Run it locally (optional but recommended)

```bash
npm install     # first time only
npm run dev     # live preview at http://localhost:4321
```

The site reloads as you save. Restart the dev server after changing
`astro.config.mjs`, `url` in `src/site.config.ts` or dependencies, or after adding
or removing `public/cv.pdf`, because those are only read at startup (see
[Troubleshooting](#troubleshooting)).

### 3. Make it yours

Work through this checklist and you're done:

- [ ] Edit **`src/site.config.ts`**: your name, title, links, hero text, datasheet,
      bio, skills and section headings. Set `url` to your live address.
- [ ] Replace the `example-*` files in **`src/content/projects/`**, **`resources/`**
      and **`ventures/`** with your own. Copy-from templates are in
      `src/content/Templates/`.
- [ ] Add your CV at **`public/cv.pdf`**, or point `cv.strategy` elsewhere (see [CV](#cv)).
- [ ] Add a photo at **`public/me.jpg`** and set `photo: '/me.jpg'` (optional; a
      placeholder frame shows otherwise).
- [ ] Change the initials in **`public/favicon.svg`** from `YN` to yours.
- [ ] Run **`npm run images`** to redraw the social preview and favicon from your
      config.
- [ ] Recolour to taste, if you like (see [Design](#design)).
- [ ] Deploy (see [Deployment](#deployment)).

---

## Commands

All commands run from the project root:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies (run once after copying) |
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run build` | Build the site to `./dist/` (the static files are in `dist/client/`) |
| `npm run preview` | Build, then preview in the Workers runtime via `wrangler dev` |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run images` | Redraw `public/og.png` (social preview) and `public/favicon.ico` from your config |
| `npm run generate-types` | Generate Worker binding types (`worker-configuration.d.ts`) via `wrangler types` |

---

## Project structure

```
portfolio-template/
├── src/
│   ├── site.config.ts          ← all your personal content — edit this
│   ├── content.config.ts       ← content schemas — do not edit
│   ├── content/
│   │   ├── resources/          ← one .md file per resource or guide
│   │   ├── projects/           ← one .md file per project
│   │   ├── ventures/           ← one .md file per venture
│   │   └── Templates/          ← copy-from examples (not published)
│   ├── components/
│   │   └── Article.astro       ← shared layout for project and resource pages
│   ├── layouts/
│   │   └── Base.astro          ← <head>, nav, footer, theme toggle, rail and nav scripts
│   ├── lib/
│   │   └── content.ts          ← labels, section list, collection loading, helpers
│   ├── pages/
│   │   ├── index.astro         ← the homepage
│   │   ├── robots.txt.ts       ← robots.txt, pointing at your sitemap
│   │   ├── projects/[slug].astro   ← generated project pages
│   │   └── resources/[slug].astro  ← generated resource pages
│   └── styles/
│       └── global.css          ← design tokens and all styles
├── public/
│   ├── favicon.svg / favicon.ico
│   ├── og.png                  ← social preview image (generated)
│   ├── cv.pdf                  ← add this — see "CV" below
│   ├── me.jpg                  ← add this — see "Photo" below
│   └── files/                  ← create this for downloadable resources
├── scripts/
│   └── make-images.mjs         ← builds og.png and favicon.ico
├── WRITING-CONTENT.md          ← full guide to writing content
├── astro.config.mjs            ← Markdown plugins, build-time constants
├── wrangler.jsonc              ← Cloudflare Workers config
└── package.json
```

`cv.pdf`, `me.jpg` and `files/` aren't in the repo. The site works without them and
shows placeholders until they're added.

### Key files at a glance

| File | Purpose |
|------|---------|
| `src/site.config.ts` | **Edit this** — identity, hero, datasheet, bio, skills, links, CV, photo and headings |
| `src/content/*/` | **Add files here** — resources, projects and ventures |
| `src/pages/index.astro` | Homepage template — only touch it to change the layout |
| `src/layouts/Base.astro` | Shared shell — only touch it to change the layout |
| `src/styles/global.css` | Design tokens and styles |
| `src/content.config.ts` | Defines and validates the content schemas — **do not edit** |

---

## Personalising the site

Almost everything personal lives in **`src/site.config.ts`**, and it's the only file
you need for day-to-day updates.

| Property | What it controls |
|----------|-----------------|
| `name`, `title`, `email` | Identity used throughout the site |
| `url` | Your live address. It feeds the sitemap, `robots.txt`, canonical links and social previews. |
| `tagline` | The big hero heading. Each sentence goes on its own line. |
| `lead` | The intro paragraph under the heading |
| `currently` | The "Currently · Working on" line in the hero. Update it every few months. |
| `linkedin`, `github`, `youtube` | Links in the hero title block and footer |
| `credential` | The last cell of the title block — see below |
| `cv` | Where the CV PDF comes from — see below |
| `datasheet` | The Datasheet panel in the hero. Separate parts of a value with ` · `. |
| `photo` | The About photo — see below |
| `bio` | About paragraphs. Use `**text**` for bold. |
| `skills` | The parts-list table of skills. Each group has a label and a list of items. |
| `headings` | The heading of each homepage section |
| `consultingNote` | The paragraph at the bottom of the homepage. Use `**text**` for bold. |
| `metaTitle`, `metaDescription` | Page title and search description |

The nav labels (About, Skills, Resources, Projects, Ventures) are in `sections` in
`src/lib/content.ts`.

The page language is British English (`lang="en-GB"` in `src/layouts/Base.astro`),
and the "Site updated" month is formatted the same way in `astro.config.mjs`. Change
both if you write in another language or locale.

### Email

Your email address is never shown as text on the page. It's only used behind the
**Send me a message** and **Get in touch** links, so it's still readable in the page
source.

### Social links

Leave `youtube: ''` empty and the hero shows **Channel coming soon** and the footer
leaves YouTube out. Set it to your channel URL and both switch on.

Don't use LinkedIn or GitHub? Remove its cell from the title block in
`src/pages/index.astro` and its link from the footer in `src/layouts/Base.astro`.
The title block is a two-column grid, so swap the cell for another link rather than
leaving a gap.

### Credential

The last cell of the hero title block can show a professional registration or
membership number, such as a chartered or incorporated engineer number:

```ts
credential: {
  label: 'IEng registration',
  value: '123456',
  href:  'https://example.org/check-a-registration',   // optional — makes the cell a link
},
```

Leave `value` empty and the cell shows **Site updated** with the month the site was
last built instead.

### Photo

Put a photo in `public/` (e.g. `public/me.jpg`) and set `photo: '/me.jpg'` in
`site.config.ts`. It fills a **4:5 portrait** frame beside the bio and is cropped to
fit. With `photo: ''` a "Photo coming soon" frame is shown.

### CV

The CV link comes from the `cv` block in `site.config.ts`. `strategy` chooses where the
PDF lives, so switching hosts is a one-line change:

| Strategy | Where the PDF lives |
|----------|--------------------|
| `local` | This repo's `public/cv.pdf` (default) |
| `pages` | A GitHub Pages URL — works even if the CV *source* repo is private |
| `release` | A `latest` GitHub Release asset on a **public** repo |
| `url` | Any absolute URL (Cloudflare R2, a CDN, etc.) |

**With `local`, CV links only appear once `public/cv.pdf` exists.** The build checks
for the file. Until it's there, the hero shows **CV · Coming soon**, Email is the
highlighted button, and the nav and footer leave CV out. Add the PDF and rebuild, and
the CV becomes the highlighted **Download PDF** button, with CV links in the nav and
footer too.

If your CV source repo is private, have its CI publish the built PDF somewhere public:
commit it here (`local`), push it to a public Pages site (`pages`), or attach it to a
public Release (`release`). The site only reads the resolved URL.

### Social preview and favicon

`public/og.png` is the image shown when the site is shared on LinkedIn, Slack and
similar. `npm run images` draws it from your config: your name, `url`, `tagline`,
`title` and the first six `datasheet` rows. It also builds `favicon.ico` from
`favicon.svg`. Re-run it whenever you change those, and change the `YN` initials in
`favicon.svg` first.

---

## Adding content

Content is Markdown with a YAML frontmatter block at the top. Add a file, save, and the
tile appears in its rail on the dev server. Delete the `example-*` files once you've
got the idea.

> **Full authoring reference:** [WRITING-CONTENT.md](WRITING-CONTENT.md) covers every
> frontmatter field and every Markdown feature the pages support: captioned images,
> syntax-highlighted code, maths, task lists, footnotes, embeds and the automatic
> touches. The sections below are a quick start. Copy-from examples are in
> `src/content/Templates/`.

**Rails and empty sections.** Resources, Projects and Ventures always show. An empty
section shows a single **Coming soon** tile. Faint dashed slots at the end of each rail,
a fade on the edge, a scroll track and arrow buttons show that the row scrolls sideways.
Under each rail, a count reads e.g. "3 resources", or "More soon" when the rail is empty.

**Order.** Resources and projects with `featured: true` come first. Projects are then
sorted newest first by `date`. Ventures appear in file order.

**Drafts.** `draft: true` keeps a file off the built site and out of the rails. Its
page still opens under `npm run dev`, with a "Draft" flag, so you can preview it.

### Resources

Create a `.md` file in `src/content/resources/`. What the tile does depends on which
link field you include (resolution order: `file` → `url` → readable page).

#### Downloadable file (template, checklist, config)

Include `file`. The tile shows **Download** and no page is created. Put the file in
`public/files/` (create the folder the first time).

```markdown
---
title: Pre-release Checklist
description: Everything to check before a design goes out of the door.
type: checklist       # template | checklist | guide | config
tags: [Checklist, Release]
updated: "Mar 2026"
file: release-checklist.pdf  # must exist at public/files/release-checklist.pdf
featured: false
draft: false
---
```

#### Externally hosted (public repo, docs, template)

Include `url` instead. The tile shows **Open** and opens the link in a new tab.

```markdown
---
title: Document Template
description: A clean LaTeX template for technical documents.
type: template
tags: [LaTeX, PDF]
updated: "Jun 2026"
url: https://github.com/your-handle/your-templates
featured: false
draft: false
---
```

#### Written guide (readable page)

Omit both `file` and `url`. A page is generated at `/resources/your-slug`, and the tile
shows **Read**. `example-guide.md` is one of these, and shows off figures, tables,
code and maths.

```markdown
---
title: Getting Started With Git
description: The handful of commands you actually need.
type: guide
tags: [Git]
updated: "Feb 2026"
draft: false
---

## Why bother

Write the guide here...
```

The `type` is shown as a plain label on the tile: Template, Checklist, Guide or Config.

### Projects

Create a `.md` file in `src/content/projects/`. The filename becomes the URL, e.g.
`my-project.md` → `/projects/my-project`.

```markdown
---
title: My Project
description: One sentence — used on the tile and the page header.
type: build           # build | guide | document | wip
tags: [Tag, Another Tag]
date: "2026-06"
status: In progress   # optional — replaces the date on the tile
repo: https://github.com/...       # optional — adds a GitHub repo link
youtube: https://youtube.com/...   # optional — adds a Watch on YouTube link
featured: false       # true puts it at the front of the rail
draft: false          # true hides it from the built site
---

## Overview

Write the project here using standard Markdown.
```

The `type` is shown as a label: `build` → **Build log**, `guide` → **Guide**,
`document` → **Document**, `wip` → **In progress**. Labels live in one place,
`src/lib/content.ts`, so the tile and the page always agree.

The project page shows the type, date, status (if set) and reading time on one line,
the tags beneath, and **GitHub repo** and **Watch on YouTube** links when `repo` or
`youtube` is set. Pages with three or more `##` sections get a contents list, which
sits in a sticky rail beside the text on wide screens. Resource pages work the same
way.

### Ventures

Create a `.md` file in `src/content/ventures/`. Each file becomes one tile.

```markdown
---
name: My Venture Name
tagline: One sentence — what it is and who it's for.
status: development   # active | development | stealth | complete
logo: /logos/my-venture.svg   # optional — path under public/
url: https://example.com      # optional — makes the tile a link with "Visit site"
draft: false
---
```

Without a `logo`, the first two letters of the name are used as a monogram. The status
shows as **Active**, **In development**, **Stealth** or **Complete**. `founded`,
`domain` and `email` are accepted by the schema but not shown on the tile at the
moment.

---

## Content schemas

`src/content.config.ts` defines each content type. Astro validates every file at build
time, so a missing or wrongly typed field fails the build with an error naming the file.
**Don't edit it** unless you're adding a field and wiring it into the pages.

### Resources

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✓ | |
| `description` | string | ✓ | |
| `type` | enum | ✓ | `template`, `checklist`, `guide`, `config` |
| `tags` | string[] | ✓ | |
| `updated` | string | ✓ | Format `"Mon YYYY"`, e.g. `"Mar 2026"` |
| `file` | string | — | Download from `public/files/` |
| `url` | URL | — | External link. Order: `file` → `url` → readable page |
| `featured` | boolean | — | Defaults to `false` |
| `draft` | boolean | — | Defaults to `false` |

### Projects

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✓ | |
| `description` | string | ✓ | |
| `type` | enum | ✓ | `build`, `guide`, `document`, `wip` |
| `tags` | string[] | ✓ | |
| `date` | string | ✓ | Format `"YYYY-MM"`. The rail sorts on this text, so keep the format |
| `status` | string | — | Replaces the date on the tile. The page shows both |
| `repo` | URL | — | |
| `youtube` | URL | — | |
| `featured` | boolean | — | Defaults to `false` |
| `draft` | boolean | — | Defaults to `false` |

### Ventures

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | ✓ | |
| `tagline` | string | ✓ | |
| `status` | enum | ✓ | `active`, `development`, `stealth`, `complete` |
| `founded` | string | — | Not currently shown |
| `domain` | string | — | Not currently shown |
| `logo` | string | — | Path under `public/` |
| `url` | URL | — | |
| `email` | email | — | Not currently shown |
| `draft` | boolean | — | Defaults to `false` |

---

## Design

The site is laid out like an issued engineering drawing: a zone band across the top
for the nav, a datasheet and title block in the hero, skills as a parts list, and
article pages on a 12-column sheet grid. It uses a warm cream and rose palette with a
matching dark theme, Source Serif 4 for headings and Schibsted Grotesk for text.

### Colours and fonts

The colours are tokens at the top of **`src/styles/global.css`**, in the `:root`
(light) and `[data-theme="dark"]` blocks. `--red` is the accent: the highlighted
button, the active nav zone and the "Currently" dot. Keep it to one or two places
per screen. Change `--paper`, `--ink` and `--red` in both blocks to recolour the
site, and update the matching `theme-color` values in `src/layouts/Base.astro` and
the colours at the top of `scripts/make-images.mjs`.

Fonts are self-hosted through `@fontsource-variable` packages, so the site makes no
requests to Google Fonts. To change them, install another `@fontsource-variable`
package, swap the two imports at the top of `Base.astro`, and update `--serif` and
`--sans` in `global.css`. The KaTeX maths stylesheet is bundled the same way.

### Markdown processing

Markdown goes through Astro's remark/rehype (unified) processor from
`@astrojs/markdown-remark`, set in `astro.config.mjs`. Astro 7 defaults to a different
processor (Sätteri), but the maths (`remark-math`, `rehype-katex`) and captioned-image
plugins need unified, so keep that package installed.

---

## Deployment

The site runs on **Cloudflare Workers with static assets** (Workers and Pages are now
one product; this repo is configured as a Worker in `wrangler.jsonc`). Every route is
prerendered. The Cloudflare adapter stays in place so on-demand routes remain possible
later. Change `name` in `wrangler.jsonc` to set the Worker's name, which also sets its
default `*.workers.dev` address. If you create the Worker in the dashboard (below),
give it the same name as in `wrangler.jsonc`, or the deploy step fails.

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (the default) |
| Node.js version | 22 (`NODE_VERSION` build variable) |
| Config | `wrangler.jsonc` |

There's no output directory to set. The build writes the static files to
`dist/client/`, plus a redirect at `.wrangler/deploy/config.json` that tells
`wrangler deploy` where to find them.

### Initial setup (connect Git)

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), open **Workers & Pages**.
2. **Create**, then connect a Git repository and select your copy of this repo. This
   creates a Worker with static assets.
3. Set the build command to `npm run build` and leave the deploy command as
   `npx wrangler deploy`.
4. Add the build variable `NODE_VERSION` = `22`.
5. Save and deploy. Every later push to your default branch deploys automatically.

### Custom domain

1. Open the project in **Workers & Pages → Settings → Domains & Routes**.
2. Add your domain or subdomain (e.g. `you.example.com`).
3. Add the CNAME Cloudflare gives you at your DNS provider. It's automatic if the
   domain is already on Cloudflare.

Then set `url` in `src/site.config.ts` to the new address. It's the only place the
site URL is set, and it feeds the sitemap, `robots.txt`, canonical links and social
previews.

### Manual deployment

`npm run deploy` builds and runs `wrangler deploy`. Every page is prerendered, so
`dist/client/` is a self-contained static site that any static host can serve.

---

## Troubleshooting

**Build fails with a schema validation error**
A frontmatter field is missing or has the wrong value. The error names the file and
field. See [Content schemas](#content-schemas).

**Tile not appearing after adding a `.md` file**
Check the frontmatter has `draft: false` (or no `draft` line), and that the file is in
the right folder (`src/content/resources/`, `projects/` or `ventures/`).

**CV button still says "Coming soon"**
With `strategy: 'local'`, the file must be exactly `public/cv.pdf`. The check happens
when the site builds, so restart `npm run dev` (or rebuild) after adding it.

**Photo not showing**
Check that `photo` in `site.config.ts` matches the file in `public/` exactly, including
the leading `/` and letter case (e.g. `'/me.jpg'`).

**Downloadable resource not downloading**
The `file` value must exactly match the name in `public/files/`, including the
extension and letter case.

**Dev server shows an error after changing `astro.config.mjs` or dependencies**
Stop the dev server and start it again with `npm run dev`.

**`npm run dev` or `npm run images` fails with a Node version error**
Run `node --version`. This project needs v22.12.0 or higher.

**Social preview still shows the old text**
Run `npm run images` after changing your config, then rebuild. LinkedIn and others
cache previews, so a page shared before the change can keep the old image for a while.

**Changes not on the live site**
Check **Workers & Pages** in the Cloudflare dashboard for a failed build. The log shows
the error, usually a schema problem in a content file.

---

## License

[MIT](LICENSE) — use it freely, including for commercial work. Attribution is
appreciated but not required.
