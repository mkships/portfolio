# Musings of a Product Guy

I’m Manohar Kanapaka (MK). This portfolio brings together my product work, experiments with AI, and the things I make time for outside work. [Visit the portfolio](https://mkanapaka.space/).

## From case studies to things you can try

Professional Work opens with SuperK. A small diagram shows how its rules engine handled different ordering, returns, and replenishment rules across franchise stores.

In Tinkertank, you can filter Court Trips by sport, preview a coach inquiry in courtsidebio, browse La Cafe’s menu, or step through a sample Startdotdev growth workflow. The write-ups explain how each idea took shape.

Beyond Work pairs a calculator inspired by my fitness journey with Court Notes, a photo strip of the courts and people I remember.

## The details that make it feel personal

A narrow column, warm paper tones, and moss accents give the site the feel of a printed notebook. The headings use Plus Jakarta Sans. Each featured project brings its own colours and artwork to its preview and sharing image.

Court Notes frames photos like slightly crooked prints. The MK stamp gives a small bounce and takes you back to the top. On phones, the X button gets its own row, with the other social links grouped beside the stamp below.

## Working on the site

Content lives in `content/` as Markdown. Run `npm ci` and `npm run dev` for local development, or `npm run build` to check production. [Project requirements](requirements.md).

### Writing a musing

Add a Markdown file in `content/musings/` with a `title` and a `kind` of `note`, `essay`, or `repost`. The filename sets the slug. Use the body for the note, essay, or repost excerpt. For an essay, add a plain-text `excerpt` for the feeds. For a repost, add an HTTPS `originalUrl` and optional `context`. An optional `embed` object uses `provider: linkedin` and the provider’s iframe `url`, or `provider: x` or `provider: youtube` with a quoted `id`.

Set `draft: true` and run `MUSINGS_PREVIEW=1 npm run dev` to review unpublished entries. When an entry is approved, remove `draft` and add a quoted `date` in `YYYY-MM-DD` format. The standard build excludes drafts.

The archive uses `kind` for the Essays and Unfiltered thoughts filters. Add `topic: building-with-ai` to include any entry in Building with AI.
