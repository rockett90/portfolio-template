import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['build', 'guide', 'document', 'wip']),
    tags: z.array(z.string()),
    date: z.string(),
    status: z.string().optional(),
    repo: z.string().url().optional(),
    youtube: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['template', 'checklist', 'guide', 'config']),
    tags: z.array(z.string()),
    updated: z.string(),
    // A resource resolves to one of three things, in priority order:
    //   file → a download from this repo's public/files/ folder
    //   url  → an externally-hosted link (public repo, docs, template, asset)
    //   (neither) → a readable page generated at /resources/<slug>
    file: z.string().optional(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const ventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ventures' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.enum(['active', 'development', 'stealth', 'complete']),
    founded: z.string().optional(),
    domain: z.string().optional(),
    logo: z.string().optional(),
    url: z.string().url().optional(),
    email: z.string().email().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, resources, ventures };
