---
# The growth and distribution track shown at learn.mkanapaka.space/growth.
# Lesson ids are the keys that ticks, notes and questions are stored under, so never rename one.
# This track has no dates. `weeks` on a phase is the label readers see.
title: "Growth and distribution"
# The look of this track: "cool" (grey-blue, grotesk and mono) or "warm" (cream, orange, serif).
theme: "warm"
summary: "Paid acquisition from zero, starting with Meta ads."
intro: "Four phases, about 14 hours of video plus hands-on practice, to go from zero to a first live Meta ads test for a product I work on. At about 10 hours a week it runs about two weeks."

phases:
  - id: "ma-mechanics"
    name: "Platform mechanics and settings"
    weeks: "Week 1"
    meta: ["about 7 h of video"]
    outcome: "Know how Ads Manager works and what every setting does, in the current interface."
    outcomes:
      - "Explain what each setting does at campaign, ad set and ad level."
      - "Check that the pixel and conversion events are firing on the product’s site."
      - "List five settings where the default is wrong for this product."
    blocks:
      - label: "Watch"
        lessons:
          - { id: "ma-p1-tutorial", title: "Ben Heath: The BEST Facebook Ads Tutorial For Beginners in 2027", detail: "61 min · watch this first", href: "https://www.youtube.com/watch?v=wJTjW8DUj_8" }
          - { id: "ma-p1-advantage", title: "Meta Blueprint: Optimize your campaign with Meta Advantage", detail: "30 min, free · alongside the tutorial, before building the draft", href: "https://www.facebookblueprint.com/student/path/262533-meta-advantage-automation" }
          - { id: "ma-p1-setup", title: "Davila course: Facebook Ads Account Setup in Meta Business Suite", detail: "42 min", href: "https://www.udemy.com/course/facebookmarketingsystem/" }
          - { id: "ma-p1-campaign", title: "Davila course: Campaign Setup: Objectives, Budget and Placements", detail: "1 h 46" }
          - { id: "ma-p1-launch", title: "Davila course: Launch Facebook Ads Campaigns Step by Step", detail: "1 h 24" }
          - { id: "ma-p1-pixel", title: "Davila course: Meta Pixel Setup: Events and Custom Conversions", detail: "1 h 11" }
          - { id: "ma-p1-structure", title: "Ben Heath: The BEST Facebook Ad Campaign Structure for 2026", detail: "23 min", href: "https://www.youtube.com/watch?v=13s-G9Uj51A" }
      - label: "Do"
        lessons:
          - { id: "ma-p1-draft", title: "Build a full campaign in Ads Manager and leave it as an unpublished draft", project: true }
          - { id: "ma-p1-automation", title: "In the draft, note which audience, placement and budget settings are left for Meta to automate" }

  - id: "ma-audiences"
    name: "Audiences and lookalikes"
    weeks: "Week 2"
    meta: ["about 4 h of video"]
    outcome: "Decide who sees the ads: custom audiences, lookalikes, exclusions and broad targeting."
    outcomes:
      - "Build custom and lookalike audiences and set exclusions."
      - "Explain when a lookalike should beat broad targeting, and design a test that compares them."
    blocks:
      - label: "Watch"
        lessons:
          - { id: "ma-p2-target", title: "Davila course: Define the Target Audience for Your Facebook Ads", detail: "36 min" }
          - { id: "ma-p2-audiences", title: "Davila course: Facebook Ads Audiences: Custom, Lookalike and Detailed Targeting", detail: "2 h 3" }
          - { id: "ma-p2-retargeting", title: "Davila course: Facebook Ads Retargeting", detail: "19 min" }
          - { id: "ma-p2-better", title: "Ben Heath: I Found A BETTER Way To Do Meta Ads Targeting in 2026", detail: "16 min", href: "https://www.youtube.com/watch?v=bv8AsY0xkIk" }
          - { id: "ma-p2-blueprint", title: "Meta Blueprint: Defining your ad audience", detail: "31 min, free · right before the exercise below", href: "https://www.facebookblueprint.com/student/path/219694-define-audiences" }
          - { id: "ma-p2-funnel", title: "Davila course: Build a Facebook Ads Funnel That Turns Clicks into Sales", detail: "57 min", optional: true }
      - label: "Do"
        lessons:
          - { id: "ma-p2-source", title: "Work out which existing users could form a useful source audience, such as paying customers or people who finished a key action" }
          - { id: "ma-p2-lookalike", title: "Create a custom audience from that source or from site visitors, then a lookalike from it", project: true }
          - { id: "ma-p2-check", title: "In Ads Manager, check whether the lookalike acts as a suggestion or a restriction" }

  - id: "ma-creative"
    name: "Hooks, creative and competitors"
    weeks: "Week 2"
    meta: ["about 1.5 h of video"]
    outcome: "Know what the ads should say and show, and what competitors are already running."
    outcomes:
      - "Name the main creative formats and say which suit the product."
      - "Read a competitor’s ad library and infer what is working for them."
      - "Write hooks that differ in angle, not just wording."
    blocks:
      - label: "Watch"
        lessons:
          - { id: "ma-p3-tier", title: "Dara Denney: I Ranked 51 Meta Ad Creative Types (Tier List)", detail: "30 min", href: "https://www.youtube.com/watch?v=KmbEjy0UBT8" }
          - { id: "ma-p3-10k", title: "Dara Denney: I Made 10,000 Ads, Here’s What Works Right Now (in 2026)", detail: "16 min", href: "https://www.youtube.com/watch?v=4wM-i1cxtAM" }
          - { id: "ma-p3-easiest", title: "Dara Denney: The Easiest Way To Make Winning Meta Ads (in 2026)", detail: "16 min", href: "https://www.youtube.com/watch?v=p4yXXdnCgWg" }
          - { id: "ma-p3-static", title: "Dara Denney: How I Make AI Static Ads (in minutes)", detail: "25 min", href: "https://www.youtube.com/watch?v=5C5VhqW9HCc" }
          - { id: "ma-p3-spy", title: "Ben Heath: How To Spy On Your Competitors Meta Ads for FREE!", detail: "11 min", href: "https://www.youtube.com/watch?v=6s1iHL2mv0g" }
      - label: "Do"
        lessons:
          - { id: "ma-p3-competitors", title: "Review five competitors in the Meta Ad Library and note which ads have run longest" }
          - { id: "ma-p3-hooks", title: "Write ten hooks and three ad concepts for the product", project: true }

  - id: "ma-testing"
    name: "Testing, scaling and retiring"
    weeks: "Week 2"
    meta: ["about 1.5 h of video"]
    outcome: "Run a real test and decide which ads to retire, keep or scale."
    outcomes:
      - "Structure a creative test with a set budget and duration."
      - "Write down rules for when to retire an ad, keep it, or double down."
      - "Read the core metrics (CPM, CTR, cost per result) and say what each one shows."
    blocks:
      - label: "Watch"
        lessons:
          - { id: "ma-p4-newway", title: "Ben Heath: NEW Way To Test Facebook Ads!", detail: "18 min", href: "https://www.youtube.com/watch?v=9mUwsvSK0NY" }
          - { id: "ma-p4-andromeda", title: "Ben Heath: The NEW WAY To Test Facebook Ads (Post Andromeda)", detail: "15 min", href: "https://www.youtube.com/watch?v=onFwSud9C2Y" }
          - { id: "ma-p4-scale", title: "Ben Heath: The BEST Way To Scale Meta Ads", detail: "23 min", href: "https://www.youtube.com/watch?v=FyWyHJh_6Ng" }
          - { id: "ma-p4-small", title: "Ben Heath: How to CRUSH Facebook Ads with a Small Budget in 2026", detail: "28 min", href: "https://www.youtube.com/watch?v=XLagiyzYYpE" }
          - { id: "ma-p4-analyze", title: "Meta Blueprint: Analyze your ad campaign results in Meta Ads Manager", detail: "10 min, free · after drafting the ads, before launching", href: "https://www.facebookblueprint.com/student/path/211546-meta-ads-manager-campaigns-analysis-course" }
      - label: "Do"
        lessons:
          - { id: "ma-p4-reporting", title: "Set up reporting for spend, the chosen conversion event and cost per result" }
          - { id: "ma-p4-evidence", title: "Write down what evidence would mean keep running, revise or pause the test" }
          - { id: "ma-p4-launch", title: "Launch the first real test with a small, fixed budget", project: true }
          - { id: "ma-p4-academy", title: "Join the Ben Heath Meta Ads Academy for one month and bring live campaign questions to the weekly Q&A", href: "https://www.skool.com/benheath/about" }
