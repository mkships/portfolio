---
title: "La Cafe"
description: "How agents helped name, brand, price and build a real cloud kitchen in Hyderabad."
image: "/images/products/la-cafe.webp"
url: "https://mk-lacafe.vercel.app/menu/"
status: "live"
tags: ["Cloud kitchen"]
screenshots:
  - src: "/images/products/la-cafe/menu.webp"
    alt: "La Cafe menu page with search, category filters, and dish cards showing photos, prices, calories and servings"
    caption: "The customer menu, with prices, estimated calories and serving sizes."
  - src: "/images/products/la-cafe/home.webp"
    alt: "La Cafe home page with the headline Gourmet food, mindfully made, and the round La Cafe logo"
    caption: "The home page and the brand we built alongside it."
---

La Cafe is a real cloud kitchen in Hyderabad. Nearly every decision behind it started as a conversation with an agent: the name, the logo, the colours, the prices, the dish photos and the website. The agents did the research and came up with options. We made the calls. This is how each piece came together, and where we drew the line.

## The name

We were cooking for a mid-premium to premium crowd in urban India. The menu is mostly gourmet, European and continental dishes, made the lighter way: air-fried, and cooked in better oils. The name had to feel bespoke without trying too hard, so I asked for the simplest French-sounding name possible. We landed, of course, on Le Cafe.

Then I changed one word. Most Indians have heard far more Spanish than French, mostly through Hollywood, and *La* sits more warmly on an Indian tongue than *Le*. French speakers will notice that café takes *le*. That's on purpose.

## The look

Before designing anything, I had ChatGPT run deep research on the posh cafés of Jubilee Hills in Hyderabad and Indiranagar in Bengaluru. One pattern kept coming up: stamp-style marks with curving, Latin-style lettering. That became the logo, with olive leaves to push the European feel further.

The same research settled the palette. Deep maroon and velvet red against warm cream came back as the combination that speaks to this crowd. The tagline, Bowls, Bites, Bakes, came out of the same session. The only brief was that it had to alliterate.

## The prices

This is where the agents earned their keep. We started by writing every recipe as data: this much raw chicken and this much oil makes ten orders of crunchy chicken popcorn, and so on across the menu.

> Once every recipe was data, pricing stopped being a guess and became arithmetic.

GPT then researched current ingredient prices on BigBasket, DMart, Blinkit and Instamart, which gave us the cost of every dish at the ingredient level. We set a target margin, which we can change with demand and the seasons, added the discounts we planned to run, and the prices fell out. As a last check, we had GPT compare them with the menus of other cafés and restaurants. We came out competitive.

## The dish photos

ChatGPT generated each dish photo from that dish's recipe and ingredients, so the plate in the picture is made of what actually goes in the box. For a delivery kitchen, the photo is all a customer sees before ordering, so it has to match what arrives.

## The website

This is the one part I didn't let an agent run free on. The first version was a vibe-coded Next.js template, and it looked like every other AI-generated site. So I pair-programmed the second with Codex. I defined the components, the page structure and the URLs, and Codex built inside them. The agent still wrote most of the code. It just wrote it to a plan.

## What an agent can't do

The testimonials on the site are real. They came from chef tastings and a closed tasting group. No agent can earn a customer's trust for you, and faking reviews would spend that trust before we'd earned any.

## What's next

The recipe files keep paying off. On top of them we've built most of a kitchen OS, which now needs refining:

- **Purchases.** Upload a grocery bill and the entries are made for you.
- **Supply shelf.** Shows what's on the shelves and roughly how many of each dish we can make from it. This only works because the recipes are data.
- **Monthly accounts.** Cash on hand and the rest of the books.

It runs separately from the customer menu, so we can keep changing how the kitchen works without touching what customers see.

The missing piece is the delivery apps. If Zomato and Swiggy shipped MCP servers, orders could flow straight into the supply shelf and the accounts, and the loop from order to restock would close on its own.
