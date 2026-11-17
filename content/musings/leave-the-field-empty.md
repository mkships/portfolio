---
title: "Leave the field empty"
kind: essay
topics: [tech]
date: "2026-11-17"
excerpt: "I built a cloud kitchen and a travel directory almost entirely with agents. The code was the easy part. The work that mattered was the format, the rules, and deciding where a human stays in the loop."
---

I think the most important decision in an agentic workflow is where the human sits. Over the past few months I built two things almost entirely with agents: [La Cafe](/products/la-cafe), a cloud kitchen in Hyderabad, and [Court Trips](/products/court-trips), a directory of tennis, padel and pickleball trips. Getting code written was the easy part. The work that mattered was deciding the format, writing the rules, and choosing where a person signs off.

## From a chat to a pipeline

A chatbot answers a question. An agent takes a goal, uses tools and works through the steps on its own. That difference sounds small until an agent becomes part of the product.

At Court Trips, nobody watches the agent work. A script downloads operator pages, Claude Code reads the ones that changed and writes one structured file per trip, and another script loads those files into the database. Claude Code runs with a fixed list of tools it's allowed to use, and nothing else. It isn't a tool I pick up. It's a step in the pipeline.

Once an agent is a step, every workflow has to answer the same question: where does a person come in?

## Give the agent a shape to fill

Both projects worked because the data had a shape before an agent touched it.

At La Cafe, every recipe is data: this much chicken and this much oil makes ten orders. That one decision did the heavy lifting later. Pricing became arithmetic, the dish photos were generated from the recipes, and the kitchen software can estimate how many of each dish the shelves can still make.

At Court Trips, every trip follows one schema: sport, level, dates, price, court surface, coaching hours, group size. The agent fills in a form I designed, with fixed options where the answer should be one of a few, and 27 trips I checked by hand as worked examples.

A shape helps the human as much as the agent. Reviewing a listing means checking fields, not reading prose and wondering what's wrong with it.

## Leave the field empty

The most useful rule I gave the agent was four words long: only what the page says. If a page doesn't mention the court surface, the field stays empty. Nothing gets filled in from general knowledge.

Models are built to be helpful. Ask one for a court surface and it will give you one, probably a plausible one. A plausible wrong answer is worse than a blank, because a blank is visible and a guess isn't.

> An empty field is honest. A confident guess is a bug nobody sees.

The same thinking runs through the rest of the harvest. Every listing records the page it came from and a confidence score, and anything missing a required field is flagged for review. When the agent couldn't read about 15 pages, mostly sites built in JavaScript, it skipped them rather than guess.

## Put the human where the risk is

Human-in-the-loop doesn't mean approving every step. That just turns the agent into a slow intern. It means putting review where a mistake is expensive or public, and letting the agent run everywhere else.

The rough rule I've ended up with:

- **Let it run** when the work is cheap to redo and nobody outside sees it. Fetching pages and drafting listings happen with no one watching.
- **Make it ask** when it's changing something other parts depend on. Claude Code had to check with me before changing the trip format.
- **Keep the final say** when it reaches customers, money or production. New trips arrive as drafts, and I publish each one by hand. I approved every change in the Vercel and GitHub dashboards myself and copied the secrets in myself. The agent never held the keys to production.

Some review doesn't need me in the moment. Every Court Trips deploy has to pass an automated check that loads every page and every photo. If anything fails, the previous version keeps serving. That's my judgement written down once and enforced every time, sometimes called being on the loop rather than in it. The planned refresh works the same way. Safe changes to existing trips will go live on their own, and new trips will still come to me.

La Cafe has its own version. Agents researched the name, the logo patterns, the colours and the ingredient prices. I made the calls, down to changing *Le* to *La*. The testimonials on the site are real, from chef tastings and a closed tasting group. That's one loop no agent can close for you.

## What I still had to catch

The agents rarely got things wrong in the way people expect. They did what I asked, in a world they couldn't see.

- **The first La Cafe site** was a vibe-coded template and looked like every other AI-generated site. The second was built with Codex to a structure I defined.
- **The first Court Trips deploy** showed broken images, because the photos had never been uploaded.
- **The first click tracking** wrote to a file. That works on a laptop and fails silently on Vercel, so every click was lost.

None of these were bad code. Each was a gap between a demo and something that runs. After the broken photos, I asked for a lasting fix instead of a patch, and that became a standing rule for the project: build an operational MVP, not a demo.

## The shape of the job now

Agents make demos cheap. Anyone can have a working-looking site by the afternoon. What turns that into a kitchen that prices its own menu, or a directory that keeps itself current, is everything around the agent: the format it fills, the rules it follows and the points where a person signs off.

I wrote about how this changes the product role in [Pivoting from a PM to an AI-native builder](/musings/pivoting-from-pm-to-ai-native-builder). This is the practical side of it. The agent does the volume. I decide the shape, the rules and where I stay in the loop.
