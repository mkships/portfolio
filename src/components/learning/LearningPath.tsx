'use client'

import { useEffect, useMemo, useState } from 'react'
import { ConvexProvider, ConvexReactClient, useMutation, useQuery } from 'convex/react'
import { ConvexError } from 'convex/values'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'
import type { Lesson, PathState, Question, Track } from '@/lib/learning-plan'
import {
  allLessons,
  emptyState,
  isDueThisWeek,
  phaseStatus,
  summarize,
  toISODate,
} from '@/lib/learning-plan'
import type { PathActions } from './LessonNotes'
import OwnerUnlock from './OwnerUnlock'
import PhaseSection from './PhaseSection'
import ProgressSummary from './ProgressSummary'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const client = convexUrl ? new ConvexReactClient(convexUrl) : null
const keyStorage = 'learning-owner-key'
const updatedFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

type Status = 'loading' | 'slow' | 'ready' | 'offline'
type Filter = 'all' | 'week' | 'remaining' | 'questions' | 'notes'

interface Unlock {
  unlocked: boolean
  onUnlock: (key: string) => Promise<string | null>
  onLock: () => void
}

const emptyMessages: Record<Filter, string> = {
  all: '',
  week: 'Nothing is due in the next seven days.',
  remaining: 'Every required lesson is ticked.',
  questions: 'No open questions right now.',
  notes: 'No notes yet.',
}

function PathView({
  track,
  state,
  status,
  actions,
  message,
  unlock,
}: {
  track: Track
  state: PathState
  status: Status
  actions: PathActions | null
  message: string
  unlock: Unlock | null
}) {
  // The date is only known in the browser, so date-dependent labels wait for it.
  const [today, setToday] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [openPhases, setOpenPhases] = useState<string[] | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => setToday(toISODate(new Date())), [])

  const ready = today !== null && status !== 'loading'
  const date = today ?? track.starts ?? ''
  // Dates, pace and overdue markers are the owner's working view. Readers see weeks only.
  const owner = actions !== null

  const questionsByItem = useMemo(() => {
    const grouped: Record<string, Question[]> = {}
    for (const question of state.questions) (grouped[question.itemId] ??= []).push(question)
    return grouped
  }, [state.questions])

  const statuses = track.phases.map(phase => phaseStatus(phase, state.done, date, owner))
  const summary = summarize(track, state.done, date)
  const hasOpenQuestion = (lesson: Lesson) => (questionsByItem[lesson.id] ?? []).some(question => !question.resolvedOn)
  const hasNote = (lesson: Lesson) => Boolean(state.notes[lesson.id])

  const matchers: Record<Filter, (lesson: Lesson) => boolean> = {
    all: () => true,
    week: lesson => isDueThisWeek(lesson, state.done, date),
    remaining: lesson => !lesson.optional && !state.done[lesson.id],
    questions: hasOpenQuestion,
    notes: hasNote,
  }
  const lessons = allLessons(track)
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    // A track without dates has no "this week".
    ...(track.starts ? [{ id: 'week' as const, label: 'This week' }] : []),
    { id: 'remaining', label: `Remaining (${lessons.filter(matchers.remaining).length})` },
    { id: 'questions', label: `Open questions (${lessons.filter(hasOpenQuestion).length})` },
    { id: 'notes', label: `Has notes (${lessons.filter(hasNote).length})` },
  ]

  // Until a phase is opened or closed by hand, show the ones being worked on.
  const current = track.phases.filter((_, index) => statuses[index].tone === 'now' || statuses[index].tone === 'late')
  const fallback = track.phases.find((phase, index) => statuses[index].tone !== 'done' && !phase.optional)
  const defaultOpen = (current.length > 0 ? current : fallback ? [fallback] : []).map(phase => phase.id)
  const open = openPhases ?? (ready ? defaultOpen : [])

  const isVisible = matchers[filter]
  const shown = track.phases
    .map((phase, index) => ({ phase, index }))
    .filter(({ phase }) => filter === 'all' || phase.blocks.some(block => block.lessons.some(isVisible)))

  const isExpanded = (lesson: Lesson) =>
    expanded[lesson.id] ??
    ((filter === 'questions' && hasOpenQuestion(lesson)) || (filter === 'notes' && hasNote(lesson)))

  const statusMessage =
    message ||
    (status === 'slow' ? 'Still trying to reach the saved progress.' : '') ||
    (status === 'offline' ? 'Progress, notes and questions are not connected on this build.' : '')

  return (
    <>
      <ProgressSummary
        ready={ready}
        got={summary.got}
        total={summary.total}
        pace={owner ? summary.pace : null}
        next={summary.next}
        showDates={owner}
        message={statusMessage}
        segments={track.phases
          .map((phase, index) => ({ id: phase.id, name: phase.name, count: statuses[index].count, total: statuses[index].total, optional: phase.optional }))
          .filter(segment => !segment.optional)}
      />

      <div className="lp-phases">
        <div role="group" aria-label="Filter lessons" className="lp-filters">
          {filters.map(option => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className="lp-filter"
            >
              {option.label}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="lp-status">{emptyMessages[filter]}</p>
        ) : (
          shown.map(({ phase, index }) => (
            <PhaseSection
              key={phase.id}
              phase={phase}
              number={index + 1}
              status={statuses[index]}
              ready={ready}
              owner={owner}
              today={date}
              open={filter !== 'all' || open.includes(phase.id)}
              onToggle={
                filter === 'all'
                  ? () => setOpenPhases(open.includes(phase.id) ? open.filter(id => id !== phase.id) : [...open, phase.id])
                  : null
              }
              isVisible={isVisible}
              state={state}
              questionsByItem={questionsByItem}
              actions={actions}
              isExpanded={isExpanded}
              onToggleNotes={lesson => setExpanded({ ...expanded, [lesson.id]: !isExpanded(lesson) })}
            />
          ))
        )}
      </div>

      {track.bodyHtml && <div className="lp-prose" dangerouslySetInnerHTML={{ __html: track.bodyHtml }} />}

      <div className="lp-foot">
        <p className="lp-hint">
          {ready && state.updatedAt ? `Last updated ${updatedFormat.format(new Date(state.updatedAt))}` : ' '}
        </p>
        {unlock && <OwnerUnlock {...unlock} />}
      </div>
    </>
  )
}

