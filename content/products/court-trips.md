---
title: "Court Trips"
description: "Airbnb for racket sports vacations: tennis, padel and pickleball trips in one place."
url: "https://www.courttrips.com"
status: "live"
tags: ["Racket sports travel"]
screenshots:
  - src: "/images/products/court-trips/home.webp"
    alt: "Court Trips home page with a sport picker, a tennis court drawing, a featured tennis week in Crete, and a search bar for country, dates, level and format"
    caption: "The home page. Pick a sport, then search by country, dates, level and format."
  - src: "/images/products/court-trips/trips.webp"
    alt: "Court Trips listing of 20 tennis trips as cards with location, price and departure dates; one card shows a court drawing in place of a photo"
    caption: "Every trip with its price and upcoming departures."
  - src: "/images/products/court-trips/program.webp"
    alt: "Court Trips page for a tennis camp at Lake Garda with photos, coaching hours, group size, court surface and price"
    caption: "A trip page, with the details you need before you contact the organiser."
---

The idea came from two holidays. I went to Phuket on a tennis-themed trip, and on an earlier visit to Bali I'd stumbled onto tennis and padel clubs I hadn't planned for. It turned out this wasn't just me. [Travelling to play](https://www.bbc.com/travel/article/20250804-pickleball-to-tennis-why-everyones-travelling-to-hit-a-ball) is a real and growing trend across tennis, padel and pickleball. The trips themselves, though, are scattered across club sites, resort pages and word of mouth. Court Trips puts them in one place.

At La Cafe, agents helped build the business. At Court Trips, an agent also works inside the product. It reads operator sites and drafts every listing, and I review each one before it goes live.

## The format came first

Before an agent read a single page, I wrote down what a trip is. Every listing follows one schema, now at version 2.2:

- **What and who:** sport, category (camp, clinic or social getaway), level, organiser, coaches and languages.
- **Where:** country, region, venue and coordinates.
- **When:** each departure with its own dates and price, or a schedule note such as "Held each November; 2027 dates to be announced".
- **How much:** a price range, the currency, and what's included.
- **On court:** surface, total coaching hours, player-to-coach ratio, group size, and UTR, NTRP or DUPR ranges.

The schema carries its own quality rules too. A listing missing a title, organiser, sport, country, level or dates is flagged for review. Each one records the page it came from, when it was last seen, and a confidence score.

To show the agent what good looks like, I hand-checked 27 programs from a few existing retreat lists: three per sport for each of the three trip types.

## An agent that reads, not guesses

The agent's instructions sit in one file, which does the job La Cafe's recipe files did. Its rules are short:

- **Only what the page says.** If the page doesn't say it, the field stays empty. Nothing is filled in from general knowledge.
- **One program, one listing.** Different dates of the same trip are departures, not separate trips.
- **Fixed answers.** Surface, level and similar fields must use the set options.
- **Plain descriptions.** One to three sentences, with no marketing adjectives.

> The most useful rule I gave the agent was to leave a field empty rather than guess.

Claude Code started by drawing up 82 source pages across North America, Europe, Southeast Asia, and the Maldives and Caribbean, with an estimate of what each should yield. It also flagged the gaps: there are no padel trips in North America, American pickleball would swamp everything else unless capped, and Maldives programs are mostly one-off visits by touring pros.

The harvest then runs in three steps:

1. **Fetch.** A plain script downloads every source page and notes which ones have changed. No AI is involved, so it costs nothing.
2. **Read.** Claude Code reads only the changed pages and writes one structured file per program.
3. **Import.** The files land in the database as drafts. I review each one in an admin area and publish it by hand.

The first harvest produced about 100 listings. Around 15 pages couldn't be read, mostly sites built in JavaScript, and the agent skipped them rather than guess.

## Building it with Claude Code

This was orchestrated, not vibe-coded. I made the product decisions first: the listing format, the stack, the layout and the visual direction. Claude Code had to ask before changing the format. The backend was planned in four phases (listings in Postgres, click tracking, operator submissions and an admin area), and each one landed as its own pull request with a preview deploy.

Every deploy passes an automated check before it goes live. It loads the key pages, every trip page and every photo. If anything fails, the previous version keeps serving.

The moments I stepped in taught me the most:

- **Broken photos.** The first deploy showed broken images because the photos had never been uploaded. Rather than patch it, I asked for a lasting fix: proper photo storage, plus a check that blocks any deploy that would break them. That became a standing rule for the project: build an operational MVP, not a demo.
- **Lost clicks.** The first click tracking wrote to a file. That works on a laptop and fails silently on Vercel, so every click was lost until it moved to a database.
- **Confusing cards.** One card per departure confused first-time visitors. Now it's one card per trip, with its upcoming dates underneath.
- **Off-by-one dates.** One operator's pages showed dates a day early. The agent's rules now prefer the dates in that operator's booking links.

## The look

The reference was Airbnb's home page, with venue photos leading. The signature element is a court drawn to scale that switches between tennis, padel and pickleball, and court-surface colours run through the rest of the site. The type is Schibsted Grotesk, and an optic-yellow accent is saved for the main buttons. If a trip's photo fails to load, the site shows that sport's court instead of a broken image.

The wordmark is a lowercase "courttrips", where the dot on the "i" is a lime ball that could belong to any of the three sports. The icon took the most rounds. A paper plane never looked right and was dropped. A tennis-court drawing would have left out padel and pickleball. An all-lime globe looked like a slime ball. It ended up as a "ct" monogram with a small globe for the ball. A script generates every logo file, so any version can be rebuilt.

## Where it stands

Court Trips lists 51 trips with 150 departures across 17 countries, split fairly evenly between the three sports. Spain leads with 15. Visitors can search, see prices in their own currency, check Google and Tripadvisor ratings, and follow a link to the organiser to book. Operators can submit their own programs.

There's no booking on the site, and that's deliberate. Organisers know their dates, availability and terms better than I do, so Court Trips sends you to them. It's meant to be good at one thing: helping you find the trip.

Next is switching on the refresh. A script already runs fetch, read and import in one go and emails me a summary. Once it's scheduled every three days, safe changes to existing trips will go live on their own, and new trips will come to me as drafts. The directory keeps itself current, and I stay the editor.

After that comes a chat agent built on the same data. Every trip already has its dates, prices, levels, court surfaces and coaching hours in one format, so a visitor could simply ask "Which padel camps in Spain take beginners in April?" and get an answer straight from the listings.
