import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Musing } from '@/lib/musings'
import MusingEmbed from './MusingEmbed'

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })
const linkStyle = 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light'

export function MusingDate({ date }: { date: Musing['date'] }) {
  return (
    <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
      {date ? <time dateTime={date}>{dateFormat.format(new Date(date))}</time> : 'Draft'}
    </p>
  )
}

export function MusingBody({ html }: { html: string }) {
  return (
    <div
      className="article-copy prose prose-zinc max-w-none text-zinc-700 prose-p:leading-[1.75] prose-a:text-moss-dark dark:prose-invert dark:text-zinc-300 dark:prose-a:text-moss-light"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default function MusingsList({ entries, archive = false }: { entries: Musing[]; archive?: boolean }) {
  const Heading = archive ? 'h2' : 'h3'

  return (
    <ol className="divide-y divide-[var(--panel-border)] rounded-[1.25rem] border border-[var(--panel-border)] bg-[var(--card)] px-5 sm:px-7">
      {entries.map(entry => (
        <li key={entry.slug} className="py-5 sm:py-6">
          <article className="space-y-2.5">
            <MusingDate date={entry.date} />
            <Heading className="text-pretty font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              {entry.title}
            </Heading>
            {entry.kind === 'essay' ? (
              <>
                <p className="text-base leading-[1.75] text-zinc-700 dark:text-zinc-300">{entry.excerpt}</p>
                <Link href={`/musings/${entry.slug}`} aria-label={`Read more: ${entry.title}`} className={linkStyle}>
                  Read more <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </>
            ) : (
              <MusingBody html={entry.body} />
            )}
            {entry.kind === 'repost' && (
              <>
                {entry.context && <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{entry.context}</p>}
                <a href={entry.originalUrl} aria-label={`Read the original: ${entry.title}`} className={linkStyle}>
                  Read the original <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                {archive && entry.embed && <MusingEmbed embed={entry.embed} title={entry.title} />}
              </>
            )}
          </article>
        </li>
      ))}
    </ol>
  )
}
