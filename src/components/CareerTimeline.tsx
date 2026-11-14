import Link from 'next/link'
import { Download } from 'lucide-react'
import type { ExperienceData } from '@/lib/types'

const linkClass = 'underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
const rowClass = 'grid gap-x-6 gap-y-1 border-b border-[var(--panel-border)] py-4 sm:grid-cols-[8.5rem_1fr]'
const periodClass = 'font-mono text-xs leading-6 text-zinc-600 dark:text-zinc-400'
const summaryClass = 'mt-0.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'

function TimelineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith('http')
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{children}</a>
    : <Link href={href} className={linkClass}>{children}</Link>
}

export default function CareerTimeline({ experience }: { experience: ExperienceData }) {
  if (experience.roles.length === 0) return null

  return (
    <div id="career" className="mt-10 scroll-mt-24 sm:mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Career so far
        </h3>
        {experience.resumeUrl && (
          <a
            href={experience.resumeUrl}
            download="Manohar-Kanapaka-Resume.pdf"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light"
          >
            <Download size={15} aria-hidden="true" /> Download résumé (PDF)
          </a>
        )}
      </div>
      <ol className="mt-3 border-t border-[var(--panel-border)]">
        {experience.roles.map(item => (
          <li key={`${item.role}-${item.period}`} className={rowClass}>
            <p className={periodClass}>{item.period}</p>
            <div>
              <p className="text-base text-zinc-900 dark:text-zinc-100">
                <span className="font-semibold">{item.role}</span>
                {item.organization && (
                  <>
                    <span className="text-zinc-600 dark:text-zinc-400">, </span>
                    {item.href ? <TimelineLink href={item.href}>{item.organization}</TimelineLink> : item.organization}
                  </>
                )}
              </p>
              {item.summary && <p className={summaryClass}>{item.summary}</p>}
              {item.links && item.links.length > 0 && (
                <p className={summaryClass}>
                  {item.links.length > 1 ? 'Case studies' : 'Case study'}:{' '}
                  {item.links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 && ', '}
                      <TimelineLink href={link.href}>{link.label}</TimelineLink>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
        {experience.education.map(item => (
          <li key={item.school} className={rowClass}>
            <p className={periodClass}>{item.period}</p>
            <div>
              <p className="text-base text-zinc-900 dark:text-zinc-100">
                <span className="font-semibold">{item.degree}</span>
                <span className="text-zinc-600 dark:text-zinc-400">, </span>
                {item.school}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
