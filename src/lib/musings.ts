import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Marked } from 'marked'
import { getAllSlugs } from './posts'
import { musingTopics } from './musing-topics'

export type MusingEmbed =
  | { provider: 'linkedin'; src: string }
  | { provider: 'x' | 'youtube'; id: string }

interface MusingBase {
  slug: string
  title: string
  date: string | null
  body: string
  topics: string[]
  featured: boolean
}

export type Musing = MusingBase & (
  | { kind: 'note' }
  | { kind: 'essay'; excerpt: string }
  | { kind: 'repost'; originalUrl: string; context?: string; embed?: MusingEmbed }
)

type Essay = Extract<Musing, { kind: 'essay' }>

const directory = 'musings'
const markdown = new Marked({ renderer: { html: () => '' } })
// Posts brought in from X keep their line breaks as written.
const postMarkdown = new Marked({ breaks: true, renderer: { html: () => '' } })

function readTopics(data: { topic?: unknown; topics?: unknown }): string[] {
  if (data.topics !== undefined && !Array.isArray(data.topics)) throw new Error('topics must be a list')
  const topics = [...(data.topic === undefined ? [] : [data.topic]), ...(data.topics ?? [])]
    .map(topic => requiredText(topic, 'topic'))
  if (topics.length === 0) throw new Error('topics must list at least one topic')
  const unknown = topics.find(topic => !(topic in musingTopics))
  if (unknown) throw new Error(`unknown topic "${unknown}". Add it to src/lib/musing-topics.ts`)
  return [...new Set(topics)]
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} must be a non-empty string`)
  }
  return value.trim()
}

function httpsUrl(value: unknown, field: string): URL {
  const text = requiredText(value, field)
  try {
    const url = new URL(text)
    if (url.protocol === 'https:' && !url.username && !url.password) return url
  } catch {
    // Report the same validation error for malformed and disallowed URLs.
  }
  throw new Error(`${field} must be an HTTPS URL without credentials`)
}

function readDate(value: unknown): string {
  const date = requiredText(value, 'date')
  const parsed = new Date(`${date}T00:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== date) {
    throw new Error('date must be a valid calendar date in YYYY-MM-DD format')
  }
  return date
}

function readEmbed(value: unknown): MusingEmbed | undefined {
  if (value === undefined) return
  if (!value || typeof value !== 'object' || !('provider' in value)) {
    throw new Error('embed must specify a provider')
  }

  switch (value.provider) {
    case 'linkedin': {
      const url = httpsUrl('url' in value ? value.url : undefined, 'embed.url')
      const pathname = decodeURIComponent(url.pathname)
      if (url.origin !== 'https://www.linkedin.com' ||
          !/^\/embed\/feed\/update\/urn:li:(activity|share|ugcPost):\d+\/?$/.test(pathname)) {
        throw new Error('embed.url must be the iframe URL of a LinkedIn post')
      }
      return { provider: 'linkedin', src: url.href }
    }
    case 'x':
    case 'youtube': {
      const id = requiredText('id' in value ? value.id : undefined, 'embed.id')
      const pattern = value.provider === 'x' ? /^\d{1,20}$/ : /^[\w-]{11}$/
      if (!pattern.test(id)) throw new Error(`embed.id is invalid for ${value.provider}`)
      return { provider: value.provider, id }
    }
    default:
      throw new Error('embed.provider must be linkedin, x, or youtube')
  }
}

export function getMusings(): Musing[] {
  const preview = process.env.MUSINGS_PREVIEW === '1'
  const musings = getAllSlugs(directory).flatMap((slug): Musing[] => {
    const file = path.join('content', directory, `${slug}.md`)
    try {
      const { data, content } = matter(fs.readFileSync(file, 'utf8'))
      const draft = data.draft === true
      if (draft && !preview) return []

      const base = {
        slug,
        title: requiredText(data.title, 'title'),
        date: draft ? null : readDate(data.date),
        body: (data.kind === 'repost' ? postMarkdown : markdown).parse(requiredText(content, 'body'), { async: false }) as string,
        topics: readTopics(data),
        featured: data.featured === true,
      }

      switch (data.kind) {
        case 'note':
          return [{ ...base, kind: 'note' }]
        case 'essay':
          return [{ ...base, kind: 'essay', excerpt: requiredText(data.excerpt, 'excerpt') }]
        case 'repost':
          return [{
            ...base,
            kind: 'repost',
            originalUrl: httpsUrl(data.originalUrl, 'originalUrl').href,
            context: data.context === undefined ? undefined : requiredText(data.context, 'context'),
            embed: readEmbed(data.embed),
          }]
        default:
          throw new Error('kind must be note, essay, or repost')
      }
    } catch (error) {
      throw new Error(`Invalid musing in ${file}: ${error instanceof Error ? error.message : String(error)}`)
    }
  })

  // In editorial preview, keep drafts together above the published entries.
  return musings.sort((a, b) => (b.date ?? 'draft').localeCompare(a.date ?? 'draft') ||
    a.slug.localeCompare(b.slug))
}

export function getMusingEssays(): Essay[] {
  return getMusings().filter(musing => musing.kind === 'essay')
}
