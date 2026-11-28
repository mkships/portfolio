import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import type { Block, Lesson, Phase, Track } from './learning-plan'
import { weekOf } from './learning-plan'

const learningDirectory = path.join(process.cwd(), 'content', 'learning')
const isoDate = /^\d{4}-\d{2}-\d{2}$/
const trackIdPattern = /^[a-z0-9-]+$/

export interface LearningHub {
  title: string
  why: string
  how?: string
  noteLabel?: string
  note?: string
  bodyHtml: string
  tracks: Track[]
}

type Raw = Record<string, unknown>

function text(value: unknown, where: string) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${where} must be a non-empty string`)
  return value
}

function optionalText(value: unknown) {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

function optionalDate(value: unknown, where: string) {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string' || !isoDate.test(value)) throw new Error(`${where} must be a quoted YYYY-MM-DD date`)
  return value
}

function optionalLink(value: unknown, where: string) {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string' || !value.startsWith('https://')) throw new Error(`${where} must be an https:// link`)
  return value
}

function weeksLabel(weeks: number[]) {
  if (weeks.length === 0) return ''
  const first = Math.min(...weeks)
  const last = Math.max(...weeks)
  return first === last ? `Week ${first}` : `Weeks ${first}–${last}`
}

function readTrack(id: string, seen: Map<string, string>): Track {
  const file = `content/learning/${id}.md`
  const { data, content } = matter(fs.readFileSync(path.join(learningDirectory, `${id}.md`), 'utf8'))
  const starts = optionalDate(data.starts, `${file}: starts`)
  if (!Array.isArray(data.phases) || data.phases.length === 0) throw new Error(`${file}: phases must be a list`)

  const phases: Phase[] = data.phases.map((raw: Raw, phaseIndex: number) => {
    const phaseId = text(raw.id, `${file}: phases[${phaseIndex}].id`)
    const name = text(raw.name, `${file}: phase ${phaseId} name`)
    const optional = raw.optional === true
    if (!Array.isArray(raw.blocks)) throw new Error(`${file}: phase ${phaseId} needs a blocks list`)
    const weeks: number[] = []

    const blocks: Block[] = raw.blocks.map((rawBlock: Raw, blockIndex: number) => {
      const where = `${file}: phase ${phaseId} block ${blockIndex + 1}`
      const due = optionalDate(rawBlock.due, `${where} due`)
      if (!Array.isArray(rawBlock.lessons)) throw new Error(`${where} needs a lessons list`)

      let label = optionalText(rawBlock.label)
      if (!label) {
        if (!due || !starts) throw new Error(`${where} needs a label, or a due date on a track with starts`)
        const week = weekOf(due, starts)
        weeks.push(week)
        label = `Week ${week}`
      }

      const lessons: Lesson[] = rawBlock.lessons.map((rawLesson: Raw) => {
        const lessonId = text(rawLesson.id, `${where} lesson id`)
        // Storage is keyed by lesson id alone, so an id may appear once across every track.
        const earlier = seen.get(lessonId)
        if (earlier) throw new Error(`${file}: lesson id "${lessonId}" is already used in ${earlier}`)
        seen.set(lessonId, file)

        return {
          id: lessonId,
          title: text(rawLesson.title, `${file}: lesson ${lessonId} title`),
          detail: optionalText(rawLesson.detail),
          href: optionalLink(rawLesson.href, `${file}: lesson ${lessonId} href`),
          project: rawLesson.project === true,
          optional: optional || rawLesson.optional === true,
          cut: rawLesson.cut === true,
          due,
          phaseId,
          phaseName: name,
        }
      })

      return { label, dates: optionalText(rawBlock.dates), due, note: optionalText(rawBlock.note), lessons }
    })

    return {
      id: phaseId,
      name,
      weeks: optionalText(raw.weeks) ?? weeksLabel(weeks),
      meta: Array.isArray(raw.meta) ? raw.meta.map(String) : [],
      start: optionalDate(raw.start, `${file}: phase ${phaseId} start`),
      end: optionalDate(raw.end, `${file}: phase ${phaseId} end`),
      href: optionalLink(raw.href, `${file}: phase ${phaseId} href`),
      linkText: optionalText(raw.linkText),
      outcome: text(raw.outcome, `${file}: phase ${phaseId} outcome`),
      outcomes: Array.isArray(raw.outcomes) ? raw.outcomes.map(String) : [],
      optional,
      blocks,
    }
  })

  const theme = data.theme ?? 'cool'
  if (theme !== 'cool' && theme !== 'warm') throw new Error(`${file}: theme must be "cool" or "warm"`)

  return {
    id,
    theme,
    title: text(data.title, `${file}: title`),
    summary: text(data.summary, `${file}: summary`),
    intro: text(data.intro, `${file}: intro`),
    starts,
    ends: optionalDate(data.ends, `${file}: ends`),
    phases,
    bodyHtml: content.trim() ? (marked(content) as string) : '',
  }
}

// Reads the hub and every track it lists. A duplicate lesson id, a bad date or a link that
// is not HTTPS fails the build instead of silently merging or breaking a lesson.
export function getLearningHub(): LearningHub {
  const { data, content } = matter(fs.readFileSync(path.join(learningDirectory, 'index.md'), 'utf8'))
  const where = 'content/learning/index.md'
  if (!Array.isArray(data.tracks) || data.tracks.length === 0) throw new Error(`${where}: tracks must be a list`)

  const seen = new Map<string, string>()
  const tracks = data.tracks.map((id: unknown) => {
    if (typeof id !== 'string' || !trackIdPattern.test(id)) throw new Error(`${where}: "${id}" is not a valid track id`)
    return readTrack(id, seen)
  })

  return {
    title: text(data.title, `${where}: title`),
    why: text(data.why, `${where}: why`),
    how: optionalText(data.how),
    noteLabel: optionalText(data.noteLabel),
    note: optionalText(data.note),
    bodyHtml: content.trim() ? (marked(content) as string) : '',
    tracks,
  }
}

export function getTrack(id: string) {
  return getLearningHub().tracks.find(track => track.id === id) ?? null
}

// Lessons ticked so far, read on the server from the public Convex query. Returns null when
// the backend is not configured or cannot be reached, and callers then show no numbers.
export async function getDoneLessons(): Promise<Record<string, string> | null> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) return null
  try {
    const response = await fetch(`${url}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: 'learning:state', args: {}, format: 'json' }),
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    })
    if (!response.ok) return null
    const result = await response.json()
    const done = result?.value?.done
    return done && typeof done === 'object' ? (done as Record<string, string>) : null
  } catch {
    return null
  }
}
