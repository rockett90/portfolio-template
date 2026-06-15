# Writing content

Everything on the site — projects, resources, ventures — is a **Markdown file**.
Drop a file in the right folder and a card appears automatically; there's no
admin panel and no code to touch. This guide covers where files go, the
frontmatter each type needs, and every Markdown feature the pages support.

> Quick orientation only? The [README](README.md) has the short version. This is
> the full reference.

---

## Where content lives

```
src/content/
├── projects/    ← one .md per project
├── resources/   ← one .md per resource or article
└── ventures/    ← one .md per venture
```

- The **filename becomes the URL**: `my-build.md` → `/projects/my-build`.
- The repo ships with `example-*` files in each folder — read them, then delete them.
- To hide something without deleting it, set `draft: true` in the frontmatter.
- Images can live in an `images/` folder next to the `.md` file, or in `public/`
  (referenced from the site root, e.g. `/photo.jpg`).

---

## Frontmatter

Every file starts with a `---` block of settings. Required fields are marked ✓;
the rest are optional.

### Projects

| Field | Req | Notes |
|-------|-----|-------|
| `title` | ✓ | |
| `description` | ✓ | One sentence — card text and page intro |
| `type` | ✓ | `build` · `guide` · `document` · `wip` |
| `tags` | ✓ | e.g. `[KiCad, MSP430]` |
| `date` | ✓ | `"YYYY-MM"` — newest sorts first |
| `status` | — | Shown instead of the date if set |
| `repo` | — | URL — adds a “GitHub repo” button |
| `youtube` | — | URL — adds a “Watch” button |
| `featured` | — | `true` pins it to the front of the rail |
| `draft` | — | `true` hides it |

### Resources

A resource resolves **one of three ways**, in priority order:

| Frontmatter | Result |
|-------------|--------|
| `file: thing.pdf` | **Download** button (file goes in `public/files/`) |
| `url: https://…` | **Open ↗** link to anything hosted elsewhere |
| neither | A readable **page** is generated (`Read →`) |

| Field | Req | Notes |
|-------|-----|-------|
| `title` | ✓ | |
| `description` | ✓ | |
| `type` | ✓ | `template` · `checklist` · `guide` · `config` |
| `tags` | ✓ | |
| `updated` | ✓ | `"Mon YYYY"` e.g. `"Mar 2025"` |
| `file` | — | Local download (see table above) |
| `url` | — | External link |
| `featured` | — | `true` pins it to the front |
| `draft` | — | `true` hides it |

### Ventures

| Field | Req | Notes |
|-------|-----|-------|
| `name` | ✓ | |
| `tagline` | ✓ | |
| `status` | ✓ | `active` · `development` · `stealth` · `complete` |
| `founded` | — | |
| `domain` | — | Shown as a tag |
| `logo` | — | Path in `public/` — else initials are used |
| `url` | — | URL — “Visit site” button |
| `email` | — | Email — “Get in touch” button |
| `draft` | — | `true` hides it |

---

## Writing the body

Below the second `---`, write standard Markdown. The page styles all of it — you
never touch CSS.

### Text

`**bold**`, `*italic*`, `~~strikethrough~~`, `[links](https://example.com)`, and
`` `inline code` ``.

### Headings

```markdown
## A section
### A sub-section
```

Start body headings at `##` — the page title comes from the frontmatter. Each
`##` automatically gets an accent marker; you don't add anything.

### Lists

```markdown
- a bullet
  - nest by indenting
1. a numbered item

- [ ] a task
- [x] a done task
```

Task lists render as real checkboxes.

### Code

Fence with triple backticks and **name the language** for syntax highlighting:

````markdown
```js
export const hello = (name) => `hi, ${name}`;
```
````

Highlighting matches light and dark mode automatically.

### Images — with captions

```markdown
![This text becomes a caption underneath the image.](./images/board.jpg)
```

The image renders full-width, and the **alt text is shown as a centred caption**
beneath it. Want an image with *no* caption? Leave the alt text empty:
`![](./images/decorative.jpg)`.

### Quotes / callouts

```markdown
> Start a line with `>` for a styled callout box.
```

### Tables

Standard Markdown tables (header row, then `|---|` separators).

### Footnotes

```markdown
A claim that needs a source.[^1]

[^1]: The note, defined anywhere — it renders in a tidy block at the end
with a link back to where it was referenced.
```

### Math

Inline maths goes between single dollar signs, a centred block between double:

```markdown
The voltage is $V = IR$.

$$
f_c = \frac{1}{2\pi R C}
$$
```

Equations are written in LaTeX and rendered to clean typography at build time —
no client-side scripts and no slow page loads.

### Horizontal rule

`---` on its own line.

---

## Things that happen automatically

You don't do anything for these — they're built into the page:

- The **first paragraph** gets a drop cap and slightly larger “lead” text.
- A **“X min read”** estimate, from the word count.
- **Accent markers** above each `##`, a contained reading card, and full
  **light/dark** theming.
- A **table of contents** is built from your `##`/`###` headings on any piece
  with three or more sections, and **every heading is deep-linkable** — you can
  share a URL like `…/my-post#a-section`.

---

## Not enabled by default

These aren't set up, but are easy to add if you want them:

- **Video / YouTube embeds** (work via a raw `<iframe>`, but want a responsive wrapper)
- **Coloured Info / Warning / Tip callouts** beyond the basic `>` quote
