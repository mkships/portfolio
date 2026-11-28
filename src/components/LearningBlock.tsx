import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/Section'
import { getDoneLessons, getLearningHub } from '@/lib/learning'
import { summarize } from '@/lib/learning-plan'

const linkStyle = 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light'

// Home-page entry to the learning space. The why and the track list come from
// content/learning/, and the counts from the same store the learning space writes to.
export default async function LearningBlock() {
  const hub = getLearningHub()
  const done = await getDoneLessons()

  return (
    <Section id="learning" title={hub.title} subtitle="What I’m studying now, and why.">
      <div className="portfolio-panel">
        <p className="text-pretty font-display text-xl font-medium leading-snug tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
          {hub.why}
        </p>

        <ul className="mt-6 divide-y divide-[var(--panel-border)] border-y border-[var(--panel-border)]">
          {hub.tracks.map((track, index) => {
            const progress = summarize(track, done ?? {}, '')
            return (
              <li key={track.id}>
                <Link
                  href={`/learn/${track.id}`}
                  className="group flex items-center gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss dark:focus-visible:outline-moss-light"
                >
                  <span className="min-w-0 flex-1">
                    <span className="portfolio-meta block">
                      Track {String(index + 1).padStart(2, '0')}
                      {done ? ` · ${progress.got} of ${progress.total} lessons done` : ` · ${progress.total} lessons`}
                    </span>
                    <span className="mt-1.5 block font-display text-xl font-semibold leading-tight tracking-tight text-zinc-900 group-hover:text-moss-dark dark:text-zinc-100 dark:group-hover:text-moss-light">
                      {track.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{track.summary}</span>
                    {done && (
                      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[var(--panel-border)]" aria-hidden="true">
                        <span
                          className="block h-full rounded-full bg-moss dark:bg-moss-light"
                          style={{ width: `${progress.total > 0 ? (100 * progress.got) / progress.total : 0}%` }}
                        />
                      </span>
                    )}
                  </span>
                  <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-moss-dark dark:text-moss-light" />
                </Link>
              </li>
            )
          })}
        </ul>

        <Link href="/learn" className={`${linkStyle} mt-3`}>
          Both tracks, with my notes and open questions <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  )
}
