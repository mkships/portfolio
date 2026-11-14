# Musings of a Product Guy

I’m Manohar Kanapaka (MK). This portfolio brings together my product work, experiments with AI, and the things I make time for outside work. [Visit the portfolio](https://mkanapaka.space/).

## From case studies to things you can try

Professional Work opens with SuperK. A small diagram shows how its rules engine handled different ordering, returns, and replenishment rules across franchise stores.

Tinkertank shows Court Trips, courtsidebio and La Cafe with screenshots of the real products. Each has a short write-up on why I built it and what it does.

Beyond Work pairs a calculator inspired by my fitness journey with Court Notes, a photo strip of the courts and people I remember.

## The details that make it feel personal

A narrow column, warm paper tones, and moss accents give the site the feel of a printed notebook. The headings use Plus Jakarta Sans. Each Tinkertank project brings its own colours to its sharing image.

Court Notes frames photos like slightly crooked prints. The MK stamp gives a small bounce and takes you back to the top. On phones, the X button gets its own row, with the other social links grouped beside the stamp below.

## Working on the site

Content lives in `content/` as Markdown. Run `npm ci` and `npm run dev` for local development, or `npm run build` to check production. [Project requirements](requirements.md).

### Writing a musing

Add a Markdown file in `content/musings/` with a `title` and a `kind` of `note`, `essay`, or `repost`. The filename sets the slug. Use the body for the note, essay, or repost excerpt. For an essay, add a plain-text `excerpt` for the feeds. For a repost, add an HTTPS `originalUrl` and optional `context`. An optional `embed` object uses `provider: linkedin` and the provider’s iframe `url`, or `provider: x` or `provider: youtube` with a quoted `id`.

Set `draft: true` and run `MUSINGS_PREVIEW=1 npm run dev` to review unpublished entries. When an entry is approved, remove `draft` and add a quoted `date` in `YYYY-MM-DD` format. The standard build excludes drafts.

Every entry needs `topics`, a list with one or more of `thoughts`, `tech`, `tennis`, and `fitness` (defined in `src/lib/musing-topics.ts`). These are the archive filters, and an unknown slug fails the build. Add `featured: true` to show an entry in the Musings section of the home page, which lists up to three featured entries, newest first.

For a post from X, use `kind: repost` with the post text as the body, the post’s date, its URL as `originalUrl`, and `embed` with `provider: x` and the post `id`. Line breaks in the body are kept. For a reply or quote post, add a one-line `context` saying what it responds to. The archive shows 20 entries at a time.
