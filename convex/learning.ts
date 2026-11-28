import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Everything here is public to read. Every write needs the owner passphrase, which is compared
// with the LEARNING_OWNER_KEY variable set on the deployment and never stored in the database.

const maxRows = 500
const maxNote = 20000
const maxQuestion = 600
const maxAnswer = 4000
const itemIdPattern = /^[a-z0-9][a-z0-9-]{0,63}$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

function sameText(a: string, b: string) {
  let difference = a.length ^ b.length
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    difference |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0)
  }
  return difference === 0
}

function requireOwner(key: string) {
  const expected = process.env.LEARNING_OWNER_KEY
  if (!expected || expected.length < 16) {
    throw new ConvexError('Editing is not set up on this deployment yet.')
  }
  if (!sameText(key, expected)) {
    throw new ConvexError('Wrong passphrase.')
  }
}

function checkItem(itemId: string) {
  if (!itemIdPattern.test(itemId)) throw new ConvexError('Unknown lesson.')
}

function checkDate(date: string) {
  if (!datePattern.test(date)) throw new ConvexError('Dates must be YYYY-MM-DD.')
}

export const state = query({
  args: {},
  handler: async ctx => {
    const [progress, notes, questions] = await Promise.all([
      ctx.db.query('progress').take(maxRows),
      ctx.db.query('notes').take(maxRows),
      ctx.db.query('questions').take(maxRows),
    ])

    const done: Record<string, string> = {}
    for (const row of progress) done[row.itemId] = row.doneOn

    const noteMap: Record<string, { body: string; updatedAt: number }> = {}
    for (const row of notes) noteMap[row.itemId] = { body: row.body, updatedAt: row.updatedAt }

    const stamps = [
      ...progress.map(row => row._creationTime),
      ...notes.map(row => row.updatedAt),
      ...questions.map(row => row.updatedAt),
    ]

    return {
      done,
      notes: noteMap,
      questions: questions
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(row => ({
          id: row._id,
          itemId: row.itemId,
          text: row.text,
          answer: row.answer,
          resolvedOn: row.resolvedOn,
          createdAt: row.createdAt,
        })),
      updatedAt: stamps.length > 0 ? Math.max(...stamps) : null,
    }
  },
})

export const verifyKey = mutation({
  args: { key: v.string() },
  handler: async (_ctx, args) => {
    requireOwner(args.key)
    return true
  },
})

export const setDone = mutation({
  args: { key: v.string(), itemId: v.string(), done: v.boolean(), on: v.string() },
  handler: async (ctx, args) => {
    requireOwner(args.key)
    checkItem(args.itemId)
    checkDate(args.on)

    const rows = await ctx.db
      .query('progress')
      .withIndex('by_item', q => q.eq('itemId', args.itemId))
      .take(10)

    if (!args.done) {
      for (const row of rows) await ctx.db.delete(row._id)
      return
    }
    if (rows.length === 0) await ctx.db.insert('progress', { itemId: args.itemId, doneOn: args.on })
  },
})

export const saveNote = mutation({
  args: { key: v.string(), itemId: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    requireOwner(args.key)
    checkItem(args.itemId)
    if (args.body.length > maxNote) throw new ConvexError(`Notes are limited to ${maxNote} characters.`)

    const rows = await ctx.db
      .query('notes')
      .withIndex('by_item', q => q.eq('itemId', args.itemId))
      .take(10)
    const [first, ...extras] = rows
    for (const row of extras) await ctx.db.delete(row._id)

    if (args.body.trim() === '') {
      if (first) await ctx.db.delete(first._id)
      return
    }
    if (first) await ctx.db.patch(first._id, { body: args.body, updatedAt: Date.now() })
    else await ctx.db.insert('notes', { itemId: args.itemId, body: args.body, updatedAt: Date.now() })
  },
})

export const addQuestion = mutation({
  args: { key: v.string(), itemId: v.string(), text: v.string() },
  handler: async (ctx, args) => {
    requireOwner(args.key)
    checkItem(args.itemId)
    const text = args.text.trim()
    if (text === '') throw new ConvexError('Write the question first.')
    if (text.length > maxQuestion) throw new ConvexError(`Questions are limited to ${maxQuestion} characters.`)

    const now = Date.now()
    await ctx.db.insert('questions', { itemId: args.itemId, text, createdAt: now, updatedAt: now })
  },
})

export const resolveQuestion = mutation({
  args: {
    key: v.string(),
    id: v.id('questions'),
    resolved: v.boolean(),
    answer: v.optional(v.string()),
    on: v.string(),
  },
  handler: async (ctx, args) => {
    requireOwner(args.key)
    checkDate(args.on)
    const answer = args.answer?.trim()
    if (answer && answer.length > maxAnswer) throw new ConvexError(`Answers are limited to ${maxAnswer} characters.`)

    const row = await ctx.db.get(args.id)
    if (!row) throw new ConvexError('That question no longer exists.')

    await ctx.db.patch(args.id, {
      resolvedOn: args.resolved ? args.on : undefined,
      answer: args.resolved ? answer || undefined : undefined,
      updatedAt: Date.now(),
    })
  },
})

export const deleteQuestion = mutation({
  args: { key: v.string(), id: v.id('questions') },
  handler: async (ctx, args) => {
    requireOwner(args.key)
    const row = await ctx.db.get(args.id)
    if (row) await ctx.db.delete(args.id)
  },
})
