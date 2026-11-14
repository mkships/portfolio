import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PostMeta } from '@/lib/types'

interface ProjectCardProps {
  project: PostMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const context = [project.organization, project.year || project.date].filter(Boolean).join(' · ')

  return (
    <Link href={`/case-studies/${project.slug}`} className="group block border-b border-[var(--panel-border)] py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss dark:focus-visible:outline-moss-light">
      <article className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex-1 min-w-0">
          {context && (
            <p className="portfolio-meta mb-2">{context}</p>
          )}
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-zinc-900 underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-moss dark:text-zinc-100 dark:group-hover:decoration-moss-light">
            {project.title}
          </h3>
          {(project.description || project.excerpt) && (
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-[1.5]">
              {project.description || project.excerpt}
            </p>
          )}
        </div>
        <ArrowRight size={16} className="mt-1 shrink-0 sm:mt-0 text-moss-dark dark:text-moss-light" aria-hidden="true" />
      </article>
    </Link>
  )
}
