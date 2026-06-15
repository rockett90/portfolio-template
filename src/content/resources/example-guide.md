---
title: Example Guide
description: Resources can be a readable guide, a downloadable file, or a link to something hosted elsewhere.
type: guide           # template | checklist | guide | config
tags: [Example]
updated: "Jan 2025"   # "Mon YYYY"
featured: false
draft: false
---

## Resources work three ways

Which one you get depends on the frontmatter:

- Add a **`file:`** field → the card shows a **Download** button (put the file
  in `public/files/`). No page is created.
- Add a **`url:`** field → the card shows an **Open ↗** link to something
  hosted elsewhere (a public repo, docs, a template). No page is created.
- Add **neither** (like this one) → a readable page is generated, and the card
  shows a **Read →** link.

Delete this file and add your own to `src/content/resources/`.