function errorText(error: unknown) {
  return error instanceof ConvexError && typeof error.data === 'string'
    ? error.data
    : 'Couldn’t save just now. Check the connection and try again.'
}

function ConnectedPath({ track }: { track: Track }) {
  const remote = useQuery(api.learning.state)
  const [ownerKey, setOwnerKey] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [slow, setSlow] = useState(false)

  const verifyKey = useMutation(api.learning.verifyKey)
  const saveNote = useMutation(api.learning.saveNote)
  const addQuestion = useMutation(api.learning.addQuestion)
  const resolveQuestion = useMutation(api.learning.resolveQuestion)
  const deleteQuestion = useMutation(api.learning.deleteQuestion)
  // Show a tick at once, before the server confirms it.
  const setDone = useMutation(api.learning.setDone).withOptimisticUpdate((store, args) => {
    const current = store.getQuery(api.learning.state, {})
    if (!current) return
    const done = { ...current.done }
    if (args.done) done[args.itemId] = done[args.itemId] ?? args.on
    else delete done[args.itemId]
    store.setQuery(api.learning.state, {}, { ...current, done })
  })

  useEffect(() => {
    try {
      setOwnerKey(localStorage.getItem(keyStorage))
    } catch {
      // Storage is blocked: the page stays read-only on this device.
    }
  }, [])

  useEffect(() => {
    if (remote !== undefined) {
      setSlow(false)
      return
    }
    const timer = setTimeout(() => setSlow(true), 10000)
    return () => clearTimeout(timer)
  }, [remote])

  function lock() {
    try {
      localStorage.removeItem(keyStorage)
    } catch {
      // Nothing was stored.
    }
    setOwnerKey(null)
  }

  async function attempt(work: () => Promise<unknown>) {
    try {
      await work()
      setMessage('')
      return true
    } catch (error) {
      const text = errorText(error)
      if (text === 'Wrong passphrase.') {
        lock()
        setMessage('The saved passphrase no longer works, so editing is locked again.')
      } else {
        setMessage(text)
      }
      return false
    }
  }

  const key = ownerKey
  const actions: PathActions | null = key
    ? {
        setDone: (itemId, done) => void attempt(() => setDone({ key, itemId, done, on: toISODate(new Date()) })),
        saveNote: (itemId, body) => attempt(() => saveNote({ key, itemId, body })),
        addQuestion: (itemId, text) => attempt(() => addQuestion({ key, itemId, text })),
        resolveQuestion: (id, resolved, answer) =>
          attempt(() => resolveQuestion({ key, id: id as Id<'questions'>, resolved, answer, on: toISODate(new Date()) })),
        deleteQuestion: id => attempt(() => deleteQuestion({ key, id: id as Id<'questions'> })),
      }
    : null

  return (
    <PathView
      track={track}
      state={remote ?? emptyState}
      status={remote === undefined ? (slow ? 'slow' : 'loading') : 'ready'}
      actions={remote === undefined ? null : actions}
      message={message}
      unlock={{
        unlocked: key !== null,
        onLock: lock,
        onUnlock: async candidate => {
          try {
            await verifyKey({ key: candidate })
          } catch (error) {
            return errorText(error)
          }
          try {
            localStorage.setItem(keyStorage, candidate)
          } catch {
            // Storage is blocked: editing works until this tab closes.
          }
          setOwnerKey(candidate)
          setMessage('')
          return null
        },
      }}
    />
  )
}

export default function LearningPath({ track }: { track: Track }) {
  if (!client) {
    return <PathView track={track} state={emptyState} status="offline" actions={null} message="" unlock={null} />
  }
  return (
    <ConvexProvider client={client}>
      <ConnectedPath track={track} />
    </ConvexProvider>
  )
}
