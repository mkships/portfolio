import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PostMeta } from '@/lib/types'

interface ProjectCardProps {
  project: PostMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/case-studies/${project.slug}`} className="portfolio-card group block">
      <article className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex-1 min-w-0">
          {(project.year || project.date) && (
            <span className="portfolio-kicker mb-2 block sm:hidden">{project.year || project.date}</span>
          )}
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          {(project.description || project.excerpt) && (
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-[1.5]">
              {project.description || project.excerpt}
            </p>
          )}
        </div>
        {(project.year || project.date) && (
          <span className="portfolio-kicker hidden shrink-0 sm:inline">
            {project.year || project.date}
          </span>
        )}
        <ArrowUpRight size={16} className="mt-1 shrink-0 sm:mt-0 text-moss-dark dark:text-moss-light" aria-hidden="true" />
      </article>
    </Link>
  )
}
