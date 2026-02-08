# CLAUDE.md — Personal Portfolio Website

## Project Overview

Build and deploy a single-page personal portfolio website. The site is minimalistic and modern with
three primary content areas: a bio/hero section, a case-studies section (one-pager style write-ups),
and a product catalogue showcasing digital products/apps (upcoming or live).

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | File-based routing, SSG, easy Vercel deploy |
| Language | TypeScript | Type safety across pages and data |
| Styling | Tailwind CSS | Utility-first, fast iteration, no CSS bloat |
| Font | Source Sans 3 (body) + Playfair Display (headings) via `next/font/google` | Refined editorial contrast; avoids generic system fonts |
| Hosting | Vercel | Zero-config deploys from GitHub |
| Content | Local `.md` files in `content/` parsed at build time | No CMS dependency; version-controlled content |

---

## Project Structure

```
portfolio/
├── CLAUDE.md                    ← this file (requirements)
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
│
├── content/                     ← Markdown source files
│   ├── bio.md                   ← Hero / about content
│   ├── case-studies/
│   │   └── *.md                 ← One case study per file (frontmatter + body)
│   └── products/
│       └── *.md                 ← One product per file (frontmatter + body)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Root layout (nav, footer, font imports)
│   │   ├── page.tsx             ← Home: Hero + previews
│   │   ├── case-studies/
│   │   │   ├── page.tsx         ← Listing grid
│   │   │   └── [slug]/page.tsx  ← Full case-study view
│   │   └── products/
│   │       ├── page.tsx         ← Product catalogue grid
│   │       └── [slug]/page.tsx  ← Full product detail view
│   │
│   ├── components/
│   │   ├── Nav.tsx              ← Minimal top nav with smooth-scroll or router links
│   │   ├── HeroSection.tsx      ← Bio / headline area
│   │   ├── CaseStudyCard.tsx    ← Card used in listing grid
│   │   ├── ProductCard.tsx      ← Card used in catalogue grid
│   │   └── Footer.tsx           ← Minimal footer
│   │
│   └── lib/
│       ├── posts.ts             ← Utility: reads & parses .md files from content/
│       └── types.ts             ← Shared TypeScript interfaces
│
└── public/
    └── images/                  ← Static images (logos, product screenshots)
```

---

## Design System

### Colour Palette (CSS variables in `tailwind.config.ts` or `globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0f0f0f` | Page background (dark) |
| `--surface` | `#1a1a1a` | Card / panel backgrounds |
| `--border` | `#2a2a2a` | Subtle dividers |
| `--text-primary` | `#f0f0f0` | Body copy |
| `--text-secondary` | `#8a8a8a` | Captions, meta text |
| `--accent` | `#c8ff00` | CTAs, links on hover, active states — the single pop of colour |
| `--accent-dim` | `#5a7a00` | Accent at lower intensity for backgrounds / glows |

### Typography Scale

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / H1 | Playfair Display | 700 | `clamp(2.5rem, 5vw, 4rem)` |
| H2 | Playfair Display | 600 | `clamp(1.75rem, 3vw, 2.25rem)` |
| H3 | Source Sans 3 | 600 | `1.25rem` |
| Body | Source Sans 3 | 400 | `1rem` / `1.6` line-height |
| Caption / Meta | Source Sans 3 | 400 | `0.85rem`, `text-secondary` |
| Monospace (code) | JetBrains Mono (optional) | 400 | `0.9rem` |

### Spacing & Layout

- Max content width: `860px` (centered, breathing room on all screens).
- Section vertical padding: `6rem` (desktop), scale down via responsive classes.
- Card gap in grids: `1.5rem`.
- Border-radius on cards: `8px`.
- No heavy shadows — use a single `border` in `--border` colour instead.

### Interaction & Motion

- Links and buttons: colour transitions on hover (`200ms ease`).
- Cards: subtle `translateY(-2px)` on hover (`300ms ease`).
- Page-load: stagger-reveal each section with a simple CSS `@keyframes fadeInUp` triggered on mount (use `IntersectionObserver` or a lightweight scroll-trigger).
- Keep motion minimal — one entrance animation per section is enough.

---

## Page Specifications

### 1. Home (`/`)

Sections rendered top-to-bottom:

1. **Nav** — fixed top bar. Logo/initials on left. Links (`Case Studies`, `Products`) on right. On mobile collapse into a hamburger.
2. **Hero** — Full-width. Reads bio content from `content/bio.md`. Displays a headline, a short paragraph intro, and optionally a CTA link (e.g., "View my work ↓"). Vertically center the text block in at least `100vh`.
3. **Case Studies Preview** — Section title + a horizontal or 2-col grid showing the *latest 3* case study cards. Each card: title, a one-line excerpt, and a "Read →" link. A "View all →" link routes to `/case-studies`.
4. **Products Preview** — Same layout pattern as above, pulling the latest 3 products from `content/products/`.
5. **Footer** — See below.

