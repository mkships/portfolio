import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { statusLabels } from '@/lib/posts'
import { PostMeta } from '@/lib/types'

const linkStyle = 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light'

export function projectMeta(project: PostMeta) {
  return [...project.tags, project.role || statusLabels[project.status ?? 'wip']].filter(Boolean).join(' · ')
}

export default function TinkerCard({ project }: { project: PostMeta }) {
  const href = `/products/${project.slug}`
  const shot = project.screenshots[0]

  return (
    <article className={`grid gap-x-8 gap-y-4 border-b border-[var(--panel-border)] py-7 sm:items-center ${shot ? 'sm:grid-cols-[1.15fr_1fr]' : ''}`}>
      {shot && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden rounded-xl border border-[var(--panel-border)] bg-[var(--card)]"
        >
          <Image src={shot.src} alt="" width={1440} height={810} sizes="(min-width: 640px) 380px, calc(100vw - 34px)" className="h-auto w-full" />
        </Link>
      )}
      <div>
        <p className="portfolio-meta">{projectMeta(project)}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {project.description || project.tagline}
        </p>
        <div className="mt-1 flex flex-wrap gap-x-5">
          <Link href={href} aria-label={`Read the write-up: ${project.title}`} className={linkStyle}>
            Read the write-up <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} className={linkStyle}>
              Visit site <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
