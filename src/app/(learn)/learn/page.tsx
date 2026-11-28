import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import LearnHeader from '@/components/learning/LearnHeader'
import LearnShell from '@/components/learning/LearnShell'
import { getDoneLessons, getLearningHub } from '@/lib/learning'
import { requiredLessons, summarize } from '@/lib/learning-plan'

// Progress on this page is read on the server and refreshed every five minutes.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const hub = getLearningHub()
  return {
    description: hub.why,
    alternates: { canonical: 'https://learn.mkanapaka.space' },
  }
}

export default async function LearnHubPage() {
  const hub = getLearningHub()
  const done = await getDoneLessons()

  return (
    <LearnShell theme="paper">
      <LearnHeader />

      <header className="lp-hero">
        <p className="lp-site-meta">
          {hub.tracks.length} tracks · {hub.tracks.reduce((sum, track) => sum + summarize(track, {}, '').total, 0)} lessons
        </p>
        <h1>{hub.title}</h1>
        <p className="lp-hero-lede">{hub.why}</p>
        {hub.how && <p className="lp-hero-how">{hub.how}</p>}
      </header>

      <div className="lp-track-list">
        {hub.tracks.map((track, index) => {
          const progress = summarize(track, done ?? {}, '')
          const phases = track.phases.filter(phase => !phase.optional)
          return (
            <article key={track.id} className="lp-track-card" data-track={track.theme}>
              <p className="lp-site-meta">
                Track {String(index + 1).padStart(2, '0')} · {phases.length} phases · {progress.total} lessons
              </p>
              <h2>
                <Link href={`/learn/${track.id}`}>{track.title}</Link>
              </h2>
              <p className="lp-track-summary">{track.summary}</p>
              {done && (
                <div className="lp-track-progress">
                  <div className="lp-bar" role="img" aria-label={`${progress.got} of ${progress.total} lessons done`}>
                    {phases.map(phase => {
                      const lessons = requiredLessons(phase)
                      const count = lessons.filter(lesson => done[lesson.id]).length
                      return (
                        <div key={phase.id} className="lp-seg" title={phase.name} style={{ flex: `${lessons.length} 1 0%` }}>
                          <i style={{ width: `${lessons.length > 0 ? (100 * count) / lessons.length : 0}%` }} />
                        </div>
                      )
                    })}
                  </div>
                  <p className="lp-site-meta is-quiet">
                    {progress.got} of {progress.total} lessons done
                  </p>
                </div>
              )}
              <Link href={`/learn/${track.id}`} className="lp-track-link" aria-label={`Open the track: ${track.title}`}>
                Open the track <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          )
        })}
      </div>

      {hub.note && (
        <aside className="lp-footnote" aria-label={hub.noteLabel ?? 'Note'}>
          {hub.noteLabel && <p className="lp-footnote-label">{hub.noteLabel}</p>}
          <p>{hub.note}</p>
        </aside>
      )}
    </LearnShell>
  )
}
