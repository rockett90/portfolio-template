// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
  adapter: cloudflare(),
  markdown: {
    // Light + dark code themes; the dark one is applied via CSS in global.css
    // (keyed off the site's [data-theme="dark"] toggle).
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
    // remark-math parses $inline$ and $$block$$; rehype-katex renders it to
    // HTML at build time (no client-side JS — just the KaTeX stylesheet,
    // imported in the article page components).
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeFigure, rehypeKatex],
  },
});
