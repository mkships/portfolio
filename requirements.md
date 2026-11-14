# Portfolio requirements

## Project Overview

Musings of a Product Guy is Manohar Kanapaka’s personal portfolio. It brings together product management case studies, hands-on projects in Tinkertank, and personal notes on fitness and tennis. The site uses Next.js 16 App Router, TypeScript, and Tailwind CSS. Vercel deploys production from `main` at [mkanapaka.space](https://mkanapaka.space/).

## Project Structure

| Path | Purpose |
| --- | --- |
| `content/bio.md` | Homepage headline, introduction, and portrait reference |
| `content/case-studies/` and `content/products/` | Markdown entries with YAML frontmatter and filenames that determine route slugs |
| `src/app/` | Pages, shared layout, theme styles, bundled fonts, and social image route |
| `src/components/` | Header, footer, cards, fitness calculator, and Court Notes |
| `content/experience.md` and `public/resume.pdf` | Career timeline rows and the résumé offered for download |
| `src/lib/` | Content loading with `gray-matter` and `marked`, shared types, and project branding |
| `public/images/` | Portrait, case-study assets, project artwork, social images, and compressed tennis photos |

`npm run dev` starts the local site. `npm run build` runs the production build with webpack and pre-renders the content routes.

## Design System

- Use warm paper (`#FBF6EE`), cream panels (`#F7EDDD`), zinc text, and moss green accents. The dark theme uses near-black backgrounds and olive panels. Follow the system theme on first visit and remember manual changes.
- Use Plus Jakarta Sans for display headings and Inter for body copy and controls. Both fonts are bundled under `src/app/fonts/`. Use Menlo with system monospace fallbacks for small metadata such as Musings dates and the Court Notes counter.
- Keep content centred with a 48rem maximum width for the main layout and 42rem for most reading pages. Use 16px page gutters on phones and 24px from 640px. The project grid gains a second column at 640px. The hero and header navigation expand at 768px.
- Use softly rounded panels, thin borders, visible keyboard focus, and restrained motion. Respect reduced-motion preferences for smooth scrolling, entrance effects, the Court Notes strip, and the footer stamp.

## Page Specifications

| Route | Content and behaviour |
| --- | --- |
| `/` | Headline, introduction, and portrait with no buttons, featured SuperK case study with a rules-engine diagram, remaining case studies, the Career so far timeline with a résumé download, Musings, Tinkertank entries, and Beyond Work. Beyond Work includes the fitness calculator and a captioned tennis photo strip with browse and pause controls. The calculator opens as a bottom sheet on phones and a floating panel on larger screens. |
| `/case-studies` and `/case-studies/[slug]` | A list of case studies ordered by year and individual articles with tags, a return link, and navigation to the next study. |
| `/products` and `/products/[slug]` | The Tinkertank catalogue and project detail pages. Each entry shows a screenshot of the real product from the `screenshots` list in its frontmatter, its tags and status, a link to the write-up, and a link to the live site when `url` is set. Detail pages show the screenshots with captions above a short write-up on why the project was built and what it does. Entries marked `archived: true` stay accessible by URL and are omitted from the catalogue. The old Rackets & Retreats URL redirects to Court Trips, and the old Start.dev URL redirects to the career timeline. |
| `/api/social/[slug]` | A 1200 × 630 branded PNG for each of the three Tinkertank projects. Project pages reference these images in Open Graph and X sharing metadata. |

The shared header opens with a full-width bar that shows the `openTo` line from `content/bio.md` and a Get in touch link to the footer. Below it, the MK mark and the “Musings of a Product Guy” wordmark link home, followed by Work, Musings, Tinkertank, and Beyond work and the theme toggle. The wordmark is hidden on phones. On phones, those links sit behind a menu. The shared footer puts X first, groups email, LinkedIn, and Instagram below it on phones, and uses the MK stamp as a back-to-top control.
