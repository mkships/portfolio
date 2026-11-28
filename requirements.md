# Portfolio requirements

## Project Overview

Musings of a Product Guy is Manohar Kanapaka’s personal portfolio. It brings together product management case studies, hands-on projects in Tinkertank, and personal notes on fitness and tennis. The site uses Next.js 16 App Router, TypeScript, and Tailwind CSS. Vercel deploys production from `main` at [mkanapaka.space](https://mkanapaka.space/).

## Project Structure

| Path | Purpose |
| --- | --- |
| `content/bio.md` | Homepage headline, introduction, and portrait reference |
| `content/case-studies/` and `content/products/` | Markdown entries with YAML frontmatter and filenames that determine route slugs |
| `src/app/` | A bare root layout, the main site under `(site)/` with its header and footer, the learning space under `(learn)/learn/`, theme styles, bundled fonts, and social image route |
| `src/components/` | Header, footer, cards, fitness calculator, and Court Notes |
| `content/experience.md` and `public/resume.pdf` | Career timeline rows and the résumé offered for download |
| `content/learning/` | The learning space: `index.md` (the why, and track order) and one file per track with its phases and lessons. Lesson ids are the storage keys for ticks, notes and questions |
| `convex/` | Convex schema and functions behind the learning space. `convex/_generated/` is committed so Vercel builds without the Convex CLI |
| `src/lib/` | Content loading with `gray-matter` and `marked`, shared types, and project branding |
| `public/images/` | Portrait, case-study assets, project artwork, social images, and compressed tennis photos |

`npm run dev` starts the local site. `npm run build` runs the production build with webpack and pre-renders the content routes.

## Design System

- Use warm paper (`#FBF6EE`), cream panels (`#F7EDDD`), zinc text, and moss green accents. The dark theme uses near-black backgrounds and olive panels. Follow the system theme on first visit and remember manual changes.
- Use Plus Jakarta Sans for display headings and Inter for body copy and controls. Both fonts are bundled under `src/app/fonts/`. Use Menlo with system monospace fallbacks for small metadata such as Musings dates and the Court Notes counter.
- Keep content centred with a 48rem maximum width on every page, and cap article text at 65ch. Use 16px page gutters on phones and 24px from 640px. The project grid gains a second column at 640px. The hero and header navigation expand at 768px.
- Use softly rounded panels, thin borders, visible keyboard focus, and restrained motion. Respect reduced-motion preferences for smooth scrolling, entrance effects, the Court Notes strip, and the footer stamp.

### Learning space

The learning space does not use the palette above, and each part of it has its own look, set by `data-theme` on the page wrapper and defined in `src/app/(learn)/learn/learn.css`. All of it is scoped under `.learn`. A small MK mark links back to the main site, and the main header and footer are not shown. Text uses the browser's default smoothing, not the main site's antialiased setting.

- **Hub (`paper`)**: the main site's warm paper (`#FBF6EE`) and ink with a warm umber accent and no green. Headings use Plus Jakarta Sans, labels IBM Plex Mono. Each track's card shows its own colour in the progress bar and link.
- **AI engineering (`cool`)**: a working plan. Cool grey-blue paper (`#F3F5F8`), ink text, a blue accent, green for done and amber for overdue. Headings use Space Grotesk, labels and the left gutter IBM Plex Mono, with squared chips and buttons.
- **Growth (`warm`)**: a campaign plan. Cream paper (`#FBF4EC`), warm brown ink, a burnt orange accent (`#C2410C`), green for done and red for overdue. Headings use Fraunces, labels are small capitals in Inter, and chips and buttons are pills.

In every look, body copy is Inter, sections are separated by a 2px ink rule instead of panels, and lessons sit in a two-column timetable that stacks under 560px. Each has a dark variant. A track picks `cool` or `warm` with `theme` in its content file.

## Page Specifications

| Route | Content and behaviour |
| --- | --- |
| `/` | Headline, introduction, and portrait with no buttons, featured SuperK case study with a rules-engine diagram, remaining case studies, the Career so far timeline with a résumé download, a Learning in public block with the reason for studying and a row per track showing lessons done (re-read every five minutes), Musings, Tinkertank entries, and Beyond Work. Beyond Work includes the fitness calculator and a captioned tennis photo strip with browse and pause controls. The calculator opens as a bottom sheet on phones and a floating panel on larger screens. |
| `/case-studies` and `/case-studies/[slug]` | A list of case studies ordered by year and individual articles with tags, a return link, and navigation to the next study. |
| `/products` and `/products/[slug]` | The Tinkertank catalogue and project detail pages. Each entry shows a screenshot of the real product from the `screenshots` list in its frontmatter, its tags and status, a link to the write-up, and a link to the live site when `url` is set. Detail pages show the screenshots with captions above the write-up. Entries marked `archived: true` stay accessible by URL and are omitted from the catalogue. The old Rackets & Retreats URL redirects to Court Trips, and the old Start.dev URL redirects to the career timeline. |
| `/learn` and `/learn/[track]` | The learning space, served from `learn.mkanapaka.space` (hub at its root, tracks at `/ai-engineering` and `/growth`). On the main domain these paths redirect to the subdomain; on previews and localhost they are served as they are. `/learning` redirects to `/learn`. Each track shows a progress summary, filter chips, and numbered collapsible phases with lessons grouped by week or by Watch and Do. A lesson can carry a note and a list of questions, open or resolved. Readers see weeks and no dates. Everything is public and updates live. Only the owner can tick lessons or write, after unlocking the page once per device with a passphrase, and the unlocked view adds the dates, an on-schedule chip and overdue markers. Ticks, notes and questions are stored in Convex (`convex/`); without `NEXT_PUBLIC_CONVEX_URL` the pages render the plans alone. |
| `/api/social/[slug]` | A 1200 × 630 branded PNG for each of the three Tinkertank projects. Project pages reference these images in Open Graph and X sharing metadata. |

The shared header opens with a full-width bar that shows the `openTo` line from `content/bio.md` and a Get in touch link to the footer. Below it, the MK mark and the “Musings of a Product Guy” wordmark link home, followed by Work, Musings, Tinkertank, and Beyond work and the theme toggle. The wordmark is hidden on phones. On phones, those links sit behind a menu. The shared footer puts X first, groups email, LinkedIn, and Instagram below it on phones, and uses the MK stamp as a back-to-top control.
