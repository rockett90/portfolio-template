// ─────────────────────────────────────────────
//  Site configuration — edit this file to make the site yours
// ─────────────────────────────────────────────
//  This is the ONLY file you need for day-to-day personalisation:
//  your identity, the hero text, links, the datasheet card, skills,
//  and bio. Projects / resources / ventures are Markdown files in
//  src/content/ — see the README.

export const site = {

  // ── Identity ──────────────────────────────
  name:        'Your Name',
  title:       'Your Title — e.g. Designer · Engineer · Writer',
  email:       'you@example.com',
  url:         'https://example.com',

  // ── Hero ──────────────────────────────────
  tagline:     'A short, confident line about what you do.',
  taglineEm:   'confident',   // a word in the tagline to italicise / accent
  lead:        'A sentence or two introducing yourself — what you make, who you help, and where you are based. Keep it human.',
  currently:   'working on something worth sharing',

  // ── Social links ──────────────────────────
  //  Don't use one? Remove its <a> from the link-row in src/pages/index.astro
  //  (and from the footer in src/layouts/Base.astro).
  linkedin:    'https://linkedin.com/in/your-handle',
  github:      'https://github.com/your-handle',
  youtube:     'https://youtube.com/@your-handle',

  // ── CV source ─────────────────────────────
  //  strategy: 'local' | 'pages' | 'release' | 'url'  (see the README)
  //   local   → served from this repo's public/ folder (public/cv.pdf)
  //   pages   → a GitHub Pages URL (works even if the source repo is private)
  //   release → a "latest" GitHub Release asset on a PUBLIC repo
  //   url     → any absolute URL (R2 bucket, CDN, etc.)
  cv: {
    strategy: 'local' as 'local' | 'pages' | 'release' | 'url',
    local:   '/cv.pdf',
    pages:   '',
    release: '',
    url:     '',
  },

  // ── Datasheet card (hero) ─────────────────
  //  Any number of rows. Add `dot: true` for a small status indicator.
  datasheet: [
    { key: 'LOCATION',   value: 'Your City, Country' },
    { key: 'FOCUS',      value: 'What you specialise in' },
    { key: 'EXPERIENCE', value: 'X+ years' },
    { key: 'STATUS',     value: 'Open to opportunities', dot: true },
  ],

  // ── About — facts table ───────────────────
  facts: [
    { key: 'based in', value: 'Your City, Country' },
    { key: 'doing',    value: 'Your current role or focus' },
    { key: 'tools',    value: 'The tools you use most' },
  ],

  // ── About — bio paragraphs ────────────────
  //  Each string becomes one paragraph. Use **text** for bold.
  bio: [
    `Introduce yourself properly here — what you do, and what you care about. Use **bold** to lean on the things that matter.`,
    `A second paragraph for background: experience, qualifications, the path that got you here.`,
    `A lighter third paragraph is nice — what you do outside work, or what you're exploring right now.`,
  ],

  // ── Skills ────────────────────────────────
  //  Each group is a card. Add or remove groups and items freely.
  skills: [
    { label: 'Group One',   items: ['Skill', 'Skill', 'Skill', 'Skill'] },
    { label: 'Group Two',   items: ['Skill', 'Skill', 'Skill'] },
    { label: 'Group Three', items: ['Skill', 'Skill', 'Skill'] },
  ],

  // ── Footer ────────────────────────────────
  consultingNote: `**Available for work** — a short line inviting people to get in touch, and what for.`,

  // ── SEO / meta ────────────────────────────
  metaTitle:       'Your Name — Your Title',
  metaDescription: 'A one-line description of you and what you do, for search engines and link previews.',

};

// ── Resolved external resources ─────────────
//  Generic resolver: given a strategy and a set of candidate URLs, returns
//  the active href plus whether it points off-site. Reuse it for any
//  externally-hosted asset, not just the CV.
type LinkStrategy = 'local' | 'pages' | 'release' | 'url';

export function resolveLink(
  source: { strategy: LinkStrategy } & Partial<Record<LinkStrategy, string>>
): { href: string; external: boolean } {
  const href = source[source.strategy] || source.local || '#';
  return { href, external: source.strategy !== 'local' };
}

export const cv = resolveLink(site.cv);
