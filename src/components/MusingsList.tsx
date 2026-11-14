import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Musing } from '@/lib/musings'
import { musingTopics } from '@/lib/musing-topics'
import MusingEmbed from './MusingEmbed'

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })
const linkStyle = 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light'

export function MusingDate({ date, topics = [] }: { date: Musing['date']; topics?: string[] }) {
  return (
    <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
      {date ? <time dateTime={date}>{dateFormat.format(new Date(date))}</time> : 'Draft'}
      {topics.map(topic => ` · ${musingTopics[topic]}`)}
    </p>
  )
}

function isOnX(url: string) {
  return ['x.com', 'twitter.com'].includes(new URL(url).hostname.replace(/^www\./, ''))
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
    <ol className="divide-y divide-[var(--panel-border)] border-y border-[var(--panel-border)]">
      {entries.map(entry => (
        <li key={entry.slug} className="py-5 sm:py-6">
          <article className="space-y-2.5">
            <MusingDate date={entry.date} topics={entry.topics} />
            <Heading className="text-pretty font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              {entry.title}
            </Heading>
            {entry.kind === 'repost' && entry.context && (
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{entry.context}</p>
            )}
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
              <div className="flex flex-wrap items-center justify-between gap-x-4">
                <a
                  href={entry.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${isOnX(entry.originalUrl) ? 'View on X' : 'Read the original'}: ${entry.title}`}
                  className={linkStyle}
                >
                  {isOnX(entry.originalUrl) ? 'View on X' : 'Read the original'} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                {archive && entry.embed && <MusingEmbed embed={entry.embed} title={entry.title} />}
              </div>
            )}
          </article>
        </li>
      ))}
    </ol>
  )
}