### 2. Case Studies Listing (`/case-studies`)

- Page header: title + optional subtitle.
- Responsive grid (1 col mobile → 2 col tablet → 3 col desktop) of `CaseStudyCard` components.
- Each card shows: cover image (or a generated placeholder colour block derived from the slug), title, date, tag/category, and a short excerpt.
- Cards link to `/case-studies/[slug]`.

### 3. Case Study Detail (`/case-studies/[slug]`)

- Rendered from the matching `.md` file.
- Frontmatter fields used:

  ```yaml
  ---
  title: string
  date: string          # e.g. "2024-11"
  tags: string[]
  excerpt: string       # one-line summary shown on cards
  coverColor: string    # optional hex, used as placeholder if no image
  ---
  ```

- Layout: single-column, max `860px`, centred. Render markdown body with clean prose styles (handled via Tailwind's `prose` plugin — configure to match the design system colours).
- Include a "← Back" link at top and bottom.

### 4. Products Catalogue (`/products`)

- Same grid layout as case-studies listing.
- Each `ProductCard` shows: product name, a short tagline, a status badge (`Coming Soon` | `Beta` | `Live`), and an optional link.

### 5. Product Detail (`/products/[slug]`)

- Frontmatter:

  ```yaml
  ---
  title: string
  tagline: string
  status: "coming-soon" | "beta" | "live"
  tags: string[]
  url: string           # optional external link
  coverColor: string
  ---
  ```

- Same single-column prose layout as case-study detail.
- If `url` is present, render a prominent CTA button ("Visit →") styled with `--accent`.

### 6. Footer

- Minimal single row: copyright text on left, social/contact links on right.
- Links styled in `text-secondary`, hover to `--accent`.

---

## Content Parsing (`src/lib/posts.ts`)

Write two generic helpers that work for both `case-studies/` and `products/`:

```typescript
// Returns sorted (newest first) list of all posts in a given content directory
export function getAllPosts(dir: string): PostMeta[]

// Returns frontmatter + body for a single post by slug
export function getPostBySlug(dir: string, slug: string): PostDetail | null
```

Use Node's `fs` and `path` to read files at build time. Parse frontmatter with a lightweight library such as `gray-matter`. Parse markdown to HTML with `marked` or `remark` + `rehype`.

---

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| `< 640px` | Single column layouts. Nav collapses to hamburger. Hero text left-aligned. |
| `640–1024px` | 2-column grids. Nav stays horizontal. |
| `> 1024px` | 3-column grids for listings. Full layout as designed. |

---

## Deployment Checklist

1. Push repo to GitHub (any branch name).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel auto-detects Next.js — no config changes needed.
4. Assign a custom domain if you have one (optional).
5. Every push to the default branch triggers an automatic redeploy.

---

## Placeholder Content (seed data)

Populate the following files so the site is not empty on first build. Replace with real content later.

### `content/bio.md`

```markdown
---
headline: "Designer & Builder"
subheadline: "Crafting digital products from concept to code."
---

I am a designer and developer who turns ideas into polished digital experiences.
With a background in product design and full-stack engineering, I focus on shipping
thoughtful, well-crafted work — from research and strategy through to production code.

Currently open to freelance projects and collaborations.
```

### `content/case-studies/brand-redesign.md`

```markdown
---
title: "Brand Redesign for Acme Co"
date: "2024-10"
tags: ["branding", "strategy"]
excerpt: "A full identity overhaul that increased engagement by 40%."
coverColor: "#2a4858"
---

## The Challenge

Acme Co's visual identity hadn't been updated in over a decade...

## Approach

We started with a comprehensive audit of the existing brand...

## Outcome

The redesigned identity rolled out across all touchpoints...
```

### `content/products/task-app.md`

```markdown
---
title: "TaskFlow"
tagline: "A minimalist task manager built for focus."
status: "coming-soon"
tags: ["productivity", "saas"]
coverColor: "#1e3a5f"
---

## What is TaskFlow?

TaskFlow is a distraction-free task manager designed for individuals
who value clarity over feature bloat...

## Features

- Single-list, drag-to-prioritise workflow
- End-of-day review prompts
- Local-first with optional cloud sync
```

---

## Notes for Claude Code

- Do **not** install any UI component library (no shadcn, no Radix). Build all components from scratch using plain Tailwind classes to keep the bundle tiny and the design fully custom.
- Keep the colour palette and typography exactly as specified — this is the brand.
- Every page must be statically generated (`generateStaticParams` for dynamic routes).
- Add `"use client"` only where interactivity actually requires it (nav hamburger toggle, scroll reveal).
- Write a `package.json` script `"dev"` → `next dev`, `"build"` → `next build`, `"start"` → `next start`.
- Ensure `next.config.ts` has `output: "export"` commented out by default (Vercel handles SSG natively).
- Do not add a README — this CLAUDE.md file is the single source of truth for the project.
