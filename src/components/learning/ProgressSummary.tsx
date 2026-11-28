import type { Lesson, Tone } from '@/lib/learning-plan'
import { shortDate } from '@/lib/learning-plan'

export interface Segment {
  id: string
  name: string
  count: number
  total: number
}

const paceClass: Record<Tone, string> = { done: '', now: '', late: 'is-late', idle: 'is-idle' }

export default function ProgressSummary({
  ready,
  got,
  total,
  pace,
  next,
  showDates,
  segments,
  message,
}: {
  ready: boolean
  got: number
  total: number
  // Only passed when editing is unlocked: readers are not shown whether the plan is on schedule.
  pace: { label: string; tone: Tone } | null
  next: Lesson | null
  showDates: boolean
  segments: Segment[]
  message: string
}) {
  return (
    <section aria-label="Progress" className="lp-summary">
      <div className="lp-summary-top">
        <p className="lp-count">
          {ready ? got : '–'} <small>of {total} lessons</small>
        </p>
        {ready && pace && <span className={`lp-pace ${paceClass[pace.tone]}`}>{pace.label}</span>}
      </div>

      <div className="lp-bar" role="img" aria-label={ready ? `${got} of ${total} lessons done` : 'Progress is loading'}>
        {segments.map(segment => (
          <div
            key={segment.id}
            className="lp-seg"
            title={`${segment.name}: ${segment.count} of ${segment.total}`}
            style={{ flex: `${segment.total} 1 0%` }}
          >
            <i style={{ width: `${ready && segment.total > 0 ? (100 * segment.count) / segment.total : 0}%` }} />
          </div>
        ))}
      </div>

      {ready && (
        <p className="lp-next">
          {next ? (
            <>
              <b>Next: </b>
              {next.title} ({next.phaseName}
              {showDates && next.due ? `, due ${shortDate(next.due)}` : ''})
            </>
          ) : (
            'Every lesson in this track is ticked.'
          )}
        </p>
      )}

      <p role="status" className={message ? 'lp-status' : 'sr-only'}>
        {message}
      </p>
    </section>
  )
}
