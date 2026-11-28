import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// Storage for the /learning page. `itemId` is a lesson id from content/learning.md.
export default defineSchema({
  progress: defineTable({
    itemId: v.string(),
    doneOn: v.string(),
  }).index('by_item', ['itemId']),

  notes: defineTable({
    itemId: v.string(),
    body: v.string(),
    updatedAt: v.number(),
  }).index('by_item', ['itemId']),

  questions: defineTable({
    itemId: v.string(),
    text: v.string(),
    answer: v.optional(v.string()),
    resolvedOn: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_item', ['itemId']),
})
