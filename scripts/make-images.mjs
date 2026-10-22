// Regenerates public/og.png (social preview) and public/favicon.ico from SVG.
// Run with: npm run images  (uses sharp, which Astro already installs)
// The text comes from src/site.config.ts, so re-run it after editing the
// name, title, tagline, url or datasheet. Colours match the light theme.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { site } from '../src/site.config.ts';

const ink = '#241a1d', grey = '#6e5d59', thin = '#e6dad6', paper = '#f7f0ee', red = '#a93a5a';
const font = 'Arial, Helvetica, sans-serif', serif = 'Georgia, serif';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const host = site.url.replace(/^https?:\/\//, '').replace(/\/+$/, '');

// The tagline sets one sentence per line, as in the hero. Shrink the type
// when the longest line would run past the right margin (~0.55em per glyph).
const lines = site.tagline.split(/(?<=\.)\s+/).slice(0, 3);
const longest = Math.max(...lines.map((l) => l.length));
const size = Math.min(76, Math.floor(1072 / (longest * 0.55)));
const tagline = lines
  .map((l, i) => `<tspan x="64" y="${220 + i * Math.round(size * 1.13)}">${esc(l)}</tspan>`)
  .join('');

// Datasheet: the first row goes in the accent cell, the second under the
// name, and the next four in the table on the right (the last in accent).
const [hot = { key: '', value: '' }, low = { key: '', value: '' }, ...rest] = site.datasheet;
const side = rest.slice(0, 4);
const rows = side.map((r, i) => {
  const y = 428 + i * 41;
  const fill = i === side.length - 1 ? red : ink;
  return `<text x="760" y="${y}" fill="${grey}">${esc(r.key)}</text><text x="1136" y="${y}" fill="${fill}" text-anchor="end">${esc(r.value)}</text>`;
}).join('\n    ');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <line x1="0" y1="84" x2="1200" y2="84" stroke="${thin}" stroke-width="2"/>
  <text x="64" y="64" font-family="${font}" font-size="24" font-weight="700" fill="${ink}">${esc(site.name)}</text>
  <text x="1136" y="64" font-family="${font}" font-size="22" fill="${grey}" text-anchor="end">${esc(host)}</text>
  <text font-family="${serif}" font-size="${size}" font-weight="700" fill="${ink}" letter-spacing="-2">
    ${tagline}
  </text>
  <g font-family="${font}">
    <rect x="64" y="400" width="640" height="166" rx="16" fill="#fbf6f5" stroke="#cdbab4" stroke-width="2"/>
    <line x1="64" y1="484" x2="704" y2="484" stroke="${thin}" stroke-width="2"/>
    <line x1="384" y1="484" x2="384" y2="566" stroke="${thin}" stroke-width="2"/>
    <text x="88" y="440" font-family="${serif}" font-size="34" font-weight="700" fill="${ink}">${esc(site.name)}</text>
    <text x="88" y="470" font-size="22" fill="${grey}">${esc(site.title)}</text>
    <text x="88" y="516" font-size="18" fill="${grey}">${esc(low.key)}</text>
    <text x="88" y="546" font-size="20" fill="${ink}">${esc(low.value)}</text>
    <path d="M385 485h318v65a15 15 0 0 1-15 15H385z" fill="${red}"/>
    <text x="408" y="516" font-size="18" fill="#ffffff">${esc(hot.key)}</text>
    <text x="408" y="546" font-size="24" fill="#ffffff">${esc(hot.value)}</text>
  </g>
  <g stroke="${thin}" stroke-width="1.5">
    <line x1="760" y1="400" x2="1136" y2="400"/><line x1="760" y1="441" x2="1136" y2="441"/>
    <line x1="760" y1="482" x2="1136" y2="482"/><line x1="760" y1="523" x2="1136" y2="523"/>
    <line x1="760" y1="566" x2="1136" y2="566"/>
  </g>
  <g font-family="${font}" font-size="20">
    ${rows}
  </g>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og.png');

// favicon.ico: browsers accept a PNG payload served as /favicon.ico.
const fav = await readFile('public/favicon.svg');
await sharp(fav, { density: 384 }).resize(32, 32).png().toFile('public/favicon.ico');

console.log('wrote public/og.png and public/favicon.ico');