---

## Final deliverable

The plan ends with a one-page “first moves on Meta” proposal for the product. It answers four questions, and each phase produces a piece of it.

| Question | Comes from |
| --- | --- |
| Which ad sets, formats and variants to start with | Phases 1 and 4 |
| Which hooks and copy to test | Phase 3 |
| What competitors are doing | Phase 3 |
| How to use lookalike audiences | Phase 2 |

## Notes

**Why these resources.** The [Davila course](https://www.udemy.com/course/facebookmarketingsystem/) was updated in November 2026 and is rated 4.6 from 2,416 ratings. Only its ads sections are used, about 9 of its 21 hours. Ben Heath and Dara Denney publish current videos on strategy and creative, which the course outline does not cover. Three free Meta Blueprint lessons add Meta’s own guidance on automation, audiences and reporting.

**Lookalikes are an open question.** Since Meta’s Andromeda delivery update, some agencies report that broad targeting with varied creative beats 1–2% lookalikes. Others say lookalikes still help when the seed list holds data Meta’s pixel lacks, such as paying customers. Sources: [adlibrary.com](https://adlibrary.com/posts/lookalike-audience), [Jetfuel](https://jetfuel.agency/why-we-stopped-using-lookalike-audiences-and-what-replaced-them/).

**What was not verified.** Durations, ratings and dates come from the course and video pages on 27 Nov 2026. The plan was put together before watching the videos, and the academy’s content sits behind its paywall. Davila sections were matched to topics by their titles.

**Cost.** The Davila course was ₹719 on sale on 27 Nov 2026. The academy is $69 a month and can be cancelled anytime. Everything else is free.

**After Meta.** Google Ads comes next, with Isaac Rudansky’s [Ultimate 2026 Google Ads Training](https://www.udemy.com/course/the-ultimate-google-adwords-training-course/) (35 hours, rated 4.5 from 55,651 ratings, updated January 2026).
