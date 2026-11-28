'use client'

import { Check, ChevronDown, NotebookPen } from 'lucide-react'
import type { Lesson, PathState, Phase, Question, Tone } from '@/lib/learning-plan'
import { isBlockOverdue, shortDate } from '@/lib/learning-plan'
import LessonNotes, { type PathActions } from './LessonNotes'

const chipClass: Record<Tone, string> = { done: 'is-done', now: 'is-now', late: 'is-late', idle: '' }

interface Group {
  key: string
  label: string
  dates?: string
  overdue: boolean
  // One entry per block, so a block's note is printed straight after its own lessons.
  parts: { lessons: Lesson[]; note?: string }[]
}

function LessonRow({
  lesson,
  state,
  questions,
  actions,
  expanded,
  onToggleNotes,
}: {
  lesson: Lesson
  state: PathState
  questions: Question[]
  actions: PathActions | null
  expanded: boolean
  onToggleNotes: () => void
}) {
  const doneOn = state.done[lesson.id]
  const isDone = Boolean(doneOn)
  const note = state.notes[lesson.id]?.body ?? ''
  const openQuestions = questions.filter(question => !question.resolvedOn).length
  const hasContent = note !== '' || questions.length > 0

  const title = (
    <span className="lp-t">
      <span className="lp-title">{lesson.title}</span>
      {lesson.project && <span className="lp-tag is-project">Project</span>}
      {lesson.optional && <span className="lp-tag">Optional</span>}
      {lesson.cut && <span className="lp-tag">Cut first</span>}
      {actions && isDone && /^\d{4}-/.test(doneOn) && <span className="lp-done-on">done {shortDate(doneOn)}</span>}
      {lesson.detail && <span className="lp-detail">{lesson.detail}</span>}
    </span>
  )

  const notesLabel = [
    `${expanded ? 'Hide' : 'Show'} notes and questions for ${lesson.title}`,
    note !== '' ? 'has notes' : '',
    openQuestions > 0 ? `${openQuestions} open ${openQuestions === 1 ? 'question' : 'questions'}` : '',
  ].filter(Boolean).join(', ')

  return (
    <li className={`lp-item ${isDone ? 'is-done' : ''}`}>
      <div className="lp-row">
        {actions ? (
          <label className="lp-tick">
            <input
              type="checkbox"
              checked={isDone}
              onChange={event => actions.setDone(lesson.id, event.target.checked)}
            />
            {title}
          </label>
        ) : (
          <div className="lp-tick">
            <span className={`lp-box ${isDone ? 'is-done' : ''}`} aria-hidden="true">
              {isDone && <Check size={13} strokeWidth={3.5} />}
            </span>
            <span className="sr-only">{isDone ? 'Done:' : 'Not done:'}</span>
            {title}
          </div>
        )}

        <div className="lp-tools">
          {(actions || hasContent) && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`panel-${lesson.id}`}
              aria-label={notesLabel}
              onClick={onToggleNotes}
              className={`lp-icon ${note !== '' ? 'has-note' : ''}`}
            >
              <NotebookPen size={16} aria-hidden="true" />
              {openQuestions > 0 && (
                <span aria-hidden="true" className="lp-qcount">
                  {openQuestions}?
                </span>
              )}
            </button>
          )}
          {lesson.href && (
            <a
              href={lesson.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the lesson: ${lesson.title}`}
              className="lp-open-link"
            >
              Open <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      {expanded && (
        <LessonNotes lesson={lesson} note={note} questions={questions} actions={actions} showDates={actions !== null} />
      )}
    </li>
  )
}

export default function PhaseSection({
  phase,
  number,
  status,
  ready,
  owner,
  today,
  open,
  onToggle,
  isVisible,
  state,
  questionsByItem,
  actions,
  isExpanded,
  onToggleNotes,
}: {
  phase: Phase
  number: number
  status: { label: string; tone: Tone; count: number; total: number }
  ready: boolean
  // With editing unlocked, the dates behind the week labels are shown too.
  owner: boolean
  today: string
  open: boolean
  onToggle: (() => void) | null
  isVisible: (lesson: Lesson) => boolean
  state: PathState
  questionsByItem: Record<string, Question[]>
  actions: PathActions | null
  isExpanded: (lesson: Lesson) => boolean
  onToggleNotes: (lesson: Lesson) => void
}) {
  const headingId = `phase-${phase.id}`
  const bodyId = `phase-body-${phase.id}`

  // Readers see one group per label ("Week 1"). Unlocked, every dated block stays separate.
  const groups: Group[] = []
  for (const block of phase.blocks) {
    const lessons = block.lessons.filter(isVisible)
    if (lessons.length === 0) continue
    const last = groups[groups.length - 1]
    if (!owner && last && last.label === block.label) {
      last.parts.push({ lessons, note: block.note })
      continue
    }
    groups.push({
      key: `${block.label}-${block.dates ?? groups.length}`,
      label: block.label,
      dates: owner ? block.dates : undefined,
      overdue: owner && ready && isBlockOverdue(block, state.done, today),
      parts: [{ lessons, note: block.note }],
    })
  }

  const meta = [
    phase.weeks,
    owner && phase.start && phase.end ? `${shortDate(phase.start)} – ${shortDate(phase.end)}` : '',
    ...phase.meta,
    ready ? `${status.count}/${status.total} done` : '',
  ].filter(Boolean)

  const heading = (
    <>
      <span className="lp-phase-num" aria-hidden="true">
        {String(number).padStart(2, '0')}
      </span>
      <span className="lp-phase-head">
        <span className="lp-phase-title">
          <span className="lp-name">{phase.name}</span>
          {ready && status.label && <span className={`lp-chip ${chipClass[status.tone]}`}>{status.label}</span>}
        </span>
      </span>
    </>
  )

  return (
    <section aria-labelledby={headingId} className="lp-phase">
      <h2 id={headingId} className="lp-phase-h">
        {onToggle ? (
          <button type="button" aria-expanded={open} aria-controls={bodyId} onClick={onToggle} className="lp-phase-toggle">
            {heading}
            <ChevronDown size={18} aria-hidden="true" className={`lp-chevron ${open ? 'is-open' : ''}`} />
          </button>
        ) : (
          <span className="lp-phase-toggle">{heading}</span>
        )}
      </h2>

      <div className="lp-meta lp-phase-meta">
        {meta.map(item => (
          <span key={item}>{item}</span>
        ))}
        {phase.href && (
          <a href={phase.href} target="_blank" rel="noopener noreferrer" className="lp-meta-link">
            {phase.linkText ?? 'Open'} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {open && (
        <div id={bodyId} className="lp-phase-body">
          <p className="lp-outcome">
            <b>After this: </b>
            {phase.outcome}
          </p>

          {groups.map(group => (
            <div key={group.key} className="lp-block">
              <p className="lp-when">
                {group.label}
                {group.dates && <span className={group.overdue ? 'is-late' : ''}>{group.dates}</span>}
                {group.overdue && <span className="is-late">overdue</span>}
              </p>
              <div style={{ minWidth: 0 }}>
                {group.parts.map(part => (
                  <div key={part.lessons[0].id} className="lp-part">
                    <ul className="lp-items">
                      {part.lessons.map(lesson => (
                        <LessonRow
                          key={lesson.id}
                          lesson={lesson}
                          state={state}
                          questions={questionsByItem[lesson.id] ?? []}
                          actions={actions}
                          expanded={isExpanded(lesson)}
                          onToggleNotes={() => onToggleNotes(lesson)}
                        />
                      ))}
                    </ul>
                    {part.note && <p className="lp-note">{part.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {phase.outcomes.length > 0 && (
            <div className="lp-outcomes">
              <p className="lp-when">Move on when</p>
              <ul>
                {phase.outcomes.map(outcome => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
