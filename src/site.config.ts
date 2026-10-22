// ─────────────────────────────────────────────
//  Site configuration — edit this file to make the site yours
// ─────────────────────────────────────────────
//  This is the ONLY file you need for day-to-day personalisation:
//  your identity, the hero text, links, the datasheet card, skills,
//  bio and section headings. Projects / resources / ventures are
//  Markdown files in src/content/ — see the README.

export const site = {

  // ── Identity ──────────────────────────────
  name:        'Your Name',
  title:       'Your Job Title',
  email:       'you@example.com',
  url:         'https://example.com',   // your live address; astro.config.mjs, the sitemap and robots.txt read it from here

  // ── Hero ──────────────────────────────────
  tagline:     "Hi, I'm Your Name. I make things.",   // each sentence sets on its own line
  lead:        'A sentence or two introducing yourself: what you specialise in, who you help, and where you are based. Keep it human.',
  currently:   'What you are working on right now, in a sentence.',

  // ── Social links ──────────────────────────
  //  Don't use one? Remove its cell from the title block in src/pages/index.astro
  //  (and its link from the footer in src/layouts/Base.astro).
  //  Leave youtube empty to show "Channel coming soon" instead.
  linkedin:    'https://linkedin.com/in/your-handle',
  github:      'https://github.com/your-handle',
  youtube:     '',

  // ── Credential (title block, last cell) ───
  //  A professional registration or membership number, e.g.
  //  { label: 'IEng registration', value: '123456', href: 'https://…/check-a-registration' }.
  //  href is optional. Leave value empty to show the month the site was built instead.
  credential: {
    label: '',
    value: '',
    href:  '',
  },

  // ── CV source ─────────────────────────────
  //  The CV PDF can live in several places. Switching is a one-line
  //  change to `strategy` — the rest of the site reads the resolved URL
  //  from the exported `cv` helper at the bottom of this file.
  //
  //   local   → served from this repo's public/ folder (public/cv.pdf)
  //   pages   → a GitHub Pages URL (works even if the CV *source* repo
  //             is private; only the published Pages output is public)
  //   release → a GitHub Releases "latest" asset on a PUBLIC repo
  //   url     → any absolute URL (R2 bucket, CDN, etc.)
  //
  //  With `local` and no public/cv.pdf yet, every CV link is hidden and
  //  the title block shows "Coming soon".
  cv: {
    strategy: 'local' as 'local' | 'pages' | 'release' | 'url',
    local:   '/cv.pdf',
    pages:   '',   // e.g. https://your-handle.github.io/cv/Your-Name-CV.pdf
    release: '',   // e.g. https://github.com/your-handle/cv/releases/latest/download/Your-Name-CV.pdf
    url:     '',
  },

  // ── Datasheet card (hero) ─────────────────
  //  Any number of rows. Separate parts of a value with ' · '.
  datasheet: [
    { key: 'Location',     value: 'Your Town, County' },
    { key: 'Experience',   value: 'X+ years' },
    { key: 'Degree',       value: 'Your qualification' },
    { key: 'Domain',       value: 'Speciality · Speciality' },
    { key: 'Tools',        value: 'Tool · Tool · Tool' },
    { key: 'Availability', value: 'Open to opportunities' },
  ],

  // ── About — photo ─────────────────────────
  //  Path under public/ (e.g. '/me.jpg'). Leave empty to show a placeholder frame.
  photo: '',

  // ── About — bio paragraphs ────────────────
  //  Each string becomes one <p> tag. Use **text** for bold.
  bio: [
    `Introduce yourself properly here: what you do, and what you care about. Use **bold** to lean on the things that matter most.`,
    `A second paragraph for background: experience, qualifications, and the path that got you here.`,
    `A lighter third paragraph is nice, about what you do outside work or what you're exploring right now.`,
  ],

  // ── Skills ────────────────────────────────
  //  Each group is one row of the parts list. Add or remove groups and items freely.
  skills: [
    { label: 'Group one',   items: ['Skill', 'Skill', 'Skill', 'Skill'] },
    { label: 'Group two',   items: ['Skill', 'Skill', 'Skill'] },
    { label: 'Group three', items: ['Skill', 'Skill', 'Skill'] },
  ],

  // ── Section headings ──────────────────────
  headings: {
    about:     'A bit about me',
    skills:    'What I work with',
    resources: 'Useful stuff, freely shared',
    projects:  'Personal projects',
    ventures:  'Ventures beyond the day job',
  },

  // ── Footer ────────────────────────────────
  consultingNote: `**Available for work.** A short line inviting people to get in touch, and what for.`,

  // ── SEO / meta ────────────────────────────
  metaTitle:       'Your Name — Your Job Title',
  metaDescription: 'A one-line description of you and what you do, for search engines and link previews.',

};

// ── Resolved external resources ─────────────
// Generic resolver: given a strategy and a set of candidate URLs, return
// the active href plus whether it points off-site (so links can open in a
// new tab). Reuse this for any future externally-hosted asset, not just CVs.
type LinkStrategy = 'local' | 'pages' | 'release' | 'url';

export function resolveLink(
  source: { strategy: LinkStrategy } & Partial<Record<LinkStrategy, string>>
): { href: string; external: boolean } {
  const href = source[source.strategy] || source.local || '#';
  return { href, external: source.strategy !== 'local' };
}

export const cv = resolveLink(site.cv);
