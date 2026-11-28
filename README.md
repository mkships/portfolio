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

Every entry needs `topics`, a list with one or more of `thoughts`, `tech`, `tennis`, and `fitness` (defined in `src/lib/musing-topics.ts`). These are the archive filters, and an unknown slug fails the build. The Musings section of the home page lists the three newest essays.

For a post from X, use `kind: repost` with the post text as the body, the post’s date, its URL as `originalUrl`, and `embed` with `provider: x` and the post `id`. Line breaks in the body are kept. For a reply or quote post, add a one-line `context` saying what it responds to. The archive shows 20 entries at a time.

### Updating the learning space

The learning space lives at [learn.mkanapaka.space](https://learn.mkanapaka.space) and is built from `content/learning/`. `index.md` holds the reason for learning, shown on the home page and the hub, and the list of tracks. Each track is its own file.

A track has phases, a phase has blocks, and a block has lessons. A lesson needs an `id` and a `title`; `detail`, `href`, `project`, `optional` and `cut` are optional. A block needs either a `label` such as `Watch`, or a `due` date on a track that has `starts`, in which case readers see “Week 1”, “Week 2” worked out from the two dates. Dates are quoted `YYYY-MM-DD` and are only shown when editing is unlocked. Anything after the frontmatter is rendered below the phases. To add a track, add its file and list it in `index.md`. A track’s `theme` is `cool` (grey-blue, used for AI engineering) or `warm` (cream and orange, used for growth).

Never rename a lesson `id` once it is live. Ticks, notes and questions are stored under it, so a renamed lesson loses them. An id used twice, even in two tracks, fails the build, as does a bad date or a link that is not HTTPS.

Ticks, notes and questions live in Convex, not in this repository. The pages show them to everyone and let only the owner change them. To edit, choose “Unlock editing” at the bottom of a track and enter the passphrase once per device. The passphrase is the `LEARNING_OWNER_KEY` environment variable on the Convex deployment and is at least 16 characters.

The site needs one variable, `NEXT_PUBLIC_CONVEX_URL`, locally in `.env.local` and on Vercel. `.env.example` lists the names. Without it the pages render the plans alone.

Locally, and on Vercel previews, the space is at `/learn`. To test the subdomain rules, open the dev server as `learn.localhost`.

For local testing, `CONVEX_AGENT_MODE=anonymous npm run convex:dev` starts a local backend that needs no Convex account, with its own empty data, and writes its address to `.env.local`. Set a throwaway `LEARNING_OWNER_KEY` on it with `npx convex env set` to try editing.

Vercel does not deploy the Convex functions. After changing anything in `convex/`, put a production deploy key in `.env.convex-prod` as `CONVEX_DEPLOY_KEY`, run `npm run convex:deploy`, and commit the regenerated `convex/_generated/` files.
