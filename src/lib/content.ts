// Shared helpers for the pages: display labels, section list, small text utilities.
import { getCollection } from 'astro:content';
import { cv } from '../site.config';

declare const __PUBLIC_FILES__: string[];   // injected by astro.config.mjs
declare const __BUILT_ON__: string;

// A local CV only counts once the PDF is actually in public/. Until then every
// CV link is left out rather than pointing at a 404.
export const cvReady = cv.external || __PUBLIC_FILES__.includes(cv.href);
// The CV always opens in a new tab, local or not, like the social links.
export const cvAttrs = { target: '_blank', rel: 'noopener' };

// Month the site was last built, shown in the title block.
export const builtOn = __BUILT_ON__;

// ── Display labels ──────────────────────────
// One place for the words shown for each enum, so cards and detail pages agree.
export const projectTypeLabel: Record<string, string> = {
  wip: 'In progress', build: 'Build log', guide: 'Guide', document: 'Document',
};
export const resourceTypeLabel: Record<string, string> = {
  template: 'Template', checklist: 'Checklist', guide: 'Guide', config: 'Config',
};
export const ventureStatusLabel: Record<string, string> = {
  active: 'Active', development: 'In development', stealth: 'Stealth', complete: 'Complete',
};

// ── Collections ─────────────────────────────
// Featured first, then newest first (stable sort preserves file order among equals).
export async function getContent() {
  const projects = (await getCollection('projects', e => !e.data.draft))
    .sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || (a.data.date < b.data.date ? 1 : -1));
  const resources = (await getCollection('resources', e => !e.data.draft))
    .sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
  const ventures = await getCollection('ventures', e => !e.data.draft);
  return { projects, resources, ventures };
}

// Article routes: drafts get a page under `npm run dev` so they can be previewed,
// but never in a build. The homepage lists stay draft-free in both.
export const routable = (e: { data: { draft: boolean } }) => import.meta.env.DEV || !e.data.draft;

// Homepage sections in nav order. Empty collections still show, with a
// "coming soon" tile, so every section is always there.
export const sections = [
  { id: 'about',     label: 'About' },
  { id: 'skills',    label: 'Skills' },
  { id: 'resources', label: 'Resources' },
  { id: 'projects',  label: 'Projects' },
  { id: 'ventures',  label: 'Ventures' },
];

// ── Text ────────────────────────────────────
// Convert **bold** markers in config text to <strong> tags.
export const inlineBold = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

export function readingMinutes(body: string | undefined) {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
