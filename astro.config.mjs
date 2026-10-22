// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { readdirSync } from 'node:fs';
import { site } from './src/site.config.ts';

// Files present in public/ at build time. Pages run in workerd while
// prerendering (no filesystem), so optional assets such as cv.pdf are
// checked here and handed over as a constant.
const publicFiles = readdirSync('public', { recursive: true })
  .map((f) => '/' + String(f).replace(/\\/g, '/'));

// Turn a paragraph that contains only an image with alt text into a
// <figure> + <figcaption>, so `![caption](src)` renders a captioned image
// with no extra Markdown syntax. Images without alt text are left as-is.
function rehypeFigure() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'p') {
          const real = child.children.filter(
            (c) => !(c.type === 'text' && !c.value.trim())
          );
          if (real.length === 1 && real[0].type === 'element' && real[0].tagName === 'img') {
            const img = real[0];
            const alt = (img.properties?.alt ?? '').toString().trim();
            if (alt) {
              return {
                type: 'element', tagName: 'figure', properties: {},
                children: [
                  img,
                  { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: alt }] },
                ],
              };
            }
          }
        }
        return child;
      });
      node.children.forEach(walk);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  // Absolute site URL, set once as `url` in src/site.config.ts.
  // Needed for the sitemap, robots.txt and canonical/social-preview URLs.
  site: site.url,
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    define: {
      __PUBLIC_FILES__: JSON.stringify(publicFiles),
      // workerd's clock is frozen during prerender, so the build date comes from here.
      __BUILT_ON__: JSON.stringify(new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })),
    },
  },
  markdown: {
    // Light + dark code themes; the dark one is applied via CSS in global.css
    // (keyed off the site's [data-theme="dark"] toggle).
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
    // Astro 7 defaults to the Sätteri processor; these plugins need the
    // remark/rehype (unified) one.
    // remark-math parses $inline$ and $$block$$; rehype-katex renders it to
    // HTML at build time (no client-side JS — just the KaTeX stylesheet,
    // imported in the article page components).
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeFigure, rehypeKatex],
    }),
  },
});
