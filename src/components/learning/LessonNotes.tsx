'use client'

import { useEffect, useRef, useState } from 'react'
import type { Lesson, Question } from '@/lib/learning-plan'
import { shortDate } from '@/lib/learning-plan'
import NoteText from './NoteText'

export interface PathActions {
  setDone(itemId: string, done: boolean): void
  saveNote(itemId: string, body: string): Promise<boolean>
  addQuestion(itemId: string, text: string): Promise<boolean>
  resolveQuestion(id: string, resolved: boolean, answer?: string): Promise<boolean>
  deleteQuestion(id: string): Promise<boolean>
}

type SaveState = 'idle' | 'typing' | 'saving' | 'saved' | 'error'

const saveLabels: Record<SaveState, string> = {
  idle: 'Saves as you type. Backticks make `code`.',
  typing: 'Saving…',
  saving: 'Saving…',
  saved: 'Saved.',
  error: 'Not saved. Keep this open and try again.',
}

function NoteEditor({ lesson, note, actions }: { lesson: Lesson; note: string; actions: PathActions }) {
  const [draft, setDraft] = useState(note)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const latest = useRef(note)
  const dirty = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const save = useRef(actions.saveNote)
  save.current = actions.saveNote

  // Take a newer note from another device, unless there are unsaved keystrokes here.
  useEffect(() => {
    if (dirty.current) return
    latest.current = note
    setDraft(note)
  }, [note])

  const flush = useRef(async () => {
    clearTimeout(timer.current)
    if (!dirty.current) return
    dirty.current = false
    setSaveState('saving')
    const saved = await save.current(lesson.id, latest.current)
    if (dirty.current) return
    if (!saved) dirty.current = true
    setSaveState(saved ? 'saved' : 'error')
  })

  // Closing the panel mid-edit still saves the last keystrokes.
  useEffect(() => {
    const flushNow = flush.current
    return () => {
      void flushNow()
    }
  }, [])

  const fieldId = `note-${lesson.id}`

  return (
    <div className="lp-group">
      <label htmlFor={fieldId} className="lp-label">
        Notes
      </label>
      <textarea
        id={fieldId}
        value={draft}
        rows={Math.min(18, Math.max(4, draft.split('\n').length + 1))}
        maxLength={20000}
        placeholder="What I learned, in my own words."
        onChange={event => {
          latest.current = event.target.value
          dirty.current = true
          setDraft(event.target.value)
          setSaveState('typing')
          clearTimeout(timer.current)
          timer.current = setTimeout(() => void flush.current(), 900)
        }}
        onBlur={() => void flush.current()}
        className="lp-field"
      />
      <p role="status" className="lp-hint">
        {saveLabels[saveState]}
      </p>
    </div>
  )
}

function QuestionItem({
  question,
  actions,
  showDates,
}: {
  question: Question
  actions: PathActions | null
  showDates: boolean
}) {
  const [answering, setAnswering] = useState(false)
  const [answer, setAnswer] = useState('')
  const [busy, setBusy] = useState(false)
  const resolved = Boolean(question.resolvedOn)

  async function run(work: () => Promise<boolean>) {
    setBusy(true)
    const done = await work()
    setBusy(false)
    return done
  }

  return (
    <li className={`lp-q ${resolved ? 'is-resolved' : ''}`}>
      <p className="lp-q-text">{question.text}</p>

      {resolved && (
        <div className="lp-answer">
          <p className="lp-hint">Resolved{showDates ? ` ${shortDate(question.resolvedOn as string)}` : ''}</p>
          {question.answer && <NoteText text={question.answer} />}
        </div>
      )}

      {actions && answering && (
        <form
          className="lp-form"
          onSubmit={async event => {
            event.preventDefault()
            if (await run(() => actions.resolveQuestion(question.id, true, answer))) {
              setAnswering(false)
              setAnswer('')
            }
          }}
        >
          <label htmlFor={`answer-${question.id}`} className="sr-only">
            What was the answer?
          </label>
          <textarea
            id={`answer-${question.id}`}
            value={answer}
            rows={3}
            maxLength={4000}
            placeholder="What was the answer? (optional)"
            onChange={event => setAnswer(event.target.value)}
            className="lp-field"
          />
          <div className="lp-actions">
            <button type="submit" disabled={busy} className="lp-btn is-primary">
              Mark resolved
            </button>
            <button type="button" onClick={() => setAnswering(false)} className="lp-btn">
              Cancel
            </button>
          </div>
        </form>
      )}

      {actions && !answering && (
        <div className="lp-actions">
          {resolved ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => actions.resolveQuestion(question.id, false))}
              className="lp-quiet"
            >
              Reopen
            </button>
          ) : (
            <button type="button" onClick={() => setAnswering(true)} className="lp-quiet">
              Resolve
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (window.confirm('Delete this question? This cannot be undone.')) {
                void run(() => actions.deleteQuestion(question.id))
              }
            }}
            className="lp-quiet"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  )
}

function QuestionForm({ lesson, actions }: { lesson: Lesson; actions: PathActions }) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const fieldId = `question-${lesson.id}`

  return (
    <form
      className="lp-inline-form"
      onSubmit={async event => {
        event.preventDefault()
        if (text.trim() === '') return
        setBusy(true)
        const added = await actions.addQuestion(lesson.id, text)
        setBusy(false)
        if (added) setText('')
      }}
    >
      <label htmlFor={fieldId} className="sr-only">
        Add something you don’t understand yet
      </label>
      <input
        id={fieldId}
        type="text"
        value={text}
        maxLength={600}
        placeholder="Something I don’t understand yet"
        onChange={event => setText(event.target.value)}
        className="lp-field"
      />
      <button type="submit" disabled={busy || text.trim() === ''} className="lp-btn">
        Add question
      </button>
    </form>
  )
}

export default function LessonNotes({
  lesson,
  note,
  questions,
  actions,
  showDates,
}: {
  lesson: Lesson
  note: string
  questions: Question[]
  actions: PathActions | null
  showDates: boolean
}) {
  const open = questions.filter(question => !question.resolvedOn)
  const resolved = questions.filter(question => question.resolvedOn)

  return (
    <div id={`panel-${lesson.id}`} className="lp-panel">
      {actions ? (
        <NoteEditor lesson={lesson} note={note} actions={actions} />
      ) : (
        note && (
          <div className="lp-group">
            <p className="lp-label">Notes</p>
            <NoteText text={note} />
          </div>
        )
      )}

      {(actions || questions.length > 0) && (
        <div className="lp-group">
          <p className="lp-label">
            Questions{questions.length > 0 && ` · ${open.length} open`}
          </p>
          {questions.length > 0 && (
            <ul className="lp-questions">
              {[...open, ...resolved].map(question => (
                <QuestionItem key={question.id} question={question} actions={actions} showDates={showDates} />
              ))}
            </ul>
          )}
          {actions && <QuestionForm lesson={lesson} actions={actions} />}
        </div>
      )}
    </div>
  )
}
