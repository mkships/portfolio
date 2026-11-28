// Types and date logic for the learning tracks. No Node imports here, so client components can use it.

export interface Lesson {
  id: string
  title: string
  detail?: string
  href?: string
  project: boolean
  optional: boolean
  cut: boolean
  due?: string
  phaseId: string
  phaseName: string
}

export interface Block {
  // What readers see in the gutter: "Week 2" for a dated block, or a label such as "Watch".
  label: string
  // The date range, shown only when editing is unlocked.
  dates?: string
  due?: string
  note?: string
  lessons: Lesson[]
}

export interface Phase {
  id: string
  name: string
  // "Week 1" or "Weeks 1–2"; empty when the phase is not scheduled.
  weeks: string
  meta: string[]
  start?: string
  end?: string
  href?: string
  linkText?: string
  outcome: string
  outcomes: string[]
  optional: boolean
  blocks: Block[]
}

// Each track picks a look: 'cool' is the engineering plan, 'warm' the growth one.
export type TrackTheme = 'cool' | 'warm'

export interface Track {
  id: string
  theme: TrackTheme
  title: string
  summary: string
  intro: string
  starts?: string
  ends?: string
  phases: Phase[]
  bodyHtml: string
}

export interface Question {
  id: string
  itemId: string
  text: string
  answer?: string
  resolvedOn?: string
  createdAt: number
}

export interface PathState {
  done: Record<string, string>
  notes: Record<string, { body: string; updatedAt: number }>
  questions: Question[]
  updatedAt: number | null
}

export const emptyState: PathState = { done: {}, notes: {}, questions: [], updatedAt: null }

export type Tone = 'done' | 'now' | 'late' | 'idle'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parts(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month, day }
}

export function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function shortDate(iso: string) {
  const { month, day } = parts(iso)
  return `${day} ${months[month - 1]}`
}

export function addDays(iso: string, days: number) {
  const { year, month, day } = parts(iso)
  return toISODate(new Date(year, month - 1, day + days))
}

// Week 1 is the seven days starting on the track's first day.
export function weekOf(iso: string, starts: string) {
  const a = parts(iso)
  const b = parts(starts)
  const days = Math.round((Date.UTC(a.year, a.month - 1, a.day) - Date.UTC(b.year, b.month - 1, b.day)) / 86400000)
  return Math.max(1, Math.floor(days / 7) + 1)
}

export function lessonsOf(phase: Phase) {
  return phase.blocks.flatMap(block => block.lessons)
}

// Lessons that count towards a phase's tally. An optional phase counts all of its own lessons.
export function requiredLessons(phase: Phase) {
  return lessonsOf(phase).filter(lesson => phase.optional || !lesson.optional)
}

export function allLessons(track: Track) {
  return track.phases.flatMap(lessonsOf)
}

// Readers get a status that says nothing about dates. With `owner`, a dated phase also
// reports when it starts and whether it is overdue.
export function phaseStatus(phase: Phase, done: PathState['done'], today: string, owner: boolean) {
  const required = requiredLessons(phase)
  const count = required.filter(lesson => done[lesson.id]).length
  let label = ''
  let tone: Tone = 'idle'

  if (required.length > 0 && count === required.length) {
    label = 'Done'
    tone = 'done'
  } else if (phase.optional) {
    label = 'Optional'
  } else if (!owner || !phase.start || !phase.end) {
    if (count > 0) {
      label = 'In progress'
      tone = 'now'
    }
  } else if (today < phase.start) {
    label = `Starts ${shortDate(phase.start)}`
  } else if (today <= phase.end) {
    label = 'In progress'
    tone = 'now'
  } else {
    label = 'Overdue'
    tone = 'late'
  }

  return { label, tone, count, total: required.length }
}

export function isBlockOverdue(block: Block, done: PathState['done'], today: string) {
  return Boolean(block.due && block.due < today && block.lessons.some(lesson => !lesson.optional && !done[lesson.id]))
}

export function summarize(track: Track, done: PathState['done'], today: string) {
  let total = 0
  let got = 0
  let late = 0
  let next: Lesson | null = null

  for (const phase of track.phases) {
    if (phase.optional) continue
    for (const lesson of requiredLessons(phase)) {
      total += 1
      if (done[lesson.id]) {
        got += 1
        continue
      }
      if (lesson.due && lesson.due < today) late += 1
      if (!next || (lesson.due ?? '9999') < (next.due ?? '9999')) next = lesson
    }
  }

  // Pace only means something on a track with dates.
  let pace: { label: string; tone: Tone } | null = null
  if (track.starts) {
    if (total > 0 && got === total) pace = { label: 'All done', tone: 'done' }
    else if (late > 0) pace = { label: `${late} overdue`, tone: 'late' }
    else if (got === 0 && today < track.starts) pace = { label: `Starts ${shortDate(track.starts)}`, tone: 'idle' }
    else pace = { label: 'On schedule', tone: 'done' }
  }

  return { total, got, late, next, pace }
}

// "This week" is the next seven days, plus anything already due and not ticked.
export function isDueThisWeek(lesson: Lesson, done: PathState['done'], today: string) {
  if (!lesson.due) return false
  if (lesson.due < today) return !done[lesson.id]
  return lesson.due <= addDays(today, 6)
}
